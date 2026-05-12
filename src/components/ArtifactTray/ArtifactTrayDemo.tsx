/**
 * Artifact tray — in-context demo. Two modes:
 *
 *   1. `side-chat` — 440px side panel sliding in from the right of a mocked
 *      app surface. The tray is **not** always visible: the chat header
 *      exposes a More (⋯) menu with a "Show artifacts" item. Selecting it
 *      eases the tray in from the top, covering the thread until the user
 *      dismisses it via the tray's own close button.
 *
 *   2. `full-screen` — full-width AI workspace. Chat fills the canvas; the
 *      tray is pinned to the right-hand side as a consistent, always-visible
 *      column so users can jump between artifacts without hunting.
 *
 *  Mirrors Figma frames:
 *    side-chat default       → 1076:16368
 *    side-chat tray covering → 1076:18949
 *    full-screen tray pinned → 1076:16797
 */

import { useEffect, useId, useRef, useState } from "react";
import {
  ChatToolbar,
  ChatToolbarAddCommentIcon,
  ChatToolbarCloseIcon,
  ChatToolbarExpandIcon,
  ChatToolbarMenuIcon,
} from "../Chat";
import { Composer } from "../Composer";
import { ArtifactTray, type ArtifactTrayItem } from "./ArtifactTray";
import { IconFile, IconMoreHorizontal, IconReport, IconWorkflow } from "../../icons";
import "./ArtifactTrayDemo.css";

const TRAY_ITEMS: readonly ArtifactTrayItem[] = [
  { id: "workflow", title: "Workflow", icon: <IconWorkflow /> },
  { id: "policy-pdf", title: "New in-office policy.PDF", icon: <IconFile /> },
  { id: "attendance", title: "Office attendance", icon: <IconReport /> },
];

export type ArtifactTrayDemoMode = "side-chat" | "full-screen";

export type ArtifactTrayDemoProps = {
  mode?: ArtifactTrayDemoMode;
};

export function ArtifactTrayDemo({ mode = "side-chat" }: ArtifactTrayDemoProps) {
  if (mode === "full-screen") return <FullScreenDemo />;
  return <SideChatDemo />;
}

function SideChatDemo() {
  const uid = useId();
  const moreBtnId = `${uid}-more-btn`;
  const moreMenuId = `${uid}-more-menu`;
  const trayRegionId = `${uid}-tray`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);
  const moreAnchorRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (event: MouseEvent) => {
      if (!moreAnchorRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        moreBtnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div
      className="artifact-tray-demo artifact-tray-demo--side-chat"
      role="region"
      aria-label="Artifact tray in side chat"
    >
      <div className="artifact-tray-demo__app">
        <p className="artifact-tray-demo__app-label">App surface</p>
        <p className="artifact-tray-demo__app-body">
          Rippling AI opens from the right. The tray is hidden by default in side chat — open the
          More menu in the chat header and pick &ldquo;Show artifacts&rdquo;.
        </p>
      </div>
      <div className="artifact-tray-demo__chat-wrap">
        <div className="artifact-tray-demo__chat">
          {/* Toolbar — mirrors the Chat panel component (Figma 1076:16368).
              Hamburger + title on the left; More (with Show artifacts menu),
              Add comment, Expand, and Close on the right. */}
          <div
            role="toolbar"
            aria-label="Chat actions"
            className="chat__toolbar artifact-tray-demo__chat-head"
          >
            <div className="chat__toolbar-cluster chat__toolbar-cluster--start">
              <button type="button" className="chat__toolbar-btn" aria-label="Open menu">
                <ChatToolbarMenuIcon />
              </button>
              <p className="chat__toolbar-title">Rippling AI</p>
            </div>
            <div className="chat__toolbar-cluster chat__toolbar-cluster--end">
              <div className="artifact-tray-demo__more-anchor" ref={moreAnchorRef}>
                <button
                  ref={moreBtnRef}
                  type="button"
                  id={moreBtnId}
                  className="chat__toolbar-btn"
                  aria-label={menuOpen ? "Close chat options" : "Chat options"}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-controls={menuOpen ? moreMenuId : undefined}
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <IconMoreHorizontal width={20} height={20} />
                </button>
                {menuOpen ? (
                  <div
                    id={moreMenuId}
                    role="menu"
                    aria-labelledby={moreBtnId}
                    className="artifact-tray-demo__more-menu"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      className="artifact-tray-demo__more-menu-item"
                      aria-pressed={trayOpen}
                      onClick={() => {
                        setTrayOpen((open) => !open);
                        setMenuOpen(false);
                        moreBtnRef.current?.focus();
                      }}
                    >
                      {trayOpen ? "Hide artifacts" : "Show artifacts"}
                    </button>
                  </div>
                ) : null}
              </div>
              <button type="button" className="chat__toolbar-btn" aria-label="Add comment">
                <ChatToolbarAddCommentIcon />
              </button>
              <button type="button" className="chat__toolbar-btn" aria-label="Expand chat">
                <ChatToolbarExpandIcon />
              </button>
              <button type="button" className="chat__toolbar-btn" aria-label="Close chat">
                <ChatToolbarCloseIcon />
              </button>
            </div>
          </div>
          <div className="artifact-tray-demo__thread-wrap">
            <div className="artifact-tray-demo__thread" aria-hidden={trayOpen}>
              <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
                Pull Q3 attendance and draft an in-office policy refresh.
              </p>
              <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
                Done — three artifacts are ready in this conversation. Open the More menu to view
                them.
              </p>
            </div>
            <div
              id={trayRegionId}
              className="artifact-tray-demo__tray-overlay"
              data-state={trayOpen ? "open" : "closed"}
              aria-hidden={!trayOpen}
            >
              <ArtifactTray
                items={TRAY_ITEMS}
                onClose={() => {
                  setTrayOpen(false);
                  moreBtnRef.current?.focus();
                }}
                ariaLabel="Artifacts in this conversation"
                className="artifact-tray-demo__tray"
              />
            </div>
          </div>
          <div className="artifact-tray-demo__footer">
            <Composer
              width="fill"
              ariaComposerLabel="Chat composer"
              ariaMessageLabel="Message to Rippling AI"
              placeholder="Ask Rippling AI anything…"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FullScreenDemo() {
  return (
    <div
      className="artifact-tray-demo artifact-tray-demo--fullscreen"
      role="region"
      aria-label="Artifact tray in full-screen AI workspace"
    >
      <section className="artifact-tray-demo__fs-chat" aria-label="Rippling AI chat">
        <ChatToolbar
          className="artifact-tray-demo__fs-chat-head"
          title="Rippling AI"
          onMenuClick={() => {}}
          onAddCommentClick={() => {}}
          onExpandClick={() => {}}
          onCloseClick={() => {}}
        />
        <div className="artifact-tray-demo__fs-thread">
          <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
            Pull Q3 attendance, draft an in-office policy refresh, and route it through approvals.
          </p>
          <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
            Done — three artifacts generated for this conversation. They&rsquo;ll stay in the tray
            on the right until you clear them.
          </p>
        </div>
        <div className="artifact-tray-demo__fs-footer">
          <Composer
            width="fill"
            ariaComposerLabel="Chat composer"
            ariaMessageLabel="Message to Rippling AI"
            placeholder="Ask Rippling AI anything…"
          />
        </div>
      </section>
      <aside className="artifact-tray-demo__fs-tray-rail" aria-label="Artifact tray">
        <ArtifactTray items={TRAY_ITEMS} className="artifact-tray-demo__tray" />
      </aside>
    </div>
  );
}
