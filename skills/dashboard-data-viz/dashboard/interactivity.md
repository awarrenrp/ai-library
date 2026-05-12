---
name: dashboard-interactivity
description: Produce dashboard.navigation — decide when to add interactive controls, pick the category, and build each effectively. Covers widget controls (filtering, time, view, sort, group, comparison, threshold) and direct-chart interactivity (tooltip, drill, cross-filter, zoom).
governs: dashboard.navigation
consumes: strategic.mode
---

# Dashboard interactivity

Interactivity multiplies a dashboard's reach — one canvas can answer many questions — but every interactive feature is also a place where the reader can get lost, be misled, or miss the point entirely. The discipline here: interactivity reveals secondary detail; the primary story must be visible without touching anything.

## Core principle: never hide the primary story behind a click

> "Never hide critical data in interaction; core insight must be visible without interaction; interactions reveal secondary detail."

If the main takeaway of the dashboard requires the reader to hover, click, filter, or drill down to see it, the dashboard has failed as a communication artifact. Interactivity is for the second, third, and fourth questions — not the first.

Operational tests:

- Screenshot the dashboard in its default state. Is the story legible? If no, redesign the default — don't rely on the reader to interact.
- Print it to PDF. Does it still communicate? Interactive-only dashboards lose half their value the moment they are shared via email or Slack.
- Assume 80% of viewers will never click anything. Build the dashboard as if it were a poster first, and interactive second.

## Overview → zoom/filter → details-on-demand

The positive complement to "never hide the primary story behind a click." Every piece of information the designer considers is a **three-layer allocation**, applied at draft time: each element goes on exactly one of three layers.

- **Layer 1 — Overview.** Always visible in the default state. Glance-legible. The "what's happening" read. This is where the dashboard's core message lives.
- **Layer 2 — Zoom and filter.** Reader-initiated subsetting. Filter by segment, zoom into a time range, drill into a category. The "narrow my view" step the reader takes when the overview raises a question.
- **Layer 3 — Details-on-demand.** Tooltip on hover, click-through to the underlying row, export, or link to a secondary analytical dashboard. The "exact numbers / raw data" step for the reader who has zeroed in.

At draft time, for each proposed tile or data element, name the layer it belongs on. The common failure modes:

- **Layer-1 overload** — everything the team could think of is on the landing view. The reader scans a wall of tiles, no story emerges, every tile competes for attention. Fix: demote lookup-level detail to layer 3; demote segment breakdowns to layer 2 behind filters; keep only the headline reads on layer 1.
- **Layer-1 starvation** — the story requires a click to see. Every essential comparison is behind a filter or a drill. A reader who doesn't interact gets a meaningless overview. Fix: promote the headline to layer 1 even if it duplicates what a filtered view shows; the filtered view is additive, not the primary.
- **Missing layer 3** — the overview is clean, the filters work, but the reader who asks "what are the exact numbers?" or "which row is that?" hits a dead end. Fix: tooltips on every chart (default-on — see below), export affordance on tables, link from any aggregate to its underlying rows.
- **Layer 2 is the layer most dashboards get wrong** — filters added because "filters are good" without a specific question they answer. Every layer-2 control should correspond to a named question the overview raises. If the reader never asks that question, the filter costs chrome for no benefit. See the cost–benefit test below.

The mantra is mode-sensitive. See [`audience-purpose.md`](audience-purpose.md) for how much of each layer each mode uses:

- **Explanatory mode** — layer 1 carries the entire story. Layer 2 is often empty (the author has already picked the slice). Layer 3 is present via tooltips but drill is minimal; the story must survive export to PDF.
- **Reference mode** — layer 1 carries the KPIs and trends. Layer 2 is a stable set (time range, entity picker). Layer 3 is precise values via tooltip and row-level detail via drill, because lookup is the whole point.
- **Exploratory mode** — layer 1 is an overview but the reader is expected to dig. Layer 2 is rich (many filters, cross-filter, grouping). Layer 3 is deep (full drill paths, data export, linked analytical views).

This is the positive form of "all dashboards are incomplete": a well-designed dashboard does not answer every question, but it provides a reachable path from any layer-1 exception down to the underlying row. The reader asking "why?" at the overview should be able to drill, filter, or export their way toward the answer without leaving the dashboard ecosystem.

## Decide: when to add controls, and which

Interactivity is a dial, not a checklist. The first question isn't "what controls?" but "how much interactivity does this dashboard want at all?" The answer is determined by the dashboard mode (see [`audience-purpose.md`](audience-purpose.md)) and constrained by a cost–benefit test applied per control.

### Every control has a cost

