---
name: typography-and-labels
description: Produce chart.title, chart.subtitle, chart.direct-label, chart.axis labels, chart.legend text.
governs: chart.title, chart.subtitle, chart.direct-label, chart.axis (labels), chart.legend (text)
---

# Typography and labels

Text is not decoration on a chart — it is part of the chart. Titles assert the takeaway, axis labels declare what's being measured, direct labels eliminate legend lookups, and the typeface determines whether any of it is actually read. Treat text as a first-class design layer.

## Action titles, not descriptive titles

The title is the single most valuable line of text on any chart. A *descriptive* title (`2024 Revenue by Region`) tells the reader what they're looking at. An *action title* tells them what the chart is saying.

- **Descriptive:** `Q3 Conversion Rate by Channel`
- **Action:** `Paid search conversion is down 30% this quarter; reallocation needed`

Action titles serve multiple functions at once:

- They tell a reader who skims — and many readers skim — what the chart concludes.
- They set expectations for the rest of the chart. The reader approaches the marks with a hypothesis to verify rather than a puzzle to solve.
- They enforce horizontal logic across a dashboard: reading only the titles should trace the dashboard's argument.
- They force the designer to commit to a point. If you can't write an action title, the chart probably has no point, which is a more serious problem than a weak title.

When to use descriptive rather than action titles:

- **Exploratory dashboards** where the reader is hunting for their own insight. An action title pre-empts their reading. Use a neutral descriptive title plus clear axis labels.
- **Reference views** (ops lookup tables, monitoring grids) where the reader wants a specific number, not a story.
- **Chart modules that will be reused** across multiple dashboards with different conclusions — the title can't assert a point that isn't universally true.

## What a good title answers

A descriptive title should at minimum answer three of five W-questions:

1. **What?** — The quantitative subject. "Revenue", "Headcount", "Conversion rate".
2. **When?** — The time range. "Q3 2025", "Jan–Dec 2024", "Rolling 30 days".
3. **How?** — The breakdown or filter. "by region", "by channel, top 5 only", "excluding enterprise".

Additionally useful when relevant:

- **Who?** — The segment. "US customers", "SMB accounts".
- **Where?** — Geography, if not obvious from the chart itself.

A chart titled `Sales` fails on all of these. A chart titled `2024 Sales Bookings by Month and Region (US only, enterprise excluded)` answers every one.

For action titles, fold the What/When/How into the sentence rather than losing them: `US enterprise conversion has fallen every month in 2024` answers what, when, and who in one action title.

## Direct labels beat legends

A legend forces the reader to do three things: (1) read a series on the chart, (2) look up the color in the legend, (3) remember the mapping long enough to move to the next series. Every lookup costs working memory.

Direct labels put the series name next to the data and eliminate all three steps.

Rules:

- **Label line ends.** At the right edge of a line chart, place the series name next to the final point, in the same color as the line. No separate legend.
- **Label bars directly.** Series or category name in or next to the bar itself.
- **Label donut/funnel segments adjacent to the slice**, with a leader line only if the slice is too thin to hold the label internally.
- **Label the focal point of a scatter plot** if there is one; use a legend or tooltip only for the non-focal points.
- **Use the title for the focal series** when there is one. "Paid search fell 30%" eliminates the need to label the "paid search" line at all.

When legends are unavoidable:

- Keep them to 3–5 items at most. More than that, facet into small multiples instead.
- Place the legend close to the data, ideally inside the plot area.
- Arrange legend items vertically, in the order the series appear on the chart (e.g., top-to-bottom matching line endpoint order).
- No legend borders.
- Match legend text color to its corresponding series color (Gestalt similarity reinforces the mapping).

## Axis labels

