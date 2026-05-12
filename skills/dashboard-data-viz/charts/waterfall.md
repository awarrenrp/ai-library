---
name: chart-waterfall
description: Produce chart.geom (waterfall) — decompose a change into sequential additive contributions (bridge charts).
governs: chart.geom (waterfall)
consumes: dashboard.palette
---

# Waterfall chart

A waterfall chart decomposes a net change into a sequence of additive contributions. The leftmost bar anchors at the starting value; each subsequent bar floats, starting where the previous bar ended, rising for positive contributions and falling for negative ones; a final bar at the right anchors at the ending value. It is the canonical "bridge" chart — headcount bridges, variance analyses, P&L walks, budget-to-actual decompositions.

Structurally it is a stacked bar chart that has been "pulled apart one piece at a time", with each segment given its own x-position. In the grammar: `stat=identity + geom=bar`, where each bar's y-position is a running total and each bar's height is the signed contribution of that step. Connecting dotted lines between bar tops are a second `geom=path` layer.

## When to use

- **Financial variance / bridge analyses.** "Prior-quarter revenue + new business + expansion − churn − downgrades = current-quarter revenue." The canonical finance use case.
- **Headcount bridges.** "Starting headcount + new hires + transfers in − transfers out − attrition = ending headcount".
- **Budget-to-actual walks.** "Budgeted cost + labor variance + material variance + overhead variance = actual cost."
- **P&L decomposition.** "Revenue − COGS − Opex − Taxes = Net Income." Each step visually subtracts from the running total.
- **Inventory movement.** "Opening inventory + purchases − shipped − written-off = closing inventory."
- **Any scenario where the story is "start → these things happened → end"** and the viewer needs to see each thing's magnitude and sign relative to the total movement.

## When NOT to use

- **When the steps aren't actually additive.** If the contributions multiply, offset each other non-linearly, or don't sum to the net change, a waterfall lies. Use a stacked bar of contributions alongside start/end single-values.
- **When the audience only cares about the net.** A `single-value` with a delta ("Revenue: $12.4M (+$1.2M vs. Q2)") carries the net change without the decomposition burden.
- **When there are too many steps (>8–10).** The chart gets visually cramped and the eye loses the running total. Either group smaller contributions into "Other" or facet into two stacked waterfalls.
- **When steps are unordered / simultaneous.** A waterfall implies sequence — reading left to right. If the contributions happened in parallel or their order is arbitrary, a sorted horizontal-bar of contributions is more honest.
- **When the sign of a step depends on perspective** and could flip depending on the reader's frame. Label signs explicitly.

## Rules

### Structure

- **First bar: starting value, anchored at zero baseline.** Label clearly — "Q2 Revenue: $11.2M" or "Jan 1 headcount: 432."
- **Middle bars: floating, each starts where the previous ended.** Positive contributions rise; negative contributions fall. Each bar's height equals the absolute magnitude of the signed delta.
- **Final bar: ending value, anchored at zero baseline.** Matches the cumulative sum of the starting value plus all signed deltas. Label — "Q3 Revenue: $12.4M" or "Mar 31 headcount: 445."
- **Start and end bars are visually distinct** from the step bars — typically a neutral gray or a darker shade, since they represent totals rather than deltas. Do not color them with the positive/negative palette used for the middle bars.
- **Dotted connector lines between adjacent bar tops** trace the running total across the chart. These are subtle but critical — they prevent the eye from losing the cumulative thread between bars.

### Color

- **Three-color palette: positive, negative, neutral**.
  - **Positive contributions:** a single "up" color — green is conventional but interacts badly with the 8% of men who are red-green colorblind; blue is the safer default.
  - **Negative contributions:** a single "down" color — red is conventional; orange is the colorblind-safe alternative.
  - **Start / end totals:** a direction-neutral color, usually gray. Signals "this is a level, not a delta."
- **If the story is direction-agnostic** (e.g., "rent went up, salaries went down, both are planned"), consider muting the up/down contrast and relying on labels. Don't let the color alone imply a value judgment that the data doesn't support.
- **Secondary-cue redundancy for colorblind safety** — put a "+" / "−" sign on labels or use up-arrow / down-arrow glyphs alongside color.

### Labels

- **Label each bar with its signed delta.** "+$1.2M" / "−$0.4M" / "+45 hires" / "−12 attrition." The sign and the magnitude both carry information.
- **Signs are explicit.** Don't rely on position (below/above) alone to convey direction — the "+"/"−" in the label is cheap and unambiguous.
- **Start and end bars get total labels**, not delta labels — "$11.2M," not "+$11.2M."
- **Include the net change somewhere** — in the title ("Revenue up $1.2M in Q3") or as a bracket spanning start to end. Even with every bar labeled, the net is worth summarizing.
- **Category / step name below each bar**, horizontal if possible (tilted labels are a readability hit; shorten category names or use a horizontal waterfall instead).

