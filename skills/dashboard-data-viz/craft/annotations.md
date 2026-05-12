---
name: annotations
description: Produce chart.annotation, chart.reference-line, and dashboard.annotation-style — callouts, reference lines, source notes, structural-break labels.
governs: chart.annotation, chart.reference-line, dashboard.annotation-style
---

# Annotations

An annotation is any mark on a chart that is not itself a data mark but is there to help the reader interpret the data correctly: a callout on an outlier, a vertical rule at a structural break, a target line, a source note at the foot of the chart. Good annotation is integrity work — it prevents misreading. Bad annotation is clutter dressed up as context.

## Annotation as integrity

The single most valuable annotation is the one that keeps the reader from inventing a lie the data does not tell.

- An axis labeled only as `Revenue` invites the reader to guess at units. Label it `Revenue ($M)` and the guess goes away.
- A line that rises sharply in March 2024 could be real growth — or could be the date you changed the measurement definition. A vertical rule marked `New methodology — April 2024` resolves that ambiguity up front.
- A pair of lines that look correlated over five years could actually be coincidence over a short observation window. A note saying `2019–2024, monthly, n=60` lets the reader calibrate.
- A chart of nominal dollars across a decade hides inflation. A footnote saying `Constant 2024 $` (or the correction itself) prevents the false conclusion.

The second integrity principle — *clear, detailed, and thorough labeling should be used to defeat graphical distortion and ambiguity* — is annotation as a practice. Write explanations on the graphic itself rather than relying on the reader to remember context.

## What to annotate

Not everything deserves an annotation. The rough categories of "yes, annotate" are:

### Outliers and inflection points

- **Outliers** that would distort the reader's mental model if they assumed them normal. Call them out with a short label: "One-time restatement of 2022 Q3 revenue."
- **Inflection points** — the moment where a trend changed direction. On a conversion-rate line that rose then fell, label the peak: "Peak after pricing change, Jun 2024."
- **Records** that anchor the story — the all-time high, the all-time low, a crossing point where two lines exchanged rank.

Scope: label only the inflection points that support the chart's argument. Labeling every local extremum reintroduces clutter.

### Structural breaks

A structural break is any point where the data-generating process changed. These are the most common source of misreading and the ones most often left un-annotated.

- **Methodology change** — you changed a definition, a query, or a source system.
- **Organizational change** — merger, acquisition, spin-off, re-segmentation.
- **Product change** — a new product launched, an old one was deprecated, pricing changed.
- **External event** — a regulatory change, a pandemic, a platform outage, a data pipeline failure that truncated a period.
- **Unit change** — switched from orders to revenue, from monthly to quarterly, from GAAP to non-GAAP.

Render each as a **vertical reference line** (light gray, dashed, thin) at the x-position of the break, with a short text label at the top.

### The "big idea" on the chart itself

If the chart is supporting a specific conclusion, state that conclusion *on the chart*. This is annotation as primary emphasis, not as context.

- Pattern: a callout box near the relevant data, with a short sentence, connected by a thin leader line if the anchor is ambiguous.
- Use sparingly — typically one big-idea annotation per chart, paired with an action title that makes the same point (see [`typography-and-labels.md`](typography-and-labels.md)).
- The annotation *is* the takeaway when it's on the chart; when it's in the title, the chart doesn't need the callout. Pick one to avoid redundant emphasis.

### Confidence, uncertainty, ranges

- **Confidence bands** around a forecast line or a regression.
- **Shaded ranges** for min-max, p25-p75, or target bands.
- **Error bars** on summary points.

Uncertainty is data-ink, not decoration — it encodes something the reader needs to reason correctly. Always include a short legend or inline label explaining the band: "Shaded: 80% confidence", "Range: p10–p90."

### Target and reference lines

- **Target line** — where the metric is supposed to land.
- **Prior-period reference line** — last year's value at the same point.
- **Forecast line** — rendered differently (dashed, lighter) from actuals, with a clearly labeled transition point.
- **Average / median line** — baseline for variation.
- **Zero line** — required when the metric can be negative.
- **Natural-threshold line** — required whenever the scale has a meaningful inherent value the reader is implicitly comparing against: `1.0` on compa-ratio / index / ratio scales (paid-at-midpoint, indexed-to-baseline), `100%` on completion / attainment / utilization, `1:1` parity on scatter where x and y are commensurable, capacity ceilings, SLA floors. Without the line the reader has to mentally compute "above or below the meaningful value?" on every glance, and small multiples make it worse — the eye cannot carry a precise position memory across panels, so the comparison degrades to "kinda left, kinda right." A single shared dashed rule restores it.