- **Every axis gets a label, every time.** An axis without a unit is ambiguous and often misleading. A scale with values like `10, 20, 30` could be dollars, millions of dollars, percentage points, or milliseconds.
- **Units on the axis label, not on every tick.** `Revenue ($M)` once, then ticks `0, 10, 20` — not `$0M, $10M, $20M` on every tick.
- **Keep symbols on values that need them.** A percentage axis should show `0%, 25%, 50%`, not `0, 25, 50` with "percent" hidden in the axis title — readers shouldn't have to cross-check.
- **Time axes:** consistent intervals, consistent format. `Jan, Feb, Mar`, not `Jan 2024, Feb, March '24`.
- **Horizontal text only** whenever possible. Rotated labels make reading slow and uncomfortable. If labels don't fit horizontally, either shorten them, switch to a horizontal bar chart, or use angled (not vertical) text as a last resort.
- **Abbreviate** when necessary: `Jan` over `January`, `Q1` over `Quarter 1`. Only if unambiguous.
- **Drop trailing zeros** on tick labels: `10`, not `10.0`. Keep decimals only when the precision is meaningful.
- **Log scales must be labeled** as log. Logarithmic ticks are not self-evident to many readers — see [`../02-graphical-integrity.md`](../02-graphical-integrity.md).

## Endpoint labels on line charts

A specific pattern worth calling out. On any line chart with 2–5 series:

- Place the series name at the right end of each line, in the line's color, with no legend.
- If the final values are close together, offset vertically with small leader lines.
- For the focal series, use bold; for context series, use standard weight in gray (see [`emphasis.md`](emphasis.md)).
- Optional: include the ending value next to the label (e.g., `Paid 4,250`). Useful for reference/scorecards; noise on exploratory charts.

Endpoint labels respect the reading order (left-to-right = time), remove the legend, and let the reader answer "which line is which" instantly.

## Typography

Letter differentiation aids reading: *the more letters are differentiated from each other, the easier the reading*. Concretely:

- **Upper-and-lower case**, not ALL CAPS. All-caps destroys word shape and slows reading. Reserve uppercase for very short labels or category codes (`USD`, `EMEA`).
- **Serifs are easier to read for body-text sizes** in print. In modern dashboard practice, a well-designed humanist sans-serif (Inter, Source Sans, system-ui) is equally legible and often a better fit for screen rendering — the key is *legibility over novelty*, not a specific serif-vs-sans rule.
- **One typeface per chart and per dashboard.** Different fonts for emphasis rarely work without looking amateurish. Use bold/weight variation within a single family instead.
- **No decorative or fussy fonts.** A fussier font is harder to read and the reader's tolerance drops proportionally.
- **Size encodes hierarchy, not decoration.** Titles larger, subtitles medium, axis labels smaller, footnotes smallest. Size differences should be *functional*, not aesthetic flourish.
- **Consistent sizing across the dashboard.** If chart titles are 16pt on one panel they should be 16pt on all panels.
- **Avoid rotated or vertical text.** Vertical y-axis titles are sometimes unavoidable; horizontal is better when the layout allows. Never rotate body or label text beyond standard y-axis conventions.

## Typography is consumed, not just declared

Setting `font-family` in page CSS is only half the job. Chart libraries (ECharts, Chart.js, Plotly, D3-with-canvas) render text onto canvas rather than DOM, and canvas text does not inherit CSS. Every chart-library text element falls back to the library's default (typically `sans-serif` → macOS Helvetica/Arial, Windows Arial, Linux DejaVu) unless you explicitly set the font family on it.

The failure mode is distinctive and easy to miss: DOM text on the page (page title, table cells, KPI labels) renders in the dashboard's chosen stack (Inter, system-ui, etc.); axis tick labels, axis names, chart titles, tooltip text, legend text, data labels, and markLine labels rendered by the chart library render in a subtly different typeface. Same page, two typefaces. On a coupled-vertical-list row (the rule in [`../dashboard/structure.md`](../dashboard/structure.md) §"Coupled vertical lists"), the same entity name appears twice on the same y-coordinate in two different fonts — a glaring consistency break that comes entirely from the library's canvas default, not from a styling choice.

This is the same shape of failure as [`../encode/color.md`](../encode/color.md) §"Palette is consumed, not just resolved": resolving the intent dashboard-side ("Inter for everything") doesn't propagate into the chart library's slots. The library has its own per-component slots, and each unset slot renders in the library's default.

Rules:

