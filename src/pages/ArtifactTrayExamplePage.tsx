import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { ArtifactTrayDemo } from "../components/ArtifactTray";
import type { ArtifactTrayDemoMode } from "../components/ArtifactTray";
import "../App.css";

export function ArtifactTrayExamplePage() {
  const [mode, setMode] = useState<ArtifactTrayDemoMode>("side-chat");

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
    <ExamplePageLayout backTo="/artifact-tray" backLabel="Artifact tray" headerActions={toggle}>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <ArtifactTrayDemo mode={mode} />
      </div>
    </ExamplePageLayout>
  );
}
