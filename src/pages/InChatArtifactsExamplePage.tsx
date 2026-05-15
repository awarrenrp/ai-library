import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { InChatWidgetDemo } from "../components/InChatWidget";
import type { InChatWidgetDemoMode } from "../components/InChatWidget";
import "../App.css";

export function InChatArtifactsExamplePage() {
  const [mode, setMode] = useState<InChatWidgetDemoMode>("side-chat");

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
    <ExamplePageLayout backTo="/in-chat-artifacts" backLabel="In-chat widget" headerActions={toggle}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <InChatWidgetDemo mode={mode} />
      </div>
    </ExamplePageLayout>
  );
}
