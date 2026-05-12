---
name: clutter-and-data-ink
description: Produce chart.ink — data-ink ratio, chartjunk, Gestalt decluttering. Scope: inside a single chart; for dashboard composition see dashboard/chrome.md.
governs: chart.ink
---

# Clutter and data-ink

Every pixel on a chart competes for the viewer's attention. The decluttering job is not to make the chart look minimal — it is to make the data itself the loudest thing on the canvas. Apply this skill continuously, not as a final polish.

**Scope: this skill governs the inside of individual charts.** Data-ink / non-data-ink is a chart-level distinction — it's meaningful because each mark inside a chart either encodes a value or doesn't. It is *not* the right framework for dashboard-level composition. A dashboard's tile separators, section headers, compact filter bars, subtle group shading, page title, footer — none of those encode data, but they aren't "non-data ink to erase." They are structural scaffolding evaluated by whether they aid navigation, grouping, and hierarchy. For those rules see [`../dashboard/chrome.md`](../dashboard/chrome.md) (decoration, whitespace, density) and [`../dashboard/structure.md`](../dashboard/structure.md) (grid, tile, alignment). Importing chart-level decluttering vocabulary into dashboard design produces either a stripped-down pile of charts (no scaffolding) or a dashboard full of borders (scaffolding misread as chart framing). Keep the two scopes separate.

## The data-ink ratio

Formal definition:

```
Data-ink ratio = data-ink / total ink used to print the graphic
                = 1.0 - (proportion of the graphic that can be erased
                         without loss of data-information)
```

- **Data-ink** is the non-erasable core — ink that changes in response to data variation. Bar heights, point positions, the line itself, value labels.
- **Non-data-ink** is everything else: borders, gridlines, frames, tick marks, decorative fills, drop shadows, 3D effects, background textures.
- **Redundant data-ink** is data-ink that encodes the same value twice. A bar that is both filled and outlined, a line plus data markers plus value labels on every point, numbers both inside a bar and on an axis tick.

Two rules fall out of the definition, each hedged with "within reason":

1. **Erase non-data-ink, within reason.** Start by removing; only add back if the erasure cost readability.
2. **Erase redundant data-ink, within reason.** Pick the reading that is most accurate (position over length, direct label over legend) and mute the rest.

The hedge matters. The goal is not a data-ink ratio of 1.0 — a chart with literally no apparatus is unreadable. The goal is *maximize within reason*, which means: erase until the next erasure would cost the reader something.

## The three varieties of chartjunk

Three failure modes:

### 1. Moiré vibrations

Cross-hatching, dense diagonal fill patterns, and high-contrast repeating textures interact with the eye's physiological tremor to produce the visual impression of flicker or movement. These were common in mid-century print graphics and appear today in default spreadsheet fill patterns and in some accessibility-pattern libraries.

- Replace cross-hatching with flat **tint screens** (shades of gray or of a single hue).
- Label regions with words rather than encoded fill patterns when the labels will fit.
- If patterns are required for accessibility (color-blind users), prefer dot/line patterns at low density rather than dense cross-hatching.

### 2. The grid

Heavy dark gridlines are chartjunk. They carry no data, they clutter the space between the marks, and they compete with the data for visual weight.

- For publication/dashboard charts, **mute gridlines to light gray** or remove them entirely.
- Keep gridlines when the chart functions as a lookup table — when readers will trace from a mark to an axis to read a precise value. Even then, the grid should be subordinate to the data.
- Prefer a **white grid** (white lines over a light fill) to a dark grid on white — this turns the gap between gridlines into data-carrying space rather than letting the grid itself dominate.
- Do not draw gridlines behind bar charts if the bars are already read against a common baseline — the gridlines add nothing.

### 3. The duck

When decorative form takes over the graphic — 3D perspective on 2D data, icons substituted for bars, a chart redrawn as a cartoon skyline, drop shadows, bevels, gradient fills meant to look "modern." The data measure has become a design element rather than a carrier of information.

- Never render 2D data in 3D. 3D is a graphical integrity violation (see [`../02-graphical-integrity.md`](../02-graphical-integrity.md)), not just a style mistake.
- Flat fills, thin lines, no bevels, no shadows.
- If the palette's default style applies a shadow or gradient, override it.

