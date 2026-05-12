---
name: dashboard-narrative
description: Produce dashboard narrative (action titles, horizontal/vertical logic, 3-minute-story test). Load when mode is explanatory.
governs: dashboard.narrative, chart.title (action-title voice)
consumes: strategic.big-idea, strategic.purpose
---

# Dashboard narrative

A dashboard that merely displays data is a reference tool. A dashboard that communicates tells a story — it has a point of view, it argues it, and it ends with a call to action. This skill is about the second mode. For reference dashboards, use it sparingly; see [`audience-purpose.md`](audience-purpose.md) for when each mode fits.

## The "big idea" drives every choice

Before laying out a single chart, the explanatory dashboard needs a **big idea** — one complete sentence that states the point of view and the stakes. Examples:

- *"Trial-to-paid conversion has fallen for three straight quarters; onboarding investment is the highest-leverage fix."*
- *"Enterprise churn is concentrated in accounts under $50K ARR; upmarket focus is working and we should accelerate it."*
- *"Customer acquisition cost has doubled while payback period has barely moved; efficiency, not growth, is the 2026 priority."*

A big idea is:

- **Complete sentence.** Not a phrase, not a title. Subject, verb, stakes.
- **Opinionated.** It takes a position the reader could disagree with. "Revenue is $X" is not a big idea; "Revenue growth has stalled and we need to act" is.
- **Stakes-bearing.** The reader learns what happens if nothing changes, or what becomes possible if it does.

If you cannot write the big idea in one sentence, the dashboard has no story yet. Go back to [`../01-design-process.md`](../01-design-process.md).

## Action titles on every chart

The single highest-leverage storytelling technique: **every chart's title states the insight, not the topic**.

| Descriptive title (bad) | Action title (good) |
|---|---|
| Revenue by quarter | Revenue fell 8% QoQ driven by enterprise churn |
| Customers by segment | SMB now accounts for 62% of customers, up from 41% in 2024 |
| Conversion funnel | Trial-to-paid conversion stalls at the activation step |
| Headcount by department | Engineering grew 40%; G&A grew 2% — we hired where we said we would |
| NPS over time | NPS recovered to +32 after the April product launch |

Rules for writing action titles:

- **One sentence.** If it runs to two, cut.
- **Specific number in the title.** "Revenue fell 8%" is load-bearing; "Revenue fell" is weak.
- **The title and the chart say the same thing.** If the chart shows a rise but the title says "concerning decline," one of them is wrong — usually the chart needs different framing or the title needs re-writing.
- **The title is the takeaway the author wants remembered.** Assume the reader glances at titles only — can they still reconstruct the story?
- **Active voice, present tense.** "Enterprise churn doubled" beats "There was a doubling in enterprise churn."

The descriptive title ("Revenue by quarter") belongs in an exploratory or reference dashboard where the author hasn't yet formed an interpretation — or where the reader is expected to form their own. See [`audience-purpose.md`](audience-purpose.md).

## Horizontal logic — titles in order tell the story

**Horizontal logic test**: read only the chart titles, in order, top-to-bottom, left-to-right. Do they tell the overarching story on their own?

Example (good horizontal logic):

1. "Revenue growth has decelerated every quarter in 2025"
2. "The slowdown is entirely driven by the enterprise segment"
3. "Enterprise churn has nearly doubled since Q1"
4. "Churn is concentrated in customers acquired via partnership channel"
5. "We recommend pausing partnership investment and doubling down on direct sales"

Any reader who reads only those five titles has received the dashboard's entire argument. The charts are evidence; the titles are the claim.

Example (bad horizontal logic):

1. "Revenue by quarter"
2. "Customers by region"
3. "NPS trend"
4. "Sales by product line"
5. "Headcount"

Titles recite topics, not insights. A reader who skims gets nothing.

**Run this test on every explanatory dashboard.** If the titles don't narrate the story when read in sequence, either reorder the charts or rewrite the titles — or both.

## Vertical logic — each chart reinforces its title

**Vertical logic test**: for each chart, does the content of the chart directly support the title? Do the chart, the title, and any annotations all say the same thing?

Common vertical-logic failures:

- Title says "Enterprise churn doubled" but the chart is a stacked bar showing all segments, with enterprise as one slice the reader has to hunt for.
- Title says "Growth decelerated every quarter" but the chart shows raw revenue, not growth rate — the reader has to compute the deceleration mentally.
- Title says "April launch drove NPS recovery" but there is no vertical reference line or annotation marking April on the chart.

