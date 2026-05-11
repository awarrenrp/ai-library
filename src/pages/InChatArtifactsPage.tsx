import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { InChatWidgets } from "../components/InChatWidget";
import "../App.css";

export function InChatArtifactsPage() {
  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 28 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Artifacts
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>In-chat widget</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Structured outputs the assistant renders inside the conversation—entity cards, tables, confirmations,
          streaming blocks, and rich previews.
        </p>
      </header>

      <ComponentIntentPanel
        when="A lightweight structured output inside the conversation. It may stay inline or become an entry point into a larger artifact."
        designIntent="Link to in-product output, with structural preview."
      />

      <InChatWidgets />
    </main>
  );
}
