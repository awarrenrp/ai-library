import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArtifactHoverPageSettings,
  type ArtifactHoverVariant,
} from "../components/ArtifactHoverPageSettings";
import { WIDTH_PX } from "../components/Composer";
import type { ComposerWidth } from "../components/Composer";

/** Outer demo width — fixed-width tracks only; `"fill"` isn’t valid for the outer preview shell. */
type DemoOuterWidth = Exclude<ComposerWidth, "fill">;
import { IconCopy } from "../components/Composer/icons";
import type { ExternalFileKind } from "../components/ExternalArtifact";
import { ExternalFileArtifact } from "../components/ExternalArtifact";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import EXTERNAL_ARTIFACT_EXAMPLE_SOURCE from "../examples/ExternalArtifactExample.tsx?raw";
import { copyText } from "../utils/copyText";
import "../App.css";

const FILE_KINDS = ["ppt", "pdf", "xls", "doc"] as const satisfies readonly ExternalFileKind[];

const EXTERNAL_ARTIFACT_WHEN = [
  "The chat references content that lives outside Rippling — partner doc, embed, external app.",
  "The user needs to recognize the source before deep-linking out.",
];

const EXTERNAL_ARTIFACT_DESIGN_INTENT = [
  "File-type tag plus title sits at the row's leading edge for instant recognition.",
  "Hover state mirrors other artifact rows so external sources feel native to the thread.",
  "Click opens or deep-links to the source — Rippling stays the launching surface.",
];

const FILE_LABEL: Record<ExternalFileKind, string> = {
  ppt: "PowerPoint",
  pdf: "PDF",
  xls: "Excel",
  doc: "Docs",
};

export function ExternalArtifactsPage() {
  const [hoverVariant, setHoverVariant] = useState<ArtifactHoverVariant>("shadow");
  const [width, setWidth] = useState<DemoOuterWidth>("large");
  const [kind, setKind] = useState<ExternalFileKind>("ppt");
  const [copyAck, setCopyAck] = useState(false);

  /** Preview shell is 8px narrower than composer track so the file-type tag isn’t flush to the chrome edge. */
  const outerPx = WIDTH_PX[width] - 8;

  return (
    <main className="demo-wrap" data-artifact-hover-style={hoverVariant}>
      <ArtifactHoverPageSettings variant={hoverVariant} onVariantChange={setHoverVariant} />
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Artifacts
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>External artifacts</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Content pulled in or framed from outside Rippling—linked docs, embeds, partner apps, and previews where the
          user leaves or deep-links from the conversation.
        </p>
      </header>

      <ComponentIntentPanel
        when={EXTERNAL_ARTIFACT_WHEN}
        designIntent={EXTERNAL_ARTIFACT_DESIGN_INTENT}
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div
        className="demo-preview-surface demo-preview-surface--no-toolbar-divider"
        role="region"
        aria-label="External artifact interactive preview"
      >
      <div className="demo-toolbar" aria-label="External artifact preview controls">
        <div className="demo-group">
          <p className="demo-label" id="ea-label-width">
            Width
          </p>
          <div className="demo-segments" role="group" aria-labelledby="ea-label-width">
            {(["large", "medium", "small"] as const).map((w) => (
              <button
                key={w}
                type="button"
                className="demo-segment"
                aria-pressed={width === w}
                aria-label={`${w} width, ${WIDTH_PX[w]} pixels`}
                onClick={() => setWidth(w)}
              >
                {w.charAt(0).toUpperCase() + w.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-group">
          <p className="demo-label" id="ea-label-kind">
            File type
          </p>
          <div className="demo-segments" role="group" aria-labelledby="ea-label-kind">
            {FILE_KINDS.map((k) => (
              <button
                key={k}
                type="button"
                className="demo-segment"
                aria-pressed={kind === k}
                aria-label={`${FILE_LABEL[k]} row`}
                onClick={() => setKind(k)}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="demo-stage" role="region" aria-label="External artifact preview">
        <div
          style={{
            width: outerPx,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <ExternalFileArtifact kind={kind} layoutWidth={width} />
        </div>
      </div>

      <p className="demo-meta" aria-live="polite">
        Outer width <strong>{outerPx}px</strong> · <strong>{FILE_LABEL[kind]}</strong>
      </p>
      </div>

      <section
        className="demo-code-section"
        id="external-artifact-example"
        aria-labelledby="external-artifact-example-heading"
      >
        <div className="demo-code-section__top">
          <div>
            <h2 id="external-artifact-example-heading" className="demo-code-section__title">
              External artifact — implementation example
            </h2>
            <p className="demo-code-section__lede">
              Render <code>ExternalFileArtifact</code> in product as an assistant attachment row, or
              as a compact citation under a thread message. Paths below match the Rippling chat
              module.
            </p>
          </div>
          <div className="demo-segments" role="presentation">
            <button
              type="button"
              className={["demo-segment", "demo-code-copy-btn", copyAck ? "demo-code-copy-btn--active" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={async () => {
                await copyText(EXTERNAL_ARTIFACT_EXAMPLE_SOURCE);
                setCopyAck(true);
                window.setTimeout(() => setCopyAck(false), 2000);
              }}
            >
              <IconCopy className="demo-code-copy-btn__icon" />
              {copyAck ? "Copied" : "Copy code"}
            </button>
          </div>
        </div>
        <DemoHighlightedCode code={EXTERNAL_ARTIFACT_EXAMPLE_SOURCE} language="tsx" />
      </section>
    </main>
  );
}