The fix: every action title implies a specific visual treatment. "X fell" implies a chart where the fall is the most visible feature — often meaning zoom in on the relevant period, emphasize the relevant series, mute everything else. If the title makes a claim about a specific point in time, annotate that point on the chart.

## "Compared to what?"

The most useful question: every metric on the dashboard should answer *compared to what?* A single number floating in isolation is nearly always misleading. Attach context:

- **Prior period** — "vs. last quarter: +12%"
- **Target / plan** — "plan was $4.2M; actual was $3.9M"
- **Forecast** — "forecast was $3.8M; actual beat by 3%"
- **Peer or benchmark** — "industry median: 24%; we are at 31%"
- **Year-ago** — "same quarter last year: $3.1M"

This is especially critical on **single-value tiles**: a bare "$3.9M" tells the reader almost nothing. "$3.9M — 8% below plan, recovering from Q2 trough" tells the story. Use a small delta indicator, a comparison line, a target mark, or a sparkline — whichever fits the space.

Operational rules:

- **Every KPI tile has a comparison.** If there is space, two: prior period AND target.
- **Time-series charts get a reference line** for target, prior-year baseline, or forecast when relevant.
- **Bar charts of "actual" against "plan"** should show both directly, not require the reader to remember last month's plan number.
- **Mark structural breaks** — product launch, pricing change, methodology change — with a vertical reference line and a one-line annotation. Without them, the reader misattributes cause.

## Reading order IS the story

The order of charts on a dashboard is the **sequence of the argument**. It is not arbitrary. The reader's eye will traverse the dashboard in the Z-pattern (see [`structure.md`](structure.md)); that traversal should carry them through the narrative.

A robust explanatory structure:

1. **Context / situation** — top-left. Where are we, how are we doing overall. Often a hero single-value tile or a headline time-series.
2. **The key insight** — adjacent to the context, often occupying hero real estate. This is the big idea made visual.
3. **Supporting detail / evidence** — middle of the dashboard. Break down the insight — by segment, by channel, by cohort. Each tile reinforces one dimension of the claim.
4. **Recommendation / action** — bottom or a final callout. "Given the above, we should…" A dashboard that ends without a recommendation asks the reader to infer one; that rarely goes well.

Three-act adaptation: **setup → conflict → resolution**. The setup is the context. The conflict is the problem the dashboard exposes. The resolution is the recommended action.

## Annotation as narrative

Annotations put the narrative directly on the chart rather than leaving it to a separate comment field the reader may ignore.

- **On-chart text callouts** for the most important points — "April launch," "pricing change," "cohort of concern."
- **Reference lines** for targets, forecasts, prior-year baselines.
- **Highlighted series** — the series the title is about should be the bold-colored one; everything else muted grey.
- **Shaded regions** for periods that need context — recessions, product pauses, data outages.

Annotations are data-ink when they carry narrative weight. They are chartjunk when they repeat what is already obvious from the chart.

## Narrative intensity varies with purpose

Not every dashboard should narrate heavily.

- **Explanatory dashboards** (board deck, exec readout, quarterly review): heavy narrative. Action titles, annotations, recommendations, clear reading order.
- **Exploratory dashboards** (analyst tools, weekly ops review): light narrative. Descriptive titles, section headers, consistent design, light annotation. The reader forms their own action titles as they explore.
- **Reference dashboards** (ops monitoring, finance lookup): minimal narrative. The dashboard is a tool, not an argument. Section headers and clear column labels suffice.

Putting explanatory action titles on an exploratory or reference dashboard reads as opinion — the reader wants neutral data and you are editorializing. Putting descriptive titles on an explanatory dashboard wastes the most valuable real estate on the canvas. See [`audience-purpose.md`](audience-purpose.md).

## The 3-minute-story test

If you had three minutes, in words only, to tell someone what this dashboard says, what would you say?

Write it down. That is the story the dashboard must tell. Now check:

- Does the big idea appear in that 3-minute story? It should be one or two sentences of it.
- Are the five key supporting facts in that story each visible on the dashboard?
- Is anything in the 3-minute story *not* on the dashboard? That's a gap.
- Is anything on the dashboard *not* in the 3-minute story? That's a candidate for removal.

