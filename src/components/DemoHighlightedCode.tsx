import { Highlight, themes } from "prism-react-renderer";

type DemoHighlightedCodeProps = {
  code: string;
  /** Prism language id (default `tsx` for React + TypeScript samples). */
  language?: string;
  className?: string;
};

export function DemoHighlightedCode({
  code,
  language = "tsx",
  className,
  ariaLabel = "Example source code",
}: DemoHighlightedCodeProps & { ariaLabel?: string }) {
  return (
    <Highlight theme={themes.oneDark} code={code} language={language}>
      {({ className: prismClass, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={["demo-code-block", "demo-code-block--syntax", prismClass, className].filter(Boolean).join(" ")}
          style={style}
          aria-label={ariaLabel}
          tabIndex={0}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
