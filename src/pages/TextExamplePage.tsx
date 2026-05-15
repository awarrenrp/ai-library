import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { Chat } from "../components/Chat";
import { Composer } from "../components/Composer";
import "../App.css";

type TextSizeVariant = "default" | "large";

export function TextExamplePage() {
  const [textSize, setTextSize] = useState<TextSizeVariant>("default");

  const controls = (
    <div className="demo-segments" role="group" aria-label="Size">
      <button type="button" className="demo-segment" aria-pressed={textSize === "default"} onClick={() => setTextSize("default")}>Default</button>
      <button type="button" className="demo-segment" aria-pressed={textSize === "large"} onClick={() => setTextSize("large")}>Large</button>
    </div>
  );

  return (
    <ExamplePageLayout backTo="/text" backLabel="Text" headerActions={controls}>
      <div className="demo-stage" role="region" aria-label="Text style preview">
        <Chat
          variant="side-panel"
          textSize={textSize}
          toolbar={{ title: "Blue whales" }}
          footer={
            <Composer
              width="fill"
              ariaComposerLabel="Chat composer"
              ariaMessageLabel="Message to Rippling AI"
              placeholder="Ask Rippling AI anything…"
            />
          }
        >
          <div className="chat__row chat__row--assistant">
            <article className="chat__block chat__block--ai" aria-label="Assistant message">
              <div className="chat__response">
                <div className="chat__response-section">
                  <h2 className="chat__response-h1">Title of section</h2>
                  <p className="chat__response-body">
                    Blue whales, the largest animals to have ever existed on Earth, are
                    awe-inspiring creatures that continue to captivate scientists and nature
                    enthusiasts alike. These magnificent mammals command attention not only due
                    to their immense size but also because of their critical role in the marine
                    ecosystem.
                  </p>
                </div>
                <div className="chat__response-section">
                  <h3 className="chat__response-h2">2nd level header</h3>
                  <p className="chat__response-body">
                    Blue whales, the largest animals to have ever existed on Earth, are
                    awe-inspiring creatures that continue to captivate scientists and nature
                    enthusiasts alike.
                  </p>
                </div>
                <div className="chat__response-section">
                  <h3 className="chat__response-h2">List</h3>
                  <ul className="chat__response-list">
                    <li>Here's an item as it would appear in a bulleted list</li>
                    <li>Another item from a list</li>
                    <li>And a final item</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </Chat>
      </div>
    </ExamplePageLayout>
  );
}