This test, done seriously, kills more charts than it keeps. That's the point.

## Repetition — the "bing, bang, bongo" pattern

Tell them what you're going to tell them, tell them, tell them what you told them.

- **Bing** (top of dashboard) — the headline. A hero single-value tile or short paragraph: "Revenue grew 14% YoY, but the engine shifted from enterprise to SMB."
- **Bang** (middle) — the evidence. The breakdowns, trends, cohort analyses that substantiate the headline.
- **Bongo** (bottom) — the recap and recommendation. "The shift reflects product-market fit in SMB; we recommend reallocating sales investment."

Repetition is not redundancy when the three instances play different roles — claim, argument, conclusion. A reader who reads only the headline still leaves with the core claim. A reader who reads the middle builds understanding. A reader who reads the conclusion knows what to do.

## Repetition vs. restatement — tell once, show once

Bing-bang-bongo is repetition *as rhythm*: same story told three times at three scales, each instance playing a different role (claim, evidence, conclusion). That repetition is earned.

Restatement is different, and it is not earned. Restatement is the same fact stated in the same voice in two adjacent locations. Common varieties on a dashboard:

- The page header subtitle says *"Outstanding performers receive 3.4 pp more merit than Meets"* while a KPI tile right below it is already showing *"3.4 pp"* as its value.
- A chart subtitle says *"dashed line = overall median (4.0%)"* while the dashed line on the chart itself carries a direct label *"company median 4.0%."*
- The header subtitle lists flagged departments in prose — *"Customer Success, Marketing, Finance, and L5 Director"* — while the heatmap below paints exactly those rows orange.
- An action title asserts the big idea and a callout on the same chart asserts the same big idea in bold.

None of those pairs plays a different role at a different scale. They say the same thing twice in nearly the same place, in the same voice. The reader reads both, gets no new information on the second pass, and the aggregate text mass makes the dashboard feel dense without being more informative.

### The rule: one fact, one place

A fact that the reader can see in a chart, a KPI tile, or an in-plot annotation does not need a second prose instance nearby. A fact that needs a prose instance doesn't also need an in-plot annotation.

This is the text-economy analog of the data-ink rule: every text element earns its place by carrying a fact not visible elsewhere in the immediate viewing area. Text that restates an adjacent visual is ink that doesn't encode anything the reader can't already see — chartjunk made of words.

### The thumb test

Cover any text block on the dashboard with your thumb. If the remaining visuals still carry the fact the text stated, the text was restatement and is a candidate for deletion. If the reader loses the fact, the text was earning its place. Apply to:

- Every chart subtitle
- The page header subtitle
- Every in-chart annotation or callout
- Every KPI tile subtitle or unit-noun line

### What each text slot is actually for

Confusion between "narrating the dashboard" and "providing context the dashboard doesn't show" is the root of most restatement. The fix is to give each text slot a specific job:

- **Page header subtitle** — population / scope (`600 employees, 2026 cycle`), time window, snapshot date, data cutoff, methodology, audience context (`prepared for comp committee`). **Not** a prose summary of the KPI row and the charts beneath — that's narration the visuals are already doing.
- **Chart subtitle** — axis / unit / window context the chart doesn't self-label (`as of 22 Apr 2026`, `log scale`, `indexed to Jan 2024 = 100`, `excludes enterprise`) plus tutorial glosses for chart forms the audience may not be fluent in (`box = middle 50%, line = median` on a box plot for a non-analyst audience — see [`../charts/box-plot.md`](../charts/box-plot.md)). **Not** a description of an annotation already drawn in-plot.
- **Action title** — the one-sentence takeaway the reader gets if they only read titles. Carries the claim. Pairs with at most one callout that *localizes* the claim to a specific mark — not a second callout that restates it.
- **In-chart annotation** — localizes the title's claim to the anchor mark ("April launch," "-30% vs Q2 here"). Drops when the title already names the mark position and no additional localization is needed.
- **KPI tile subtitle and delta line** — different facts per [`../charts/single-value.md`](../charts/single-value.md) *No duplicated facts across subtitle and delta line*. The subtitle gives the comparison anchor; the delta gives the magnitude against that anchor. Not the same fact twice.

### When a flagged list belongs in prose, and when it doesn't

The boundary case worth naming: *"Customer Success, Marketing, Finance and L5 Director show under 2 pp of differentiation"* in the header subtitle. Two factors decide whether this is narration or restatement:

