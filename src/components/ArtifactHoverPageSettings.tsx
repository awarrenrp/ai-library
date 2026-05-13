import { useId, useRef, useState } from "react";
import { IconSettings } from "./Composer/icons";
import { useDismissOnOutsidePress } from "../hooks/useDismissOnOutsidePress";

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

  useDismissOnOutsidePress(
    menuOpen,
    () => setMenuOpen(false),
    (n) => ref.current?.contains(n) ?? false,
  );

  return (
    <div className="composer-page-settings" ref={ref}>
      <button
        id={btnId}
        type="button"
        className="composer-page-settings-btn"
        aria-label="Hover style for previews"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <IconSettings />
      </button>
      {menuOpen ? (
        <div id={menuId} className="composer-page-settings-menu" role="menu" aria-labelledby={btnId}>
          {ARTIFACT_HOVER_VARIANTS.map((v) => (
            <button
              key={v}
              type="button"
              role="menuitemradio"
              aria-checked={variant === v}
              className={[
                "composer-page-settings-option",
                variant === v ? "composer-page-settings-option--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
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
