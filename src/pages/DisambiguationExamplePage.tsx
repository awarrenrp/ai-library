import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { DisambiguationInChatDemo } from "../components/Disambiguation";
import type { DisambiguationInChatDemoMode } from "../components/Disambiguation";
import "../App.css";

export function DisambiguationExamplePage() {
  const [mode, setMode] = useState<DisambiguationInChatDemoMode>("side-chat");

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
    <ExamplePageLayout backTo="/disambiguation" backLabel="Disambiguation" headerActions={toggle}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <DisambiguationInChatDemo mode={mode} />
      </div>
    </ExamplePageLayout>
  );
}
