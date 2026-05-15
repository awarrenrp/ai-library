import { useRef, useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { EditingPrototypeMock } from "../components/EditingPrototype";
import "../App.css";
import "./EditingPage.css";

const ANIMATED_PASSWORD = "0000";

function PasswordGate({ onUnlock, onDismiss }: { onUnlock: () => void; onDismiss: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === ANIMATED_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setValue("");
      inputRef.current?.focus();
    }
  }

  return (
    <div className="editing-gate-overlay" role="dialog" aria-modal aria-label="Enter password">
      <div className="editing-gate-dialog">
        <p className="editing-gate-title">Protected preview</p>
        <p className="editing-gate-desc">Enter the password to access the animated variant.</p>
        <form onSubmit={handleSubmit} className="editing-gate-form">
          <input
            ref={inputRef}
            type="password"
            className={["editing-gate-input", error ? "editing-gate-input--error" : ""].filter(Boolean).join(" ")}
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            autoComplete="off"
            aria-label="Password"
            aria-invalid={error}
            aria-describedby={error ? "editing-gate-error" : undefined}
          />
          {error && <p id="editing-gate-error" className="editing-gate-error">Incorrect password</p>}
          <div className="editing-gate-actions">
            <button type="button" className="editing-gate-btn editing-gate-btn--cancel" onClick={onDismiss}>
              Cancel
            </button>
            <button type="submit" className="editing-gate-btn editing-gate-btn--submit">
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EditingExamplePage() {
  const [protoVariant, setProtoVariant] = useState<"default" | "animated">("default");
  const [contentType, setContentType] = useState<"dashboards" | "forms">("dashboards");
  const [resetKey, setResetKey] = useState(0);
  const [animatedUnlocked, setAnimatedUnlocked] = useState(false);
  const [showGate, setShowGate] = useState(false);

  function requestAnimated() {
    if (animatedUnlocked) {
      setProtoVariant("animated");
      setResetKey((k) => k + 1);
    } else {
      setShowGate(true);
    }
  }

  function handleUnlock() {
    setAnimatedUnlocked(true);
    setShowGate(false);
    setProtoVariant("animated");
    setResetKey((k) => k + 1);
  }

  const controls = (
    <div style={{ display: "flex", gap: 8 }}>
      <div className="demo-segments" role="group" aria-label="Editing style">
        <button
          type="button"
          className="demo-segment"
          aria-pressed={protoVariant === "default"}
          onClick={() => { setProtoVariant("default"); setResetKey((k) => k + 1); }}
        >
          Default
        </button>
        <button
          type="button"
          className="demo-segment"
          aria-pressed={protoVariant === "animated"}
          onClick={requestAnimated}
        >
          Animated
        </button>
      </div>
      <div className="demo-segments" role="group" aria-label="Content type">
        {(["dashboards", "forms"] as const).map((c) => (
          <button
            key={c}
            type="button"
            className="demo-segment"
            aria-pressed={contentType === c}
            onClick={() => setContentType(c)}
          >
            {c === "dashboards" ? "Dashboards" : "Forms"}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <ExamplePageLayout backTo="/editing" backLabel="Editing" headerActions={controls}>
      {showGate && (
        <PasswordGate
          onUnlock={handleUnlock}
          onDismiss={() => setShowGate(false)}
        />
      )}
      <div className="editing-page__example-bleed" aria-label="Editing prototype — full-width preview">
        <div className="editing-page__example-inner" data-content={contentType}>
          <EditingPrototypeMock
            key={`${protoVariant}-${contentType}-${resetKey}`}
            variant={protoVariant}
            contentType={contentType}
          />
        </div>
      </div>
    </ExamplePageLayout>
  );
}
