import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chat,
  CHAT_LAYOUT_VARIANTS,
  CHAT_PANEL_VERSION_LABELS,
  CHAT_PANEL_VERSIONS,
  CHAT_THREAD_PRESETS,
} from "../components/Chat";
import type { ChatLayoutVariant, ChatPanelVersion, ChatThreadPreset } from "../components/Chat";
import { Composer } from "../components/Composer";
import { IconSettings } from "../components/Composer/icons";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import "../App.css";

const CHAT_WHEN =
  "When the user is in a dedicated AI conversation—scrollable turns from the assistant and the user, with a single place to type the next message.";

const CHAT_DESIGN_INTENT =
  "The primary wrapper for the composer, the chat panel is the primary wrapper for how customers interact with Rippling AI. Chat can be displayed in 2 different ways: Through the side panel and through a full screen page.";

const LAYOUT_LABELS: Record<ChatLayoutVariant, string> = {
  "side-panel": "Side panel",
  page: "Page",
};

const THREAD_LABELS: Record<ChatThreadPreset, string> = {
  conversation: "Conversation",
  empty: "Empty",
};

export function ChatPage() {
  const pageMenuId = useId();
  const settingsBtnId = `chat-page-settings-btn-${pageMenuId}`;
  const settingsRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [layout, setLayout] = useState<ChatLayoutVariant>("side-panel");
  const [thread, setThread] = useState<ChatThreadPreset>("conversation");
  const [panelVersion, setPanelVersion] = useState<ChatPanelVersion>("default");

  useEffect(() => {
    if (!menuOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const el = settingsRef.current;
      if (el && !el.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}>Chat</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          The chat shell wraps the message thread and the composer—one surface for back-and-forth with Rippling AI,
          aligned with the side-panel and full-page chat patterns in AI-components.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 16, lineHeight: 1.5, color: "#716f6c" }}>
          Composer width follows the 712px content track (same as messages). Use the settings control (upper right) to
          switch panel versions: default thinking glyphs, no glyphs, or animated thinking with replay.
        </p>
      </header>

      <ComponentIntentPanel when={CHAT_WHEN} designIntent={CHAT_DESIGN_INTENT} />

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
          footer={
            <Composer
              width="fill"
              ariaComposerLabel="Chat composer"
              ariaMessageLabel="Message to Rippling AI"
              placeholder="Ask Rippling AI anything…"
            />
          }
        />
      </div>
    </main>
  );
}
