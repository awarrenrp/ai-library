---
name: funnel
description: Produce chart.geom (funnel) — sequential stages where each stage is a subset of the previous.
governs: chart.geom (funnel)
consumes: dashboard.palette
---

# Funnel

A funnel shows a strictly sequential pipeline in which each stage is a subset of the previous one: every paid user first activated, every activated user first signed up, every signed-up user first visited. The chart form is a stack of horizontal bars centered on a vertical axis, widest at top, narrowing as the counts decrease. The narrowing shape is a visual idiom — it evokes "falling through a funnel." The shape itself encodes no information that the bar lengths don't already encode; the trapezoid walls add visual drama that is not in the data. Still, the idiom is deeply established in growth / sales / product contexts, and the audience expectation is often strong. This recipe renders it well when it ships and points to sorted bars when flexibility exists.

## When to use

A funnel is acceptable when **all** of these hold:

- Stages are **strictly sequential**. Each stage's population is a proper subset of the prior stage. If a user can enter stage 3 without having been in stage 2, it's not a funnel — use sorted `horizontal-bar` or a flow diagram.
- Counts are **monotonically decreasing**. Stage N ≤ Stage N-1 for every N. If a stage can be larger than the prior stage (e.g., "returning users"), it's not a funnel.
- The **narrative is conversion / drop-off**. The reader wants to know "where are we losing people?" and "what's the end-to-end rate?".
- Stage count is **3 to 7**. Fewer than 3, and a single-value with a conversion ratio is simpler. More than 7, and the stage labels crowd.
- The audience **expects the funnel idiom** (sales ops, growth dashboards, onboarding reviews). In those contexts, the form communicates the concept before the data does, which is a legitimate win.

## When NOT to use (and alternatives in the palette)

- **Non-sequential parts-of-whole.** If the "stages" are actually categories (e.g., "revenue by plan tier"), that's part-to-whole, not a funnel. Use sorted **`horizontal-bar`**.
- **Comparing multiple funnels.** Two side-by-side funnels (this quarter vs. last, desktop vs. mobile) force the reader to compare two separate trapezoid systems. Use **grouped bars per stage** (small multiples by stage, or a `horizontal-bar` per stage with one bar per cohort) or a **slopegraph** of stage-level conversion rates.
- **Stages with weak subset relationships.** If "activated" includes some users who never "signed up" in the usual sense (sales-assisted, imported contacts), the funnel is lying about containment. Use sorted `horizontal-bar` with an explicit note that stages are not strict subsets.
- **Drop-off that is not the story.** If the user wants the absolute counts at each stage without the drop-off narrative, use a `horizontal-bar` or a `pivot-table`.
- **Conversion rate trend over time.** Use a **`line`** of each stage's conversion rate, or a `line` of end-to-end conversion with stage-level lines muted behind it.
- **Stage count > ~8.** Funnel becomes a tall, narrow sliver. Aggregate adjacent stages or switch to a horizontal bar list.

## Rules (how to render a funnel well when you do ship one)

### Structural

- **Orient horizontally by default** (stages stacked top-to-bottom, bars running left-to-right). This matches Western reading flow and keeps stage labels left-aligned for easy scanning. Vertical-trapezoid funnels work too; the reading order there is top-to-bottom along the vertical axis.
- **Avoid the pure trapezoid shape** where each stage is a symmetric trapezoid narrowing into the next. The sloping walls encode nothing but add visual mass proportional to area, inflating the apparent drop-off (a lie-factor concern — see [`../02-graphical-integrity.md`](../02-graphical-integrity.md)). Prefer **flat horizontal bars**, each centered on the same vertical axis, each sized by its count. The funnel "shape" emerges from the bar widths without the decorative angled walls.
- **Bar widths proportional to count** — this is proportional encoding. Do not stylize the widths for aesthetic smoothing (`min_bar_width` overrides that compress the last tiny stage up to the 2nd-to-last size are a lie factor > 1.05).
- **Equal bar heights**, equal vertical spacing. Height encodes nothing; making later stages shorter because "they feel smaller" is design variation, not data variation.
- **No 3D, no shadow, no gradient fills.** Integrity and clutter violations.

