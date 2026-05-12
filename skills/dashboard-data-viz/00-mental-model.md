---
name: mental-model
description: Core principles every other skill rests on: show the data, chart as composition, perceptual hierarchy. Load once at the start of any dashboard or chart task.
---

# Mental model

Two ideas drive every design choice. Load this skill before reasoning about chart design.

## 1. Above all else, show the data

A chart exists to convey the data. Every pixel of non-data ink competes with the data for the viewer's attention. The goal is not minimalism for its own sake — it is to make the data the loudest thing on the canvas.

Operational tests to apply at every step:

- If you erase this element, is data lost? If no, strongly consider erasing it.
- If two elements encode the same thing, keep the one that reads more accurately and mute or remove the other.
- If decoration is added to make the chart "look like a chart" (frames, gridlines, 3D, fills, shadows), it is probably chartjunk.

This is the data-ink ratio applied continuously, not as a one-shot cleanup at the end.

## 2. A chart is a composition, not an opcode

Do not reason about "a pie chart" or "a bar chart" as atomic choices. Every chart decomposes cleanly into orthogonal components — the grammar of graphics:

- **data** — the rows and columns
- **mapping (aesthetics)** — which variable drives x, y, color, size, etc.
- **stat** — a transformation applied before drawing (identity, bin, summary, smooth)
- **geom** — the physical shape drawn (point, bar, line, area, tile)
- **scale** — how data values map to aesthetic values (linear, log, categorical, color gradient)
- **coord** — the coordinate system (Cartesian, polar, flipped)
- **facet** — splitting into small multiples by a variable

The practical consequence: a pie chart is `stat=stack + geom=bar + coord=polar`. A histogram is `stat=bin + geom=bar`. Changing the geom on a fixed mapping often gives you a valid alternative chart for free. Reason about the components first, and the right chart type tends to fall out.

## The perceptual hierarchy

Humans judge visual channels with dramatically different accuracy. In descending order of accuracy for reading quantitative values:

1. **Position on a common scale** (bar height, point x/y)
2. **Position on non-aligned scales** (points in small multiples)
3. **Length** (un-baselined bars, segments of stacked bars not touching baseline)
4. **Angle / slope**
5. **Area**
6. **Volume / 3D**
7. **Color saturation and hue**

Rules that fall out of this hierarchy:

- Use position and length for the values you most need the viewer to read accurately.
- Use color, size, and shape for categorical distinctions or secondary variables — not for primary quantitative comparisons.
- Every type with angle/area/volume encoding (pie, donut, sunburst, treemap, bubble, 3D bars, gauge) pays a tax against precision. Use them when rough magnitude is enough; switch to position-based encoding when precision matters.

## Consequences for the generator

- Reach for bar / line / scatter / table first. These use the strongest channels.
- Map data type to aesthetic before picking a chart type: continuous → position, categorical → color/shape/facet, ordered → position or sequential color.
- Treat scales as the single source of truth for transformations. If the data is skewed, apply a log *scale*, not a pre-transformed column.
- When a single plot is getting crowded with three or more aesthetics, facet instead of layering more encodings.
- Warn the user (or silently avoid) the lowest-accuracy forms when the user's question requires precise reading.

## See also

- [`01-design-process.md`](01-design-process.md) — what to decide before choosing a chart
- [`choose-chart/by-data-shape.md`](choose-chart/by-data-shape.md) — applying data-type-first reasoning
- [`encode/visual-channels.md`](encode/visual-channels.md) — perceptual hierarchy in detail
- [`craft/clutter-and-data-ink.md`](craft/clutter-and-data-ink.md) — operational rules for "show the data"