Each control is a tile's worth of chrome, a piece of state to track, a gesture the reader has to learn, and a state that can confuse a screenshot. Add a control only when its benefit — the distinct questions it lets the reader answer — clearly beats its cost. Kill the control if:

- The answer the control produces isn't one the audience actually asks.
- A better-chosen default would serve the same audience without the control.
- The control is a way to punt on a design decision ("let them pick between bar and line if they want") instead of making one.
- The control's state breaks the dashboard as a shareable artifact (a URL that doesn't encode which filters are applied is a broken dashboard).

### The question each control answers

Every control is an answer to a specific question. If the question doesn't come up for this audience, don't add the control.

| Question the reader might ask | Control category |
|---|---|
| "Which subset of the data?" | Filter |
| "Which time range?" | Time control |
| "How do I see this another way?" | View / layout toggle |
| "In what order?" | Sort |
| "By what dimension?" | Grouping / re-dimensioning |
| "Compared to what?" | Comparison overlay |
| "What are the exact values?" | Tooltip |
| "Drill into a category?" | Drill-down |
| "Relate this chart to that one?" | Linked brushing / cross-filter |
| "Zoom into a time range?" | Zoom / pan |
| "What counts as red/yellow/green?" | Alert / threshold config |

### Mode gates the inventory

The mode determines which of these categories are defaults-on, which are opt-in, and which are out. This table is the source of truth for *whether* to add a category; the sections below cover *how* to build each. See [`audience-purpose.md`](audience-purpose.md) for the mode definitions and the density dial these cells expand.

| Category | Exploratory | Explanatory | Reference |
|---|---|---|---|
| **Filter** | Many, across every dimension | At most a personalization filter (e.g., "my region") | Stable set: time range, entity picker |
| **Time control** | Flexible range + presets | Fixed to the story's range | Presets + custom range, stable |
| **View / layout toggle** | Rare — facet instead | Never — picks competing story frames | Only when straddling audiences |
| **Sort** | On every comparable chart | Author-frozen — sort is the story | On tables; bar charts author-sorted |
| **Grouping / re-dimensioning** | Yes, when re-pivot is the point | No — groups the argument away | No — breaks muscle memory |
| **Comparison overlay** | Opt-in per chart | Author-frozen to the story's anchor | Default-on where "compared to what?" applies |
| **Tooltip** | Yes, on every chart | Yes, on every chart | Yes, on every chart |
| **Drill-down** | Yes, liberally | No — drill breaks the narrative | Cautiously — only if drill preserves layout |
| **Cross-filter / linked brush** | Yes, core to the mode | No | No — drops muscle memory |
| **Zoom / pan (time)** | Yes | Author-frozen window | Optional |
| **Threshold config (reader-set)** | Rare — author usually sets | Never — thresholds are the argument | Only when the reader owns the definition |

A cell saying "yes" is not a mandate; it's permission. Apply the cost–benefit test per control per dashboard.

### Tooltips are the exception

Tooltips are default-on regardless of mode. They don't compete with the primary story, they reveal precision without clutter, and they cost almost nothing to include. Every other control category is gated by mode; tooltips aren't.

---

## Widget controls

Controls the reader manipulates in the chrome to reshape the view.

### Filters

Filters let readers subset the data to a view relevant to them — a specific region, date range, product line, customer segment. Two levels:

- **Global dashboard filter** — applies to every chart on the canvas. Good for high-cardinality dimensions that cut across all metrics (region, segment).
- **Per-chart filter** — applies only to one tile. Good when a single chart answers a question independent of the rest of the dashboard.

Filter placement:

- **Top of the canvas**, above the first row of charts. Readers look for filters in the header area; hiding them in a sidebar or behind a gear icon buries the primary interaction.
- **Compact.** Filters are infrastructure. A 400px filter panel hogging a third of the canvas is a layout failure. Use a horizontal bar of compact pill/dropdown controls. See [`chrome.md`](chrome.md) and [`structure.md`](structure.md).
- **Visible active state.** A filter that is active must look obviously active — colored chip, bold text, a clear "clear" affordance. Do not bury the active filter state inside a collapsed menu where the reader forgets they filtered.

Filter responsiveness:

- **<100ms display update, or it's not a dynamic query anymore.** A slider that updates the view in 60ms feels like direct manipulation — the reader moves it and sees the data change as a single continuous gesture. At 500ms the same slider feels like submitting a query and waiting for a result, which kills exploratory flow. The threshold is not stylistic; it's cognitive. Below 100ms the reader is *exploring*; above it they are *requesting*.
- **Design for the worst-case data size, not the demo.** Filters often clear 100ms on a sample dataset and silently degrade in production when the table grows 100×. Benchmark against the largest realistic dataset.
- **If you can't hit <100ms, don't expose the filter dynamically.** Switch to an explicit apply-button + loading-state pattern so the reader knows they're requesting, not exploring. Halfway implementations (sliders that take 800ms) are worse than either extreme: the reader tries to drag-explore, gets jitter, and loses trust in the whole chrome.
- **Pre-aggregate to the filter's granularity.** If the filter operates at region × month, the query should hit a region × month summary table, not a row-level fact table the database has to group at click time.

