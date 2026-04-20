"use client";

import { useState } from "react";
import { UserProfile, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
  { id: "ai" as const, label: "AI Features", icon: Bot, description: "Claude model, prompts, usage" },
  { id: "repos" as const, label: "Repositories", icon: GitBranch, description: "Repo syncing & access" },
];

/* ─── Reusable Components ─── */

function SettingsCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#111113] border border-[#1A1A1F] rounded-xl p-6 ${className}`}>
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
    <div className="flex items-center justify-between py-4 border-b border-[#1A1A1F] last:border-b-0">
      <div className="space-y-0.5">
        <div className="text-sm font-medium text-[#FAFAFA]">{label}</div>
        {description && <div className="text-xs text-[#71717A]">{description}</div>}
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
        enabled ? "bg-[#00FFAA]" : "bg-[#27272A]"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[#09090B] rounded-full transition-transform duration-200 ${
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
      className="bg-[#18181B] border border-[#27272A] text-[#FAFAFA] text-sm rounded-lg px-3 py-1.5 focus:border-[#00FFAA] focus:outline-none focus:ring-1 focus:ring-[#00FFAA]/20 transition-colors cursor-pointer"
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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#FAFAFA]">Profile Management</h2>
        <p className="text-sm text-[#71717A] mt-1">
          Update your avatar, display name, and primary email address.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden border border-[#1A1A1F]">
        <UserProfile
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: "#111113",
              colorInputBackground: "#18181B",
              colorInputText: "#FAFAFA",
              colorText: "#FAFAFA",
              colorTextSecondary: "#A1A1AA",
              colorPrimary: "#00FFAA",
              colorDanger: "#FF4757",
              borderRadius: "0.5rem",
              fontFamily: "inherit",
            },
            elements: {
              card: "shadow-none bg-[#111113]",
              navbar: "hidden",
              navbarMobileMenuButton: "hidden",
              headerTitle: "text-[#FAFAFA]",
              headerSubtitle: "text-[#71717A]",
              pageScrollBox: "bg-[#111113] p-0",
              formButtonPrimary:
                "bg-[#00FFAA] text-black font-semibold hover:bg-[#00E599] transition-colors",
              formFieldInput:
                "bg-[#18181B] border-[#27272A] text-[#FAFAFA] focus:border-[#00FFAA]",
              profileSectionPrimaryButton: "text-[#00FFAA] hover:text-[#00E599]",
              badge: "bg-[#00FFAA]/10 text-[#00FFAA] border border-[#00FFAA]/20",
              avatarBox: "ring-2 ring-[#1A1A1F]",
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
        <h2 className="text-lg font-semibold text-[#FAFAFA]">Authentication & Security</h2>
        <p className="text-sm text-[#71717A] mt-1">
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
          <button className="text-xs text-[#00FFAA] hover:text-[#00E599] font-medium flex items-center gap-1 transition-colors">
            Manage <ChevronRight className="w-3 h-3" />
          </button>
        </SettingsRow>
        <SettingsRow label="Change Password" description="Update your current password.">
          <button className="text-xs text-[#00FFAA] hover:text-[#00E599] font-medium flex items-center gap-1 transition-colors">
            Update <ChevronRight className="w-3 h-3" />
          </button>
        </SettingsRow>
      </SettingsCard>
    </div>
  );
}

