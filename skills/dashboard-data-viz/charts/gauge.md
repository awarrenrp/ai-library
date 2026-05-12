---
name: gauge
description: Produce chart.geom (gauge) — single value against a range on a dial. Angle encoding pays an accuracy tax; prefer single-value + delta.
governs: chart.geom (gauge)
consumes: dashboard.palette
---

# Gauge

A gauge encodes a single value as an angle against a circular or semi-circular arc, often with colored bands marking good/warning/critical zones. It is the automotive-dashboard idiom borrowed into business intelligence. Angle is near the bottom of the perceptual hierarchy (position > length > angle > area), so a gauge is strictly worse for precision than a bar against a target line, a bullet chart, or a single-value card with a delta. What the gauge has going for it is idiom recognition — in ops and real-time monitoring contexts, an audience conditioned on car dashboards and network-operations centers reads "dial with a needle" as "current status of a thing with a known good range" instantly. That affordance has real value, and when it's the right call, this recipe renders it well.

## When to use

A gauge is acceptable when **all** of these hold:

- There is **a single KPI** to display — CPU utilization, pipeline coverage, response-time SLA, current temperature.
- The KPI has a **clearly defined target** (or a zero-to-max range) that the audience already understands. A gauge without a known good-range is a circle of nothing.
- The **band semantics are meaningful**: "0–70% is fine, 70–90% is warning, 90–100% is critical," and those bands are consistent with how the business actually treats the metric.
- The audience **expects the dial idiom**. Ops teams, NOC dashboards, real-time monitoring displays — places where "is it green?" is the actual question.
- **Rough magnitude is enough.** The reader will glance and react, not read a precise value off the dial.

## When NOT to use (and alternatives in the palette)

- **Precision reading required.** Angle resolution is poor; a reader cannot tell 72% from 78% on a gauge the way they can tell two bar lengths apart. Use **`single-value`** with a numeric delta to target.
- **Change over time.** A gauge is a snapshot. Use **`line`** (trend) or a **`single-value`** with a delta-vs-prior-period annotation.
- **Comparing multiple entities.** Six gauges side-by-side force the reader to compare six separate arc systems with six separate angle anchors — low precision, high visual complexity. Use **`horizontal-bar`** with a reference line for the target, or a bullet chart which is strictly better for target-vs-actual-vs-bands across entities.
- **Multiple KPIs on one gauge.** Stacking two needles, two bands, or two scales on a single gauge creates a puzzle that only the designer can read. Use separate single-values or separate small charts.
- **No meaningful target or band.** If the metric doesn't have a "good" range — it's just "higher is better" or "lower is better" without a threshold — use a `single-value` with a delta-vs-prior or delta-vs-peer.
- **Metric can exceed the max** (e.g., pipeline coverage can be 140% of quota). Gauges bound at a max visually clamp the value and hide overshoot. Use a bar or single-value.

## Rules (how to render a gauge well when you do ship one)

### Structural

- **Semi-circular (half-moon) is preferred** over full-circle dials for most business metrics. The half-moon has a clearer "empty left → full right" reading and fits a dashboard card better. Full circles should be reserved for metrics that are truly circular in nature (e.g., compass, clock) — which is rare in business data.
- **Show the target explicitly.** Draw a tick mark or a small needle at the target value on the arc, and label it (`target: 85%`). Without a target mark, the gauge's "good/warning/bad" bands become the target by implication, which hides the actual number.
- **Show the current value in text**, large, inside or below the arc. Do not rely on the needle position alone. This is the single most important rule for gauge honesty — the number itself defeats the angle-reading weakness. A gauge without its numeric label is a gauge pretending to be a chart.
- **Show the scale endpoints** (min and max) at the ends of the arc with labels (`0` and `100%`, or `0` and `$5M`). Without endpoints, the reader can't calibrate the needle.
- **No 3D, no bevel, no metallic-knob chrome.** Integrity and clutter violations.
- **Needle, not pointer-arrow with shadow.** A thin line from the arc center to the current value. Drop shadows and 3D bevels are duck-chart territory.

### Bands

- **Limit to 3 bands** — good / warning / critical. More bands, and the reader cannot remember what each color means; fewer, and the dial is just a gauge without affordance.
- **Band thresholds must be meaningful** — set by business/ops definition, not arbitrary thirds of the range. If your ops team pages on >85%, the critical band starts at 85%, not at 66%.
- **Consistent band semantics across all gauges on a dashboard.** Green is always good, red is always critical, on every gauge. If one gauge has green = high (CPU headroom) and another has green = low (error rate), the reader loses the pre-attentive read. Invert the metric instead (render `1 - error_rate` as "success rate") so green means the same thing everywhere.
- **Colorblind-safe.** Do not rely on red/green alone — add a band label, a saturation/lightness difference, or a small glyph (`⚠`) to reinforce. A common upgrade: blue (good) / amber (warning) / red (critical) avoids red-green confusion.
- **Muted fills**, not saturated. The needle and the current value should be the loudest things on the gauge; the bands are context.

### Labels

- **Direct-label the current value** in the center or below the arc, at body-text-plus size, bold. This is the primary read.
- **Direct-label the target.** `target: 85%` near the target tick.
- **Unit symbol** with the value (`%`, `$M`, `ms`). Never leave the reader guessing units.
- **Delta annotation** below the value, in smaller text: `+3.2 vs. last hour`, `-12% vs. target`. The delta is often the real story the reader wants.
- **No legend for the bands** — label each band directly at its arc position, or rely on consistent semantics (`good / warning / critical`) called out once on the dashboard.

