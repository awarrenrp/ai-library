import { useId, useState } from "react";
import "./Disambiguation.css";

export type DisambiguationInputType = "radio" | "checkbox";

export type DisambiguationOption = {
  id: string;
  title: string;
  description?: string;
  /** Small trailing pill (e.g. department). */
  label?: string;
};

export type DisambiguationProps = {
  /** Main question line (e.g. “Rich Single Selection”). */
  question: string;
  subtitle?: string;
  /** “1 of 2 questions” + dots when set. */
  step?: { current: number; total: number };
  inputType?: DisambiguationInputType;
  options: DisambiguationOption[];
  className?: string;
  /** Accessible label for the option list (defaults to `question`). */
  optionsLabel?: string;
};

export function Disambiguation({
  question,
  subtitle,
  step,
  inputType = "radio",
  options,
  className,
  optionsLabel,
}: DisambiguationProps) {
  const headingId = useId();
  const listLabel = optionsLabel ?? question;
  const [selected, setSelected] = useState<string[]>(() => {
    if (inputType === "checkbox") return [];
    return options[0] ? [options[0].id] : [];
  });

  function toggle(id: string) {
    if (inputType === "radio") {
      setSelected([id]);
      return;
    }
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const isSelected = (id: string) => selected.includes(id);

  return (
    <section
      className={["disambiguation", className].filter(Boolean).join(" ")}
      aria-labelledby={headingId}
    >
      {step ? (
        <div className="disambiguation__progress">
          <p className="disambiguation__step-label">
            {step.current} of {step.total} questions
          </p>
          <div className="disambiguation__dots" role="presentation" aria-hidden>
            {Array.from({ length: step.total }, (_, i) => (
              <span
                key={i}
                className={[
                  "disambiguation__dot",
                  i < step.current ? "disambiguation__dot--filled" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
        </div>
      ) : null}

      <header className="disambiguation__header">
        <h2 id={headingId} className="disambiguation__question">
          {question}
        </h2>
        {subtitle ? <p className="disambiguation__subtitle">{subtitle}</p> : null}
      </header>

      <div
        className="disambiguation__options"
        role={inputType === "radio" ? "radiogroup" : "group"}
        aria-label={listLabel}
      >
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role={inputType === "radio" ? "radio" : "checkbox"}
            aria-checked={isSelected(opt.id)}
            className={[
              "disambiguation__option",
              isSelected(opt.id) ? "disambiguation__option--selected" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => toggle(opt.id)}
          >
            <span className="disambiguation__control" aria-hidden>
              {inputType === "radio" ? (
                <span className="disambiguation__radio">
                  <span className="disambiguation__radio-dot" />
                </span>
              ) : (
                <span className="disambiguation__checkbox">
                  {isSelected(opt.id) ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M10 3L4.5 8.5 2 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
              )}
            </span>
            <span className="disambiguation__textblock">
              <span className="disambiguation__title">{opt.title}</span>
              {opt.description ? (
                <span className="disambiguation__description">{opt.description}</span>
              ) : null}
            </span>
            {opt.label ? <span className="disambiguation__pill">{opt.label}</span> : null}
          </button>
        ))}
      </div>

      <footer className="disambiguation__footer">
        <button type="button" className="disambiguation__btn disambiguation__btn--ghost">
          Cancel
        </button>
        <div className="disambiguation__footer-right">
          <button type="button" className="disambiguation__btn disambiguation__btn--primary">
            Continue
          </button>
        </div>
      </footer>
    </section>
  );
}
