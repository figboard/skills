# Figure Format Reference

Multi-panel scientific figure format for FigBoard.

## FigureSpec Structure

The `figure_spec` field on `FileContentDto`:

```json
{
  "schema_version": 2,
  "document_payload": { "nodes": [], "edges": [], "viewport": { "x": 250, "y": 92, "zoom": 0.86 }, "pages": [], "active_page_id": null },
  "figure_spec": {
    "layout": "2x2",
    "gap": 16,
    "padding": 24,
    "width_preset": "double_column",
    "labels": {
      "enabled": true,
      "position": "top_left",
      "font_size": 14
    },
    "panels": [
      {
        "id": "panel-1",
        "label": "a",
        "source": { "kind": "placeholder" }
      },
      {
        "id": "panel-2",
        "label": "b",
        "source": { "kind": "placeholder" }
      },
      {
        "id": "panel-3",
        "label": "c",
        "source": { "kind": "placeholder" }
      },
      {
        "id": "panel-4",
        "label": "d",
        "source": { "kind": "placeholder" }
      }
    ]
  },
  "editor_meta": {
    "canvas_background": "#ffffff",
    "grid_enabled": true,
    "selected_template_id": null,
    "source": "blank",
    "source_file_id": null
  },
  "stats": { "node_count": 5, "edge_count": 0, "text_count": 4, "asset_count": 4 }
}
```

### figure_spec Fields

| Field | Type | Values | Description |
|---|---|---|---|
| `layout` | string | `"1x2"`, `"2x2"`, `"1x3"`, `"2x3"` | Grid arrangement |
| `gap` | number | px | Spacing between panels |
| `padding` | number | px | Page margin |
| `width_preset` | string | `"single_column"`, `"double_column"` | Column width preset |
| `labels.enabled` | boolean | | Show (a)(b)(c) labels |
| `labels.position` | string | `"top_left"` | Label position |
| `labels.font_size` | number | | Label font size |
| `panels` | array | | Array of panel configs |

### Panel Config

```json
{
  "id": "panel-1",
  "label": "a",
  "source": { "kind": "placeholder" }
}
```

- `id`: Unique panel identifier
- `label`: Single letter `a`-`z`, auto-assigned by order
- `source.kind`: `"placeholder"` — user fills later with actual content

## Figure Page Nodes

Figures use React Flow nodes for actual rendering. The `document_payload.nodes` array contains the visual representation:

### Figure Page Node (Background)

```json
{
  "id": "figure-page",
  "type": "frame",
  "data": {
    "contentKind": "figure-page",
    "label": "Figure page",
    "backgroundColor": "#ffffff",
    "borderColor": "#e5e7eb",
    "borderStyle": "solid",
    "borderWidth": 1,
    "borderRadius": 2,
    "opacity": 100,
    "pageSizeLabel": "A5 横版",
    "widthCm": 21,
    "heightCm": 14.8
  },
  "position": { "x": 0, "y": 0 },
  "style": { "width": 960, "height": 720 },
  "draggable": false,
  "selectable": false,
  "focusable": false,
  "zIndex": -10
}
```

### Subplot Nodes (Content Panels)

```json
{
  "id": "figure-subplot-1",
  "type": "editable",
  "data": {
    "contentKind": "figure-subplot",
    "label": "line_chart.svg",
    "mediaTitle": "line_chart.svg",
    "mediaSrc": "data:image/svg+xml;charset=UTF-8,...",
    "mediaSource": "saved-image",
    "mediaFit": "contain",
    "subplotLabel": "(a)",
    "caption": "Time-response curves",
    "assetName": "line_chart.svg",
    "background": "#ffffff",
    "border": "0px solid transparent",
    "borderRadius": 0,
    "shape": "rectangle",
    "opacity": 100,
    "rotation": 0,
    "color": "#111827",
    "fontFamily": "\"Noto Sans SC\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif",
    "fontSize": 14,
    "fontWeight": "normal",
    "fontStyle": "normal",
    "textDecoration": "none",
    "textAlign": "left"
  },
  "position": { "x": 82, "y": 86 },
  "style": { "width": 352, "height": 234 },
  "zIndex": 1
}
```

### Layout Calculation for Subplots

For a `2x2` layout with page size 960×720:

| Panel | Position | Size |
|---|---|---|
| a (top-left) | `{x:82, y:86}` | `{w:352, h:234}` |
| b (top-right) | `{x:514, y:86}` | `{w:352, h:234}` |
| c (bottom-left) | `{x:82, y:392}` | `{w:352, h:234}` |
| d (bottom-right) | `{x:514, y:392}` | `{w:352, h:234}` |

Formulas:
- `marginX = 82`, `marginY = 82`
- `gapX = 78`, `gapY = 72`
- `panelW = (pageW - 2*marginX - gapX*(cols-1)) / cols`
- `panelH = (pageH - 2*marginY - gapY*(rows-1)) / rows`
- `panelX[i] = marginX + col * (panelW + gapX)`
- `panelY[i] = marginY + row * (panelH + gapY)`

## Empty Figure (Placeholder)

Minimal figure with placeholder panels — user fills in content later:

```json
{
  "schema_version": 2,
  "document_payload": {
    "nodes": [ /* figure-page frame + subplot nodes */ ],
    "edges": [],
    "viewport": { "x": 250, "y": 92, "zoom": 0.86 },
    "pages": [],
    "active_page_id": null
  },
  "figure_spec": {
    "layout": "2x2",
    "gap": 16,
    "padding": 24,
    "width_preset": "double_column",
    "labels": { "enabled": true, "position": "top_left", "font_size": 14 },
    "panels": [
      { "id": "panel-1", "label": "a", "source": { "kind": "placeholder" } },
      { "id": "panel-2", "label": "b", "source": { "kind": "placeholder" } },
      { "id": "panel-3", "label": "c", "source": { "kind": "placeholder" } },
      { "id": "panel-4", "label": "d", "source": { "kind": "placeholder" } }
    ]
  },
  "editor_meta": {
    "canvas_background": "#ffffff",
    "grid_enabled": true,
    "selected_template_id": null,
    "source": "blank",
    "source_file_id": null
  },
  "stats": { "node_count": 5, "edge_count": 0, "text_count": 4, "asset_count": 4 }
}
```

Subplot nodes use SVG data URIs with white backgrounds. Each panel has `contentKind: "figure-subplot"`.

## SVG Data URI Format

For inline SVG content in subplot nodes:
```
data:image/svg+xml;charset=UTF-8,<url-encoded-svg>
```

Use `encodeURIComponent()` on the SVG string. The SVG should include a white background rect and proper viewBox.