### Size and layout

- Minimum render size ~200 px wide for a half-moon gauge. Smaller, and the numeric label and target mark don't fit.
- A gauge is not a dashboard hero. It's a status light with a number. Put the ops-status gauges in a compact row near the top, not each taking a full quadrant.
- If three gauges are intended side-by-side, ask whether a `horizontal-bar` with target lines and the same three metrics would be clearer. Often yes.

## Palette alternatives to suggest

When flexibility exists, the gauge almost always has a better sibling:

- **`single-value` with delta-to-target.** Same information, faster read, no angle tax. `82% of target ↑ +3 pts` in 100×60 px is cleaner than the same data in a 240×160 dial. Use this by default unless the dial idiom is required.
- **`horizontal-bar` with a target reference line.** One bar for the current value, a vertical dashed line at the target, band-colored background shading behind the bar for the good/warning/critical zones. This is essentially a poor man's bullet chart and it reads precisely because the bar uses position-on-a-common-scale.
- **Bullet chart.** The literature-preferred target-vs-actual-vs-bands form, invented specifically to replace gauges with a precision-friendly alternative. Strictly better than a gauge for the same job. See [`bullet.md`](bullet.md).
- **`line` with a horizontal target reference line.** When trend matters more than current snapshot.
- **`combination` (bar for actual, line for target) across time** when both trend and target are needed.

Phrasing: "This can ship as a gauge. If the audience will actually want to read the precise value or compare to a prior reading, a single-value card with a delta-to-target annotation is more readable — want me to render that instead?" If the user insists on the dial, render it well.

## Anti-patterns

- **Gauge with no numeric label.** The reader has to estimate a needle angle. This is the failure the numeric label exists to prevent.
- **3D metallic-knob gauge** with bevels, drop shadows, and perspective. Chartjunk in its purest form.
- **Rainbow banding** with 5+ colored zones. Exceeds working memory; each band becomes noise.
- **Inconsistent band semantics** across a dashboard (green = good on one gauge, green = low on another). Breaks pre-attentive reading.
- **A wall of gauges** (4+ side-by-side) trying to cover a multi-KPI dashboard. Each one is a separate angle system; the reader cannot scan them. Use a single-value grid or a bar chart with target lines.
- **Gauge for a metric without a target or band.** "Current MRR" on a gauge is nonsensical — there's no good/bad range for a monotonically-growing metric. Use `single-value` with delta-vs-prior.
- **Gauge for a metric that can exceed max.** Clamping `140% of quota` at 100% on the arc misrepresents the data.
- **Gauge for a trend.** Use `line`.
- **Band thresholds that drift** — "good" today is what "warning" was last quarter, quietly re-baselined. If thresholds change, label the change and the reason.
- **Gauge animating smoothly between updates** in a way that implies intermediate values were measured. Step transitions are more honest when the underlying metric is sampled.

## Common failures to catch

- Band thresholds at arbitrary round numbers (0–33 / 33–66 / 66–100) instead of at business-defined thresholds.
- Target line visible but target number not labeled — reader can see "there's a target here" but not what it is.
- Current value label far from the arc, disconnected from the dial visually.
- Color bands saturated louder than the needle, so the reader's eye lands on the bands instead of on the current position.
- Gauge used where the metric is a cumulative sum (MTD revenue) — those grow monotonically; the dial reads "nearly empty" all month and "nearly full" only at month-end, which is a lie about progress relative to expected pace. Use a `line` with a pace reference, or a bullet chart.
- Six gauges on a dashboard using six different color conventions.

## Worked example

Request: "Show the current p95 API latency against our SLA on the live ops dashboard." SLA target: 200 ms. Current: 147 ms. Band semantics: <180 ms good, 180–220 ms warning, >220 ms critical.

- Single KPI, clear target, meaningful bands, audience is ops. **Gauge is acceptable.**
- Render a semi-circular gauge, 240 px wide, scale 0–400 ms (2× target to give headroom for the critical band).
- Three bands: 0–180 (muted blue), 180–220 (amber), 220–400 (red). Amber/red avoids red-green confusion.
- Needle at 147 ms. Target tick at 200 ms with inline label `SLA 200ms`.
- Large numeric label below the arc: `147 ms`. Smaller delta underneath: `↓ 12 ms vs. last hour · within SLA`.
- Scale endpoint labels at the arc ends: `0` and `400 ms`.
- No 3D, no bevel. Thin needle. Flat band fills.
- Next to this gauge on the ops dashboard, three more gauges (error rate, queue depth, saturation) using the same blue/amber/red band semantics so "blue = healthy" is the consistent pre-attentive read across the row.

Counter-example: same request, but the user actually wants p95 latency trend over the last 24 hours with the SLA marked. That's a `line` with a horizontal reference line at 200 ms — not a gauge. A gauge shows the current moment; the line shows whether latency is drifting toward the SLA.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — proportional encoding; why 3D gauges lie
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — target-vs-actual routing
- [`../encode/color.md`](../encode/color.md) — band color conventions; colorblind safety
- [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) — duck charts; the metallic-knob anti-pattern
- [`single-value.md`](single-value.md) — the preferred alternative for a single KPI with a target
- [`bar.md`](bar.md) — bar-with-target-line as a bullet chart proxy
- `bullet.md` — the literature-preferred replacement for the gauge
