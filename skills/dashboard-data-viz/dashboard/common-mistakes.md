---
name: dashboard-common-mistakes
description: Pre-ship review sweep of 13 canonical dashboard mistakes. Each mistake aliases to the existing skill file that governs its construction-time rule. Use after a dashboard is drafted to catch failures that per-file construction rules may have missed when integrated.
governs: dashboard.review
consumes: (reviewer — consumes every dashboard unit but produces none)
---

# Common mistakes — review-time sweep

This file is a **review artifact, not a rule source.** Every rule cited here lives in another skill file; this file surfaces them as one list, keyed to 13 canonical dashboard mistakes. The construction-time rules are still where the rules live — this is the pre-ship checklist that catches mistakes only visible when tiles are integrated into a dashboard.

Why a consolidated list: construction-time rules are enforced per file while tiles are drafted. Some failures only appear once the dashboard is assembled — an inappropriate chart type chosen tile-by-tile, a bare number with no comparison, an alert scheme that depends on color a colorblind reader can't see. A final sweep against the canon catches these integration failures.

Use this file **after** the dashboard is drafted, not during. For construction-time rules see the file linked from each mistake.

## The 13 mistakes

### 1. Exceeding the boundaries of a single screen

Two sub-forms: fragmenting data across multiple screens/tabs, and requiring scrolling.

Short-term memory holds only a few chunks, so anything out of sight becomes unavailable to compare — and "simultaneity of vision" is the unique value a dashboard provides. A tabbed "dashboard" of 10 screens is not a dashboard; it's a report. Scrolling is worse than a smaller dashboard: "People commonly assume that anything that lies beyond their immediate field of vision and requires scrolling to see is of less importance."

Caveat: scrolling changes function silently — OK for pure lookup (table, ranked bar), fatal for pattern-discovery (heatmap, scatter, small-multiples grid).

Governed by: [`chrome.md`](chrome.md) (scrolling-changes-function), [`structure.md`](structure.md) (responsive breakpoints, tile sizing).

### 2. Supplying inadequate context for the data

A bare number (QTD sales = $736,502) means little. "Compared to what?" — target, prior period, forecast, benchmark, peer — is usually mandatory.

Typical failure: gauges or big-number tiles rendered as decoration with no target, no prior period, and a color-coded arrow that tells you "good" without telling you how good.

Governed by: [`../02-graphical-integrity.md`](../02-graphical-integrity.md) (compared-to-what principle), [`../charts/single-value.md`](../charts/single-value.md) (every KPI tile has a comparison), [`../craft/annotations.md`](../craft/annotations.md) (reference lines for target/prior/forecast), [`kpi-row.md`](kpi-row.md) (context-for role for strip tiles).

### 3. Displaying excessive detail or precision

Dashboards need glance-level information. `$3,848,305.93` beats itself down to `$3.8M`; times-to-the-second are wasted when hourly resolution is fine; ten decimal digits are unreadable at scan speed.

Rule of thumb: strip precision until the reader can still distinguish meaningful differences but no further. Decimals in operations often should be rounded to whole units; currency rounded to thousands; percentages to one decimal or none.

Governed by: [`../charts/single-value.md`](../charts/single-value.md) (number formatting), [`../charts/pivot-table.md`](../charts/pivot-table.md) (table precision), [`consistency.md`](consistency.md) (number format per metric).

### 4. Choosing a deficient measure

"A measure is deficient if it isn't the one that most clearly and efficiently communicates the meaning that the dashboard viewer should discern. It can be accurate, yet not the best choice for the intended message."

Classic failure: showing actual and budgeted revenue as two lines when the message is their *difference*. Express the variance directly (−9%) rather than forcing the reader to mentally subtract.

Governed by: [`kpi-row.md`](kpi-row.md) Q2 (why these metrics, not others) + exclusion test; [`../charts/waterfall.md`](../charts/waterfall.md) (variance decomposition form).

### 5. Choosing inappropriate display media

The most common mistake and the most consequential. Pie charts for precise comparison. Bubbles for quantitative encoding. Radar graphs for linear data. Geographic maps for non-geographic information. 3-D for 2-D data.

