---
name: encode-visual-channels
description: Choose chart.mapping — which channel (position, length, color, size, shape) encodes a given variable, per the perceptual hierarchy.
governs: chart.mapping (aesthetic/channel choice)
---

# Visual channels

Humans read some visual channels with millimeter precision and others with order-of-magnitude noise. Every encoding decision — before any chart type is named — should respect the perceptual hierarchy. [`../00-mental-model.md`](../00-mental-model.md) introduces the ranking; this file is the operational expansion.

## The perceptual hierarchy

Ordered from most accurately perceived to least. Use the top channels for the variables that most need to be read precisely.

1. **Position on a common scale** — bar height on a shared baseline, scatter point x/y, line-chart y at a given x. Most accurate.
2. **Position on non-aligned scales** — points across small-multiple panels. Second-most accurate; the axis is the same, but the baseline isn't.
3. **Length** — un-baselined bars, segments of a stacked bar not touching the baseline.
4. **Angle / slope** — pie wedges, clock hands, line-chart slopes. Much noisier than position.
5. **Area** — treemap cells, bubble sizes. Readers systematically underestimate large values and overestimate small ones.
6. **Volume / 3D** — worst per-unit-ink precision; every 3D column on 2D data pays this tax.
7. **Color saturation / lightness** — heatmaps encoding a quantity. Useful for ordered signal, poor for reading exact values.
8. **Color hue** — red vs. blue. Not quantitative at all; categorical only.

**Consequence:** encode the primary quantitative variable with channel 1, 2, or 3. Use channels 4–8 for secondary variables or categorical distinctions.

## Data-type → channel mapping

Match the type of the variable to the channel before picking a geom.

- **Continuous quantitative** → position (x or y). If position is taken, length. If length is taken, size (with caveats) or sequential color. Never hue alone.
- **Ordered discrete** (low / medium / high; small / medium / large) → position, or sequential color (lightness ramp in one hue). Preserve order in the visual too.
- **Unordered categorical** → hue, shape, or facet. Never size (implies quantity), never lightness (implies order).
- **Time** → position on x-axis, left-to-right, linear unless span is orders of magnitude.
- **Geographic** → map coordinates (position on a projected plane). When no map is available, treat as unordered categorical with region names as labels.
- **Hierarchical** → facet, nested position, or specialized geoms (sunburst, treemap). Avoid hue for depth.

## When to use each channel

### Position (the workhorse)

