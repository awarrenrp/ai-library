export type FontThemeId = "inter" | "basel";

const STORAGE_KEY = "ai-library-font-theme";

export function getStoredFontTheme(): FontThemeId {
  if (typeof window === "undefined") return "basel";
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === "inter" ? "inter" : "basel";
}

/** Applies `data-font-theme` on `<html>` for CSS (`index.css`). */
export function applyFontTheme(theme: FontThemeId): void {
  if (typeof document === "undefined") return;
  if (theme === "basel") {
    document.documentElement.dataset.fontTheme = "basel";
  } else {
    delete document.documentElement.dataset.fontTheme;
  }
}

export function persistFontTheme(theme: FontThemeId): void {
  localStorage.setItem(STORAGE_KEY, theme);
  applyFontTheme(theme);
}