- **If the chart below shows which rows are flagged** (orange labels, row outline, accent fill) and the reader will reach the chart — the list is restatement. Point to the chart ("flagged rows in the department heatmap"); don't spell out the names.
- **If no chart on the dashboard visibly marks the flagged rows** — e.g., the flag is only carried by the count-tile number "4 slices" — the names belong somewhere, and the subtitle is a reasonable place. But then the correct move is usually to *add* the marks to the chart, not to *keep* the list in prose. The names belong next to the cells, not in a paragraph.

Restatement is often a symptom of a chart that isn't pulling its weight. Fix the chart before duplicating its job in words.

## Chart choice follows narrative

Action-title narrative often dictates the best chart from the palette:

- "X grew by Y% over Z period" → `line` with annotated endpoints, or `combination` with bars and a growth-rate line.
- "X is concentrated in Y" → `horizontal-bar` sorted by value with the concentrated category accented.
- "X dropped off at step Y" → `funnel`.
- "X vs target" → `single-value` with a target reference, or `bar` with a target line.
- "X and Y are correlated" → `scatter` with a trend line.
- "X made up N% of the total" → `horizontal-bar` of parts sorted, or `donut` with 2–3 slices if truly part-to-whole.
- "X trend across many categories" → `grid` of small multiples.

If the chart type doesn't support the action title, the wrong chart is chosen. Example: an action title "SMB grew faster than enterprise" on a stacked bar of totals is a mismatch — the reader can't see the rates. Switch to an indexed line or a growth-rate combination.

## Checklist before shipping a narrative dashboard

- Big idea is written as a single complete sentence somewhere the team can see it.
- Every chart title is an action title stating the insight, not the topic.
- Horizontal logic test passes: titles read in order tell the story.
- Vertical logic test passes: each chart's content reinforces its title.
- Every metric answers "compared to what?" — target, prior period, forecast, peer.
- Structural events (launches, methodology changes) are annotated on the relevant charts.
- Reading order flows context → insight → evidence → action.
- 3-minute-story test passes: the dashboard tells the intended story, with no gaps and no off-topic content.
- Color and emphasis direct the eye to the series the title is about.
- **Thumb test passes** on every text block: cover the header subtitle, chart subtitles, callouts, and KPI subtitle lines one at a time — if the visuals still carry the fact, the text was restatement. Delete it. See *Repetition vs. restatement*.

## Things to avoid

- **Opinion-free titles on an opinionated dashboard.** "Revenue by quarter" on a board deck wastes the slot.
- **Titles that don't match the chart.** If the title says "growth accelerated" and the chart line is flat, something is broken — often you're using the wrong metric.
- **Orphan metrics.** Every number needs a comparison.
- **Buried recommendations.** The "what should we do" shouldn't be the last tile nobody scrolls to. Put it in a visually prominent place or include it in the headline.
- **Decorative annotation.** If the annotation doesn't change how the reader interprets the chart, it is chartjunk.
- **Narrative on exploratory dashboards.** Let the analyst find their own story; overly-editorialized exploratory views feel leading.
- **Header subtitle that narrates the KPI row.** Restating "3.4 pp gap" or listing the flagged departments in prose when the tiles and charts below already show both. The subtitle is for context the dashboard doesn't render — scope, time window, snapshot date, methodology — not a prose recap of the visuals. See *Repetition vs. restatement*.
- **Chart subtitle that legends an in-plot annotation.** "dashed line = overall median (4.0%)" while the dashed line on the chart is already labeled "company median 4.0%." Pick one location — the closer-to-the-data instance usually wins — and drop the other.
- **Text-heavy dashboards that narrate what the visuals already show.** If the text could be deleted without the reader losing information, the visuals are doing the job and the text is noise.

## See also

- [`../01-design-process.md`](../01-design-process.md) — big-idea framing and the 3-minute-story test
- [`structure.md`](structure.md) — reading order as spatial sequence
- [`audience-purpose.md`](audience-purpose.md) — when to narrate heavily vs lightly
- [`../craft/annotations.md`](../craft/annotations.md) — per-chart annotation patterns
- [`../charts/single-value.md`](../charts/single-value.md) — "compared to what?" on KPI tiles
- [`../02-graphical-integrity.md`](../02-graphical-integrity.md) — honest comparisons and reference lines
