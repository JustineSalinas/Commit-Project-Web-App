"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { Settings, Bell, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/actions/crud";

export function TopBar() {
  const [streak, setStreak] = useState("0 Days");

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
        setStreak(data.streak);
      } catch (err) {
        console.error("Failed to load streak");
      }
    }
    fetchStats();
  }, []);

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--topbar-bg)] backdrop-blur-sm flex items-center px-6 justify-end sticky top-0 z-10">


      <div className="flex items-center gap-3">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-full px-3 py-1 cursor-default hover:border-[var(--accent)] transition-colors" title="Current Day Streak">
          <Flame className={`w-4 h-4 ${streak === "0 Days" ? "text-[var(--text-muted)]" : "text-orange-500 fill-orange-500/20"}`} />
          <span className="text-[var(--text-primary)] text-sm font-bold">{streak}</span>
        </div>

        {/* Notifications */}
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
        </button>

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
