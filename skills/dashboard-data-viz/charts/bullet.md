---
name: bullet
description: Produce dashboard.tile (bullet) — KPI with target, actual, and qualitative performance bands. Bullet replaces gauge.
governs: dashboard.tile (bullet)
consumes: dashboard.palette
---

# Bullet chart

A bullet chart (Stephen Few, 2005) is a small horizontal bar that encodes three things at once: the **actual** value (length of a bar), a **target** value (a perpendicular tick), and **qualitative ranges** (bad / satisfactory / good, shown as background bands in graduated grey). It was designed explicitly to replace dial/gauge charts on dashboards — which waste space and encode quantity with angle, the worst position on the perceptual hierarchy.

One bullet is small. Many bullets stack beautifully into a column: at a glance the reader sees which indicators are red, which are on-track, and which are ahead of plan — using position and length, the two most accurate visual channels.

## When to use

- **Target-vs-actual KPIs with qualitative context.** Revenue attainment against plan with "below / at / ahead" bands; a SLA with "red / yellow / green" thresholds; a funnel conversion with historical quartile context.
- **Dashboards with many comparable indicators in tight space.** Six to twenty KPIs stacked vertically, each one bullet tall, each sharing the left edge so the reader scans actuals down a common baseline.
- **Replacement for a gauge.** Anywhere a dashboard would reach for a gauge, the bullet is strictly better: more information, more accurate encoding, more space-efficient. Recommend the swap whenever a gauge is requested.
- **Executive/operational dashboards** where the reader is scanning "where are we vs plan?" across many metrics — the bullet row/column is the canonical layout.

## Why the bullet beats the gauge

Few designed the bullet graph as an explicit replacement for the dashboard gauge, and every comparison favours it:

- **Encoding accuracy.** A gauge encodes via angle/area (low on the perceptual hierarchy); the bullet encodes via length from zero (highest on the hierarchy).
- **Space efficiency.** One gauge typically occupies a 200×200 tile; one bullet fits in a 300×30 strip. Ten KPIs in gauges = a wall of dials; ten KPIs in bullets = a scannable column.
- **Comparability.** Bullets stack along a shared baseline — the eye compares lengths trivially. Gauges, even stacked, share nothing visually; the reader must read each independently.
- **Information density.** A bullet shows actual + target + qualitative bands in one mark; a gauge typically shows only actual-vs-scale, with target and bands bolted on as extra ink.
- **Ink economy.** Gauges carry semicircular arcs, tick marks, needles, and bezels — almost all of which is non-data ink.

Recommend the bullet swap on every existing gauge; keep the gauge only when a specific visual convention (car-dashboard metaphor, branded look) genuinely requires it.

## When NOT to use

- There is no meaningful target or qualitative band — just a value. Use `single-value.md`; the bullet's machinery is wasted.
- The metric has no natural qualitative bands and inventing them would mislead — prefer `bar.md` with a target line, or `single-value.md` with a delta-to-target annotation.
- The reader needs to see the full trend, not just the current point — use `line.md`, optionally with a target reference line.
- Many-category ranking, not target-tracking — `bar.md` sorted descending.
- Only one or two indicators, and the page has plenty of space — a larger, explicit "Actual vs target" `combination.md` or a labelled `bar.md` may land more clearly for a non-dashboard audience.
- The audience has never seen a bullet chart and there is no legend — the form carries a small literacy tax; a first-time reader needs a one-line legend or callout the first time it appears.

## Rules

### Anatomy

A bullet has, from back to front:

1. **Qualitative background bands.** Typically three shades of grey (darker = worse), behind the bar, running the full length of the quantitative scale. The bands encode "bad / satisfactory / good" ranges — domain-defined thresholds, not arbitrary tertiles.
2. **Featured bar.** A single horizontal bar whose **length encodes actual value** from a zero baseline. Typically dark grey or the dashboard's primary accent colour.
3. **Target tick.** A short perpendicular line (a small vertical stroke, NOT a full-height line) crossing the bar at the target value. Darker and thinner than the bar; unambiguous, not decorative.
4. **Optional comparative tick.** A second tick for prior-period or forecast. Use sparingly; three marks on one bar is the limit before it becomes a puzzle.
5. **Label.** Metric name to the left (aligned with other bullets in the stack); current value and unit to the right of the bar, with target value in muted type.

