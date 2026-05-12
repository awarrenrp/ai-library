---
name: dashboard-audience-purpose
description: Produce strategic.mode (exploratory / explanatory / reference). Sets dashboard-wide defaults for density, annotation, color, titles.
governs: strategic.mode
consumes: strategic.audience, strategic.purpose
---

# Dashboard audience and purpose

Every dashboard operates in one of three modes. The mode determines everything downstream — chart density, annotation style, interactivity level, color strategy, title voice, even typography. Get this wrong and the dashboard either editorializes when it should be neutral, stays silent when it should argue, or buries the reader in filters when they wanted a one-line answer.

Decide the mode before choosing chart types. See [`../01-design-process.md`](../01-design-process.md) for the broader framing; this skill is the design consequences of that decision.

## The three modes

### 1. Exploratory

**The reader is hunting for insight themselves.** Analysts, data scientists, product managers in a weekly review, anyone whose job is to find the thing the dashboard hasn't told them yet.

The author does not yet know what the story is; the dashboard is the instrument the reader uses to discover it.

Design implications:

- **Higher density.** More views, more breakdowns, more dimensions. The reader's scan is lateral and they benefit from having many comparisons visible at once.
- **Many filters.** Global time range, region, segment, cohort, channel — let the reader carve the data along any axis.
- **Light annotation.** The author hasn't formed an opinion, so annotating one would be premature. Reference lines for targets are fine; interpretive callouts are not.
- **Descriptive titles.** "Revenue by quarter" is correct here — the reader will form their own action titles as they notice patterns. Action titles on an exploratory dashboard read as the author leading the witness.
- **Consistent, even-handed color.** Use categorical palettes with balanced hues — no single accent color — because the reader may zero in on any category and needs to be able to trace it.
- **Interactivity is the point.** Cross-filtering, drill-down, sort, zoom. The dashboard is a navigable workspace.
- **Default state shows everything.** All segments, full time range, no pre-applied filters (other than "exclude test data"). The reader brings the focus.

Typical audience: analysts, PMs, operators on deep-dive.

Typical chart mix from the palette:
- `grid` (small multiples across categories)
- `pivot-table` (for roll-up / drill-down)
- `bar` / `horizontal-bar` (comparisons across many categories)
- `dot-plot` (when bar comparisons would have similar lengths and zero baseline would hide the differences)
- `line` (multi-series time trends)
- `scatter` / `bubble` (correlation exploration, with optional third dimension)
- `heatmap` (2D categorical patterns — cohort retention, activity by hour × day)
- `box-plot` (comparing distributions across groups)
- `histogram` (shape of a single distribution)
- `stacked` / `horizontal-stacked` (part-to-whole across categories)
- `treemap` (hierarchical part-to-whole with many parts)
- `map` (geospatial breakdown when location is a real dimension)

Typical tile count: 8–20+ tiles.

### 2. Explanatory

**The reader is being walked to a conclusion.** Executives, board members, cross-functional stakeholders receiving a readout.

The author knows the story and is arguing for a specific interpretation and often a recommendation. The dashboard is a persuasion artifact as much as a data artifact.

Design implications:

- **Lower density per view.** Every chart earns its place. Better to have five sharp tiles than fifteen noisy ones.
- **Strong action titles.** Every title states the insight: "Enterprise churn doubled in Q3, driven by partnership channel". Descriptive titles here waste the slot.
- **Directed emphasis.** "Accent on grey" — the series that matters is in the accent color, everything else muted. The reader's eye is led, not asked to wander.
- **Annotations state the point.** Vertical reference lines for launches, shaded regions for anomalies, on-chart callouts for key values.
- **"Compared to what?" everywhere.** Every metric anchored to target, prior period, forecast, or peer. Bare numbers don't persuade.
- **Interactivity is optional, often minimal.** The story must survive on the printed page — assume the reader will export to PDF or screenshot for a board pack.
- **Narrative reading order.** Top-left = context. Adjacent = key insight. Below = supporting evidence. End = recommendation. See [`narrative.md`](narrative.md).
- **Default state IS the story.** No filters to apply, no drill-downs required. If the reader has to click to find the point, the dashboard has failed.

Typical audience: execs, board, CFO, leadership, external stakeholders.