Match the display form to the question the tile is answering.

Governed by: [`../choose-chart/by-question.md`](../choose-chart/by-question.md), [`../choose-chart/by-data-shape.md`](../choose-chart/by-data-shape.md), [`../choose-chart/decision-flow.md`](../choose-chart/decision-flow.md); per-chart critiques in [`../charts/donut.md`](../charts/donut.md), [`../charts/gauge.md`](../charts/gauge.md), [`../charts/bubble.md`](../charts/bubble.md).

### 6. Introducing meaningless variety

Using different chart types for similar data out of fear of boring the reader. Every distinct chart type taxes the reader — they must shift perceptual strategy for each tile.

Consistency in the means of display lets viewers use the same perceptual strategy for interpreting the data, saving time and energy.

Governed by: [`chrome.md`](chrome.md) (≤~5 chart types per dashboard, tutorial tax on each extra type), [`consistency.md`](consistency.md) (same encoding for same data role across tiles).

### 7. Using poorly designed display media

Right chart type, wrong rendering. Common failures: legend on a pie chart instead of direct labels; random slice ordering; bright saturated colors throughout; color palettes too similar to distinguish; decorative 3-D that distorts.

Governed by: the per-chart recipes in [`../charts/`](../charts/); [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md); [`../craft/typography-and-labels.md`](../craft/typography-and-labels.md) (direct labels beat legends); [`../encode/color.md`](../encode/color.md) (≤4 hues per chart, accent-on-gray).

### 8. Encoding quantitative data inaccurately

The canonical case: bar chart with a non-zero baseline. Bar length represents magnitude; a scale starting at $500K makes relative lengths wildly misleading. Zero-baseline is mandatory for bar, stacked, and area geometry.

Also in this mistake: dual-axis scales that suggest comparisons the data doesn't support; log axes used without labeling; area-encoded bubbles where the reader reads diameter; 3-D where the back bar is partially hidden by the front.

Governed by: [`../02-graphical-integrity.md`](../02-graphical-integrity.md) (lie factor, proportional encoding), [`../encode/scales-and-axes.md`](../encode/scales-and-axes.md) (zero baseline requirement per geometry), [`../charts/bar.md`](../charts/bar.md), [`../charts/bubble.md`](../charts/bubble.md) (area not radius).

### 9. Arranging the data poorly

Most important data in the most prominent position (top-left in left-to-right languages). Related charts adjacent so comparisons work. Don't waste top-left on logos or navigation.

Most common failure in the wild: the vendor's logo and navigation controls occupy the top-left quadrant; the actual data lives in the bottom-right.

Governed by: [`structure.md`](structure.md) (top-left is premium real estate; reading order; Gestalt grouping at dashboard scale), [`archetypes.md`](archetypes.md) (archetype-level layout).

### 10. Highlighting important data ineffectively or not at all

"When you look at a dashboard, your eyes should immediately be drawn to the information that is most important." Everything bold = nothing bold.

Pre-attentive highlighting must be sparing. ≤10% of ink in the accent. Accent-on-gray pattern: gray is default context; single accent color draws the eye to what matters.

Governed by: [`../craft/emphasis.md`](../craft/emphasis.md) (pre-attentive attributes, sparing-use rule), [`../encode/color.md`](../encode/color.md) (accent-on-gray), [`structure.md`](structure.md) (size + position as hierarchy levers).

### 11. Cluttering the display with useless decoration

Chartjunk: visual content that serves no data purpose. Gradient fills. 3-D shading. Decorative frames and borders. Photos of people. Logos occupying prime real estate. Spiral-bound-notebook styling. Dashboards made to look like car dashboards.

If the data is boring, you have the wrong data. Don't decorate to compensate.

Subtle variant to watch for: gradient background fills in bar charts affect perception of bar length in ways the reader won't consciously register. Even "pretty" effects that seem harmless tilt perception.

Governed by: [`../craft/clutter-and-data-ink.md`](../craft/clutter-and-data-ink.md) (data-ink ratio, three chartjunk varieties, Gestalt decluttering).

