import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { EditingPrototypeMock } from "../components/EditingPrototype";
import "../App.css";
import "./EditingPage.css";
import { FigmaLink } from "../components/FigmaLink";

const FIGMA_EDIT_PROTOTYPE =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=802-14409";

const EDITING_WHEN = [
  "The user wants to refine or correct AI-generated output without restarting the turn.",
  "The same edit surface is reused across messages, drafts, and artifact bodies.",
  "A change should feel reversible — the user can step back to the prior version.",
];

const EDITING_DESIGN_INTENT = [
  "Editing reuses the composer chrome — the same input the user already trusts.",
  "The edit context (artifact, draft, message) is named in a chip above the field, never inferred.",
  "Saving returns the user to the conversation; the edited surface becomes the new turn anchor.",
  "Discarding restores the prior version cleanly — no half-applied state.",
];

export function EditingPage() {
  const [protoVariant, setProtoVariant] = useState<"default" | "animated">("default");
  const [contentType, setContentType] = useState<"dashboards" | "forms">("dashboards");

  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Editing
        </p>
        <h1 className="page-doc-title">Editing</h1>
        <p
          style={{
            margin: "12px 0 0",
            maxWidth: 640,
            fontSize: 18,
            lineHeight: 1.55,
            color: "#716f6c",
          }}
        >
          Editing is the interaction pattern for refining AI output in place — drafts, artifact
          bodies, and prior assistant turns — without restarting the conversation. The composer&apos;s
          edit surface state is the shared mechanic; this page captures the intent and will host the
          worked specs as they land.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <FigmaLink href={FIGMA_EDIT_PROTOTYPE} />
        </p>
      </header>

      <ComponentIntentPanel when={EDITING_WHEN} designIntent={EDITING_DESIGN_INTENT} />

      <hr className="page-section__divider" aria-hidden="true" />

      <p className="editing-page__desc-text" style={{ marginBottom: 0 }}>
        Static prototype — mock Rippling Analytics page with dashboard editing chrome and Rippling AI.
        Compose from system pieces (<code>ChatToolbar</code>, <code>Composer</code> in edit surface mode,{" "}
        <code>RipplingArtifactShell</code>, <code>SimpleBarChartDemo</code>).
      </p>

      <div className="editing-page__example-bleed" aria-label="Editing prototype — full-width preview">
        <div className="editing-page__example-inner" data-content={contentType}>
          <div className="editing-page__example-header">
            <div className="editing-page__control-group">
              <p className="editing-page__control-label">Editing style</p>
              <div className="demo-segments" role="group" aria-label="Editing prototype variant">
                {(["default", "animated"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className="demo-segment"
                    aria-pressed={protoVariant === v}
                    onClick={() => setProtoVariant(v)}
                  >
                    {v === "default" ? "Default" : "Animated hat"}
                  </button>
                ))}
              </div>
            </div>

            <div className="editing-page__control-group">
              <p className="editing-page__control-label">Content type</p>
              <div className="demo-segments" role="group" aria-label="Prototype content">
                {(["dashboards", "forms"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="demo-segment"
                    aria-pressed={contentType === c}
                    onClick={() => setContentType(c)}
                  >
                    {c === "dashboards" ? "Dashboards" : "Forms"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <EditingPrototypeMock
            key={`${protoVariant}-${contentType}`}
            variant={protoVariant}
            contentType={contentType}
          />
        </div>
      </div>

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div
        className="demo-preview-surface demo-preview-surface--no-toolbar-divider"
        role="region"
        aria-label="Editing specs — supplementary detail"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 56,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: "var(--font-weight-emphasis)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#716f6c",
            }}
          >
            Coming soon
          </p>
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 16,
              lineHeight: 1.55,
              color: "#000000",
            }}
          >
            Worked interaction specs for inline edit, artifact-body edit, and prior-turn edit will stack
            here. The example above previews product framing only. For composer chrome variants, see the{" "}
            <Link to="/composer" style={{ color: "#7a005d" }}>
              Composer
            </Link>{" "}
            page (<code>surfaceState="edit"</code>).
          </p>
        </div>
      </div>
    </main>
  );
}