Typical chart mix from the palette:
- `single-value` (hero KPI with delta vs. target/prior)
- `combination` (dual-encoding — e.g., revenue bars with growth-rate line)
- `line` (simple, 1–3 series, action-titled)
- `bar` / `horizontal-bar` (small, focused comparisons — top 5 segments, not all 25)
- `slopegraph` (exactly two time points across many entities — "Q1 → Q4 NPS by region")
- `waterfall` (start → itemized changes → end — revenue bridge, headcount bridge, variance decomposition)
- `bullet` (actual vs. target across entities — beats gauge everywhere except when audience expects a dial)
- `dot-plot` (rankings with similar values where bars would look identical)
- `funnel` (when the story is conversion)
- `stacked` (when part-to-whole is load-bearing)
- Sparingly: `donut` (only 2–3 slices, precise labels), `gauge` (only when audience expects a dial)

Typical tile count: 3–8 tiles.

### 3. Reference / operational

**The reader is doing lookup, often repeatedly.** Ops leads watching a production system, finance team reconciling monthly close, support team monitoring queue health, anyone whose relationship with the dashboard is "I check this every morning."

The story changes every refresh; the dashboard is a persistent instrument. What matters is precision, consistency, and muscle memory.

Design implications:

- **Precision beats pattern.** Tables often beat charts — if the reader is going to read an exact value, give them the exact value formatted well.
- **Same layout every time.** Muscle memory is the most valuable asset. Moving a tile, changing column order, rearranging sections — each costs weeks of retraining. Resist restructuring.
- **Minimal interactivity.** Filters are OK (time range, entity picker) but the core layout is stable. No surprise drill-downs that take the reader off the canvas; they want to stay on the dashboard.
- **Neutral titles.** "Open tickets by priority" — descriptive, the reader is not being argued with, they are looking something up.
- **Dense, tabular.** High signal-to-ink ratio. Pivot tables, compact single-value tiles with deltas, dense `grid` multiples.
- **Conservative color.** Two-color scheme — one neutral (grey) for values, one accent (often sequential lightness) for emphasis. Avoid rainbow palettes; they exhaust the reader over daily use.
- **Thresholds and alerts visible.** Red for "above SLA," green for "within SLA," is appropriate here because the meaning is fixed and well-known to the audience.
- **Data recency visible.** "Last refreshed: 3 minutes ago" is load-bearing; staleness destroys trust.

Typical audience: ops, on-call, finance, support, anyone with a recurring read.

Typical chart mix from the palette:
- `pivot-table` (the workhorse)
- `single-value` (KPI tiles with thresholds and deltas)
- `sparkline` (embedded trend context inside `single-value` tiles and `pivot-table` rows — never standalone)
- `line` (compact trend for context)
- `bar` / `horizontal-bar` (compact rankings)
- `bullet` (actual vs. SLA or threshold across entities — strictly better than gauge for this; one row per entity)
- `heatmap` (grid-shaped lookups — status by service × region, error rate by hour × day)
- `gauge` (when an SLA or threshold is the point and the audience expects a dial)
- `grid` (small multiples for per-entity views)

Typical tile count: 10–30+ tiles, tightly packed.

#### Two sub-flavors: reference-for-lookup vs. operational-for-real-time

Reference mode covers two distinct use patterns that share layout stability and precision discipline but diverge on refresh cadence and alerting. The two sub-flavors have different interactive surfaces even though their layout and title-voice rules match.

