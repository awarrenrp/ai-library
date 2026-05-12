---
name: combination
description: Produce chart.geom (combination) — bars + line on shared axes, often dual-axis. Read the dual-axis warnings before using.
governs: chart.geom (combination)
consumes: dashboard.palette, dashboard.time-range
---

# Combination chart

A combination chart overlays two or more geoms — most commonly bars + a line — on a shared coordinate system. Used well, it places an actual-vs-target or volume-vs-rate story in one glance. Used poorly (and it often is), it invites the reader to perceive a correlation that the scales were tortured into showing. Treat dual-axis as a last resort, not a default.

## When to use (legitimate cases)

- **Same unit, same scale.** Two series share the same units (both in $, both in %): bars = actual, line = target; bars = this year, line = prior year; bars = revenue by month, line = rolling average. No second axis needed.
- **One series provides context and rigorous per-point comparison is not needed.** A volume bar with a smoothed line overlay to show the trend — the reader sees the shape, not the exact line value.
- **Waterfall-like decomposition** where bars show contributions and a line shows a cumulative path — same-unit overlay, no secondary axis.

## When NOT to use (and alternatives in the palette)

- **Two metrics with different units and no meaningful shared scale** (e.g., revenue in $M and conversion rate in %) → **split into two stacked plots sharing the x-axis**, each with its own y-axis on the left. This reads more honestly and loses nothing.
- **Two metrics with different causal direction or time-lag** that would spuriously appear to "track together" on a dual axis → split into separate charts; label each with its own story.
- **Three or more series with mixed geoms** — too much visual vocabulary for one chart; use small multiples or a dashboard of focused charts.
- You just want to "show everything" — pick the story and pick one chart.

## Rules

### Prefer same-unit overlays

- **If both series share a unit, there is no second axis.** Use a single y-axis and the correct geom per series (bars for discrete magnitudes, line for continuous or smoothed trend). This is the safe case.
- Actual-vs-target is the canonical example: bars for actual, a line for target, both in the same unit on the same scale.

### If a secondary axis is unavoidable

- **Label both axes explicitly and unambiguously.** Unit, scale direction, and the series that reads against each axis.
- **Match colour of each series to its axis** — bar colour matches its axis title colour; line colour matches its axis title colour. Do not rely on the reader to remember which is left vs right.
- **Pick scales so movements don't spuriously align.** Dual-axis charts are often tuned (consciously or not) to make two series "track" because the scales were squeezed to fit. Before shipping: rescale one axis and re-check whether the apparent correlation persists.
- **Never put two metrics with different causal direction on the same axes** without annotation that calls this out.
- Use a distinct geom for each series — bars for one, line for the other — so the reader's eye can at least parse which is which without the legend.
- **Consider the alternatives first, every time.** (a) don't show the second axis — label specific points directly; (b) pull charts apart vertically with separate y-axes both on the left, shared x-axis; (c) link axis to data via colour. Alternatives (a) and (b) are almost always better than dual-axis.

### Integrity checklist for combination charts

- Bars anchor at zero. This rule from `bar.md` still applies even when a line is overlaid — truncating the bar axis to "align" it with the line axis is a lie.
- Line axis range chosen honestly — same rules as `line.md` (no zoom that makes a 1% wiggle look like a crash).
- Consistent time intervals on the x-axis.
- Reference lines (target, benchmark) rendered distinct from data lines (dashed, muted).
- If the second axis is inverted or non-linear, it is loudly labelled.

### Colour and legend

- Two or three colours maximum across the whole chart.
- **Direct-label each series** at its right edge in the series' colour — legend becomes redundant.
- Mute any series that is context, not focus.

### Annotation

- Title should name both series explicitly ("Monthly revenue vs conversion rate") so the reader isn't surprised by the dual encoding.
- Annotate scale mismatch: if the left axis and right axis represent different orders of magnitude, say so.
- Label structural breaks on the shared x-axis.

## Anti-patterns

- **Secondary y-axis with no axis label** — reader has no idea what the line represents.
- **Bar heights and line heights misaligned due to scale mismatch** so the line "tracks" the bars spuriously — cherry-picked correlation.
- Dual-axis used because the dashboard tool makes it easy, not because the story requires it.
- Three or more series with mixed geoms and two axes — visually unparseable.
- Truncated bar baseline to "fit" the chart to the line's range.
- Identical colour on both series — reader cannot tell them apart against a shared axis.
- Using combination to "show everything at once" without a point.

## See also

- [`bar.md`](bar.md) — zero-baseline rule inherits
- [`line.md`](line.md) — trend rules inherit; also covers target/reference lines
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — does the question actually need two series on one chart?
- [`../dashboard/structure.md`](../dashboard/structure.md) — splitting two charts sharing an x-axis (preferred alternative to dual-axis)
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — dual-axis as an integrity risk
