---
name: rules-index
description: Two-phase loading entry point. Index of every rule in the skill system, organized by governance unit with a one-line summary and file pointer. Load this first; then load only the skill files whose rules you actually need.
---

# Rules index

One-line summary of every rule in the skill system, keyed to its governance unit (see [`03-composition.md`](03-composition.md) for the unit graph). Use this index to triage: locate the unit you're producing, skim the relevant rules, then load only the skill files that own the rules you need.

## Strategic units

### strategic.mode
- Exploratory / explanatory / reference — different defaults for density, annotation, color, titles → [`dashboard/audience-purpose.md`](dashboard/audience-purpose.md)
- Reference mode has two sub-flavors: reference-for-lookup (periodic refresh, static threshold coloring) vs. operational-for-real-time (sub-minute refresh, blink + audio alerts, freeze-data, exception-first ordering) → [`dashboard/audience-purpose.md`](dashboard/audience-purpose.md), [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Mode drives archetype selection → [`dashboard/archetypes.md`](dashboard/archetypes.md)

### strategic.audience, strategic.purpose, strategic.big-idea
- Name the audience specifically; frame purpose as "after seeing this, the reader will ___" → [`01-design-process.md`](01-design-process.md)
- Big idea is one complete sentence stating point of view and stakes (explanatory mode only) → [`01-design-process.md`](01-design-process.md), [`dashboard/narrative.md`](dashboard/narrative.md)
- Three-minute story test before shipping → [`01-design-process.md`](01-design-process.md)

## Dashboard units

### dashboard.palette
- Resolve once at dashboard scope, before any chart draws → [`encode/color.md`](encode/color.md), [`dashboard/consistency.md`](dashboard/consistency.md)
- One hue, one meaning per dashboard — favourability hues can't collide with categorical hues → [`encode/color.md`](encode/color.md)
- Palette is consumed, not just resolved — set every library color slot per series → [`encode/color.md`](encode/color.md)
- Default two-series pairing: blue + orange (colorblind-safe); avoid green+orange and green+red → [`encode/color.md`](encode/color.md), [`encode/color-palettes.md`](encode/color-palettes.md)
- ≤4 distinct hues per chart; accent-on-gray for emphasis → [`encode/color.md`](encode/color.md)
- Concrete palette defaults (ColorBrewer, hex values) → [`encode/color-palettes.md`](encode/color-palettes.md)
- Okabe-Ito as validated colorblind-safe categorical palette when accessibility is load-bearing → [`encode/color-palettes.md`](encode/color-palettes.md)
- Compound palettes for bivariate encodings (in-band-with-flags, actual-with-forecast-confidence): one hue family per top-level category, sequential ramp within each; each role pins to one hex + one recorded source (mixed provenance OK) → [`encode/color-palettes.md`](encode/color-palettes.md)
- Palette coherence audit (verification phase): OKLCH-based monotonicity on ordered ramps, hue-arc bounds (~30°) within family, lightness deltas ≥0.08, saturation hierarchy, squint test on composed swatch strip → [`encode/color-palettes.md`](encode/color-palettes.md)
- Text on quantitative fills (heatmap, choropleth, conditional-format pivot, treemap): per-cell text color computed at design time via WCAG contrast against fill ramp; precompute crossover index once per palette + text-color pair; flip text below 4.5:1 (or 3:1 large/bold) → [`encode/color.md`](encode/color.md)
- When red/green is mandated (client, brand, stoplight domain): 6 workarounds in order — check if color is sole encoding, add redundant glyphs, reader-toggleable palette, light/dark contrast, bluish-green shift, full palette swap → [`encode/color.md`](encode/color.md)
- CVD problem is broader than red/green: red + green + brown + orange can all collapse to brown under strong CVD → [`encode/color.md`](encode/color.md)

### dashboard.delta-format
- Same delta format across every KPI tile in a row — decided at dashboard scope, not per tile → [`dashboard/consistency.md`](dashboard/consistency.md)
- Default: relative % on every tile (`+6% vs 30 days ago`) → [`dashboard/consistency.md`](dashboard/consistency.md)
- Pre-ship: column-scan deltas; all tiles must end in the same unit suffix → [`dashboard/consistency.md`](dashboard/consistency.md)
- Favourability color gated on unambiguous direction or explicit reference → [`charts/single-value.md`](charts/single-value.md)
- Direction glyph (▲/▼/—) redundant with color for colorblind-safety → [`charts/single-value.md`](charts/single-value.md)

### dashboard.value-format
- Same value units across every KPI tile in a row — twin of delta-format rule → [`dashboard/consistency.md`](dashboard/consistency.md)
- Pre-ship: column-scan values, not just deltas; reformulate odd-unit tiles → [`dashboard/consistency.md`](dashboard/consistency.md)

### dashboard.legend-treatment
- Uniform across charts sharing color encoding — never mix → [`dashboard/consistency.md`](dashboard/consistency.md)
- Options: one dashboard-level key, direct labels everywhere, or per-chart legends everywhere → [`dashboard/consistency.md`](dashboard/consistency.md)
- Value-only direct labels don't substitute for a legend; name+value do → [`dashboard/consistency.md`](dashboard/consistency.md)
- Dashboard-level key counts as a legend (mixing with per-chart legends is the failure mode) → [`dashboard/consistency.md`](dashboard/consistency.md)

### dashboard.category-order
- Same categorical ordering everywhere (e.g., regions sorted by revenue) → [`dashboard/consistency.md`](dashboard/consistency.md)
- Sort by value; alphabetical is the absence of order → [`charts/bar.md`](charts/bar.md)

### dashboard.time-range
- Same time window across time-series charts — start, end, tick interval → [`dashboard/consistency.md`](dashboard/consistency.md)
- Same tick-label format across every time-series chart (`Jan 25` everywhere, not `Jan 25` next to `01-25`); daily and weekly charts must still match → [`dashboard/consistency.md`](dashboard/consistency.md)
- Time axis left-to-right; consistent intervals; no skipped periods → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)
- Library auto-tickers silently produce non-uniform ticks; verify adjacent-tick deltas → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)
- January tick stays a month (`Jan '26`), never swaps to the year → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)

