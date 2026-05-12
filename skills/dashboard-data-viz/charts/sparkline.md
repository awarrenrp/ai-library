---
name: sparkline
description: Produce chart.geom (sparkline) — small word-sized inline trend; no axes or labels.
governs: chart.geom (sparkline)
consumes: dashboard.palette
---

# Sparkline

A sparkline is a small, intense, word-sized graphic — designed to be read inline with text, a KPI, or a table row. It has no axes, no labels, no legend, no gridlines. It is a piece of visual typography whose job is to answer "and how has this been trending?" without stealing a tile of dashboard real estate. Pair it with a precise number (which gives the anchor) and the sparkline gives the shape (which the number alone cannot).

Done well, a single sparkline occupies 1/20 of a tile and carries 50 data points. Done badly, it is decoration — a small squiggle next to a big number that the eye skips.

## When to use

- Inline trend context on a KPI tile: the headline value (e.g., `$4.2M MRR`) plus a 12-period sparkline below or beside it.
- A column of sparklines at the end of a pivot table or grid — one sparkline per row summarising that row's time series. Each row gains its full history without widening the table.
- Dense reference dashboards (ops, finance, health metrics) where you must show current value, trend, and comparison across many items in a tight space.
- The reader needs *shape* (rising, falling, volatile, step-change) and the precise value comes from the adjacent number, not the chart.
- Small multiples of sparklines across a category dimension — a "dashboard of sparklines" is often the highest-density honest summary of a business.

## When this beats a line chart

A standard `line.md` chart and a sparkline are not interchangeable. Use a sparkline when:

- The tile's real estate is a number, not a chart. The value is the hero; the trend is context.
- You need to render *many* tiny trends at once (a column per row, a grid of tiles). A full line chart per row is dashboard death.
- The reader will not read exact intermediate values. A sparkline's axis-less form tells that reader: "don't read numbers, read shape."
- Inline with text or a label, like a word. Original framing: "A sparkline is a small, intense, simple, word-sized graphic."

Conversely, switch to a full `line.md` when the reader needs to hover, read intermediate values, compare two series on one chart, or when the trend is the story rather than the garnish.

## When NOT to use

- The reader must read exact intermediate values — use `line.md` with visible axes and gridlines, or a `grid.md` of period columns.
- There is only one or two time points — use a `single-value.md` with a delta annotation, or a slope indicator.
- The trend is the hero and occupies the centre of the tile — use a full `line.md` with labels, not a sparkline.
- The data is categorical or nominal — sparklines are exclusively for ordered/sequential data, typically time.
- Print or low-resolution output where a 16-pixel-tall line will not render cleanly — fall back to a text delta (`▲ 5.3% MoM`).
- The audience is unfamiliar with the convention — sparklines carry a small literacy tax; ensure the adjacent number is always visible so a reader who ignores the squiggle still gets the answer.

## Rules

### Geometry and aspect

- **Small — word-sized.** Target height is one-to-two lines of body text; width is 3–6× the height. A sparkline that's as tall as the KPI it annotates is not a sparkline, it's a small line chart.
- **Consistent aspect ratio** across every sparkline in a column or row of sparklines. The eye is comparing shapes; different aspects distort that comparison silently.
- **Consistent time window.** If one row shows 12 months and another shows 6, the reader cannot compare them. Pick a window and apply it to every sparkline on the view; annotate the window once ("last 12 months") at the top of the column.

### Scale and baseline

- **Consistent scale across sparklines when they are mutually compared.** A column of sparklines for comparable metrics (revenue by region) must share a y-scale so a taller line means a higher value. Document this in a small caption ("common scale") or a range-frame.
- **Independent scales only when the metrics are incommensurable** (one row is a count, the next a percentage). When scales differ per row, label the min/max at the end of the sparkline so the reader isn't misled by shape alone.
- **Zero baseline is not required.** A sparkline is position-encoded like a line chart, not length-encoded like a bar. Let the trajectory fill the vertical space. Do NOT zoom so tightly that a 1% wiggle looks like a crash — aim for the natural range of the series, padded by ~10%.
- **Mark the min and max with small dots** (one light, one dark, or paired colours) when useful — they are the extremes the reader cares about and give the shape absolute anchors.

