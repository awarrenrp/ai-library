import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Composer,
  COMPOSER_VERSION_LABELS,
  COMPOSER_VERSIONS,
  WIDTH_PX,
} from "../components/Composer";
import type { ComposerVersion, ComposerWidth } from "../components/Composer";
import { IconCopy, IconSettings } from "../components/Composer/icons";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import { ChatExampleDemo } from "../components/Chat";
import type { ChatExampleDemoMode } from "../components/Chat";
import { useDismissOnOutsidePress } from "../hooks/useDismissOnOutsidePress";
import "../App.css";

const FILLED_SAMPLE = "Make me a report about sales people in SF";

const EDIT_SAMPLE =
  "Summarize PTO policy changes for managers. Keep bullets short and mention effective dates.";

const COMPOSER_WHEN = [
  "The user wants to ask the assistant something using natural language.",
  "The page needs a single, obvious input for that ask.",
];

const COMPOSER_DESIGN_INTENT = [
  "One canonical composer pattern across every Rippling AI surface.",
  "At most one composer per page — duplicates fragment the entry point.",
  "Width follows the 712px content track so it aligns with the message column.",
];

const COMPOSER_DOS = [
  "Use one composer per page or surface and match the standard spec for shipped experiences.",
  "Use alternate composer variants only where the spec calls for them (for example, isolated previews).",
];

const COMPOSER_DONTS = [
  "Pair a full composer with a separate side-panel chat on the same page\u2014duplicate inputs confuse users.",
];

/** Rippling product wiring for Chat SDK `MessageInput` + Lexical — paths are app-relative. */
const COMPOSER_MESSAGE_INPUT_EXAMPLE_SOURCE = `import { useCallback, useId, useState } from 'react';
import {
  MessageInput,
  MessageInputActions,
  MessageInputBody,
  MessageInputFooter,
  MessageInputGroup,
  SendButton,
} from 'app/products/platform/HubPlatform/modules/ChatSDK/ui/input';
import { LexicalMessageInput } from 'app/products/platform/HubPlatform/modules/ChatAssistant/components/overrides/messageInput/LexicalMessageInput';

export function ChatAssistantMessageInputExample() {
  const [text, setText] = useState('');
  const sendLabelId = useId();

  const handleSend = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    // Demo only — product uses useMessageInput(channel).sendMessage(...)
    console.log(trimmed);
    setText('');
  }, [text]);

  return (
    <MessageInput>
      <MessageInputGroup>
        <MessageInputBody>
          <LexicalMessageInput
            name="chat-assistant-message-input-demo"
            placeholder="Ask anything"
            disabled={false}
            autoFocus={false}
            spellCheck={false}
            autoComplete="off"
            handleSetText={setText}
            onSubmit={handleSend}
          />
        </MessageInputBody>

        <MessageInputFooter>
          <MessageInputActions>
            <span id={sendLabelId} hidden>
              Send message
            </span>
            <SendButton
              aria-labelledby={sendLabelId}
              onClick={handleSend}
              isDisabled={!text.trim()}
            />
          </MessageInputActions>
        </MessageInputFooter>
      </MessageInputGroup>
    </MessageInput>
  );
}`;

async function copyComposerMessageInputExample(): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(COMPOSER_MESSAGE_INPUT_EXAMPLE_SOURCE);
      return;
    }
  } catch {
    /* fall through */
  }
  const ta = document.createElement("textarea");
  ta.value = COMPOSER_MESSAGE_INPUT_EXAMPLE_SOURCE;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