### Encoding

- **Actual: length from zero.** This is position-on-common-scale, the most accurate channel. Zero baseline is non-negotiable — a bullet is a bar.
- **Target: position via a perpendicular tick, not a line across the plot.** A full vertical line visually competes with the bar; a short tick reads as a reference mark. The tick should extend slightly above and below the bar's height.
- **Qualitative bands: lightness, not hue.** Graduated greys (e.g., 15% / 25% / 40% black, or equivalent in your theme). Darker = worse, lighter = better is the Few convention. Do NOT use red/yellow/green — the bands are context, not alarm; the bar is the signal, and RGB bands dominate the eye, hide the bar, and fail for red/green colour-vision-impaired readers.
- **Three bands is standard.** Two if the metric is binary (pass/fail). Never more than four; beyond that the palette noise overwhelms the bar.

### Layout and comparability

- **Stack vertically, left-edge aligned.** Every bullet shares the same x=0 position on the tile, so the bars read like a horizontal-bar chart at a glance. The reader scans down and sees attainment across all metrics.
- **Consistent bar height** across the stack (typically 2–3× the tick height).
- **Consistent tick height and weight** — target ticks read as a family.
- **Scale per bullet, not shared.** Each metric has its own natural range (a revenue KPI, a latency KPI, a CSAT score) — the quantitative scale is per-row. This is a deliberate departure from small-multiples rules; the bullet's comparability is *relative to each metric's target*, not absolute magnitudes. Make this explicit by labelling each bullet's units on the right.
- **Compact.** Horizontal space per bullet is roughly 4–8× its height. Packing them dense is the whole point.

### Labelling

- **Metric name** left-aligned in a column to the left of the bullets, consistent typography across the stack.
- **Current value + unit** at the right end of the bar (or just past it), in body weight.
- **Target value** in muted type, usually in the form `vs $12M target` or `target: 87%`.
- **Unit annotation once per dashboard** where applicable; do not repeat `$` on every bullet if the whole column is dollars.
- **Band legend** in a small footnote or tooltip: "shaded bands: below plan / on plan / ahead" — required on first appearance for audience unfamiliar with the form.

### Honesty

- **Bands must reflect real thresholds** (plan, policy SLAs, historical percentiles), not arbitrary even-thirds of the scale. Inventing bands to make an actual look "green" is a Lie Factor violation.
- **Target must be a real, pre-set target** — not a number picked because "it looks like a reasonable tick". If there is no target, the bullet is the wrong form; use `bar.md`.
- **Zero baseline.** Even though a bullet's bar is small, it is still a length-encoded bar; baseline truncation distorts relative attainment.
- **Document the threshold source in a caption.** "Bands: plan, stretch, corporate top-quartile." Readers otherwise assume whatever they assume, and an unexplained "bad" band can look like blame.

### Orientation

- **Horizontal is the default.** Stacks densely, reads left-to-right, supports long metric names on the left. Vertical bullets exist but sacrifice label readability and vertical stacking density — use only when the dashboard layout specifically demands it.
- **Always horizontal when you have more than three bullets** in a group — the comparability benefit compounds only along a shared baseline.

### Inverted metrics (lower-is-better)

- **Churn, latency, defects, cost** — metrics where lower is better — still render as a bullet, but the band ordering flips: the "good" band is on the *left* (low end). Label the unit and direction explicitly in the metric name or a small caption ("lower is better") so the reader doesn't misread band semantics.
- **Never invert the x-axis** to make "good" appear on the right — silent distortion. Flip the bands, not the axis.
- **Target tick** still lives at the target value; the actual bar still starts at zero. The bar being *shorter than the target tick* is now the good outcome for inverted metrics.

## Simpler alternatives

The bullet is a specific composition; other chart types reproduce subsets of the three layers (actual bar + target tick + qualitative bands). In order of best approximation when bullet isn't the right fit:

