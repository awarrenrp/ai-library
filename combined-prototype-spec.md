# Rippling AI Components — Combined Prototype Spec

## Overview

A single-page prototype that displays all 13 interactive AI component examples in one navigable interface. The goal is to reduce context-switching between separate spec pages by unifying the live demos under one shell.

The existing library lives at `/Users/aliciawarren/Code/ai-library` (React 19 + Vite + TypeScript, no external UI framework, Basel Grotesk font, custom CSS tokens).

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Routing:** react-router-dom v7
- **Styling:** Plain CSS with custom properties (no Tailwind, no CSS-in-JS)
- **Font:** Basel Grotesk (variable font, locally hosted in `src/`)
- **Icons:** Custom SVG components only

---

## Design Tokens (from `src/tokens.css`)

```css
--color-primary: #7a005d;          /* berry */
--color-on-primary: #ffffff;
--color-info: #1e4aa9;
--color-surface: #f9f7f6;          /* warm off-white page background */
--color-success-container: #bae5d9;
--color-error-container: #f9dad1;
--font-weight-body: 400;
--font-weight-emphasis: 535;       /* Basel Grotesk medium axis */
--font-weight-heading: 600;
```

---

## Prototype Shell Layout

```
┌─────────────────────────────────────────────────────┐
│  RIPPLING AI  ·  Combined Examples            [dark] │  ← sticky top bar (52px)
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│  NAVIGATION  │   DEMO CONTENT AREA                  │
│  (220px)     │   (flex: 1, overflow: auto)           │
│              │                                       │
│  Artifacts + │                                       │
│  Widgets     │                                       │
│  ──────────  │                                       │
│  Components  │                                       │
│  + Interact. │                                       │
│  ──────────  │                                       │
│  In Progress │                                       │
│              │                                       │
└──────────────┴──────────────────────────────────────┘
```

- **Left rail:** 220px fixed, sticky, lists all sections + items. Active item: berry left border + tinted bg.
- **Top bar:** 52px, dark (`#1a1a1a`), shows library name.
- **Content area:** `flex: 1`, full-height, each demo fills it — no extra padding that would clip chat frames.

---

## Navigation Structure

### Section 1 — Artifacts + Widgets
1. In-chat widget
2. Rippling-native artifacts
3. External artifacts

### Section 2 — Components + Interactions
4. Chat
5. Composer
6. Disambiguation
7. Links
8. Prompts
9. Thinking states

### Section 3 — In Progress 🚧
10. Artifact tray
11. Editing
12. Strong type
13. Text

---

## Per-Demo Spec

Each demo renders in a clean frame. Where demos have a **side chat / full screen** mode toggle, it appears as a segmented control in a controls bar pinned to the top of the content area.

---

### 1. In-chat widget
**Import:** `InChatWidgetDemo` from `src/components/InChatWidget`
**Type:** `InChatWidgetDemoMode = "side-chat" | "full-screen"`
**Controls:** Mode toggle (Side chat / Full screen)
**Render:** `<InChatWidgetDemo mode={mode} />`

---

### 2. Rippling-native artifacts
**Import:** `RipplingNativeArtifactInChatDemo` from `src/components/RipplingArtifact`
**Type:** `RipplingNativeArtifactInChatDemoMode = "side-chat" | "full-screen"`
**Controls:** Mode toggle
**Render:** `<RipplingNativeArtifactInChatDemo mode={mode} />`

---

### 3. External artifacts
**Import:** `ExternalArtifactInChatDemo` from `src/components/ExternalArtifact`
**Type:** `ExternalArtifactInChatDemoMode = "side-chat" | "full-screen"`
**Controls:** Mode toggle
**Render:** `<ExternalArtifactInChatDemo mode={mode} />`

---

### 4. Chat
**Imports:** `Chat`, `CHAT_LAYOUT_VARIANTS`, `CHAT_THREAD_PRESETS` from `src/components/Chat`; `Composer` from `src/components/Composer`
**Types:** `ChatLayoutVariant = "side-panel" | "page"`, `ChatThreadPreset = "conversation" | "empty"`
**Controls:**
- Layout toggle: Side panel / Page
- Thread toggle: Conversation / Empty

**Render:**
```tsx
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
```

---

### 5. Composer
**Imports:** `Composer`, `COMPOSER_VERSIONS`, `COMPOSER_VERSION_LABELS`, `WIDTH_PX` from `src/components/Composer`
**Types:** `ComposerVersion`, `ComposerWidth`
**Controls:**
- Width toggle: Large / Medium / Small
- Version toggle: Standard / Alternate
- State toggle: Default / Filled

**Render:** `<Composer width={width} value={filled ? "Make me a report about sales people in SF" : ""} version={version} />`

---

