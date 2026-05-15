import { useState } from "react";
import { Link } from "react-router-dom";
import { ArtifactTrayDemo } from "../components/ArtifactTray";
import type { ArtifactTrayDemoMode } from "../components/ArtifactTray";
import {
  Chat,
  ChatExampleDemo,
  CHAT_LAYOUT_VARIANTS,
  CHAT_PANEL_VERSIONS,
  CHAT_PANEL_VERSION_LABELS,
  CHAT_THREAD_PRESETS,
} from "../components/Chat";
import type {
  ChatExampleDemoMode,
  ChatLayoutVariant,
  ChatPanelVersion,
  ChatThreadPreset,
} from "../components/Chat";
import { Composer, COMPOSER_VERSIONS, COMPOSER_VERSION_LABELS, WIDTH_PX } from "../components/Composer";
import type { ComposerVersion, ComposerWidth } from "../components/Composer";
import { DisambiguationInChatDemo } from "../components/Disambiguation";
import type { DisambiguationInChatDemoMode } from "../components/Disambiguation";
import { EditingPrototypeMock } from "../components/EditingPrototype";
import { ExternalArtifactInChatDemo } from "../components/ExternalArtifact";
import type { ExternalArtifactInChatDemoMode } from "../components/ExternalArtifact";
import { InChatWidgetDemo } from "../components/InChatWidget";
import type { InChatWidgetDemoMode } from "../components/InChatWidget";
import { LinksInChatDemo } from "../components/Links";
import type { LinksInChatDemoMode } from "../components/Links";
import { Prompt, PromptsInChatDemo } from "../components/Prompt";
import type { PromptSurface, PromptsInChatDemoMode } from "../components/Prompt";
import { RipplingNativeArtifactInChatDemo } from "../components/RipplingArtifact";
import type { RipplingNativeArtifactInChatDemoMode } from "../components/RipplingArtifact";
import { StrongTypeInChatDemo } from "../components/StrongType";
import type { StrongTypeInChatDemoMode } from "../components/StrongType";
import "../App.css";
import "./EditingPage.css";
import "./CombinedPrototypePage.css";

/* ─── Nav data ─────────────────────────────────────────────────────── */

type DemoId =
  | "in-chat-widget" | "rippling-native" | "external"
  | "chat" | "composer" | "disambiguation" | "links" | "prompts" | "thinking"
  | "artifact-tray" | "editing" | "strong-type" | "text";

type NavItem = { id: DemoId; label: string; wip?: boolean };
type NavSection = { heading: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    heading: "Artifacts + Widgets",
    items: [
      { id: "in-chat-widget",  label: "In-chat widget" },
      { id: "rippling-native", label: "Rippling-native" },
      { id: "external",        label: "External artifacts" },
    ],
  },
  {
    heading: "Components",
    items: [
      { id: "chat",           label: "Chat" },
      { id: "composer",       label: "Composer" },
      { id: "disambiguation", label: "Disambiguation" },
      { id: "links",          label: "Links" },
      { id: "prompts",        label: "Prompts" },
      { id: "thinking",       label: "Thinking states" },
    ],
  },
  {
    heading: "In Progress",
    items: [
      { id: "artifact-tray", label: "Artifact tray", wip: true },
      { id: "editing",       label: "Editing",       wip: true },
      { id: "strong-type",   label: "Strong type",   wip: true },
      { id: "text",          label: "Text",          wip: true },
    ],
  },
];

const DEMO_LABELS: Record<DemoId, string> = {
  "in-chat-widget":  "In-chat widget",
  "rippling-native": "Rippling-native artifacts",
  "external":        "External artifacts",
  "chat":            "Chat",
  "composer":        "Composer",
  "disambiguation":  "Disambiguation",
  "links":           "Links",
  "prompts":         "Prompts",
  "thinking":        "Thinking states",
  "artifact-tray":   "Artifact tray",
  "editing":         "Editing",
  "strong-type":     "Strong type",
  "text":            "Text",
};

/* ─── Shared helper ─────────────────────────────────────────────────── */

