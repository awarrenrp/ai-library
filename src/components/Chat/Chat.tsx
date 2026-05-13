import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { Button, IconButton, iconTypes } from "../../pebbleButton";
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
        <div className="chat__thinking-collapse">
          <Button
            type={Button.TYPES.BUTTON}
            variant={Button.VARIANTS.TEXT}
            appearance={Button.APPEARANCES.GHOST}
            size={Button.SIZES.XS}
            aria-expanded={!collapsed}
            aria-controls={`${regionId}-steps`}
            onClick={() => setCollapsed((c) => !c)}
          >
            <>
              <span className="visually-hidden">{collapsed ? "Expand thinking steps" : "Collapse thinking steps"}</span>
              <IconChevronToggle contentExpanded={!collapsed} />
            </>
          </Button>
        </div>
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
        <div className="chat__thinking-collapse">
          <Button
            type={Button.TYPES.BUTTON}
            variant={Button.VARIANTS.TEXT}
            appearance={Button.APPEARANCES.GHOST}
            size={Button.SIZES.XS}
            aria-expanded={!collapsed}
            aria-controls={`${regionId}-steps`}
            onClick={() => setCollapsed((c) => !c)}
          >
            <>
              <span className="visually-hidden">{collapsed ? "Expand thinking steps" : "Collapse thinking steps"}</span>
              <IconChevronToggle contentExpanded={!collapsed} />
            </>
          </Button>
        </div>
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
  /** Accessible name for the outer chat shell (landmark). */
  ariaLabel?: string;
  /** Name for the message history area (`role="log"`). */
  ariaThreadLabel?: string;
  /** Name for the footer / composer strip when `footer` is set. */
  ariaComposerLabel?: string;
  /**
   * Top toolbar — Figma `AI · Copilot — Embedded Experiences` node 7164:61241.
   * Pass `false` to suppress; pass a partial object to opt into the buttons you
   * want. The toolbar is hidden entirely when there's no `title` and no handlers.
   */
  toolbar?: ChatToolbarProps | false;
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
  // The animated panel hoists thinking up into the composer hat, so we omit the
  // inline `ChatThinkingBlock` row in that mode to avoid double-presenting it.
  const showInlineThinking = panelVersion !== "animated";
  return (
    <>
      <li className="chat__row chat__row--assistant">
        <article className="chat__block chat__block--ai" aria-label="Assistant message">
          <p className="chat__block-text chat__block-text--ai">
            I can help with that. Do you want a summary of headcount changes last quarter, or a breakdown by department?
          </p>
        </article>
      </li>
      <li className="chat__row chat__row--user">
        <article className="chat__block chat__block--self" aria-label="Your message">
          <p className="chat__block-text chat__block-text--self">Headcount by department for Q3.</p>
        </article>
      </li>
      {showInlineThinking ? (
        <li className="chat__row chat__row--assistant">
          <ChatThinkingBlock
            panelVersion={panelVersion}
            replayKey={thinkingReplayKey}
            onAnimatedCompleteChange={onThinkingAnimCompleteChange}
          />
        </li>
      ) : null}
      <li className="chat__row chat__row--assistant">
        <article className="chat__block chat__block--ai" aria-label="Assistant message">
          <p className="chat__block-text chat__block-text--ai">
            Pulling the latest org chart and payroll effective dates—one moment.
          </p>
        </article>
      </li>
    </>
  );
}

