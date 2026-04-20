"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  const userName = user?.fullName || user?.username || user?.firstName || "Developer";

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Welcome back, {isLoaded ? <TypewriterEffect text={`${userName}!`} /> : <span className="opacity-0">Loading</span>}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1 text-sm">Here's your learning progress today.</p>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Focus Time */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">Focus Time Today</h3>
          <p className="text-2xl font-bold text-[var(--text-primary)]">2h 30m</p>
        </div>
        
        {/* Flashcards */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">Flashcards Due</h3>
            <p className="text-2xl font-bold text-[var(--text-primary)]">14</p>
          </div>
          <Link href="/flashcards" className="text-sm text-[var(--accent)] hover:underline mt-2 font-medium inline-block">
            Jump to review &rarr;
          </Link>
        </div>

        {/* Streak */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">Current Streak</h3>
          <p className="text-2xl font-bold text-[var(--text-primary)]">12 Days</p>
        </div>
      </div>

      {/* Mini Heatmap Strip (Last 3 Months roughly 13 weeks) */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-6 overflow-hidden">
        <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-4">Last 3 Months Activity</h3>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {Array.from({ length: 13 }).map((_, w_idx) => (
            <div key={w_idx} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((__, d_idx) => {
                const r = Math.random();
                let colorClass = "bg-[var(--bg-elevated)]";
                if (r > 0.8) colorClass = "bg-[var(--accent)]";
                else if (r > 0.6) colorClass = "bg-[var(--accent)]/70";
                else if (r > 0.4) colorClass = "bg-[var(--accent)]/40";
                else if (r > 0.2) colorClass = "bg-[var(--accent)]/20";

                return (
                  <div 
                    key={d_idx} 
                    className={`w-4 h-4 rounded-sm ${colorClass} hover:ring-1 hover:ring-black/20 dark:hover:ring-white/20 cursor-pointer transition-all`}
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
