import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArtifactHoverPageSettings,
  type ArtifactHoverVariant,
} from "../components/ArtifactHoverPageSettings";
import { IconCopy } from "../components/Composer/icons";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import { InChatWidgetDemo, InChatWidgets } from "../components/InChatWidget";
import IN_CHAT_WIDGET_EXAMPLE_SOURCE from "../examples/InChatWidgetExample.tsx?raw";
import { copyText } from "../utils/copyText";
import "../App.css";
import "../components/Links/Links.css";

const FIGMA_SECTION =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=885-17310";

const FIGMA_TABLE_PREVIEW =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=883-13314";

export function InChatArtifactsPage() {
  const [hoverVariant, setHoverVariant] = useState<ArtifactHoverVariant>("shadow");
  const [copyAck, setCopyAck] = useState(false);

  return (
    <main className="demo-wrap" data-artifact-hover-style={hoverVariant}>
      <ArtifactHoverPageSettings variant={hoverVariant} onVariantChange={setHoverVariant} />
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 28 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Artifacts
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>
          In-chat widget
        </h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Structured outputs the assistant renders inside the conversation—entity cards, tables, confirmations,
          streaming blocks, and rich previews.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <a href={FIGMA_SECTION} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Figma · AI-components (In-chat artifacts)
          </a>
          {" · "}
          <a href={FIGMA_TABLE_PREVIEW} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Table preview (883:13314)
          </a>
        </p>
      </header>

      <ComponentIntentPanel
        when="A lightweight structured output inside the conversation. It may stay inline or become an entry point into a larger artifact."
        designIntent="Link to in-product output, with structural preview."
      />

      <nav className="links-spec-toc" aria-label="On this page">
        <p className="links-spec-toc-label">On this page</p>
        <ul className="links-spec-toc-list">
          <li>
            <a href="#ic-artifacts-widgets">Widget previews</a>
          </li>
        </ul>
      </nav>

      <section className="links-spec-section" id="ic-artifacts-widgets" aria-labelledby="ic-artifacts-widgets-heading">
        <h2
          id="ic-artifacts-widgets-heading"
          style={{
            margin: "0 0 8px",
            fontSize: 18,
            fontWeight: "var(--font-weight-heading)",
            letterSpacing: "-0.02em",
            color: "#000000",
          }}
        >
          Widget previews
        </h2>
        <p
          style={{
            margin: "0 0 24px",
            maxWidth: 640,
            fontSize: 15,
            lineHeight: 1.55,
            color: "#716f6c",
          }}
        >
          Standalone rows for each widget category—the Table pattern is the grid only (no title/Open strip like the link
          widgets). The side-chat example below embeds the same table.
        </p>
        <InChatWidgets />
      </section>

      <section className="links-spec-section" id="ic-artifacts-context" aria-label="In-chat widget in side chat">
        <div className="links-spec-surface">
          <InChatWidgetDemo />
        </div>
      </section>

      <section
        className="demo-code-section"
        id="in-chat-widget-example"
        aria-labelledby="in-chat-widget-example-heading"
      >
        <div className="demo-code-section__top">
          <div>
            <h2 id="in-chat-widget-example-heading" className="demo-code-section__title">
              In-chat widgets — implementation example
            </h2>
            <p className="demo-code-section__lede">
              Compose link-style widgets (<code>InChatLinkWidget</code>) and the table widget
              (<code>InChatTableWidget</code>) inside an assistant turn. The same primitives back
              the spec previews above.
            </p>
          </div>
          <div className="demo-segments" role="presentation">
            <button
              type="button"
              className={["demo-segment", "demo-code-copy-btn", copyAck ? "demo-code-copy-btn--active" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={async () => {
                await copyText(IN_CHAT_WIDGET_EXAMPLE_SOURCE);
                setCopyAck(true);
                window.setTimeout(() => setCopyAck(false), 2000);
              }}
            >
              <IconCopy className="demo-code-copy-btn__icon" />
              {copyAck ? "Copied" : "Copy code"}
            </button>
          </div>
        </div>
        <DemoHighlightedCode code={IN_CHAT_WIDGET_EXAMPLE_SOURCE} language="tsx" />
      </section>
    </main>
  );
}
