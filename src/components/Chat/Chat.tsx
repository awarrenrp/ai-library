import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import "./Chat.css";

/** Shell width / chrome — swap via Chat page toolbar. */
export const CHAT_LAYOUT_VARIANTS = ["side-panel", "page"] as const;
export type ChatLayoutVariant = (typeof CHAT_LAYOUT_VARIANTS)[number];

export const CHAT_THREAD_PRESETS = ["conversation", "empty"] as const;
export type ChatThreadPreset = (typeof CHAT_THREAD_PRESETS)[number];

/** Chat panel demo — thinking presentation + animation (Chat page settings). */
export const CHAT_PANEL_VERSIONS = ["default", "no-glyphs", "animated"] as const;
export type ChatPanelVersion = (typeof CHAT_PANEL_VERSIONS)[number];

export const CHAT_PANEL_VERSION_LABELS: Record<ChatPanelVersion, string> = {
  default: "Default",
  "no-glyphs": "No glyphs",
  animated: "Animations",
};

export type ChatThinkingStep = { id: string; label: string };

const THINKING_STEP_MS = 1200;

export type ChatThinkingBlockProps = {
  title?: string;
  steps?: readonly ChatThinkingStep[];
  className?: string;
  defaultCollapsed?: boolean;
  panelVersion?: ChatPanelVersion;
  /** Increment to restart the animated thinking sequence. */
  replayKey?: number;
  /** Animated panel only — `true` when the step-by-step run has finished. */
  onAnimatedCompleteChange?: (complete: boolean) => void;
};

/** Figma · Thinking block (66:117) — expanded trace with optional glyphs / animation. */
export const CHAT_THINKING_SAMPLE_STEPS: readonly ChatThinkingStep[] = [
  { id: "1", label: "Reviewing your request and identifying the right resources" },
  { id: "2", label: "Breaking down your question to find the right data" },
  {
    id: "3",
    label: "Searching for fields related to employee hires, start dates, and manager relationships",
  },
  { id: "4", label: "Looking up the correct field names for employee records" },
  { id: "5", label: "Reviewing answer" },
] as const;

