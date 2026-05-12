---
name: dashboard-consistency
description: Produce dashboard-scope consistency decisions consumed by every chart — palette, delta-format, value-format, legend-treatment, category-order, time-range, number-format, scale. Resolve once at dashboard time; chart recipes consult but do not re-decide.
governs: dashboard.palette (consistency), dashboard.delta-format, dashboard.value-format, dashboard.legend-treatment, dashboard.category-order, dashboard.time-range
consumes: strategic.mode
---

# Dashboard consistency

A dashboard is a population of charts that must behave like a team. The reader carries expectations from chart to chart; breaking them is expensive. Every rule here names a **dashboard-scope decision** that is resolved once, before any chart is drafted, and applied uniformly. Per-chart reasoning picks the per-chart-correct choice and never sees the row-level mismatch — which is why these rules live at dashboard scope, not inside the chart recipes.

For composition/layout concerns (grid, tile, alignment) see [`structure.md`](structure.md). For chrome/decoration see [`chrome.md`](chrome.md).

## Rules

### dashboard.palette — same color, same meaning

If "Enterprise" is blue on chart 1, it is blue on chart 7. Do not reuse the same blue for "Enterprise" on one chart and "Current period" on another.

**Resolve the palette once, at dashboard scope, before drafting individual charts.** Map each series or semantic role (`Cursor`, `Claude Code`, `positive variance`, `focal`) to a specific hex value and hold it fixed. Chart recipes then *consult* the resolved palette at render time; see [`../encode/color.md`](../encode/color.md). The common failure: a generator picks colors per chart ("this one seems to want green") and ends up with the same series in different hues across the dashboard.

### dashboard.category-order — same ordering everywhere

If regions are sorted by revenue descending on the bar chart, they appear in the same order on the pivot table and the stacked bar. Alphabetical ordering on one chart and value-sorted on another invites the reader to mis-compare.

**Paired comparisons sort the same direction.** When two charts plot the same metric for direct comparison (top-N + bottom-N, this-period + last-period, by-team + by-region), they share both the axis scale (see *Same scale across paired comparisons* above) AND the sort direction. The classic break: a "Top 10 spenders" chart sorts highest-on-top while a "Bottom 10 spenders" chart sorts lowest-on-top — both intuitive in isolation, jarring as a pair because the eye traverses them in opposite directions. Pick value-descending across the group so the longest bar is always on top of its card; the reader scans both cards top-down without flipping their mental orientation. Apply at dashboard scope, not per-chart — the bottom chart sorts descending too, even though "bottom" suggests low-to-high.

### dashboard.time-range — same window everywhere

When multiple charts share time: same start date, same end date, same tick interval, **and same tick-label format**. Two time-series charts with subtly different ranges look wrong even when nothing is wrong.

