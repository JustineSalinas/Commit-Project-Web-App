"use client";

import { useState } from "react";
import { BookOpen, Search, Filter, Plus, Save } from "lucide-react";

export default function JournalPage() {
  const [entries, setEntries] = useState([
    { id: 1, title: "Refactoring the Auth Flow", content: "Today I moved from local state to a global Zustand store for settings, making the app much more responsive...", date: "Oct 24, 2026" },
    { id: 2, title: "Learning Drizzle ORM", content: "Drizzle seems very lightweight compared to Prisma. I like how close to SQL it is...", date: "Oct 22, 2026" }
  ]);
  const [activeId, setActiveId] = useState(1);
  const activeEntry = entries.find(e => e.id === activeId);

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <BookOpen className="w-6 h-6 text-[var(--accent)]" />
            Developer Journal
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Document your thoughts, hurdles, and daily wins.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" /> New Entry
        </button>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left List */}
        <div className="w-1/3 flex flex-col bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-secondary)]" />
              <input type="text" placeholder="Search entries..." className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md pl-9 pr-3 py-1.5 text-sm focus:border-[var(--accent)] outline-none" />
            </div>
            <button className="p-2 border border-[var(--border)] bg-[var(--bg-base)] rounded-md text-[var(--text-secondary)]">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {entries.map(e => (
              <button 
                key={e.id}
                onClick={() => setActiveId(e.id)}
                className={`w-fulltext-left p-3 rounded-lg border text-left transition-all ${
                  activeId === e.id ? "bg-[var(--accent)]/10 border-[var(--accent)]/30" : "border-transparent hover:bg-[var(--bg-surface)]"
                }`}
              >
                <div className="text-sm font-bold text-[var(--text-primary)] truncate">{e.title}</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 truncate">{e.content}</div>
                <div className="text-[10px] text-[var(--text-secondary)] mt-2">{e.date}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Editor */}
        <div className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <input 
              type="text" 
              value={activeEntry?.title || ""} 
              className="bg-transparent text-lg font-bold text-[var(--text-primary)] outline-none w-full"
              readOnly
            />
            <button className="flex items-center gap-2 text-sm text-[var(--accent)] hover:opacity-80 transition-opacity">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
          <textarea 
            className="flex-1 w-full bg-transparent p-6 outline-none resize-none text-[var(--text-primary)]"
            style={{
              fontFamily: "var(--editor-font)",
              fontSize: "var(--editor-font-size)",
              fontVariantLigatures: "var(--editor-ligatures)"
            }}
            value={activeEntry?.content || ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
