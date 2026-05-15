import { useState } from "react";
import { SpecPageHeader } from "../components/SpecPageHeader/SpecPageHeader";
import {
  ArtifactHoverPageSettings,
  type ArtifactHoverVariant,
} from "../components/ArtifactHoverPageSettings";
import { IconCopy } from "../components/Composer/icons";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import {
  InChatWidgets,
} from "../components/InChatWidget";
import IN_CHAT_WIDGET_EXAMPLE_SOURCE from "../examples/InChatWidgetExample.tsx?raw";
import { copyText } from "../utils/copyText";
import "../App.css";
import "../components/Links/Links.css";
import { FigmaLink } from "../components/FigmaLink";

const FIGMA_SECTION =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=885-17310";

export function InChatArtifactsPage() {
  const [hoverVariant, setHoverVariant] = useState<ArtifactHoverVariant>("shadow");
  const [copyAck, setCopyAck] = useState(false);
  const [widgetSelected, setWidgetSelected] = useState(false);

  return (
    <>
      <SpecPageHeader
        componentName="In-chat artifacts"
        specPath="/in-chat-artifacts"
        examplePath="/in-chat-artifacts/example"
      />
      <main className="demo-wrap" data-artifact-hover-style={hoverVariant}>
      <ArtifactHoverPageSettings variant={hoverVariant} onVariantChange={setHoverVariant} />
      <header style={{ marginBottom: 28 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Artifacts
        </p>
        <h1 className="page-doc-title">In-chat widget</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Structured outputs the assistant renders inside the conversation—entity cards, tables, confirmations,
          streaming blocks, and rich previews.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <FigmaLink href={FIGMA_SECTION} />
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
            margin: "0 0 16px",
            maxWidth: 640,
            fontSize: 15,
            lineHeight: 1.55,
            color: "#716f6c",
          }}
        >
          Standalone rows for each widget category—the Table pattern is the grid only (no title/Open strip like the link
          widgets). The side-chat example below embeds the same table.
        </p>
        <div className="demo-segments" role="group" aria-label="Widget state" style={{ marginBottom: 20 }}>
          <button
            type="button"
            className="demo-segment"
            aria-pressed={!widgetSelected}
            onClick={() => setWidgetSelected(false)}
          >
            Default
          </button>
          <button
            type="button"
            className="demo-segment"
            aria-pressed={widgetSelected}
            onClick={() => setWidgetSelected(true)}
          >
            Selected
          </button>
        </div>
        <InChatWidgets selected={widgetSelected} />
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
    </>
  );
}
