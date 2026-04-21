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
  Settings
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Focus", href: "/focus", icon: Timer },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Roadmap", href: "/roadmap", icon: Map },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
  { name: "TIL", href: "/til", icon: Lightbulb },
  { name: "Bugs", href: "/bugs", icon: Bug },
  { name: "Mastery", href: "/mastery", icon: Target },
  { name: "Snippets", href: "/snippets", icon: Code2 },
  { name: "Heatmap", href: "/heatmap", icon: Activity },
  { name: "AI Explainer", href: "/ai", icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--bg-base)] h-screen flex flex-col hidden md:flex border-r border-[var(--border)]">
      <div className="px-7 py-4 border-t border-[var(--border)] bg-[var(--bg-base)]">
        <h1 className="text-[var(--accent)] text-xl font-bold tracking-wider">COMMIT</h1>

      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto bg-[var(--bg-base)] border-r border-[var(--border)] w-full">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors 
              ${pathname === item.href 
                ? "bg-[var(--accent)]/10 text-[var(--accent)] font-bold border border-[var(--accent)]/20" 
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)]"
              }`}
          >
            <item.icon className={`w-5 h-5 ${pathname === item.href ? "text-[var(--accent)]" : "text-[var(--text-secondary)] group-hover:text-[var(--accent)]"}`} />
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 pb-4 border-t border-[var(--border)] bg-[var(--bg-base)] border-r pt-4 w-full">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors 
            ${pathname === "/settings" 
              ? "bg-[var(--accent)]/10 text-[var(--accent)] font-bold border border-[var(--accent)]/20" 
              : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)]"
            }`}
        >
          <Settings className={`w-5 h-5 ${pathname === "/settings" ? "text-[var(--accent)]" : "text-[var(--text-secondary)] group-hover:text-[var(--accent)]"}`} />
          <span className="text-sm">Settings</span>
        </Link>
      </div>

      <div className="p-4 border-t border-[var(--border)]">
        <div className="bg-[var(--bg-surface)] rounded-lg p-4 border border-[var(--border)] relative overflow-hidden group">
          <div className="text-xs text-[var(--text-secondary)] uppercase font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">Today's Focus</div>
          <div className="text-[var(--text-primary)] text-sm font-medium">0 / 4 Sessions</div>
          <div className="mt-2 h-1.5 w-full bg-[var(--bg-base)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--accent)] w-[0%]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
