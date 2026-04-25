"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/lib/store/useSettingsStore";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { accentColor, theme, fontFamily, fontSize, ligatures } = useSettingsStore();

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply global CSS variables based on settings
    root.style.setProperty("--accent", accentColor);
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

    function applyColorMode(isDark: boolean) {
      if (isDark) {
        root.style.setProperty("--bg-base", "#09090B");
        root.style.setProperty("--bg-surface", "#111113");
        root.style.setProperty("--bg-elevated", "#18181B");
        root.style.setProperty("--border", "#1A1A1F");
        root.style.setProperty("--border-muted", "#27272A");
        root.style.setProperty("--text-primary", "#FAFAFA");
        root.style.setProperty("--text-secondary", "#A1A1AA");
        root.style.setProperty("--text-muted", "#71717A");
        root.style.setProperty("--accent-muted", "rgba(0, 255, 170, 0.10)");
        root.style.setProperty("--topbar-bg", "rgba(9, 9, 11, 0.80)");
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.style.setProperty("--bg-base", "#F8F9FA");
        root.style.setProperty("--bg-surface", "#FFFFFF");
        root.style.setProperty("--bg-elevated", "#FFFFFF");
        root.style.setProperty("--border", "#E2E8F0");
        root.style.setProperty("--border-muted", "#CBD5E1");
        root.style.setProperty("--text-primary", "#0F172A");
        root.style.setProperty("--text-secondary", "#64748B");
        root.style.setProperty("--text-muted", "#94A3B8");
        root.style.setProperty("--accent-muted", "rgba(0, 180, 120, 0.08)");
        root.style.setProperty("--topbar-bg", "rgba(255, 255, 255, 0.85)");
        root.classList.add("light");
        root.classList.remove("dark");
      }
    }

    if (theme === "light") {
      applyColorMode(false);
    } else if (theme === "dark") {
      applyColorMode(true);
    } else {
      // System: follow OS preference
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      applyColorMode(mq.matches);
      // Listen for OS-level changes while on 'system' mode
      const handler = (e: MediaQueryListEvent) => applyColorMode(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [accentColor, theme, fontFamily, fontSize, ligatures]);

  return <>{children}</>;
}
