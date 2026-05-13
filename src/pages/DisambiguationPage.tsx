import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { Disambiguation, DisambiguationInChatDemo } from "../components/Disambiguation";
import type {
  DisambiguationInChatDemoMode,
  DisambiguationInputType,
  DisambiguationOption,
  DisambiguationVariant,
} from "../components/Disambiguation";
import { IconSettings } from "../components/Composer/icons";
import { useDismissOnOutsidePress } from "../hooks/useDismissOnOutsidePress";
import "../App.css";
import { FigmaLink } from "../components/FigmaLink";

const FIGMA_SPEC =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=182-7027";

const DISAMBIG_VARIANTS = ["default", "design-system"] as const satisfies readonly DisambiguationVariant[];

const VARIANT_LABELS: Record<DisambiguationVariant, string> = {
  default: "Default",
  "design-system": "Design system",
};

const DISAMBIGUATION_WHEN = [
  "User input could mean more than one thing and a wrong guess is costly.",
  "Context and stated assumptions can't resolve the ambiguity on their own.",
  "Resolution needs at most two bundled clarifying questions.",
];

const DISAMBIGUATION_DESIGN_INTENT = [
  "In-thread popover anchored over the composer, never inside the thread itself.",
  "Captures structured input (radio or checkbox) instead of free text.",
  "Dismisses cleanly so the conversation continues with the user's pick.",
];

const DISAMBIGUATION_DOS = [
  "Place on top of the composer.",
  "Use disambig to clarify intent.",
  "Provide more than 4 choices.",
];

const DISAMBIGUATION_DONTS = [
  "Place inside of the chat text.",
  "Ask more than 2 questions.",
  "Use disambig for long-form content.",
  "Use in place of a form. If you're asking a lot of questions, link to a form, or ask the questions directly in the chat.",
];

const DEMO_QUESTION = "Which Jordan do you want to update?";

const DEMO_OPTIONS: DisambiguationOption[] = [
  {
    id: "jordan-lee",
    title: "Jordan Lee",
    description: "Software engineer · San Francisco",
    label: "Engineering",
  },
  {
    id: "jordan-chen",
    title: "Jordan Chen",
    description: "Account executive · Austin",
    label: "Sales",
  },
  {
    id: "jordan-patel",
    title: "Jordan Patel",
    description: "HR specialist · New York",
    label: "People",
  },
];

