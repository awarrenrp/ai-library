import { useState } from "react";
import { Link } from "react-router-dom";
import { Chat } from "../components/Chat";
import { Composer } from "../components/Composer";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import "../App.css";

const TEXT_WHEN = [
  "The assistant returns a prose response — explanation, summary, or narrative.",
  "Content mixes formatting types: paragraphs, lists, headings, code, and inline emphasis.",
  "Streaming output renders progressively as tokens arrive.",
];

const TEXT_DESIGN_INTENT = [
  "Maximise readability at the widths chat surfaces use — side panel and full-screen.",
  "Establish a clear visual hierarchy so prose, lists, headings, and code never compete.",
  "Streaming state should feel smooth; avoid layout shifts as tokens land.",
];

const TEXT_DOS = [
  "Use the shared type scale and line-height tokens so text stays consistent across AI surfaces.",
  "Render markdown headings only when the response warrants real section structure.",
  "Preserve inline code formatting — monospace signals precision to technical users.",
];

const TEXT_DONTS = [
  "Apply heading styles to every bolded phrase — reserve H2/H3 for genuine sections.",
  "Truncate streaming responses mid-token; let a full word land before the cursor advances.",
  "Override the base font family or size inside AI response bodies.",
];

type TextSizeVariant = "default" | "large";

export function TextPage() {
  const [textSize, setTextSize] = useState<TextSizeVariant>("default");

  return (
    <main className="demo-wrap">
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Text
        </p>
        <h1 className="page-doc-title">Text</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Typography and formatting rules for AI-generated prose — paragraphs, headings, lists,
          inline code, and streaming render behaviour across Rippling AI surfaces.
        </p>
      </header>

      <ComponentIntentPanel
        when={TEXT_WHEN}
        designIntent={TEXT_DESIGN_INTENT}
        dos={TEXT_DOS}
        donts={TEXT_DONTS}
        exampleHref="/text/example"
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div className="demo-segments" role="group" aria-label="Text size variant" style={{ marginBottom: 20 }}>
        <button
          type="button"
          className="demo-segment"
          aria-pressed={textSize === "default"}
          onClick={() => setTextSize("default")}
        >
          Default
        </button>
        <button
          type="button"
          className="demo-segment"
          aria-pressed={textSize === "large"}
          onClick={() => setTextSize("large")}
        >
          Large
        </button>
      </div>

      <div
        className="demo-preview-surface"
        role="region"
        aria-label="Text style preview"
      >
        <div className="demo-stage">
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
                      ecosystem. This essay explores the biological characteristics, ecological
                      significance, and conservation challenges of blue whales, highlighting the
                      need for continued efforts to protect these gentle giants.
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
      </div>
    </main>
  );
}
