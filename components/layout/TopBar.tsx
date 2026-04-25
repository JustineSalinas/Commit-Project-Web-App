"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { Settings, Bell, Flame, BrainCircuit, AlertTriangle, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getDashboardStats, getDistractions } from "@/app/actions/crud";

export function TopBar() {
  const [streak, setStreak] = useState("0 Days");
  const [cardsDue, setCardsDue] = useState(0);
  const [distractions, setDistractions] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStreak(data.streak);
        setCardsDue(data.cardsDue || 0);

        const dists = await getDistractions();
        setDistractions(dists.filter(d => !d.resolved));
      } catch (err) {
        console.error("Failed to load topbar stats");
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalNotifications = (cardsDue > 0 ? 1 : 0) + distractions.length;

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--topbar-bg)] backdrop-blur-sm flex items-center px-6 justify-end sticky top-0 z-10">

      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-full px-3 py-1 cursor-default hover:border-[var(--accent)] transition-colors" title="Current Day Streak">
          <Flame className={`w-4 h-4 ${streak === "0 Days" ? "text-[var(--text-muted)]" : "text-orange-500 fill-orange-500/20"}`} />
          <span className="text-[var(--text-primary)] text-sm font-bold">{streak}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all relative ${showNotifications ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"}`}
          >
            <Bell className="w-4 h-4" />
            {totalNotifications > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-3 w-3 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#111113] border border-[#1A1A1F] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-[#1A1A1F]">
                <h3 className="font-bold text-[var(--text-primary)] text-sm">Action Items</h3>
                <span className="bg-[var(--bg-surface)] text-[10px] px-2 py-0.5 rounded text-[var(--text-secondary)]">{totalNotifications} new</span>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {totalNotifications === 0 ? (
                  <div className="px-4 py-8 text-center text-[var(--text-secondary)] text-xs">
                    You're all caught up! No pending actions.
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {cardsDue > 0 && (
                      <Link href="/flashcards" onClick={() => setShowNotifications(false)} className="px-4 py-3 hover:bg-[var(--bg-surface)] border-b border-[#1A1A1F] flex gap-3 items-start transition-colors group">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors">
                          <BrainCircuit className="w-3 h-3 text-[var(--accent)]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--text-primary)]">Flashcards Due</p>
                          <p className="text-xs text-[var(--text-secondary)]">You have {cardsDue} spaced-repetition cards waiting for review.</p>
                        </div>
                      </Link>
                    )}
                    
                    {distractions.map(dist => (
                      <Link key={dist.id} href="/focus" onClick={() => setShowNotifications(false)} className="px-4 py-3 hover:bg-[var(--bg-surface)] border-b border-[#1A1A1F] flex gap-3 items-start transition-colors group last:border-0">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                          <AlertTriangle className="w-3 h-3 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[var(--text-primary)]">Unresolved Distraction</p>
                          <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{dist.content}</p>
                          <p className="text-[9px] text-[var(--text-muted)] mt-1 uppercase tracking-widest">{new Date(dist.timestamp).toLocaleDateString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Settings shortcut button */}
        <Link
          href="/settings"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* Clerk User Profile Button */}
        <UserButton
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: "#111113",
              colorText: "#FAFAFA",
              colorTextSecondary: "#A1A1AA",
              colorPrimary: "#00FFAA",
              colorDanger: "#FF4757",
              borderRadius: "0.5rem",
            },
            elements: {
              avatarBox: "w-8 h-8 ring-2 ring-[#1A1A1F] hover:ring-[#00FFAA]/50 transition-all",
              userButtonPopoverCard: "bg-[#111113] border border-[#1A1A1F] shadow-xl",
              userButtonPopoverActionButton: "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]",
              userButtonPopoverActionButtonText: "text-[#A1A1AA]",
              userButtonPopoverFooter: "hidden",
            },
          }}
          userProfileUrl="/settings"
          userProfileMode="navigation"
        />
      </div>
    </header>
  );
}