### Time controls

A specialized filter that almost every dashboard needs. Common presets: last 7 days, last 30 days, quarter-to-date, year-to-date, all time, custom range.

- **Presets do most of the work.** The reader picks "last 30 days" far more often than they type a custom range.
- **Custom-range picker** should be available but not the primary affordance.
- **Default matters.** "Last 30 days" as a default silently excludes most of the data for any metric that isn't daily-relevant. The default should match the intended story's range (exec weekly-review dashboard → default to last week; finance close dashboard → default to the current close period).
- **Relative vs. absolute.** "Last 30 days" is relative (re-evaluated at view time); "Jan 1 – Jan 30" is absolute (frozen). Relative is right for operational dashboards, absolute for reports and audits. Don't mix on the same control without labeling which.
- **Auto-refresh** belongs here too — for reference dashboards where freshness is the point. Show the last-refreshed timestamp prominently; staleness destroys trust.

### View / layout toggles

Toggles to switch between chart types (bar ↔ line ↔ table), summary ↔ detail, or grid ↔ list layout.

**View-switching is usually a symptom of failed chart selection.** If you're tempted to add a "view as table / view as bar chart" toggle, the right question is: which chart answers the reader's question? Answer it and commit. See [`../choose-chart/decision-flow.md`](../choose-chart/decision-flow.md).

Two legitimate uses:

- **Audience-straddling dashboards** — one canvas serving both an analyst who wants the table and an exec who wants the bar chart. Even here, consider two separate dashboards linked from each other before building a toggle.
- **Progressive-disclosure summary ↔ detail** — "show top 10" ↔ "show all 47," "show by month" ↔ "show by day." This isn't a view toggle in disguise; it's a density control answering "how much detail do I want?" That's a legitimate exploratory / reference-mode control.

Every toggle doubles the surface area to test, review, and keep in visual consistency with the rest of the dashboard. Default *off* unless you have a specific audience case that justifies the cost.

### Sorting

Let readers re-sort bar charts and tables by any column or value.

- **Default sort is the author's sort** — the one the story requires (value descending for ranking, chronological for time, logical order for ordinal categories). Don't default to alphabetical.
- **Sort indicator** — a small triangle or arrow on the sorted column; clicking a column header sorts/reverses.
- **Secondary sort** — for ties, sort by a stable secondary key (alphabetical name) so the order is deterministic.
- **Explanatory mode**: freeze the sort. The sort is part of the argument.
- **Exploratory and reference**: sort is freely reader-manipulable on tables and ranking bars.

### Grouping / re-dimensioning

Controls that let the reader re-pivot a chart by a different dimension — "revenue by region" ↔ "revenue by product line" ↔ "revenue by channel."

- **Exploratory mode**: powerful. The whole point is to carve the data along any axis.
- **Reference mode**: avoid. Grouping changes what the chart *is*, which breaks the muscle memory that makes reference dashboards useful. If ops watches "tickets by priority" every morning, turning that into "tickets by owner" on the same tile is a different chart in a familiar location — confusing even when technically correct.
- **Explanatory mode**: never. The group-by is the argument. Letting the reader re-group it defeats the point.

Rule of thumb: if regrouping a chart produces something that needs a different title, it's really two charts. Consider showing both instead of hiding one behind a toggle.

### Comparison overlays

Toggles to layer a comparison onto the primary series: prior period, target, forecast, budget, peer benchmark, or a second segment side-by-side.

- **Reference mode**: default-on where "compared to what?" always applies. Every KPI tile with "vs. last week" is a tiny comparison overlay that never should have been opt-in.
- **Exploratory mode**: opt-in per chart. Analysts often want to add and remove comparisons as they explore.
- **Explanatory mode**: author-frozen. The author picks the comparison that makes the argument (plan, prior year, peer) and commits. Letting the reader toggle the comparison reads as the author hedging.
- **Integrity note**: every added comparison is data. If the label says "vs. plan" but the plan was revised mid-period, the overlay lies silently. See [`../02-graphical-integrity.md`](../02-graphical-integrity.md).

### Alert / threshold configuration

Controls that let the author (or reader) set what counts as red/yellow/green — SLA boundaries, variance tolerances, budget thresholds.

