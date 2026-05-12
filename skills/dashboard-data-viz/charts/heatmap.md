---
name: chart-heatmap
description: Produce chart.geom (heatmap) — 2D grid of cells colored by value. Pattern discovery across a matrix.
governs: chart.geom (heatmap)
consumes: dashboard.palette
---

# Heatmap

A heatmap is a two-dimensional grid of cells, one per pair of categorical values, with each cell filled by a color that encodes a quantitative measure. The viewer's eye scans the grid for bright (or dark) regions, ridges, and clusters — the chart excels at revealing *where* in a 2D categorical space the action is, rather than precise values.

Decomposed in the grammar: `stat=identity + geom=tile + scale=color_gradient`, with two categorical position aesthetics and one continuous color aesthetic. A calendar heatmap is the same structure, with the categorical dimensions being day-of-week and week-of-year.

## When to use

- **Two categorical dimensions + one measure.** The natural shape for the data is already a table with a quantitative value per cell. Examples: signups by `day_of_week × hour_of_day`, error rate by `region × product`, retention by `cohort × months_since_signup`.
- **Pattern discovery, not precise reading.** You want the viewer to see the shape — clusters, bands, hot corners, cold rows — and drill into a table or filtered bar chart when they need the exact number.
- **High data density.** A heatmap can legibly carry hundreds of cells in the space a bar chart would waste on 8 categories. This is data density in practice.
- **Calendar heatmaps.** Daily values over one or more years, arranged as a 7×52 grid (day-of-week × week-of-year), are a specialized heatmap that makes weekly and seasonal patterns pop.
- **Cohort / retention tables.** The classic "percent retained at week N by signup cohort" visualization is a heatmap with an implicit triangle (future cells are empty for recent cohorts).
- **Correlation matrices.** Pairwise correlations across many variables read fast as a diverging heatmap (see diverging-scale rule below).

## When NOT to use

- **When precise values matter.** Color is a weak quantitative channel. If the audience will compare cells numerically ("is A higher than B?"), use a sorted `horizontal-bar` or `pivot-table` with right-aligned numbers.
- **When one dimension has too few categories.** Two regions × eight products should be a grouped bar chart, not a heatmap — the grid is too thin to read as a matrix.
- **When the grid is sparse.** Lots of empty cells destroy the pattern-discovery advantage. Switch to `scatter` with size.
- **When per-cell N is small OR within-cell variance is the real question.** Every cell in a heatmap is a summary (typically a mean or median) over the observations in that cell. If a cell aggregates 2 employees, the mean is noise. If the reader's real question is "are Outstanding merits inside this level actually higher than Meets merits, or does the spread overlap?" — the mean answers the wrong question. The heatmap says "3.9% avg Outstanding, 3.2% avg Meets" and hides that the two ratings' distributions fully overlap. Escalate to a **strip plot** (jittered scatter with one dot per observation, position-encoded, optional color for a second categorical) or **small-multiples of box plots**, where within-cell spread is visible. Rule of thumb: if the typical cell has N < ~10, or if within-cell variance would change the committee's conclusion, the heatmap form is lying by aggregation even when the rules above are followed. See [`scatter.md`](scatter.md) (strip-plot use via jittered scatter) and [`box-plot.md`](box-plot.md).
- **When the audience is unfamiliar with the form.** Heatmaps carry a tutorial tax; annotate a "how to read" marker or include explicit low/high color stops.
- **For part-to-whole within a single row/column.** That's a stacked bar or a bar.

## Rules

### Color scale