1. **Resolve the dashboard's typography stack once** — font family, default text color, size scale. Same shape as `dashboard.palette`. This is a dashboard-scope decision; every chart consumes it.
2. **Apply the resolved stack to every chart-library text slot, not just the top-level one.** For ECharts that means a top-level `textStyle` *plus* overrides at `xAxis.axisLabel`, `yAxis.axisLabel`, `xAxis.nameTextStyle`, `yAxis.nameTextStyle`, `title.textStyle`, `title.subtextStyle`, `tooltip.textStyle`, `legend.textStyle`, `series.label`, `series.endLabel`, `markLine.label`, `markPoint.label`, `graphic` text elements, `dataZoom` labels. Other libraries have analogous slot lists; consult the library docs and audit. A top-level `textStyle` is necessary but usually not sufficient — some slots ignore it.
3. **Audit at render time, not at spec time.** Take a screenshot. Compare any string drawn by the chart library with peer DOM text on the same dashboard — title vs. chart title, table cell vs. axis label, KPI number vs. chart data label. If a chart string looks "slightly off," a slot was missed; the mismatch is not a styling preference, it's an unset slot falling back to the library default.

Typical failure: the page CSS declares `body { font-family: Inter; }`, the ECharts tile sets `textStyle: { fontFamily: 'Inter' }` at the top, and the reviewer notices that axis tick labels still look wrong because `axisLabel` has its own `textStyle` that the top-level didn't reach. Fix the slot, not the CSS.

The same rule extends to font *weight*, *color*, and *size*: each is a slot in the library, each must be consumed, and the audit is the same — compare to peer DOM text.

## Alignment

Alignment is invisible when it works and noisy when it doesn't.

- **Upper-left alignment for titles.** Centered titles "hang in space" and break the scan pattern. Upper-left anchors the reading order.
- **Axis titles aligned to their axis.** Y-axis title at the top of the y-axis (or horizontal over the top tick), x-axis title centered below the x-axis or at the right end.
- **Numbers right-aligned** in tables and in any column of values. Magnitude is read by comparing leading digits; right-alignment makes that possible.
- **Decimal points aligned** in tables. Mixed decimal depth should still line up on the point.
- **Left-align text, right-align numbers, center only section headers.**
- **Consistent grid.** Titles, subtitles, axis labels, legends, footnotes should all align to a shared left edge when possible. Misalignment is one of the fastest ways to make a dashboard feel sloppy.
- **Labels outside the plot must have chart-frame margin reserved for them.** Any label whose logical home is outside the plot rectangle — end-of-bar data labels (value axis must extend past the data max so `5.2 pp` has room past the last bar), long y-axis category names on horizontal bars, endpoint labels at the right of line charts, reference-line labels — needs margin reserved on that side *and* the chart's SVG viewBox / tile `overflow` sized to include it. Correctly-positioned labels still get clipped when the frame is sized to the plot rather than to the labels. Full rule and library specifics (ECharts `grid.*`, Plotly `margin.*`, D3 viewBox) in [`annotations.md`](annotations.md) *Reference-line labels sit in the axis margin*.

## Label legibility on overlapping marks

When a label has to sit somewhere it competes with chart marks (bars, lines, scatter dots, region fills), there's a strict priority order. Reach for the next technique only when the previous one can't apply.

