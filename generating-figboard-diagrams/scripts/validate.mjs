#!/usr/bin/env node
/**
 * Validates a FigBoard FileContentDto JSON file.
 * Usage: node scripts/validate.mjs <path-to-json>
 */

import { readFileSync } from 'node:fs';

const VALID_NODE_TYPES = new Set(['editable', 'text', 'frame', 'shape']);
const VALID_SHAPES = new Set([
  'rectangle', 'rounded-rectangle', 'pill', 'parallelogram',
  'diamond', 'hexagon', 'chevron-right', 'chevron-right-narrow',
  'pentagon-right', 'hexagon-horizontal', 'arrow-right',
  'arrow-right-narrow', 'double-arrow', 'double-arrow-narrow',
]);
const VALID_LINE_TYPES = new Set(['straight', 'orthogonal', 'curve']);
const VALID_LAYOUTS = new Set(['1x2', '2x2', '1x3', '2x3']);
const VALID_WIDTH_PRESETS = new Set(['single_column', 'double_column']);

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

function warn(msg) {
  console.warn(`⚠️  ${msg}`);
}

function ok(msg) {
  console.log(`✅ ${msg}`);
}

// Load file
const filePath = process.argv[2];
if (!filePath) fail('Usage: node validate.mjs <path-to-filecontent.json>');

let content;
try {
  const raw = readFileSync(filePath, 'utf8');
  content = JSON.parse(raw);
} catch (e) {
  fail(`Cannot parse JSON: ${e.message}`);
}

// Top-level structure
if (typeof content.schema_version !== 'number') {
  fail('Missing or invalid schema_version (must be number)');
}
if (content.schema_version !== 2) {
  warn(`schema_version is ${content.schema_version}, expected 2`);
}

if (!content.document_payload || typeof content.document_payload !== 'object') {
  fail('Missing document_payload');
}

const payload = content.document_payload;
if (!Array.isArray(payload.nodes)) fail('document_payload.nodes must be an array');
if (!Array.isArray(payload.edges)) fail('document_payload.edges must be an array');

// Viewport
const vp = payload.viewport;
if (!vp || typeof vp.x !== 'number' || typeof vp.y !== 'number' || typeof vp.zoom !== 'number') {
  warn('viewport missing or incomplete, using defaults');
}

// Validate nodes
let textCount = 0;
let assetCount = 0;
for (let i = 0; i < payload.nodes.length; i++) {
  const node = payload.nodes[i];
  if (!node || typeof node !== 'object') fail(`nodes[${i}] is not an object`);
  if (typeof node.id !== 'string' || !node.id.trim()) fail(`nodes[${i}] missing valid id`);
  if (typeof node.type !== 'string') fail(`nodes[${i}] (${node.id}) missing type`);

  if (!VALID_NODE_TYPES.has(node.type)) {
    warn(`nodes[${i}] (${node.id}) has unknown type: "${node.type}"`);
  }

  if (!node.position || typeof node.position.x !== 'number' || typeof node.position.y !== 'number') {
    fail(`nodes[${i}] (${node.id}) missing valid position`);
  }

  // Count for stats
  if (node.type === 'text') textCount++;
  if (node.type === 'editable' || node.type === 'shape') assetCount++;

  // Check data
  const data = node.data;
  if (!data || typeof data !== 'object') {
    fail(`nodes[${i}] (${node.id}) missing data object`);
  }

  if (node.type === 'editable') {
    if (typeof data.shape !== 'string') warn(`nodes[${i}] (${node.id}) missing shape`);
    else if (!VALID_SHAPES.has(data.shape)) warn(`nodes[${i}] (${node.id}) unknown shape: "${data.shape}"`);
    if (typeof data.label !== 'string' && data.label !== undefined) warn(`nodes[${i}] (${node.id}) label should be string`);
  }

  if (node.type === 'frame') {
    if (typeof data.contentKind !== 'string') warn(`nodes[${i}] (${node.id}) frame missing contentKind`);
  }

  if (node.type === 'text') {
    if (typeof data.text !== 'string') warn(`nodes[${i}] (${node.id}) text node missing text`);
  }

  // Check parentId consistency
  if (typeof node.parentId === 'string') {
    const parentExists = payload.nodes.some(n => n.id === node.parentId);
    if (!parentExists) warn(`nodes[${i}] (${node.id}) parentId "${node.parentId}" not found`);
  }
}