### 6. Disambiguation
**Import:** `DisambiguationInChatDemo` from `src/components/Disambiguation`
**Type:** `DisambiguationInChatDemoMode = "side-chat" | "full-screen"`
**Controls:** Mode toggle
**Render:** `<DisambiguationInChatDemo mode={mode} />`

---

### 7. Links
**Import:** `LinksInChatDemo` from `src/components/Links`
**Type:** `LinksInChatDemoMode = "side-chat" | "full-screen"`
**Controls:** Mode toggle
**Render:** `<LinksInChatDemo mode={mode} />`

---

### 8. Prompts
**Imports:** `Prompt`, `PromptsInChatDemo` from `src/components/Prompt`
**Types:** `PromptSurface = "outline" | "filled"`, `PromptsInChatDemoMode`
**Controls:**
- Surface toggle: Outlined / Filled
- Subtext toggle: On / Off
- Mode toggle: Side chat / Full screen

**Render:**
```tsx
<>
  {/* Isolated preview */}
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "32px 32px 0" }}>
    <Prompt
      title="Look up your favorite coworker"
      description="Show the number of people who joined the company over the past few months."
      subtext={subtextOn ? "Show the number of people who joined the company over the past few months." : undefined}
      surface={surface}
    />
    <Prompt title="Draft candidate feedback" surface={surface} />
  </div>
  {/* In-context */}
  <PromptsInChatDemo mode={mode} surface={surface} subtextOn={subtextOn} />
</>
```

---

### 9. Thinking states
**Imports:** `ChatExampleDemo`, `CHAT_PANEL_VERSIONS`, `CHAT_PANEL_VERSION_LABELS` from `src/components/Chat`
**Types:** `ChatPanelVersion = "default" | "no-glyphs" | "animated"`, `ChatExampleDemoMode`
**Controls:**
- Panel version toggle: Default / No glyphs / Animated
- Mode toggle: Side chat / Full screen

**Render:** `<ChatExampleDemo key={`${mode}-${panelVersion}`} mode={mode} panelVersion={panelVersion} />`

---

### 10. Artifact tray
**Import:** `ArtifactTrayDemo` from `src/components/ArtifactTray`
**Type:** `ArtifactTrayDemoMode = "side-chat" | "full-screen"`
**Controls:** Mode toggle
**Render:** `<ArtifactTrayDemo mode={mode} />`

---

### 11. Editing
**Import:** `EditingPrototypeMock` from `src/components/EditingPrototype`
**CSS:** also import `src/pages/EditingPage.css` for `.editing-page__example-bleed` / `.editing-page__example-inner`
**Types:** `"default" | "animated"` for variant; `"dashboards" | "forms"` for contentType
**Controls:**
- Editing style: Default / Animated
- Content: Dashboards / Forms

**Render:**
```tsx
<div className="editing-page__example-bleed" data-content={contentType}>
  <EditingPrototypeMock
    key={`${variant}-${contentType}`}
    variant={variant}
    contentType={contentType}
  />
</div>
```

---

### 12. Strong type
**Import:** `StrongTypeInChatDemo` from `src/components/StrongType`
**Type:** `StrongTypeInChatDemoMode = "side-chat" | "full-screen"`
**Controls:** Mode toggle
**Render:** `<StrongTypeInChatDemo mode={mode} />`

---

### 13. Text
**Imports:** `Chat` from `src/components/Chat`; `Composer` from `src/components/Composer`
**Types:** `"default" | "large"` for text size
**Controls:** Size toggle: Default / Large
**Render:**
```tsx
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
            to their immense size but also because of their critical role in the marine ecosystem.
          </p>
        </div>
        <div className="chat__response-section">
          <h3 className="chat__response-h2">2nd level header</h3>
          <p className="chat__response-body">
            Blue whales, the largest animals to have ever existed on Earth, are
            awe-inspiring creatures that continue to captivate scientists and nature enthusiasts alike.
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
```

---

## Shared Control Pattern

All controls use the existing classes from `src/App.css`:

```tsx
/* Controls bar */
<div className="demo-toolbar" aria-label="Controls">
  <div className="demo-group">
    <p className="demo-label" id="label-foo">Label</p>
    <div className="demo-segments" role="group" aria-labelledby="label-foo">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          className="demo-segment"
          aria-pressed={active === opt}
          onClick={() => setActive(opt)}
        >
          {labels[opt]}
        </button>
      ))}
    </div>
  </div>
</div>
```

---

## State Architecture

Single top-level `activeDemo` string. All per-demo controls are local state inside each panel component — switching demos resets controls automatically.