The tick-format half is easy to miss because formatting lives per-chart in most libraries; each chart's default formatter picks a "reasonable" format for its own granularity, and `Jan 25` on one chart next to `01-25` on another makes the reader re-parse the axis on every tile. Resolve the format once at dashboard scope — usually `Mon DD` for quarter-scale windows, `Mon 'YY` for multi-year, ISO only for engineering-facing dashboards where the rest of the page is ISO too — and apply to every time axis regardless of the chart's native granularity (daily charts and weekly charts must still match).

### Same number formatting per metric

$1.2M on one tile and $1,234,567 on another is jarring. Pick a format per metric and use it across every tile that shows the metric.

### Same scale across paired comparisons

Whenever two or more charts plot the **same metric** for direct comparison, they share an axis range. This covers small-multiple panels (revenue-by-region across segments) AND the more common dashboard pattern: **top-N + bottom-N pairs**, **this-period + last-period pairs**, **by-team + by-region pairs**, **before + after pairs**. Each chart's library auto-fits its own data, so a 24%-max chart and a 93%-max chart end up with bars at similar pixel widths and the comparison silently breaks — the bottom-decile adopters look about as bar-y as the top decile.

The fix is structural, not visual. Set the same axis maximum on every chart in the group, derived from the global max across the group, rounded up to a nice number. The reader sees a 24% bar visibly shorter than a 93% bar — which is the entire reason the two charts are next to each other.

Pairs to watch for in the column-scan: titles or subtitles that pivot on a high/low, top/bottom, this/last, before/after, A/B word pair while the rest of the title is identical. If you can swap one tile's data into the other tile's frame and the chart still makes sense, they are a paired comparison.

### Same scale across small-multiple panels

Three bar charts showing revenue by region across segments must share the y-axis range, or the reader sees design variation as data variation. (This is a special case of the paired-comparisons rule above — small multiples are paired comparisons faceted on a categorical dimension.)

### dashboard.legend-treatment — uniform across charts sharing a color encoding

Either **one dashboard-level color key** (at the top, near the title), OR **direct labels on every chart**, OR **per-chart legends on every chart** — never a mix. A single chart with a legend among peer charts with none reads as "this chart is different" when the encoding is the same. The strongest form on a typical dashboard is the dashboard-level key, since it teaches the palette once and every chart inherits it.

Two clarifications the mix-rule depends on — easy places for a generator to slip:

- **Direct labels substitute for a legend only when they include the series name.** `Cursor 24%` at a line's endpoint *is* a legend-substitute. `24%` at a bar end labels the value but leaves the hue unresolved; the reader still needs a legend mechanism to know blue is `Cursor`. Value-only direct labels are **not** self-identifying. Either promote at least one label per series to include the name or give the chart a legend.
- **A dashboard-level palette key counts as a legend for this rule.** A global key at the top AND a per-chart legend on one tile is a mix, not a supplement — both are legends for the same hues. If any chart genuinely needs its own legend (e.g., a stacked bar with categories beyond the core palette, like `Both / Cursor only / Claude Code only / Neither`), drop the global key and apply per-chart legends to every chart that identifies series through color. Otherwise use the global key and add no per-chart legends.

When in doubt: pick one mechanism at dashboard time and apply uniformly. The failure mode is reasoning per-chart ("this one has extras, so I'll add a local legend") and ending up with global key plus selective local legends.

### dashboard.delta-format — same delta format across every KPI tile in a row

Decide the delta format at dashboard level — *before* drafting individual tiles — and use it on every tile. Mixing `+2 pp` on DAU tiles with `+23%` on the spend tile is the common failure: each tile is right per-metric (pp for a proportion, % for a flow), but the row carries two conventions and the reader re-learns the unit per tile. Pick one:

- **Relative % on every tile** (`+6% vs 30 days ago`) — clarity-first default. The one format that applies to DAU, spend, PRs, conversion, headcount. On proportion metrics, annotate the subtitle (`vs 30 days ago`) so `+6%` doesn't mis-read as "+6 percentage points."
- **Absolute `pp` everywhere** — only if *every* metric on the row is a proportion.
- **Absolute in native units everywhere** (`+12 PRs`, `+$4.5K`) — only if no metric on the row is a proportion.
- **Absolute-with-relative-in-parens everywhere** (`+2 pp (+6%)`) — most honest on mixed rows but densest; reserve for careful audiences.

This is a phase-step. After tiles are drafted, scan down the column of delta lines. If they don't all end in the same unit suffix, one tile is out of step — normalize. See [`../charts/single-value.md`](../charts/single-value.md) for tile-internal delta mechanics.

### dashboard.value-format — same value units across every KPI tile in a row

The twin of the delta-format rule. A row with values `4.3%` / `3.4 pp` / `10%` / `4` — each value correct in isolation — reads as mixed even when every delta ends in `pp`. The reader column-scans values first (they're the largest ink on each tile); a mixed-suffix value column pays the same attention tax as a mixed-suffix delta column.

Easy to miss because the mismatch emerges only from *picking each tile's natively-right unit* — rates want `%`, differences of rates want `pp`, counts want integers — and the row ends up with three suffixes. Reformulate so the value column reads as one:

- **Render the compared rates, not the difference.** `3.4 pp gap` becomes `7.0% / 3.3%` (Outstanding over Meets) with `3.4 pp gap` in the subtitle — every value is `%` or a pair of `%`s.
- **Express counts as proportions when a denominator exists.** `4 flagged slices` becomes `29%` with subtitle `4 of 14`.
- **Remove the oddball from the row when no reformulation lands cleanly.** A bare integer count with no natural denominator alongside percentages signals the tiles aren't peers; move the count to a different row.

Do two column scans before shipping, not one: the **delta column** AND the **value column**. If either ends in multiple unit suffixes, one tile is out of step.

### Column-scan procedure (verification phase)

The two scans above (`dashboard.delta-format` and `dashboard.value-format`) are not advisory prose — they are mechanical checks the generator runs once per KPI row at verification time. State the procedure explicitly so it actually fires:

1. **Identify each KPI row.** A "row" is the visual horizontal group of tiles that share a baseline, regardless of whether they sit under one section header or several.
2. **Extract the rightmost unit suffix** from each tile's value: the trailing token after the numeric portion. `87.4%` → `%`; `18.2m` → `m`; `12.4h` → `h`; `143.8K` → `K`; `2,184` → `(integer)`; `$1.2M` → `$M`; `3.4 pp` → `pp`. Same procedure for delta lines.
3. **Assert all suffixes in the row match.** If they don't, name the oddball tile(s) and apply one of: render compared rates instead of the difference; express counts as proportions; or move the oddball to a different row. Examples: a row with values `m, m, %, h` (three different suffixes) — the `%` and `h` tiles are oddballs against the two `m` tiles. A row with `K, K, K, %` — the `%` tile is the oddball.
4. **Same procedure for the delta column.** A row with deltas `pp, pp, %, pp` is one tile out of step on its delta even if its value suffix matches.

The check is rowwise, not topic-wise. **Section headers like QUALITY / EFFICIENCY / VOLUME group rows by domain and make each row read as topically coherent — that does not exempt the row from the suffix-match check.** A row of efficiency metrics `(AHT 18.2m, FRT 2.1m, OTR 72.1%, TTR 12.4h)` is topically coherent and unit-mismatched at the same time. Topic membership justifies each tile individually; the suffix-match operates on visual peers.

The procedure is what makes verification fire. Without these explicit steps, the rules remain advisory ("scan down the column") and the generator builds the strip tile-by-tile without ever running the row-pass — every tile is "natively right," and the row-level mismatch ships unnoticed.

## Pre-ship checklist

- Colors mean the same thing on every chart. Palette was resolved once at dashboard scope; no chart picked hues at render time. If the palette is compound (multi-source), run the OKLCH coherence audit in [`../encode/color-palettes.md`](../encode/color-palettes.md) *Palette coherence audit* — monotonic ramps, hue-arc bounds within family, saturation-to-role match.
- Category orders and number formats match across tiles.
- Shared scales on similar / small-multiple charts.
- **Delta column scan passes** — extract each tile's delta suffix per row; assert all suffixes match. See *Column-scan procedure* above.
- **Value column scan passes** — extract each tile's value suffix per row; assert all suffixes match. Section-headers (QUALITY / EFFICIENCY / VOLUME) do not exempt a row from the check. See *Column-scan procedure* above.
- **Time-axis format scan passes**: read the tick labels across every time-series chart — same format everywhere (`Jan 25` or `01-25`, not both). Daily and weekly charts on the same dashboard must still match.
- **Paired-axis scan passes**: identify every pair (or set) of charts plotting the same metric — top-N/bottom-N, this/last period, by-team/by-region. For each group, read the value-axis maximum off the rendered axis. The maxima must match across the group. If chart A maxes at 100% and chart B maxes at 30%, B's bars look ~3× too wide.
- **Legend treatment is uniform** — exactly one of {dashboard-level key, per-chart legends, name+value direct labels}. A dashboard-level key counts as a legend. Value-only direct labels do not substitute for one.

## Things to avoid

- **Inconsistent scales across paired charts.** Top-N and bottom-N of the same metric on different axis ranges; this-period and last-period on different ranges; small-multiple panels each fit to its own data. Design variation must not be readable as data variation. The classic break: a "Top 8 adopters" chart hits 93% and a "Bottom 8 adopters" chart hits 24%, both autoscale, and the bottom adopters' bars look longer than they should because the chart's max is 30% instead of 100%.
- **Mixed legend treatment** — a dashboard-level palette key *plus* per-chart legends on some tiles; or value-only direct labels on charts whose hue→series mapping isn't carried elsewhere. A dashboard-level key counts as a legend; value-only labels don't.
- **Mixed delta formats across a KPI row** — `+2 pp` on DAU tiles, `+23%` on a spend tile. Pick one at dashboard time and apply to all (usually relative %).
- **Mixed value units across a KPI row** — `4.3%` / `3.4 pp` / `10%` / `4` side by side. Column-scan values and reformulate so the column ends in one suffix (render both rates instead of a pp gap; express a count as `%` of its denominator).
- **Filters applied inconsistently across tiles.** Global time filter "last 30 days" but one tile silently shows all time → every comparison misreads.
- **Mixed time-axis label formats.** `Jan 25` on the daily chart and `01-25` on the weekly chart next to it. Each library's default is "reasonable" per granularity; the dashboard reads as two formats. Resolve the format at dashboard scope.

## See also

- [`structure.md`](structure.md) — grid, tile sizing, reading order
- [`chrome.md`](chrome.md) — page chrome, whitespace, density
- [`../encode/color.md`](../encode/color.md) — palette principles (color resolution, colorblindness)
- [`../encode/color-palettes.md`](../encode/color-palettes.md) — concrete palette defaults
- [`../charts/single-value.md`](../charts/single-value.md) — KPI tile mechanics
- [`kpi-row.md`](kpi-row.md) — composition reasoning for the KPI strip (role, metric selection, count, whether it should exist); the rules here are its construction-time partner
