import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArtifactHoverPageSettings,
  type ArtifactHoverVariant,
} from "../components/ArtifactHoverPageSettings";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import {
  InChatWidgetDemo,
  type InChatWidgetDemoMode,
  InChatWidgets,
} from "../components/InChatWidget";
import IN_CHAT_WIDGET_EXAMPLE_SOURCE from "../examples/InChatWidgetExample.tsx?raw";
import { Button, iconTypes } from "../pebbleButton";
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
  const [contextMode, setContextMode] = useState<InChatWidgetDemoMode>("side-chat");

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
        when={[
          "The assistant returns a structured output that belongs in the thread.",
          "The output may stay inline or expand into a larger artifact in product.",
        ]}
        designIntent={[
          "Preview the shape of the structured output without leaving the thread.",
          "Provide an entry point to the full artifact in product.",
          "Keep widgets compact so the conversation stays the primary read.",
        ]}
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

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

      <hr className="page-section__divider" aria-hidden="true" />

      <section
        className="in-context-stage"
        id="ic-artifacts-context"
        aria-labelledby="ic-artifacts-context-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="ic-artifacts-context-heading" className="in-context-stage__title">
              In context
            </h2>
            <p className="in-context-stage__lede">
              Every widget category embedded inside an assistant conversation — table, Rippling
              link, document, and dashboard — rendered as a side panel or a full-screen workspace.
              Toggle to compare placements.
            </p>
          </div>
          <div className="demo-segments" role="group" aria-label="In-chat widget surface mode">
            <Button
              type={Button.TYPES.BUTTON}
              appearance={contextMode === "side-chat" ? Button.APPEARANCES.PRIMARY : Button.APPEARANCES.OUTLINE}
              size={Button.SIZES.M}
              aria-pressed={contextMode === "side-chat"}
              onClick={() => setContextMode("side-chat")}
            >
              Side chat
            </Button>
            <Button
              type={Button.TYPES.BUTTON}
              appearance={contextMode === "full-screen" ? Button.APPEARANCES.PRIMARY : Button.APPEARANCES.OUTLINE}
              size={Button.SIZES.M}
              aria-pressed={contextMode === "full-screen"}
              onClick={() => setContextMode("full-screen")}
            >
              Full screen
            </Button>
          </div>
        </div>
        <InChatWidgetDemo mode={contextMode} />
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
            <Button
              type={Button.TYPES.BUTTON}
              appearance={copyAck ? Button.APPEARANCES.PRIMARY : Button.APPEARANCES.OUTLINE}
              icon={iconTypes.COPY_OUTLINE}
              size={Button.SIZES.M}
              onClick={async () => {
                await copyText(IN_CHAT_WIDGET_EXAMPLE_SOURCE);
                setCopyAck(true);
                window.setTimeout(() => setCopyAck(false), 2000);
              }}
            >
              {copyAck ? "Copied" : "Copy code"}
            </Button>
          </div>
        </div>
        <DemoHighlightedCode code={IN_CHAT_WIDGET_EXAMPLE_SOURCE} language="tsx" />
      </section>
    </main>
  );
}
