---
name: design-process
description: Produce strategic units (audience, purpose, big-idea, mode) before any chart decision.
governs: strategic.audience, strategic.purpose, strategic.big-idea, strategic.mode
---

# Design process

Before any chart decision, answer three questions. Choice of chart type is downstream of these answers — getting the chart right while getting these wrong just produces an efficient misfire.

## 1. Who is the audience?

- Name a specific reader, not a generic stakeholder group. The decision-maker, the analyst, the exec, the ops lead — pick one.
- What do they already know about this data? What are their biases and stakes? What will they already trust, and what must be argued?
- What is their visualization literacy? Unfamiliar chart types (sunburst, sankey, even box plot) carry a tutorial tax. If the audience isn't fluent, either switch forms or annotate heavily.
- If you cannot name the audience, the request is underspecified — ask before designing.

## 2. What do they need to know or do?

Every dashboard should support a known action or decision. If you can't finish the sentence "after seeing this, the reader will know / decide / notice ___", the design has no target.

Draft a **big idea** — a single complete sentence that states the point of view and the stakes. Examples:

- *"Conversion from trial to paid has fallen for three straight quarters; we need to invest in onboarding."*
- *"The top five customers now account for 60% of revenue; concentration risk is material."*

If the answer is "give me a general overview," you're building an **exploratory** dashboard; if the answer is a specific story, you're building an **explanatory** one. Both are valid, but they demand different designs (see [`dashboard/audience-purpose.md`](dashboard/audience-purpose.md)).

## 3. What data supports the point?

Data comes *after* the point, not before. The question "what data do we have?" leads to dashboards that show everything and say nothing. The question "what data will make this point to this audience?" leads to dashboards that land.

- Include the minimum data required to make the point credible.
- Include relevant comparisons — the "compared to what?" that grounds every number. Prior period, target, peer, forecast.
- Include opposing or weakening data when the audience will reasonably ask. A one-sided case invites push-back.

## Three modes a dashboard can be in

These shape every later decision. Know which you're designing for:

- **Exploratory** — the reader is scanning for anomalies, answering their own evolving questions. Higher data density, more interactivity, lighter annotation. Filters matter.
- **Explanatory** — the reader is being walked to a conclusion. Lower density per view, strong action titles, directed emphasis, annotations that state the point.
- **Reference / ops** — the reader is doing lookup. Precision matters; tables often beat charts; the same layout every time so muscle memory carries.

## The 3-minute-story test

If you had three minutes to say what this dashboard says, in words only, what would you say? Write that down. It is the story the dashboard should tell. Anything in the dashboard that doesn't contribute to that story is a candidate for removal.

## Before → chart type

Only after the above do you pick a chart type. The pathway is:

1. Clarify audience, big idea, and mode (this skill).
2. Identify the *question* and the *data shape* the chart must answer — [`choose-chart/by-question.md`](choose-chart/by-question.md) and [`choose-chart/by-data-shape.md`](choose-chart/by-data-shape.md).
3. Apply the chart-specific recipe in `charts/`.

## Common failures this skill prevents

- Building "a sales dashboard" with every sales metric, no point of view, no action.
- Picking a chart type because it exists in the palette rather than because it answers the question.
- Over-designing an exploratory dashboard with action titles meant for explanation, or under-designing an explanatory one as if the reader will dig.

## See also

- [`dashboard/narrative.md`](dashboard/narrative.md) — turning the big idea into action titles and reading order
- [`dashboard/audience-purpose.md`](dashboard/audience-purpose.md) — exploratory vs explanatory vs reference, with design consequences
- [`choose-chart/by-question.md`](choose-chart/by-question.md) — what question is this chart answering?
