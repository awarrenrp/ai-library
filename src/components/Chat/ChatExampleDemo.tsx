/*
 * Chat example demo — Examples section for the Chat spec page.
 *
 * Mirrors the `DisambiguationInChatDemo` pattern (same `data-mode` toggle for
 * side-chat vs full-screen, same chrome via the real `ChatToolbar`, real
 * `Composer`), but adapts its behavior to the gear-selected panel version so
 * the example always reflects what's chosen at the top of the page:
 *
 *   - `default`   — submit drops a real `ChatThinkingBlock` (with glyphs) plus
 *                   the AI reply into the thread, as it would in product.
 *   - `no-glyphs` — same, with the no-glyphs variant.
 *   - `animated`  — the `ChatComposerHat` rides above the composer and runs
 *                   its full cycle (idle → thinking → shimmer → cycling →
 *                   done → idle), then lands the AI reply on completion. A
 *                   second control row exposes a controlled-phase preview so
 *                   each animation state can be inspected on its own.
 */

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ChatComposerHat,
  ChatThinkingBlock,
  ChatToolbar,
  ChatToolbarCollapsePebbleIcon,
  ChatToolbarExpandPebbleIcon,
  CHAT_HAT_PHASES,
  CHAT_HAT_PHASE_LABELS,
} from "./Chat";
import type { ChatHatPhase, ChatPanelVersion } from "./Chat";
import { Composer } from "../Composer";
import { IconArrowUpMini } from "../Composer/icons";
import "./ChatExampleDemo.css";

export type ChatExampleDemoMode = "side-chat" | "full-screen";

type ThreadEntry =
  | { kind: "ai"; id: string; text: string }
  | { kind: "user"; id: string; text: string }
  | { kind: "thinking"; id: string };

const SEED_THREAD: readonly ThreadEntry[] = [
  {
    kind: "ai",
    id: "seed-ai-1",
    text:
      "I can help with that. Do you want a summary of headcount changes last quarter, or a breakdown by department?",
  },
  {
    kind: "user",
    id: "seed-user-1",
    text: "Headcount by department for Q3.",
  },
] as const;

/** Canned AI reply landed once the assistant turn finishes. */
const SAMPLE_REPLY =
  "Pulling the latest org chart and payroll effective dates—Engineering grew 6, Sales 3, People 1.";

/** How long non-animated panel versions sit in "busy" before landing the
 * thinking block + reply. Long enough to feel like a real round trip but
 * short enough not to bore the demo viewer. */
const STATIC_THINKING_DELAY_MS = 1300;

export type ChatExampleDemoProps = {
  mode?: ChatExampleDemoMode;
  /**
   * Mirrors the gear selector at the top of the Chat page so the example
   * shows the same panel version as the Specs preview.
   */
  panelVersion?: ChatPanelVersion;
};

