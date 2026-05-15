import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { StrongTypeInChatDemo } from "../components/StrongType";
import type { StrongTypeInChatDemoMode } from "../components/StrongType";
import "../App.css";

export function StrongTypeExamplePage() {
  const [mode, setMode] = useState<StrongTypeInChatDemoMode>("side-chat");

  const toggle = (
    <div className="demo-segments" role="group" aria-label="Context view mode">
      {(["side-chat", "full-screen"] as const).map((m) => (
        <button key={m} type="button" className="demo-segment" aria-pressed={mode === m}
          onClick={() => setMode(m)}>
          {m === "side-chat" ? "Side chat" : "Full screen"}
        </button>
      ))}
    </div>
  );

  return (
    <ExamplePageLayout backTo="/strong-type" backLabel="Strong type" headerActions={toggle}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <StrongTypeInChatDemo mode={mode} />
      </div>
    </ExamplePageLayout>
  );
}
