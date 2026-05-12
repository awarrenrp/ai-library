import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import { Disambiguation, DisambiguationInChatDemo } from "../components/Disambiguation";
import type {
  DisambiguationInputType,
  DisambiguationOption,
  DisambiguationVariant,
} from "../components/Disambiguation";
import { IconSettings } from "../components/Composer/icons";
import "../App.css";

const FIGMA_SPEC =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=182-7027";

const FIGMA_DESIGN_SYSTEM_SPEC =
  "https://www.figma.com/design/Dvcv5Yj50PM2WuJhPj1qUH/AI-components?node-id=262-12244";

const DISAMBIG_VARIANTS = ["default", "design-system"] as const satisfies readonly DisambiguationVariant[];

const VARIANT_LABELS: Record<DisambiguationVariant, string> = {
  default: "Default",
  "design-system": "Design system",
};

const DISAMBIGUATION_WHEN =
  "When user input could mean more than one thing and a wrong guess is costly. Rippling AI resolves ambiguity from context and stated assumptions first, then asks a direct clarifying question only when needed—at most two questions, bundled when possible.";

const DISAMBIGUATION_DESIGN_INTENT = (
  <p>
    In-thread popover that sits over the composer input to capture additional information from the
    user. Not meant to sit inside of the chat itself, or above the composer.
  </p>
);

const DISAMBIGUATION_DOS = [
  "Place on top of the composer.",
  "Use disambig to clarify intent.",
  "Provide more than 4 choices.",
];

const DISAMBIGUATION_DONTS = [
  "Place inside of the chat text.",
  "Ask more than 2 questions.",
  "Use disambig for long-form content.",
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

  useEffect(() => {
    if (!menuOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const el = settingsRef.current;
      if (el && !el.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: "var(--font-weight-heading)", letterSpacing: "-0.02em" }}>Disambiguation</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Clarifying UI when the model needs structured input to proceed—single or multi-select rows with optional
          metadata, bundled into at most two questions.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
          <a href={FIGMA_SPEC} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Figma · AI-components (Disambiguation overview)
          </a>
          {" · "}
          <a href={FIGMA_DESIGN_SYSTEM_SPEC} target="_blank" rel="noreferrer" style={{ color: "#7a005d" }}>
            Design system frame (262:12244)
          </a>
        </p>
      </header>

      <ComponentIntentPanel
        when={DISAMBIGUATION_WHEN}
        designIntent={DISAMBIGUATION_DESIGN_INTENT}
        dos={DISAMBIGUATION_DOS}
        donts={DISAMBIGUATION_DONTS}
      />

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

        <section>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: 18,
              fontWeight: "var(--font-weight-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            Example in chat
          </h2>
          <p style={{ margin: "0 0 16px", maxWidth: 640, fontSize: 14, lineHeight: 1.5, color: "#716f6c" }}>
            Same props in a side chat with composer and sheet. Use &quot;Show example&quot; to open the flow.
          </p>
          <div className="demo-stage" role="region" aria-label="Disambiguation in context">
            <DisambiguationInChatDemo
              key={`${inputType}-${showStep}-${variant}`}
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
    </main>
  );
}
