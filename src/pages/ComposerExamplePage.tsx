import { useState } from "react";
import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { Composer, COMPOSER_VERSIONS, COMPOSER_VERSION_LABELS, WIDTH_PX } from "../components/Composer";
import type { ComposerVersion, ComposerWidth } from "../components/Composer";
import "../App.css";

const FILLED_SAMPLE = "Make me a report about sales people in SF";

export function ComposerExamplePage() {
  const [width, setWidth] = useState<Exclude<ComposerWidth, "fill">>("large");
  const [version, setVersion] = useState<ComposerVersion>("standard");
  const [filled, setFilled] = useState(false);

  const controls = (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <div className="demo-segments" role="group" aria-label="Width">
        {(["large", "medium", "small"] as const).map((w) => (
          <button key={w} type="button" className="demo-segment" aria-pressed={width === w}
            aria-label={`${w} width, ${WIDTH_PX[w]} pixels`} onClick={() => setWidth(w)}>
            {w.charAt(0).toUpperCase() + w.slice(1)}
          </button>
        ))}
      </div>
      <div className="demo-segments" role="group" aria-label="Version">
        {COMPOSER_VERSIONS.map((v) => (
          <button key={v} type="button" className="demo-segment" aria-pressed={version === v}
            onClick={() => setVersion(v)}>
            {COMPOSER_VERSION_LABELS[v]}
          </button>
        ))}
      </div>
      <div className="demo-segments" role="group" aria-label="State">
        <button type="button" className="demo-segment" aria-pressed={!filled} onClick={() => setFilled(false)}>Default</button>
        <button type="button" className="demo-segment" aria-pressed={filled} onClick={() => setFilled(true)}>Filled</button>
      </div>
    </div>
  );

  return (
    <ExamplePageLayout backTo="/composer" backLabel="Composer" headerActions={controls}>
      <div className="demo-stage" role="region" aria-label="Composer preview"
        style={{ padding: "48px 32px", display: "flex", justifyContent: "center" }}>
        <Composer width={width} value={filled ? FILLED_SAMPLE : ""} version={version} />
      </div>
    </ExamplePageLayout>
  );
}
