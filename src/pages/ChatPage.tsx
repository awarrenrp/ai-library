import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chat,
  ChatExampleDemo,
  CHAT_LAYOUT_VARIANTS,
  CHAT_PANEL_VERSION_LABELS,
  CHAT_PANEL_VERSIONS,
  CHAT_THREAD_PRESETS,
} from "../components/Chat";
import type {
  ChatExampleDemoMode,
  ChatLayoutVariant,
  ChatPanelVersion,
  ChatThreadPreset,
} from "../components/Chat";
import { Composer } from "../components/Composer";
import { IconArrowUpMini, IconSettings } from "../components/Composer/icons";
import { IconCopy } from "../components/Composer/icons";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { DemoHighlightedCode } from "../components/DemoHighlightedCode";
import { useDismissOnOutsidePress } from "../hooks/useDismissOnOutsidePress";
import "../App.css";

const CHAT_WHEN = [
  "The user is in a dedicated AI conversation with the assistant.",
  "One place to type the next message — no dual composers per page.",
];

const CHAT_DESIGN_INTENT = [
  "Primary wrapper for the composer and message thread — the canonical AI surface.",
  "Renders as a side panel that overlays the product, or as a full-screen page.",
  "Toolbar, thread, and footer composer share consistent spacing across both modes.",
];

const LAYOUT_LABELS: Record<ChatLayoutVariant, string> = {
  "side-panel": "Side panel",
  page: "Page",
};

const THREAD_LABELS: Record<ChatThreadPreset, string> = {
  conversation: "Conversation",
  empty: "Empty",
};

/** Rippling product wiring for `AIChat` — copy into app code (paths are app-relative). */
const CHAT_ASSISTANT_EXAMPLE_SOURCE = `import { useState } from 'react';
import { Button, Layout, Spinner } from '@rippling/pebble';
import { AIChat } from 'app/products/platform/HubPlatform/modules/ChatAssistant/components/aiChat/AIChat';
import {
  AI_CHAT_APP_NAME,
  AI_CHAT_FLOW_NAME,
} from 'app/products/platform/HubPlatform/modules/ChatAssistant/constants/configuration';

export function ChatAssistantExample() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Layout.VStack gap={16} align="center" justify="center">
      <Button onClick={() => setIsChatOpen(open => !open)}>
        {isChatOpen ? 'Close chat' : 'Open chat'}
      </Button>

      {isChatOpen && (
        <AIChat.Provider
          isOpen={isChatOpen}
          appName={AI_CHAT_APP_NAME}
          flowName={AI_CHAT_FLOW_NAME}
          openChat={() => setIsChatOpen(true)}
          closeChat={() => setIsChatOpen(false)}
        >
          <AIChat.Loading>
            <Spinner />
          </AIChat.Loading>

          <AIChat.Ready>
            <AIChat.Window />
          </AIChat.Ready>

          <AIChat.Error>
            <div>Something went wrong.</div>
          </AIChat.Error>
        </AIChat.Provider>
      )}
    </Layout.VStack>
  );
}`;

async function copyChatAssistantExample(): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(CHAT_ASSISTANT_EXAMPLE_SOURCE);
      return;
    }
  } catch {
    /* fall through */
  }
  const ta = document.createElement("textarea");
  ta.value = CHAT_ASSISTANT_EXAMPLE_SOURCE;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

