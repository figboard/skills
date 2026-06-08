# Flow Format Reference

Complete React Flow node/edge type reference for FigBoard.

## Node Types

### 1. `editable` — Shape/Label Node

```json
{
  "id": "unique-id",
  "type": "editable",
  "position": { "x": 0, "y": 0 },
  "style": { "width": 160, "height": 48 },
  "data": {
    "label": "Node Text",
    "shape": "rounded-rectangle",
    "background": "#e8f0fe",
    "border": "1px solid #1f2937",
    "borderRadius": 8,
    "opacity": 100,
    "rotation": 0,
    "color": "#111827",
    "fontFamily": "\"Noto Sans SC\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif",
    "fontSize": 14,
    "fontWeight": "normal",
    "fontStyle": "normal",
    "textDecoration": "none",
    "textAlign": "center",
    "contentKind": "figure-subplot",
    "mediaSrc": null,
    "mediaSource": null,
    "mediaFit": "cover",
    "mediaTitle": null,
    "subplotLabel": null,
    "caption": null,
    "assetName": null
  }
}
```

`data` fields:
- `label` (string): Display text
- `shape` (NodeShape): One of the supported shapes
- `background` (string): CSS color value
- `border` (string): CSS border, e.g. `"1px solid #1f2937"` or `"0px solid transparent"`
- `borderRadius` (number): 0-90, corner rounding
- `opacity` (number): 0-100
- `rotation` (number): degrees
- `color` (string): text color
- `fontFamily` (string): Default `"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif`
- `fontSize` (number): 10-48
- `fontWeight`: `"normal"` | `"bold"`
- `fontStyle`: `"normal"` | `"italic"`
- `textDecoration`: `"none"` | `"underline"`
- `textAlign`: `"left"` | `"center"` | `"right"`
- `contentKind` (optional): `"figure-subplot"` for figure subplot nodes
- `mediaSrc`/`mediaSource`/`mediaFit`/`mediaTitle`: For image-backed nodes
- `subplotLabel`/`caption`/`assetName`: Figure subplot metadata

### 2. `text` — Text-Only Node

```json
{
  "id": "text-1",
  "type": "text",
  "position": { "x": 100, "y": 100 },
  "style": { "width": 200, "height": 32 },
  "data": {
    "text": "注释文字",
    "fontSize": 14,
    "fontFamily": "\"Noto Sans SC\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif",
    "fontWeight": "normal",
    "fontStyle": "normal",
    "textDecoration": "none",
    "textAlign": "left",
    "rotation": 0,
    "textColor": "#111827",
    "backgroundColor": "transparent"
  }
}
```

- `text` (string): Content text
- `rotation` (number): -360 to 360 degrees
- `textAlign`: `"left"` | `"center"` | `"right"`

### 3. `frame` — Group Container

```json
{
  "id": "frame-1",
  "type": "frame",
  "position": { "x": 40, "y": 40 },
  "style": { "width": 400, "height": 300 },
  "data": {
    "contentKind": "group",
    "label": "Group Label",
    "backgroundColor": "rgba(168, 196, 255, 0.12)",
    "borderColor": "#5A6378",
    "borderStyle": "dashed",
    "borderWidth": 2,
    "borderRadius": 8,
    "opacity": 100
  }
}
```

- `contentKind`: `"group"` for normal groups, `"figure-page"` for figure page background
- `borderStyle`: `"solid"` | `"dashed"` | `"dotted"`
- Child nodes: set `parentId` to frame's `id`; child positions relative to frame origin
- Figure page frames use `contentKind: "figure-page"` with `draggable: false, selectable: false`

### 4. `shape` — Image/Asset Node

```json
{
  "id": "asset-1",
  "type": "shape",
  "position": { "x": 200, "y": 200 },
  "style": { "width": 300, "height": 200 },
  "data": {
    "mediaSrc": "data:image/svg+xml;charset=UTF-8,...",
    "mediaSource": "saved-image",
    "mediaFit": "contain",
    "mediaTitle": "chart.svg",
    "label": "chart.svg"
  }
}
```

