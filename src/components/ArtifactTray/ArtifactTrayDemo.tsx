/**
 * Artifact tray — in-context demo. Two modes:
 *
 *   1. `side-chat` — 440px side panel. The tray is hidden by default; the
 *      chat header exposes a More (⋯) menu with "Show artifacts". Selecting it
 *      eases the tray in from the top.
 *
 *   2. `full-screen` — full-width AI workspace. The tray is pinned to the
 *      right as a consistent column. A toggle button collapses it to an 8px
 *      sliver (Figma 1376:10803) — click the sliver to expand it back.
 *
 *  Figma references:
 *    tray open  → 1410:14813
 *    tray hidden (sliver) → 1376:10803
 */

import { useId, useRef, useState } from "react";
import { useDismissOnOutsidePress } from "../../hooks/useDismissOnOutsidePress";
import {
  ChatToolbar,
  ChatToolbarAddCommentIcon,
  ChatToolbarCloseIcon,
  ChatToolbarExpandPebbleIcon,
  ChatToolbarMenuIcon,
} from "../Chat";
import { Composer } from "../Composer";
import {
  ArtifactTray,
  ArtifactTrayIconWorkflow,
  ArtifactTrayIconFile,
  ArtifactTrayIconReport,
  type ArtifactTrayItem,
} from "./ArtifactTray";
import { IconMoreHorizontal } from "../../icons";
import "./ArtifactTrayDemo.css";

/* ── Artifact colour tokens (from Figma icon badges) ───────────────────── */
const COLOR_PURPLE = "#7a005d";
const COLOR_RED = "#bc2c00";

const ARTIFACT_ITEMS: readonly ArtifactTrayItem[] = [
  {
    id: "workflow",
    title: "Workflow",
    icon: <ArtifactTrayIconWorkflow />,
    iconBg: COLOR_PURPLE,
  },
  {
    id: "policy-pdf",
    title: "New in-office policy.PDF",
    icon: <ArtifactTrayIconFile />,
    iconBg: COLOR_RED,
  },
  {
    id: "attendance",
    title: "Office attendance",
    icon: <ArtifactTrayIconReport />,
    iconBg: COLOR_PURPLE,
  },
];

export type ArtifactTrayDemoMode = "side-chat" | "full-screen";

export function ArtifactTrayDemo() {
  const [mode, setMode] = useState<ArtifactTrayDemoMode>("side-chat");
  if (mode === "full-screen") return <FullScreenDemo onCollapse={() => setMode("side-chat")} />;
  return <SideChatDemo onExpand={() => setMode("full-screen")} />;
}

function SideChatDemo({ onExpand }: { onExpand: () => void }) {
  const uid = useId();
  const moreBtnId = `${uid}-more-btn`;
  const moreMenuId = `${uid}-more-menu`;
  const trayRegionId = `${uid}-tray`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);
  const moreAnchorRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  useDismissOnOutsidePress(
    menuOpen,
    (reason) => {
      setMenuOpen(false);
      if (reason === "escape") moreBtnRef.current?.focus();
    },
    (n) => moreAnchorRef.current?.contains(n) ?? false,
  );

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
              <button type="button" className="chat__toolbar-btn" aria-label="Expand to full screen" onClick={onExpand}>
                <ChatToolbarExpandPebbleIcon />
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
              <div className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
                <p className="artifact-tray-demo__bubble-heading">Q3 Attendance Summary</p>
                <p>
                  Blue whales, the largest animals to have ever existed on Earth, are
                  awe-inspiring creatures that continue to captivate scientists and nature
                  enthusiasts alike. These magnificent mammals command attention not only due
                  to their immense size but also because of their critical role in the marine
                  ecosystem.
                </p>
              </div>
              <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
                Great — can you break it down by department and flag anyone under 60%?
              </p>
              <div className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
                <p className="artifact-tray-demo__bubble-heading">Breakdown by department</p>
                <p>
                  Blue whales, the largest animals to have ever existed on Earth, are
                  awe-inspiring creatures that continue to captivate scientists and nature
                  enthusiasts alike.
                </p>
                <ul className="artifact-tray-demo__bubble-list">
                  <li>Here&rsquo;s an item as it would appear in a bulleted list</li>
                  <li>Another item from a list</li>
                  <li>And a final item</li>
                </ul>
              </div>
              <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
                Now draft the in-office policy based on that data.
              </p>
              <div className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
                <p className="artifact-tray-demo__bubble-heading">In-office policy draft</p>
                <p>
                  Blue whales, the largest animals to have ever existed on Earth, are
                  awe-inspiring creatures that continue to captivate scientists and nature
                  enthusiasts alike. These magnificent mammals command attention not only due
                  to their immense size but also because of their critical role in the marine
                  ecosystem.
                </p>
                <ul className="artifact-tray-demo__bubble-list">
                  <li>Here&rsquo;s an item as it would appear in a bulleted list</li>
                  <li>Another item from a list</li>
                  <li>And a final item</li>
                </ul>
              </div>
              <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
                Route the policy through approvals and set up a workflow.
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
                items={ARTIFACT_ITEMS}
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