### dashboard.annotation-style
- Uniform style across all annotations on a dashboard → [`craft/annotations.md`](craft/annotations.md)

### dashboard.grid, dashboard.tile, dashboard.row, dashboard.section
- 12-column grid default; consistent row heights and gutters → [`dashboard/structure.md`](dashboard/structure.md)
- Alignment is non-negotiable: exact left-edges in a column, top-edges in a row → [`dashboard/structure.md`](dashboard/structure.md)
- Top-left is premium real estate; most important chart goes there → [`dashboard/structure.md`](dashboard/structure.md)
- Natural tile shape per chart geometry (horizontal strip, vertical list, or square); top-align when siblings differ → [`dashboard/structure.md`](dashboard/structure.md)
- Natural-height ranges describe plot area, not tile — add ~60–70px of chrome plus any in-mark label block at tile-sizing time, or silently clip inside-segment labels → [`dashboard/structure.md`](dashboard/structure.md)
- Coupled vertical lists (same entities, same order) share row pitch across tiles so rows peer-align — stronger than top-align when shapes match → [`dashboard/structure.md`](dashboard/structure.md)
- Don't center a compact chart vertically in a tall tile — same failure as stretching marks → [`dashboard/structure.md`](dashboard/structure.md)
- Data marks must occupy ≳60% of plot's horizontal extent; tighten axis or narrow tile → [`dashboard/structure.md`](dashboard/structure.md)
- ≳60% extent rule applies recursively to any container holding marks — sparkline-in-cell, facet panel, mini-chart-in-tile → [`dashboard/structure.md`](dashboard/structure.md)
- Gestalt principles at dashboard scale (proximity, similarity, enclosure, closure, continuity, connection) → [`dashboard/structure.md`](dashboard/structure.md)
- Responsive breakpoints: desktop / tablet / mobile → [`dashboard/structure.md`](dashboard/structure.md)
- Section headers: single line of type, only where grouping is load-bearing → [`dashboard/structure.md`](dashboard/structure.md)
- Layout is consumed, not just declared — declared spans (`span-2`, `<Tile span={2}>`, `col-span-2`, `width: 200`) silently fall back to library defaults (undefined CSS class collapses to `grid-column: auto`, Tailwind utility not in JIT, React prop not consumed, parent override); audit by inspecting the rendered tile widths, not the spec → [`dashboard/structure.md`](dashboard/structure.md)
- Row spans sum to 12 (or to a documented partial pattern: hero-with-sidebar, centered single-hero, master-detail, end-of-section breathing room) — accidental partials like `5+3+3=11` or one orphan tile in an otherwise-quartered section are forbidden → [`dashboard/structure.md`](dashboard/structure.md)
- Tile sizes compose from factor-of-12 partitions (`12`, `8+4`, `6+6`, `9+3`, `6+3+3`, `4+4+4`, `3+3+3+3`); pick the row partition first, then assign content to it — don't size each tile by content and hope the row sums → [`dashboard/structure.md`](dashboard/structure.md)
- Final-row orphan strategy when tile count doesn't divide evenly: regroup by topic > promote one tile to hero size > demote to smaller row size > drop the tile that didn't pass the kpi-row justify-each-tile test → [`dashboard/structure.md`](dashboard/structure.md)