- **Thresholds are data**, not decoration. The choice of "red above 5%" shapes every reader's interpretation. Document the threshold on the chart itself, not just in the control.
- **Author-set** for reference and explanatory dashboards. The dashboard maintainer owns the definition; the reader consumes it. Changing a threshold is a versioned, documented action, not a casual UI gesture.
- **Reader-configurable** only when the reader genuinely owns the definition — personal productivity dashboards, custom-SLA views, per-team operational boards where every team defines "healthy" differently. Persist the setting in the URL or per-user state so the reader's threshold travels.
- **Redundant encoding.** Pair threshold color with a shape or symbol so colorblind readers can still read the state. See [`../encode/color.md`](../encode/color.md).

---

## Operational real-time controls

Operational dashboards — the sub-flavor of reference mode used for live monitoring with sub-minute refresh — have a different interactive surface than the reference-for-lookup sub-flavor. They don't appear on reference dashboards with periodic refresh; they don't appear on exploratory or explanatory dashboards at all.

Apply these controls when the dashboard:
- refreshes every few seconds to every minute, AND
- is kept visible throughout a shift rather than opened once per check-in, AND
- drives immediate action on exception (on-call response, shift-floor intervention, trading-desk adjustment).

Reference dashboards updating hourly or daily — finance close, weekly ops review, daily KPI scoreboard — use the widget controls above and do not need this section.

### Refresh-cadence-as-content

Sub-minute refresh is not a technical detail; it's a design constraint. A chart that re-renders every three seconds cannot carry dense annotation (the reader can't finish reading it), cannot use animation on data updates (the motion becomes ambient noise), and cannot use narrative titles (stale in eight seconds). Operational tiles accept more visible change and less explanatory scaffolding than reference tiles.

Make refresh cadence and last-refresh timestamp visible in chrome ("Live · updated 2s ago" or similar). A stale operational dashboard that looks live is worse than a dashboard that admits staleness.

### Freeze Data / Unfreeze Data

Sub-minute refresh is distracting when the reader is trying to study a specific value or chart shape — live updates fight them. Provide a pause control:

- **Single button, two states.** "Freeze Data" ↔ "Unfreeze Data." No separate pause-refresh-interval dial; the reader wants stop and go, not a rheostat.
- **Frozen state visibly different.** The button shines yellow (or otherwise becomes a visible state indicator) while updates are paused. The reader must never forget they're looking at stale data.
- **Self-escalating if forgotten.** If the dashboard remains frozen beyond a threshold (30s–2min, depending on the refresh cadence), the button starts blinking to remind the reader to resume. Silent indefinite freeze is worse than no freeze control at all.
- **Scope: whole-dashboard.** Freeze applies to every live tile simultaneously. Per-tile freeze is almost always over-engineering and leaves the dashboard in an inconsistent state across tiles.

### Alert blink (attention capture)

On operational dashboards where the reader is not staring at the screen, newly-raised alerts must capture attention pre-attentively:

- **Newly-raised alerts blink** at moderate frequency (around 1 Hz) until acknowledged.
- **Once acknowledged** (click, Enter, dismiss), the alert stops blinking but remains visible in its alert color. The condition is still present; only the attention-grab is silenced.
- **Added marks, not color changes.** The most effective alerts appear *only* when the condition exists. See the "added mark" note under tooltips and [`../craft/emphasis.md`](../craft/emphasis.md). Always-on traffic-light coloring (green/yellow/red dot that is always visible and merely changes hue) is less pre-attentive than a red dot that materializes in a previously empty space. Design operational alert indicators to appear on alert, not to sit always-present and change color.
- **Blinking only for new or critical conditions.** Blinking is finite ink: if half the dashboard is blinking at once, nothing draws attention. Reserve the blink for the specific conditions that demand immediate response.

### Audio signal (when the reader isn't watching)

Optional for operational dashboards where the reader is away from the screen during their shift (support-floor supervisor walking the floor, trader taking a call):

- **Audio accompanies the blink on new alerts.** Single tone, short, escalating if unacknowledged.
- **Muted by default** in new installations; require explicit opt-in. Nothing is worse than a dashboard that starts beeping without warning on first load.
- **Click the alert to silence.** Same gesture as stopping the blink — alert acknowledgement is one action across visual and audio channels.
- **System-level mute option.** A session-level mute (keyboard shortcut or toolbar button) for when the reader is in a meeting or focusing.

### Reset Alerts (suppression visibility)

Once alerts have been acknowledged, the dashboard has lost part of its attention-capture capability — subsequent alerts won't blink or sound. That loss must be *visible*:

