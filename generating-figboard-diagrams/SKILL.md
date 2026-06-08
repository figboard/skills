---
name: generating-figboard-diagrams
description: Generates FigBoard-compatible JSON for React Flow diagrams (flowcharts, network diagrams) and multi-panel scientific figures. Use when the user wants to create flowcharts, workflow diagrams, scientific figures, or network graphs that can be imported into FigBoard (飞格图板).
---

# Generating FigBoard Diagrams

Generate JSON content for FigBoard (飞格图板) — a scientific figure assembly tool built on React Flow (@xyflow/react). Supports two file kinds: **flow** (flowcharts/diagrams) and **figure** (multi-panel publication figures).

## CLI Readiness

Before any FigBoard generation or import task, ensure the latest `@figboard/cli` is installed and available:

1. Check the latest published version: `npm view @figboard/cli version`
2. Check the local CLI version: `figboard --version`
3. If `figboard` is missing or older than the latest published version, install/update it: `npm install -g @figboard/cli@latest`
4. Re-run `figboard --version` and continue only after the command succeeds.

If a global install is not appropriate in the current environment, use `npx -y @figboard/cli@latest ...` for FigBoard CLI commands.

## Quick Decision

| User asks for | Kind | Top-level format |
|---|---|---|
| Flowchart, workflow, process, architecture, network | `flow` | FileContentDto (nodes+edges) |
| Multi-panel figure, subplot layout, publication figure | `figure` | FileContentDto + `figure_spec` |
| CSV/JSON dataset for charts | dataset | See `references/datasets.md` |

## FileContentDto Envelope

```json
{
  "schema_version": 2,
  "document_payload": {
    "nodes": [], "edges": [], "viewport": { "x": 0, "y": 0, "zoom": 1 },
    "pages": [], "active_page_id": null
  },
  "figure_spec": null,
  "editor_meta": {
    "canvas_background": null, "grid_enabled": true,
    "selected_template_id": null, "source": "blank", "source_file_id": null
  },
  "stats": { "node_count": 0, "edge_count": 0, "text_count": 0, "asset_count": 0 }
}
```

- `schema_version`: Always `2`.
- `stats`: Must match actual counts. `text_count` = nodes with `type:"text"`. `asset_count` = nodes with `type:"editable"` or `type:"shape"`.
- `viewport`: canvas scroll/zoom start state.

## Flow Nodes (Quick Reference)

> Full specs: `references/flow-format.md`

**Minimal editable node:**
```json
{
  "id": "n-1", "type": "editable",
  "position": { "x": 80, "y": 80 },
  "style": { "width": 160, "height": 48 },
  "data": { "label": "Start", "shape": "rounded-rectangle", "background": "#e8f0fe",
    "border": "1px solid #1f2937", "borderRadius": 8, "opacity": 100, "rotation": 0,
    "color": "#111827", "fontFamily": "\"Noto Sans SC\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif",
    "fontSize": 14, "fontWeight": "normal", "fontStyle": "normal",
    "textDecoration": "none", "textAlign": "center" }
}
```

**Node types:** `editable` (shapes), `text` (labels), `frame` (group container), `shape` (images).

**Node shapes for `editable`:** `rectangle`, `rounded-rectangle`, `pill`, `parallelogram`, `diamond`, `hexagon`, `chevron-right`, `chevron-right-narrow`, `pentagon-right`, `hexagon-horizontal`, `arrow-right`, `arrow-right-narrow`, `double-arrow`, `double-arrow-narrow`.

**Frame grouping:** set child `parentId` to frame's `id`. Child positions are relative to frame.

## Flow Edges (Connector Format)

Always use **FigBoard connector format** (not plain `source`/`target`):

```json
{
  "id": "connector-<random>", "kind": "connector", "type": "editable",
  "lineType": "orthogonal",
  "start": { "mode": "attached", "nodeId": "n-1", "anchor": { "xRatio": 1, "yRatio": 0.5 } },
  "end":   { "mode": "attached", "nodeId": "n-2", "anchor": { "xRatio": 0, "yRatio": 0.5 } },
  "waypoints": [], "connectorLabel": null,
  "style": { "stroke": "#000000", "strokeWidth": 2 },
  "markerEnd": { "type": "arrowclosed", "color": "#000000" },
  "data": { "lineType": "orthogonal", "lineStrokeStyle": "solid", "lineArrowType": "one-way",
    "animationType": "none", "isAnimated": false }
}
```

- `lineType`: `"straight"` | `"orthogonal"` | `"curve"`
- `anchor.xRatio`/`yRatio`: 0=left/top, 0.5=center, 1=right/bottom
- `markerEnd.type`: `"arrowclosed"` for arrows; omit for undirected
- `markerStart.type`: `"arrowclosed"` for bidirectional arrows
- `connectorLabel`: `{ "text":"label", "t":0.5, "offsetX":0, "offsetY":-10 }` or `null`

## Figure (多面板图) Generation

> Full specs: `references/figure-format.md`

Same `FileContentDto` envelope with `figure_spec`:

```json
"figure_spec": {
  "layout": "2x2", "gap": 16, "padding": 24,
  "width_preset": "double_column",
  "labels": { "enabled": true, "position": "top_left", "font_size": 14 },
  "panels": [
    { "id": "panel-1", "label": "a", "source": { "kind": "placeholder" } }
  ]
}
```

- `layout`: `"1x2"` | `"2x2"` | `"1x3"` | `"2x3"`
- `width_preset`: `"single_column"` | `"double_column"`
- `panels[].label`: letters `a`–`z`. `panels[].source.kind`: `"placeholder"` by default.

## Dataset Generation

> Full specs: `references/datasets.md`

Types: `bar`, `line`, `volcano`, `box`, `heatmap`. Deterministic seeded RNG.

## Layout Tips

1. Space nodes ≥60px gap; 80-100px is comfortable.
2. Use `edge.waypoints: []` for auto-routing; provide `[{x,y},...]` for manual paths.
3. `viewport.zoom` < 1 = zoomed out; use 0.6-0.8 for large diagrams.
4. Multi-page: use `document_payload.pages` (each with `id`, `title`, `nodes`, `edges`, `viewport`).

## Workflow

1. Check/install the latest `@figboard/cli` as described in CLI Readiness
2. Understand user's diagram needs
3. Generate `FileContentDto` JSON following above formats
4. Compute and set correct `stats` counts
5. Write to `.json` file
6. Import: `figboard files create --from-file <path>` (CLI) or web UI raw import

## References

- `references/flow-format.md` — Complete node type specs, `text`/`frame`/`shape` formats, edge variants
- `references/figure-format.md` — Figure page layout, subplot nodes, figure_spec details
- `references/datasets.md` — CSV/JSON dataset generators with column schemas
- `references/styling.md` — Colors, shapes, typography presets for publication quality