- **Reference (lookup).** Recurring periodic check — monthly close, weekly ops review, daily KPI scan, status page. Refresh is periodic (hourly, daily, weekly) but not sub-minute. The reader opens the dashboard deliberately, reads, closes. Alerting is coloring (red cell, red dot); thresholds are static. Everything in the section above applies as-written.
- **Operational (real-time monitor).** Kept visible throughout a shift — on-call console, support-floor supervisor board, trading desk, manufacturing line. Refresh is sub-minute to real-time. The reader is not always looking at the screen, so alerts must capture attention pre-attentively (blink, optional audio); and the live refresh itself is a design constraint (freeze-data control mandatory, measure count capped around 6, denser annotation fails because it can't be read before re-rendering).

Discriminators:

| Dial | Reference (lookup) | Operational (real-time) |
|---|---|---|
| **Refresh cadence** | Hourly / daily / weekly | Sub-minute / real-time |
| **Alerting** | Static threshold coloring; read on-open | Blink + optional audio on new alert; acknowledge to silence |
| **Attention model** | Reader comes to the dashboard | Dashboard gets the reader's attention |
| **Freeze-data control** | Not needed | Required (see [`interactivity.md`](interactivity.md) operational controls) |
| **Measure count** | 10–30+ | ≤10, usually 6 |
| **Annotation density** | Full explanatory text fits | Sparse; re-render rate limits what the reader can absorb |
| **Entity ordering** | Alphabetical / by ID / by value — reader's convenience | Exception-first (worst offenders at top, flagged) |
| **Canonical archetype** | KPI strip + detail grid; pivot-table-heavy lookup page | Alert ribbon + bullet-graph KPIs + sparkline-per-row ranked table |

If the same brief wants both — "a daily reference view AND a real-time ops view of the same data" — build two dashboards linked from each other. One dashboard can't be both; the operational controls (blinking alerts, freeze-data, 6-measure cap) clash with the reference dashboard's density and quiet color.

For operational-specific interactive controls (freeze-data, blink, audio, reset alerts, exception-first ordering), see [`interactivity.md`](interactivity.md) §"Operational real-time controls."

## Choosing the mode

If the audience needs to **find** insight → exploratory.
If the audience needs to **receive** an argument → explanatory.
If the audience needs to **check** a number → reference.

A dashboard can only be one mode at a time. Dashboards that try to do all three end up doing none well: the analyst hates the heavy narrative, the exec is drowning in filters, the ops lead can't find the number behind the story. If you genuinely need multiple modes, build multiple dashboards and link them.

## Mismatches: what goes wrong

### Explanatory design on an exploratory audience

Symptom: the analyst wants to carve the data by channel, but the dashboard has only three hero tiles with action titles and no filters. They bounce and ask the data team for a one-off.

Fix: relax the emphasis, add filters, de-editorialize titles, increase density.

### Exploratory design on an explanatory audience

Symptom: the CFO has 45 seconds before the next meeting and opens a 25-tile dashboard with no action titles, no clear hierarchy, and fifteen colors. They close it, confused.

Fix: cut to the 5 tiles that make the argument. Write action titles. Mute everything except the one series the story is about.

### Ad-hoc layout on a reference audience

Symptom: the ops team has watched "tickets by priority" live in the top-left for two years. Someone restructures the dashboard and puts it in the bottom-right, behind a drill-down. Three months of pages later, people still miss incidents.

Fix: treat reference dashboard layouts as contracts. Revise deliberately, with advance notice, not on a whim.

### Narrative titles on a reference audience

Symptom: "Engineering velocity collapsed this sprint" on a weekly ops dashboard. Next week it says "Engineering velocity is recovering." The title is whiplash; the reader wanted to look up the number, not receive interpretation.

Fix: neutral titles. Save the narrative for the readout deck.

### Low-density explanatory dashboard missing context

Symptom: a single huge line chart with "Revenue" as the title and no reference line, no target, no prior year. The number is $3.9M but the reader has no idea if that's good.

Fix: add "compared to what?" everywhere. Target, prior period, YoY. Even one small reference line usually saves a tile from meaninglessness.

## Design dials across the three modes

| Dial | Exploratory | Explanatory | Reference |
|---|---|---|---|
| **Tile count** | 8–20+ | 3–8 | 10–30+ |
| **Density per tile** | Medium-high | Low-medium | High |
| **Title voice** | Descriptive | Action (insight) | Descriptive |
| **Color strategy** | Balanced categorical | Accent on grey | Two-color / monochrome + threshold |
| **Annotations** | Light (reference lines only) | Heavy (callouts, events, recs) | Minimal (thresholds, deltas) |
| **Interactivity** | Rich (filters, cross-filter, drill) | Minimal (maybe personalization) | Moderate (filters, stable layout) |

The interactivity row above is the summary dial; for the per-control-category breakdown (filters, time, view toggles, sort, grouping, comparison overlays, tooltips, drill, cross-filter, zoom, threshold config) see the mode × category matrix in [`interactivity.md`](interactivity.md) *Decide: when to add controls, and which*.
| **Default state** | Shows everything | Is the story | The reader's baseline view |
| **"Compared to what?"** | Present but light | Everywhere, loud | On every KPI tile |
| **Typography variation** | Moderate | High (emphasis on titles) | Low (uniform, dense) |
| **Layout stability** | Medium (iterates) | Designed once per story | High (muscle memory sacred) |

## Palette choices by mode

The full chart roster: `bar`, `box-plot`, `bubble`, `bullet`, `combination`, `donut`, `dot-plot`, `funnel`, `gauge`, `grid`, `heatmap`, `histogram`, `line`, `map`, `pivot-table`, `scatter`, `single-value`, `slopegraph`, `sparkline`, `stacked`, `sunburst`, `treemap`, `waterfall`. Every chart has a mode where it fits and modes where it's out of place.

**Exploratory** — `grid`, `pivot-table`, `bar`/`horizontal-bar`, `dot-plot` (subtle differences), `line`, `scatter`, `bubble`, `heatmap` (2D patterns), `box-plot` (distribution comparison), `histogram`, `stacked`/`horizontal-stacked`, `treemap` (many-part breakdowns), `map`. Reach for small multiples via `grid` instead of cramming overlays onto a single chart.

**Explanatory** — `single-value`, `combination`, `line`, `bar`/`horizontal-bar`, `slopegraph` (two-period comparison), `waterfall` (bridge), `bullet` (actual vs. target), `dot-plot`, `funnel`, `stacked`. Each chart carries an action title. Use `donut` only when part-to-whole with 2–3 slices is the exact point; otherwise `horizontal-bar` sorted by value. Use `gauge` only if the audience's convention expects a dial.

**Reference** — `pivot-table`, `single-value`, `sparkline` (embedded inside tiles and table rows, never standalone), `line`, `bar`/`horizontal-bar`, `bullet` (actual vs. SLA), `heatmap` (grid lookups), `gauge`. Tables do more heavy lifting here than in either other mode.

Avoid cross-mode: `sunburst` or `treemap` in a reference dashboard is an obstacle course; a bare `pivot-table` in an explanatory board deck is a missed opportunity; `gauge` in an exploratory dashboard wastes a tile on a single-number encoding when the analyst wants comparisons.

## Typography and emphasis by mode

- **Exploratory** — uniform, readable, modest hierarchy. Title, subtitle, axis labels all legible; no dramatic size jumps.
- **Explanatory** — strong hierarchy. Big, opinionated title (action title). Supporting text smaller. Accent color used sparingly on the focal series.
- **Reference** — compact, uniform, dense. Titles are short and descriptive. Tables right-align numbers on the decimal. Small type is acceptable because the reader will be close to the screen.

## Tone: reading vs feeling

Two tones a dashboard can strike:

- **Reading tone** — precision, exactness, technical clarity. Axis labels, gridlines where useful, exact values, dense tabular data. Fits reference and exploratory.
- **Feeling tone** — overall pattern and sentiment. Less precision apparatus, more color, more visual emphasis, annotations that evoke. Fits explanatory.

Pushing a reading-tone dashboard on a feeling-audience (e.g., a board that wants the gist) leaves them cold. Pushing a feeling-tone dashboard on a reading-audience (e.g., ops reconciling numbers) frustrates them. Match the tone to the audience.

## A worked example: the same data, three modes

Imagine the underlying question is "how is customer acquisition performing?" and the raw data is the standard funnel and cohort data.

- **Exploratory version** (for the growth team): a 15-tile dashboard with channel filters, time-range picker, cohort selector. A `funnel` chart, a `grid` of small multiples by channel, a `scatter` of CAC vs LTV per cohort, a `pivot-table` of weekly metrics. Titles: "Funnel by step," "CAC by channel," "LTV:CAC by cohort." The team runs filter combinations and forms their own hypotheses.

- **Explanatory version** (for the exec readout): 5 tiles. Top-left `single-value`: "CAC doubled in 2025 while LTV grew 30%." Adjacent `line` with accent: "CAC inflation is entirely in paid channels; organic CAC is flat." Below, a `horizontal-bar`: "Four of five paid channels underperformed; partnerships is the outlier." Then a `combination`: "LTV:CAC has fallen below 3.0 for the first time since 2022." Final tile: recommendation text. The reader is walked to the conclusion.

- **Reference version** (for the marketing ops team, daily check): a 20-tile dashboard with single-values for CAC, LTV, payback, conversion, broken down by channel. A `pivot-table` with daily granularity. A `grid` of sparkline-style lines per channel. Consistent layout week after week. Titles are descriptive: "CAC by channel, last 30 days." Thresholds highlighted — any channel with CAC > plan is flagged red. The team checks for anomalies and drills if they spot one.

Same data, same palette components, three radically different designs. The mode is the variable that drives everything.

## Checklist before shipping

- The mode (exploratory / explanatory / reference) is explicit and consistent throughout.
- Tile count, density, and color strategy match the mode.
- Titles match the mode's voice (descriptive vs action vs neutral).
- Interactivity level matches the mode's needs.
- Default state is appropriate for the intended audience.
- No mismatches: no action titles on exploratory; no 25-tile density on explanatory; no ad-hoc rearrangement on reference.
- The dashboard does not try to serve more than one mode simultaneously.

## See also

- [`../01-design-process.md`](../01-design-process.md) — mode as part of design intake (WHO, WHAT, HOW)
- [`structure.md`](structure.md) — layout density varies by mode
- [`narrative.md`](narrative.md) — narrative intensity varies by mode
- [`interactivity.md`](interactivity.md) — interactivity density varies by mode
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — chart recommendations by question, which shift by mode
- [`../encode/color.md`](../encode/color.md) — color strategy per mode