export function ChatEmptyThread() {
  return (
    <li className="chat__track-empty">
      <div className="chat__empty" role="status">
        <p className="chat__empty-title">New conversation</p>
        <p className="chat__empty-desc">Ask Rippling AI about people, payroll, benefits, and more.</p>
      </div>
    </li>
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

/*
 * Composer hat icons — sourced from Figma `AI-components` chat animation states.
 * Each renders inside a 16×16 box, centered in a 20×20 frame in the hat. Vector
 * paths copied verbatim from the Figma nodes referenced in the headers below so
 * the hat's morphing icon stays 1:1 with the source design across all phases.
 */

/** Boxes / dashboard glyph — 1151:26856 ("Boxes" instance, idle/done state). */
function IconHatBoxes() {
  return (
    <svg className="chat__hat-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g transform="translate(1.5 2.167)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M13 11.667H0V0h13v11.667ZM1 10.667h4v-6H1v6Zm5-2.667v2.667h6V8H6Zm0-1h6V1H6v6ZM1 3.667h4V1H1v2.667Z"
        />
      </g>
    </svg>
  );
}

/** Courses / thinking glyph — 1189:31599 ("Courses" instance, thinking states). */
function IconHatCourses() {
  return (
    <svg className="chat__hat-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g transform="translate(1.5 1)">
        <path
          fill="currentColor"
          d="M4.715 0c.73 0 1.37.35 1.786.887C6.917.349 7.557 0 8.287 0c1.25 0 2.237 1.024 2.284 2.266.949.295 1.623 1.207 1.623 2.26 0 .277-.047.544-.133.793.573.432.939 1.128.939 1.906 0 .656-.26 1.254-.685 1.684.17.331.266.707.266 1.105 0 1.228-.918 2.266-2.12 2.354-.294.938-1.146 1.633-2.175 1.633-.73 0-1.37-.35-1.786-.887-.416.538-1.056.887-1.786.887-1.03 0-1.881-.694-2.176-1.633C1.337 12.28.42 11.243.42 10.015c0-.398.096-.775.266-1.106-.424-.43-.685-1.027-.685-1.684 0-.778.367-1.475.939-1.906A2.337 2.337 0 0 1 .806 4.525C.806 3.473 1.48 2.561 2.43 2.266 2.477 1.024 3.463 0 4.713 0h.002Zm-1.286 2.359c0 .08.007.157.019.233l.086.535-.54.043c-.647.052-1.187.624-1.187 1.356 0 .271.075.522.202.732l.293.484-.516.232c-.455.204-.785.682-.785 1.252 0 .497.25.925.617 1.16l.471.305-.356.434c-.195.237-.314.547-.314.89 0 .77.594 1.359 1.286 1.359.057 0 .112-.004.165-.011l.51-.072.058.512c.077.69.635 1.198 1.277 1.198.69 0 1.284-.586 1.286-1.354L6 11.559V2.442l.002-.087C6 1.587 5.405 1 4.714 1 4.024 1 3.43 1.589 3.43 2.359Zm6.143 0C9.572 1.59 8.978 1 8.287 1c-.69 0-1.284.587-1.286 1.354L7 2.441v9.117l-.002.088C7 12.413 7.596 13 8.287 13c.643 0 1.2-.508 1.277-1.199l.057-.512.51.072c.054.007.108.011.166.011.69 0 1.286-.589 1.286-1.359 0-.343-.12-.652-.314-.89l-.356-.433.471-.304c.366-.236.617-.664.617-1.161 0-.57-.33-1.048-.785-1.252l-.516-.231.293-.484a1.41 1.41 0 0 0 .203-.732c0-.732-.54-1.304-1.187-1.355l-.541-.043.087-.535c.012-.076.018-.154.018-.233Z"
        />
      </g>
    </svg>
  );
}

/** Check Circle glyph — 1194:34141 ("Check Circle" instance, success/done state). */
function IconHatCheckCircle() {
  return (
    <svg className="chat__hat-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <g transform="translate(1.167 1.167)">
        <path fill="currentColor" d="m5.333 9.874 5.02-5.02-.707-.708-4.314 4.314L3.686 6.813l-.707.708L5.332 9.874Z" />
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.833 0C3.06 0 0 3.06 0 6.833c0 3.774 3.06 6.834 6.833 6.834 3.775 0 6.834-3.06 6.834-6.834C13.667 3.06 10.608 0 6.833 0ZM1 6.833A5.833 5.833 0 1 1 12.667 6.834 5.833 5.833 0 0 1 1 6.833Z"
        />
      </g>
    </svg>
  );
}

/**
 * Default cycling labels — match Figma `1189:33289` ("Putting together a plan")
 * plus a trio of complementary phrasings so the cycling state runs through
 * a believable plan-execution sequence before resolving back to the original
 * artifact label.
 */
const CHAT_HAT_CYCLING_STEPS = [
  "Putting together a plan",
  "Pulling the latest org chart",
  "Reading payroll effective dates",
  "Drafting the breakdown",
] as const;

export const CHAT_HAT_PHASES = ["idle", "thinking", "shimmer", "cycling", "done"] as const;
export type ChatHatPhase = (typeof CHAT_HAT_PHASES)[number];

export const CHAT_HAT_PHASE_LABELS: Record<ChatHatPhase, string> = {
  idle: "Idle",
  thinking: "Thinking",
  shimmer: "Shimmer",
  cycling: "Cycling",
  done: "Done",
};

/**
 * Per-phase durations (ms). The full cycle resolves in roughly 6.4s and then
 * pauses on `done` for ~1.6s before melting back to `idle`.
 */
const HAT_PHASE_MS: Record<Exclude<ChatHatPhase, "idle">, number> = {
  thinking: 900,
  shimmer: 1100,
  cycling: 0, // computed from CHAT_HAT_CYCLING_STEPS.length × per-step
  done: 1600,
};
const HAT_CYCLING_STEP_MS = 950;

export type ChatComposerHatProps = {
  /** Resting label shown in `idle` and `done` (e.g. the artifact context chip). */
  contextLabel?: string;
  /**
   * Increment to restart the animation cycle. When `phase` is provided this
   * prop is ignored (the hat is fully controlled by the parent).
   */
  replayKey?: number;
  /**
   * Controlled phase override. When set, the hat renders that exact state and
   * disables the internal cycle timer. Useful for explicit demos / phase
   * preview controls.
   */
  phase?: ChatHatPhase;
  /**
   * When `false`, the hat sits in `idle` until `replayKey` is bumped. Defaults
   * to `true` to preserve the existing auto-start behavior used by the chat
   * shell's animated panel version.
   */
  autoStart?: boolean;
  /** Fired when the hat returns to `idle` after a completed (uncontrolled) cycle. */
  onCycleComplete?: () => void;
  /**
   * Optional handler for the trailing close X. When provided, clicking it is
   * up to the parent (e.g. dismiss the context chip). When omitted, the X is
   * a no-op affordance retained for visual fidelity with Figma.
   */
  onDismiss?: () => void;
  className?: string;
};

/**
 * `ChatComposerHat` — a status chip that visually "hats" the composer when the
 * animated panel version is active. It morphs through five phases (idle →
 * thinking → shimmer → cycling → done → idle), bringing the assistant's
 * thinking state directly above the input instead of inline in the thread.
 *
 * The hat is decorative for screen readers (the live region in the thread still
 * announces phase changes via the existing `role="log"` chat thread); keeping
 * the hat `aria-hidden` avoids double-announcing identical state copy.
 *
 * Three usage modes:
 *   1. Auto-cycle (default): mounts → idle → thinking → … → idle. `replayKey`
 *      restarts the cycle. Used by the `Chat` shell's animated panel version.
 *   2. User-triggered: pass `autoStart={false}` and bump `replayKey` on submit
 *      to gate the cycle behind a real interaction (see `ChatAnimationDemo`).
 *   3. Fully controlled: pass `phase` for an explicit phase preview (e.g. a
 *      "show all states" demo) — internal timers are disabled.
 */
export function ChatComposerHat({
  contextLabel = "New hires from Jan – Aug, 2025",
  replayKey = 0,
  phase: phaseProp,
  autoStart = true,
  onCycleComplete,
  onDismiss,
  className,
}: ChatComposerHatProps) {
  const isControlled = phaseProp !== undefined;
  const [internalPhase, setInternalPhase] = useState<ChatHatPhase>("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phase = isControlled ? phaseProp : internalPhase;
  // Close-button exit. `dismissing` toggles the CSS exit transition (200ms
  // ease-out: pull-down + fade + height collapse); once the transition has
  // finished we drop the node entirely via `mounted` so the composer reclaims
  // the space cleanly. Both reset on every `replayKey` bump so the next user
  // interaction re-engages the hat.
  const HAT_EXIT_MS = 200;
  const [dismissing, setDismissing] = useState(false);
  const [mounted, setMounted] = useState(true);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restart animation whenever `replayKey` flips. We seed a short pre-roll on
  // `idle` so the first transition feels intentional (mimicking "user typed,
  // now the assistant is thinking…"). Skipped entirely when controlled or when
  // `autoStart` is false and we're at the initial replayKey of 0.
  useEffect(() => {
    if (isControlled) return;
    setInternalPhase("idle");
    setStepIndex(0);
    if (!autoStart && replayKey === 0) return;
    const start = window.setTimeout(() => setInternalPhase("thinking"), 600);
    return () => window.clearTimeout(start);
  }, [replayKey, isControlled, autoStart]);

  // Re-engage the hat for the next interaction — every `replayKey` bump (e.g.
  // user submits another message) cancels any in-flight exit and remounts.
  useEffect(() => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
    setDismissing(false);
    setMounted(true);
  }, [replayKey]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const handleDismiss = () => {
    if (dismissing) return;
    setDismissing(true);
    onDismiss?.();
    exitTimerRef.current = window.setTimeout(() => {
      setMounted(false);
      exitTimerRef.current = null;
    }, HAT_EXIT_MS);
  };

  useEffect(() => {
    if (isControlled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (internalPhase === "thinking") {
      timerRef.current = setTimeout(() => setInternalPhase("shimmer"), HAT_PHASE_MS.thinking);
    } else if (internalPhase === "shimmer") {
      timerRef.current = setTimeout(() => {
        setStepIndex(0);
        setInternalPhase("cycling");
      }, HAT_PHASE_MS.shimmer);
    } else if (internalPhase === "cycling") {
      timerRef.current = setTimeout(() => {
        if (stepIndex >= CHAT_HAT_CYCLING_STEPS.length - 1) {
          setInternalPhase("done");
        } else {
          setStepIndex((i) => i + 1);
        }
      }, HAT_CYCLING_STEP_MS);
    } else if (internalPhase === "done") {
      timerRef.current = setTimeout(() => {
        setInternalPhase("idle");
        onCycleComplete?.();
      }, HAT_PHASE_MS.done);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [internalPhase, stepIndex, onCycleComplete, isControlled]);

  const isThinkingFamily = phase === "thinking" || phase === "shimmer" || phase === "cycling";

  let icon: ReactNode;
  if (phase === "done") icon = <IconHatCheckCircle />;
  else if (isThinkingFamily) icon = <IconHatCourses />;
  else icon = <IconHatBoxes />;

  let label: ReactNode;
  if (phase === "shimmer") {
    label = <span className="chat__hat-shimmer" aria-hidden />;
  } else if (phase === "thinking") {
    label = <span className="chat__hat-label">Thinking…</span>;
  } else if (phase === "cycling") {
    label = (
      <span
        className="chat__hat-label chat__hat-label--cycling"
        // When cycling under controlled mode there is no internal step rotation,
        // so we surface a representative label instead of indexing into the
        // sample cycle list.
        key={isControlled ? "controlled-cycling" : `step-${stepIndex}`}
      >
        {isControlled ? CHAT_HAT_CYCLING_STEPS[0] : CHAT_HAT_CYCLING_STEPS[stepIndex]}
      </span>
    );
  } else {
    label = <span className="chat__hat-label">{contextLabel}</span>;
  }

  if (!mounted) return null;

  return (
    <div
      className={[
        "chat__hat",
        `chat__hat--${phase}`,
        dismissing ? "chat__hat--dismissing" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-phase={phase}
      data-dismissing={dismissing || undefined}
      aria-hidden
    >
      <div className="chat__hat-leading">
        <span className="chat__hat-icon" key={`icon-${phase === "done" ? "done" : isThinkingFamily ? "thinking" : "idle"}`}>
          {icon}
        </span>
        <span className="chat__hat-text-slot">{label}</span>
      </div>
      <div className="chat__hat-close">
        <IconButton
          icon={iconTypes.CLOSE}
          appearance={IconButton.APPEARANCES.GHOST}
          size={IconButton.SIZES.S}
          tabIndex={-1}
          aria-label="Dismiss context"
          onClick={handleDismiss}
        />
      </div>
    </div>
  );
}

/*
 * Chat top toolbar — sourced from Figma `AI · Copilot - Embedded Experiences`
 * node 7164:61241 ("Property 1=With Chat Title"). 24px content row inside the
 * panel chrome, hamburger + title on the left, comment/expand/close on the right.
 * Each glyph is 24×24 with a 16×~16 vector inside; paths copied verbatim and
 * normalized to a 0..24 viewBox.
 */
/** Hamburger / menu glyph used in the toolbar's start cluster. Exported so
 * embedded experiences (in-context demos, custom panels) can compose a chat
 * header that matches the Chat panel component 1:1.
 */
export function ChatToolbarMenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M20 15.25V16.75H4V15.25H20ZM20 12.75H4V11.25H20V12.75ZM20 8.75H4V7.25H20V8.75Z"
      />
    </svg>
  );
}

/** Add comment glyph (speech bubble + plus) used in the toolbar's end cluster. */
export function ChatToolbarAddCommentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M11.25 8.75V5H12.75V8.75H16.5V10.25H12.75V14H11.25V10.25H7.5V8.75H11.25Z"
      />
      <path
        fill="currentColor"
        d="M1.25 1.25H22.75V17.75H15.25L8.25 23V17.75H1.25V1.25ZM2.75 2.75V16.25H9.75V20L14.75 16.25H21.25V2.75H2.75Z"
      />
    </svg>
  );
}

/** Expand glyph (four-corner arrows) used in the toolbar's end cluster. */
export function ChatToolbarExpandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M18.689 4.25H15.5V2.75H21.25V8.5H19.75V5.311L15.03 10.031L13.969 8.97L18.689 4.25Z"
      />
      <path
        fill="currentColor"
        d="M5.311 19.75H8.5V21.25H2.75V15.5H4.25V18.689L8.97 13.969L10.031 15.03L5.311 19.75Z"
      />
      <path
        fill="currentColor"
        d="M4.25 5.311V8.5H2.75V2.75H8.5V4.25H5.311L10.031 8.97L8.97 10.031L4.25 5.311Z"
      />
      <path
        fill="currentColor"
        d="M19.75 18.689V15.5H21.25V21.25H15.5V19.75H18.689L13.969 15.03L15.03 13.969L19.75 18.689Z"
      />
    </svg>
  );
}

/** Close glyph (filled X) used in the toolbar's end cluster. */
export function ChatToolbarCloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M10.939 12L4.469 5.53L5.53 4.469L12 10.939L18.47 4.469L19.531 5.53L13.061 12L19.531 18.47L18.47 19.531L12 13.061L5.53 19.531L4.469 18.47L10.939 12Z"
      />
    </svg>
  );
}

