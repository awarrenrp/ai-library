---
name: chart-histogram
description: Produce chart.geom (histogram) — shape of a single continuous distribution (skew, modality, gaps, outliers).
governs: chart.geom (histogram)
---

# Histogram

A histogram displays the distribution of a single continuous variable by dividing the range into contiguous bins and drawing a bar per bin whose height encodes the count (or density) of observations in that bin. It is the primary chart for answering "what does the distribution of X look like?".

In the grammar, a histogram is not a primitive but a composition: `stat=bin + geom=bar`. Swap the geom to `line` and you get a **frequency polygon** — same stat, different visual representation of the same bin counts. Swap to `geom=point` at the bin centers and you get a dot plot of the bin counts. All three are the same chart "underneath".

## When to use

- **The question is about shape.** "How skewed is this?" "Are there two clusters?" "Where does the tail start?" "Is there a gap around zero?" Shape is what a histogram shows best.
- **A single continuous variable** with enough observations that bin counts are meaningful (≥50 is a rough minimum; ≥500 lets you use finer bins).
- **Detecting modality.** Bimodal distributions (e.g., two customer segments hidden inside a single "response time" column) only show up in a distribution view. A mean and a median will not reveal them.
- **Detecting skew and outliers.** A long right tail implies median ≠ mean, and a chart of averages will mislead. The histogram exposes this at a glance.
- **Comparing a few distributions.** Overlay 2–3 frequency polygons (line version) on the same axes, or facet the histograms as small multiples.
- **As a diagnostic companion** to a bar chart of aggregates. "The average is $85 but the median is $40 because the distribution is right-skewed with a few large orders" — the histogram proves the point.

## When NOT to use

- **Categorical data.** If the variable is categories (product, region, channel), that's a bar chart, not a histogram. The continuous-vs-categorical distinction drives the choice.
- **Small N (< ~30 observations).** Any binning is noise-dominated. Use a strip plot / dot plot of the raw points, or report summary statistics.
- **When precise rank of each observation matters.** Histograms lose individual identity by construction. Use a sorted bar or a table.
- **Comparing many distributions on one axis.** Three or more overlapping histograms read as visual mud. Facet instead.
- **When the audience expects a "bar chart."** Histograms look like bar charts but read differently (bins are continuous, bars touch). Misreading is common — label the x-axis clearly as a continuous scale.

## Rules

### Bin width matters enormously

The single most consequential parameter. Two plots of the same data with different bin widths can tell opposite stories.

- **Too wide → hides structure.** A bimodal distribution collapses into one lump; a gap disappears.
- **Too narrow → shows noise.** Every bar oscillates with sampling variance; the signal is buried.
- **Default rules of thumb:** Scott's rule (`3.5 · σ · n^(-1/3)`), Freedman–Diaconis (`2 · IQR · n^(-1/3)`), or Sturges (`log2(n) + 1` bins). Pick one, state it in the annotation or let the tool defaults apply, but *try at least two bin widths* before shipping. If the shape is stable under both, the chart is honest.
- **Round the bin edges to human-readable values.** Bins of [0, 10), [10, 20), [20, 30) beat bins of [0, 9.7143), [9.7143, 19.4286), … every time. Rounded edges help the reader interpret the x-axis.
- **Equal-width bins by default.** Variable-width bins (e.g., log-scale bins) are valid but need the y-axis to be density, not count, or the visual encoding lies about the distribution.

### Axes

- **x-axis:** the binned continuous variable. Label with units and make it clear this is a continuous scale (`Response time (ms)`, not `Bin 1, Bin 2, …`).
- **y-axis:** frequency (count) or density. Density is preferred when bin widths are unequal or when comparing distributions with different N.
- **y-axis must start at zero.** A histogram's bars encode magnitude via length; the zero-baseline rule applies exactly as it does for a bar chart.
- **x-axis zero is not required.** The distribution may live entirely between, say, 100 and 500 — starting the axis at 0 wastes most of the plot.