### dashboard.chrome
- Whitespace groups related tiles, separates unrelated; 2-3× larger gutters between groups → [`dashboard/chrome.md`](dashboard/chrome.md)
- Density earned through thoughtful layout, not cramming → [`dashboard/chrome.md`](dashboard/chrome.md)
- Scrolling silently changes a tile's function — OK for lookup, fatal for pattern-discovery → [`dashboard/chrome.md`](dashboard/chrome.md)
- ≤~5 chart types per dashboard; tutorial tax on each extra type → [`dashboard/chrome.md`](dashboard/chrome.md)
- Page subtitle carries context the tiles don't render; never a prose summary of the tiles → [`dashboard/chrome.md`](dashboard/chrome.md), [`dashboard/narrative.md`](dashboard/narrative.md)
- Filter bar compact and peripheral → [`dashboard/chrome.md`](dashboard/chrome.md), [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Scope: dashboard ink evaluated by navigation/grouping/hierarchy, not data-ink rule → [`dashboard/chrome.md`](dashboard/chrome.md), [`craft/clutter-and-data-ink.md`](craft/clutter-and-data-ink.md)

### dashboard.navigation
- Core principle: never hide the primary story behind a click → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Shneiderman's mantra — allocate every element to one of three layers: overview (default-visible) / zoom-filter (reader-initiated subset) / details-on-demand (tooltip, drill, export) → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Mode gates the control inventory — explanatory minimal, reference moderate/stable, exploratory rich; mode × category matrix is the decision tool → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Every control has a cost — kill it unless benefit > cost for the intended audience → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Tooltips reveal precision on hover; chart stays uncluttered; default-on in every mode → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Tooltip indicator colors must match series colors → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Filter state visible at a glance; defaults restorable → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Filters must update the display in <100ms or the dynamic-query affordance collapses into form-fill; pre-aggregate or switch to an explicit apply-button pattern → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- View-switching toggles often indicate failed chart selection; use only for audience-straddling cases → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Grouping / re-dimensioning is an exploratory-mode tool; breaks muscle memory in reference dashboards → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Comparison overlays: default-on for reference where "compared to what?" applies; opt-in exploratory; author-frozen explanatory → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Threshold configuration: author-set for reference/explanatory; reader-configurable only when the reader owns the definition → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Drill-down in reference mode only if it preserves base layout (side panel, modal) → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Relate — one-click affordance to surface entities tied to the clicked item; distinct from tooltip/drill/cross-filter; one-way, attribute-based, works in every mode → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Cross-filter / linked brush is exploratory-only; breaks reference-mode stability → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Operational real-time only: freeze-data toggle (pauses sub-minute refresh, self-escalates if forgotten) → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Operational real-time only: alerts blink on new + optional audio; click to acknowledge; "Reset Alerts" control restores alerting capability and visibly tracks suppression → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Operational real-time only: default sort on entity tables is exception-first (failing rows at top, flagged), not alphabetical → [`dashboard/interactivity.md`](dashboard/interactivity.md)
- Operational real-time only: measure count capped around 6 (≤10); more overwhelms under pressure → [`dashboard/interactivity.md`](dashboard/interactivity.md), [`dashboard/audience-purpose.md`](dashboard/audience-purpose.md)
- Alerts as added marks (appear on condition) are more pre-attentive than always-on color changes → [`dashboard/interactivity.md`](dashboard/interactivity.md), [`craft/emphasis.md`](craft/emphasis.md)

### dashboard.review
- Pre-ship review sweep against Few's 13 canonical dashboard mistakes; aliases to existing governing files; use after integration to catch failures per-file rules miss → [`dashboard/common-mistakes.md`](dashboard/common-mistakes.md)
- 13-question glance-test checklist for reader-ready dashboards → [`dashboard/common-mistakes.md`](dashboard/common-mistakes.md)

### dashboard.archetype
- Pick archetype before charts — single-hero, KPI strip, small-multiples grid, narrative column, master-detail → [`dashboard/archetypes.md`](dashboard/archetypes.md)

### dashboard.kpi-row
- Composition reasoning for the strip of single-value tiles that single-hero and KPI-strip archetypes invoke — decided before any tile is drafted → [`dashboard/kpi-row.md`](dashboard/kpi-row.md)
- Q1 — name the role: summary-of / context-for / unrelated-snapshot; role mixing breaks the row → [`dashboard/kpi-row.md`](dashboard/kpi-row.md)
- Q2 — justify each tile and explain each exclusion; "the team tracks it" is not a reason → [`dashboard/kpi-row.md`](dashboard/kpi-row.md)
- Q3 — count (3–6) and internal hierarchy (flat vs one-hero) are decisions, not defaults → [`dashboard/kpi-row.md`](dashboard/kpi-row.md)
- Q4 — consider no strip: one hero tile, vertical `bullet` stack, or letting the first chart carry the headline → [`dashboard/kpi-row.md`](dashboard/kpi-row.md), [`charts/bullet.md`](charts/bullet.md)
- Strip must reconcile to the grid below (summary-of) or stand outside the filter state (context-for); silent disagreement is the common bug → [`dashboard/kpi-row.md`](dashboard/kpi-row.md)

### dashboard.narrative (explanatory mode)
- Every chart's title is an action title stating the insight → [`dashboard/narrative.md`](dashboard/narrative.md), [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- Horizontal logic: reading only titles in order tells the story → [`dashboard/narrative.md`](dashboard/narrative.md)
- Vertical logic: each chart's content reinforces its title → [`dashboard/narrative.md`](dashboard/narrative.md)
- Compared-to-what on every metric (target, prior period, forecast, peer) → [`dashboard/narrative.md`](dashboard/narrative.md), [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Repetition ≠ restatement; every text element earns its space → [`dashboard/narrative.md`](dashboard/narrative.md)

## Chart units

### chart.geom (recipes for each type)
- Pick chart by question (comparison / trend / breakdown / correlation / outliers / target / bridge / 2D pattern / before-after) → [`choose-chart/by-question.md`](choose-chart/by-question.md)
- "Trend" decomposes into 7 sub-questions; don't default to a line chart without checking: now-vs-start → slope; rank-over-time → bump (inverted-y line); different-start-times → index (days-since x-axis); durations → Gantt (start+length bars); two-time-dimensions → labeled heatmap; cyclical → cycle plot / faceted bars; macro trend → line → [`choose-chart/by-question.md`](choose-chart/by-question.md)
- Pick by data shape (Few's eight relationships + matrix + before/after) → [`choose-chart/by-data-shape.md`](choose-chart/by-data-shape.md)
- End-to-end selection flow; try Knaflic's simple-six (text, table, heatmap, scatter, line, bar) before descending the tree → [`choose-chart/decision-flow.md`](choose-chart/decision-flow.md)
- Specialized form triggers: `dot-plot` (similar-length bars); `slopegraph` (two time points × many entities); `waterfall` (start → itemized changes → end); `heatmap` (2D categorical pattern); `treemap` (many-part hierarchical + rough magnitude); `bullet` (actual vs. target across entities — beats gauge) → [`choose-chart/by-question.md`](choose-chart/by-question.md), [`choose-chart/decision-flow.md`](choose-chart/decision-flow.md)
- `sparkline` is never a top-level chart choice — embed inside `single-value` tiles and `pivot-table` rows → [`choose-chart/decision-flow.md`](choose-chart/decision-flow.md)
- Recipes: [`bar.md`](charts/bar.md), [`line.md`](charts/line.md), [`scatter.md`](charts/scatter.md), [`stacked.md`](charts/stacked.md), [`combination.md`](charts/combination.md), [`donut.md`](charts/donut.md), [`funnel.md`](charts/funnel.md), [`gauge.md`](charts/gauge.md), [`grid.md`](charts/grid.md), [`pivot-table.md`](charts/pivot-table.md), [`single-value.md`](charts/single-value.md), [`sunburst.md`](charts/sunburst.md), [`treemap.md`](charts/treemap.md), [`sparkline.md`](charts/sparkline.md), [`map.md`](charts/map.md), [`box-plot.md`](charts/box-plot.md), [`bubble.md`](charts/bubble.md), [`bullet.md`](charts/bullet.md), [`dot-plot.md`](charts/dot-plot.md), [`heatmap.md`](charts/heatmap.md), [`histogram.md`](charts/histogram.md), [`slopegraph.md`](charts/slopegraph.md), [`waterfall.md`](charts/waterfall.md)

Per-geom highlights:

- **Bar:** zero baseline non-negotiable; axis max ~1.25× largest value (not 100%); sort by value; never rotate labels under vertical bars → [`charts/bar.md`](charts/bar.md)
- **Bar — labels:** finite label budget (extremes + threshold-crossings + focal rows, not every bar); label precision must disambiguate adjacent bars (no `92% / 92% / 92%` ties); override library y-axis auto-decimation on long horizontal-bar lists (every category gets a label) → [`charts/bar.md`](charts/bar.md)
- **Line:** zero baseline optional; 7-day MA for cyclical daily metrics; banking to 45° for aspect ratio; smooth data in pipeline, not at render → [`charts/line.md`](charts/line.md)
- **Scatter:** square aspect ratio; trend line only when relationship is the message → [`charts/scatter.md`](charts/scatter.md)
- **Single-value / KPI tile:** big number; compared-to-what; symbol units on number, noun units in title; delta format is dashboard-scope → [`charts/single-value.md`](charts/single-value.md)
- **Stacked:** total is primary, composition secondary; only bottom segment has true baseline → [`charts/stacked.md`](charts/stacked.md)
- **Combination (dual-axis):** prefer stacked subplots; if dual-axis, label scales honestly → [`charts/combination.md`](charts/combination.md)
- **Donut:** 2–5 slices max; precise comparison poor; prefer sorted bars → [`charts/donut.md`](charts/donut.md)
- **Funnel:** strictly sequential stages only; label conversion % → [`charts/funnel.md`](charts/funnel.md)
- **Gauge:** angle tax; prefer single-value + delta → [`charts/gauge.md`](charts/gauge.md)
- **Heatmap:** pattern-discovery; don't scroll it; sequential palette with lightness ramp → [`charts/heatmap.md`](charts/heatmap.md)
- **Bubble:** area (not radius) encoding; size legend mandatory; layer by size, not by semantic role (accent-on-top breaks large-to-small occlusion); bubbles must not straddle a meaningful reference line (cap max radius or extend axis range) → [`charts/bubble.md`](charts/bubble.md)
- **Slopegraph:** x-axis must be `type: 'category'` with two period labels (not `type: 'value'` with a bucketing formatter, which produces `Current · After · After` on extra ticks); y-axis fitted to data range ±10%, never auto-zero (auto-zero collapses 0.91–1.08 data into top 10% of plot, stacks every endpoint label); if steepest slope after fitting is <15° → form is wrong, escalate to dumbbell dot plot → [`charts/slopegraph.md`](charts/slopegraph.md)

### chart.scale, chart.axis
- Zero baseline mandatory on bars/stacked/area; optional on line/scatter → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)
- Log scale labeled as log; tick marks on powers of 10 → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)
- Round-number tick intervals (1, 2, 5 × powers of 10) → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)
- Aspect ratio: scatter square; line 1.5:1 default (banking to 45°) → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)
- Dual y-axes: hard to do honestly; prefer stacked subplots → [`encode/scales-and-axes.md`](encode/scales-and-axes.md), [`charts/combination.md`](charts/combination.md)
- No broken axes except with unambiguous gap marker → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)
- Time axis ticks: equal deltas; January tick stays a month → [`encode/scales-and-axes.md`](encode/scales-and-axes.md)