> Chartjunk can turn bores into disasters, but it can never rescue a thin data set.

## Gestalt lens for decluttering

The Gestalt principles describe how the visual system groups elements into perceptual units before any conscious thought. Each principle tells you which apparatus you can *remove* because the viewer's brain will supply it for free.

- **Proximity.** Elements physically close together are perceived as grouped. *Use it to remove:* table borders between columns (column spacing alone groups them); legends placed far from the data (put the label next to the line instead).
- **Similarity.** Elements that share color, shape, or size are perceived as grouped. *Use it to remove:* redundant category labels; extra lines separating rows (color-banding or consistent text color does the same work).
- **Enclosure.** Elements inside a shared region (a shaded band, an outlined box) are perceived as grouped. *Use it to remove:* heavy borders — light background tint is enough. Enclosure is also the right way to mark a forecast region or a highlighted time window without a disruptive vertical rule.
- **Closure.** The brain completes incomplete shapes. *Use it to remove:* chart borders, full-rectangle frames around plot areas. A plot defined by only two axes (bottom and left) still reads as a bounded chart.
- **Continuity.** The eye follows the smoothest continuous path. *Use it to remove:* the y-axis line itself — aligned labels and whitespace create the same sense of a vertical axis. Also: tick marks on every label — the eye infers regular spacing.
- **Connection.** Physically connected elements (a line segment joining points) are perceived as more strongly grouped than same-colored but disconnected ones. *Use it to remove:* per-point markers on a line chart — the line already does the grouping. Adjust line weight to tune emphasis.

These six let you remove visual elements *without losing meaning*, because the viewer's perceptual system fills in the pattern.

## Decluttering checklist

Walk this list every time you render a chart. Order matters — do it from the outside in.

1. **Remove the chart border.** Closure fills in the box. Use whitespace to separate the chart from its surroundings, not a frame.
2. **Mute or remove gridlines.** Default to none. If the chart functions as a lookup table, use light gray horizontal gridlines only; vertical gridlines are rarely helpful.
3. **Remove the plot-area background fill.** Use the page background.
4. **Remove tick marks** on axes where labels are aligned to the tick position. The label implies the tick.
5. **De-emphasize the axis line and labels.** Push axis text to medium gray, not black. Use a thin gray or no axis line (continuity fills it in).
6. **Remove redundant data markers.** On line charts, drop the per-point dots unless the marker adds information (exact-value points, irregular time spacing per).
7. **Clean axis labels.** Drop trailing zeros (`10`, not `10.0`). Abbreviate months (`Jan`, not `January`) when horizontal space is tight. Keep `$`, `%`, and thousands commas — those reduce cognitive load, not add to it.
8. **Label directly, drop legends.** Put the series name at the end of the line, next to the relevant bar, or inside the donut slice. Legends force the reader to eye-dart back and forth; direct labels exploit proximity.
9. **Use consistent color.** Same series = same color across every chart in the dashboard. Reserve a single accent color for the focal point; render the rest in grays. One chart, one accent — "accent color on gray".
10. **Collapse redundant encoding.** A bar whose height, fill, and value label all encode the same number is encoding it three times. Pick one (the bar) and mute the rest — or remove the label when the axis is already present.
11. **Cut text that restates an adjacent visual.** A chart subtitle that reads `dashed line = overall median (4.0%)` while the dashed line on the plot is already labeled `company median 4.0%` is redundant data-ink made of words. Pick the closer-to-the-data instance (usually the direct label) and drop the other. Subtitle text earns its place by carrying context the chart does *not* render — units, window, axis transforms, tutorial glosses for unfamiliar forms — not by naming elements that are already labeled. Dashboard-scope version of this rule (header subtitle narrating the KPI row, flagged-list enumerations duplicating orange axis labels) lives in [`../dashboard/narrative.md`](../dashboard/narrative.md) *Repetition vs. restatement*.
12. **Align everything to a grid.** Titles upper-left, axis titles aligned to their axes, numbers right-aligned. Misalignment creates noise with no information content.

## Iteration — decluttering is continuous

Decluttering is not a one-shot cleanup at the end of the design. It is a constant posture:

