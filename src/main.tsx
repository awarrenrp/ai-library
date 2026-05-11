import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./basel-grotesk.css";
import "./index.css";
import { applyFontTheme, getStoredFontTheme } from "./fontTheme";

applyFontTheme(getStoredFontTheme());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