- **`gauge.md`.** The bullet exists *because* the gauge wastes space and encodes via angle; recommending a gauge as an alternative is ironic but workable on an individual-KPI basis — a gauge renders an actual + target + bands story. When the user asks for "target vs actual with bands" and dashboards ship gauges already, a gauge answers, at the cost of space, angle-encoding, and the inability to stack many comparably. Warn: you are trading accuracy and density for familiarity.
- **`bar.md` with a reference line at the target.** Render one bar per metric (length = actual), add a reference line (or a distinct marker) at the target value, skip the qualitative bands. Loses the bad/ok/good context but keeps the strongest channel (length-from-zero) and remains honest. This is usually the best fallback when the user doesn't strictly need bands.
- **`single-value.md` with a delta-to-target annotation.** A headline number with `▲ 3.2pp above target` or `−$1.1M vs plan` gives the core story for one KPI; for many KPIs, a grid of such tiles approximates the bullet stack but drops the shaded bands and the at-a-glance bar length. Pair with a conditional colour of the delta (muted green / muted red) if bands matter.
- **`pivot-table.md` with columns `actual / target / variance`, heatmap-shaded on variance.** A denser, scan-friendly alternative for a reference-mode dashboard of many KPIs. Loses the horizontal-length encoding but gains precision and row-ordered comparability.

Where the bullet is a strict improvement (chiefly: replacing a gauge), recommend the swap explicitly. When the audience or space makes that too heavy, `bar.md` with a target reference line is the honest default.

## Anti-patterns

- **Red/yellow/green qualitative bands.** Dominates the bar visually, fails for red-green colour-blind readers, turns a precise chart into a mood-lit traffic light.
- **A full vertical line for the target** instead of a short tick — the line reads as a separator and visually halves the bar.
- **Bar fill saturated in colour** matching the bands — blends into the background; the bar must be the highest-contrast element.
- **Bands as arbitrary thirds of the scale** with no domain meaning — the reader interprets relative to real thresholds; fake bands fabricate a story.
- **Truncated zero baseline** — just as on any bar chart, distorts apparent attainment.
- **Legend-less bands on first appearance** — audience assumes traffic-light semantics, misreads.
- **Mixing bullet layout across the dashboard** — some with bands, some without; some with target ticks, some with lines — inconsistency undermines the scan-all-at-once benefit.
- **Stacking many bullets with different tick conventions or different band counts** — kills the comparability that justifies the form.
- **Using the gauge when a bullet is available** — once the tool supports bullets, there is essentially no case for the gauge.
- **Drawing the bar to the right edge of the bands at 100% attainment** — if the scale max is the target, at-target reads visually identical to far-ahead and the bullet has no headroom. Extend the scale past the target (e.g., to 120% or to the top band's upper limit) so overperformance is visible.
- **Tiny bullets crammed into a tight sidebar** — if the bars are shorter than 40–50 pixels, differences of a few percent are invisible; give the stack space or drop to `single-value.md` + delta.

## Worked examples

### KPI stack — exec dashboard

A column of six bullets stacked vertically in a sidebar:

```
Revenue          ████████████░░░░   $48.2M    target $52M
New MRR          ████████░░░░░░░    $0.82M    target $1.0M
Gross margin     ██████████████░    73.4%     target 70%
NPS              ████████░░░░░░░    42        target 50
Churn            ██████░░░░░░░░░    4.1%      target <3.5%  (inverted)
Pipeline cov     █████████████░░    3.1x      target 3.0x
```

Each bullet shares the left edge; three shades of grey band the background (bad / satisfactory / good); target ticks at the target value; current value and target labelled to the right. The reader scans down: three above target, three below, one inverted metric flagged by unit (churn: lower is better). No gauges, no traffic-light colour, one tile carries six stories.

### Single-KPI replacement for a gauge

A request for "a gauge showing SLA compliance against 99.9%" becomes a single horizontal bullet: actual 99.73% as the bar, target tick at 99.9%, three bands encoding the internal SLA policy (99.0 / 99.5 / 99.9 thresholds). Same information, more precise encoding (length vs angle), less real estate, and it composes with other bullets. This is the default replacement for any gauge request.

## See also

- [`gauge.md`](gauge.md) — the form the bullet replaces; recommend migration when bullet ships
- [`bar.md`](bar.md) — closest palette form; bullet's backbone
- [`single-value.md`](single-value.md) — when the qualitative context is a delta string, not bands
- [`../encode/color.md`](../encode/color.md) — why greyscale bands beat RGB
- [`../encode/visual-channels.md`](../encode/visual-channels.md) — length-from-zero vs angle; why the bullet beats the gauge
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — zero baseline, honest thresholds
- [`../dashboard/structure.md`](../dashboard/structure.md) — how bullets compose into a dashboard tile stack