/**
 * Expand glyph from the Pebble Icons Library (node 4881:358) — single-axis
 * expand arrows (top-right + bottom-left) used in place of the four-corner
 * `ChatToolbarExpandIcon` when the chat is in its animated panel version.
 * Path data copied verbatim from Figma (17.5×17.5 inner glyph centered in a
 * 24×24 frame, hence the translate(3.25 3.25) offset).
 */
export function ChatToolbarExpandPebbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        transform="translate(3.25 3.25)"
        d="M17.5 7.75H16V2.561L2.561 16H7.75V17.5H0V9.75H1.5V14.939L14.939 1.5H9.75V0H17.5V7.75Z"
      />
    </svg>
  );
}

/**
 * Collapse glyph from the Pebble Icons Library (node 4881:213) — paired with
 * `ChatToolbarExpandPebbleIcon` to communicate the toggled "now expanded —
 * click to collapse" state. Two vector paths (top-right arrow pointing in,
 * bottom-left arrow pointing in), 20.06×20.06 inner glyph centered in a 24×24
 * frame.
 */
export function ChatToolbarCollapsePebbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g transform="translate(1.97 1.97)" fill="currentColor">
        <path d="M13.841 7.281 20.061 1.061 19 0 12.78 6.22V1.031H11.28V8.781H19.03V7.281H13.841Z" />
        <path d="M7.281 19.031H8.781V11.281H1.031V12.781H6.22L0 19.001 1.061 20.062 7.281 13.842V19.031Z" />
      </g>
    </svg>
  );
}

