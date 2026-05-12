import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArtifactTray,
  ArtifactTrayDemo,
  type ArtifactTrayDemoMode,
  type ArtifactTrayItem,
} from "../components/ArtifactTray";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import { IconCopy } from "../components/Composer/icons";
import ARTIFACT_TRAY_EXAMPLE_SOURCE from "../examples/ArtifactTrayExample.tsx?raw";
import { IconFile, IconReport, IconWorkflow } from "../icons";
import { copyText } from "../utils/copyText";
import "../App.css";
import "./ArtifactTrayPage.css";

const FIGMA_URL =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=1076-18510";

const ARTIFACT_TRAY_WHEN =
  "A list of artifacts that have been generated within a single conversation, visible when the chat has created artifacts.";

const ARTIFACT_TRAY_DESIGN_INTENT = (
  <p>
    Consistent place on full screen and accessible by user initiation on side chat.
  </p>
);

const ARTIFACT_TRAY_DOS = [
  "Show the artifact tray when there is more than one AI-generated artifact.",
  "Allow the user to open the artifact (and open it on the left of the chat).",
];

const ARTIFACT_TRAY_DONTS = [
  "Show the tray for content the user has dropped into the conversation.",
  "Open the artifact on the right of the conversation\u2014keep the chat consistent.",
];

const DEMO_ITEMS: readonly ArtifactTrayItem[] = [
  { id: "workflow", title: "Workflow", icon: <IconWorkflow /> },
  { id: "policy-pdf", title: "New in-office policy.PDF", icon: <IconFile /> },
  { id: "attendance", title: "Office attendance", icon: <IconReport /> },
];

export function ArtifactTrayPage() {
  const [state, setState] = useState<"default" | "hover">("default");
  const [contextMode, setContextMode] = useState<ArtifactTrayDemoMode>("side-chat");
  const [copyAck, setCopyAck] = useState(false);

  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Artifact tray
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: "var(--font-weight-heading)",
            letterSpacing: "-0.02em",
          }}
        >
          Artifact tray <span aria-label="Work in progress" role="img">🚧</span>
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
          A compact recall surface for AI artifacts—reports, dashboards, workflows, and pinned
          outputs—so users can jump back into them without leaving the conversation.
        </p>
        <p
          style={{
            margin: "12px 0 0",
            maxWidth: 640,
            fontSize: 14,
            lineHeight: 1.5,
            color: "#716f6c",
          }}
        >
          <a href={FIGMA_URL} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Figma · AI-components / Artifact tray (1076:18510)
          </a>
        </p>
      </header>

      <ComponentIntentPanel
        when={ARTIFACT_TRAY_WHEN}
        designIntent={ARTIFACT_TRAY_DESIGN_INTENT}
        dos={ARTIFACT_TRAY_DOS}
        donts={ARTIFACT_TRAY_DONTS}
      />

      <div
        className="demo-preview-surface demo-preview-surface--no-toolbar-divider"
        role="region"
        aria-label="Artifact tray interactive preview"
      >
        <div className="demo-toolbar" aria-label="Artifact tray preview controls">
          <div className="demo-group">
            <p className="demo-label" id="label-tray-state">
              State
            </p>
            <div
              className="demo-segments"
              role="group"
              aria-labelledby="label-tray-state"
            >
              <button
                type="button"
                className="demo-segment"
                aria-pressed={state === "default"}
                aria-label="Default state, no row hovered"
                onClick={() => setState("default")}
              >
                Default
              </button>
              <button
                type="button"
                className="demo-segment"
                aria-pressed={state === "hover"}
                aria-label="Hover state, first row hovered"
                onClick={() => setState("hover")}
              >
                Hover
              </button>
            </div>
          </div>
        </div>

        <div
          className="demo-stage artifact-tray-stage"
          role="region"
          aria-label="Artifact tray preview"
        >
          <ArtifactTray
            items={DEMO_ITEMS}
            state={state}
            hoveredId={state === "hover" ? DEMO_ITEMS[0]!.id : undefined}
          />
        </div>

        <p className="demo-meta" aria-live="polite">
          Card <strong>260×170</strong> · 1px stroke <strong>#000 @ 10%</strong> · Row hover bg{" "}
          <strong>#000 @ 10%</strong> · State{" "}
          <strong>{state === "default" ? "Default" : "Hover"}</strong>
        </p>
      </div>

      <section
        className="artifact-tray-context"
        aria-labelledby="artifact-tray-context-heading"
      >
        <div className="artifact-tray-context__head">
          <div>
            <h2 id="artifact-tray-context-heading" className="artifact-tray-context__title">
              In context
            </h2>
            <p className="artifact-tray-context__lede">
              The tray is accessible by user initiation in side chat and sits in a consistent place
              on full screen. Toggle between modes to compare placement.
            </p>
          </div>
          <div
            className="demo-segments"
            role="group"
            aria-label="Artifact tray mode"
          >
            <button
              type="button"
              className="demo-segment"
              aria-pressed={contextMode === "side-chat"}
              onClick={() => setContextMode("side-chat")}
            >
              Side chat
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={contextMode === "full-screen"}
              onClick={() => setContextMode("full-screen")}
            >
              Full screen
            </button>
          </div>
        </div>
        <ArtifactTrayDemo mode={contextMode} />
        <p className="demo-meta" aria-live="polite">
          Mode{" "}
          <strong>{contextMode === "side-chat" ? "Side chat" : "Full screen"}</strong>
        </p>
      </section>

      <section
        className="demo-code-section"
        id="artifact-tray-example"
        aria-labelledby="artifact-tray-example-heading"
      >
        <div className="demo-code-section__top">
          <div>
            <h2 id="artifact-tray-example-heading" className="demo-code-section__title">
              Artifact tray — implementation example
            </h2>
            <p className="demo-code-section__lede">
              Source is rendered live from{" "}
              <code>src/examples/ArtifactTrayExample.tsx</code> via Vite{" "}
              <code>?raw</code>, so the snippet is type-checked at build time and stays in sync
              with the rendered demo.
            </p>
          </div>
          <div className="demo-segments" role="presentation">
            <button
              type="button"
              className={[
                "demo-segment",
                "demo-code-copy-btn",
                copyAck ? "demo-code-copy-btn--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={async () => {
                const ok = await copyText(ARTIFACT_TRAY_EXAMPLE_SOURCE);
                if (ok) {
                  setCopyAck(true);
                  window.setTimeout(() => setCopyAck(false), 2000);
                }
              }}
            >
              <IconCopy className="demo-code-copy-btn__icon" />
              {copyAck ? "Copied" : "Copy code"}
            </button>
          </div>
        </div>
        <DemoHighlightedCode code={ARTIFACT_TRAY_EXAMPLE_SOURCE} language="tsx" />
      </section>
    </main>
  );
}
