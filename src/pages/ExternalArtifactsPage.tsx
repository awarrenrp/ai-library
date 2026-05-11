import { useState } from "react";
import { Link } from "react-router-dom";
import { WIDTH_PX } from "../components/Composer";
import type { ComposerWidth } from "../components/Composer";
import type { ExternalFileKind } from "../components/ExternalArtifact";
import { ExternalFileArtifact } from "../components/ExternalArtifact";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import "../App.css";

const FILE_KINDS = ["ppt", "pdf", "xls", "doc"] as const satisfies readonly ExternalFileKind[];

const FILE_LABEL: Record<ExternalFileKind, string> = {
  ppt: "PowerPoint",
  pdf: "PDF",
  xls: "Excel",
  doc: "Docs",
};

export function ExternalArtifactsPage() {
  const [width, setWidth] = useState<ComposerWidth>("large");
  const [kind, setKind] = useState<ExternalFileKind>("ppt");

  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Artifacts
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}>External artifacts</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Content pulled in or framed from outside Rippling—linked docs, embeds, partner apps, and previews where the
          user leaves or deep-links from the conversation.
        </p>
      </header>

      <ComponentIntentPanel />

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
            width: WIDTH_PX[width],
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <ExternalFileArtifact kind={kind} layoutWidth={width} />
        </div>
      </div>

      <p className="demo-meta" aria-live="polite">
        Outer width <strong>{WIDTH_PX[width]}px</strong> · <strong>{FILE_LABEL[kind]}</strong>
      </p>
    </main>
  );
}