### chart.mapping (aesthetic / channel choice)
- Perceptual hierarchy: position > length > angle/slope > area > volume > color hue → [`encode/visual-channels.md`](encode/visual-channels.md), [`00-mental-model.md`](00-mental-model.md)
- Continuous quantitative → position first; categorical → hue/shape/facet; ordered → position or sequential lightness → [`encode/visual-channels.md`](encode/visual-channels.md)
- ≤3 aesthetics per panel before faceting → [`encode/visual-channels.md`](encode/visual-channels.md)
- Hue = categorical; lightness = ordered/quantitative; saturation = emphasis → [`encode/visual-channels.md`](encode/visual-channels.md)

### chart.facet
- Facet when single chart gets crowded with aesthetics or many series → [`encode/small-multiples.md`](encode/small-multiples.md)
- Shared scales across panels so design variation ≠ data variation → [`encode/small-multiples.md`](encode/small-multiples.md)
- 4–20 facets ideal; above 20 paginate or filter → [`encode/small-multiples.md`](encode/small-multiples.md)

### chart.title, chart.subtitle, chart.direct-label, chart.legend (text)
- Action title (explanatory) states the insight; descriptive title (exploratory/reference) answers What/When/How → [`craft/typography-and-labels.md`](craft/typography-and-labels.md), [`dashboard/narrative.md`](dashboard/narrative.md)
- Direct labels beat legends when ≤5 series; put series name at line endpoints → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- Axis has units; direct value labels share the axis's unit suffix (`23d` not `23`) → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- Label precision must disambiguate adjacent values — if rounding produces visual ties across adjacent rows (`92% / 92% / 92%` when underlying values are `92.3 / 91.8 / 91.5`), raise precision until labels distinguish, or drop labels and let the visual encoding carry the comparison → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- Label legibility on overlapping marks: position-first (move out of overlap), then contrast-aware (flip text color via WCAG when on a uniform fill), then visual armor (text stroke / background pill / text-shadow) only as last resort when the first two can't reach → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- Units appear exactly once per read context — KPI tile big number, chart tooltip, data label, legend entry, table cell each carry the unit exactly once. Failures: **double** (`63.4% %` because value string + suffix slot both filled) and **missing** (tooltip showing bare `18.9` for an "Avg daily spend ($)" series). Pick a canonical slot per context, audit for unit-count != 1 → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- KPI tile title and big number must carry different facts — title labels the metric (noun phrase: `"Engineers active with AI coding tools"`); big number is the value. A title that restates the value (`"68% of engineers active with AI coding tools"` over a `68%` big number) is the same single-write-per-context failure as the `63.4% %` case, but the duplicated fact is the value rather than the unit. Title may carry interpretation the big number doesn't (e.g., relative-change phrasing) — the rule is "different facts," not "no digits in title" → [`charts/single-value.md`](charts/single-value.md)
- Horizontal text only; never rotated body/label beyond y-axis title → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- Consistent typography across the dashboard (one family, small size scale) → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- Typography is consumed, not just declared — canvas-rendered chart text bypasses CSS; apply the resolved stack to every library text slot (axisLabel, nameTextStyle, title, tooltip, legend, series.label, markLine.label) → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)

