import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import {
  Chat,
  CHAT_LAYOUT_VARIANTS,
  CHAT_THREAD_PRESETS,
} from "../components/Chat";
import type { ChatLayoutVariant, ChatThreadPreset } from "../components/Chat";
import { Composer } from "../components/Composer";
import "../App.css";

const LAYOUT_LABELS: Record<ChatLayoutVariant, string> = {
  "side-panel": "Side panel",
  page: "Page",
};
const THREAD_LABELS: Record<ChatThreadPreset, string> = {
  conversation: "Conversation",
  empty: "Empty",
};

export function ChatExamplePage() {
  const [layout, setLayout] = useState<ChatLayoutVariant>("side-panel");
  const [thread, setThread] = useState<ChatThreadPreset>("conversation");

  const controls = (
    <div style={{ display: "flex", gap: 8 }}>
      <div className="demo-segments" role="group" aria-label="Layout">
        {CHAT_LAYOUT_VARIANTS.map((id) => (
          <button key={id} type="button" className="demo-segment" aria-pressed={layout === id}
            onClick={() => setLayout(id)}>
            {LAYOUT_LABELS[id]}
          </button>
        ))}
      </div>
      <div className="demo-segments" role="group" aria-label="Thread">
        {CHAT_THREAD_PRESETS.map((id) => (
          <button key={id} type="button" className="demo-segment" aria-pressed={thread === id}
            onClick={() => setThread(id)}>
            {THREAD_LABELS[id]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <ExamplePageLayout backTo="/chat" backLabel="Chat" headerActions={controls}>
      <div className="demo-stage" role="region" aria-label="Chat preview">
        <Chat
          key={`${layout}-${thread}`}
          variant={layout}
          threadPreset={thread}
          ariaLabel="Rippling AI chat"
          ariaThreadLabel="Conversation messages"
          ariaComposerLabel="Message composer"
          toolbar={{
            title: thread === "empty" ? "New conversation" : "Headcount by department",
            onMenuClick: () => {},
            onAddCommentClick: () => {},
            onExpandClick: () => {},
            onCloseClick: () => {},
          }}
          footer={
            <Composer
              width="fill"
              ariaComposerLabel="Chat composer"
              ariaMessageLabel="Message to Rippling AI"
              placeholder="Ask Rippling AI anything…"
            />
          }
        />
      </div>
    </ExamplePageLayout>
  );
}
