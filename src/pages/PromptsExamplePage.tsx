import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { Prompt, PromptsInChatDemo } from "../components/Prompt";
import type { PromptSurface, PromptsInChatDemoMode } from "../components/Prompt";
import "../App.css";

const SAMPLE_DESCRIPTION = "Show the number of people who joined the company over the past few months.";

export function PromptsExamplePage() {
  const [surface, setSurface] = useState<PromptSurface>("outline");
  const [subtextOn, setSubtextOn] = useState(true);
  const [mode, setMode] = useState<PromptsInChatDemoMode>("side-chat");
  const subtext = subtextOn ? SAMPLE_DESCRIPTION : undefined;

  const controls = (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <div className="demo-segments" role="group" aria-label="Surface">
        <button type="button" className="demo-segment" aria-pressed={surface === "outline"} onClick={() => setSurface("outline")}>Outlined</button>
        <button type="button" className="demo-segment" aria-pressed={surface === "filled"} onClick={() => setSurface("filled")}>Filled</button>
      </div>
      <div className="demo-segments" role="group" aria-label="Subtext">
        <button type="button" className="demo-segment" aria-pressed={subtextOn} onClick={() => setSubtextOn(true)}>Subtext on</button>
        <button type="button" className="demo-segment" aria-pressed={!subtextOn} onClick={() => setSubtextOn(false)}>Subtext off</button>
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
    <ExamplePageLayout backTo="/prompts" backLabel="Prompts" headerActions={controls}>
      <div className="demo-stage" role="region" aria-label="Prompt preview"
        style={{ padding: "48px 32px", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
        <Prompt title="Look up your favorite coworker" description={SAMPLE_DESCRIPTION} subtext={subtext} surface={surface} />
        <Prompt title="Draft candidate feedback" surface={surface} />
      </div>
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <PromptsInChatDemo mode={mode} surface={surface} subtextOn={subtextOn} />
      </div>
    </ExamplePageLayout>
  );
}