- `mediaSrc`: Data URI or URL of the image
- `mediaSource`: `"saved-image"`
- `mediaFit`: `"cover"` | `"contain"`
- `mediaTitle`/`label`: Display name

## Supported Shapes (NodeShape)

```
rectangle          — 标准矩形
rounded-rectangle  — 圆角矩形
pill               — 药丸形
parallelogram      — 平行四边形
diamond            — 菱形
hexagon            — 六边形
chevron-right      — 右箭头(宽)
chevron-right-narrow — 右箭头(窄)
pentagon-right     — 五边形箭头
hexagon-horizontal — 横向六边形
arrow-right        — 箭头(宽)
arrow-right-narrow — 箭头(窄)
double-arrow       — 双向箭头(宽)
double-arrow-narrow — 双向箭头(窄)
```

## Edge (Connector) Format

### Full Connector Edge

```json
{
  "id": "connector-<unique>",
  "kind": "connector",
  "type": "editable",
  "lineType": "orthogonal",
  "start": {
    "mode": "attached",
    "nodeId": "source-node-id",
    "anchor": { "xRatio": 1, "yRatio": 0.5 }
  },
  "end": {
    "mode": "attached",
    "nodeId": "target-node-id",
    "anchor": { "xRatio": 0, "yRatio": 0.5 }
  },
  "waypoints": [],
  "connectorLabel": null,
  "style": { "stroke": "#000000", "strokeWidth": 2 },
  "markerEnd": { "type": "arrowclosed", "color": "#000000" },
  "data": {
    "lineType": "orthogonal",
    "lineStrokeStyle": "solid",
    "lineArrowType": "one-way",
    "animationType": "none",
    "isAnimated": false
  }
}
```

### Anchor Reference

`anchor.xRatio`/`yRatio` maps to node boundary:
- `{xRatio:0, yRatio:0.5}` — left center
- `{xRatio:1, yRatio:0.5}` — right center
- `{xRatio:0.5, yRatio:0}` — top center
- `{xRatio:0.5, yRatio:1}` — bottom center

### Edge Variants

| Style | lineType | markerEnd | lineArrowType |
|---|---|---|---|
| Straight | `straight` | `{type:"arrowclosed"}` | `one-way` |
| Orthogonal | `orthogonal` | `{type:"arrowclosed"}` | `one-way` |
| Curved | `curve` | `{type:"arrowclosed"}` | `one-way` |
| Bidirectional | any | add `markerStart:{type:"arrowclosed"}` | `two-way` |
| No arrow | any | omit both | `none` |

### Edge Label

```json
"connectorLabel": {
  "text": "yes",
  "t": 0.5,
  "offsetX": 0,
  "offsetY": -12,
  "fontWeight": "normal",
  "fontStyle": "normal",
  "fontSize": 12,
  "color": "#111827",
  "labelBorderStyle": "none"
}
```

- `t`: position along edge (0-1)
- `offsetX`/`offsetY`: pixel offset from edge point
- `labelBorderStyle`: `"capsule"` | `"rect"` | `"none"`

### Edge Line Styles

```json
// Dashed
"style": { "stroke": "#000000", "strokeWidth": 2, "strokeDasharray": "5,5" }
// Dotted
"style": { "stroke": "#000000", "strokeWidth": 2, "strokeDasharray": "1,5" }
```

### Free Endpoints (unattached)

When an edge doesn't connect to a node:
```json
"start": { "mode": "free", "x": 100, "y": 200 }
```

## Pages (Multi-Tab)

```json
"document_payload": {
  "nodes": [],
  "edges": [],
  "viewport": { "x": 0, "y": 0, "zoom": 1 },
  "pages": [
    { "id": "page-1", "title": "Overview", "nodes": [...], "edges": [...], "viewport": { "x": 0, "y": 0, "zoom": 1 } },
    { "id": "page-2", "title": "Details", "nodes": [...], "edges": [...], "viewport": { "x": 0, "y": 0, "zoom": 1 } }
  ],
  "active_page_id": "page-1"
}
```

If using pages, the top-level nodes/edges must be empty arrays. All content goes into `pages[].nodes` and `pages[].edges`.

## Node Styling Presets

See `styling.md` for publication-quality color themes and shape presets.
