import { SpecPageHeader } from "../components/SpecPageHeader/SpecPageHeader";
import "../App.css";

export function AiIconPage() {
  return (
    <>
      <SpecPageHeader
        componentName="AI icon"
        specPath="/ai-icon"
      />
      <main className="demo-wrap">
      <header style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, letterSpacing: "0.06em", color: "#716f6c" }}>
          Rippling | In partnership with Pebble · AI-components · AI icon
        </p>
        <h1 className="page-doc-title">AI icon</h1>
        <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 18, lineHeight: 1.55, color: "#716f6c" }}>
          Spec in progress.
        </p>
      </header>
    </main>
    </>
  );
}