### 12. Misusing or overusing color

- **Same color, same meaning everywhere.** If blue is Enterprise on one chart, it can't be Current Period on another. The reader will try to relate them and fail.
- **Color used as contrast draws attention — so color must be rare.** Bright candy-like palettes on every chart mean no chart stands out.
- **Color-blindness.** ~10% of males, ~1% of females have some form; red-green most common. Don't rely on color alone for critical distinctions. Use intensity variations of a single hue, or add shape.
- **Redundant encoding.** Alert color paired with shape or text so color-blind readers can still read.

Governed by: [`consistency.md`](consistency.md) (palette, same color same meaning), [`../encode/color.md`](../encode/color.md) (earn-its-place principle, colorblind safety, accent-on-gray), [`../encode/color-palettes.md`](../encode/color-palettes.md) (Okabe-Ito as validated colorblind-safe palette), [`../charts/single-value.md`](../charts/single-value.md) (direction glyph redundant with color).

### 13. Designing an unattractive visual display

Not a call for ornament — a call for clean, clear typography and composition. Distorted proportions from stretching tiles to fill space. Overly dark backgrounds. Inconsistent fonts. Missing alignment. These make the dashboard unpleasant to use and erode trust.

Beauty here comes from clarity: good typography, tight alignment, considered whitespace, no ornament.

Governed by: [`../craft/typography-and-labels.md`](../craft/typography-and-labels.md) (one typeface per dashboard, hierarchy), [`structure.md`](structure.md) (alignment non-negotiable), [`chrome.md`](chrome.md) (whitespace and density).

## Pre-ship scan

Read the dashboard at arm's length (or squint / print-preview at half size — the glance test). Then run each question below. A "no" on any item means one mistake is live and needs fixing before ship.

1. **Single screen?** Everything critical visible at once, no scrolling for pattern-discovery tiles, no tabs hiding related data.
2. **Every metric has a comparison?** Target / prior / forecast / benchmark visible on each tile that carries a number. No bare "$3.9M" tiles.
3. **Precision matches scan speed?** No `.93` on currency at the million scale; no timestamps to the second on an hourly view.
4. **Each tile answers a named question?** If a tile can't be justified in one sentence (Q2 of kpi-row.md), it shouldn't ship.
5. **Chart type matches the question?** No pie for precise comparison, no bubble for quantitative encoding, no radar for linear data, no 3-D for 2-D.
6. **Chart-type variety earned?** ≤5 types unless a specific tile demands more; no type used once just for variety.
7. **Every chart rendered to recipe?** Legends placed once (not per-tile); slices sorted; colors muted; direct labels where they beat legends.
8. **Bar/stacked/area chart scales start at zero.** No log axes without labels. No dual axes unless honestly annotated. No 3-D occluding data.
9. **Top-left carries the most important chart.** Logos and nav controls are *not* top-left. Related charts are adjacent for comparison.
10. **Reader's eye goes to the right place first.** ≤10% accent; rest muted. Test by looking at the dashboard cold — if your eye lands on a logo or a decorative frame, the hierarchy failed.
11. **No chartjunk.** No gradients, 3-D shading, decorative borders, photos, ornamental framing, cutesy typography.
12. **One color, one meaning across the dashboard.** Works in grayscale / colorblind simulation. Alerts redundantly encoded (color + shape/text).
13. **Typography and alignment clean.** One typeface. Column edges line up. Nothing stretched to fill space. Whitespace considered, not accidental.

If any item fails, trace back to the governing skill file (links above) and fix at the rule level, not just the symptom. Common-mistakes.md is for catching; the governing files are for understanding *why* and *how*.

## See also

- [`../rules-index.md`](../rules-index.md) — every skill rule in the system, keyed to governance unit
- [`audience-purpose.md`](audience-purpose.md) — mode gates some of these (color strategy, emphasis, interactivity)
- [`consistency.md`](consistency.md) — dashboard-scope consistency (palette, formats, ordering)
- [`structure.md`](structure.md) — layout and arrangement
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — non-negotiable integrity rules
