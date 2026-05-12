---
name: single-value
description: Produce dashboard.tile (single-value / KPI) — one big number with label, unit, and a compared-to-what delta.
governs: dashboard.tile (single-value)
consumes: dashboard.delta-format, dashboard.palette
---

# Single-value tile (big number / KPI)

A single-value tile renders one — occasionally two — numbers as the whole visualization, typically paired with a label, a unit, and a comparison ("vs last quarter", "vs target"). This pattern — "Simple Text" — when the number itself is the message, the best "chart" is the number, made large, placed prominently, and given context. It is one of the most under-used forms on dashboards and one of the most over-decorated when people do use it.

## When to use

- A **single KPI with clear meaning** — ARR, DAU, CSAT, uptime %, burn rate.
- A **headline number** that the rest of the dashboard explains or decomposes.
- There is **no benefit from a chart** — a bar with one bar is a waste; a gauge adds decoration without information.
- The audience needs the number first, quickly, at a glance — exec summaries, ops scorecards, dashboard tops.

## When NOT to use (and alternatives in the palette)

- **Comparison across categories is required** — a single number can't say "which region is largest"; use [`bar.md`](bar.md).
- **Trend over time is the story** — `line.md`, or a big number + inline sparkline giving both.
- **Visual comparison to a target with magnitude context** — `gauge.md` if the comparison is familiar to the audience; a bullet chart does the same job with better integrity.
- You have five KPIs on one tile — split into five tiles; a wall of numbers with no hierarchy is no better than a paragraph of statistics.
- The number alone would be **ambiguous without context** — either add the comparison, or switch to a chart that carries the context visually.

## Rules

### The number is the hero

- **Make the number large and legible** — dramatically larger than the label. A useful ratio: the number is 3–5× the label size.
- One typeface, consistent with the dashboard. No fancy fonts; legibility before style.
- Colour the number with restraint — dashboard default text colour is usually right. Reserve colour for delta direction or threshold breach.

### Supporting words (minimal, load-bearing)

- **Label the metric** — what the number *is* ("Monthly Recurring Revenue"). The most common single-value failure is a giant number with no clear label.
- **The title and the big number must carry different facts.** Title labels the metric (noun phrase); big number is the value. Don't restate: a title like `"68% of engineers active with AI coding tools"` over a big-number `68%` writes the value twice — use `"Engineers active with AI coding tools"` instead. The action-title pattern from [`../dashboard/narrative.md`](../dashboard/narrative.md) is for chart titles where the takeaway is a sentence; on a KPI tile the big number IS the takeaway, so the title's job is the metric name. Edge case: the title can carry interpretation the big number doesn't (`"Conversion up 30% this quarter"` over a `+30 pp` big number — different facts: the title states relative change and direction, the big number states absolute change). The rule is *different facts*, not *no digits in title*. Same single-write-per-context family as the double-unit case below; the fact being written twice is the value rather than the unit.
- **Unit** visible — `$`, `%`, `ms`, `per 1,000` — either in the number itself (`$2.4M`) or adjacent (`2.4M revenue`).
- **Symbol units stay on the number; noun units stay in the title.** Unit symbols (`$`, `%`, `ms`, `K/M/B` abbreviations) belong on the number because a bare digit would be unparseable — `26` on its own can't tell you what it means; `26%` can. Unit-nouns (engineers, customers, tickets, incidents) belong in the tile title, not restated on the number — `80` under a tile titled "Engineers" reads unambiguously, and writing "80 engineers" below echoes the title. Add the unit-noun on the number only when the title is ambiguous, when tiles share a generic title row, or when the dashboard context forces re-statement.
- **The unit symbol appears on the number exactly once.** If the value string is formatted with the unit baked in (`63.4%`, `$5.82`), no separate unit-suffix slot is filled. If the tile component exposes a separate unit-suffix slot, the value renders bare and the slot carries the unit. Never both. The common failure: tile component exposes both a `value` slot and a `unitSuffix` slot, the generator fills both independently (value formatter outputs `63.4%`; unit slot fills with `%`), and every tile in the row renders `63.4% %`. Audit by regex-scanning rendered tiles for double-suffix patterns (`%\s*%`, `\$.*\$`). Generic rule: [`../craft/typography-and-labels.md`](../craft/typography-and-labels.md) *Units appear exactly once per read context*.
- **Period** — what time window does this number describe? ("Q2 2026", "last 30 days", "as of 22 Apr").
- **Comparison** — the "compared to what?" that grounds every number. Options:
  - Delta vs prior period (`+12% vs Q1`)
  - YoY percent (`+8% YoY`)
  - Distance to target (`72% to goal`)
  - Peer or benchmark comparison (`vs. industry 2.1%`)

