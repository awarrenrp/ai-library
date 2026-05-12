---
name: dashboard-kpi-row
description: Produce dashboard.kpi-row — the strip of single-value tiles at the top of most exec and ops dashboards. Before-any-tile reasoning — role with respect to the detail below, metric selection, count and hierarchy, whether the strip should exist at all.
governs: dashboard.kpi-row
consumes: strategic.mode, strategic.purpose, strategic.big-idea
---

# KPI row

Two of the five canonical archetypes in [`archetypes.md`](archetypes.md) start with a horizontal strip of `single-value` tiles at the top: **single-hero** (3–4 tiles flanking the hero) and **KPI strip + detail grid** (4–6 tiles spanning the width). Those two archetypes match the most common briefs — exec readouts and ops dashboards — so the strip is a frequent default. That frequency is a trap: the strip is easy to assemble from whatever metrics the team already tracks, and the construction rules (delta format, value format, tile alignment) catch *how* it's built but not *why these tiles exist at all*.

This file holds the **composition reasoning** for the KPI row as a dashboard-scope unit — decided before any tile is drafted. For per-tile mechanics, see [`../charts/single-value.md`](../charts/single-value.md). For row-scope unit consistency (delta format, value format, column scans), see [`consistency.md`](consistency.md).

## Four questions before drafting the tiles

Answer these at dashboard time, in order. Each has a default failure mode; skipping the question *is* the failure.

### 1. What is the strip's relationship to the detail below?

A KPI row plays exactly one of three roles with respect to the charts beneath it. The role determines the tile selection, the action titles, and whether the strip is even load-bearing.

- **Summary-of (most common).** The tiles are rolled-up answers to the questions the detail grid explores. The reader glances at the row for the headline; the grid exists to explain it. *Test:* every tile's number can be recomputed from the charts below. *Implication:* tiles and charts must share metric definitions and time windows — mismatches (strip on "last 30 days", grid on "QTD") make the strip silently wrong.
- **Context-for.** The tiles set stakes the charts inherit — "we are at $4.2M ARR, reviewing a 12-week freeze window; here is the detail of how we got here." The tiles answer *where are we standing*; the charts answer *what is moving*. *Test:* tile values don't change as the reader filters the detail grid (they are the population scope, not a derived view of it). *Implication:* context tiles belong outside the filter state; a filter bar that modifies them breaks the "context" read.
- **Unrelated snapshot.** The tiles answer a set of questions the detail grid doesn't touch — an ops dashboard whose strip carries SLA, incidents, and uptime while the grid shows unrelated capacity planning. *Test:* removing the strip leaves the grid coherent. *Implication:* if this is the role, the strip probably belongs on a different dashboard, or the dashboard is trying to be two dashboards.

**Common failure:** picking tiles without naming the role. The row ends up part summary, part context, part unrelated — readable tile-by-tile, incoherent as a strip. *Fix:* name the role in one sentence before choosing tiles; discard any tile that doesn't serve that role.

### 2. Why these metrics, and not others?

Most KPI strips ship "the metrics the team already tracks" rather than "the metrics this dashboard's question requires." The canonical smell: a strip that looks identical to the strip on last quarter's dashboard, on a different team, about a different question. Tiles chosen by habit, not by purpose.

Force a justification. For each candidate tile, answer in one sentence: **what question does this tile answer, and what would the dashboard be missing if it weren't there?** If the answer is "the team tracks it" or "it's on our other dashboards," the tile isn't earning its place.

Equally useful is the **exclusion test**: for each nearby metric the team tracks but that *isn't* in the strip, name the reason it's out. Two valid reasons:

- **Answered by a chart below.** Gross margin isn't a tile because the waterfall answers it in more detail.
- **Irrelevant to this dashboard's question.** Headcount isn't a tile because this is a revenue-quality readout, not a cost one.

"We just didn't include it" is not a valid reason. Either it belongs in the strip or it belongs in the conversation for why it was dropped.

### 3. What is the count, and what is the hierarchy inside the strip?

`archetypes.md` gives a range — 3–4 (single-hero) or 4–6 (KPI strip) — but not the reasoning for where to sit in that range. Two sub-questions:

- **Does the strip have its own internal hierarchy, or is it flat?** A flat strip — 4 peer tiles, same visual weight — reads as "here are the four things that matter, equally." A hierarchical strip — one hero tile at 2× the visual weight with 3 smaller tiles beside it — reads as "this one thing matters, and these three provide context." Pick by whether there *is* a lead metric. Common failure: giving four tiles equal weight when one of them is actually the answer; the reader can't tell which is the headline and ends up reading all four.
- **Does the count match the metric selection?** 4 is a comfortable scan; 6 begins to strain; 8+ is a wall of numbers the reader treats as a lookup table rather than a headline. If Q2's exclusion test left 7 tiles standing, the problem is usually that two are redundant (same metric at two granularities; actual and target of the same thing when one combined tile would do) or that the strip is trying to do a job `pivot-table` or `bullet` would do better.

