/**
 * Artifact tray — repeatable usage example.
 *
 * Live source rendered as the spec page snippet (Vite `?raw`), so it stays
 * type-checked at build time. Swap the import paths for your library when
 * copying into Rippling product code.
 */
import { useState } from "react";
import {
  ArtifactTray,
  ArtifactTrayIconFile,
  ArtifactTrayIconReport,
  ArtifactTrayIconWorkflow,
  type ArtifactTrayItem,
} from "../components/ArtifactTray";

const TRAY_ITEMS: readonly ArtifactTrayItem[] = [
  { id: "workflow", title: "Workflow", icon: <ArtifactTrayIconWorkflow />, iconBg: "#7a005d" },
  {
    id: "policy-pdf",
    title: "New in-office policy.PDF",
    icon: <ArtifactTrayIconFile />,
    iconBg: "#bc2c00",
  },
  {
    id: "attendance",
    title: "Office attendance",
    icon: <ArtifactTrayIconReport />,
    iconBg: "#7a005d",
  },
];

export function ArtifactTrayExample() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <ArtifactTray
      items={TRAY_ITEMS}
      onClose={() => setOpen(false)}
    />
  );
}
