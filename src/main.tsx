import "./processPolyfill";
import GlobalStyles from "@rippling/pebble/GlobalStyle";
import { ThemeProvider } from "@rippling/pebble/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./basel-grotesk.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultColorMode="light">
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
