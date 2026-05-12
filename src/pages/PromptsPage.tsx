import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { Prompt } from "../components/Prompt";
import type { PromptSurface } from "../components/Prompt";
import "../App.css";

const PROMPTS_WHEN = [
  "Rippling surfaces personalized prompts the user can pick instead of typing.",
  "The tile previews what the prompt will send before the user commits.",
];

const PROMPTS_DESIGN_INTENT = [
  "Title leads — concise and scannable in a tile row.",
  "Description (optional) explains the prompt in about two lines; never truncates mid-thought.",
  "Subtext (optional) labels persona or audience (role, team).",
  "Outline reads well on neutral surfaces; filled reads as emphasized cards.",
];

const SAMPLE_DESCRIPTION =
  "Short description of what the personalized prompt does. Keep the text within two lines so it does not truncate awkwardly.";

export function PromptsPage() {
  const [surface, setSurface] = useState<PromptSurface>("outline");
  const [subtextOn, setSubtextOn] = useState(true);

  const subtext = subtextOn ? "Product designer" : undefined;

  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Prompts
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>Prompts</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Personalized prompts give users quick ways to start or steer AI conversations. Each tile shows a title, an
          optional short description (about two lines), and optional subtext such as persona or role—matching the prompt
          patterns in the AI-components library.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 16, lineHeight: 1.5, color: "#716f6c" }}>
          Use the controls below to preview outline versus filled surfaces and to toggle optional subtext on the samples.
        </p>
      </header>

      <ComponentIntentPanel when={PROMPTS_WHEN} designIntent={PROMPTS_DESIGN_INTENT} />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div className="demo-preview-surface" role="region" aria-label="Prompt interactive preview">
      <div className="demo-toolbar" aria-label="Prompt preview controls">
        <div className="demo-group">
          <p className="demo-label" id="label-prompt-surface">
            Surface
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-prompt-surface">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={surface === "outline"}
              onClick={() => setSurface("outline")}
            >
              Outlined
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={surface === "filled"}
              onClick={() => setSurface("filled")}
            >
              Filled
            </button>
          </div>
        </div>

        <div className="demo-group">
          <p className="demo-label" id="label-prompt-subtext">
            Subtext
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-prompt-subtext">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={subtextOn}
              onClick={() => setSubtextOn(true)}
            >
              On
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={!subtextOn}
              onClick={() => setSubtextOn(false)}
            >
              Off
            </button>
          </div>
        </div>
      </div>

      <div
        className="demo-stage"
        role="region"
        aria-label="Prompt preview"
        style={{ flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}
      >
        <Prompt
          title="Look up your favorite coworker"
          description={SAMPLE_DESCRIPTION}
          subtext={subtext}
          surface={surface}
        />
        <Prompt title="Draft candidate feedback" surface={surface} />
      </div>

      <p className="demo-meta" aria-live="polite">
        Max width <strong>320px</strong> · Surface{" "}
        <strong>{surface === "outline" ? "Outlined" : "Filled"}</strong> · Subtext{" "}
        <strong>{subtextOn ? "On" : "Off"}</strong>
      </p>
      </div>
    </main>
  );
}