```tsx
export function CombinedPrototype() {
  const [activeDemo, setActiveDemo] = useState("in-chat-widget");

  return (
    <div className="combined-proto">
      <TopBar />
      <div className="combined-proto__body">
        <NavRail active={activeDemo} onSelect={setActiveDemo} />
        <main className="combined-proto__content">
          {activeDemo === "in-chat-widget"   && <InChatWidgetPanel />}
          {activeDemo === "rippling-native"  && <RipplingNativePanel />}
          {activeDemo === "external"         && <ExternalArtifactsPanel />}
          {activeDemo === "chat"             && <ChatPanel />}
          {activeDemo === "composer"         && <ComposerPanel />}
          {activeDemo === "disambiguation"   && <DisambiguationPanel />}
          {activeDemo === "links"            && <LinksPanel />}
          {activeDemo === "prompts"          && <PromptsPanel />}
          {activeDemo === "thinking"         && <ThinkingStatesPanel />}
          {activeDemo === "artifact-tray"    && <ArtifactTrayPanel />}
          {activeDemo === "editing"          && <EditingPanel />}
          {activeDemo === "strong-type"      && <StrongTypePanel />}
          {activeDemo === "text"             && <TextPanel />}
        </main>
      </div>
    </div>
  );
}
```

---

## Nav Data

```tsx
type NavItem = { id: string; label: string; wip?: boolean };
type NavSection = { heading: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    heading: "Artifacts + Widgets",
    items: [
      { id: "in-chat-widget",  label: "In-chat widget" },
      { id: "rippling-native", label: "Rippling-native artifacts" },
      { id: "external",        label: "External artifacts" },
    ],
  },
  {
    heading: "Components + Interactions",
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
```

---

## CSS Shell

New file `CombinedPrototype.css`:

```css
.combined-proto {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-family: "Basel Grotesk", system-ui, sans-serif;
  background: var(--color-surface, #f9f7f6);
}

.combined-proto__topbar {
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.combined-proto__topbar-divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.2);
}

.combined-proto__topbar-subtitle {
  font-weight: 400;
  opacity: 0.6;
}

.combined-proto__body {
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
}

.combined-proto__nav {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  overflow-y: auto;
  padding: 12px 0 24px;
}

.combined-proto__content {
  flex: 1 1 auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

/* Nav */
.combined-proto__nav-section {
  margin-top: 8px;
}

.combined-proto__nav-section + .combined-proto__nav-section {
  margin-top: 4px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: 8px;
}

.combined-proto__nav-heading {
  padding: 8px 16px 4px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #aaa;
  user-select: none;
}

.combined-proto__nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 7px 16px;
  background: none;
  border: none;
  border-left: 2px solid transparent;
  font-size: 13px;
  font-weight: 500;
  color: #3d3a36;
  text-align: left;
  cursor: pointer;
  line-height: 1.4;
}

.combined-proto__nav-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.combined-proto__nav-item[aria-current="page"] {
  border-left-color: #7a005d;
  background: color-mix(in srgb, #7a005d 7%, transparent);
  color: #7a005d;
  font-weight: 600;
}

.combined-proto__nav-wip {
  font-size: 11px;
  opacity: 0.5;
}
```

---

## Files to Copy from Existing Library

Copy these folders wholesale from `/Users/aliciawarren/Code/ai-library/src/`:

```
src/
  components/
    ArtifactTray/         ← ArtifactTray.tsx, ArtifactTrayDemo.tsx, index.ts + CSS
    Chat/                 ← Chat.tsx, Chat.css, index.ts
    Composer/             ← Composer.tsx, Composer.css, icons.tsx, index.ts
    Disambiguation/       ← full folder
    EditingPrototype/     ← full folder
    ExternalArtifact/     ← full folder
    InChatWidget/         ← full folder
    Links/                ← full folder
    Prompt/               ← full folder
    RipplingArtifact/     ← full folder
    StrongType/           ← full folder
    InChatWidget/         ← full folder
  tokens.css
  App.css                 ← for .demo-toolbar, .demo-segments, .demo-segment, etc.
  index.css
  basel-grotesk.css       ← font face declarations

pages/
  EditingPage.css         ← needed for .editing-page__example-bleed layout classes
```

Also copy the Basel Grotesk font files (`.woff2`) from wherever they're referenced in `basel-grotesk.css`.

---

## Notes

- Each `*Panel` component mounts fresh when selected — no need to persist control state across nav switches.
- The `editing` demo needs `EditingPage.css` imported because `EditingPrototypeMock` uses `.editing-page__example-bleed` and `.editing-page__example-inner` for its full-bleed layout.
- The `Chat` component accepts a `textSize` prop — pass `"default" | "large"` directly from the Text panel's toggle.
- `CHAT_PANEL_VERSIONS` and `CHAT_PANEL_VERSION_LABELS` are exported from `src/components/Chat/index.ts` — use them to drive the Thinking states panel version toggle.
- All `aria-pressed` segmented buttons are already styled via `.demo-segment[aria-pressed="true"]` in `App.css` — no extra CSS needed for active state.