- Every time you **add** an element, ask what data it adds. If none, it's a candidate for removal before it even lands.
- Every time you finish a chart, run the checklist again. Each removal makes the remaining clutter more visible — the second pass finds what the first hid.
- When a new chart type lands in the palette, its defaults are almost certainly over-decorated. Strip the defaults before composing with the data.
- Resist attachment. "We worked hard on this gradient fill" is not a reason to keep a gradient fill.

## What *not* to cut

Decluttering is asymmetric — it is easier to strip too much than too little. The second half of the principle, *within reason*, exists precisely because a chart with zero non-data-ink is unreadable. Not every piece of non-data-ink is clutter. These earn their space:

- **Unit symbols** (`$`, `%`, `ms`). They aid interpretation at a glance and cost almost nothing.
- **Thousands commas** (`12,450`, not `12450`). Reduces cognitive load.
- **A single thin axis baseline** on bar charts when the baseline is the zero reference — it reinforces the integrity of the encoding.
- **Source and date notes** in the footer. These are integrity apparatus, not decoration (see [`annotations.md`](annotations.md)).
- **Reference lines** for targets, prior periods, or structural breaks when they carry the chart's point.
- **Direct labels at the end of line series** — technically non-data-ink, but they eliminate legend lookups and reduce cognitive load, paying for the ink many times over.

Clutter is ink that doesn't earn its space. Context is ink that the reader needs to make sense of the data. Balance both — not too much, not too little.

## Before-and-after: the makeover pattern

A canonical decluttering pass, applied in order to a default spreadsheet line chart:

1. **Start:** Black chart border, dark gridlines, 5 series in 5 hues, legend below, data markers on every point, y-axis in bold black, title `Monthly Sales`.
2. **Remove chart border.** Closure fills the box — nothing lost.
3. **Remove gridlines**, or drop to thin light gray. Data now stands out against whitespace.
4. **Remove per-point data markers.** The lines alone show the data; the markers were redundant data-ink.
5. **Push y-axis to medium gray** and thin the axis line; continuity fills in the axis.
6. **Drop the legend; label lines directly at their right endpoints** in the matching color.
7. **Clean axis labels.** `Jan, Feb, Mar` not `January, February, March`. Y-axis `$10`, not `$10.0`.
8. **Single accent + gray palette.** Focal series in the accent; the other four muted to shades of gray. This is both emphasis and decluttering — the noise of four competing colors is gone.
9. **Action title:** replace `Monthly Sales` with the takeaway, left-aligned at the top.
10. **Source note:** small light gray footer.

Each step makes the data louder by making the apparatus quieter. The rendered chart now *shows the data* with minimal supporting ink — data-ink ratio maximized within reason.

## Common failure modes

- A dashboard where every chart has its own rectangular border, producing a grid-of-grids effect that reads as visual noise.
- Dense gridlines that are darker than the data line, inverting the intended figure-ground relationship.
- A line chart with five series, five colors, and a legend in the top-right — the eye bounces constantly between legend and plot.
- Value labels inside every bar *and* a y-axis with gridlines — three encodings of the same number.
- Default spreadsheet output shipped as-is: gradient bars, chart border, gridlines, legend below, 3D tilt.
- A "clean" chart that dropped the source note and the units — decluttered past the point of integrity.
- Gray-on-gray axis labels pushed so far into the background they can't actually be read — muted too far.
- **Chart subtitle that restates what the chart already renders** — "dashed line = overall median (4.0%)" while the line on the plot is already labeled, or a subtitle that describes the x-axis/y-axis when the axes are already labeled. Subtitle-as-legend is for elements the chart can't self-label, not for ones it can. See checklist item 11.

## See also

- [`../00-mental-model.md`](../00-mental-model.md) — "above all else show the data" as the underlying principle
- [`emphasis.md`](emphasis.md) — once the clutter is gone, how to direct attention
- [`typography-and-labels.md`](typography-and-labels.md) — direct labeling and axis-label cleanup
- [`annotations.md`](annotations.md) — what non-data-ink *is* worth keeping
- [`../encode/color.md`](../encode/color.md) — the gray-plus-accent palette pattern