export type ChatToolbarProps = {
  title?: string;
  /** When omitted, the button is hidden. */
  onMenuClick?: () => void;
  onAddCommentClick?: () => void;
  onExpandClick?: () => void;
  onCloseClick?: () => void;
  className?: string;
  /**
   * Optional override for the expand button's glyph. Used by the animated
   * chat panel to swap in the Pebble expand/collapse icons that toggle as
   * the surface is expanded and collapsed.
   */
  expandIcon?: ReactNode;
  /**
   * Optional override for the expand button's accessible label, paired with
   * `expandIcon` (e.g. "Collapse chat" when in the expanded state).
   */
  expandLabel?: string;
};

/**
 * Standalone toolbar — exported so consumers can drop it into their own chat
 * shell (e.g. an existing Pebble panel) without using the full `Chat` component.
 * Mirrors Figma `Property 1=With Chat Title` 1:1.
 */
export function ChatToolbar({
  title,
  onMenuClick,
  onAddCommentClick,
  onExpandClick,
  onCloseClick,
  className,
  expandIcon,
  expandLabel,
}: ChatToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Chat actions"
      className={["chat__toolbar", className].filter(Boolean).join(" ")}
    >
      <div className="chat__toolbar-cluster chat__toolbar-cluster--start">
        {onMenuClick ? (
          <IconButton
            icon={iconTypes.HAMBURGER}
            appearance={IconButton.APPEARANCES.GHOST}
            size={IconButton.SIZES.M}
            aria-label="Open menu"
            onClick={onMenuClick}
          />
        ) : null}
        {title ? (
          <p className="chat__toolbar-title" aria-live="polite">
            {title}
          </p>
        ) : null}
      </div>
      <div className="chat__toolbar-cluster chat__toolbar-cluster--end">
        {onAddCommentClick ? (
          <IconButton
            icon={iconTypes.ADD_COMMENT_OUTLINE}
            appearance={IconButton.APPEARANCES.GHOST}
            size={IconButton.SIZES.M}
            aria-label="Add comment"
            onClick={onAddCommentClick}
          />
        ) : null}
        {onExpandClick ? (
          expandIcon ? (
            <Button
              type={Button.TYPES.BUTTON}
              variant={Button.VARIANTS.TEXT}
              appearance={Button.APPEARANCES.GHOST}
              size={Button.SIZES.M}
              aria-label={expandLabel ?? "Expand chat"}
              onClick={onExpandClick}
            >
              {expandIcon}
            </Button>
          ) : (
            <IconButton
              icon={iconTypes.EXPAND}
              appearance={IconButton.APPEARANCES.GHOST}
              size={IconButton.SIZES.M}
              aria-label={expandLabel ?? "Expand chat"}
              onClick={onExpandClick}
            />
          )
        ) : null}
        {onCloseClick ? (
          <IconButton
            icon={iconTypes.CLOSE}
            appearance={IconButton.APPEARANCES.GHOST}
            size={IconButton.SIZES.M}
            aria-label="Close chat"
            onClick={onCloseClick}
          />
        ) : null}
      </div>
    </div>
  );
}