- **"Reset Alerts" button** that restores the dashboard's alerting capability.
- **While alerting is suppressed, the Reset Alerts button is visibly changed** (e.g., turns yellow). The reader can see at a glance that some conditions are dismissed.
- **Self-escalating.** If alerting has been suppressed for long enough that the reader has probably forgotten, the button blinks. The dashboard refuses to silently lose its alert capability.
- **Clicking Reset Alerts re-arms** blinking and audio for all conditions. Subsequent alerts will announce themselves fully.

### Exception-first ordering

On operational dashboards with tables or ranked lists of entities (reps, orders, regions, servers), default sort is by exception status, not alphabetical or by ID:

- **Worst offenders at the top.** Entities outside acceptable range rise to the top of the list.
- **Flagged with color.** The failing row is in the alert color (muted red, not candy red); the marker is in the row itself, not only via a colored dot somewhere else.
- **Ties broken by severity, then recency.** An entity that's been failing longest or is most severely out of range ranks above a recently-triggered mild exception.
- **Acceptable ordering within the exception region:** most severe first. Acceptable ordering within the healthy region: alphabetical or by ID is fine — these rows are not the focus.
- **Override is a widget control.** The reader can re-sort by any column — but the *default* is exception-first.

Failure mode: alphabetical default sort. The reader scans 25 rows looking for red, which is exactly the attention tax a dashboard should eliminate.

### Measure-count cap on real-time dashboards

Operational dashboards support fewer measures than strategic or analytical ones. Six is a comfortable cap for a real-time supervisory dashboard; ten is already stretching. Reasons:

- **Cognitive load under pressure.** Emergencies require fast reads; twenty measures to scan is twenty scans too many.
- **Pre-attentive scan budget is fixed.** Each tile competes for the reader's initial glance. Dilute across too many and none lands.
- **Refresh visual noise.** Every live tile flickers as data updates. Ten tiles flickering is ambient; thirty is chaotic.

If an operational brief asks for 15+ measures, split the dashboard along natural boundaries (by team, by subsystem, by severity class) or promote some measures to a secondary reference dashboard that updates more slowly.

### Archetype: operational ops dashboard

Combining the controls above, the operational dashboard archetype:

- **Top-left:** live alert strip — one pre-attentive indicator per monitored entity (service, rep, subsystem). Red circle (or similar) *appears* when that entity enters alert state; absent when all is well.
- **Primary metrics adjacent to alerts** in the upper area: the three or four things the operator must monitor continuously, in large type with deltas and sparklines.
- **Bullet graphs** for key indicators with target bands. See [`../charts/bullet.md`](../charts/bullet.md) — bullet graphs are the canonical operational-mode form for actual-vs-target.
- **Exception-ordered entity table on the right**, with one sparkline per row for per-entity trend. See [`../charts/sparkline.md`](../charts/sparkline.md) — embedded sparklines, never standalone.
- **Freeze Data / Reset Alerts controls** along the bottom chrome.
- **Minimal hue.** Gray-scale for normal conditions; one or two intensities of red for alerts. No rainbow palette.

For the underlying mode decision and whether reference-for-lookup or operational-real-time is right, see [`audience-purpose.md`](audience-purpose.md).

---

## Direct-chart interactivity

The chart itself responds to hover, click, or drag — no separate widget needed.

### Tooltips

Tooltips reveal precise values on hover, so the static chart can stay uncluttered. Unlike the widget controls above, tooltips are default-on across every mode.

- **Use tooltips instead of static data labels** when there are many data points — a 24-month line chart doesn't need 24 numbers on it; it needs a tooltip.
- **Keep static labels** for the values whose precision is load-bearing — the endpoint of a line, the tallest bar, the annotated point. The reader should not need to hover to get the dashboard's main numbers.
- **Tooltip content** should show: the category/time the user is pointing at, the precise value **with its unit** (`$18.90/day`, `63.4%`, `412 cases` — not bare `18.9` or `63.4` or `412`), and any comparison (prior period, target, delta). The bare-number tooltip is a common failure when the chart's axis declares the unit (`Avg daily spend ($)`) and the generator assumes the axis label transfers — it doesn't, because the tooltip is a separate read context. The reader doesn't have the axis visible while reading the tooltip; the tooltip must carry the unit on its own. See [`../craft/typography-and-labels.md`](../craft/typography-and-labels.md) *Units appear exactly once per read context*.
- **Tooltip placement** must not occlude the data it describes. Tooltips that cover the hovered point or the adjacent data force the reader to hover-then-peek-around, which is broken.
- **Dismissal** is obvious: moving the cursor away closes the tooltip. No sticky tooltips unless there is a clear "pin" affordance.
- **Tooltip indicator marks must match the chart's series colors.** When a multi-series tooltip lists values with leading markers (dots, squares, swatches), each marker must be the same hue the chart uses for that series — not the library's default tooltip palette. The common failure: the library distinguishes between a "line color" (used to stroke the line) and an "item color" (used for markers, legends, tooltip indicators); setting only the line color leaves the tooltip rendering default-palette swatches — `[purple dot] Cursor: 49.4%  [green dot] Claude Code: 31.1%` while the lines themselves are blue and orange. The reader now sees three palettes at once (chart, legend, tooltip) and has to re-match which dot belongs to which line. **Set every slot the library exposes for a series' color.** This is the dashboard-palette consistency rule (see [`../encode/color.md`](../encode/color.md)) applied to interactive state — the tooltip is the same series→color mapping the chart is, and must render it identically.