### Labels (the funnel's job is almost entirely in the labels)

The visual encoding is weak (centered bars, no common baseline for precise length reading). The labels carry the meaning. Label every stage explicitly:

- **Stage name** (left or inside-left of the bar).
- **Absolute count** at that stage (e.g., `12,430`).
- **Conversion rate from the prior stage** (e.g., `↓ 34%` between stages, shown between bars or at the right of each stage). This is the step-over-step drop that the trapezoid shape is gesturing at — make it explicit.
- **Cumulative end-to-end rate** on the final stage (`overall: 2.1%` or `100 → 2.1%`).
- **Direct labels, not a legend.** One color per funnel; the legend has nothing to do.

### Emphasis — highlight the biggest drop

The narrative is almost always "where are we losing people?". The reader's eye should go to the worst drop-off automatically:

- **Highlight the largest step-over-step drop** with an accent color on the conversion-rate label between those two stages, or with a short annotation (`biggest drop: signup → activation, -78%`). Accent-on-gray for the rest.
- If multiple drops are comparable, annotate the one the user's big idea is about (see [`../01-design-process.md`](../01-design-process.md)) and let the reader discover the rest.
- Reserve color for the drop-off story, not for decoration. Do not color each stage a different hue.
- **Don't accent the first and last stages just because they're the endpoints.** "Created" and "Closed" (or "Visits" and "Paid", etc.) are structural anchors of any funnel — they carry no story the reader doesn't already see from the layout. A funnel rendered with saturated accent on `Created` + `Closed` and light fill on the intermediates marks position-in-sequence rather than where loss occurs. The reader's eye lands on the trivial bars (top of funnel = always 100%; bottom = the survivor count) and away from the bars that show the actual drop-off. See [`../craft/emphasis.md`](../craft/emphasis.md) *Structural emphasis is empty emphasis*. This applies whether rendered as a funnel or as a horizontal-bar chart of sequential stages — the data shape, not the chart type, governs the emphasis logic.

### Color

- **Single hue, uniform fill** across all stages by default. The funnel shape is doing the categorical work; extra color adds noise.
- Accent color on the focal stage or the focal drop-off annotation.
- If the funnel is segmented (e.g., funnel by channel, stacked), cap segment count at 3 per stage and prefer a different chart — segmented funnels exceed the form's carrying capacity. See alternatives below.
- Colorblind-safe.

### Size and layout

- **Minimum funnel panel height** ≈ `(stage_count × 56 px) + 120 px` for label space. Shorter, and stage labels and conversion-rate labels collide.
- Prefer a card wider than tall so the widest bar (top) has room and conversion-rate annotations fit in the right margin.
- Do not render a funnel at thumbnail size. If the dashboard only has room for a thumbnail, switch to a `single-value` showing end-to-end conversion with a sparkline-ish text like `100 → 34 → 12 → 2 (2.1%)`.

## Palette alternatives to suggest

When flexibility exists, offer:

- **Sorted `horizontal-bar` descending, with delta labels between bars.** Usually more honest and more precise. Each bar shares a left baseline (stage name), so the reader reads length against a common anchor. The conversion-rate annotations carry the drop-off story without the decorative trapezoid walls. This is the literature-preferred form and often the right default.
- **`single-value` showing end-to-end conversion rate**, with the stage counts listed as a small subtitle (`12,430 → 4,210 → 510 → 87 · 0.7% overall`). Works when there's one number that matters and the stages are context.
- **`line` of conversion rate over time**, one line per stage transition, when the user cares about whether a given drop-off is getting better or worse.
- **`pivot-table`** with one row per cohort/week/channel and one column per stage (with conversion rates in adjacent columns). Ideal for segment-by-segment funnel analysis — something a single funnel visualization cannot show.

