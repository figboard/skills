# Dataset Generation Reference

Scientific dataset generators for FigBoard charts. All generators use deterministic seeded RNG for reproducibility.

## Supported Types

| Type | Description | Typical Use |
|---|---|---|
| `bar` | Bar chart data | Group comparisons with SEM error bars |
| `line` | Line chart data | Time series, trend lines |
| `volcano` | Volcano plot data | Differential expression analysis |
| `box` | Box plot data | Distribution summaries |
| `heatmap` | Heatmap data | Matrix visualization |

## Output Format

### CSV

```csv
category,replicate,value,sem
Control,1,48.3124,3.421
...
```

### JSON

```json
[
  { "category": "Control", "replicate": 1, "value": 48.3124, "sem": 3.421 }
]
```

## Bar Chart Dataset

**Columns:** `category`, `replicate`, `value`, `sem`

**Parameters:**
- `rows`: total data points (distributed across ~4 categories)
- `seed`: random seed for reproducibility

**Example (rows=8, seed=42):**
```csv
category,replicate,value,sem
Control,1,48.3124,3.421
Control,2,51.0891,2.876
Treatment-A,1,56.0723,4.112
Treatment-A,2,59.4421,3.654
Treatment-B,1,42.1563,2.987
Treatment-B,2,44.8931,3.234
Treatment-C,1,63.2178,4.432
Treatment-C,2,60.5546,3.891
```

## Line Chart Dataset

**Columns:** `time`, `series`, `value`

**Parameters:**
- `rows`: data points (distributed across time points × series)
- `seed`: random seed

**Example (rows=12, seed=42):**
```csv
time,series,value
0,Condition A,1.0234
0,Condition B,0.9876
0,Condition C,1.1123
10,Condition A,2.3456
10,Condition B,1.8765
10,Condition C,2.5432
20,Condition A,3.4532
20,Condition B,2.7654
20,Condition C,3.8765
30,Condition A,3.1234
30,Condition B,2.9876
30,Condition C,4.1234
```

## Volcano Plot Dataset

**Columns:** `gene`, `log2_fold_change`, `p_value`, `neg_log10_p`, `significant`

**Parameters:**
- `rows`: number of genes/features
- `seed`: random seed

**Notes:**
- ~20% of genes are differentially expressed (|log2FC| > 1, p < 0.05)
- p_value in scientific notation
- `significant`: 1 if p < 0.05 and |log2FC| > 1, else 0

**Example (rows=5, seed=1):**
```csv
gene,log2_fold_change,p_value,neg_log10_p,significant
AB1,-0.4321,3.1416e-1,0.5023,0
AC2,2.1854,2.4501e-4,3.6108,1
BA3,0.5621,8.7654e-2,1.0572,0
BB4,-1.8934,1.2345e-3,2.9086,1
CA5,0.0789,4.3210e-1,0.3641,0
```

## Box Plot Dataset

**Columns:** `group`, `value`

**Parameters:**
- `rows`: total data points (distributed across 4 groups)
- `seed`: random seed

**Example (rows=20, seed=42):**
```csv
group,value
Control,45.2134
Control,48.7654
Control,42.1087
Control,50.3421
Control,47.8976
Treatment-A,56.4321
Treatment-A,52.1089
Treatment-A,58.7654
...
```

## Heatmap Dataset

**Columns:** `gene`, `sample`, `value`

**Parameters:**
- `rows`: total cells. Creates approximately square matrix (√rows × √rows).
- `seed`: random seed

**Example (rows=9, seed=1):**
```csv
gene,sample,value
Gene1,Sample1,0.8532
Gene1,Sample2,0.2341
Gene1,Sample3,-0.5643
Gene2,Sample1,0.1234
Gene2,Sample2,0.9876
Gene2,Sample3,0.4567
Gene3,Sample1,-0.7654
Gene3,Sample2,0.3456
Gene3,Sample3,0.6543
```

## Seeded RNG Implementation

For reproducible generation, use a mulberry32 or similar seeded PRNG:

```typescript
function createRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

## FileContentDto Integration

When generating datasets for FigBoard, wrap as asset content:

```json
{
  "schema_version": 2,
  "document_payload": {
    "nodes": [],
    "edges": [],
    "viewport": { "x": 0, "y": 0, "zoom": 1 },
    "pages": [],
    "active_page_id": null
  },
  "figure_spec": null,
  "editor_meta": {
    "canvas_background": null,
    "grid_enabled": true,
    "selected_template_id": null,
    "source": "blank",
    "source_file_id": null
  },
  "stats": { "node_count": 0, "edge_count": 0, "text_count": 0, "asset_count": 0 }
}
```

Datasets are typically uploaded as `.csv` or `.json` assets via FigBoard API, not embedded in diagram JSON.
