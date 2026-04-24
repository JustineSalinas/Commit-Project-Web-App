"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Timer, 
  BookOpen, 
  Map, 
  Layers, 
  Lightbulb, 
  Bug, 
  Target, 
  Code2, 
  Activity, 
  Bot,
  Settings,
  User,
  Layout
} from "lucide-react";
import { usePomodoroStore } from "@/lib/zustand/pomodoroStore";

const navGroups = [
  {
    label: "General",
    items: [
      { name: "Dashboard", href: "/", icon: Home },
      { name: "Activity", href: "/heatmap", icon: Activity },
    ]
  },
  {
    label: "Productivity",
    items: [
      { name: "Focus", href: "/focus", icon: Timer },
      { name: "Tasks", href: "/tasks", icon: Layout },
      { name: "Roadmap", href: "/roadmap", icon: Map },
      { name: "Mastery", href: "/mastery", icon: Target },
    ]
  },
  {
    label: "Resources",
    items: [
      { name: "Journal", href: "/journal", icon: BookOpen },
      { name: "Flashcards", href: "/flashcards", icon: Layers },
      { name: "TIL", href: "/til", icon: Lightbulb },
      { name: "AI Explainer", href: "/ai", icon: Bot },
    ]
  },
  {
    label: "Development",
    items: [
      { name: "Snippets", href: "/snippets", icon: Code2 },
      { name: "Bugs", href: "/bugs", icon: Bug },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--bg-base)] h-screen flex flex-col hidden md:flex border-r border-[var(--border)]">
      <div className="px-7 py-4 border-t border-[var(--border)] bg-[var(--bg-base)]">
        <h1 className="text-[var(--accent)] text-xl font-bold tracking-wider">COMMIT<span className="animate-blink">_</span></h1>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto bg-transparent w-full custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={group.label} className="space-y-1">
            <h3 className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2 opacity-50">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group border
                    ${pathname === item.href 
                      ? "bg-[var(--accent)]/10 text-[var(--accent)] font-bold border-[var(--accent)]/10 shadow-sm" 
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] hover:translate-x-1 border-transparent"
                    }`}
                >
                  <item.icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${pathname === item.href ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--accent)]"}`} />
                  <span className="text-[13px]">{item.name}</span>
                </Link>
              ))}
            </div>
            {groupIdx < navGroups.length - 1 && (
              <div className="pt-4 border-b border-[var(--border)]/30 mx-3" />
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 pb-4 border-t border-[var(--border)] bg-[var(--bg-base)] border-r pt-4 w-full flex flex-col gap-1">
        <Link
          href="/profile"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors border
            ${pathname === "/profile" 
              ? "bg-[var(--accent)]/10 text-[var(--accent)] font-bold border-[var(--accent)]/20" 
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] border-transparent"
            }`}
        >
          <User className={`w-5 h-5 ${pathname === "/profile" ? "text-[var(--accent)]" : "text-[var(--text-secondary)] group-hover:text-[var(--accent)]"}`} />
          <span className="text-sm">Profile</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors border
            ${pathname === "/settings" 
              ? "bg-[var(--accent)]/10 text-[var(--accent)] font-bold border-[var(--accent)]/20" 
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] border-transparent"
            }`}
        >
          <Settings className={`w-5 h-5 ${pathname === "/settings" ? "text-[var(--accent)]" : "text-[var(--text-secondary)] group-hover:text-[var(--accent)]"}`} />
          <span className="text-sm">Settings</span>
        </Link>
      </div>

      <div className="p-4 border-t border-[var(--border)]">
        <div className="bg-[var(--bg-surface)] rounded-lg p-4 border border-[var(--border)] relative overflow-hidden group">
          <TodayFocusCounter />
        </div>
      </div>
    </aside>
  );
}

function TodayFocusCounter() {
  const { sessionsCompleted } = usePomodoroStore();
  const currentCycle = sessionsCompleted % 4;
  const displayCount = currentCycle === 0 && sessionsCompleted > 0 ? 4 : currentCycle;
  const percentage = (displayCount / 4) * 100;

  return (
    <>
      <div className="text-xs text-[var(--text-secondary)] uppercase font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">Today's Focus</div>
      <div className="text-[var(--text-primary)] text-sm font-medium">{displayCount} / 4 Sessions</div>
      <div className="mt-2 h-1.5 w-full bg-[var(--bg-base)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--accent)] transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </>
  );
}