- **Sequential or diverging, never categorical.** Sequential (light → dark in a single hue) for measures that run from 0 to a maximum; diverging (two hues meeting at a neutral midpoint) for measures with a meaningful zero or reference point like variance-from-target or percent change.
- **Lightness is the quantitative channel, not hue.** Pick a scale where the darkest shade reads as "most" and the lightest as "least." Reversing this violates expectations and forces the reader to consult the legend every time.
- **Avoid rainbow / jet palettes.** They are perceptually non-uniform — bands of similar color appear to represent different magnitudes and vice versa. ColorBrewer or Viridis-style ramps are the default.
- **Single-hue sequential palettes compress perceptual range and read as ~4 bands even with 8 stops.** A single hue (Blues, Greys, Oranges) has a bounded lightness ramp: the low end (#F7FBFF → #C6DBEF) all reads as "very pale" and the high end (#2171B5 → #084594) all reads as "dark blue." Values spanning ≥3–5× from low to high collapse into a handful of perceptually distinct bands — the 8-hex stop list is lying to the generator about how many shades the reader actually sees. For heatmaps where the reader will compare cell values across a wide range, **prefer multi-hue sequential (YlOrRd, YlGnBu, PuBu) or Viridis**: hues change along with lightness, spreading perceptual work across the full gradient. Reserve single-hue Blues / Greys for heatmaps with narrow data ranges (≤2× low-to-high) or where the shading is decorative reinforcement rather than the primary encoding. See [`../encode/color-palettes.md`](../encode/color-palettes.md) *Multi-hue sequential* and *Perceptually uniform alternatives*.
- **Check color-blind safety.** Especially when the legend stops are the only way to decode the value. Prefer a single-hue sequential (blue → dark blue) over red-green. Viridis and Cividis are colorblind-safe across the spectrum.
- **Pin the scale thoughtfully.** For cross-chart comparison (small multiples of heatmaps), train the scale globally so the color range means the same thing across panels. For single-panel pattern-finding, train locally to use the full color dynamic range.
- **Clamp the visualMap range to the data, not to the theoretical ceiling.** If merit % data runs 0.8% to 9.1%, a visualMap set to `min: 1, max: 10` (or worse, `max: 100`) wastes perceptual range on values the data never reaches; every real cell gets compressed into the lower/middle part of the ramp. Tight-fit: `min ≈ floor(data.min)`, `max ≈ ceil(data.max)`. Analog of the bar-chart "axis max should match the data, not the theoretical ceiling" rule — see [`bar.md`](bar.md).
- **Diverging scale requires an honest midpoint.** If the midpoint is arbitrary (not zero, not a target, not a median), the diverging scale will tell a false story about which cells are "above" and "below" a reference that doesn't exist.

### Ordering of rows and columns

This is the single most impactful decision for a heatmap's readability.

- **Never alphabetical unless the audience specifically expects it.** Alphabetical ordering actively hides patterns.
- **Preferred orderings, in priority:**
  1. **Natural order** — time (Mon→Sun, Jan→Dec, hours 0→23), ordinal categories (size S→M→L→XL).
  2. **By magnitude** — sort rows by row-mean or row-max; sort columns the same way. This pushes "hot" into one corner and makes clusters obvious.
  3. **By cluster** — hierarchical clustering on rows and columns (dendrogram order). This is the canonical genomics / survey-analysis ordering and reveals blocks of similar behavior.
  4. **Custom / domain-specific** — e.g., funnel stage order, org-chart order.
- **Be consistent across small multiples.** If you facet by year, keep the same row and column order in every panel.

### Labeling and annotation

- **Always include a color legend** with low and high value labels (and the midpoint for diverging scales). Units on the legend — `% retained`, `$M`, `errors/1k requests`.
- **Verify the legend actually renders labels.** "Include a color legend with low and high labels" is a two-part assertion; the generator can satisfy the first part (a gradient bar is present) while silently missing the second (no numeric labels, no units). An unlabeled gradient is not a legend — it's decoration. After render, count the text nodes flanking the gradient: expect ≥2 (low, high) for sequential, ≥3 (low, midpoint, high) for diverging, plus a unit suffix on each. If the count is zero, the library drew the bar without labels and a `formatter:` declaration had nothing to format. Library-specific gotcha worth naming: **in ECharts, `visualMap.continuous` with `calculable: false` and no `text:` array renders the gradient with no labels at all** — `formatter` only runs when there's a label to format. Either pass `calculable: true` (interactive handles with numeric labels) or pass `text: [maxLabel, minLabel]` explicitly (note: high first, low second). The matched pair to the "one legend, not two overlaid" rule above — that rule guards against two sets of labels; this rule guards against zero.
- **One legend, not two overlaid.** Library defaults can render both the slider's auto-min/max tick labels AND an additional `text: [low, high]` label strip, producing duplicate "10%" and "1%" labels stacked on top of each other at each end of the color bar. Pick one mechanism and disable the other. In ECharts this means either use `text: [..]` with `show: false` on the calculable handles, or drop the `text` array and let the slider labels carry the legend.
- **Verify legend geometry at render time — orientation, placement, and reserved margin.** The color legend must sit *outside* the plot grid. It should not overlap cells, axis labels, or header text. Library defaults frequently produce geometry the generator didn't intend; two render-time checks catch this before shipping.
  1. **Orientation matches the declaration.** Declaring `orient: "horizontal"` does not guarantee a horizontal bar. In ECharts specifically, `visualMap.continuous` treats `itemWidth` as the bar's *thickness* (perpendicular to the flow direction) and `itemHeight` as its *length* (along the flow direction) — they do **not** swap when `orient` changes. A horizontal legend needs `itemWidth: <thin>, itemHeight: <long>`; passing `itemWidth: 220, itemHeight: 10` with `orient: "horizontal"` produces a 10-wide × 220-tall vertical stripe, not the 220-wide × 10-tall strip the author intended. Other libraries (D3 color-legend helpers, Vega-Lite `legend.direction`) have their own version of this — name the library-local gotcha in the generator's template for each library it targets.
  2. **Reserved margin fits the legend.** The chart's plot-area margin (`grid.bottom` / `grid.top` / `grid.left` / `grid.right` in ECharts, `margin` in D3, equivalents elsewhere) must reserve ≥ the legend's *length along its axis* plus padding for its labels. If `grid.bottom: 64` reserves 64 px and the legend is 220 px long horizontally, there's nothing wrong with the legend — the margin is too small. The library may silently compress or reposition the legend into the plot area; the fix is to widen the margin, not shrink the legend.
  - **Squint test.** Cover the plot cells with a thumb. The legend should read as a labeled color scale anchored to an edge of the chart. If it reads as a floating colored rectangle occupying space the cells should own, the geometry is wrong even if the library rendered without error.
- **Cell values in text are OK when the matrix is small.** Below ~50 cells, printing the value inside each cell gives you a "heatmap table" — precision *and* pattern. At higher density, the labels become noise and should come off.
- **Cell label color is a function of fill value, not a fixed color.** Dark text on a dark cell is unreadable; light text on a light cell is equally illegible. A fixed `label.color: '#252525'` reads fine on the light end of the ramp and vanishes on the dark end (and vice versa). Compute the flip deterministically at design time per [`../encode/color.md`](../encode/color.md) *Text on quantitative fills* — WCAG contrast against each ramp step, threshold 4.5:1 (or 3:1 for large/bold), with the crossover index precomputed once per palette + text-color pair. Heuristic rule of thumb: for a single-hue sequential ramp, the crossover usually lands around the 55–65% step; for diverging ramps, both extremes need the flip. The failure mode is a chart where half the numbers are readable and half are invisible, and the generator doesn't notice because it tested one cell.
- **Do not use axis `splitArea` on a heatmap.** SplitArea renders striped/banded background fills across rows and columns. On charts where the axis is a scaffold (bar, line, scatter), those bands are harmless zebra-striping. On a heatmap, **the cell fills ARE the background** — overlaying splitArea on top of the cells produces false banding (adjacent cells with the same true value render in visibly different shades because the overlay alternates every row/column), which the reader mis-reads as data variation. ECharts default behavior is to render splitArea *above* the cells when both are enabled, so the banding wins. Remedy: set `xAxis.splitArea.show: false` and `yAxis.splitArea.show: false` on every heatmap. Use `itemStyle.borderColor: '#FFFFFF'` (or the page background) with a small `borderWidth` to separate cells — the cell fills handle the rest.
- **Axis labels are non-negotiable.** Don't assume the reader will decode "Jan–Dec × Mon–Sun" without explicit labels.
- **Row and column totals / margins when useful.** A right-edge bar of row sums and a bottom-edge bar of column sums can turn a heatmap into a small-multiples of marginal distributions.
- **Title states the pattern, not the matrix.** "Support volume peaks Tuesday afternoons and Monday mornings" beats "Tickets by day and hour".

### Marking flagged rows or columns

A common pattern: the heatmap encodes a quantitative measure on a sequential scale AND flags a subset of rows or columns as "problematic" with a categorical accent (orange, red, focal hue). The failure: the flag lives only in the axis label's text color while the data cells carry the full visual weight. Axis labels are low-ink peripheral; cells are high-ink central. The flag whispers; the cells shout. Readers don't notice the orange label until someone points it out.

Rules for row/column flags on a heatmap:

- **Name what the flag is, where it lives, and what the subtitle promises — before rendering.** If the subtitle says "orange box marks flagged departments," the plot must actually render an orange box around each flagged row. A subtitle that promises an annotation the chart doesn't deliver is a vertical-logic failure — see [`../dashboard/narrative.md`](../dashboard/narrative.md) *Vertical logic*. Either render the annotation or rewrite the subtitle to match what's actually drawn ("flagged departments in orange text" if the chart only recolors labels).
- **The flag needs an in-plot channel, not just axis-label color.** Strong options, from highest to lowest in the perceptual hierarchy:
  1. **Row/column outline (border or frame)** — draw an accent-color stroke around the entire flagged row or column, in the plot area. Strongest signal; works regardless of cell fill darkness. Render as a `graphic.rect` or equivalent overlay.
  2. **Left-edge accent bar** — a thin vertical accent-color bar just outside the y-axis labels, spanning the flagged row's height. Gestalt enclosure; less intrusive than a full border.
  3. **Accent-color gutter tint on the axis-label strip** — fill the axis-label cell (behind the label text) with a pale accent tint, so the label sits on a colored band that extends visibly past the cells.
  4. **Small accent-color marker (●, ▶) next to the label** — shape + color, redundant encoding, survives grayscale.
- **Axis-label text color is reinforcement, not the signal.** Coloring the flagged row's label orange is fine *as an additional cue* on top of one of the in-plot channels above. It is not sufficient on its own — the cell fills visually dominate the label.
- **Keep the cell encoding strictly sequential.** The flag should not bleed into the cell fills themselves (e.g., tinting the flagged row's cells orange). That would conflate the categorical flag with the quantitative data encoding and break the sequential ramp. The flag is a *layer on top of* the data, not a replacement for it. See [`../encode/color.md`](../encode/color.md) *One hue, one meaning per dashboard*.
- **Verify at render time.** Squint-test: can the reader identify flagged rows/columns without reading the labels? If the flag disappears when you cover the axis labels, the flag is in the wrong channel.

### Layout and proportion

- **Square or near-square cells** unless a different aspect ratio carries information. Rectangular cells implicitly encode a second "size" variable that isn't in the data.
- **Grid lines between cells should be very light or absent.** The color fill does the work; heavy grid lines compete with the data.
- **Calendar heatmap: 7 rows × ~52 columns**, week boundaries at the top, year labels on the left. Month separators as thin vertical rules help the eye chunk the year.

### Sizing the tile (procedural — apply at design time, not after rendering)

The most common heatmap failure is a tile that's wide enough but too short for its row count, producing flat 4:1+ cells with overlapping y-axis labels. The fix is structural — pick the tile's vertical extent at design time so the rendered cells land near square. Procedure:

1. **Count categories.** Let M = number of x-axis categories (columns), N = number of y-axis categories (rows).
2. **Pick a target cell aspect**: 1.0 (square) by default. Calendar heatmaps and a handful of domain conventions take wider-or-taller cells, but only when the aspect itself is information.
3. **Compute the tile aspect needed for that target.** The tile's plot-area width:height ratio should be approximately M:N. Subtract chrome (title, legend, axes — typically ~80 px of vertical chrome) before computing. On a typical column-grid dashboard with row-heights around ~180 px and 12-col tiles ~92 px wide, an N-row × M-col matrix needs roughly `N × (interior_width / M) + 80` pixels of tile height to land on near-square cells.
4. **Round up, not down.** Cells slightly taller than wide read fine; flat cells with crammed labels do not.
5. **Declare the required vertical extent before drawing the chart**, alongside the column extent. A tile that defaults to one grid row tall will not honour this rule for any heatmap with more than ~6 rows. Declare the row count explicitly when committing to layout.

Worked example: M=12, N=25 on a 12-col dashboard. With an 8-col tile, interior width ≈ 8 × 92 - 60 ≈ 670 px, M=12 → ~56 px per cell. For 56-px-tall rows × 25 = 1400 px of interior height needed → tile height ≥ ~1480 px → at row-height ~180 px, that's ~8 grid rows tall. Or reduce N by sampling top-12 rows, in which case 4 grid rows suffice.

If the required vertical extent would push the dashboard past a reasonable height, the right answer is **fewer categories**, not flatter cells. Sample top-N + bottom-N (small-multiple), or move the question to a different chart type (`bar.md`).

Renders that violate this — visually flat cells, overlapping y-labels — fail the *text-on-quantitative-fill contrast scan* and the broader *consumed-not-declared* family in [`../03-composition.md`](../03-composition.md): the spec said "heatmap with N rows" but the rendered geometry didn't realize the implied square-cell intent.

**Do NOT fix wrong-aspect cells by squeezing internal chart margins.** A heatmap whose cells render flat or tall is a *tile sizing* problem, not a *plot area* problem. Adding generous left/right padding to the chart so the cells happen to come out square just creates dead whitespace inside the tile and shrinks the plot for everyone reading it. The plot area should fill the tile (small axis-label gutter aside). If the cells aren't square, change the tile's row or column extent at layout time; if the tile extent is locked, accept slightly-off-square cells, reduce N, or switch chart type. Never trade plot area for cell aspect.

## Simpler alternatives

When a heatmap isn't the right fit (audience unfamiliarity, tile can't fit the matrix unscrolled), ranked alternatives below — but first, a precondition that applies to all of them.

**Precondition · the matrix must fit unscrolled in its tile.** A heatmap's affordance is *whole-grid parallel scan* — the reader's eye traverses rows and columns simultaneously, finding clusters, bands, hot corners. Scrolling serializes a perception meant to be parallel and voids the reason the form was chosen. The chart still renders; it no longer does its job. If the data does not fit the tile unscrolled, **none** of the fallbacks below preserve the pattern-discovery function. Pick one of these instead:

- **`scatter`** — when the two categorical dimensions can be recast as continuous axes (e.g., "cohort × week" becomes "tenure × retention") or one categorical can be collapsed into color, and the question is the shape of the relationship. 80 engineers fit comfortably at ~350×350 px where the same data scrolls as a pivot.
- **Ranked `horizontal-bar`** — when the real question is "who is highest/lowest," not the 2D pattern. Drops the secondary dimension; gains unscrolled readability.
- **Faceted small multiples** whose individual panels each fit — one heatmap-like tile per team, region, or segment. Shared scales keep cross-panel comparison honest; see [`../encode/small-multiples.md`](../encode/small-multiples.md).
- **Reduce the data** — filter, aggregate (roll rows up to team subtotals only), cap at top-N + "Others," or shorten the time window until the matrix fits.

Don't pretend a scrolling shaded pivot is a heatmap. See [`pivot-table.md`](pivot-table.md) *Conditional formatting · If the pivot scrolls* and [`../dashboard/chrome.md`](../dashboard/chrome.md) *Scrolling silently changes what a tile does* for the dashboard-level framing.

Ranked alternatives (assuming the matrix fits):

1. **`pivot-table` with conditional formatting (color fill per cell).** This is a heatmap by construction — color encodes magnitude, rows and columns are categorical. Use a sequential fill (light → dark in one hue); right-align numbers; suppress borders; sort rows and columns by magnitude, not alphabetically. This is the closest structural substitute and often all the user actually needs.
2. **Small multiples of `horizontal-bar`** (one per row of the intended heatmap). Loses the column-by-column visual scan, but preserves precise reading. Good for ≤10 rows.
3. **`scatter` with size or color.** One point per cell, x = column category, y = row category, size/color = measure. Works when the matrix is sparse or irregularly populated. Sort the categorical axes by magnitude.
4. **`stacked` / `horizontal-stacked`** is *not* a fallback. It encodes part-to-whole, not a 2D categorical × measure grid.

When you substitute a `pivot-table` for a heatmap, tell the user explicitly that this is the heatmap-as-shaded-table rendering, and keep the design rules above (sequential color, sort by magnitude, low/high legend).

## Anti-patterns

- **Rainbow / jet color scale.** Perceptually misleading; two adjacent cells can look wildly different while encoding nearly the same value.
- **Categorical color (blue/green/red/yellow per cell).** Destroys magnitude. Reserve categorical hue for categorical data; here the data is quantitative.
- **Alphabetical row/column order.** Hides the pattern the heatmap exists to reveal.
- **Single-hue sequential (Blues, Greys) on a wide data range.** Perceptually compresses to ~4 visible bands even with 8 hex stops — all "dark blue" cells look the same to the reader. Use multi-hue sequential (YlOrRd, PuBu) or Viridis when cross-cell comparison matters. See *Color scale · Single-hue sequential palettes*.
- **visualMap min/max set to the theoretical ceiling.** `min: 0, max: 100` on a heatmap where data runs 1%–9% wastes 90% of the ramp. Clamp to the data extent.
- **Fixed cell-label color regardless of fill.** Black text on dark cells is invisible; white text on light cells is invisible. Compute per cell from the fill value.
- **Axis `splitArea` turned on.** Creates striped row/column background fills that overlay the heatmap cells and produce false banding — adjacent cells with the same true value render in visibly different shades. The cell fills ARE the background; splitArea is for non-heatmap grids.
- **Row/column flags carried only by axis-label color.** Orange axis labels next to full-saturation data cells disappear in the squint test. The flag needs an in-plot channel (row outline, edge bar, gutter tint) — see *Marking flagged rows or columns*.
- **Subtitle promises an annotation the chart doesn't render.** "Orange box marks X" with no box in the plot is a vertical-logic failure — rewrite the subtitle or render the box.
- **Aggregating away the story.** Cells with N < ~10 or where within-cell variance is load-bearing hide the real answer behind a mean. Escalate to strip plot or box-plot small multiples — see *When NOT to use · per-cell N*.
- **Red-green diverging scale without a secondary cue.** 8% of men can't distinguish the two ends. Use blue-orange or add a lightness gradient.
- **No legend.** Color alone is not self-explanatory. Even with an intuitive scale, the reader needs units and stops.
- **Duplicate legend labels** — library renders both `text: [low, high]` and auto-slider ticks, producing overlapping "1%" and "10%" labels. Pick one mechanism.
- **Unlabeled legend gradient.** A color ramp with no numeric labels or unit suffix is decoration, not a legend — the reader can see "darker cells are higher" but cannot decode any cell to a value. Common in ECharts when `calculable: false` is set without a `text:` array (no labels get drawn; a `formatter` has nothing to format). See *Labeling and annotation · Verify the legend actually renders labels*.
- **Legend rendered inside the plot area.** A color legend that overlaps cells, axis labels, or column headers is almost always a dimensions-or-margin bug, not a layout choice — the library placed the legend where the author's declared dimensions and reserved margin told it to, and one of the two is wrong. Squint test: if the legend reads as a floating colored rectangle intruding on the data, fix the geometry (swap `itemWidth`/`itemHeight`, enlarge the grid margin, re-anchor with `left`/`bottom`) — don't leave it. See *Labeling and annotation · Verify legend geometry at render time*.
- **Heavy grid lines or cell borders.** Chartjunk; the color fill already defines the cells. (A thin border in the page background color to separate cells is fine — that's cell-gap, not chartjunk.)
- **Mixing scales across small multiples silently.** If panel A's dark red means "100" and panel B's dark red means "10," the viewer sees a false uniformity.
- **3D heatmap / contour surface on flat data.** 3D on 2D data is a graphical integrity violation.
- **Using area (bubble) instead of color fill for the same two-categorical-plus-measure shape.** Area is a weaker channel than the cell's position-on-grid plus color; bubble charts are noisier for pattern finding.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — matched dimensionality, area/volume cautions, honest color scales
- [`../encode/color.md`](../encode/color.md) — sequential vs. diverging vs. categorical scales, colorblind-safe choices, color-in-context (cell label contrast), one-hue-one-meaning (flag vs data conflict)
- [`../encode/color-palettes.md`](../encode/color-palettes.md) — multi-hue sequential and Viridis when single-hue compresses
- [`../encode/small-multiples.md`](../encode/small-multiples.md) — shared vs. per-panel scale training for heatmap grids (when added)
- [`../dashboard/narrative.md`](../dashboard/narrative.md) — vertical logic: subtitle promises must be visible in the plot
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — muting cell borders and gridlines
- [`scatter.md`](scatter.md) — strip-plot alternative when per-cell N is small or within-cell variance matters
- [`box-plot.md`](box-plot.md) — small-multiples alternative when distribution per group is the story
- [`pivot-table.md`](pivot-table.md) — the closest structural substitute
