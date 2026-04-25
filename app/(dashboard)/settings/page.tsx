"use client";

import { useState } from "react";
import { UserProfile, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useSettingsStore } from "@/lib/store/useSettingsStore";
import {
  User,
  Shield,
  Palette,
  Type,
  Bot,
  GitBranch,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  Sparkles,
} from "lucide-react";

type SettingsTab =
  | "profile"
  | "security"
  | "appearance"
  | "editor"
  | "ai"
  | "repos";

const tabs = [
  { id: "profile" as const, label: "Profile", icon: User, description: "Avatar, display name, email" },
  { id: "security" as const, label: "Security", icon: Shield, description: "Passwords, sessions, MFA" },
  { id: "appearance" as const, label: "Appearance", icon: Palette, description: "Theme, accents, UI" },
  { id: "editor" as const, label: "Editor", icon: Type, description: "Fonts, sizes, tab width" },
  { id: "ai" as const, label: "AI Features", icon: Bot, description: "Gemini model, prompts, usage" },
  { id: "repos" as const, label: "Repositories", icon: GitBranch, description: "Repo syncing & access" },
];

/* ─── Reusable Components ─── */

function SettingsCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--border)] last:border-b-0">
      <div className="space-y-0.5">
        <div className="text-sm font-medium text-[var(--text-primary)]">{label}</div>
        {description && <div className="text-xs text-[var(--text-secondary)]">{description}</div>}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        enabled ? "bg-[var(--accent)]" : "bg-red-500"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[var(--bg-base)] rounded-full transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-1.5 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/* ─── Tab Content Panels ─── */

function ProfileTab() {
  const accentColor = useSettingsStore(state => state.accentColor);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Profile Management</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Update your avatar, display name, and primary email address.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden border border-[var(--border)]">
        <UserProfile
          appearance={{
            baseTheme: undefined, // Let it adapt to the current theme
            variables: {
              colorBackground: "var(--bg-elevated)",
              colorInputBackground: "var(--bg-base)",
              colorInputText: "var(--text-primary)",
              colorText: "var(--text-primary)",
              colorTextSecondary: "var(--text-secondary)",
              colorPrimary: accentColor,
              colorDanger: "var(--danger)",
              borderRadius: "0.5rem",
              fontFamily: "inherit",
            },
            elements: {
              card: "shadow-none bg-transparent border-none",
              navbar: "hidden",
              navbarMobileMenuButton: "hidden",
              headerTitle: "text-[var(--text-primary)]",
              headerSubtitle: "text-[var(--text-secondary)]",
              pageScrollBox: "p-0",
            },
          }}
        />
      </div>
    </div>
  );
}

function SecurityTab() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Authentication & Security</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage passwords, sessions, and multi-factor authentication.
        </p>
      </div>

      <SettingsCard>
        <SettingsRow label="Multi-Factor Authentication (MFA)" description="Add an extra layer of security to your account.">
          <Toggle enabled={mfaEnabled} onToggle={() => setMfaEnabled(!mfaEnabled)} />
        </SettingsRow>
        <SettingsRow label="Session Activity Alerts" description="Get notified when a new device signs into your account.">
          <Toggle enabled={sessionAlerts} onToggle={() => setSessionAlerts(!sessionAlerts)} />
        </SettingsRow>
        <SettingsRow label="Active Sessions" description="View and revoke access on other devices.">
          <button className="text-xs text-[var(--accent)] hover:opacity-80 font-medium flex items-center gap-1 transition-colors">
            Manage <ChevronRight className="w-3 h-3" />
          </button>
        </SettingsRow>
        <SettingsRow label="Change Password" description="Update your current password.">
          <button className="text-xs text-[var(--accent)] hover:opacity-80 font-medium flex items-center gap-1 transition-colors">
            Update <ChevronRight className="w-3 h-3" />
          </button>
        </SettingsRow>
      </SettingsCard>
    </div>
  );
}