1. **Position-first — move the label out of the overlap.** Almost always the right answer. Reference-line labels into the axis margin ([`annotations.md`](annotations.md) *Reference-line labels sit in the axis margin*); bar-end data labels past the axis max with reserved headroom ([`../charts/bar.md`](../charts/bar.md) *Labels and direct labelling*); dense scatter / map labels via leader-line callout. A label that doesn't overlap a mark needs no further treatment.
2. **Contrast-aware — flip text color against the fill.** When the label *must* sit on a uniform quantitative fill (heatmap cell, choropleth region, conditional-format pivot cell, treemap cell), compute WCAG contrast at design time and flip per cell. See [`../encode/color.md`](../encode/color.md) *Text on quantitative fills*.
3. **Visual armor — stroke or background pill — last resort.** Reach for armor only when position can't help (dense scatter, map labels over irregular fills, small-multiple panels with no margin) *and* contrast-aware can't help (the background isn't a uniform fill the generator can compute against):
   - **Text stroke (SVG).** `stroke: var(--bg-color); stroke-width: 2–4px; paint-order: stroke fill` — a halo of the dashboard background paints behind each glyph. Robust on irregular backgrounds. Tune width to font size (~3px at 12pt is typical).
   - **Background pill behind the text** — small rounded rectangle, fill = dashboard bg color or semi-transparent white at ~85% opacity. Cleaner than stroke for short labels; less effective when the label is long.
   - **`text-shadow` (CSS).** `text-shadow: 0 0 3px white, 0 0 3px white` — cheap halo. Works on DOM text only; canvas-rendered chart text bypasses CSS (same limitation as *Typography is consumed, not just declared* above).

Armor is visual noise. A halo on every callout is the dashboard equivalent of bolding every word — emphasis evaporates. **If you reach for armor on a chart that has unused margin space, you skipped step 1.** Reference-line labels overdrawn by bars, end-of-bar values colliding with the plot edge, endpoint labels pushing past the right edge — all of those want position, not armor. Armor earns its place only on charts where position and contrast genuinely can't reach.

## Number formatting

Keep number formatting consistent, readable, and honest.

- **Thousands commas always:** `12,450` not `12450`. The comma reduces cognitive load; it is not clutter.
- **Currency symbols kept:** `$12,450` not `12,450 (USD)` in the axis title. In-context symbols are instant; external legends are slow.
- **Percent signs kept:** `42%` not `42` with "percentage" elsewhere.
- **Drop trailing zeros** unless the zero carries precision meaning: `10%`, not `10.0%`. In a column where other values are `10.3%, 8.7%, 10.0%`, keep the zero so decimals align — readability of the column beats individual-value thrift.
- **Consistent precision within a column.** Mixing `12.5`, `13`, `14.27` in one column looks random. Pick a precision and apply it uniformly.
- **Precision must disambiguate adjacent values.** If a rounding choice produces visual ties across adjacent labels — three consecutive ranked bars all rounding to `92%` when underlying values are `92.3 / 91.8 / 91.5`; two adjacent table rows both reading `$12K` when they're `$12.3K` and `$11.7K` — either raise precision until labels distinguish, or drop the labels and let the visual encoding carry the comparison. Labels that round into ties have lost their job: the underlying data is distinguishable (bar length, row order), the labels are not. Common in ranked bar charts with data clustered in a narrow range (CSAT, NPS, compa ratio, SLA attainment). For ranked-list specifics see [`../charts/bar.md`](../charts/bar.md) *Labels and direct labelling*.
- **Units appear exactly once per read context.** Anywhere a value is read in isolation — KPI tile big number, chart tooltip, data label, legend entry, table cell — the unit must appear exactly once. Two failure modes:
  - **Double** — `63.4% %` on a KPI tile because the value string was already formatted as `63.4%` AND a separate unit-suffix slot was independently filled with `%`. Component templates that expose both a `value` slot and a `unitSuffix` slot are the common source. *Pick a canonical place per context.* Either bake the unit into the formatted value string (`63.4%`, `$5.82`) and leave the suffix slot empty, or render the value bare and let the suffix slot carry the unit — never both.
  - **Missing** — a scatter tooltip showing `J. O'Connor 18.9` for an "Avg daily spend ($)" series. The reader doesn't have the axis label visible while reading the tooltip; bare `18.9` reads ambiguously. The tooltip is its own read context, separate from the axis. Tooltip formatters must include the unit (`$18.90/day`, `63.4%`), not pass through bare numbers.
  
  Audit at render time: scan KPI values for double-suffix patterns (`%\s*%`, `\$.*\$`); scan tooltip strings for bare numerics where the axis declares units. Single-write-per-context is a verification family in [`../03-composition.md`](../03-composition.md) step 5 — the canonical-slot-per-fact discipline is the same shape as the consumed-not-declared family, mirrored across "wrong count = 0 or ≥2" instead of "silent default."
- **Scale to the unit.** Use `$12M` rather than `$12,000,000` for axis labels. State the unit (`$M`) on the axis title once.
- **Units consistent between axis ticks and direct labels.** If the x-axis ticks read `10d / 20d / 30d`, a value label next to a bar must read `23d`, not `23`. Mixing bare numbers with suffixed ticks forces the reader to reconcile two formats for the same unit — silent cognitive load with no payoff. The rule applies identically for `$`, `%`, `ms`, `K`/`M` abbreviations: whatever the axis carries, the direct label carries too.
- **Negatives:** use a minus sign `-3.2%`, or parentheses `(3.2%)` for accounting contexts. Stay consistent within the dashboard.
- **Dates:** one format across the dashboard. `Jan 2024` everywhere or `2024-01` everywhere — not both.

## The text-layer checklist

Before shipping a chart, run this checklist:

- [ ] **Title** is an action title (explanatory chart) or a descriptive title answering What/When/How (exploratory/reference chart). Upper-left aligned.
- [ ] **Every axis has a label** with its unit.
- [ ] **No legend**, or a short direct-labeled legend if unavoidable, placed near the data.
- [ ] **Lines have endpoint labels** in matching color.
- [ ] **Typography** is a single readable typeface. No all-caps blocks, no fussy fonts.
- [ ] **Sizes** reflect hierarchy: title > subtitle > axis labels > footnote.
- [ ] **Number formatting** is consistent, with commas, currency symbols, and percent signs retained.
- [ ] **Alignment** is clean: titles upper-left, numbers right-aligned, axis titles aligned to their axes.
- [ ] **No rotated or vertical text** except conventional y-axis title.
- [ ] **Source and date** present in a muted footnote (see [`annotations.md`](annotations.md)).
- [ ] **Trailing zeros dropped** unless precision meaningful.
- [ ] **Abbreviations** only where unambiguous.

A high-quality chart's text layer reads, in order: action title that states the takeaway; axis labels with units; direct labels on series; a small source line at the foot. No legend to decode, no rotated text, no decorative fonts, nothing centered.

## Anti-patterns

- **"Sales" as a chart title.** Answers nothing; wastes the most valuable line of text.
- **Action titles on a reference dashboard.** Pre-empts the reader's own analysis on a view meant for exploration.
- **Legend in the top-right with 8 items.** Forces serial lookup; replace with endpoint labels or facet into small multiples.
- **Vertical axis labels that run bottom-to-top.** Unreadable without tilting the head; shorten or switch chart orientation.
- **Five fonts on one dashboard.** Signals amateurism even when individually legible.
- **Bold body text used for emphasis** inside paragraphs of explanation — emphasis relies on scarcity (see [`emphasis.md`](emphasis.md)).
- **Bare numbers with no unit** (`42` — is that dollars, thousands of dollars, percent, milliseconds?).
- **Direct labels without the axis's unit suffix** — an axis reading `10d / 20d / 30d` with a bar labeled `23` instead of `23d`. The two formats describe the same unit; mixing them makes the reader re-read.
- **Label clipped by the chart's viewBox or tile overflow.** A `Target ≥ 3 pp` reference-line label at the top of a bar chart sliced in half by the tile's top edge; a `$5.2M` end-of-bar label with its tail past the plot rectangle; a long y-axis category (`GTM — Customer Success`) truncated by the left margin. Caused by the chart frame being sized to the plot rather than to the labels. See [`annotations.md`](annotations.md) — reserve margin on the outside side and confirm the container includes it.
- **Centered titles** across a left-aligned dashboard — breaks the scan pattern.

## See also

- [`../01-design-process.md`](../01-design-process.md) — the big idea that becomes the action title
- [`emphasis.md`](emphasis.md) — text as an emphasis channel
- [`clutter-and-data-ink.md`](clutter-and-data-ink.md) — what to strip from axis labels and tick marks
- [`annotations.md`](annotations.md) — callouts, source notes, reference lines
- [`../dashboard/narrative.md`](../dashboard/narrative.md) — stringing action titles together across a dashboard
