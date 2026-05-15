import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { DisambiguationInChatDemo } from "../components/Disambiguation";
import type { DisambiguationInChatDemoMode, DisambiguationOption } from "../components/Disambiguation";
import "../App.css";

const DEMO_OPTIONS: DisambiguationOption[] = [
  { id: "jordan-lee", title: "Jordan Lee", description: "Software engineer · San Francisco", label: "Engineering" },
  { id: "jordan-chen", title: "Jordan Chen", description: "Account executive · Austin", label: "Sales" },
  { id: "jordan-patel", title: "Jordan Patel", description: "HR specialist · New York", label: "People" },
];

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
        <DisambiguationInChatDemo
          mode={mode}
          question="Which Jordan do you want to update?"
          inputType="radio"
          options={DEMO_OPTIONS}
        />
      </div>
    </ExamplePageLayout>
  );
}