### 4. Should the strip exist at all?

The question is not rhetorical. Within the exec/ops brief the strip default comes from, several layouts beat it:

- **One hero tile, no strip.** If the dashboard has one headline number (ARR, uptime, this-quarter attainment) and everything else decomposes it, a single `single-value` tile at hero size serves the headline better than diluting it across four tiles. Strip form signals "here are several equally-important numbers"; the dashboard's claim may be that *one* number matters.
- **Vertical `bullet` stack, no strip.** Many comparable indicators with targets (6–20 of them) want a bullet stack, not a strip. Bullets encode actual + target + bands in one horizontal unit; stacking them vertically lets the reader scan actuals down a common baseline. A strip of 6 single-value tiles with delta annotations approximates this poorly — see [`../charts/bullet.md`](../charts/bullet.md).
- **First chart is the headline.** If the top-left chart already carries the big idea (a line whose shape is the story, a waterfall whose net is the story), a strip above it buries the lede under small numbers. Let the chart take top-left and put supporting detail in tiles *below*, not above.
- **Nothing — the dashboard doesn't need one.** Small-multiples grid, narrative column, and master-detail archetypes generally don't take a strip. Don't staple one on because "exec dashboards have KPI rows."

*Test:* draft the dashboard without a strip. If the big idea still comes through, the strip wasn't load-bearing — and the tiles you were about to add were decoration.

## How the four questions compose

Q1 (role) frames Q2 (which metrics). Q2 (which metrics) constrains Q3 (count and hierarchy). Q3 (count and hierarchy) feeds back into Q4 (should it exist): if Q3 lands on "one hero and no clear peers," the answer to Q4 is often "no strip — just the hero."

A strip that passes all four questions reads as deliberate. A strip that skipped even one usually looks right tile-by-tile and wrong as a whole — which is the shape of the "why do all our dashboards have a KPI row?" complaint.

## Pre-ship check

Read down the row before shipping and answer aloud:

- **Role is named.** "This strip is the summary-of / context-for / unrelated-snapshot for the detail grid." If the sentence doesn't come out cleanly, re-do Q1.
- **Every tile has a justification.** One sentence per tile: the question it answers. No "the team tracks it."
- **Excluded metrics have a reason.** Answered by a chart; irrelevant to this dashboard. No "we just didn't include it."
- **Count fits the scan.** 3–6 tiles. If 7+, merge redundant tiles or switch form.
- **Hierarchy is intentional.** Flat (all peer) or hierarchical (one hero, rest context) — decided, not accidental.
- **Strip earns its place.** Drafting without it would lose the headline. If not, drop it.

Then run the construction-rule checks from [`consistency.md`](consistency.md): delta-column scan, value-column scan, tile-zone alignment.

## Things to avoid

- **Strip-by-default** — reaching for `single-value` tiles at the top because the archetype said so, without answering Q1–Q4.
- **Role mixing** — summary-of tiles and unrelated-snapshot tiles in the same strip; two roles read as one broken row.
- **Tile count by habit** — "four tiles because last quarter had four tiles." Let the metrics determine the count, not the slot.
- **Flat strip hiding a hero** — one tile is actually the answer; the others are context. Size it accordingly or promote it out of the strip.
- **Strip as lookup table** — 8+ tiles the reader scans as a data table rather than a headline. Switch to `pivot-table` or `bullet`.
- **Strip above a chart that already carries the big idea** — the first chart is the headline; the strip dilutes it.
- **Strip whose tiles silently disagree with the detail below** — different time windows, different filters, different metric definitions. Summary-of tiles must reconcile to the grid; context-for tiles must stand outside the filter state.

## See also

- [`archetypes.md`](archetypes.md) — which archetypes invoke a KPI row (and which don't)
- [`../charts/single-value.md`](../charts/single-value.md) — per-tile mechanics (label, value, delta, units, colour)
- [`consistency.md`](consistency.md) — row-scope unit consistency (delta-format, value-format, column scans)
- [`../charts/bullet.md`](../charts/bullet.md) — vertical stack alternative to a wide strip
- [`narrative.md`](narrative.md) — "compared to what?" on every KPI
- [`audience-purpose.md`](audience-purpose.md) — mode gates the archetype, which gates whether a strip appears
