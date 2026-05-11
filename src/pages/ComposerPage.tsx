import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Composer,
  COMPOSER_VERSION_LABELS,
  COMPOSER_VERSIONS,
  WIDTH_PX,
} from "../components/Composer";
import type { ComposerVersion, ComposerWidth } from "../components/Composer";
import { IconSettings } from "../components/Composer/icons";
import { ComponentIntentPanel } from "../components/ComponentIntentPanel";
import "../App.css";

const FILLED_SAMPLE = "Make me a report about sales people in SF";

const COMPOSER_WHEN =
  "When a user requests to interact with the AI chat, the composer is the method of using natural language inputs to query more information.";

const COMPOSER_DESIGN_INTENT =
  "The composer should be consistent across Rippling. A single composer can exist on each page, and we should avoid having a composer and side panel chat.";

export function ComposerPage() {
  const pageMenuId = useId();
  const settingsBtnId = `composer-page-settings-btn-${pageMenuId}`;
  const [width, setWidth] = useState<ComposerWidth>("large");
  const [composerVersion, setComposerVersion] = useState<ComposerVersion>("standard");
  const [variant, setVariant] = useState<"default" | "filled">("default");
  const [text, setText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  function applyVariant(next: "default" | "filled") {
    setVariant(next);
    setText(next === "filled" ? FILLED_SAMPLE : "");
  }

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

  return (
    <main className="demo-wrap">
      <div className="composer-page-settings" ref={settingsRef}>
        <button
          id={settingsBtnId}
          type="button"
          className="composer-page-settings-btn"
          aria-label="Composer version"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={pageMenuId}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <IconSettings />
        </button>
        {menuOpen && (
          <div
            id={pageMenuId}
            className="composer-page-settings-menu"
            role="menu"
            aria-labelledby={settingsBtnId}
          >
            {COMPOSER_VERSIONS.map((v) => (
              <button
                key={v}
                type="button"
                role="menuitemradio"
                aria-checked={composerVersion === v}
                className={[
                  "composer-page-settings-option",
                  composerVersion === v ? "composer-page-settings-option--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  setComposerVersion(v);
                  setMenuOpen(false);
                }}
              >
                {COMPOSER_VERSION_LABELS[v]}
              </button>
            ))}
          </div>
        )}
      </div>

      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ fontSize: 14, color: "#716f6c", textDecoration: "none" }}>
          ← AI components
        </Link>
      </nav>

      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components
        </p>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}>Composer</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          When users open AI chat, the composer is how they use natural language to ask questions and pull in more
          information—one consistent pattern across Rippling, without pairing an inline composer with a separate side
          panel chat on the same page.
        </p>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 16, lineHeight: 1.5, color: "#716f6c" }}>
          Use the controls below for width and default vs filled state. Composer version (standard vs alternate) is
          available from the settings control in the upper right of the page.
        </p>
      </header>

      <ComponentIntentPanel when={COMPOSER_WHEN} designIntent={COMPOSER_DESIGN_INTENT} />

      <div className="demo-toolbar" aria-label="Composer preview controls">
        <div className="demo-group">
          <p className="demo-label" id="label-width">
            Width
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-width">
            {(["large", "medium", "small"] as const).map((w) => (
              <button
                key={w}
                type="button"
                className="demo-segment"
                aria-pressed={width === w}
                aria-label={`${w} width, ${WIDTH_PX[w]} pixels`}
                onClick={() => setWidth(w)}
              >
                {w.charAt(0).toUpperCase() + w.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-group">
          <p className="demo-label" id="label-state">
            State
          </p>
          <div className="demo-segments" role="group" aria-labelledby="label-state">
            <button
              type="button"
              className="demo-segment"
              aria-pressed={variant === "default"}
              aria-label="Default state, empty message field"
              onClick={() => applyVariant("default")}
            >
              Default
            </button>
            <button
              type="button"
              className="demo-segment"
              aria-pressed={variant === "filled"}
              aria-label="Filled state, sample message"
              onClick={() => applyVariant("filled")}
            >
              Filled
            </button>
          </div>
        </div>
      </div>

      <div className="demo-stage" role="region" aria-label="Composer preview">
        <Composer width={width} value={text} onChange={setText} version={composerVersion} />
      </div>

      <p className="demo-meta" aria-live="polite">
        Outer width <strong>{WIDTH_PX[width]}px</strong> · Composer{" "}
        <strong>{composerVersion === "alternate" ? "Alternate" : "Standard"}</strong> ·{" "}
        <strong>{variant === "filled" ? "Filled" : "Default"}</strong>
      </p>
    </main>
  );
}