### Ink

- **No axes, no gridlines, no tick marks, no frame.** This is the point. Every one of these elements, at this scale, is pure chartjunk.
- **No markers at every data point.** The line is the signal. The only allowed dots are: the current value (at the right end), optionally the min and max, and optionally a reference period (e.g., start of fiscal year) as a muted tick on the baseline.
- **One data line.** If you find yourself drawing two, you are drawing a small line chart and should pull it out into its own tile.
- **Line weight thin but visible** — typically 1–1.5px on screen. Heavier than the axis would be if there were one; thin enough that the shape reads as a single gesture.

### Colour and emphasis

- **Muted grey or a single neutral hue by default.** The adjacent number is the hero; the sparkline is context. A saturated colour every row turns the sparkline column into rainbow land.
- **One end-dot at the current value**, often in a slightly stronger colour, anchors the eye to "now" and pairs it with the adjacent number.
- **Sparing directional colour.** If you must encode direction — red for declining, blue or green for rising — do it in the end-dot or in the final segment only, not across the whole line. A sparkline recoloured red from start to finish becomes a mood, not data.
- **Background bands (optional, subtle).** "Bandline" variant: shades a normal-range band (e.g., interquartile of history, or a target band) in very pale grey behind the line; spikes outside the band pop automatically. Use only when the band is genuinely meaningful and gently shaded.

### Pairing with a number

- **Always render with an adjacent precise value.** The sparkline gives shape; the number gives magnitude. The pair is the unit — a sparkline alone in a tile is an incomplete thought.
- **Consistent layout:** value left, sparkline right; or value above, sparkline below. Pick one and apply it to every KPI on the dashboard. Inconsistency between tiles makes the dashboard feel handmade.
- **Delta annotation next to the sparkline** (e.g., `▲ 5.3% vs prior period`) gives the reader the "compared to what?" the sparkline hints at but cannot state.
- **Align to the number's baseline** — the sparkline's vertical centre aligns with the number's x-height so the pair reads as one block of typography.

### Labelling

- **No inline labels on the line itself.** Labelling defeats the sparkline's purpose.
- **One caption once per column/row** of sparklines explains the window, scale convention, and units — "trailing 12 months, common scale, $M". The reader infers the rest.
- **End-dot value** may be labelled with its numeric value when space allows and it is not redundant with the adjacent KPI number (e.g., sparkline showing history, end dot showing the current period, adjacent number showing YTD).
- **Min/max labels in muted type** at the end of the line, for scale-unknown use cases. The canonical example prints the min and max numerals at the right edge of the sparkline in grey — the shape + two anchors carries more information than either alone.

### Variants worth knowing

- **Win/loss sparkline** — a row of tiny up/down blocks instead of a line, for binary-outcome streaks (test pass/fail, on-target/miss by period). Use when the series is inherently categorical, not continuous.
- **Bandline** (variant) — a sparkline with a pale horizontal band shading the "normal" range (quartiles, or a target band); deviations pop automatically. Higher cognitive load than a plain sparkline; reserve for dashboards where "normal" is a domain concept readers know.
- **Bullet-sparkline pairing** — a bullet chart with a sparkline above or below, combining current-vs-target with trend-over-time in one tile.
- **Sparkbar** — a tiny column chart instead of a line, for discrete periods where period-level values matter more than trajectory (weekly counts, daily returns). Follows all sparkline rules except the bar/line encoding.
- **Sparkdot** — a row of tiny dots with one highlighted as the current value; useful for comparing many entities' current standing without drawing a full line per entity. Loses trajectory but gains density.

### Scale choices at sparkline scale

- **Linear is the default.** Most business metrics do not need log scaling, and log at 16-pixel height is usually unreadable.
- **Log scale only when the series genuinely spans orders of magnitude** and the reader expects it (earthquake magnitude, cache hit latency). Label the caption `log` and accept that the shape is qualitative at this scale.
- **Normalised / indexed sparklines** (all starting from 100 at t=0) make many sparklines mutually comparable without sharing an absolute y-scale — a fallback when each row's metric has a different unit. Caption: "indexed to period start = 100".