### chart.annotation, chart.reference-line
- Annotation is integrity work: prevent misreading, don't invent emphasis → [`craft/annotations.md`](craft/annotations.md)
- Annotate structural breaks (methodology change, launch, definitional shift) → [`craft/annotations.md`](craft/annotations.md)
- Annotation labels on vertical reference lines are horizontal — never rotate → [`craft/annotations.md`](craft/annotations.md)
- Reference lines dashed or muted, labeled directly, never in legend → [`craft/annotations.md`](craft/annotations.md)
- Labels outside the plot must have chart-frame margin reserved (and the SVG viewBox / tile `overflow` must include it) — applies to reference-line labels, end-of-bar data labels, long y-axis category names, endpoint labels on lines; library defaults size the frame to the plot, not the labels → [`craft/annotations.md`](craft/annotations.md)
- Natural-threshold reference lines required whenever the scale has a meaningful inherent value (ratio `1.0`, parity `1:1`, completion `100%`, capacity, SLA); doubly important across small multiples since the eye can't carry position memory between panels → [`craft/annotations.md`](craft/annotations.md)
- Source + date + last-updated in muted footer → [`craft/annotations.md`](craft/annotations.md)

### chart.ink (per-chart clutter)
- Data-ink ratio: erase non-data-ink within reason; erase redundant data-ink within reason → [`craft/clutter-and-data-ink.md`](craft/clutter-and-data-ink.md)
- Three chartjunk varieties: moiré vibrations, heavy grid, decorative ducks → [`craft/clutter-and-data-ink.md`](craft/clutter-and-data-ink.md)
- Gestalt decluttering checklist — remove chart border, mute gridlines, drop legends for direct labels → [`craft/clutter-and-data-ink.md`](craft/clutter-and-data-ink.md)
- Scope: inside a single chart; dashboard scaffolding evaluated separately → [`craft/clutter-and-data-ink.md`](craft/clutter-and-data-ink.md), [`dashboard/chrome.md`](dashboard/chrome.md)