export function ChatExampleDemo({
  mode = "side-chat",
  panelVersion = "default",
}: ChatExampleDemoProps) {
  const isAnimated = panelVersion === "animated";
  const [thread, setThread] = useState<ThreadEntry[]>(() => [...SEED_THREAD]);
  // Bumped each time the user submits in animated mode — drives the hat to
  // restart its full cycle. Starts at 0 so the hat sits in `idle` until the
  // first interaction.
  const [replayKey, setReplayKey] = useState(0);
  // Controlled phase override (preview chips). Animated mode only.
  const [controlledPhase, setControlledPhase] = useState<ChatHatPhase | null>(null);
  // Toolbar expand/collapse toggle — animated mode only. Mirrors the
  // behavior in the `Chat` shell so the example reflects the real glyph swap.
  const [isExpanded, setIsExpanded] = useState(false);
  // Tracks "the assistant is mid-turn" so the composer disables submit while
  // the cycle / static delay is in flight (prevents stacking submissions).
  const [busy, setBusy] = useState(false);
  // For animated mode: held until the hat cycle completes, then landed.
  const pendingReplyRef = useRef<ThreadEntry | null>(null);
  const staticTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  // Auto-scroll thread to bottom on every update so the latest turn is visible.
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [thread, busy]);

  // Cancel any in-flight static-thinking timer when the panel version changes
  // (parent remounts via `key={panelVersion}` but be defensive anyway).
  useEffect(() => {
    return () => {
      if (staticTimerRef.current) clearTimeout(staticTimerRef.current);
    };
  }, []);

  function handleSubmit(value: string) {
    if (busy) return;
    if (isAnimated && controlledPhase) {
      // While a phase is pinned, treat submit as a no-op so the user's preview
      // pick isn't yanked out from under them mid-inspection.
      return;
    }
    const stamp = Date.now();
    const userTurn: ThreadEntry = {
      kind: "user",
      id: `user-${stamp}`,
      text: value,
    };
    const reply: ThreadEntry = {
      kind: "ai",
      id: `ai-${stamp}`,
      text: SAMPLE_REPLY,
    };
    setBusy(true);

    if (isAnimated) {
      // Animated panel: hat runs the cycle, reply lands on cycle complete.
      pendingReplyRef.current = reply;
      setThread((t) => [...t, userTurn]);
      setReplayKey((k) => k + 1);
      return;
    }

    // Default / no-glyphs: brief delay, then drop the thinking block + reply
    // together. This mirrors product behavior where the trace appears once
    // the assistant turn resolves.
    setThread((t) => [...t, userTurn]);
    if (staticTimerRef.current) clearTimeout(staticTimerRef.current);
    staticTimerRef.current = setTimeout(() => {
      const thinkingTurn: ThreadEntry = { kind: "thinking", id: `thinking-${stamp}` };
      setThread((t) => [...t, thinkingTurn, reply]);
      setBusy(false);
    }, STATIC_THINKING_DELAY_MS);
  }

  function handleCycleComplete() {
    setBusy(false);
    const reply = pendingReplyRef.current;
    pendingReplyRef.current = null;
    if (reply) setThread((t) => [...t, reply]);
  }

  function handleResetThread() {
    if (staticTimerRef.current) clearTimeout(staticTimerRef.current);
    setControlledPhase(null);
    setBusy(false);
    pendingReplyRef.current = null;
    setThread([...SEED_THREAD]);
    setReplayKey(0);
  }

  const placeholder = busy
    ? "Rippling AI is responding…"
    : isAnimated && controlledPhase
      ? "Phase preview pinned — clear to chat"
      : "Ask Rippling AI anything…";

  function renderEntry(entry: ThreadEntry): ReactNode {
    if (entry.kind === "thinking") {
      return (
        <div key={entry.id} className="chat-demo__row chat-demo__row--assistant">
          <ChatThinkingBlock panelVersion={panelVersion} className="chat-demo__thinking" />
        </div>
      );
    }
    return (
      <p
        key={entry.id}
        className={[
          "chat-demo__bubble",
          entry.kind === "ai" ? "chat-demo__bubble--ai" : "chat-demo__bubble--user",
        ].join(" ")}
      >
        {entry.text}
      </p>
    );
  }

  return (
    <div className="chat-demo" data-mode={mode} data-panel={panelVersion}>
      <div
        className="chat-demo__surface"
        role="region"
        aria-label={
          mode === "full-screen"
            ? "Chat example in full-screen workspace"
            : "Chat example in side chat"
        }
      >
        <div className="chat-demo__app" aria-hidden={mode === "full-screen"}>
          <p className="chat-demo__app-label">App surface</p>
          <p className="chat-demo__app-body">
            The product UI stays on the left. Rippling AI opens as a side panel; the same
            composer powers every panel version — only the way the assistant communicates
            its thinking changes.
          </p>
        </div>
        <div className="chat-demo__chat-wrap">
          <div className="chat-demo__chat">
            <ChatToolbar
              className="chat-demo__chat-head"
              title="Rippling AI"
              onMenuClick={() => {}}
              onAddCommentClick={() => {}}
              onExpandClick={() => {
                if (isAnimated) setIsExpanded((v) => !v);
              }}
              onCloseClick={() => {}}
              expandIcon={
                isAnimated
                  ? isExpanded
                    ? <ChatToolbarCollapsePebbleIcon />
                    : <ChatToolbarExpandPebbleIcon />
                  : undefined
              }
              expandLabel={
                isAnimated ? (isExpanded ? "Collapse chat" : "Expand chat") : undefined
              }
            />
            <div
              ref={threadRef}
              className="chat-demo__thread"
              role="log"
              aria-label="Conversation messages"
              aria-live="polite"
              aria-relevant="additions text"
              tabIndex={0}
            >
              {thread.map(renderEntry)}
            </div>
            <div className="chat-demo__footer" role="group" aria-label="Message composer">
              <div className="chat-demo__footer-inner">
                {isAnimated ? (
                  <ChatComposerHat
                    replayKey={replayKey}
                    phase={controlledPhase ?? undefined}
                    autoStart={false}
                    onCycleComplete={handleCycleComplete}
                  />
                ) : null}
                <Composer
                  width="fill"
                  ariaComposerLabel="Chat composer"
                  ariaMessageLabel="Message to Rippling AI"
                  placeholder={placeholder}
                  onSubmit={handleSubmit}
                  {...(isAnimated
                    ? { sendIcon: <IconArrowUpMini />, controls: "intent" as const }
                    : {})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAnimated ? (
        <div className="chat-demo__phase-controls" aria-label="Composer hat phase preview">
          <div className="chat-demo__phase-label-group">
            <p className="chat-demo__phase-label">Phase preview</p>
            <p className="chat-demo__phase-help">
              Pin any state to inspect it without waiting for the cycle. Clear to return to
              interactive mode.
            </p>
          </div>
          <div className="chat-demo__phase-segments" role="group" aria-label="Hat phase">
            {CHAT_HAT_PHASES.map((p) => (
              <button
                key={p}
                type="button"
                className="chat-demo__phase-segment"
                aria-pressed={controlledPhase === p}
                onClick={() => setControlledPhase((current) => (current === p ? null : p))}
              >
                {CHAT_HAT_PHASE_LABELS[p]}
              </button>
            ))}
            <button
              type="button"
              className="chat-demo__phase-segment chat-demo__phase-segment--clear"
              onClick={() => setControlledPhase(null)}
              disabled={controlledPhase === null}
            >
              Clear
            </button>
            <button
              type="button"
              className="chat-demo__phase-segment chat-demo__phase-segment--reset"
              onClick={handleResetThread}
            >
              Reset thread
            </button>
          </div>
        </div>
      ) : (
        <div className="chat-demo__phase-controls chat-demo__phase-controls--simple">
          <div className="chat-demo__phase-label-group">
            <p className="chat-demo__phase-label">Try the conversation</p>
            <p className="chat-demo__phase-help">
              Send a message — the inline thinking block lands with the assistant's reply, just
              as it would in product.
            </p>
          </div>
          <button
            type="button"
            className="chat-demo__phase-segment chat-demo__phase-segment--reset"
            onClick={handleResetThread}
          >
            Reset thread
          </button>
        </div>
      )}
    </div>
  );
}
