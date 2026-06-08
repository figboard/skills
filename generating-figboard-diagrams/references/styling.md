# Styling Presets

Publication-quality color themes, shapes, and typography for FigBoard diagrams.

## Color Palettes

### Scientific Blue Theme

| Role | Color | Hex |
|---|---|---|
| Primary | Deep blue | `#2F72B8` |
| Secondary | Light blue | `#BFE5BF` |
| Accent | Orange | `#F28E2B` |
| Background | White | `#FFFFFF` |
| Text | Dark | `#111827` |
| Border | Dark gray | `#1F2937` |
| Frame bg | Blue tint | `rgba(168, 196, 255, 0.12)` |

### Neutral/Professional

| Role | Color | Hex |
|---|---|---|
| Primary | Slate | `#5A6378` |
| Secondary | Light gray | `#E5E7EB` |
| Background | White | `#FFFFFF` |
| Text | Dark | `#111827` |
| Border | Gray | `#9CA3AF` |
| Frame bg | Gray tint | `rgba(148, 163, 184, 0.08)` |

### Dark Theme

| Role | Color | Hex |
|---|---|---|
| Background | Dark | `#1F2937` |
| Node bg | Slate | `#374151` |
| Text | Light | `#F9FAFB` |
| Border | Gray | `#6B7280` |
| Edge | Light gray | `#9CA3AF` |

### Nature/Green Theme

| Role | Color | Hex |
|---|---|---|
| Primary | Forest green | `#2F8F39` |
| Secondary | Sage | `#BFE5BF` |
| Accent | Gold | `#D6B365` |
| Background | White | `#FFFFFF` |
| Text | Dark | `#111827` |

## Shape Presets by Use Case

### Process Flow (left-to-right)

```json
// Start node
{ "shape": "pill", "background": "#2F72B8", "color": "#ffffff", "borderRadius": 999 }

// Process step
{ "shape": "rounded-rectangle", "background": "#ffffff", "border": "2px solid #2F72B8", "borderRadius": 8 }

// Decision
{ "shape": "diamond", "background": "#FEF3C7", "border": "2px solid #D6B365" }

// End node
{ "shape": "pill", "background": "#2F8F39", "color": "#ffffff", "borderRadius": 999 }
```

### Architecture Diagram

```json
// Service/Layer
{ "shape": "rectangle", "background": "#E8F0FE", "border": "2px solid #2F72B8", "borderRadius": 4 }

// Database/Storage
{ "shape": "hexagon-horizontal", "background": "#DCFCE7", "border": "2px solid #2F8F39" }

// External system
{ "shape": "chevron-right", "background": "#FEF3C7", "border": "2px solid #D6B365" }
```

### Network/Topology

```json
// Core node
{ "shape": "hexagon", "background": "#2F72B8", "color": "#ffffff" }

// Edge node
{ "shape": "rounded-rectangle", "background": "#ffffff", "border": "1.5px solid #5A6378" }

// Client
{ "shape": "pentagon-right", "background": "#E8F0FE", "border": "2px solid #5A6378" }
```

### Data Pipeline

```json
// Source
{ "shape": "parallelogram", "background": "#FEF3C7", "border": "2px solid #D6B365" }

// Transform
{ "shape": "rectangle", "background": "#E8F0FE", "border": "2px solid #2F72B8" }

// Sink/Output
{ "shape": "arrow-right", "background": "#DCFCE7", "border": "2px solid #2F8F39", "color": "#111827" }
```

## Typography

### Default Font Stack

```
"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif
```

### Size Presets

| Context | fontSize | fontWeight |
|---|---|---|
| Title/Heading | 24 | bold |
| Section label | 18 | bold |
| Node label (default) | 14 | normal |
| Small note | 12 | normal |
| Caption | 11 | normal |

## Node Dimensions

### Standard Sizing

| Node content | width × height |
|---|---|
| Short label (1-3 chars) | 80 × 40 |
| Normal label (3-8 chars) | 140 × 48 |
| Long label (8-15 chars) | 200 × 48 |
| Description (multi-line) | 240 × 72 |
| Section header | 300 × 52 |
| Frame container | 400 × 300+ |

## Edge Styling Combinations

| Style | strokeWidth | strokeDasharray |
|---|---|---|
| Bold primary | 3 | none |
| Normal | 2 | none |
| Thin secondary | 1.5 | none |
| Dashed (optional/conditional) | 2 | `"5,5"` |
| Dotted (annotation) | 1.5 | `"1,5"` |

## Complete Node Example (Styled)

Architecture service with icon feel:

```json
{
  "id": "api-gateway",
  "type": "editable",
  "position": { "x": 300, "y": 200 },
  "style": { "width": 180, "height": 56 },
  "data": {
    "label": "API Gateway",
    "shape": "rounded-rectangle",
    "background": "#2F72B8",
    "border": "1px solid #173E66",
    "borderRadius": 8,
    "opacity": 100,
    "rotation": 0,
    "color": "#ffffff",
    "fontFamily": "\"Noto Sans SC\",\"PingFang SC\",\"Microsoft YaHei\",sans-serif",
    "fontSize": 14,
    "fontWeight": "bold",
    "fontStyle": "normal",
    "textDecoration": "none",
    "textAlign": "center"
  }
}
```

## Tips

1. Use 2-3 colors max per diagram; let shape variety carry the structure
2. Group related nodes with `frame` containers using subtle backgrounds
3. For publication: prefer white backgrounds, dark text/borders, consistent font sizes
4. Add text nodes for annotations (axis labels, legend, notes)
5. Use `chevron-right` / `arrow-right` shapes for directional flow emphasis