- First choice for every quantitative variable. Every chart type built on position — bar, line, scatter, dot plot — reads more accurately than alternatives.
- Two variables on position (scatter's x and y) lets readers perceive correlation pre-attentively.
- Prefer a common baseline (shared axis) to a non-aligned one. Small multiples trade some position accuracy for faceting power.

### Length

- Second choice. Any bar-like geom. Works best when bars share a baseline (making it effectively channel 1). When bars start mid-chart (un-baselined, as in floating bars or inner segments of a stacked bar), readers must compare lengths without a shared origin — noisier.
- Length on a stacked bar: only the bottom segment is on a common baseline. All others are just lengths.

### Angle / slope

- Reserved for cases where rough magnitude is acceptable: progress dials, pie wedges for 2–3 parts, line-chart slopes where the reader is comparing rate-of-change rather than magnitude.
- Slope is *directional* information — it reads as "going up" or "going down" faster than as "by how much".
- Every pie, donut, sunburst, and gauge pays an angle/area tax. Acceptable only when rough magnitude is the message.

### Area

- Use only when the variable is *already two-dimensional* (geographic region size) or when rough comparison across wide orders of magnitude is the point (treemap for budgets).
- If you must encode a scalar quantity with area, scale the *area* — not the radius or the side — proportional to the value. A circle where radius ∝ value looks quadratically too big.
- Never encode a one-dimensional quantity with volume. 3D columns on 2D data are always wrong.

### Size (on points, in 2-D)

- Acceptable for a secondary quantitative variable in a scatter plot (bubble-chart third dimension), where the primary relationship is already encoded in x/y position.
- Limit dynamic range (ratio of largest to smallest bubble) to about 1:10 — beyond that, the smallest bubbles become invisible.
- Always verify that area (not radius) is proportional to value.

### Shape

- For unordered categorical distinction in scatter plots, ≤5 shapes. Beyond that, readers cannot match glyphs to the legend.
- Pair shape with color for redundant encoding so the chart degrades gracefully in grayscale and for color-blind readers.

### Color: hue vs. lightness vs. saturation

Treat these as three separate channels, because they are.

- **Hue** (red vs. blue vs. green) → unordered categorical only. ≤4 distinct hues in a chart before working memory breaks down.
- **Lightness** (dark to light in one hue) → ordered or quantitative. The correct channel for a sequential color scale (e.g., light blue → dark blue for small → large).
- **Saturation** (muted to vivid) → useful for emphasis (vivid = focal, muted = context). Less useful as a primary quantitative channel than lightness.

See [`color.md`](color.md) for palettes and accessibility.

## The ≤3-aesthetics-per-chart rule

Beyond three variables encoded in one panel, readers cannot hold the mapping in working memory. Count aesthetics including position.

- Two variables → scatter (x, y) or bar (category, value). Easy.
- Three variables → scatter with color, or bar with color-stack. Still readable.
- Four variables → start to facet. Reach for small multiples (see [`small-multiples.md`](small-multiples.md)).
- Five or more → definitely facet, or split into multiple charts. A single panel cannot carry this.

## Redundant encoding for accessibility

Encoding the same variable with two channels degrades gracefully when one channel fails.

- **Color + shape** in scatter plots: readable in black and white, readable for color-blind readers.
- **Color + pattern** in stacked bars: color primary, diagonal hatching or dot pattern as a fallback.
- **Color + label** always: every color used for encoding should have a direct label or a legend. Never rely on color alone for critical information.
- **Color + position**: in a ranked bar chart, the sort order already encodes rank; color is a redundant accent that helps the eye, not the core encoding.

Redundant encoding is *not* the same as clutter. It is resilience. Clutter is adding non-data-ink for decoration.

## Channels that are almost never right

- **3D depth on 2D data.** Always paid the volume tax and the perspective distortion tax, never pays back in precision.
- **Hue for quantitative magnitude** (classic rainbow / jet palette). Perceptually nonuniform — equal data steps look unequal. Use a lightness ramp in a single hue, or a perceptually uniform scale like Viridis.
- **Dual y-axes** encoding two series on shared x. The visual correlation is an artifact of scale choices, not data.
- **Angle alone for precise comparison** (pie chart, radar chart). Angle is channel 4; bars are channel 1–3.
- **Area alone for precise comparison** (bubble chart, treemap). Area is channel 5.

## Operational rules

- Decide aesthetics *before* picking a chart type. Which variables go to position? Which to color? Which to facet? The chart type tends to fall out.
- The most important variable gets the most accurate available channel (usually y-position).
- When you're out of good channels, facet. Do not reach for size, shape, or hue for a fourth quantitative variable.
- When a chart feels crowded, one aesthetic is doing double duty. Drop one, or facet.
- Use color for *meaning* (encoding or emphasis), not for decoration.

## Worked examples

### Example 1: revenue by region, over time

Variables: region (categorical, 4 values), month (time, 12 values), revenue (continuous).

- Revenue → y-position (channel 1).
- Month → x-position (channel 1).
- Region → color hue (channel 8, categorical OK since ≤4).
- Chart type follows: `line`, one line per region, direct-labeled endpoints.

### Example 2: CAC vs. retention by cohort size

Variables: CAC (continuous), retention (continuous), cohort size (continuous, secondary).

- CAC → x (channel 1).
- Retention → y (channel 1).
- Cohort size → size on points (channel 5). Acceptable as secondary.
- Chart type: `scatter`, bubble-styled. Verify area ∝ size.

### Example 3: 8 product lines' revenue share

Variables: product line (categorical, 8 values), share of revenue (continuous).

- Share → length (channel 3) on a common baseline.
- Product line → y-axis categorical labels.
- 8 is too many for a donut (channel 4). Use sorted `horizontal-bar`.

## See also

- [`color.md`](color.md) — picking palettes for the color channel
- [`scales-and-axes.md`](scales-and-axes.md) — linear vs. log, zero baselines
- [`small-multiples.md`](small-multiples.md) — when to facet instead of adding aesthetics
- [`../00-mental-model.md`](../00-mental-model.md) — the hierarchy in context
- [`../choose-chart/by-data-shape.md`](../choose-chart/by-data-shape.md) — data-type-to-aesthetic matching
