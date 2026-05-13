import { useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import { IconCopy } from "../components/Composer/icons";
import { StrongTypeComposerExample } from "../examples/StrongTypeExample";
import { StrongTypeInChatDemo } from "../components/StrongType";
import type { StrongTypeInChatDemoMode } from "../components/StrongType";
import STRONG_TYPE_EXAMPLE_SOURCE from "../examples/StrongTypeExample.tsx?raw";
import { copyText } from "../utils/copyText";
import "../App.css";
import "./StrongTypePage.css";

const STRONG_TYPE_WHEN = [
  <>
    User types <code>/</code> in the composer to invoke a command or scope.
  </>,
  <>
    User types <code>@</code> to mention a person or team.
  </>,
  "Free-form input needs to convert into a structured pick the model can resolve.",
];

const STRONG_TYPE_DESIGN_INTENT = [
  "Floating menu anchored above the composer; opens on a trigger character at token start.",
  "Filters live as the user keeps typing; never steals focus from the composer.",
  <>
    Commit with <code>Enter</code> or a click; dismiss with <code>Esc</code>.
  </>,
];

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
  const [contextMode, setContextMode] = useState<StrongTypeInChatDemoMode>("side-chat");

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
        <h1 className="page-doc-title">Strong type</h1>
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

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

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

      <hr className="page-section__divider" aria-hidden="true" />

      <section
        className="in-context-stage"
        id="strong-type-in-context"
        aria-labelledby="strong-type-in-context-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="strong-type-in-context-heading" className="in-context-stage__title">
              In context
            </h2>
            <p className="in-context-stage__lede">
              The slash-command and mention menus open from the composer at the bottom of the
              thread. Try typing <code>/</code> or <code>@</code> in the input below.
            </p>
          </div>
          <div className="demo-segments" role="group" aria-label="Context view mode">
            {(["side-chat", "full-screen"] as const).map((m) => (
              <button
                key={m}
                type="button"
                className="demo-segment"
                aria-pressed={contextMode === m}
                onClick={() => setContextMode(m)}
              >
                {m === "side-chat" ? "Side chat" : "Full screen"}
              </button>
            ))}
          </div>
        </div>
        <StrongTypeInChatDemo mode={contextMode} />
      </section>
    </main>
  );
}