function FullScreenDemo({ onCollapse }: { onCollapse: () => void }) {
  const [trayVisible, setTrayVisible] = useState(true);

  return (
    <div
      className="artifact-tray-demo artifact-tray-demo--fullscreen"
      role="region"
      aria-label="Artifact tray in full-screen AI workspace"
    >
      <ChatToolbar
        className="artifact-tray-demo__fs-header"
        title="Rippling AI"
        onMenuClick={() => {}}
        onAddCommentClick={() => {}}
        onExpandClick={() => {}}
        onCloseClick={onCollapse}
      />

      <div className="artifact-tray-demo__fs-body">
        <section className="artifact-tray-demo__fs-chat" aria-label="Rippling AI chat">
          <div className="artifact-tray-demo__fs-thread">
            <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
              Pull Q3 attendance, draft an in-office policy refresh, and route it through approvals.
            </p>
            <div className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
              <p className="artifact-tray-demo__bubble-heading">Q3 Attendance Summary</p>
              <p>
                Blue whales, the largest animals to have ever existed on Earth, are
                awe-inspiring creatures that continue to captivate scientists and nature
                enthusiasts alike. These magnificent mammals command attention not only due
                to their immense size but also because of their critical role in the marine
                ecosystem.
              </p>
            </div>
            <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
              Great — can you break it down by department and flag anyone under 60%?
            </p>
            <div className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
              <p className="artifact-tray-demo__bubble-heading">Breakdown by department</p>
              <p>
                Blue whales, the largest animals to have ever existed on Earth, are
                awe-inspiring creatures that continue to captivate scientists and nature
                enthusiasts alike.
              </p>
              <ul className="artifact-tray-demo__bubble-list">
                <li>Here&rsquo;s an item as it would appear in a bulleted list</li>
                <li>Another item from a list</li>
                <li>And a final item</li>
              </ul>
            </div>
            <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
              Now draft the in-office policy based on that data.
            </p>
            <div className="artifact-tray-demo__bubble artifact-tray-demo__bubble--assistant">
              <p className="artifact-tray-demo__bubble-heading">In-office policy draft</p>
              <p>
                Blue whales, the largest animals to have ever existed on Earth, are
                awe-inspiring creatures that continue to captivate scientists and nature
                enthusiasts alike.
              </p>
              <ul className="artifact-tray-demo__bubble-list">
                <li>Here&rsquo;s an item as it would appear in a bulleted list</li>
                <li>Another item from a list</li>
                <li>And a final item</li>
              </ul>
            </div>
            <p className="artifact-tray-demo__bubble artifact-tray-demo__bubble--user">
              Route the policy through approvals and set up a workflow.
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

        {/*
         * Tray rail — two states driven by `data-tray-visible`:
         *   true  → full tray always shown.
         *   false → 8px sliver; CSS :hover instantly slides the tray out
         *           without any React re-render. Moving the mouse away
         *           collapses it back to the sliver.
         * Both the sliver and the tray card are always in the DOM so the
         * CSS transition has nothing to interpolate between renders.
         */}
        <aside
          className="artifact-tray-demo__fs-tray-rail"
          data-tray-visible={trayVisible}
          aria-label="Artifact tray"
        >
          <div className="artifact-tray-demo__fs-tray-sliver" aria-hidden />
          <ArtifactTray
            items={ARTIFACT_ITEMS}
            onClose={() => setTrayVisible(false)}
            ariaLabel="Artifacts in this conversation"
            className="artifact-tray-demo__tray"
          />
        </aside>
      </div>
    </div>
  );
}