### chart emphasis
- ≤10% of chart ink should carry the accent; more than that and nothing is emphasized → [`craft/emphasis.md`](craft/emphasis.md)
- Pre-attentive attributes: size, color, position, enclosure — use sparingly → [`craft/emphasis.md`](craft/emphasis.md)
- Contrast is finite — spend it on the thing the chart argues → [`craft/emphasis.md`](craft/emphasis.md)
- Structural emphasis is empty emphasis — accenting first/last bars, leftmost/rightmost line points, top/bottom rows by position rather than by what the chart argues spends the contrast budget on a distinction the reader doesn't need; common failure is accenting funnel endpoints instead of the largest step-over-step drop → [`craft/emphasis.md`](craft/emphasis.md)

## Cross-cutting: consumed-not-declared family

A failure shape shared across multiple units: a dashboard-scope intent is declared (a palette, a font stack, a span value, a label color) but silently fails to realize because a library/stack default fills in. Same audit pattern across every member: inspect the rendered output, or compute deterministically at design time. Five named members today — future instances slot in without new vocabulary. Verification phase named in [`03-composition.md`](03-composition.md) step 5.

- **Palette is consumed, not just resolved** — set every library color slot per series (line stroke, fill, marker, legend swatch, tooltip indicator, endpoint label) → [`encode/color.md`](encode/color.md)
- **Typography is consumed, not just declared** — canvas-rendered chart text bypasses CSS; apply the resolved stack to every library text slot (axisLabel, nameTextStyle, title, tooltip, legend, series.label, markLine.label) → [`craft/typography-and-labels.md`](craft/typography-and-labels.md)
- **Layout is consumed, not just declared** — declared spans silently fall back when the declaration mechanism isn't realized (undefined CSS class → `grid-column: auto`; Tailwind utility not in JIT; React prop not consumed; parent override) → [`dashboard/structure.md`](dashboard/structure.md)
- **Text on quantitative fills** — per-cell text color must contrast with the cell fill (heatmap, choropleth, conditional-format pivot, treemap); compute WCAG contrast at design time and flip text below threshold → [`encode/color.md`](encode/color.md)
- **Y-axis category auto-decimation** on long horizontal-bar lists — libraries silently drop every Nth category label past ~15 rows; override explicitly so every bar links to its category → [`charts/bar.md`](charts/bar.md)

