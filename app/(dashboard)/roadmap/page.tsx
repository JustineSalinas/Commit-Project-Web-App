"use client";

import { Map, Plus, CheckCircle, Circle, ArrowRight } from "lucide-react";

export default function RoadmapPage() {
  const milestones = [
    { id: 1, title: "Next.js Authentication", description: "Implement Clerk split-screen design", status: "complete" },
    { id: 2, title: "Global State Management", description: "Zustand settings syncing to CSS variables", status: "complete" },
    { id: 3, title: "Scaffold Core Features", description: "Build out functional UI for 11 sub-apps", status: "in-progress" },
    { id: 4, title: "Drizzle ORM Integration", description: "Connect all local states to Supabase", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Map className="w-6 h-6 text-[var(--accent)]" />
            Learning Roadmap
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Track your macro project milestones and course paths.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" /> Add Milestone
        </button>
      </header>

      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 relative">
        <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-[var(--border)]" />
        
        <div className="space-y-8 relative z-10">
          {milestones.map((m) => (
            <div key={m.id} className="flex gap-6">
              <div className={`mt-1 bg-[var(--bg-base)] rounded-full p-1 border-2 ${
                m.status === "complete" ? "border-[var(--accent)] text-[var(--accent)]" : 
                m.status === "in-progress" ? "border-blue-500 text-blue-500" : "border-[var(--text-secondary)] text-[var(--text-secondary)]"
              }`}>
                {m.status === "complete" ? <CheckCircle className="w-5 h-5" /> : 
                 m.status === "in-progress" ? <ArrowRight className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </div>
              <div className={`flex-1 bg-[var(--bg-surface)] border ${
                m.status === "in-progress" ? "border-blue-500/50" : "border-[var(--border)]"
              } rounded-xl p-5 hover:border-[var(--accent)] transition-colors cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-lg ${m.status === "complete" ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                    {m.title}
                  </h3>
                  <span className="text-xs font-mono px-2 py-1 bg-[var(--bg-base)] border border-[var(--border)] rounded-md text-[var(--text-secondary)]">
                    {m.status.toUpperCase()}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${m.status === "complete" ? "text-opacity-50 text-[var(--text-secondary)]" : "text-[var(--text-secondary)]"}`}>
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
