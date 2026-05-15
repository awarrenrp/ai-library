import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { RipplingNativeArtifactInChatDemo } from "../components/RipplingArtifact";
import type { RipplingNativeArtifactInChatDemoMode } from "../components/RipplingArtifact";
import "../App.css";

export function RipplingNativeArtifactsExamplePage() {
  const [mode, setMode] = useState<RipplingNativeArtifactInChatDemoMode>("side-chat");

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
    <ExamplePageLayout backTo="/rippling-native-artifacts" backLabel="Rippling-native artifacts" headerActions={toggle}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <RipplingNativeArtifactInChatDemo mode={mode} />
      </div>
    </ExamplePageLayout>
  );
}
