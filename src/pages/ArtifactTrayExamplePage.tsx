import { ExamplePageLayout } from "../components/ExamplePageLayout/ExamplePageLayout";
import { ArtifactTrayDemo } from "../components/ArtifactTray";
import "../App.css";

export function ArtifactTrayExamplePage() {
  return (
    <ExamplePageLayout backTo="/artifact-tray" backLabel="Artifact tray">
      <div className="in-context-stage" style={{ borderTop: "none" }}>
        <ArtifactTrayDemo />
      </div>
    </ExamplePageLayout>
  );
}
