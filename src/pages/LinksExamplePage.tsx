import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { LinksInChatDemo } from "../components/Links";
import type { LinksInChatDemoMode } from "../components/Links";
import "../App.css";

export function LinksExamplePage() {
  const [mode, setMode] = useState<LinksInChatDemoMode>("side-chat");

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
    <ExamplePageLayout backTo="/links" backLabel="Links" headerActions={toggle}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <LinksInChatDemo mode={mode} />
      </div>
    </ExamplePageLayout>
  );
}