function ModeToggle({
  mode,
  setMode,
}: {
  mode: "side-chat" | "full-screen";
  setMode: (m: "side-chat" | "full-screen") => void;
}) {
  return (
    <div className="demo-segments" role="group" aria-label="Context view mode">
      {(["side-chat", "full-screen"] as const).map((m) => (
        <button key={m} type="button" className="demo-segment" aria-pressed={mode === m} onClick={() => setMode(m)}>
          {m === "side-chat" ? "Side chat" : "Full screen"}
        </button>
      ))}
    </div>
  );
}

function ControlsBar({ children }: { children: React.ReactNode }) {
  return <div className="cp-controls">{children}</div>;
}

/* ─── Individual panels ─────────────────────────────────────────────── */

function InChatWidgetPanel() {
  const [mode, setMode] = useState<InChatWidgetDemoMode>("side-chat");
  return (
    <>
      <ControlsBar><ModeToggle mode={mode} setMode={setMode} /></ControlsBar>
      <InChatWidgetDemo mode={mode} />
    </>
  );
}

function RipplingNativePanel() {
  const [mode, setMode] = useState<RipplingNativeArtifactInChatDemoMode>("side-chat");
  return (
    <>
      <ControlsBar><ModeToggle mode={mode} setMode={setMode} /></ControlsBar>
      <RipplingNativeArtifactInChatDemo mode={mode} />
    </>
  );
}

function ExternalArtifactsPanel() {
  const [mode, setMode] = useState<ExternalArtifactInChatDemoMode>("side-chat");
  return (
    <>
      <ControlsBar><ModeToggle mode={mode} setMode={setMode} /></ControlsBar>
      <ExternalArtifactInChatDemo mode={mode} />
    </>
  );
}

const CHAT_LAYOUT_LABELS: Record<ChatLayoutVariant, string> = {
  "side-panel": "Side panel",
  page: "Page",
};
const CHAT_THREAD_LABELS: Record<ChatThreadPreset, string> = {
  conversation: "Conversation",
  empty: "Empty",
};

