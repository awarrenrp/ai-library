import type { ReactNode } from "react";
import { useId } from "react";
import "./ComponentIntentPanel.css";

export type ComponentIntentPanelProps = {
  className?: string;
  /** Defaults to shared artifact guidance copy. */
  when?: ReactNode;
  /** Defaults to shared artifact guidance copy. Prose only — see `dos`/`donts` for guidelines. */
  designIntent?: ReactNode;
  /**
   * Structured Dos. Rendered as a separate two-column card directly below the
   * When / Design intent block. Each entry is one `<li>` with a green check.
   */
  dos?: ReactNode[];
  /**
   * Structured Don'ts. Rendered alongside `dos` in the same card. Each entry is
   * one `<li>` with a red cross.
   */
  donts?: ReactNode[];
};

const DEFAULT_WHEN =
  "Read-only question with a single direct answer. No state change. No clarification needed.";

function DefaultDesignIntent() {
  return (
    <>
      One direct answer. Conversation-length, not document-length. ≤150 words. Short citations (policy name, updated
      date) stay <strong>inline</strong> in the same paragraph as the answer (same body style as the rest of the
      sentence; policy as a normal link), not a separate grey strip. Feedback buttons always present.
    </>
  );
}

export function ComponentIntentPanel({
  className,
  when = DEFAULT_WHEN,
  designIntent,
  dos,
  donts,
}: ComponentIntentPanelProps) {
  const intent = designIntent ?? <DefaultDesignIntent />;
  const referenceHeadingId = useId();
  const hasGuidelines = Boolean(dos?.length || donts?.length);

  return (
    <section className="component-intent-reference" aria-labelledby={referenceHeadingId}>
      <div
        className={["component-intent-panel", className].filter(Boolean).join(" ")}
        role="region"
        aria-label="When and design intent"
      >
        <div className="component-intent-panel__col">
          <h2 className="component-intent-panel__label">When</h2>
          <div className="component-intent-panel__body">{when}</div>
        </div>
        <div className="component-intent-panel__col">
          <h2 className="component-intent-panel__label">Design intent</h2>
          <div className="component-intent-panel__body">{intent}</div>
        </div>
      </div>

      {hasGuidelines ? (
        <div
          className="component-intent-panel component-intent-panel--guidelines"
          role="region"
          aria-label="Dos and don'ts"
        >
          <div className="component-intent-panel__col">
            <h2 className="component-intent-panel__label">Dos</h2>
            <div className="component-intent-panel__body">
              {dos && dos.length > 0 ? (
                <ul className="component-intent-panel__dos-list">
                  {dos.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="component-intent-panel__col">
            <h2 className="component-intent-panel__label">Don&apos;ts</h2>
            <div className="component-intent-panel__body">
              {donts && donts.length > 0 ? (
                <ul className="component-intent-panel__dont-list">
                  {donts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <hr className="component-intent-reference__divider" />
      <h2 id={referenceHeadingId} className="component-intent-reference__title">
        Reference
      </h2>
    </section>
  );
}