Phrasing: "This can ship as a funnel. If you want the conversion rates readable at a glance and the audience doesn't strongly expect the dial-and-narrow shape, a sorted horizontal bar with delta labels between bars is often clearer — want me to render both?" Do not refuse the funnel.

## Anti-patterns

- **Trapezoid walls sized for aesthetics**, not for data — angled walls that make the drop-off look steeper than it is. Lie factor > 1.05.
- **3D / tilted funnel.** Integrity violation.
- **A funnel of non-sequential categories** (e.g., "funnel" of revenue by region). Not a funnel.
- **No conversion-rate labels.** The shape implies drop-off; without labeled rates, the reader has to estimate from bar widths, which is exactly the weakness the labels exist to cover.
- **Stage bars all the same width** to "look neat." Breaks proportional encoding; the chart is no longer a funnel, it's a labeled list.
- **Rainbow stage colors.** Adds no information; exceeds preattentive working memory.
- **Stacked funnel with 5+ segments per stage.** Funnel form cannot carry that much composition. Switch to a `pivot-table` or grouped bars.
- **Comparing multiple funnels** by overlaying or juxtaposing. Use stage-level bars or a slopegraph.
- **Conversion rates computed against the top of the funnel** instead of the prior stage, labeled ambiguously as "conversion." State which denominator: `conversion from prior stage` vs. `end-to-end conversion`. Both are useful; conflating them is a lie of ambiguity.
- **Funnel over a time window the audience misreads** — e.g., a "last 30 days" funnel where users who visited on day 30 haven't had time to reach `paid`. Use a **cohort funnel** that tracks the same users across stages, and state the cohort window explicitly in the subtitle.

## Common failures to catch

- A later stage with a larger count than an earlier stage — data error or non-sequential stages.
- Conversion rates shown as decimals (`0.34`) instead of percentages (`34%`) — harder to read at a glance.
- Stage labels that disagree with the data (e.g., `Visits` stage includes bots; clarify definitions in a footnote or rename stages).
- Bar widths clamped to a minimum, hiding that the final stage is ~0.
- Two funnels rendered in a dashboard with different stage definitions, making cross-funnel comparison meaningless.
- The "biggest drop" being the one the team is already working on while a bigger, untouched drop goes unannotated — annotate the data's story, not the team's story.

## Worked example

Request: "Signup funnel for last week: visits 120,000 → signups 12,000 → activated 4,200 → paid 510."

- Strictly sequential, monotonically decreasing, four stages, audience is a growth team that expects the funnel idiom. **Funnel is acceptable.**
- Render flat horizontal bars (no trapezoid walls), centered on a shared vertical axis, stacked top-to-bottom.
- Each stage bar width proportional to count (120K → 12K → 4.2K → 510).
- Labels per stage: `Visits · 120,000`, `Signups · 12,000`, `Activated · 4,200`, `Paid · 510`.
- Between-stage annotations for conversion: `↓ 10%` between Visits and Signups; `↓ 35%` between Signups and Activated; `↓ 12%` between Activated and Paid.
- Accent the biggest drop: the Visits → Signups drop (`↓ 10%`) is the worst because it loses 108,000 people in absolute terms. Annotate in the accent color: `biggest loss: 108K visitors don't sign up`.
- Footer: `end-to-end: 100 visits → 0.4 paid (0.4%)`, `week ending 2026-04-19, all channels`.
- Single uniform hue across stages; gray for everything except the accent annotation.

Counter-example: the "funnel" has 5 stages but a user can re-enter stage 3 from stage 5 (upgrades after downgrade). Not strictly sequential — use a sorted `horizontal-bar` with a footnote explaining the pathway, or a Sankey.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — proportional encoding; why trapezoid walls inflate drop-off
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — progression / funnel routing
- [`../encode/color.md`](../encode/color.md) — accent-on-gray for the focal drop-off
- [`bar.md`](bar.md) — the literature-preferred alternative
- [`single-value.md`](single-value.md) — when end-to-end conversion is the only number that matters
- [`line.md`](line.md) — conversion rate over time