export function Chat({
  variant = "side-panel",
  threadPreset = "conversation",
  panelVersion = "default",
  children,
  footer,
  className,
  ariaLabel = "AI chat",
  ariaThreadLabel = "Messages",
  ariaComposerLabel = "Message composer",
  toolbar,
}: ChatProps) {
  const layoutClass = `chat--${variant}`;
  const [thinkingReplayKey, setThinkingReplayKey] = useState(0);
  const [thinkingAnimComplete, setThinkingAnimComplete] = useState(false);
  // Animated panel only — the composer hat advertises completion when it
  // returns to `idle`. Mirrors the existing inline animated thinking block so
  // the page-level Replay control still works for both versions.
  const isAnimated = panelVersion === "animated";
  // Animated panel only — the toolbar's expand affordance toggles between
  // the Pebble expand and collapse glyphs. Tracked locally so the icon
  // visibly swaps even when the consumer hasn't bound a real expand handler.
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setThinkingAnimComplete(false);
    setThinkingReplayKey(0);
    setIsExpanded(false);
  }, [panelVersion]);

  // Only render the toolbar if it has something to show.
  const toolbarVisible =
    toolbar !== false &&
    toolbar !== undefined &&
    Boolean(
      toolbar.title ||
        toolbar.onMenuClick ||
        toolbar.onAddCommentClick ||
        toolbar.onExpandClick ||
        toolbar.onCloseClick,
    );

  // When in the animated panel, swap the toolbar's expand glyph for the
  // Pebble expand/collapse pair and wrap the click handler so the icon
  // toggles in lock-step with each press.
  const resolvedToolbar: ChatToolbarProps | undefined =
    toolbarVisible && isAnimated && toolbar
      ? {
          ...toolbar,
          expandIcon: isExpanded ? (
            <ChatToolbarCollapsePebbleIcon />
          ) : (
            <ChatToolbarExpandPebbleIcon />
          ),
          expandLabel: isExpanded ? "Collapse chat" : "Expand chat",
          onExpandClick: toolbar.onExpandClick
            ? () => {
                setIsExpanded((v) => !v);
                toolbar.onExpandClick?.();
              }
            : undefined,
        }
      : (toolbar as ChatToolbarProps | undefined);

  return (
    <section
      className={["chat", layoutClass, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      data-chat-variant={variant}
      data-chat-panel={panelVersion}
      data-chat-has-toolbar={toolbarVisible || undefined}
    >
      {toolbarVisible && resolvedToolbar ? <ChatToolbar {...resolvedToolbar} /> : null}
      {panelVersion === "animated" && thinkingAnimComplete ? (
        <div className="chat__panel-replay">
          <IconButton
            icon={iconTypes.REFRESH_OUTLINE}
            appearance={IconButton.APPEARANCES.OUTLINE}
            size={IconButton.SIZES.M}
            aria-label="Replay thinking animation"
            onClick={() => {
              setThinkingAnimComplete(false);
              setThinkingReplayKey((k) => k + 1);
            }}
          />
        </div>
      ) : null}
      <div
        className="chat__thread"
        role="log"
        aria-label={ariaThreadLabel}
        aria-live="polite"
        aria-relevant="additions text"
        tabIndex={0}
      >
        {children ? (
          <div className="chat__track chat__track--custom">{children}</div>
        ) : (
          <ol className="chat__track">
            {defaultThread(threadPreset, panelVersion, thinkingReplayKey, setThinkingAnimComplete)}
          </ol>
        )}
      </div>
      {footer ? (
        <div className="chat__footer" role="group" aria-label={ariaComposerLabel}>
          <div className="chat__footer-inner">
            {isAnimated ? (
              <ChatComposerHat
                replayKey={thinkingReplayKey}
                onCycleComplete={() => setThinkingAnimComplete(true)}
              />
            ) : null}
            {footer}
          </div>
        </div>
      ) : null}
    </section>
  );
}
