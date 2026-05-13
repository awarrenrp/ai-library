import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import "../App.css";

const TEXT_WHEN = [
  "The assistant returns a prose response — explanation, summary, or narrative.",
  "Content mixes formatting types: paragraphs, lists, headings, code, and inline emphasis.",
  "Streaming output renders progressively as tokens arrive.",
];

const TEXT_DESIGN_INTENT = [
  "Maximise readability at the widths chat surfaces use — side panel and full-screen.",
  "Establish a clear visual hierarchy so prose, lists, headings, and code never compete.",
  "Streaming state should feel smooth; avoid layout shifts as tokens land.",
];

const TEXT_DOS = [
  "Use the shared type scale and line-height tokens so text stays consistent across AI surfaces.",
  "Render markdown headings only when the response warrants real section structure.",
  "Preserve inline code formatting — monospace signals precision to technical users.",
];

const TEXT_DONTS = [
  "Apply heading styles to every bolded phrase — reserve H2/H3 for genuine sections.",
  "Truncate streaming responses mid-token; let a full word land before the cursor advances.",
  "Override the base font family or size inside AI response bodies.",
];

export function TextPage() {
  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Text
        </p>
        <h1 className="page-doc-title">
          Text <span aria-label="Work in progress" role="img">🚧</span>
        </h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Typography and formatting rules for AI-generated prose — paragraphs, headings, lists,
          inline code, and streaming render behaviour across Rippling AI surfaces.
        </p>
      </header>

      <ComponentIntentPanel
        when={TEXT_WHEN}
        designIntent={TEXT_DESIGN_INTENT}
        dos={TEXT_DOS}
        donts={TEXT_DONTS}
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div
        className="demo-preview-surface"
        role="region"
        aria-label="Text — under construction"
        style={{ padding: "48px 32px", textAlign: "center" }}
      >
        <p style={{ margin: 0, fontSize: 32, lineHeight: 1 }}>🚧</p>
        <p
          style={{
            margin: "16px 0 0",
            fontSize: 15,
            fontWeight: "var(--font-weight-emphasis)" as React.CSSProperties["fontWeight"],
            color: "#000000",
          }}
        >
          Specs in progress
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.55, color: "#716f6c", maxWidth: 400, marginInline: "auto" }}>
          Type scale, line-height tokens, markdown rendering rules, and streaming behaviour will be
          documented here.
        </p>
      </div>
    </main>
  );
}