All should be **lighter or more muted** than the data they contextualize, and **labeled directly** (not in a legend) with their value and meaning: `Target: 95%`, `Prior year avg`, `Forecast →`. Natural-threshold lines often need no label at all when the axis already shows the value (the dashed rule at `1.0` on a compa axis tick-marked `1.0` is self-explanatory) — labels add clutter without adding information. Label only when the threshold's meaning isn't obvious from context (`midpoint`, `parity`, `SLA`).

The underlying principle: a reference line is integrity work whenever it prevents the reader from inventing a comparison the chart doesn't render. Structural-break lines do this for time; natural-threshold lines do it for value. Both are about removing reader effort, not about decoration.

### Source, date, and metadata

Every shipped chart should carry minimum metadata:

- **Data source** — which system or dataset the data came from.
- **Date range** — the observation window.
- **Last updated** — when the underlying data was last refreshed.
- **Definitions** — inline for any metric whose meaning is non-obvious ("Conversion = trial → paid within 30 days").

These live in a muted footer, typically light gray, small type, below the chart. They are not chart decoration — they are the chain-of-custody that lets the reader trust the chart.

### Axis and scale qualifiers

- `log scale`, `indexed to Jan 2024 = 100`, `YoY %`, `per 1,000 customers`, `seasonally adjusted`, `excludes enterprise` — any transformation or filter that is not self-evident from the data marks themselves needs a short annotation, either on the axis title or in a footnote.

## Placement and styling

The rendering rule for annotations is simple: *annotations should disappear until the reader needs them*.