export function DisambiguationPage() {
  const pageMenuId = useId();
  const settingsBtnId = `disambig-page-settings-btn-${pageMenuId}`;
  const settingsRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [variant, setVariant] = useState<DisambiguationVariant>("default");
  const [inputType, setInputType] = useState<DisambiguationInputType>("radio");
  const [showStep, setShowStep] = useState(true);
  const [contextMode, setContextMode] = useState<DisambiguationInChatDemoMode>("side-chat");

  useDismissOnOutsidePress(
    menuOpen,
    () => setMenuOpen(false),
    (n) => settingsRef.current?.contains(n) ?? false,
  );

  const subtitle =
    inputType === "radio" ? "Select one to continue" : "Select any that apply";
  const step = showStep ? { current: 1, total: 2 } : undefined;

  return (
    <main className="demo-wrap">
      <div className="composer-page-settings" ref={settingsRef}>
        <button
          id={settingsBtnId}
          type="button"
          className="composer-page-settings-btn"
          aria-label="Disambiguation presentation"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={pageMenuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <IconSettings />
        </button>
        {menuOpen ? (
          <div
            id={pageMenuId}
            className="composer-page-settings-menu"
            role="menu"
            aria-labelledby={settingsBtnId}
          >
            {DISAMBIG_VARIANTS.map((v) => (
              <button
                key={v}
                type="button"
                role="menuitemradio"
                aria-checked={variant === v}
                className={[
                  "composer-page-settings-option",
                  variant === v ? "composer-page-settings-option--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  setVariant(v);
                  setMenuOpen(false);
                }}
              >
                {VARIANT_LABELS[v]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · Disambiguation
        </p>
        <h1 className="page-doc-title">Disambiguation</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Clarifying UI when the model needs structured input to proceed—single or multi-select rows with optional
          metadata, bundled into at most two questions.
        </p>
        <aside className="disambig-types-box" aria-label="Types of disambiguation">
          <p className="disambig-types-box__body">
            Disambiguating is used to clarify user intent. The system will have 4 types of
            ambiguity that it will need to resolve.
          </p>
          <ul className="disambig-types">
            <li>
              <strong>Lexical ambiguity</strong> — a word with multiple meanings.
            </li>
            <li>
              <strong>Intent ambiguity</strong> — unclear goal.
            </li>
            <li>
              <strong>Scope ambiguity</strong> — unclear how much to do.
            </li>
            <li>
              <strong>Reference ambiguity</strong> — unclear what &ldquo;it&rdquo; refers to.
            </li>
          </ul>
        </aside>
        <p style={{ margin: "16px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <FigmaLink href={FIGMA_SPEC} />
        </p>
      </header>

      <ComponentIntentPanel
        when={DISAMBIGUATION_WHEN}
        designIntent={DISAMBIGUATION_DESIGN_INTENT}
        dos={DISAMBIGUATION_DOS}
        donts={DISAMBIGUATION_DONTS}
      />

      <hr className="page-section__divider" aria-hidden="true" />
      <h2 className="page-section__title">Specs</h2>

      <div
        className="demo-preview-surface demo-preview-surface--stack"
        role="region"
        aria-label="Disambiguation interactive preview"
      >
        <div className="demo-toolbar" aria-label="Disambiguation preview controls">
          <div className="demo-group">
            <p className="demo-label" id="label-dis-input">
              Input type
            </p>
            <div className="demo-segments" role="group" aria-labelledby="label-dis-input">
              <button
                type="button"
                className="demo-segment"
                aria-pressed={inputType === "radio"}
                onClick={() => setInputType("radio")}
              >
                Radio
              </button>
              <button
                type="button"
                className="demo-segment"
                aria-pressed={inputType === "checkbox"}
                onClick={() => setInputType("checkbox")}
              >
                Checkbox
              </button>
            </div>
          </div>

          <div className="demo-group">
            <p className="demo-label" id="label-dis-step">
              Multi-step
            </p>
            <div className="demo-segments" role="group" aria-labelledby="label-dis-step">
              <button
                type="button"
                className="demo-segment"
                aria-pressed={showStep}
                onClick={() => setShowStep(true)}
              >
                On
              </button>
              <button
                type="button"
                className="demo-segment"
                aria-pressed={!showStep}
                onClick={() => setShowStep(false)}
              >
                Off
              </button>
            </div>
          </div>
        </div>

        <section>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: 18,
              fontWeight: "var(--font-weight-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            Component preview
          </h2>
          <p style={{ margin: "0 0 16px", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
            Isolated popover. Toolbar controls update both previews; use the gear (upper right) for Default vs Design system.
          </p>
          <div className="demo-stage" role="region" aria-label="Disambiguation component preview">
            <Disambiguation
              key={`preview-${inputType}-${showStep}-${variant}`}
              question={DEMO_QUESTION}
              subtitle={subtitle}
              step={step}
              inputType={inputType}
              variant={variant}
              options={DEMO_OPTIONS}
            />
          </div>
        </section>

      </div>

      <hr className="page-section__divider" aria-hidden="true" />

      <section
        className="in-context-stage"
        id="disambig-in-context"
        aria-labelledby="disambig-in-context-heading"
      >
        <div className="in-context-stage__head">
          <div className="in-context-stage__copy">
            <h2 id="disambig-in-context-heading" className="in-context-stage__title">
              Example in chat
            </h2>
            <p className="in-context-stage__lede">
              Same props, two surface modes. The disambiguation sheet rises over the composer in
              both — toggle to compare side panel against a full-screen workspace.
            </p>
          </div>
          <div className="demo-segments" role="group" aria-label="Disambiguation surface mode">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={contextMode === "side-chat"}
              onClick={() => setContextMode("side-chat")}
            >
              Side chat
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={contextMode === "full-screen"}
              onClick={() => setContextMode("full-screen")}
            >
              Full screen
            </button>
          </div>
        </div>
        <DisambiguationInChatDemo
          key={`${inputType}-${showStep}-${variant}-${contextMode}`}
          question={DEMO_QUESTION}
          subtitle={subtitle}
          step={step}
          inputType={inputType}
          variant={variant}
          options={DEMO_OPTIONS}
          mode={contextMode}
        />
      </section>
    </main>
  );
}
