import "./Prompt.css";

export type PromptSurface = "outline" | "filled";

export type PromptProps = {
  title: string;
  /** Up to ~two lines in layout; longer copy truncates with ellipsis. */
  description?: string;
  /** Optional context such as persona or role (e.g. “Product designer”). */
  subtext?: string;
  surface?: PromptSurface;
  className?: string;
};

/** Figma AI-components · Rippling AI · node 182:8755 — outline surface */
function PromptOutlineIcon() {
  return (
    <svg
      className="prompt-arrow-svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3.47955 7C5.63714 6.62646 7.42555 5.17872 8.27444 3.22703C7.64661 2.26776 7.20227 1.17588 6.99889 0C6.38213 3.56741 3.56798 6.38112 0 7C3.56798 7.61888 6.38213 10.4326 7.0011 14C7.20448 12.8241 7.64882 11.7322 8.27665 10.773C7.42555 8.82128 5.63935 7.37354 3.48176 7H3.47955ZM9.94126 2.9419C9.58314 5.01074 7.95168 6.64193 5.88252 7C7.95168 7.35807 9.58093 8.98926 9.94126 11.0581C10.2994 8.98926 11.9308 7.35807 14 7C11.9308 6.64193 10.3016 5.01074 9.94126 2.9419Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Figma AI-components · Arrow Down Right · node 262:15231 — filled surface */
function PromptFilledIcon() {
  return (
    <svg
      className="prompt-arrow-svg"
      width={11}
      height={12}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0.875 4.95833V0H0V4.95833C0 7.133 1.76283 8.89583 3.9375 8.89583H8.71442L6.54442 11.0658L7.16333 11.6847L10.3892 8.45892L7.16333 5.23308L6.54442 5.852L8.71442 8.022H3.9375C2.24642 8.022 0.875 6.65058 0.875 4.9595V4.95833Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Prompt({
  title,
  description,
  subtext,
  surface = "outline",
  className,
}: PromptProps) {
  return (
    <button
      type="button"
      className={["prompt", surface === "outline" ? "prompt--outline" : "prompt--filled", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="prompt-arrow" aria-hidden>
        {surface === "outline" ? <PromptOutlineIcon /> : <PromptFilledIcon />}
      </span>
      <div className="prompt-text">
        <p className="prompt-title">{title}</p>
        {description ? <p className="prompt-description">{description}</p> : null}
        {subtext ? <p className="prompt-subtext">{subtext}</p> : null}
      </div>
    </button>
  );
}