- **Near the data.** Place an annotation next to the point it describes, not off in a margin. Proximity tells the reader which mark the annotation refers to, usually without a leader line.
- **Muted by default.** Light gray or medium gray, thin lines, small text. The annotation should read as subordinate to the data.
- **Bold and saturated only when the annotation IS the takeaway.** A "big idea" callout on an explanatory chart can be bold and dark — but that's the exception, not the rule, and pairs with the rest of the chart being correspondingly muted. See [`emphasis.md`](emphasis.md) for the underlying logic: contrast is finite.
- **Dashed or dotted lines for reference levels** (targets, forecasts, prior periods). Solid lines for data, dashed for reference — this visual convention is near-universal and reinforces the data/reference distinction.
- **Use enclosure (light shaded bands) rather than heavy boxes** to denote a region (e.g., a forecast period, a recession, a focus window). Enclosure via shading is lower-weight than a border and reads immediately as a grouped region.
- **Leader lines only when necessary.** If the annotation sits adjacent to the anchor, no leader is needed. Leader lines should be thin, gray, and as short as possible.
- **Short text.** Annotations are notes, not paragraphs. Aim for 3–8 words per callout. Detail belongs in the footer or the accompanying document.
- **Horizontal label text, always.** Annotation labels on vertical reference lines are horizontal by default. Rotated (bottom-to-top) text costs the reader head-tilt for no gain and breaks the reading direction of every other label on the chart. If horizontal space is tight, shorten the label (`Claude Code rollout` → `CC rollout` → `Rollout`), move the label above the plot area with a thin leader down to the reference line, or use a compact callout — never rotate. Library defaults that rotate `markLine`-style labels (ECharts especially) must be overridden. Generalizes the "never rotate text under vertical bars — flip the chart instead" rule from [`../charts/bar.md`](../charts/bar.md) to any annotation text.
- **Reference-line labels sit in the axis margin, not inside the plot area — and the chart frame must be sized to contain the margin.** A reference line (mean, median, target, SLA, budget) crosses the plotted data **by construction** — the reference value lives inside the data range, so *some* data mark almost always sits exactly at the line. A label dropped inside the plot at the line's endpoint (ECharts `markLine` defaults to `label.position: 'insideEndTop'`; Plotly's `add_hline`/`add_vline` anchor inside the axes; D3 requires manual placement but examples often put labels *inside* the plot) overdraws — or is overdrawn by — the data mark at that position. Label and data both go illegible. **Place the label in the axis margin outside the data region**, on whichever side "outside" is: horizontal line → top or bottom margin; vertical line → left or right margin. Reserve extra chart margin on that side (ECharts `grid.top`/`grid.right`/etc.; Plotly `margin.t`/`margin.r`; D3 manual), and confirm the chart's SVG viewBox and any tile `overflow: hidden` include the reserved space — a label correctly positioned "in the margin" that escapes the viewBox is still clipped by the container. If multiple reference lines share a direction (target *and* mean on the same axis), stack the labels in the margin with small offsets so they don't collide with each other either. Generalizes the horizontal-text rule above: the label belongs *outside* the plotted marks, whatever direction that is, and the frame must be large enough to hold it.

  This rule extends past reference lines to every label whose home is outside the plot rectangle: end-of-bar data labels (the value axis must extend past the data max so `5.2 pp` doesn't overflow the plot edge), long y-axis category names on horizontal bars (reserve left margin or truncate with tooltip), endpoint labels at the right of line charts, callouts near a plot edge. Same failure mode, same remedy — reserve margin on the outside side and include it in the viewBox. See [`typography-and-labels.md`](typography-and-labels.md) for the non-reference-line cases.

  Concrete failure to pattern-match against: a box plot of *merit % by rating* with a horizontal `company median 4.0%` reference line. The Outstanding box's Q1–Q3 typically straddles the 4% line — an `insideEndTop` label lands directly on the Outstanding box, illegible in both directions. Remedy: grid right-margin reserved (e.g., ~40–60 px extra), `markLine.label.position: 'end'` with `padding` or explicit pixel `distance` pushing the label past the last box into the reserved margin. Same failure family shows up on bar charts with a horizontal target line (the tallest bar is the one the target line crosses — exactly where the default label lands), on line charts with a YoY reference (the focal series is the one at the reference value), and on horizontal-bar charts with a *vertical* `Target ≥ 3 pp` reference line whose top-anchored label is clipped by the tile's top edge because `grid.top` wasn't expanded to hold it.

  **Every chart recipe that renders a reference line or any other outside-plot label must declare `consumes: craft/annotations.md (Reference-line label placement)`** so the generator pulls this rule in at render time rather than re-deciding per chart with the library default. Recipes that commonly carry such labels: [`../charts/bar.md`](../charts/bar.md), [`../charts/line.md`](../charts/line.md), [`../charts/box-plot.md`](../charts/box-plot.md), [`../charts/scatter.md`](../charts/scatter.md), [`../charts/combination.md`](../charts/combination.md), [`../charts/bullet.md`](../charts/bullet.md).
- **Consistent annotation style** across the dashboard. All reference lines the same color and weight; all callouts the same typeface and size.

## Avoid visual weight that competes with data

The failure mode is annotation that out-shouts the data itself:

- A dark bold `Target: 95%` label in 14pt that dominates a plot of actual data at 10pt and medium-gray.
- A thick red dashed vertical line marking a break, with the actual data in thin light blue behind it — the reader reads the line as the headline.
- Five callouts on five points, each at full saturation with a leader line — the chart now has ten visual emphases and no focal point.

Tests:

1. Squint at the chart. The *data* should still be the loudest thing. If the annotations win the squint test, push them back.
2. Remove the annotations mentally. Does the chart still read? Good — the annotations are supporting, not carrying.
3. If the chart can't read without the annotation, the annotation has become a data mark in disguise. Redesign so the data itself carries the point.

## When NOT to annotate

Annotation has costs. Skip it when:

- **Reference or ops dashboards** where annotations would be noise. A monitoring view refreshed every 15 minutes should not have hand-crafted "note the spike at 14:05" callouts on a live chart — those make sense in post-incident writeups, not in the live view.
- **Exploratory dashboards** where the reader is forming their own conclusions. Pre-emptive annotation biases the analysis and overrides the reader's investigation. Use tooltips for on-demand detail instead.
- **Charts that will be reused** in multiple contexts with different framings — hardcoded annotations that say "this is the problem" constrain the chart to a single narrative.
- **Small-multiple grids** where per-panel annotations would clutter each panel and obscure the cross-panel comparison. If an annotation is needed on one panel, consider a separate highlighted chart below the grid instead.
- **When the title already carries the point.** An action title plus a big-idea callout plus a highlighted bar is redundant — pick one or two (see the emphasis budget in [`emphasis.md`](emphasis.md)).

## Pairing annotations with action titles

Annotations and action titles share a job: they tell the reader what the chart is saying. The combination rule:

- **Action title** states the big idea in one sentence. Top-left, bold.
- **Callout annotation** localizes the big idea to the specific mark on the chart. Next to the data, medium weight.
- **Together**, they create the 3-second read: the title sets the conclusion; the callout anchors the conclusion to the visual proof.

A common pattern: title says `Paid search conversion dropped 30% in Q3`, and a callout next to the relevant point on the line chart reads `-30% vs Q2` with a light arrow to the data point. The reader's eye lands on the title, scans to the callout, verifies on the line, done. No legend, no hunting.

If the title is descriptive (exploratory or reference mode), the callout does more work — or there is no callout at all, and the reader interprets the data on their own.

## Rendering checklist

- [ ] **Source, date range, last updated** in a muted footer on every shipped chart.
- [ ] **Units and scale qualifiers** (log, indexed, YoY, real vs nominal) on axis titles or in a note.
- [ ] **Structural breaks** marked with a thin vertical reference line and a short label.
- [ ] **Reference lines** (target, prior period, forecast, average) rendered dashed and muted, labeled directly, never in a legend.
- [ ] **Natural-threshold lines** rendered whenever the scale has a meaningful inherent value (ratio `1.0`, parity `1:1`, completion `100%`, capacity, SLA); shared across small multiples on the same scale.
- [ ] **Confidence / range bands** rendered as light shading with an inline legend ("Shaded: 80% CI").
- [ ] **Outlier / inflection annotations** only where they support the chart's argument; short text (3–8 words); placed next to the anchor.
- [ ] **Forecast / actual transition** clearly marked — solid for actuals, dashed for forecast, with a vertical rule at the boundary.
- [ ] **Annotation style consistent** across the dashboard.
- [ ] **Annotations muted** unless the annotation is itself the focal point.
- [ ] **Squint test passed** — data still wins against the annotation layer.

## Anti-patterns

- **Ship-and-pray with no source line.** Every chart shipped without `Source: X, as of Y` erodes institutional trust in the dashboard.
- **A forest of callouts.** Five labeled outliers, three arrows, two shaded bands, a target line, a forecast line, and a prior-year line all at the same visual weight. The reader sees noise and reads nothing.
- **Heavy red vertical rules** for every product launch in a five-year product history. Use one or two meaningful breaks; summarize the rest in a footnote if the reader needs them.
- **Annotations on a live/ops view.** The view auto-refreshes, the annotations go stale, and "note spike at 14:05" from yesterday sits on today's data.
- **Unit ambiguity.** A chart titled `Performance` with a y-axis titled `Score` and no annotation about what "score" means. The chart is unreadable in the original sense — the reader cannot verify anything.
- **Pre-emptive annotations on an exploratory dashboard.** Labeling the "correct" reading of every chart removes the reader's own reasoning and usually biases the investigation.
- **Callouts that compete with the title.** If the title asserts the big idea and a callout asserts the same big idea in bold, one of them is redundant emphasis.
- **Rotated labels on vertical reference lines.** A library default that prints the break label bottom-to-top along the rule. Override with a horizontal label above the plot; shorten or relocate if space is tight.
- **Label clipped by the chart frame, or drawn inside the plot interior.** Two shapes of the same failure. (a) Library defaults (`insideEndTop` and siblings) drop a reference-line label exactly at the reference-value position, which is where data marks already are — the reference value is inside the data range by construction, so label and data overdraw each other. (b) A label correctly positioned "in the margin" escapes the chart's SVG viewBox or a tile's `overflow: hidden` because no margin was reserved for it — the label is clipped even though the placement logic was right. Override both: place the label outside the data region, reserve frame margin on that side, and verify the chart container includes the reserved space. Extends to end-of-bar data labels, long y-axis categories, and endpoint labels — any label whose home is outside the plot.

## See also

- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — annotation-as-integrity, structural breaks, labeled transformations
- [`typography-and-labels.md`](typography-and-labels.md) — the action-title pattern that annotations pair with
- [`emphasis.md`](emphasis.md) — callouts as emphasis; the finite-contrast budget
- [`clutter-and-data-ink.md`](clutter-and-data-ink.md) — annotation as context, not decoration
- [`../dashboard/audience-purpose.md`](../dashboard/audience-purpose.md) — when annotation is appropriate (explanatory) vs. when it isn't (exploratory, ops)
