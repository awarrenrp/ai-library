import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { Disambiguation } from "../components/Disambiguation";
import type { DisambiguationInputType, DisambiguationOption } from "../components/Disambiguation";
import "../App.css";

const FIGMA_SPEC =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=182-7027";

const DISAMBIGUATION_WHEN =
  "When user input could mean more than one thing and a wrong guess is costly. Rippling AI resolves ambiguity from context and stated assumptions first, then asks a direct clarifying question only when needed—at most two questions, bundled when possible.";

const DISAMBIGUATION_DESIGN_INTENT =
  "In-thread popover that sits over the composer input to capture additional information from the user. Not meant to sit inside of the chat itself, or above the composer.\n\nDo: place on top of the composer\nDon't: place inside of the chat text";

const DEMO_OPTIONS: DisambiguationOption[] = [
  {
    id: "jl",
    title: "James Lee - Design",
    description: "UX/UI Designer, New York",
    label: "Engineering",
  },
  {
    id: "ps",
    title: "Priya Shah",
    description: "Product manager, San Francisco",
    label: "Product",
  },
  {
    id: "custom",
    title: "Something else",
    description: "Tell Rippling AI in your own words",
  },
];

export function DisambiguationPage() {
  const [inputType, setInputType] = useState<DisambiguationInputType>("radio");
  const [showStep, setShowStep] = useState(true);

  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Disambiguation
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>Disambiguation</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Clarifying UI when the model needs structured input to proceed—single or multi-select rows with optional
          metadata, bundled into at most two questions.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <a href={FIGMA_SPEC} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Figma · AI-components (Disambiguation)
          </a>
        </p>
      </header>

      <ComponentIntentPanel when={DISAMBIGUATION_WHEN} designIntent={DISAMBIGUATION_DESIGN_INTENT} />

      <div className="demo-toolbar" aria-label="Disambiguation preview controls">
        <div className="demo-group">
          <p className="demo-label" id="label-dis-input">
            Input type
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-dis-input">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={inputType === "radio"}
              onClick={() => setInputType("radio")}
            >
              Radio
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={inputType === "checkbox"}
              onClick={() => setInputType("checkbox")}
            >
              Checkbox
            </button>
          </div>
        </div>

        <div className="demo-group">
          <p className="demo-label" id="label-dis-step">
            Multi-step
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-dis-step">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={showStep}
              onClick={() => setShowStep(true)}
            >
              On
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={!showStep}
              onClick={() => setShowStep(false)}
            >
              Off
            </button>
          </div>
        </div>
      </div>

      <div className="demo-stage" role="region" aria-label="Disambiguation preview">
        <Disambiguation
          key={`${inputType}-${showStep}`}
          question={inputType === "radio" ? "Rich Single Selection" : "Rich Multi Selection"}
          subtitle={inputType === "radio" ? "Select one to continue" : "Select any that apply"}
          step={showStep ? { current: 1, total: 2 } : undefined}
          inputType={inputType}
          options={DEMO_OPTIONS}
        />
      </div>
    </main>
  );
}