## Universal integrity rules

- Lie factor ∈ [0.95, 1.05]; outside that range, chart overstates/understates → [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Proportional encoding: visual size ∝ numeric quantity → [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Clear, thorough labeling (axes, units, dates, sources) → [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Show data variation, not design variation → [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Deflate monetary values over time for long spans → [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Match dimensionality: 1D quantity → 1D encoding (length/position), not area or volume → [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Never quote data out of context — always compared-to-what → [`02-graphical-integrity.md`](02-graphical-integrity.md)
- Aspect ratio is design variation — banking to 45° for lines; scatter square; consistent across comparable charts → [`02-graphical-integrity.md`](02-graphical-integrity.md), [`encode/scales-and-axes.md`](encode/scales-and-axes.md)

## Foundational mental model

- Above all else, show the data → [`00-mental-model.md`](00-mental-model.md)
- Chart as composition, not opcode → [`00-mental-model.md`](00-mental-model.md), [`03-composition.md`](03-composition.md)
- Perceptual hierarchy governs channel choice → [`00-mental-model.md`](00-mental-model.md), [`encode/visual-channels.md`](encode/visual-channels.md)
- Composition extends past chart to dashboard; units nest and compose → [`03-composition.md`](03-composition.md)

## How to use this index

1. **Identify the unit you're producing** (e.g., `dashboard.palette`, `chart.geom (bar)`, `chart.annotation`).
2. **Skim the rules listed under that unit** to see what applies.
3. **Load only the skill files** referenced by the rules you need — not the whole system.

For production-order reasoning (which units to produce when, and which units consume which), see [`03-composition.md`](03-composition.md).