### Context ("compared to what?")

- **Always include at least one comparison** unless the number is genuinely self-explanatory (count of outages today, where "2" means what it means).
- Render the comparison smaller than the headline, larger than the label.
- A tiny sparkline below the number adds time-context for essentially free.

### Precision

- **Precision appropriate to the audience.** A CEO does not need `0.347%`; an SRE tracking error rates probably does.
- Round headline numbers (`$2.4M`, not `$2,421,836`) when the audience is scanning; preserve precision when the audience is reconciling.
- Do not manufacture fake precision ("47.000%") — and do not round so hard that distinct values collide ("both regions at 1M" when one is 0.6M and the other is 1.4M).

### Colour and delta direction

- **Use colour only for a delta direction or a threshold breach** — not for decoration.
- Convention: green for favourable direction, red for unfavourable — but **never rely on red/green alone** (colourblind accessibility). Add an arrow, a `+`/`-`, or a word.
- Consider blue-for-positive / orange-for-negative as a colourblind-safer alternative.
- If the delta's favourable direction depends on the metric (cost going down is good; revenue going up is good), make sure the dashboard applies direction consistently; don't surprise the reader.
- **Favourability colour requires an unambiguous direction OR an explicit reference.** Apply the favourable/unfavourable colouring only when the metric's favourable direction is unambiguous for the audience (DAU up = good, latency down = good, conversion up = good) OR when an explicit target, budget, SLA, or threshold is shown against which the delta is measured. For context-dependent metrics (spend, headcount, inventory, volume) with no stated reference, render the delta in **neutral grey with the direction glyph alone** — don't guess the reader's framing. Spend going up could mean more adoption (good) or budget pressure (bad); the dashboard can't know which without a reference. If the reader wants a favourability call on a context-dependent metric, the fix is to add the reference (target, budget, SLA), not to pick a side.
- **Favourability hues must not collide with the dashboard's categorical palette.** The canonical colourblind-safer pairing for direction is blue (positive) / orange (negative). But if the dashboard has already resolved blue to a data series (say `Cursor`) and orange to another (say `Claude Code`), those hues now carry series identities and cannot *also* carry direction identity — a blue `+12%` delta on a tile titled *Weekly active · Cursor* is genuinely ambiguous: does the colour mean "Cursor" or "positive"? **When a favourability hue would collide with a categorical hue on the same dashboard, render every delta on the row in neutral grey and carry direction with an explicit glyph** (↑/↓, or the `+`/`−` sign the delta already carries, made prominent). Direction becomes a shape signal, not a colour signal; the dashboard's hues stay bound to their series identities. See [`../encode/color.md`](../encode/color.md) *One hue, one meaning per dashboard*.

### Alignment

- **Left-align for most dashboards** — the reader scans top-left first, and left-aligned numbers align cleanly with left-aligned labels and adjacent tiles.
- **Centre-align only for presentation-style big numbers** or a symmetric centrepiece tile.
- Right-align when the tile is part of a wider numeric column that needs decimal alignment (rare, but valid).

