import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import "../App.css";

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
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: "var(--font-weight-heading)",
            letterSpacing: "-0.02em",
          }}
        >
          Editing
        </h1>
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
          bodies, and prior assistant turns — without restarting the conversation. The composer's
          edit surface state is the shared mechanic; this page captures the intent and will host
          the worked specs as they land.
        </p>
      </header>

      <ComponentIntentPanel when={EDITING_WHEN} designIntent={EDITING_DESIGN_INTENT} />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div
        className="demo-preview-surface"
        role="region"
        aria-label="Editing — coming soon"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
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
            Worked specs for inline edit, artifact-body edit, and prior-turn edit will land here.
            For now, the composer's <code>surfaceState="edit"</code> on the{" "}
            <Link to="/composer" style={{ color: "#7a005d" }}>
              Composer
            </Link>{" "}
            page shows the shared chrome these flows build on.
          </p>
        </div>
      </div>
    </main>
  );
}
