---
name: bar
description: Produce chart.geom (bar) — nominal comparison, ranking, or part-to-whole via unstacked bars. Default answer to 'compare these values'.
governs: chart.geom (bar), chart.mark
consumes: dashboard.palette, dashboard.category-order, chart.reference-line (label placement per craft/annotations.md)
---

# Bar chart

A bar chart encodes quantity as length from a common baseline, read across discrete categories. It uses the most accurate perceptual channel humans have — position on a common scale — and is the default answer to almost every "compare these values" question. Vertical and horizontal bars are the same geom with the coordinate flipped; pick orientation based on labels, ordering, and reading direction, not style.

## When to use

- **Nominal comparison** — values across discrete categories with no natural order (sales by region, headcount by function).
- **Ranking** — values ordered by magnitude (top 10 customers, worst-performing SKUs).
- **Part-to-whole** where precise comparison of parts matters — unstacked bars sorted by value beat pies and donuts every time.
- Time series only when emphasising individual periods over the overall trend — otherwise use `line.md`.
- Deviation from a reference (actual vs. target) — bars anchored at the baseline with a reference line, or a combination chart with bars and a target line (see `combination.md`).

## When NOT to use (and alternatives in the palette)

- Continuous time trend where shape matters more than individual values → `line.md`.
- Subtle differences among similar-length values where a zero baseline hides the story → `dot-plot.md` lets you use a non-zero scale honestly. Truncating a bar is **not** an acceptable substitute.
- Two axes on the same chart (bars + line with different units) → `combination.md`, but read its warnings first.
- Part-to-whole where the total is the message and parts are secondary → `stacked.md`.
- Many categories (≳25) → `bar.md` with scroll, or aggregate smaller categories into "Other".

## Orientation: vertical vs horizontal

Pick orientation intentionally — the data encodes identically, but readability shifts.

**Use vertical (column) bars when:**

- X-axis is time-ordered (months, quarters, years) — left-to-right reads as past-to-present.
- Few categories (≲10) with short labels that fit under the bars.
- The comparison is of *totals* or *magnitudes* the reader should feel rise and fall.

**Use horizontal bars when:**

- **Category labels are long** — horizontal lays labels along the y-axis where they can be arbitrarily long without rotation.
- Many categories (10–25+) — vertical bars squeeze toward a forest; horizontal can scroll.
- **Ranking** — ordering top-to-bottom reads naturally; the eye scans the y-axis like a list.
- Reading left-to-right (bar length) matches how a ranked list reads.

**Never rotate text under vertical bars** to "make it fit" — if labels need rotation, flip to horizontal.

## Rules

### Zero baseline (non-negotiable)

- **Bar charts MUST start at zero.** This is the single most common integrity violation in dashboards. Length encodes value; a truncated baseline makes a 5% change look like a doubling.
- If zero makes the chart unreadable because variance is small relative to absolute values, **switch form — don't truncate.** Use a dot plot, a slopegraph, or show variance directly ("% change vs prior") in a chart that can honestly use a non-zero scale.
- Do not insert a "break" in the axis to hide the lower range — readers miss the break and misread the ratios.

### Sorting

- **Sort by value unless a meaningful natural order exists** (time, age brackets, convention like Mon–Sun).
- Descending when the biggest is the story; ascending when the smallest is the story.
- For horizontal bars: biggest at top when highlighting max; smallest at top when highlighting min (top-left scans first).
- Alphabetical is not an ordering — it is the absence of one. Avoid it unless the reader will genuinely look up by name.

### Width, spacing, and geometry

- **Bar width > gap width**, but bars should not become square — readers start comparing area instead of length. A useful heuristic: bar width roughly 60–75% of (bar + gap).
- **Consistent spacing** across the chart; no manually resized bars.
- For part-to-whole-via-bars (100% total), bars may **touch** (no gap) to visually signal they are pieces of one whole.

### Colour

