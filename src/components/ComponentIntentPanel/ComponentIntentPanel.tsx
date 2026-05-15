import type { ReactNode } from "react";
import { useId } from "react";
import "./ComponentIntentPanel.css";

/**
 * Author shorthand for `when` / `designIntent`: either a single prose node
 * (string or JSX, rendered as a `<p>`) or an array of nodes (rendered as a
 * `<ul>` of bullets). Arrays are the preferred form so each page reads as a
 * scannable checklist under the shared "Usage" heading.
 */
export type ComponentIntentContent = ReactNode | ReactNode[];

export type ComponentIntentPanelProps = {
  className?: string;
  /** Defaults to shared artifact guidance copy. */
  when?: ComponentIntentContent;
  /** Defaults to shared artifact guidance copy. Prose only — see `dos`/`donts` for guidelines. */
  designIntent?: ComponentIntentContent;
  /**
   * Structured Dos. Rendered as a separate two-column card directly below the
   * When / Design intent block. Each entry is one `<li>` with a disc bullet;
   * the column heading shows a green checkmark.
   */
  dos?: ReactNode[];
  /**
   * Structured Don'ts. Rendered alongside `dos` in the same card. Each entry is
   * one `<li>` with a disc bullet; the column heading shows a red X.
   */
  donts?: ReactNode[];
};

const DEFAULT_WHEN = [
  "Read-only question with a single direct answer.",
  "No state change.",
  "No clarification needed.",
];

const DEFAULT_DESIGN_INTENT = [
  "One direct answer — conversation-length, not document-length (≤150 words).",
  "Short citations (policy name, updated date) stay inline in the same paragraph as the answer.",
  "Feedback buttons are always present.",
];

/**
 * Renders a `ComponentIntentContent` value. Arrays become a `<ul>`; single
 * nodes become a `<p>` (strings) or pass-through (JSX). This keeps callers
 * brief — most pages can pass a string array and get a tidy bullet list.
 */
function IntentBody({ content }: { content: ComponentIntentContent }) {
  if (Array.isArray(content)) {
    return (
      <ul className="component-intent-panel__intent-list">
        {content.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );
  }
  if (typeof content === "string") {
    return <p className="component-intent-panel__intent-prose">{content}</p>;
  }
  return <>{content}</>;
}

export function ComponentIntentPanel({
  className,
  when = DEFAULT_WHEN,
  designIntent = DEFAULT_DESIGN_INTENT,
  dos,
  donts,
}: ComponentIntentPanelProps) {
  const usageHeadingId = useId();
  const hasGuidelines = Boolean(dos?.length || donts?.length);

  return (
    <section className="component-intent-reference" aria-labelledby={usageHeadingId}>
      <div className="component-intent-reference__heading-row">
        <h2 id={usageHeadingId} className="page-section__title page-section__title--lead">
          Usage
        </h2>
      </div>

      <div
        className={["component-intent-panel", className].filter(Boolean).join(" ")}
        role="region"
        aria-label="When and design intent"
      >
        <div className="component-intent-panel__col">
          <h3 className="component-intent-panel__label">When</h3>
          <div className="component-intent-panel__body">
            <IntentBody content={when} />
          </div>
        </div>
        <div className="component-intent-panel__col">
          <h3 className="component-intent-panel__label">Design intent</h3>
          <div className="component-intent-panel__body">
            <IntentBody content={designIntent} />
          </div>
        </div>
      </div>

      {hasGuidelines ? (
        <div
          className="component-intent-panel component-intent-panel--guidelines"
          role="region"
          aria-label="Dos and don'ts"
        >
          <div className="component-intent-panel__col component-intent-panel__col--dos">
            <h3 className="component-intent-panel__label">Dos</h3>
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
          <div className="component-intent-panel__col component-intent-panel__col--donts">
            <h3 className="component-intent-panel__label">Don&apos;ts</h3>
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
    </section>
  );
}