### Bars touch — it's a histogram, not a bar chart

The defining visual cue that separates a histogram from a bar chart. Adjacent bars share edges with zero gap between them. This communicates continuity of the underlying variable. **Gaps between bars imply a categorical x-axis**, which is the opposite of what a histogram says about the data.

If your rendering tool forces gaps between bars, the chart is visually a bar chart, not a histogram — and the reader may misinterpret. See the *Simpler alternatives* section.

### Frequency polygon — the line geom variant

Overlay or substitute a **frequency polygon** (`stat=bin + geom=line`) when comparing distributions. A line per group reads more cleanly than overlapping bars. Keep the bins identical across groups for fair comparison.

### Annotation

- **Mark the mean, median, or a target** with a vertical reference line when it carries the chart's point.
- **Call out the tail.** If an outlier cluster lives at x > 1000 and the main mass is at x < 100, consider a log x-scale (labeled) or a cutoff with an explicit "+N observations beyond this range" annotation.
- **N, data source, time range** belong in the footer — a histogram from 30 points tells a different story than the same histogram from 30,000.

### Log scales for skewed data

When the data spans multiple orders of magnitude, apply a **log scale to x** (not log-transformed data; the scale is the right place). Label the axis `log scale` — logarithmic ticks are not self-evident. Frequency on y stays linear.

## Simpler alternatives

When a histogram isn't available or is too unfamiliar to the audience, alternatives in priority order:

1. **Pre-bin the data client-side and render as `bar`.** Compute bin edges, count observations per bin, label each bar with its bin range (`"0–10"`, `"10–20"`, …), and render as a `bar` chart. This is functionally a histogram with one catch: the tool will likely draw gaps between bars. Make the gap as narrow as possible; add a note in the title that the x-axis is continuous. This is the closest practical substitute.
2. **`line` across bin centers (frequency polygon style).** If your bar chart can't hide gaps and the gappy look is too misleading, compute bin counts and render as a `line` chart with the x-axis as bin midpoint. You lose the "histogram look" but preserve shape fidelity.
3. **`pivot-table` of bin → count.** A reference table of "bin, count, %" is honest and precise. Combine with one of the two above if the audience wants both lookup and shape.
4. **`single-value`s for mean / median / p95 / p99** as a lightweight summary when the full distribution isn't the point — but note that this hides multimodality and skew by construction. Only acceptable when shape is known to be well-behaved.

None of these are an ideal substitute. When the question is about distribution shape, use the real histogram.

## Anti-patterns

- **Visible gaps between bars for a histogram.** Reads as a categorical bar chart; audience will miscount or miscompare.
- **Bin width chosen to flatter the conclusion.** Picking a bin width that hides a second mode, or one that manufactures a "trend" from noise, is a lie-factor violation by another name.
- **Non-zero y-axis baseline.** A histogram bar encodes count by length; truncating the axis exaggerates differences.
- **Stacking histograms of different groups as a single stacked bar at each bin.** Only the bottom group has a consistent baseline; the upper groups' shapes are unreadable. Use small multiples or overlaid frequency polygons.
- **Rendering a pie / donut / sunburst of binned values.** Distributions are inherently ordered on the continuous axis; angle/area encoding destroys that order.
- **3D histogram.** Integrity violation; obscures counts.
- **Using a histogram to compare means across groups.** The histogram is for shape; comparing means is `horizontal-bar` territory.

## See also

- [`box-plot.md`](box-plot.md) — comparing many distributions where shape detail matters less than medians and ranges
- [`../00-mental-model.md`](../00-mental-model.md) — the grammar decomposition (`stat=bin + geom=bar`) that lets you reason about frequency polygons as a geom swap
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — zero y-baseline for length-encoded bars; log-scale labeling
- [`../choose-chart/by-question.md`](../choose-chart/by-question.md) — "Distribution" question and its fallback mappings
- [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md) — log scales and their labeling (when added)