Consumes `dashboard.palette`. Load the resolved palette from [`../encode/color.md`](../encode/color.md) and [`../dashboard/consistency.md`](../dashboard/consistency.md) before assigning fills. Don't invent colors at render time.

- **Single hue by default.** Don't vary colour per bar in a ranked list — the reader perceives category distinction that doesn't exist, and working memory wastes on a rainbow that encodes nothing.
- **Accent colour only on the focal bar(s).** Focal means *answers a substantive question the chart is arguing*: "Our Business" vs competitors, this year vs prior years, the threshold-crossing row, the biggest mover, the row the action title names. Grey the rest. **Do not accent bars by structural role** — first/last bars in a sequence, top/bottom of a sort, "bookend" bars at the boundaries of a funnel. Those roles encode position, not data. If the bars are sequential stages of a lifecycle/funnel/pipeline, accent the largest step-over-step drop, not the endpoints. See [`../craft/emphasis.md`](../craft/emphasis.md) *Structural emphasis is empty emphasis* and [`funnel.md`](funnel.md) *Emphasis — highlight the biggest drop*.
- **Stacked / grouped bars encoding a shared dashboard categorical** use the dashboard-scope palette exactly (one color per series across every chart).
- **Sequential palette** only when bars are already sorted and the colour reinforces magnitude — usually single hue with varied lightness is enough.

### Labels and direct labelling

- **Direct-label values at the bar ends** (above for vertical, to the right of the bar for horizontal) when the reader needs precise numbers and space allows.
- **Finite label budget — don't label every bar by default.** Labels earn their place by adding information the reader can't read from bar length + axis ticks. On a ranked list of many bars, label only the extremes (top and bottom), the threshold-crossings (first bar above/below target, SLA, reference line), and any focal rows the story is about. The rest read off length and axis. Labeling all 20 bars in a ranking is the visual equivalent of bolding every word — emphasis evaporates, labels become noise. Same finite-contrast logic as [`../craft/emphasis.md`](../craft/emphasis.md).
- **Label precision must disambiguate adjacent bars.** If labels round into visual ties across adjacent rows (`92% / 92% / 92%` when underlying values are `92.3 / 91.8 / 91.5`), either raise precision until labels distinguish, or drop the labels and let bar length carry the comparison. The bars are still distinguishable; the labels have lost their job. Generic rule in [`../craft/typography-and-labels.md`](../craft/typography-and-labels.md).
- Category labels direct on the axis; drop the axis title if it's redundant ("Region" above a list of regions adds no information).
- **Every category gets a y-axis label on horizontal bars — override library auto-decimation.** With ~15+ rows, libraries silently drop every Nth y-axis label to "save space" (ECharts `axisLabel.interval` adaptive default; Plotly `yaxis.tickmode: 'auto'`; D3 default tick generator). 30 bars, 15 labels visible, no way to link a bar to its team. Override: ECharts `yAxis.axisLabel.interval: 0`; Plotly explicit `tickvals`; D3 explicit `tickValues(categories)`. Same *consumed-not-declared* pattern as the layout rule in [`../dashboard/structure.md`](../dashboard/structure.md) — declared intent silently replaced with library default. If the label column is genuinely too dense, shorten the labels or reduce the category count; don't let the library decide silently.
- Drop the y-axis when every bar is directly labelled.

### Category count and density

- **Vertical bars: ~10 categories** before the chart crowds; beyond that, flip horizontal.
- **Horizontal bars: ~25 categories** before the chart starts scrolling; beyond that, aggregate tail into "Other", use a grid, or facet.
- If your chart has 40 bars, the chart type is not the answer.

### Sizing the tile (procedural — apply at design time, not after rendering)

A horizontal bar chart with 20+ rows squeezed into a single grid-row-tall tile produces overlapping y-axis labels — the same shape of failure `heatmap.md` *Sizing the tile* describes for cell aspect. The fix is structural: pick the tile's vertical extent at design time so each row gets enough pixels to render its label and bar legibly.

Procedure for horizontal bars:

