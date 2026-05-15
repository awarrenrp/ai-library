import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { ExternalArtifactInChatDemo } from "../components/ExternalArtifact";
import type { ExternalArtifactInChatDemoMode } from "../components/ExternalArtifact";
import "../App.css";

export function ExternalArtifactsExamplePage() {
  const [mode, setMode] = useState<ExternalArtifactInChatDemoMode>("side-chat");

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
    <ExamplePageLayout backTo="/external-artifacts" backLabel="External artifacts" headerActions={toggle}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <ExternalArtifactInChatDemo mode={mode} />
      </div>
    </ExamplePageLayout>
  );
}