### Drill-down

Drill-down lets a reader click a category (e.g., a bar, a table row, a region on a map) to see that category broken down further.

- **Indicate drillability.** A bar the reader can click should look different from a bar they can't — cursor change on hover, subtle highlight, a small chevron. The tragedy of drill-down is features nobody discovers.
- **Breadcrumb the path.** When the reader drills from "all regions" into "North America," the dashboard header should show "All regions › North America" with the first element clickable to return. Without a clear path back, drill-down becomes a trap.
- **Avoid dead-ends.** If a bar is clickable, clicking it must take the reader somewhere useful. A click that opens an empty panel or a "no further detail" message is a broken promise.
- **Drill-down should preserve filter context.** If the reader filtered to Q3 and then drills into Enterprise, they should still be looking at Q3 Enterprise, not Q3 reset to all segments.
- **Reference mode caveat.** Drill only if it *preserves the base layout* — drill opens a side panel or a modal; it does not replace the whole dashboard. Reference readers navigate by muscle memory; sending them to a different page on a click breaks that.

### Relate

Click a specific value or entity to surface what's related to it elsewhere on the dashboard. Distinct from the other three direct-chart interactions:

- **Tooltip** reveals details *about* the hovered element — no state change elsewhere.
- **Drill-down** navigates *into* the element — replaces or augments the view.
- **Cross-filter** uses brush/selection *from* a chart to filter all others — reciprocal, drag-based.
- **Relate** is a single click that asks "show me what else is tied to this" — one-way, attribute-based, lightweight.

Canonical examples:

- Click a director's name in a film tooltip → the dashboard filters to all films by that director.
- Click a medication in a patient timeline → related visit reports, prescriptions, and lab tests highlight on adjacent tiles.
- Click a customer row in a leaderboard → that customer's orders, open issues, and recent contacts appear on peripheral tiles.

Rules:

- **Clickable relate-affordances must look clickable.** Underlined text, hover color change, pointer cursor. Silent clickability on tooltip fields or axis labels is never discovered. If it's not discoverable, it's not a feature.
- **One-way, not reciprocal.** Clicking a director filters the rest of the dashboard to that director; it does *not* also filter the director list back. Reciprocal behavior is cross-filter below and has different semantics.
- **Reversible by the same gesture.** Click again to clear, or a clear affordance in the filter-chip area. Never trap the reader in a related view without an escape.
- **Make the origin visible in the filter state.** When a click has filtered the dashboard, a chip should appear ("Director = Spielberg ×") identical to what a reader-set filter would show. The relate-click and the filter-bar filter are the same state; display them the same way.
- **Available in every mode.** Unlike cross-filter, relate works in explanatory and reference dashboards too. A reference dashboard can let the reader click a ticket owner's name to filter to their queue; an explanatory dashboard can let the reader click a callout's entity to see the evidence. The gesture is quiet enough not to undermine layout stability or narrative.

### Linked brushing / cross-filtering

Selecting in one chart highlights related data in others. Powerful for exploratory dashboards; avoid elsewhere.

- **Highlight, don't hide.** Selecting "Enterprise" in a pie should bold Enterprise everywhere else on the dashboard; it should not remove the other segments from view. Readers lose orientation when non-selected data vanishes.
- **Visible selection state.** The reader must be able to see at a glance which tile is the "source" of the selection and which are being filtered by it.
- **Clear-selection affordance.** An obvious way to reset — clicking empty space, a visible "Clear" button, or pressing Escape.
- **Not for reference mode.** Cross-filter is the canonical exploratory gesture; it breaks the layout stability that reference readers rely on.

### Zoom / pan (time-series)

- **Brush-to-zoom** on line charts. The reader drags across a range to focus. Always provide a "reset zoom" button.
- Maintain the axis labels and units when zoomed — the reader must never lose context for what they're looking at.
- **Explanatory mode**: usually skip. If the zoomed window matters, the author should render it directly instead of relying on the reader to brush.

---

## Consistency: the same gesture means the same thing everywhere