1. **Count rows.** Let N = number of category rows.
2. **Reserve ~24 px per row** at typical dashboard font sizes (font-size 13 + line-height + bar-and-gap allowance; tighter than 18 px starts to crowd labels and bars together).
3. **Compute the required tile height.** Interior plot height ≈ tile height − ~80 px of chrome. Required interior height = N × 24. So tile height ≥ N × 24 + 80.
   - 10 rows → ~320 px (≈ 2 grid rows on a typical 180 px row-height dashboard)
   - 20 rows → ~560 px (≈ 4 grid rows)
   - 25 rows → ~680 px (≈ 4 grid rows)
4. **Declare the required vertical extent when committing to layout**, not at chart-config time. A ranked horizontal bar with more than ~6 categories should never default to a single grid row tall.

If the required extent would push the dashboard past a reasonable height, **reduce N** (top-10 only, or top-5 + bottom-5 as small-multiples) rather than flattening the rows. A bar chart with 25 illegible labels has fewer than 25 readable bars.

Vertical bars: same rule mirrored. With > ~10 categories or long category names, flip horizontal first; then size with the procedure above.

### Axis and gridlines

- Horizontal gridlines muted (bar charts) — help reading without competing.
- Remove the baseline *axis line* if it is redundant with the bars themselves touching zero.
- Logical tick intervals (10, 25, 50, 100); strip trailing zeros.
- **Axis max should match the data, not the theoretical ceiling.** The zero-baseline rule (above) fixes the lower bound; the upper bound is still a choice. When bars encode a proportion (`% of team active`, `DAU %`, `conversion rate`) do **not** auto-scale the axis to 100% just because the metric *can* reach 100. Default: max ≈ **1.25 × the largest bar value**, rounded to a clean tick — 31% max → 40% axis; 62% max → 80% axis; 18% max → 25% axis. An over-stretched axis (100% when data tops at 31%) pushes every bar into the left third of the plot, shrinks inter-category differences into visually indistinguishable stubs, and leaves the rest of the tile as dead plot area. This is the lie-factor concern from the opposite direction: under-zoomed axes understate the effect in the data just as over-zoomed axes overstate it. Only extend to the theoretical ceiling when the headroom is itself the editorial point ("we're at 31% of the 100% ceiling — long way to go"), and in that case **annotate the ceiling** (reference line or subtitle note) so the reader knows why the axis extends where it does. The same logic applies to any metric with a known cap — SLA, target, budget — max to ~1.25× the largest bar by default; extend to the cap only when distance-to-cap is the story.

## Anti-patterns

- **Truncated baseline** (the classic; causes most of the bar-chart lies in the wild).
- **Alphabetical sort** when value order would reveal ranking structure.
- **Rainbow fills** — every bar a different colour with no categorical meaning.
- **Gradient fills** within a bar — decoration, not data; also makes bar tips ambiguous.
- **3D bars** — perspective distortion, non-proportional visual size.
- **Rotated 45° labels** under vertical bars — flip the chart instead.
- Inconsistent bar widths across a dashboard's bar charts.
- Using bars for continuous time when a line would show the trend better.
- Manual axis break with no gap marker to hide a truncation.
- **Axis stretched to the theoretical ceiling on a proportion metric that tops out well below.** Data clusters 10–31%, axis runs to 100%. Bars compress into the left 30% of the plot, inter-category differences become unreadable, and 70% of the tile is empty — dead plot area masquerading as "honest framing." Scale max to ~1.25× the largest bar unless the distance-to-ceiling is itself the story *and* is annotated. See *Axis and gridlines* above.

## See also

- [`stacked.md`](stacked.md) — when the total is the message and parts are secondary
- [`line.md`](line.md) — when the data is continuous / time-series
- [`combination.md`](combination.md) — bars + a reference or target line
- [`dot-plot.md`](dot-plot.md) — honest non-zero scale for subtle differences
- [`../encode/color.md`](../encode/color.md) — accent colour strategy
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — the zero-baseline rule in full
