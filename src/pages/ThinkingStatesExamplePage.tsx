import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { ChatExampleDemo, CHAT_PANEL_VERSIONS, CHAT_PANEL_VERSION_LABELS } from "../components/Chat";
import type { ChatExampleDemoMode, ChatPanelVersion } from "../components/Chat";
import "../App.css";

export function ThinkingStatesExamplePage() {
  const [panelVersion, setPanelVersion] = useState<ChatPanelVersion>("default");
  const [mode, setMode] = useState<ChatExampleDemoMode>("side-chat");

  const controls = (
    <div style={{ display: "flex", gap: 8 }}>
      <div className="demo-segments" role="group" aria-label="Panel version">
        {CHAT_PANEL_VERSIONS.map((v) => (
          <button key={v} type="button" className="demo-segment" aria-pressed={panelVersion === v}
            onClick={() => setPanelVersion(v)}>
            {CHAT_PANEL_VERSION_LABELS[v]}
          </button>
        ))}
      </div>
      <div className="demo-segments" role="group" aria-label="Context view mode">
        {(["side-chat", "full-screen"] as const).map((m) => (
          <button key={m} type="button" className="demo-segment" aria-pressed={mode === m}
            onClick={() => setMode(m)}>
            {m === "side-chat" ? "Side chat" : "Full screen"}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <ExamplePageLayout backTo="/thinking-states" backLabel="Thinking states" headerActions={controls}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <ChatExampleDemo key={`${mode}-${panelVersion}`} mode={mode} panelVersion={panelVersion} />
      </div>
    </ExamplePageLayout>
  );
}
