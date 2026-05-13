import { useEffect, useId, useRef, useState } from "react";
import { IconButton, iconTypes } from "../pebbleButton";

export const ARTIFACT_HOVER_VARIANTS = ["shadow", "overlay"] as const;
export type ArtifactHoverVariant = (typeof ARTIFACT_HOVER_VARIANTS)[number];

export const ARTIFACT_HOVER_LABELS: Record<ArtifactHoverVariant, string> = {
  shadow: "Shadow only",
  overlay: "Grey overlay",
};

type ArtifactHoverPageSettingsProps = {
  variant: ArtifactHoverVariant;
  onVariantChange: (next: ArtifactHoverVariant) => void;
};

/** Gear menu — matches composer-page-settings pattern (Chat / Composer pages). */
export function ArtifactHoverPageSettings({ variant, onVariantChange }: ArtifactHoverPageSettingsProps) {
  const uid = useId();
  const btnId = `artifact-hover-settings-btn-${uid}`;
  const menuId = `artifact-hover-settings-menu-${uid}`;
  const ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onDocMouseDown(e: MouseEvent) {
      const el = ref.current;
      if (el && !el.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <div className="composer-page-settings" ref={ref}>
      <span id={btnId} className="composer-page-settings-trigger">
        <IconButton
          icon={iconTypes.SETTINGS_OUTLINE}
          aria-label="Hover style for previews"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          appearance={IconButton.APPEARANCES.OUTLINE}
          size={IconButton.SIZES.M}
          onClick={() => setMenuOpen((o) => !o)}
        />
      </span>
      {menuOpen ? (
        <div
          id={menuId}
          className="composer-page-settings-menu"
          role="group"
          aria-label="Hover style for previews — options"
        >
          {ARTIFACT_HOVER_VARIANTS.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={variant === v}
              onClick={() => {
                onVariantChange(v);
                setMenuOpen(false);
              }}
            >
              {ARTIFACT_HOVER_LABELS[v]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