function ChatPanel() {
  const [layout, setLayout] = useState<ChatLayoutVariant>("side-panel");
  const [thread, setThread] = useState<ChatThreadPreset>("conversation");
  return (
    <>
      <ControlsBar>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-layout">Layout</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-layout">
            {CHAT_LAYOUT_VARIANTS.map((id) => (
              <button key={id} type="button" className="demo-segment" aria-pressed={layout === id} onClick={() => setLayout(id)}>
                {CHAT_LAYOUT_LABELS[id]}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-thread">Thread</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-thread">
            {CHAT_THREAD_PRESETS.map((id) => (
              <button key={id} type="button" className="demo-segment" aria-pressed={thread === id} onClick={() => setThread(id)}>
                {CHAT_THREAD_LABELS[id]}
              </button>
            ))}
          </div>
        </div>
      </ControlsBar>
      <div className="cp-stage">
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
    </>
  );
}

function ComposerPanel() {
  const [width, setWidth] = useState<Exclude<ComposerWidth, "fill">>("large");
  const [version, setVersion] = useState<ComposerVersion>("standard");
  const [filled, setFilled] = useState(false);
  return (
    <>
      <ControlsBar>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-width">Width</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-width">
            {(["large", "medium", "small"] as const).map((w) => (
              <button key={w} type="button" className="demo-segment" aria-pressed={width === w}
                aria-label={`${w}, ${WIDTH_PX[w]}px`} onClick={() => setWidth(w)}>
                {w.charAt(0).toUpperCase() + w.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-ver">Version</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-ver">
            {COMPOSER_VERSIONS.map((v) => (
              <button key={v} type="button" className="demo-segment" aria-pressed={version === v} onClick={() => setVersion(v)}>
                {COMPOSER_VERSION_LABELS[v]}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-state">State</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-state">
            <button type="button" className="demo-segment" aria-pressed={!filled} onClick={() => setFilled(false)}>Default</button>
            <button type="button" className="demo-segment" aria-pressed={filled} onClick={() => setFilled(true)}>Filled</button>
          </div>
        </div>
      </ControlsBar>
      <div className="cp-stage">
        <Composer width={width} value={filled ? "Make me a report about sales people in SF" : ""} version={version} />
      </div>
    </>
  );
}

function DisambiguationPanel() {
  const [mode, setMode] = useState<DisambiguationInChatDemoMode>("side-chat");
  return (
    <>
      <ControlsBar><ModeToggle mode={mode} setMode={setMode} /></ControlsBar>
      <DisambiguationInChatDemo mode={mode} />
    </>
  );
}

function LinksPanel() {
  const [mode, setMode] = useState<LinksInChatDemoMode>("side-chat");
  return (
    <>
      <ControlsBar><ModeToggle mode={mode} setMode={setMode} /></ControlsBar>
      <LinksInChatDemo mode={mode} />
    </>
  );
}

const PROMPT_DESCRIPTION = "Show the number of people who joined the company over the past few months.";

function PromptsPanel() {
  const [surface, setSurface] = useState<PromptSurface>("outline");
  const [subtextOn, setSubtextOn] = useState(true);
  const [mode, setMode] = useState<PromptsInChatDemoMode>("side-chat");
  return (
    <>
      <ControlsBar>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-surface">Surface</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-surface">
            <button type="button" className="demo-segment" aria-pressed={surface === "outline"} onClick={() => setSurface("outline")}>Outlined</button>
            <button type="button" className="demo-segment" aria-pressed={surface === "filled"} onClick={() => setSurface("filled")}>Filled</button>
          </div>
        </div>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-subtext">Subtext</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-subtext">
            <button type="button" className="demo-segment" aria-pressed={subtextOn} onClick={() => setSubtextOn(true)}>On</button>
            <button type="button" className="demo-segment" aria-pressed={!subtextOn} onClick={() => setSubtextOn(false)}>Off</button>
          </div>
        </div>
        <ModeToggle mode={mode} setMode={setMode} />
      </ControlsBar>
      <div className="cp-stage cp-stage--prompts">
        <Prompt title="Look up your favorite coworker" description={PROMPT_DESCRIPTION}
          subtext={subtextOn ? PROMPT_DESCRIPTION : undefined} surface={surface} />
        <Prompt title="Draft candidate feedback" surface={surface} />
      </div>
      <PromptsInChatDemo mode={mode} surface={surface} subtextOn={subtextOn} />
    </>
  );
}

function ThinkingStatesPanel() {
  const [panelVersion, setPanelVersion] = useState<ChatPanelVersion>("default");
  const [mode, setMode] = useState<ChatExampleDemoMode>("side-chat");
  return (
    <>
      <ControlsBar>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-pv">Variant</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-pv">
            {CHAT_PANEL_VERSIONS.map((v) => (
              <button key={v} type="button" className="demo-segment" aria-pressed={panelVersion === v} onClick={() => setPanelVersion(v)}>
                {CHAT_PANEL_VERSION_LABELS[v]}
              </button>
            ))}
          </div>
        </div>
        <ModeToggle mode={mode} setMode={setMode} />
      </ControlsBar>
      <ChatExampleDemo key={`${mode}-${panelVersion}`} mode={mode} panelVersion={panelVersion} />
    </>
  );
}

function ArtifactTrayPanel() {
  const [mode, setMode] = useState<ArtifactTrayDemoMode>("side-chat");
  return (
    <>
      <ControlsBar><ModeToggle mode={mode} setMode={setMode} /></ControlsBar>
      <ArtifactTrayDemo mode={mode} />
    </>
  );
}

function EditingPanel() {
  const [variant, setVariant] = useState<"default" | "animated">("default");
  const [contentType, setContentType] = useState<"dashboards" | "forms">("dashboards");
  const [resetKey, setResetKey] = useState(0);
  return (
    <>
      <ControlsBar>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-estyle">Style</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-estyle">
            {(["default", "animated"] as const).map((v) => (
              <button key={v} type="button" className="demo-segment" aria-pressed={variant === v}
                onClick={() => { setVariant(v); setResetKey((k) => k + 1); }}>
                {v === "default" ? "Default" : "Animated"}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-econtent">Content</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-econtent">
            {(["dashboards", "forms"] as const).map((c) => (
              <button key={c} type="button" className="demo-segment" aria-pressed={contentType === c} onClick={() => setContentType(c)}>
                {c === "dashboards" ? "Dashboards" : "Forms"}
              </button>
            ))}
          </div>
        </div>
      </ControlsBar>
      <div className="editing-page__example-bleed cp-editing-bleed" data-content={contentType}>
        <EditingPrototypeMock key={`${variant}-${contentType}-${resetKey}`} variant={variant} contentType={contentType} />
      </div>
    </>
  );
}

function StrongTypePanel() {
  const [mode, setMode] = useState<StrongTypeInChatDemoMode>("side-chat");
  return (
    <>
      <ControlsBar><ModeToggle mode={mode} setMode={setMode} /></ControlsBar>
      <StrongTypeInChatDemo mode={mode} />
    </>
  );
}

function TextPanel() {
  const [textSize, setTextSize] = useState<"default" | "large">("default");
  return (
    <>
      <ControlsBar>
        <div className="demo-group">
          <p className="demo-label" id="cp-label-textsize">Size</p>
          <div className="demo-segments" role="group" aria-labelledby="cp-label-textsize">
            <button type="button" className="demo-segment" aria-pressed={textSize === "default"} onClick={() => setTextSize("default")}>Default</button>
            <button type="button" className="demo-segment" aria-pressed={textSize === "large"} onClick={() => setTextSize("large")}>Large</button>
          </div>
        </div>
      </ControlsBar>
      <div className="cp-stage">
        <Chat
          variant="side-panel"
          textSize={textSize}
          toolbar={{ title: "Blue whales" }}
          footer={
            <Composer width="fill" ariaComposerLabel="Chat composer"
              ariaMessageLabel="Message to Rippling AI" placeholder="Ask Rippling AI anything…" />
          }
        >
          <div className="chat__row chat__row--assistant">
            <article className="chat__block chat__block--ai" aria-label="Assistant message">
              <div className="chat__response">
                <div className="chat__response-section">
                  <h2 className="chat__response-h1">Title of section</h2>
                  <p className="chat__response-body">Blue whales, the largest animals to have ever existed on Earth, are awe-inspiring creatures that continue to captivate scientists and nature enthusiasts alike. These magnificent mammals command attention not only due to their immense size but also because of their critical role in the marine ecosystem.</p>
                </div>
                <div className="chat__response-section">
                  <h3 className="chat__response-h2">2nd level header</h3>
                  <p className="chat__response-body">Blue whales, the largest animals to have ever existed on Earth, are awe-inspiring creatures that continue to captivate scientists and nature enthusiasts alike.</p>
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
    </>
  );
}

/* ─── Page shell ─────────────────────────────────────────────────────── */

export function CombinedPrototypePage() {
  const [active, setActive] = useState<DemoId>("in-chat-widget");

  return (
    <div className="cp">
      {/* Top bar */}
      <header className="cp-topbar">
        <Link to="/" className="cp-topbar__back">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          AI components
        </Link>
        <span className="cp-topbar__divider" aria-hidden />
        <span className="cp-topbar__title">Combined prototype</span>
        <span className="cp-topbar__current">{DEMO_LABELS[active]}</span>
      </header>

      <div className="cp-body">
        {/* Left nav */}
        <nav className="cp-nav" aria-label="Component demos">
          {NAV.map((section) => (
            <div key={section.heading} className="cp-nav__section">
              <p className="cp-nav__heading">{section.heading}</p>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="cp-nav__item"
                  aria-current={active === item.id ? "page" : undefined}
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                  {item.wip ? <span className="cp-nav__wip" aria-label="Work in progress">🚧</span> : null}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Content */}
        <main className="cp-content">
          {active === "in-chat-widget"  && <InChatWidgetPanel />}
          {active === "rippling-native" && <RipplingNativePanel />}
          {active === "external"        && <ExternalArtifactsPanel />}
          {active === "chat"            && <ChatPanel />}
          {active === "composer"        && <ComposerPanel />}
          {active === "disambiguation"  && <DisambiguationPanel />}
          {active === "links"           && <LinksPanel />}
          {active === "prompts"         && <PromptsPanel />}
          {active === "thinking"        && <ThinkingStatesPanel />}
          {active === "artifact-tray"   && <ArtifactTrayPanel />}
          {active === "editing"         && <EditingPanel />}
          {active === "strong-type"     && <StrongTypePanel />}
          {active === "text"            && <TextPanel />}
        </main>
      </div>
    </div>
  );
}