function AppearanceTab() {
  const { theme, setTheme, accentColor, setAccentColor } = useSettingsStore();

  const accents = [
    { color: "#00FFAA", name: "Mint" },
    { color: "#34D399", name: "Emerald" },
    { color: "#60A5FA", name: "Blue" },
    { color: "#3B82F6", name: "Royal" },
    { color: "#818CF8", name: "Indigo" },
    { color: "#A78BFA", name: "Purple" },
    { color: "#D946EF", name: "Fuchsia" },
    { color: "#F472B6", name: "Pink" },
    { color: "#FB7185", name: "Rose" },
    { color: "#F87171", name: "Red" },
    { color: "#FB923C", name: "Orange" },
    { color: "#FBBF24", name: "Amber" },
    { color: "#FACC15", name: "Gold" },
    { color: "#A3E635", name: "Lime" },
    { color: "#2DD4BF", name: "Teal" },
    { color: "#38BDF8", name: "Sky" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Theme & UI</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Customize the look and feel of your workspace.
        </p>
      </div>

      <SettingsCard>
        <div className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-widest mb-4">
          Color Mode
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "dark" as const, label: "Dark", icon: Moon },
            { id: "light" as const, label: "Light", icon: Sun },
            { id: "system" as const, label: "System", icon: Monitor },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setTheme(mode.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                theme === mode.id
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]"
              }`}
            >
              <mode.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{mode.label}</span>
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard>
        <div className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-widest mb-4">
          Accent Color
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {accents.map((a) => (
            <button
              key={a.color}
              onClick={() => setAccentColor(a.color)}
              title={a.name}
              className={`w-8 h-8 rounded-full transition-all duration-200 outline-none ${
                accentColor === a.color
                  ? "ring-2 ring-offset-2 ring-[var(--accent)] ring-offset-transparent scale-110"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: a.color }}
            />
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

function EditorTab() {
  const {
    fontFamily, setFontFamily,
    fontSize, setFontSize,
    tabWidth, setTabWidth,
    lineNumbers, setLineNumbers,
    wordWrap, setWordWrap,
    ligatures, setLigatures
  } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Editor & Typography</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Customize code display, font rendering, and editor behavior.
        </p>
      </div>

      <SettingsCard>
        <SettingsRow label="Font Family" description="Monospace font used for code blocks and logs.">
          <Select
            value={fontFamily}
            onChange={setFontFamily}
            options={[
              { value: "jetbrains-mono", label: "JetBrains Mono" },
              { value: "fira-code", label: "Fira Code" },
              { value: "source-code-pro", label: "Source Code Pro" },
              { value: "cascadia-code", label: "Cascadia Code" },
              { value: "ibm-plex-mono", label: "IBM Plex Mono" },
            ]}
          />
        </SettingsRow>
        <SettingsRow label="Font Size" description="Base font size in pixels.">
          <Select
            value={fontSize}
            onChange={setFontSize}
            options={[
              { value: "12", label: "12px" },
              { value: "13", label: "13px" },
              { value: "14", label: "14px" },
              { value: "15", label: "15px" },
              { value: "16", label: "16px" },
              { value: "18", label: "18px" },
            ]}
          />
        </SettingsRow>
        <SettingsRow label="Tab Width" description="Number of spaces per tab stop.">
          <Select
            value={tabWidth}
            onChange={setTabWidth}
            options={[
              { value: "2", label: "2 spaces" },
              { value: "4", label: "4 spaces" },
              { value: "8", label: "8 spaces" },
            ]}
          />
        </SettingsRow>
        <SettingsRow label="Line Numbers" description="Show line numbers in code blocks.">
          <Toggle enabled={lineNumbers} onToggle={() => setLineNumbers(!lineNumbers)} />
        </SettingsRow>
        <SettingsRow label="Word Wrap" description="Wrap long lines instead of horizontal scrolling.">
          <Toggle enabled={wordWrap} onToggle={() => setWordWrap(!wordWrap)} />
        </SettingsRow>
        <SettingsRow label="Font Ligatures" description="Enable programming ligatures (e.g., =>, !==).">
          <Toggle enabled={ligatures} onToggle={() => setLigatures(!ligatures)} />
        </SettingsRow>
      </SettingsCard>

      {/* Live Preview applying the global CSS variables set by SettingsProvider */}
      <SettingsCard>
        <div className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-widest mb-4">
          Preview
        </div>
        <pre
          className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto"
          style={{
            fontFamily: "var(--editor-font)",
            fontSize: "var(--editor-font-size)",
            fontVariantLigatures: "var(--editor-ligatures)",
            whiteSpace: wordWrap ? "break-spaces" : "pre"
          }}
        >
          <code className="text-[var(--text-secondary)]">
            {lineNumbers && <span className="text-[#3f3f46] mr-4 inline-block select-none">1</span>}
            <span className="text-[#60A5FA]">const</span>{" "}
            <span className="text-[var(--text-primary)]">commit</span>{" "}
            <span className="text-[var(--accent)]">=</span>{" "}
            <span className="text-[var(--accent)]">{`{`}</span>
            {"\n"}
            {lineNumbers && <span className="text-[#3f3f46] mr-4 inline-block select-none">2</span>}
            {" ".repeat(parseInt(tabWidth))}
            <span className="text-[var(--text-primary)]">streak</span>
            <span className="text-[var(--accent)]">:</span>{" "}
            <span className="text-[#FB923C]">12</span>
            <span className="text-[var(--text-secondary)]">,</span>
            {"\n"}
            {lineNumbers && <span className="text-[#3f3f46] mr-4 inline-block select-none">3</span>}
            {" ".repeat(parseInt(tabWidth))}
            <span className="text-[var(--text-primary)]">mastered</span>
            <span className="text-[var(--accent)]">:</span>{" "}
            <span className="text-[#60A5FA]">true</span>
            {"\n"}
            {lineNumbers && <span className="text-[#3f3f46] mr-4 inline-block select-none">4</span>}
            <span className="text-[var(--accent)]">{`}`}</span>
            <span className="text-[var(--accent)]">;</span>
          </code>
        </pre>
      </SettingsCard>
    </div>
  );
}