### Orientation

- **Horizontal waterfall (steps stacked vertically)** is often easier to read when step labels are long, following the same logic as horizontal bars for long-label comparisons.
- **Vertical waterfall (left-to-right steps)** is the conventional finance form and reads naturally for financial audiences who've seen it before.
- Pick one and stick with it across related charts in the dashboard.

### Axes

- **Zero baseline is non-negotiable for the start and end bars.** They encode totals via length from zero.
- **The intermediate bars, being floating, don't touch zero** — that's the form. But the underlying y-axis scale is still a zero-anchored linear scale.
- **Do not truncate the y-axis** to amplify small bars. Lie-factor violation.
- **Gridlines light or absent**, as with bar charts.

### Ordering of the middle bars

The order of the middle bars affects readability but not the math (the net change is invariant to order). Three conventions:

1. **Narrative order** — the order the steps happened (or the order the audience will tell the story). Usually best for finance bridges.
2. **Sign grouping** — all positives first, then all negatives (or vice versa). Makes the "up-then-down" shape pop but loses narrative.
3. **Magnitude order** — largest contribution first. Makes the biggest movers obvious but scrambles narrative.

Pick one deliberately; don't default to alphabetical.

### Subtotals

- **Intermediate subtotal bars** (e.g., "Gross margin" in the middle of a P&L waterfall) anchor at zero like start and end totals, break the running chain, and restart. Use the neutral-total color.
- **Label subtotals clearly** so the reader knows the chain is being reset — "Gross Margin: $6.1M (subtotal)."

## Simpler alternatives

When a waterfall is a heavier lift than the audience needs, options ranked:

1. **Sorted `horizontal-bar` of signed deltas, with a summary `single-value` for the net.** One bar per contribution, positive bars to the right of zero, negative bars to the left, sorted by magnitude or by sign-group. Paired with a `single-value` header showing "Start: $X · End: $Y · Net: +$Z". Loses the running-total encoding but preserves the magnitude-and-sign of each step and the net.
2. **A `pivot-table` of steps with columns `step | delta | running total`**, paired with a `single-value` for the net. This is the spreadsheet view — precise, unambiguous, no visual decomposition but no risk of misreading either. Good for finance audiences who'll read the numbers regardless of the chart.
3. **`combination`** with a bar chart of signed deltas and a line of the running total overlaid. Clever but asks the viewer to reconcile two encodings; use only if the audience is chart-literate.
4. **Two `single-value`s** (start, end) plus a sorted `horizontal-bar` of contributions beneath them. A pragmatic dashboard layout when the waterfall itself is unavailable.
5. **`stacked` bar as a pseudo-waterfall** — stack the positives and negatives on one bar with the net on another. Possible but usually awkward and harder to read than option 1.

Tell the user why when falling back: "Rendered as a delta bar chart + net single-value because the audience reads signed bars faster than a running-total chain." The combination of a table and a single-value often conveys the same story with less visual machinery.

## Anti-patterns

- **Using green for one direction and red for the other with no secondary cue.** Red-green colorblindness affects 8% of men; use blue/orange or add glyphs / signs.
- **No connector lines between bar tops.** The reader has to mentally chain the floating bars; a dotted line does the work for free.
- **Start and end bars colored with the positive/negative palette.** Implies they are deltas when they are levels. Use neutral gray.
- **Unlabeled middle bars.** The reader can't recover the magnitude from visual inspection alone; label each bar with its signed value.
- **Steps that don't actually sum to the net change.** The chart looks decomposed but hides a residual. Either fix the decomposition or include an explicit "Other / unexplained" step — hiding the residual is a integrity failure.
- **Truncated y-axis to make small bars more visible.** Lie-factor violation.
- **3D / bevel / gradient-filled bars.** Chartjunk and integrity violation.
- **Too many steps (>10) in one panel.** Visual overwhelm; group small contributions into "Other" or split.
- **Alphabetical step order.** Destroys the narrative and hides the magnitude story.
- **Dual y-axis** (e.g., percent on right, dollars on left). A waterfall has one axis — the running total in its natural unit.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — zero-baseline for totals; not truncating the y-axis; matched dimensionality
- [`../00-mental-model.md`](../00-mental-model.md) — why floating bars are a legitimate length encoding against an implicit common scale
- [`../encode/color.md`](../encode/color.md) — positive/negative/neutral palette and colorblind safety (when added)
- [`../craft/annotations.md`](../craft/annotations.md) — signed-delta labels and subtotal markers (when added)
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — deviation and decomposition question shapes
- [`bar.md`](bar.md) — the underlying geom and the zero-baseline rule (when added)
- [`single-value.md`](single-value.md) — the summary partner for the net change (when added)