function AppearanceTab() {
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("#00FFAA");

  const accents = [
    { color: "#00FFAA", name: "Mint" },
    { color: "#60A5FA", name: "Blue" },
    { color: "#A78BFA", name: "Purple" },
    { color: "#FB923C", name: "Orange" },
    { color: "#F472B6", name: "Pink" },
    { color: "#FACC15", name: "Gold" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#FAFAFA]">Theme & UI</h2>
        <p className="text-sm text-[#71717A] mt-1">
          Customize the look and feel of your workspace.
        </p>
      </div>

      <SettingsCard>
        <div className="text-xs text-[#71717A] uppercase font-bold tracking-widest mb-4">
          Color Mode
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "dark", label: "Dark", icon: Moon },
            { id: "light", label: "Light", icon: Sun },
            { id: "system", label: "System", icon: Monitor },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setTheme(mode.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                theme === mode.id
                  ? "border-[#00FFAA] bg-[#00FFAA]/5 text-[#00FFAA]"
                  : "border-[#27272A] bg-[#18181B] text-[#71717A] hover:border-[#3f3f46] hover:text-[#A1A1AA]"
              }`}
            >
              <mode.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{mode.label}</span>
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard>
        <div className="text-xs text-[#71717A] uppercase font-bold tracking-widest mb-4">
          Accent Color
        </div>
        <div className="flex items-center gap-3">
          {accents.map((a) => (
            <button
              key={a.color}
              onClick={() => setAccent(a.color)}
              title={a.name}
              className={`w-8 h-8 rounded-full transition-all duration-200 ${
                accent === a.color
                  ? "ring-2 ring-offset-2 ring-offset-[#111113] scale-110"
                  : "hover:scale-105"
              }`}
              style={{
                backgroundColor: a.color,
                "--tw-ring-color": accent === a.color ? a.color : undefined,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

function EditorTab() {
  const [fontFamily, setFontFamily] = useState("jetbrains-mono");
  const [fontSize, setFontSize] = useState("14");
  const [tabWidth, setTabWidth] = useState("2");
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);
  const [ligatures, setLigatures] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#FAFAFA]">Editor & Typography</h2>
        <p className="text-sm text-[#71717A] mt-1">
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

      {/* Live Preview */}
      <SettingsCard>
        <div className="text-xs text-[#71717A] uppercase font-bold tracking-widest mb-4">
          Preview
        </div>
        <pre
          className="bg-[#09090B] border border-[#1A1A1F] rounded-lg p-4 overflow-x-auto"
          style={{
            fontFamily:
              fontFamily === "jetbrains-mono"
                ? "'JetBrains Mono', monospace"
                : fontFamily === "fira-code"
                ? "'Fira Code', monospace"
                : fontFamily === "cascadia-code"
                ? "'Cascadia Code', monospace"
                : fontFamily === "ibm-plex-mono"
                ? "'IBM Plex Mono', monospace"
                : "'Source Code Pro', monospace",
            fontSize: `${fontSize}px`,
            tabSize: parseInt(tabWidth),
            fontVariantLigatures: ligatures ? "normal" : "none",
          }}
        >
          <code className="text-[#A1A1AA]">
            <span className="text-[#60A5FA]">const</span>{" "}
            <span className="text-[#FAFAFA]">commit</span>{" "}
            <span className="text-[#71717A]">=</span>{" "}
            <span className="text-[#00FFAA]">{`{`}</span>
            {"\n"}
            {"  "}
            <span className="text-[#FAFAFA]">streak</span>
            <span className="text-[#71717A]">:</span>{" "}
            <span className="text-[#FB923C]">12</span>
            <span className="text-[#71717A]">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#FAFAFA]">focus</span>
            <span className="text-[#71717A]">:</span>{" "}
            <span className="text-[#00FFAA]">{`"deep work"`}</span>
            <span className="text-[#71717A]">,</span>
            {"\n"}
            {"  "}
            <span className="text-[#FAFAFA]">mastered</span>
            <span className="text-[#71717A]">:</span>{" "}
            <span className="text-[#60A5FA]">true</span>
            {"\n"}
            <span className="text-[#00FFAA]">{`}`}</span>
            <span className="text-[#71717A]">;</span>
          </code>
        </pre>
      </SettingsCard>
    </div>
  );
}

function AITab() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [model, setModel] = useState("claude-sonnet-4");
  const [maxTokens, setMaxTokens] = useState("4096");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#FAFAFA]">AI Features</h2>
        <p className="text-sm text-[#71717A] mt-1">
          Configure the Anthropic Claude integration and AI-powered features.
        </p>
      </div>

      <SettingsCard>
        <SettingsRow label="AI Explainer" description="Enable AI-powered code explanations and learning assistance.">
          <Toggle enabled={aiEnabled} onToggle={() => setAiEnabled(!aiEnabled)} />
        </SettingsRow>
        <SettingsRow label="Auto-Suggestions" description="Get contextual suggestions while writing journal entries.">
          <Toggle enabled={autoSuggest} onToggle={() => setAutoSuggest(!autoSuggest)} />
        </SettingsRow>
        <SettingsRow label="Default Model" description="Select which Claude model to use.">
          <Select
            value={model}
            onChange={setModel}
            options={[
              { value: "claude-sonnet-4", label: "Claude Sonnet 4" },
              { value: "claude-haiku-3.5", label: "Claude Haiku 3.5" },
              { value: "claude-opus-4", label: "Claude Opus 4" },
            ]}
          />
        </SettingsRow>
        <SettingsRow label="Max Response Tokens" description="Maximum tokens per AI response.">
          <Select
            value={maxTokens}
            onChange={setMaxTokens}
            options={[
              { value: "1024", label: "1,024" },
              { value: "2048", label: "2,048" },
              { value: "4096", label: "4,096" },
              { value: "8192", label: "8,192" },
            ]}
          />
        </SettingsRow>
      </SettingsCard>

      {/* Token Usage */}
      <SettingsCard>
        <div className="text-xs text-[#71717A] uppercase font-bold tracking-widest mb-4">
          Usage This Month
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#A1A1AA]">API Calls</span>
              <span className="text-[#FAFAFA] font-medium">0 / 1,000</span>
            </div>
            <div className="h-2 w-full bg-[#18181B] rounded-full overflow-hidden">
              <div className="h-full bg-[#00FFAA] rounded-full transition-all" style={{ width: "0%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#A1A1AA]">Tokens Used</span>
              <span className="text-[#FAFAFA] font-medium">0 / 500K</span>
            </div>
            <div className="h-2 w-full bg-[#18181B] rounded-full overflow-hidden">
              <div className="h-full bg-[#60A5FA] rounded-full transition-all" style={{ width: "0%" }} />
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* Prompt Templates */}
      <SettingsCard>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[#71717A] uppercase font-bold tracking-widest">
            System Prompt
          </div>
          <button className="text-xs text-[#00FFAA] hover:text-[#00E599] font-medium flex items-center gap-1 transition-colors">
            <Sparkles className="w-3 h-3" /> Reset to Default
          </button>
        </div>
        <textarea
          rows={4}
          defaultValue="You are a helpful coding tutor. Explain concepts clearly with practical examples. Focus on building intuition rather than memorization."
          className="w-full bg-[#18181B] border border-[#27272A] rounded-lg p-3 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:border-[#00FFAA] focus:outline-none focus:ring-1 focus:ring-[#00FFAA]/20 resize-none transition-colors font-mono"
        />
      </SettingsCard>
    </div>
  );
}

function ReposTab() {
  const [repos] = useState([
    { name: "commit-project", org: "JustineSalinas", synced: true, lastSync: "2 hours ago" },
    { name: "portfolio-site", org: "JustineSalinas", synced: false, lastSync: "Never" },
    { name: "api-playground", org: "JustineSalinas", synced: false, lastSync: "Never" },
  ]);
  const [syncStates, setSyncStates] = useState<Record<string, boolean>>({
    "commit-project": true,
    "portfolio-site": false,
    "api-playground": false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#FAFAFA]">Repository Syncing</h2>
        <p className="text-sm text-[#71717A] mt-1">
          Select which repositories and organizations Commit can read from or write to.
        </p>
      </div>

      <SettingsCard>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[#71717A] uppercase font-bold tracking-widest">
            Connected Repositories
          </div>
          <button className="text-xs bg-[#18181B] border border-[#27272A] hover:border-[#00FFAA] text-[#A1A1AA] hover:text-[#00FFAA] px-3 py-1.5 rounded-lg transition-colors font-medium">
            + Add Repository
          </button>
        </div>

        {repos.map((repo) => (
          <div
            key={repo.name}
            className="flex items-center justify-between py-4 border-b border-[#1A1A1F] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-[#71717A]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#FAFAFA]">
                  {repo.org}/{repo.name}
                </div>
                <div className="text-xs text-[#71717A]">
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

      <SettingsCard>
        <SettingsRow label="Auto-sync on Push" description="Automatically sync when you push to a connected repository.">
          <Toggle enabled={true} onToggle={() => {}} />
        </SettingsRow>
        <SettingsRow label="Read-only Mode" description="Prevent Commit from writing to your repositories.">
          <Toggle enabled={false} onToggle={() => {}} />
        </SettingsRow>
      </SettingsCard>
    </div>
  );
}

/* ─── Main Settings Page ─── */

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const { user } = useUser();

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "security":
        return <SecurityTab />;
      case "appearance":
        return <AppearanceTab />;
      case "editor":
        return <EditorTab />;
      case "ai":
        return <AITab />;
      case "repos":
        return <ReposTab />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#FAFAFA]">Settings</h1>
        <p className="text-[#71717A] text-sm mt-1">
          Manage your account, workspace, and application preferences.
        </p>
      </div>

      <div className="h-px bg-[#1A1A1F] w-full" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar navigation */}
        <nav className="lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#00FFAA]/10 text-[#00FFAA] border border-[#00FFAA]/20"
                    : "text-[#A1A1AA] hover:bg-[#111113] hover:text-[#FAFAFA] border border-transparent"
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <div className="hidden lg:block">
                  <div className="text-sm font-medium">{tab.label}</div>
                  <div className="text-xs text-[#71717A] mt-0.5">{tab.description}</div>
                </div>
                <span className="lg:hidden text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tab content */}
        <div className="flex-1 min-w-0">{renderTabContent()}</div>
      </div>
    </div>
  );
}