function AITab() {
  const { aiEnabled, setAiEnabled, autoSuggest, setAutoSuggest, aiModel, setAiModel } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">AI Features</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Configure the Google Gemini integration and AI-powered features.
        </p>
      </div>

      <SettingsCard>
        <SettingsRow label="AI Explainer" description="Enable AI-powered code explanations.">
          <Toggle enabled={aiEnabled} onToggle={() => setAiEnabled(!aiEnabled)} />
        </SettingsRow>
        <SettingsRow label="Auto-Suggestions" description="Get contextual suggestions while writing journal entries.">
          <Toggle enabled={autoSuggest} onToggle={() => setAutoSuggest(!autoSuggest)} />
        </SettingsRow>
        <SettingsRow label="Default Model" description="Select which Gemini model to use.">
          <Select
            value={aiModel}
            onChange={setAiModel}
            options={[
              { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash (Fastest)" },
              { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro (Smarts)" },
              { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash (Light)" },
            ]}
          />
        </SettingsRow>
      </SettingsCard>
    </div>
  );
}

function ReposTab() {
  const [repos] = useState([
    { name: "commit-project", org: "JustineSalinas", synced: true, lastSync: "2 hours ago" },
    { name: "portfolio-site", org: "JustineSalinas", synced: false, lastSync: "Never" },
  ]);
  const [syncStates, setSyncStates] = useState<Record<string, boolean>>({
    "commit-project": true,
    "portfolio-site": false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Repository Syncing</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Select which repositories and organizations Commit can read from or write to.
        </p>
      </div>

      <SettingsCard>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-widest">
            Connected Repositories
          </div>
          <button className="text-xs bg-[var(--bg-elevated)] border border-[var(--border-muted)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--accent)] px-3 py-1.5 rounded-lg transition-colors font-medium">
            + Add Repository
          </button>
        </div>

        {repos.map((repo) => (
          <div
            key={repo.name}
            className="flex items-center justify-between py-4 border-b border-[var(--border)] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-[var(--text-secondary)]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">
                  {repo.org}/{repo.name}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  Last synced: {repo.lastSync}
                </div>
              </div>
            </div>
            <Toggle
              enabled={syncStates[repo.name]}
              onToggle={() =>
                setSyncStates((prev) => ({
                  ...prev,
                  [repo.name]: !prev[repo.name],
                }))
              }
            />
          </div>
        ))}
      </SettingsCard>
    </div>
  );
}

/* ─── Main Settings Page ─── */

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return <ProfileTab />;
      case "security": return <SecurityTab />;
      case "appearance": return <AppearanceTab />;
      case "editor": return <EditorTab />;
      case "ai": return <AITab />;
      case "repos": return <ReposTab />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          Manage your account, workspace, and application preferences.
        </p>
      </div>

      <div className="h-px bg-[var(--border)] w-full" />

      <div className="flex flex-col lg:flex-row gap-8">
        <nav className="lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[var(--accent)]/10 text-[var(--accent)] shadow-[inset_2px_0_0_0_var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <div className="hidden lg:block">
                  <div className="text-sm font-medium">{tab.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{tab.description}</div>
                </div>
                <span className="lg:hidden text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 min-w-0">{renderTabContent()}</div>
      </div>
    </div>
  );
}
