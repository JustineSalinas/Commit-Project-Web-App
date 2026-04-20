"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardStats } from "@/app/actions/crud";
import { Loader2 } from "lucide-react";

function TypewriterEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); 
    
    if (!text) return;

    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, 40); 
    
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState({ focusTime: "0h 0m", cardsDue: 0, streak: "0 Days", heatmap: [] as string[] });
  const [loading, setLoading] = useState(true);

  const userName = user?.fullName || user?.username || user?.firstName || "Developer";

  useEffect(() => {
    async function fetchStats() {
      const data = await getDashboardStats();
      setStats(data);
      setLoading(false);
    }
    if (isLoaded) {
      fetchStats();
    }
  }, [isLoaded]);

  // Heatmap calculation
  const activitySet = new Set(stats.heatmap);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Welcome back, <span className="text-[var(--accent)]">{isLoaded ? <TypewriterEffect text={`${userName}!`} /> : <span className="opacity-0">Loading</span>}</span>
          </h1>
          <p className="text-[var(--text-secondary)] mt-1 text-sm">Here's your learning progress today.</p>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Focus Time */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">Focus Time Today</h3>
          {loading ? <Loader2 className="w-5 h-5 animate-spin text-[var(--text-muted)]" /> : (
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.focusTime}</p>
          )}
        </div>
        
        {/* Flashcards */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">Flashcards Due</h3>
            {loading ? <Loader2 className="w-5 h-5 animate-spin text-[var(--text-muted)]" /> : (
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.cardsDue}</p>
            )}
          </div>
          <Link href="/flashcards" className="text-sm text-[var(--accent)] hover:underline mt-2 font-medium inline-block">
            Jump to review &rarr;
          </Link>
        </div>

        {/* Streak */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">Current Streak</h3>
          {loading ? <Loader2 className="w-5 h-5 animate-spin text-[var(--text-muted)]" /> : (
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.streak}</p>
          )}
        </div>
      </div>

      {/* Mini Heatmap Strip (Last 3 Months roughly 13 weeks) */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-6 overflow-hidden">
        <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-4">Last 3 Months Activity</h3>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {Array.from({ length: 13 }).map((_, w_idx) => (
            <div key={w_idx} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((__, d_idx) => {
                // Calculate date for this cell
                const date = new Date(today);
                const dayOffset = ((12 - w_idx) * 7) + (6 - d_idx);
                date.setDate(today.getDate() - dayOffset);
                
                const isActive = activitySet.has(date.toDateString());
                const colorClass = isActive ? "bg-[var(--accent)]" : "bg-[var(--bg-elevated)]";

                return (
                  <div 
                    key={d_idx} 
                    className={`w-4 h-4 rounded-sm ${colorClass} hover:ring-1 hover:ring-black/20 dark:hover:ring-white/20 cursor-pointer transition-all`}
                    title={date.toDateString()}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