A dashboard is a little user interface, and the reader learns its conventions within seconds. Violating those conventions costs more than any feature is worth.

- **Hover = preview / tooltip.** Passive, reversible.
- **Click = select / filter.** Commits to a state.
- **Shift-click = add to selection.** When multi-select is supported.
- **Double-click / right-click = drill in** (if used; pick one and stick with it).
- **Hover cursor change** signals clickability. Non-clickable elements do not have a pointer cursor.
- **Same filter gestures across every chart.** If clicking a bar on chart 1 filters the dashboard, clicking a bar on chart 3 should do the same. Asymmetric interactivity is disorienting.

Document the interactions somewhere discoverable — a small "?" icon with a help popover is fine, but the interactions should be guessable enough that most users don't need it.

## Defaults matter more than features

The default state of the dashboard is what 90% of viewers will see. Treat it as the primary artifact.

- **The default filter state must tell the intended story.** If the dashboard is "2025 financial summary," the default time range is 2025 — not "last 30 days" that happens to include early 2026.
- **Default sort is meaningful.** Value-descending for ranking, chronological for time, logical for ordinal categories — not alphabetical unless that's the story.
- **Default aggregation** matches the audience. An exec dashboard defaults to monthly totals; an ops dashboard may default to daily.
- **No surprise defaults.** "Last 7 days" is a dangerous default when the user expected "all time" and is now looking at a chart that excludes most of their data without realizing.

Every default is a silent editorial decision. Make them deliberately.

## State — URL, bookmarking, and sharing

A dashboard is only useful if the insight can be shared. Sharable state is interactivity's single biggest multiplier.

- **Encode filter state, time range, selection, and sort in the URL.** Copy the URL, paste in Slack, everyone lands on the same view.
- **Named views / bookmarks** for recurring configurations ("my team's Q3 view").
- **"Copy link to this view"** button is worth more than any clever animation.
- **PDF export / snapshot** for the dashboard in its current state. Boards, audits, and email recipients want a static artifact.

Without shareable state, dashboards live and die inside the tool, and the insight doesn't travel.

## Accessibility

Interactivity must not lock out keyboard users, screen-reader users, or users on touch devices.