### Layout within the tile

- Order: **label (smaller) → number (largest) → comparison (medium) → optional sparkline/footnote (smallest).** Or, if convention requires, number first with label above.
- Generous whitespace around the number — do not stuff additional stats into the tile.
- **Consistent sizing across all single-value tiles on the same dashboard** — uneven tile typography reads as noise. Consistency is a **construction commitment, not a post-hoc check**: give each zone inside the tile a **fixed vertical slot** sized for the worst-case content on the row. Label and subtitle each reserve space for 2 lines (even when one tile's string fits on 1); value and delta reserve 1 line each; the delta pins to the tile bottom. The tile itself stretches to the tallest tile in the row. With every zone on a shared baseline, it no longer matters whether one tile's label or subtitle wraps — the value line, subtitle line, and delta line align horizontally across the whole KPI strip. Without reserved slots, natural document flow cascades a 2-line label's extra height through every zone below it, and the "is it consistent?" check catches the failure only after render. Tile-level analog of the "right-align numbers on the decimal" rule for tables: a construction pattern that makes misalignment structurally impossible, not a reviewer check that can be forgotten.
- **No duplicated facts across subtitle and delta line.** A tile's subtitle (below the metric label) and its delta/context line (below the number) must say different things. Restating the same fact in both — subtitle says "Across 6 teams" and delta says "6 teams · 13 avg per team" — is redundant ink competing for attention without adding information. Decide which line owns which fact and collapse duplicates.

### Delta format is decided at dashboard scope, not per tile

A single tile cannot choose its own delta format. The format is a **dashboard-level decision** made once, before any tile is drafted, and applied uniformly to every KPI tile in the row. Per-tile reasoning picks the per-metric-correct format (`pp` for a proportion, `%` for a flow) and never sees that the row now carries two conventions — which is the most common KPI-row bug.

Default: **relative % everywhere** (`+6% vs 30 days ago`). It's the only format that applies to every metric (DAU, spend, PRs, headcount) without forcing the row to carry two suffixes. On proportion metrics, mitigate the `+6% read as +6 pp` ambiguity with an explicit "vs 30 days ago" subtitle.

Full rule — including when `pp` everywhere or native units everywhere are the right call, and the pre-ship column-scan check — lives in [`../dashboard/consistency.md`](../dashboard/consistency.md). Don't finalize a KPI row without reading down the column of delta lines and confirming every one ends in the same unit suffix.

### Value units are also a row-scope decision, not just deltas

The delta rule above has a twin: the **value units** across a KPI row must read as one convention too. A row with `4.3%` / `3.4 pp` / `10%` / `4` — each value correct in isolation — reads as mixed even when the deltas are uniform. The reader scans down the column of values, hits `3.4 pp`, mentally pauses to re-parse, and loses the row's rhythm. Same read-tax, same failure mode, same fix.

This case is easier to miss than the delta version because each value is *definitionally* in its right unit:

- **Rates are natively `%`** (merit budget spent, conversion, utilization).
- **Differences of rates are natively `pp`** (Outstanding merit minus Meets merit, variance-from-plan on a proportion).
- **Counts are natively integers** (flagged slices, open incidents, engineers).

Picking each per-metric leaves the row with three unit suffixes. The remedy is to reformulate values so the row's unit column reads as one:

- **Render the compared rates, not the difference.** "Top-performer differentiation gap: `3.4 pp`" can become "Outstanding / Meets merit: `7.0% / 3.3%`" with the gap in the subtitle (`3.4 pp gap`). Every tile's value is now a `%` or a pair of `%`s.
- **Express counts as proportions when a denominator exists.** "Slices not differentiating: `4`" on a row of percentages becomes "`29%`" with the subtitle "`4 of 14`". The value column is all `%`; the count lives in the subtitle.
- **If no reformulation lands cleanly, drop the oddball from the row.** A true integer count with no meaningful denominator (open P0 incidents today) and a row of percentages shouldn't coexist as peer tiles — move the count to a different row or section.

Column-scan the row's **value** suffixes the same way you column-scan the delta suffixes. Both passes before shipping.

Governance: this is a `dashboard.value-format` decision, a sibling of `dashboard.delta-format`. Decided at dashboard scope, applied to every KPI tile, enforced by the pre-ship column scan. Per-tile reasoning picks the per-metric-native unit and never sees the row's mixed-suffix column. The long-form rule — including what to do on mixed-metric rows and the column-scan check — lives in [`../dashboard/consistency.md`](../dashboard/consistency.md).

## Anti-patterns

- Big number with no label — "4.3" of what?
- Big number with no comparison — "compared to what?" unanswered.
- **Fake precision** (`24.7183%`) on an exec dashboard.
- **Decorative colour** on the number itself ("make it pop") — dilutes the colour reserved for deltas.
- Red down-arrow without text — unreadable to red/green colourblind readers.
- Five KPIs squeezed into one single-value tile — split into tiles, each with its own hierarchy.
- A gauge used when a big number + delta would say everything (see `gauge.md`).
- Overuse of single-value tiles on a dashboard that is actually about trends — the dashboard ends up showing many numbers and no patterns.
- **Inconsistent sizing/alignment across tiles on the same dashboard** — typically caused by letting natural document flow position each zone. A 2-line label or subtitle in one tile pushes its value, subtitle, and delta onto different baselines than the adjacent tiles where the same zones fit on 1 line. Reserve fixed-height slots per zone as specified in *Layout within the tile* — don't rely on the post-hoc "is it consistent?" check to catch this.
- **Mixed delta formats across a KPI row** — `+2 pp` on some tiles, `+23%` on others. Each tile looks right in isolation; the row doesn't. Format is decided at dashboard scope, not per tile — see [`../dashboard/consistency.md`](../dashboard/consistency.md) and do the column-scan check before shipping.
- **Mixed value units across a KPI row** — `4.3%` / `3.4 pp` / `10%` / `4` side by side, each natively correct, row reads as mixed. Reformulate values (render both rates instead of a pp difference; express counts as proportions) so the value column ends in one suffix, not three. See *Value units are also a row-scope decision* above.
- **Favourability colour on a context-dependent metric with no reference** — colouring a spend-up delta orange (or blue) when the dashboard doesn't show a budget to compare against. Use neutral grey + direction glyph until a reference is added.
- **Favourability colour that reuses a categorical palette hue** — a blue `+3.7% vs 30 days ago` on a tile titled *Weekly active · Cursor*, where the dashboard has already bound blue to the `Cursor` series. The colour is now carrying two meanings (series identity + direction) and reads randomly across the KPI row. Fall back to neutral grey + direction glyph; see the favourability-collision rule above.
- **Duplicated fact in subtitle and delta line** — "Across 6 teams" and "6 teams · 13 avg" in the same tile. One fact, one place.
- **Unit-noun echoed from the tile title onto the number** — "Engineers" title with "80 engineers" as the value. The title already names the noun.

## See also

- [`gauge.md`](gauge.md) — when you also want visual comparison to a target
- [`sparkline.md`](sparkline.md) — inline trend context beneath a KPI number
- [`bullet.md`](bullet.md) — better than gauge for target-vs-actual-vs-bands
- [`grid.md`](grid.md) — when the reader needs several numbers, not one
- [`../craft/typography-and-labels.md`](../craft/typography-and-labels.md) — typography and sizing
- [`../dashboard/consistency.md`](../dashboard/consistency.md) — KPI-row delta-format rule and other cross-chart consistency
- [`../dashboard/kpi-row.md`](../dashboard/kpi-row.md) — before any tile is drafted: why these metrics, how many, what hierarchy, whether a strip should exist at all
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — "compared to what?" as an integrity rule
