import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import { IconCopy } from "../components/Composer/icons";
import {
  STRONG_TYPE_TONES,
  STRONG_TYPE_VARIANTS,
  StrongType,
} from "../components/StrongType";
import type { StrongTypeTone, StrongTypeVariant } from "../components/StrongType";
import { StrongTypeChatExample } from "../examples/StrongTypeExample";
import STRONG_TYPE_EXAMPLE_SOURCE from "../examples/StrongTypeExample.tsx?raw";
import { copyText } from "../utils/copyText";
import "../App.css";
import "./StrongTypePage.css";

const STRONG_TYPE_WHEN =
  "Use when the conversation needs to flag scope, capability, or state at a glance — \u201cAI\u201d, \u201cBeta\u201d, \u201cLive\u201d, \u201cConfidential\u201d, \u201cApproved\u201d. Heavier than a tag or chip; meant to be visually loud without being a button.";

const STRONG_TYPE_DESIGN_INTENT = (
  <>
    <p>
      A heavyweight inline label. Sits in the body of an assistant turn alongside text. Reads as a
      pill, but communicates classification, not action. Pair tone with meaning—keep the mapping
      stable so the same tone always means the same thing across the product.
    </p>
    <div>
      <p className="component-intent-panel__dos-donts-label">Dos</p>
      <ul className="component-intent-panel__dos-list">
        <li>Keep labels 1&ndash;2 words, uppercase.</li>
        <li>
          Use <code>asStatus</code> for live state changes (&ldquo;Live&rdquo;, &ldquo;Approved&rdquo;).
        </li>
        <li>
          Provide <code>ariaLabel</code> when the visible text is abbreviated (e.g.{" "}
          <code>&ldquo;AI&rdquo;</code> &rarr; <code>&ldquo;AI generated&rdquo;</code>).
        </li>
      </ul>
    </div>
    <div>
      <p className="component-intent-panel__dos-donts-label">Don&apos;ts</p>
      <ul className="component-intent-panel__dont-list">
        <li>Use as a button. If it&rsquo;s interactive, use a button or tag with affordance.</li>
        <li>Stack more than two in the same line of body copy.</li>
        <li>Mix tones for the same concept across surfaces.</li>
      </ul>
    </div>
  </>
);

const TONE_DESCRIPTIONS: Record<StrongTypeTone, string> = {
  primary: "Product scope · AI, brand-level labels",
  info: "Capability hints · Beta, Preview, New",
  neutral: "Generic emphasis · Internal, Draft",
  critical: "Restricted scope · Confidential, Blocked",
  positive: "Completed state · Approved, Live, Done",
  progress: "Working state · In progress, Running, Pending",
};

const SAMPLE_LABELS: Record<StrongTypeTone, string> = {
  primary: "AI",
  info: "Beta",
  neutral: "Draft",
  critical: "Confidential",
  positive: "Approved",
  progress: "In progress",
};