- **Every interactive element is keyboard-reachable** (tab order is sensible) and **keyboard-actionable** (Enter/Space activate).
- **Focus states** are visible — a clear ring or outline. Never `outline: none` without a replacement.
- **Screen-reader labels** for filter controls ("Time range: last 30 days"), for chart data (alt text or an ARIA description of the chart's main finding), and for drill-down affordances.
- **Touch targets** at least 44×44px — desktop-sized hover targets are unusable on mobile.
- **Tooltips are not the only path to precise values.** A screen-reader user cannot hover. Provide a data table view or downloadable data for charts where precision matters.
- **Color is never the only encoding** for interactive state. A selected bar is darker AND bolder AND annotated, not just "a different shade of blue".

## Feedback — the interactive state must be legible

The user must always know: (1) what is currently selected/filtered, (2) what their last action did, (3) how to undo or reset.

- **Filter chips** show active filters prominently. "Region: North America ×" with an obvious clear affordance.
- **Loading states** on charts that re-render after a filter change. Silent stale data is worse than a 300ms spinner.
- **Selection highlight** on the element the user clicked — don't make them guess whether their click registered.
- **Empty states** when a filter combination returns no data. "No results for these filters — try widening the date range" beats an empty chart with no explanation.

## Animation — sparingly

Transitions can help the reader track what changed ("preserving object constancy"). Rules:

- **Animate only to aid comprehension**, not for decoration.
- **Keep it short** (150–300ms). Slow animations become annoying by the tenth interaction.
- **Respect `prefers-reduced-motion`** — some users get motion sickness or find animation distracting.
- **No gratuitous entrance animations** — bars sliding in from the bottom on every page load is a novelty that wears off in two seconds.

## Things to avoid

- **Surprise defaults** — "Last 7 days" when the user expects "All time," or a default region that isn't theirs.
- **Tooltips that occlude their own data** — covering the point they describe.
- **Drill-down with no path back** — no breadcrumb, no reset, reader stuck.
- **Drill-down dead-ends** — clickable elements that lead to empty or meaningless views.
- **Filters hidden behind a gear icon** — out of sight, out of mind, never used.
- **Interactive-only insight** — the headline finding requires a hover to see.
- **Inconsistent gestures** — click filters on chart 1, hover filters on chart 3.
- **Non-shareable state** — no URL encoding, no snapshot, no way to send the view to a colleague.
- **Color-only selection state** — red bar vs blue bar is invisible to many readers.
- **Hover states that depend on cursor precision** — tooltips triggered by a 2px-wide hover region.
- **"Apply filters" buttons** that require the user to click after each change — unless the query is expensive, apply filters immediately and show loading state.
- **View-toggle as a way to punt on chart selection** — "bar or line, let the reader pick" instead of answering "which chart fits the question?"
- **Grouping on a reference-mode chart** — changes the chart's identity and breaks the muscle memory that makes the dashboard useful.
- **Reader-configurable thresholds where the author owns the definition** — color-coded SLAs that the reader can loosen are a guaranteed accountability mess.

## Progressive disclosure

A useful pattern for managing density: show the essential by default, reveal detail on demand.

- A `single-value` tile shows the headline number; on hover/click it expands into a mini sparkline with last-12-months context.
- A `bar` chart shows top 10 categories by default with a "Show all 47" affordance.
- A `pivot-table` collapses to subtotals by default; clicking a row expands the detail.
- Tooltips carry the precision the static chart omits.

Progressive disclosure lets a dashboard be simple for the 80% of readers who only want the headline, and rich for the 20% who want to dig. But: the information hidden by progressive disclosure must genuinely be secondary. Don't hide the point of the dashboard behind a click.

## Interactive combinations that cause trouble

Some interactivity features interact badly with each other:

- **Drill-down inside a filtered view** — a reader filters to "Q3," drills into "Enterprise," then changes the filter to "Q4." Does the drill-down survive the filter change? Make this behavior explicit and consistent. The best default: preserve the drill path, re-apply it to the new filter.
- **Multi-select with cross-filtering** — selecting three categories across two different dimensions produces a combinatorial filter the user may not have intended. Visualize the resulting filter as a chip stack so they can see what's active.
- **Brush-to-zoom with linked charts** — zooming on one chart may or may not rescale linked charts. Pick a behavior and be consistent. Usually: linked charts follow the brush, but the reader can opt out with a toggle.
- **Filters that empty out the data** — the reader applies three filters and sees an empty chart. Show an explicit empty state with the reason and a "clear filters" action, not a silent blank.
- **Comparison overlay + filter** — filtering to "EMEA" while "vs. global plan" is the overlay: does "vs. plan" mean the EMEA slice of plan, or global plan? Be explicit in the subtitle; don't let the reader guess.
- **Grouping + sort** — re-grouping a chart and then re-sorting it stacks two reader choices on top of the author's default. Reset sort on regroup, or make the current sort dimension visible in the sort control.

## Mobile / touch adaptations

On touch devices, interactivity changes shape:

- **No hover.** Tooltips must trigger on tap; dismissing them must be obvious (tap elsewhere, or a close button).
- **Larger touch targets** — 44×44px minimum. Tiny bar segments that were clickable on desktop must either be expanded for touch or replaced with a list view.
- **Long-press** for secondary actions (drill, multi-select) where desktop used right-click.
- **Gesture conventions** — pinch-to-zoom, swipe-to-dismiss — should follow the platform's native expectations, not invent custom gestures.
- **Filter controls** go at the top, collapsible, not in a side panel that takes half the screen.

## Checklist before shipping interactivity

- Primary story visible in default state without any interaction.
- Mode picked consciously; interactivity-by-mode matrix consulted; every widget control justified against the cost–benefit test.
- Default filter state is deliberate and tells the intended story.
- Filter state is visible at a glance (active chips, not hidden in menus).
- Tooltips don't occlude the data they describe.
- Drill-down has a breadcrumb and a clear path back.
- Gestures are consistent across every chart.
- State is URL-encoded; dashboard views are shareable.
- Keyboard-navigable, screen-reader-friendly, touch-target-sized.
- Loading, empty, and error states are handled, not silent.
- Animations are short and purposeful; `prefers-reduced-motion` honored.
- View toggles justified by a real audience case, not by chart-selection indecision.
- Grouping controls limited to exploratory mode.
- Comparison overlays resolve cleanly under filter combinations (subtitle or caption states which slice of the comparison applies).
- Thresholds documented on the chart, not just in the control.

## See also

- [`../00-mental-model.md`](../00-mental-model.md) — "above all else show the data" applies to default state
- [`structure.md`](structure.md) — filter bars and interactive chrome as layout elements
- [`chrome.md`](chrome.md) — filter-bar placement and compactness
- [`narrative.md`](narrative.md) — the story must survive without interaction
- [`audience-purpose.md`](audience-purpose.md) — the mode × density table is the source of truth; the matrix here is its operational expansion
- [`../choose-chart/decision-flow.md`](../choose-chart/decision-flow.md) — pick the chart before adding a view-toggle
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — filter state must not hide or distort
- [`../encode/color.md`](../encode/color.md) — threshold color with redundant shape encoding
