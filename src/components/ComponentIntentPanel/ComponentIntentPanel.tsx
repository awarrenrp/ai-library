import type { ReactNode } from "react";
import { useId } from "react";
import "./ComponentIntentPanel.css";

export type ComponentIntentPanelProps = {
  className?: string;
  /** Defaults to shared artifact guidance copy. */
  when?: ReactNode;
  /** Defaults to shared artifact guidance copy. */
  designIntent?: ReactNode;
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
}: ComponentIntentPanelProps) {
  const intent = designIntent ?? <DefaultDesignIntent />;
  const referenceHeadingId = useId();

  return (
    <section className="component-intent-reference" aria-labelledby={referenceHeadingId}>
      <div
        className={["component-intent-panel", className].filter(Boolean).join(" ")}
        role="region"
        aria-label="When and design intent"
      >
        <div className="component-intent-panel__col">
          <h3 className="component-intent-panel__label">When</h3>
          <p className="component-intent-panel__body">{when}</p>
        </div>
        <div className="component-intent-panel__col">
          <h3 className="component-intent-panel__label">Design intent</h3>
          <p className="component-intent-panel__body">{intent}</p>
        </div>
      </div>
      <hr className="component-intent-reference__divider" />
      <h2 id={referenceHeadingId} className="component-intent-reference__title">
        Reference
      </h2>
    </section>
  );
}