export function StrongTypePage() {
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
          Rippling | In partnership with Pebble · AI-components · Strong type
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>
          Strong type
        </h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Heavyweight inline label for AI surfaces. Use for scope, capability, or state pills
          embedded in assistant turns.
        </p>
      </header>

      <ComponentIntentPanel when={STRONG_TYPE_WHEN} designIntent={STRONG_TYPE_DESIGN_INTENT} />

      <div
        className="demo-preview-surface demo-preview-surface--stack"
        role="region"
        aria-label="Strong type interactive preview"
      >
        <section aria-labelledby="strong-type-matrix-heading">
          <h2 id="strong-type-matrix-heading" className="strong-type-page__section-title">
            Tones &times; variants
          </h2>
          <p className="strong-type-page__section-lede">
            Filled communicates state with the highest visual weight; outlined is a quieter chip
            treatment for the same semantics.
          </p>
          <div className="strong-type-page__matrix" role="table" aria-label="Tone and variant matrix">
            <div className="strong-type-page__matrix-row strong-type-page__matrix-row--head" role="row">
              <span className="strong-type-page__matrix-cell strong-type-page__matrix-cell--head" role="columnheader">
                Tone
              </span>
              {STRONG_TYPE_VARIANTS.map((variant) => (
                <span
                  key={variant}
                  className="strong-type-page__matrix-cell strong-type-page__matrix-cell--head"
                  role="columnheader"
                >
                  {variant === "filled" ? "Filled" : "Outlined"}
                </span>
              ))}
              <span className="strong-type-page__matrix-cell strong-type-page__matrix-cell--head" role="columnheader">
                When to use
              </span>
            </div>
            {STRONG_TYPE_TONES.map((tone) => (
              <div key={tone} className="strong-type-page__matrix-row" role="row">
                <span className="strong-type-page__matrix-cell strong-type-page__matrix-cell--tone" role="rowheader">
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </span>
                {STRONG_TYPE_VARIANTS.map((variant: StrongTypeVariant) => (
                  <span key={variant} className="strong-type-page__matrix-cell" role="cell">
                    <StrongType tone={tone} variant={variant}>
                      {SAMPLE_LABELS[tone]}
                    </StrongType>
                  </span>
                ))}
                <span className="strong-type-page__matrix-cell strong-type-page__matrix-cell--desc" role="cell">
                  {TONE_DESCRIPTIONS[tone]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="strong-type-sizes-heading">
          <h2 id="strong-type-sizes-heading" className="strong-type-page__section-title">
            Sizes
          </h2>
          <p className="strong-type-page__section-lede">
            <code>sm</code> sits cleanly on a 20px line height — use it inline inside body copy.{" "}
            <code>md</code> is the default for standalone labels in card headers.
          </p>
          <div className="strong-type-page__sizes">
            <div className="strong-type-page__size-cell">
              <span className="strong-type-page__size-label">sm · 11px / 20px</span>
              <StrongType tone="primary" size="sm">
                AI
              </StrongType>
              <StrongType tone="info" size="sm" variant="outlined">
                Beta
              </StrongType>
            </div>
            <div className="strong-type-page__size-cell">
              <span className="strong-type-page__size-label">md · 12px / 24px</span>
              <StrongType tone="primary" size="md">
                AI
              </StrongType>
              <StrongType tone="info" size="md" variant="outlined">
                Beta
              </StrongType>
            </div>
          </div>
        </section>

        <section aria-labelledby="strong-type-context-heading">
          <h2 id="strong-type-context-heading" className="strong-type-page__section-title">
            In an assistant turn
          </h2>
          <p className="strong-type-page__section-lede">
            Same component, dropped into a real assistant message. <code>asStatus</code> on
            &ldquo;Approved&rdquo; routes it through <code>role=&quot;status&quot;</code> for SR
            announcements.
          </p>
          <div className="strong-type-page__chat-stage">
            <StrongTypeChatExample />
          </div>
        </section>
      </div>

      <section
        className="demo-code-section"
        id="strong-type-example"
        aria-labelledby="strong-type-example-heading"
      >
        <div className="demo-code-section__top">
          <div>
            <h2 id="strong-type-example-heading" className="demo-code-section__title">
              Strong type &mdash; implementation example
            </h2>
            <p className="demo-code-section__lede">
              Drop <code>StrongType</code> directly into assistant message copy. The example below
              is the source file rendered on this page, so anything you copy is type-checked at
              build time.
            </p>
          </div>
          <div className="demo-segments" role="presentation">
            <button
              type="button"
              className={["demo-segment", "demo-code-copy-btn", copyAck ? "demo-code-copy-btn--active" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={async () => {
                await copyText(STRONG_TYPE_EXAMPLE_SOURCE);
                setCopyAck(true);
                window.setTimeout(() => setCopyAck(false), 2000);
              }}
            >
              <IconCopy className="demo-code-copy-btn__icon" />
              {copyAck ? "Copied" : "Copy code"}
            </button>
          </div>
        </div>
        <DemoHighlightedCode code={STRONG_TYPE_EXAMPLE_SOURCE} language="tsx" />
      </section>
    </main>
  );
}