// Validate edges
const nodeIds = new Set(payload.nodes.map(n => n.id));
for (let i = 0; i < payload.edges.length; i++) {
  const edge = payload.edges[i];
  if (!edge || typeof edge !== 'object') fail(`edges[${i}] is not an object`);
  if (typeof edge.id !== 'string' || !edge.id.trim()) fail(`edges[${i}] missing valid id`);

  // Check connector format
  if (edge.kind === 'connector') {
    if (!['straight', 'orthogonal', 'curve'].includes(edge.lineType)) {
      warn(`edges[${i}] (${edge.id}) unknown lineType: "${edge.lineType}"`);
    }

    const checkEndpoint = (end, name, idx) => {
      if (!end || typeof end !== 'object') fail(`edges[${idx}] (${edge.id}) missing ${name}`);
      if (end.mode === 'attached') {
        if (!nodeIds.has(end.nodeId)) warn(`edges[${idx}] (${edge.id}) ${name}.nodeId "${end.nodeId}" not found`);
        if (!end.anchor || typeof end.anchor.xRatio !== 'number' || typeof end.anchor.yRatio !== 'number') {
          warn(`edges[${idx}] (${edge.id}) ${name} anchor invalid`);
        }
      }
    };
    checkEndpoint(edge.start, 'start', i);
    checkEndpoint(edge.end, 'end', i);
  } else if (edge.source && edge.target) {
    // Plain React Flow edge (discouraged but accepted)
    if (!nodeIds.has(edge.source)) warn(`edges[${i}] (${edge.id}) source "${edge.source}" not found`);
    if (!nodeIds.has(edge.target)) warn(`edges[${i}] (${edge.id}) target "${edge.target}" not found`);
  }

  if (!Array.isArray(edge.waypoints) && edge.kind === 'connector') {
    warn(`edges[${i}] (${edge.id}) waypoints should be an array`);
  }
}

// Validate figure_spec
if (content.figure_spec) {
  const fs = content.figure_spec;
  if (fs.layout && !VALID_LAYOUTS.has(fs.layout)) {
    warn(`figure_spec.layout "${fs.layout}" not in ${[...VALID_LAYOUTS].join(', ')}`);
  }
  if (fs.width_preset && !VALID_WIDTH_PRESETS.has(fs.width_preset)) {
    warn(`figure_spec.width_preset "${fs.width_preset}" not in ${[...VALID_WIDTH_PRESETS].join(', ')}`);
  }
  if (Array.isArray(fs.panels)) {
    for (let i = 0; i < fs.panels.length; i++) {
      const p = fs.panels[i];
      if (!p.id) warn(`figure_spec.panels[${i}] missing id`);
      if (!p.label) warn(`figure_spec.panels[${i}] missing label`);
      if (!p.source?.kind) warn(`figure_spec.panels[${i}] missing source.kind`);
    }
  }
}

// Validate editor_meta
if (content.editor_meta) {
  const validSources = new Set(['blank', 'template', 'import', 'duplicate']);
  if (content.editor_meta.source && !validSources.has(content.editor_meta.source)) {
    warn(`editor_meta.source "${content.editor_meta.source}" not in ${[...validSources].join(', ')}`);
  }
}

// Validate stats
if (content.stats) {
  const actualNodeCount = payload.nodes.length;
  const actualEdgeCount = payload.edges.length;
  if (content.stats.node_count !== actualNodeCount) {
    warn(`stats.node_count ${content.stats.node_count} != actual ${actualNodeCount}`);
  }
  if (content.stats.edge_count !== actualEdgeCount) {
    warn(`stats.edge_count ${content.stats.edge_count} != actual ${actualEdgeCount}`);
  }
  if (content.stats.text_count !== textCount) {
    warn(`stats.text_count ${content.stats.text_count} != actual ${textCount}`);
  }
  if (content.stats.asset_count !== assetCount) {
    warn(`stats.asset_count ${content.stats.asset_count} != actual ${assetCount}`);
  }
} else {
  warn('stats object missing — should contain node_count, edge_count, text_count, asset_count');
}

// Summary
console.log('');
ok(`Validated ${payload.nodes.length} nodes, ${payload.edges.length} edges`);
ok(`  text nodes: ${textCount}, asset nodes: ${assetCount}`);
if (content.figure_spec?.panels?.length) {
  ok(`  figure panels: ${content.figure_spec.panels.length} (${content.figure_spec.layout})`);
}
if (payload.pages?.length) {
  ok(`  pages: ${payload.pages.length}`);
}
console.log('\n✅ Validation complete.');
