import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import { IconCopy } from "../components/Composer/icons";
import { StrongTypeComposerExample } from "../examples/StrongTypeExample";
import STRONG_TYPE_EXAMPLE_SOURCE from "../examples/StrongTypeExample.tsx?raw";
import { copyText } from "../utils/copyText";
import "../App.css";
import "./StrongTypePage.css";

const STRONG_TYPE_WHEN =
  "When the user types `/` (commands) or `@` (mentions) in the composer. Strong typing converts free-form input into a structured pick from a curated set of actions, people, or knowledge sources \u2014 so the model gets an unambiguous reference instead of a guess.";

const STRONG_TYPE_DESIGN_INTENT = (
  <p>
    A floating menu anchored above the composer. Opens as soon as a trigger character is typed at
    the start of a fresh token, filters live as the user keeps typing, and commits with{" "}
    <code>Enter</code> or a click. The menu never steals focus &mdash; the composer keeps it the
    whole time, so typing remains the source of truth.
  </p>
);

const STRONG_TYPE_DOS = [
  <>
    Use <code>/</code> for actions and knowledge scopes, <code>@</code> for people and teams.
  </>,
  <>Group items by category so the menu reads as a curated set, not a flat list.</>,
  <>Show keyboard hints (Up / Down / Enter / Esc) in the footer.</>,
];

const STRONG_TYPE_DONTS = [
  <>Open the menu mid-word. Only trigger when the character starts a token.</>,
  <>Use this for free-text autocomplete. Strong typing is for structured choices, not phrase completion.</>,
  <>Move focus into the menu &mdash; the composer keeps focus so typing keeps working.</>,
];

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
          The slash-command and mention menu that opens when the user types <code>/</code> or{" "}
          <code>@</code> in the composer. Turns a typed token into a structured pick.
        </p>
      </header>

      <ComponentIntentPanel
        when={STRONG_TYPE_WHEN}
        designIntent={STRONG_TYPE_DESIGN_INTENT}
        dos={STRONG_TYPE_DOS}
        donts={STRONG_TYPE_DONTS}
      />

      <div
        className="demo-preview-surface demo-preview-surface--stack"
        role="region"
        aria-label="Strong type interactive preview"
      >
        <section aria-labelledby="strong-type-demo-heading">
          <h2 id="strong-type-demo-heading" className="strong-type-page__section-title">
            Try it
          </h2>
          <p className="strong-type-page__section-lede">
            Click into the input and start typing. <code>/</code> opens the command menu;{" "}
            <code>@</code> opens the mention menu. <kbd>↑</kbd>/<kbd>↓</kbd> to move,{" "}
            <kbd>↵</kbd> to insert, <kbd>esc</kbd> to dismiss.
          </p>
          <div className="strong-type-page__stage">
            <StrongTypeComposerExample />
          </div>
        </section>

        <section aria-labelledby="strong-type-triggers-heading">
          <h2 id="strong-type-triggers-heading" className="strong-type-page__section-title">
            Triggers
          </h2>
          <ul className="strong-type-page__triggers">
            <li>
              <span className="strong-type-page__trigger-key">
                <kbd>/</kbd>
              </span>
              <div>
                <p className="strong-type-page__trigger-title">Commands</p>
                <p className="strong-type-page__trigger-desc">
                  Actions the assistant can take (<code>/summarize</code>, <code>/draft</code>) and
                  knowledge scopes it should read from (<code>/policy</code>, <code>/benefits</code>).
                </p>
              </div>
            </li>
            <li>
              <span className="strong-type-page__trigger-key">
                <kbd>@</kbd>
              </span>
              <div>
                <p className="strong-type-page__trigger-title">Mentions</p>
                <p className="strong-type-page__trigger-desc">
                  People and teams to scope the reply to. Inserts a strongly-typed reference the
                  model can resolve to a Rippling employee or group.
                </p>
              </div>
            </li>
          </ul>
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
              Strong type &mdash; composer integration
            </h2>
            <p className="demo-code-section__lede">
              Full wiring: trigger detection, live filtering, keyboard nav, token replacement on
              select. This file is the source rendered on this page, so anything you copy is
              type-checked at build time.
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
