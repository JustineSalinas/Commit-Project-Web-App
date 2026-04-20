"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function TypewriterEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // Reset text if prop changes
    const timer = setInterval(() => {
      setDisplayedText((old) => old + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(timer);
      }
    }, 50); // Typing speed
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const firstName = user?.firstName || "Developer";

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Welcome back, {isLoaded ? <TypewriterEffect text={firstName} /> : <span className="opacity-0">Loading</span>}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1 text-sm">Here's your learning progress today.</p>
        </div>
      </div>
      
      {/* Quick Stats Stub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Focus Time Today", value: "2h 30m" },
          { label: "Flashcards Due", value: "14" },
          { label: "Current Streak", value: "12 Days" }
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-2">{stat.label}</h3>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 h-64 flex items-center justify-center">
        <p className="text-[var(--text-secondary)] text-sm">Activity / Next Milestones Placeholder</p>
      </div>
    </div>
  );
}