function IconThinkingLeading() {
  return (
    <svg className="chat__thinking-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5v2.5M8 12v2.5M14.5 8H12M4 8H1.5M12.95 3.05l-1.77 1.77M4.82 11.18l-1.77 1.77M12.95 12.95l-1.77-1.77M4.82 4.82 3.05 3.05"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}

function IconStepDone() {
  return (
    <svg className="chat__thinking-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 8l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronToggle({ contentExpanded }: { contentExpanded: boolean }) {
  return (
    <svg
      className={["chat__thinking-chevron-svg", contentExpanded ? "chat__thinking-chevron-svg--up" : ""]
        .filter(Boolean)
        .join(" ")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatThinkingAnimated({
  steps,
  replayKey,
  onAnimatedCompleteChange,
  className,
}: {
  steps: readonly ChatThinkingStep[];
  replayKey: number;
  onAnimatedCompleteChange?: (complete: boolean) => void;
  className?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [phase, setPhase] = useState<"running" | "done">("running");
  const [activeIndex, setActiveIndex] = useState(0);
  const regionId = useId();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onAnimatedCompleteChange?.(false);
    setPhase("running");
    setActiveIndex(0);
    setCollapsed(false);
  }, [replayKey, onAnimatedCompleteChange]);

  useEffect(() => {
    if (phase !== "running") return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => {
        if (i >= steps.length - 1) {
          setPhase("done");
          onAnimatedCompleteChange?.(true);
          return i;
        }
        return i + 1;
      });
    }, THINKING_STEP_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, activeIndex, steps.length, onAnimatedCompleteChange]);

  const title = phase === "done" ? "Thinking completed" : "Thinking…";
  const active = steps[activeIndex];

  return (
    <div
      className={["chat__thinking", "chat__thinking--animated", collapsed ? "chat__thinking--collapsed" : "", className]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label="Thinking trace"
    >
      <div className="chat__thinking-header">
        <p id={regionId} className="chat__thinking-title">
          {title}
        </p>
        <button
          type="button"
          className="chat__thinking-collapse"
          aria-expanded={!collapsed}
          aria-controls={`${regionId}-steps`}
          onClick={() => setCollapsed((c) => !c)}
        >
          <span className="visually-hidden">{collapsed ? "Expand thinking steps" : "Collapse thinking steps"}</span>
          <IconChevronToggle contentExpanded={!collapsed} />
        </button>
      </div>
      {phase === "running" && active ? (
        <ul
          id={`${regionId}-steps`}
          className="chat__thinking-steps chat__thinking-steps--single"
          aria-labelledby={regionId}
          aria-hidden={collapsed}
        >
          <li className="chat__thinking-row chat__thinking-row--text-only">
            <div className="chat__thinking-shimmer-wrap">
              <span className="chat__thinking-step-label">{active.label}</span>
              <div className="chat__thinking-shimmer-duo" aria-hidden>
                <span className="chat__thinking-shimmer-line" />
                <span className="chat__thinking-shimmer-line" />
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <ul
          id={`${regionId}-steps`}
          className="chat__thinking-steps"
          aria-labelledby={regionId}
          aria-hidden={collapsed}
        >
          {steps.map((step) => (
            <li key={step.id} className="chat__thinking-row chat__thinking-row--text-only">
              <span className="chat__thinking-step-label">{step.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ChatThinkingBlock({
  title = "Thinking completed",
  steps = CHAT_THINKING_SAMPLE_STEPS,
  className,
  defaultCollapsed = false,
  panelVersion = "default",
  replayKey = 0,
  onAnimatedCompleteChange,
}: ChatThinkingBlockProps) {
  if (panelVersion === "animated") {
    return (
      <ChatThinkingAnimated
        steps={steps}
        replayKey={replayKey}
        onAnimatedCompleteChange={onAnimatedCompleteChange}
        className={className}
      />
    );
  }

  const hideGlyphs = panelVersion === "no-glyphs";
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const regionId = useId();

  return (
    <div
      className={[
        "chat__thinking",
        hideGlyphs ? "chat__thinking--no-glyphs" : "",
        collapsed ? "chat__thinking--collapsed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label="Thinking trace"
    >
      <div className="chat__thinking-header">
        {!hideGlyphs ? (
          <span className="chat__thinking-icon-slot" aria-hidden>
            <IconThinkingLeading />
          </span>
        ) : null}
        <p id={regionId} className="chat__thinking-title">
          {title}
        </p>
        <button
          type="button"
          className="chat__thinking-collapse"
          aria-expanded={!collapsed}
          aria-controls={`${regionId}-steps`}
          onClick={() => setCollapsed((c) => !c)}
        >
          <span className="visually-hidden">{collapsed ? "Expand thinking steps" : "Collapse thinking steps"}</span>
          <IconChevronToggle contentExpanded={!collapsed} />
        </button>
      </div>
      <ul
        id={`${regionId}-steps`}
        className="chat__thinking-steps"
        aria-labelledby={regionId}
        aria-hidden={collapsed}
      >
        {steps.map((step) => (
          <li key={step.id} className={["chat__thinking-row", hideGlyphs ? "chat__thinking-row--text-only" : ""].filter(Boolean).join(" ")}>
            {!hideGlyphs ? (
              <span className="chat__thinking-icon-slot" aria-hidden>
                <IconStepDone />
              </span>
            ) : null}
            <span className="chat__thinking-step-label">{step.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type ChatProps = {
  variant?: ChatLayoutVariant;
  threadPreset?: ChatThreadPreset;
  panelVersion?: ChatPanelVersion;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  ariaThreadLabel?: string;
};

export function ChatSampleThread({
  panelVersion = "default",
  thinkingReplayKey = 0,
  onThinkingAnimCompleteChange,
}: {
  panelVersion?: ChatPanelVersion;
  thinkingReplayKey?: number;
  onThinkingAnimCompleteChange?: (complete: boolean) => void;
}) {
  return (
    <>
      <div className="chat__row chat__row--assistant">
        <div className="chat__block chat__block--ai">
          <p className="chat__block-text chat__block-text--ai">
            I can help with that. Do you want a summary of headcount changes last quarter, or a breakdown by department?
          </p>
        </div>
      </div>
      <div className="chat__row chat__row--user">
        <div className="chat__block chat__block--self">
          <p className="chat__block-text chat__block-text--self">Headcount by department for Q3.</p>
        </div>
      </div>
      <div className="chat__row chat__row--assistant">
        <ChatThinkingBlock
          panelVersion={panelVersion}
          replayKey={thinkingReplayKey}
          onAnimatedCompleteChange={onThinkingAnimCompleteChange}
        />
      </div>
      <div className="chat__row chat__row--assistant">
        <div className="chat__block chat__block--ai">
          <p className="chat__block-text chat__block-text--ai">
            Pulling the latest org chart and payroll effective dates—one moment.
          </p>
        </div>
      </div>
    </>
  );
}

export function ChatEmptyThread() {
  return (
    <div className="chat__empty">
      <p className="chat__empty-title">New conversation</p>
      <p className="chat__empty-desc">Ask Rippling AI about people, payroll, benefits, and more.</p>
    </div>
  );
}

function defaultThread(
  preset: ChatThreadPreset,
  panelVersion: ChatPanelVersion,
  thinkingReplayKey: number,
  onThinkingAnimCompleteChange?: (complete: boolean) => void,
): ReactNode {
  if (preset === "empty") return <ChatEmptyThread />;
  return (
    <ChatSampleThread
      panelVersion={panelVersion}
      thinkingReplayKey={thinkingReplayKey}
      onThinkingAnimCompleteChange={onThinkingAnimCompleteChange}
    />
  );
}

function IconReplay() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12a8 8 0 1 1 3 6.3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 16V12h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chat({
  variant = "side-panel",
  threadPreset = "conversation",
  panelVersion = "default",
  children,
  footer,
  className,
  ariaThreadLabel = "Conversation",
}: ChatProps) {
  const layoutClass = `chat--${variant}`;
  const [thinkingReplayKey, setThinkingReplayKey] = useState(0);
  const [thinkingAnimComplete, setThinkingAnimComplete] = useState(false);

  useEffect(() => {
    setThinkingAnimComplete(false);
    setThinkingReplayKey(0);
  }, [panelVersion]);

  return (
    <section
      className={["chat", layoutClass, className].filter(Boolean).join(" ")}
      aria-label="Chat"
      data-chat-variant={variant}
      data-chat-panel={panelVersion}
    >
      {panelVersion === "animated" && thinkingAnimComplete ? (
        <button
          type="button"
          className="chat__panel-replay"
          aria-label="Replay thinking animation"
          onClick={() => {
            setThinkingAnimComplete(false);
            setThinkingReplayKey((k) => k + 1);
          }}
        >
          <IconReplay />
        </button>
      ) : null}
      <div className="chat__thread" role="region" aria-label={ariaThreadLabel}>
        <div className="chat__track">
          {children ?? defaultThread(threadPreset, panelVersion, thinkingReplayKey, setThinkingAnimComplete)}
        </div>
      </div>
      {footer ? (
        <div className="chat__footer">
          <div className="chat__footer-inner">{footer}</div>
        </div>
      ) : null}
    </section>
  );
}