## Simpler alternatives

When a sparkline isn't the right fit (tile too small, audience unfamiliar, shape not actually needed), several other forms approximate it:

- **`single-value.md` with a trend indicator.** For a KPI tile, render the headline number plus a delta string (`▲ 5.3% MoM`) or an up/down arrow with percentage. This carries the direction and magnitude of change but loses the shape (was it steady, spiky, a late spike?). Best available fallback for KPI tiles.
- **`line.md` rendered small, with axes and gridlines stripped.** The generator's line chart can approximate a sparkline if the tile is small, the axes are hidden, and the legend is removed. This works as a "mini line" tile, but it still has the visual weight of a full chart; it is not truly word-sized. Acceptable for a row of small line tiles on a dashboard; not acceptable for an inline-with-a-number sparkline.
- **`pivot-table.md` with a row of period columns, heatmap-shaded.** For "sparkline per row" use cases, an extra N period columns at the right of the table, shaded with a sequential palette, gives a rough shape-per-row. Loses the continuous line but retains direction and relative magnitude.
- **`combination.md` with the bar series hidden and only the line visible**, sized down — a heavier hack; use only if `line.md` won't render small enough.

None of these are sparklines. The `single-value` + delta fallback carries direction but not volatility or step-change shape — when that shape is what the reader needs, use the real sparkline.

## Anti-patterns

- **A large sparkline** — if it's the size of a line chart, it is a line chart; give it axes.
- **Axes or gridlines on a sparkline** — the form is defined by their absence.
- **Markers at every data point** — at sparkline scale they overwhelm the line.
- **Different y-scales in a column of sparklines without a reason** — silently distorts comparison.
- **Truncated y-scale that exaggerates a flat series into a volatile one** — a 1% wiggle rendered as a mountain is dishonest at sparkline scale just as it is at full scale.
- **A sparkline without an adjacent number** — no anchor, no magnitude; the reader is guessing.
- **Rainbow sparkline columns** where each row's sparkline is a different saturated colour — no hierarchy, cognitive load without payoff.
- **Mixing time windows** across sparklines in the same view — one is 12 months, the next is 6, the next is YTD. Silent distortion.
- **Sparklines for categorical data** — the form requires an ordered (usually temporal) x-axis.
- **Frame or background fill around the sparkline** — undoes the "data-word" effect; the sparkline should sit in body whitespace like a word.
- **Multi-series sparklines** with two or three lines crammed into 16 pixels — at this scale, overlap turns information into tangled yarn. Split into two sparklines side-by-side or drop to a full line chart.

## Worked examples

### KPI tile

A revenue tile showing:

```
Monthly recurring revenue
$4.23M           ▁▂▂▃▃▄▄▅▆▇██
                 ▲ 6.1% MoM   last 12 months
```

The big number is the hero; the sparkline runs the width of the number; the delta and window caption live below at muted weight. The end-dot matches the delta colour convention (muted green/blue for up, muted orange for down). The reader sees magnitude, direction, and shape in one tile.

### Per-row in a pivot table

A region × metric pivot with a trailing "trend" column of sparklines, one per row. All sparklines share the same 12-month window, common y-scale noted in the column header as "common scale, $M". Rows where the trend is flat versus those where it is declining pop visually; the reader's eye is drawn to the shape differences, not to any one number. Exact values remain in the body cells.

### Small-multiples of sparklines

Twenty product sparklines in a 5×4 grid, each labelled with product name and current value, common y-scale, identical window. One title above: "Weekly active users by product, last 13 weeks." This is the canonical "dashboard of sparklines" — high density, scan-all-at-once, no chartjunk.

## See also

- [`line.md`](line.md) — the full-size cousin; rules for time-series and scale
- [`single-value.md`](single-value.md) — the KPI tile a sparkline decorates
- [`pivot-table.md`](pivot-table.md) — where per-row sparklines live
- [`../encode/visual-channels.md`](../encode/visual-channels.md) — why position beats length at tiny scales
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — data-ink maximisation, which sparklines embody
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — consistent scales across comparable views
