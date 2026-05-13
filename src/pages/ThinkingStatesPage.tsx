import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChatExampleDemo,
  ChatThinkingBlock,
  CHAT_THINKING_SAMPLE_STEPS,
} from "../components/Chat";
import type { ChatExampleDemoMode, ChatPanelVersion } from "../components/Chat";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import "../App.css";
import "./ThinkingStatesPage.css";

const THINKING_WHEN = [
  "The assistant receives a prompt and hasn't yet returned a response.",
  "A multi-step reasoning process is in flight — the user needs to know work is happening.",
  "The reply will take longer than a moment and a blank composer would feel broken.",
];

const THINKING_DESIGN_INTENT = [
  "The animated hat rides above the composer so the progress signal is always visible and never competes with the thread.",
  "Five phases (idle → thinking → shimmer → cycling → done) give the user a legible sense of progress without overwhelming them.",
  "The inline thinking block surfaces the reasoning trace once the turn resolves — transparency after the fact.",
];

const THINKING_DOS = [
  "Let the hat complete its natural cycle before landing the reply — don't skip phases.",
  "Use the inline thinking block (default or no-glyphs) when the panel does not carry the animated hat.",
  "Pair the hat with the Pebble Arrow Up send icon so the composer chrome reads as a coherent animated set.",
];

const THINKING_DONTS = [
  "Show both the hat and the inline thinking block at the same time — pick one per panel version.",
  "Interrupt the cycle mid-phase to land the reply early; let the done phase complete first.",
  "Use placeholder or lorem text in the cycling phase — copy should reflect real assistant tasks.",
];

const STEP_INTERVAL_MS = 1200;
const STEP_DONE_PAUSE_MS = 1600;

/** Drives one-line-at-a-time reveal for default / no-glyphs variants. */
function AnimatedThinkingPreview({ variant, animKey }: { variant: "default" | "no-glyphs"; animKey: number }) {
  const [visibleCount, setVisibleCount] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = CHAT_THINKING_SAMPLE_STEPS.length;

  useEffect(() => {
    setVisibleCount(1);
  }, [animKey, variant]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisibleCount((c) => {
        if (c >= total) {
          // Pause at full list, then loop
          timerRef.current = setTimeout(() => setVisibleCount(1), STEP_DONE_PAUSE_MS);
          return c;
        }
        return c + 1;
      });
    }, STEP_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleCount, total]);

  return (
    <ChatThinkingBlock
      steps={CHAT_THINKING_SAMPLE_STEPS.slice(0, visibleCount)}
      panelVersion={variant}
    />
  );
}

export function ThinkingStatesPage() {
  const [exampleMode, setExampleMode] = useState<ChatExampleDemoMode>("side-chat");
  const [blockVariant, setBlockVariant] = useState<ChatPanelVersion>("default");
  const [animKey, setAnimKey] = useState(0);

  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Thinking states
        </p>
        <h1 className="page-doc-title">Thinking states</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          How Rippling AI communicates that it's working — the animated composer hat for the
          full-panel experience, and the inline thinking block that lands with the reply.
        </p>
      </header>

      <ComponentIntentPanel
        when={THINKING_WHEN}
        designIntent={THINKING_DESIGN_INTENT}
        dos={THINKING_DOS}
        donts={THINKING_DONTS}
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      {/* ── Inline thinking block ── */}
      <div
        className="demo-preview-surface demo-preview-surface--stack"
        role="region"
        aria-label="Inline thinking block preview"
      >
        <div className="demo-toolbar" aria-label="Thinking block controls">
          <div className="demo-group">
            <p className="demo-label" id="thinking-block-variant-label">
              Variant
            </p>
            <div className="demo-segments" role="group" aria-labelledby="thinking-block-variant-label">
              {(["default", "no-glyphs", "animated"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  className="demo-segment"
                  aria-pressed={blockVariant === v}
                  onClick={() => {
                    setBlockVariant(v);
                    setAnimKey((k) => k + 1);
                  }}
                >
                  {v === "default" ? "Default" : v === "no-glyphs" ? "No glyphs" : "Animated"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="thinking-page__block-stage thinking-page__block-stage--single">
          {blockVariant === "animated" ? (
            <ChatThinkingBlock
              key={animKey}
              steps={CHAT_THINKING_SAMPLE_STEPS}
              panelVersion="animated"
            />
          ) : (
            <AnimatedThinkingPreview
              key={`${blockVariant}-${animKey}`}
              variant={blockVariant}
              animKey={animKey}
            />
          )}
        </div>
      </div>

      <hr className="page-section__divider" aria-hidden="true" />

      {/* ── Animated hat — in context ── */}
      <section
        className="in-context-stage"
        id="thinking-example-in-context"
        aria-labelledby="thinking-example-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="thinking-example-heading" className="in-context-stage__title">
              Animated hat — in context
            </h2>
            <p className="in-context-stage__lede">
              Send a message to drive the composer hat through its full cycle (idle → thinking →
              shimmer → cycling → done → idle). Pin any phase below to inspect each animation
              state on its own without waiting for the cycle.
            </p>
          </div>
          <div className="demo-segments" role="group" aria-label="Thinking example surface mode">
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
          key={exampleMode}
          mode={exampleMode}
          panelVersion="animated"
        />
      </section>
    </main>
  );
}