export function ComposerPage() {
  const pageMenuId = useId();
  const settingsBtnId = `composer-page-settings-btn-${pageMenuId}`;
  /** Fixed-width tracks only; `"fill"` is for embedded Composers (e.g. chat footers). */
  const [width, setWidth] = useState<Exclude<ComposerWidth, "fill">>("large");
  const [composerVersion, setComposerVersion] = useState<ComposerVersion>("standard");
  const [variant, setVariant] = useState<"default" | "filled" | "edit">("default");
  const [text, setText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyAck, setCopyAck] = useState(false);
  const [contextMode, setContextMode] = useState<ChatExampleDemoMode>("side-chat");
  const settingsRef = useRef<HTMLDivElement>(null);

  function applyVariant(next: "default" | "filled" | "edit") {
    setVariant(next);
    if (next === "filled") setText(FILLED_SAMPLE);
    else if (next === "edit") setText(EDIT_SAMPLE);
    else setText("");
  }

  useEffect(() => {
    if (composerVersion === "standard" && variant === "edit") {
      setVariant("default");
      setText("");
    }
  }, [composerVersion, variant]);

  useDismissOnOutsidePress(
    menuOpen,
    () => setMenuOpen(false),
    (n) => settingsRef.current?.contains(n) ?? false,
  );

  return (
    <main className="demo-wrap">
      <div className="composer-page-settings" ref={settingsRef}>
        <button
          id={settingsBtnId}
          type="button"
          className="composer-page-settings-btn"
          aria-label="Composer version"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={pageMenuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <IconSettings />
        </button>
        {menuOpen && (
          <div
            id={pageMenuId}
            className="composer-page-settings-menu"
            role="menu"
            aria-labelledby={settingsBtnId}
          >
            {COMPOSER_VERSIONS.map((v) => (
              <button
                key={v}
                type="button"
                role="menuitemradio"
                aria-checked={composerVersion === v}
                className={[
                  "composer-page-settings-option",
                  composerVersion === v ? "composer-page-settings-option--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  setComposerVersion(v);
                  setMenuOpen(false);
                }}
              >
                {COMPOSER_VERSION_LABELS[v]}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components
        </p>
        <h1 className="page-doc-title">Composer</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          When users open AI chat, the composer is how they use natural language to ask questions and pull in more
          information—one consistent pattern across Rippling, without pairing an inline composer with a separate side
          panel chat on the same page.
        </p>
      </header>

      <ComponentIntentPanel
        when={COMPOSER_WHEN}
        designIntent={COMPOSER_DESIGN_INTENT}
        dos={COMPOSER_DOS}
        donts={COMPOSER_DONTS}
        exampleHref="/composer/example"
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div
        className="demo-preview-surface demo-preview-surface--no-toolbar-divider"
        role="region"
        aria-label="Composer interactive preview"
      >
      <div className="demo-toolbar" aria-label="Composer preview controls">
        <div className="demo-group">
          <p className="demo-label" id="label-width">
            Width
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-width">
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
          <p className="demo-label" id="label-state">
            State
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-state">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={variant === "default"}
              aria-label="Default state, empty message field"
              onClick={() => applyVariant("default")}
            >
              Default
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={variant === "filled"}
              aria-label="Filled state, sample message"
              onClick={() => applyVariant("filled")}
            >
              Filled
            </button>
            {composerVersion === "alternate" ? (
              <button
                type="button"
                className="demo-segment"
                aria-pressed={variant === "edit"}
                aria-label="Edit state, focus outline and edit chip (alternate only)"
                onClick={() => applyVariant("edit")}
              >
                Edit
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="demo-stage" role="region" aria-label="Composer preview">
        <Composer
          width={width}
          value={text}
          onChange={setText}
          version={composerVersion}
          surfaceState={variant === "edit" ? "edit" : "default"}
          editContextLabel={variant === "edit" ? "Editing · HR policy draft" : undefined}
        />
      </div>

      <p className="demo-meta" aria-live="polite">
        Outer width <strong>{WIDTH_PX[width]}px</strong> · Composer{" "}
        <strong>{composerVersion === "alternate" ? "Alternate" : "Standard"}</strong> ·{" "}
        <strong>
          {composerVersion === "standard" && variant === "edit"
            ? "Default"
            : variant === "filled"
              ? "Filled"
              : variant === "edit"
                ? "Edit"
                : "Default"}
        </strong>
      </p>
      </div>

      <section
        className="demo-code-section"
        id="composer-message-input-example"
        aria-labelledby="composer-message-input-example-heading"
      >
        <div className="demo-code-section__top">
          <div>
            <h2 id="composer-message-input-example-heading" className="demo-code-section__title">
              Message input — implementation example
            </h2>
            <p className="demo-code-section__lede">
              Wire Chat SDK <code>MessageInput</code> with the Lexical override used in Chat Assistant; paths below match
              the Rippling codebase. Copy and adapt for your surface.
            </p>
          </div>
          <div className="demo-segments" role="presentation">
            <button
              type="button"
              className={["demo-segment", "demo-code-copy-btn", copyAck ? "demo-code-copy-btn--active" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={async () => {
                await copyComposerMessageInputExample();
                setCopyAck(true);
                window.setTimeout(() => setCopyAck(false), 2000);
              }}
            >
              <IconCopy className="demo-code-copy-btn__icon" />
              {copyAck ? "Copied" : "Copy code"}
            </button>
          </div>
        </div>
        <DemoHighlightedCode code={COMPOSER_MESSAGE_INPUT_EXAMPLE_SOURCE} language="tsx" />
      </section>

      <hr className="page-section__divider" aria-hidden="true" />

      <section
        className="in-context-stage"
        id="composer-in-context"
        aria-labelledby="composer-in-context-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="composer-in-context-heading" className="in-context-stage__title">
              In context
            </h2>
            <p className="in-context-stage__lede">
              The composer lives at the bottom of every AI thread. Toggle to compare
              how it reads in a side panel versus a full-screen workspace.
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
        <ChatExampleDemo mode={contextMode} />
      </section>
    </main>
  );
}
