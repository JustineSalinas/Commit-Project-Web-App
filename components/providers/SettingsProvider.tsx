"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/lib/store/useSettingsStore";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { accentColor, theme, fontFamily, fontSize, ligatures } = useSettingsStore();

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply global CSS variables based on settings
    root.style.setProperty("--accent", accentColor);
    
    // Derived hex with opacity for backgrounds/hover states
    // A simple hack is to pass the raw hex, and we can define Tailwind arbitrary values,
    // but since we rely on `var(--accent)`, any component using `text-[#00FFAA]` manually in the codebase needs to be 
    // updated to use `text-[var(--accent)]` or `text-[color:var(--accent)]`.
    // Wait, let's map Tailwind classes to use the CSS variable!
    
    // To make this easily apply:
    root.style.setProperty("--tw-ring-color", accentColor);

    let mappedFont = "var(--font-geist-mono)";
    switch (fontFamily) {
      case "jetbrains-mono": mappedFont = "'JetBrains Mono', monospace"; break;
      case "fira-code": mappedFont = "'Fira Code', monospace"; break;
      case "source-code-pro": mappedFont = "'Source Code Pro', monospace"; break;
      case "cascadia-code": mappedFont = "'Cascadia Code', monospace"; break;
      case "ibm-plex-mono": mappedFont = "'IBM Plex Mono', monospace"; break;
    }
    root.style.setProperty("--editor-font", mappedFont);
    root.style.setProperty("--editor-font-size", `${fontSize}px`);
    root.style.setProperty("--editor-ligatures", ligatures ? "normal" : "none");

    if (theme === "light") {
      root.style.setProperty("--bg-base", "#F4F4F5");
      root.style.setProperty("--bg-surface", "#FAFAFA");
      root.style.setProperty("--bg-elevated", "#FFFFFF");
      root.style.setProperty("--border", "#E4E4E7");
      root.style.setProperty("--text-primary", "#18181B");
      root.style.setProperty("--text-secondary", "#71717A");
    } else {
      // Revert to dark
      root.style.setProperty("--bg-base", "#09090B");
      root.style.setProperty("--bg-surface", "#111113");
      root.style.setProperty("--bg-elevated", "#18181B");
      root.style.setProperty("--border", "#1A1A1F");
      root.style.setProperty("--text-primary", "#FAFAFA");
      root.style.setProperty("--text-secondary", "#A1A1AA");
    }

  }, [accentColor, theme, fontFamily, fontSize, ligatures]);

  return <>{children}</>;
}