export function ChatPage() {
  const pageMenuId = useId();
  const settingsBtnId = `chat-page-settings-btn-${pageMenuId}`;
  const settingsRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [layout, setLayout] = useState<ChatLayoutVariant>("side-panel");
  const [thread, setThread] = useState<ChatThreadPreset>("conversation");
  const [panelVersion, setPanelVersion] = useState<ChatPanelVersion>("default");
  const [exampleMode, setExampleMode] = useState<ChatExampleDemoMode>("side-chat");
  const [copyAck, setCopyAck] = useState(false);

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
          aria-label="Chat panel version"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={pageMenuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <IconSettings />
        </button>
        {menuOpen ? (
          <div
            id={pageMenuId}
            className="composer-page-settings-menu"
            role="menu"
            aria-labelledby={settingsBtnId}
          >
            {CHAT_PANEL_VERSIONS.map((v) => (
              <button
                key={v}
                type="button"
                role="menuitemradio"
                aria-checked={panelVersion === v}
                className={[
                  "composer-page-settings-option",
                  panelVersion === v ? "composer-page-settings-option--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  setPanelVersion(v);
                  setMenuOpen(false);
                }}
              >
                {CHAT_PANEL_VERSION_LABELS[v]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Chat
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>Chat</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          The chat shell wraps the message thread and the composer—one surface for back-and-forth with Rippling AI,
          aligned with the side-panel and full-page chat patterns in AI-components.
        </p>
      </header>

      <ComponentIntentPanel when={CHAT_WHEN} designIntent={CHAT_DESIGN_INTENT} />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div
        className="demo-preview-surface demo-preview-surface--no-toolbar-divider"
        role="region"
        aria-label="Chat interactive preview"
      >
      <div className="demo-toolbar" aria-label="Chat preview controls">
        <div className="demo-group">
          <p className="demo-label" id="label-chat-layout">
            Layout
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-chat-layout">
            {CHAT_LAYOUT_VARIANTS.map((id) => (
              <button
                key={id}
                type="button"
                className="demo-segment"
                aria-pressed={layout === id}
                onClick={() => setLayout(id)}
              >
                {LAYOUT_LABELS[id]}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-group">
          <p className="demo-label" id="label-chat-thread">
            Thread
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-chat-thread">
            {CHAT_THREAD_PRESETS.map((id) => (
              <button
                key={id}
                type="button"
                className="demo-segment"
                aria-pressed={thread === id}
                onClick={() => setThread(id)}
              >
                {THREAD_LABELS[id]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="demo-stage" role="region" aria-label="Chat preview">
        <Chat
          key={`${layout}-${thread}-${panelVersion}`}
          variant={layout}
          threadPreset={thread}
          panelVersion={panelVersion}
          ariaLabel="Rippling AI chat"
          ariaThreadLabel="Conversation messages"
          ariaComposerLabel="Message composer"
          toolbar={{
            title: thread === "empty" ? "New conversation" : "Headcount by department",
            onMenuClick: () => {},
            onAddCommentClick: () => {},
            onExpandClick: () => {},
            onCloseClick: () => {},
          }}
          footer={
            <Composer
              width="fill"
              ariaComposerLabel="Chat composer"
              ariaMessageLabel="Message to Rippling AI"
              placeholder="Ask Rippling AI anything…"
              {...(panelVersion === "animated"
                ? { sendIcon: <IconArrowUpMini />, controls: "intent" as const }
                : {})}
            />
          }
        />
      </div>
      </div>

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Examples</h2>

      <section
        className="in-context-stage demo-fullbleed"
        id="chat-example-in-context"
        aria-labelledby="chat-example-in-context-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="chat-example-in-context-heading" className="in-context-stage__title">
              Example in chat — {CHAT_PANEL_VERSION_LABELS[panelVersion]}
            </h2>
            <p className="in-context-stage__lede">
              A working chat using the real composer. The example mirrors the panel version
              picked from the gear (upper right): {CHAT_PANEL_VERSION_LABELS[panelVersion]}.
              {panelVersion === "animated"
                ? " Send a message to drive the composer hat through its full cycle (idle → thinking → shimmer → cycling → done → idle), or pin a phase below to inspect each animation state on its own."
                : " Send a message — the inline thinking block lands with the assistant's reply, just as it would in product."}
            </p>
          </div>
          <div className="demo-segments" role="group" aria-label="Chat example surface mode">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={exampleMode === "side-chat"}
              onClick={() => setExampleMode("side-chat")}
            >
              Side chat
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={exampleMode === "full-screen"}
              onClick={() => setExampleMode("full-screen")}
            >
              Full screen
            </button>
          </div>
        </div>
        <ChatExampleDemo
          key={`${exampleMode}-${panelVersion}`}
          mode={exampleMode}
          panelVersion={panelVersion}
        />
      </section>

      <section className="demo-code-section" id="chat-assistant-example" aria-labelledby="chat-assistant-example-heading">
        <div className="demo-code-section__top">
          <div>
            <h2 id="chat-assistant-example-heading" className="demo-code-section__title">
              Chat assistant — implementation example
            </h2>
            <p className="demo-code-section__lede">
              Wire Pebble <code>AIChat</code> in product; paths below match the Rippling
              codebase. Copy and adapt for your surface.
            </p>
          </div>
          <div className="demo-segments" role="presentation">
            <button
              type="button"
              className={["demo-segment", "demo-code-copy-btn", copyAck ? "demo-code-copy-btn--active" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={async () => {
                await copyChatAssistantExample();
                setCopyAck(true);
                window.setTimeout(() => setCopyAck(false), 2000);
              }}
            >
              <IconCopy className="demo-code-copy-btn__icon" />
              {copyAck ? "Copied" : "Copy code"}
            </button>
          </div>
        </div>
        <DemoHighlightedCode code={CHAT_ASSISTANT_EXAMPLE_SOURCE} language="tsx" />
      </section>
    </main>
  );
}
