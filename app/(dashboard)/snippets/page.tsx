"use client";

import { Code2, Files, Plus, Search } from "lucide-react";

export default function SnippetsPage() {
  const snippets = [
    { title: "Zustand Setup", language: "TypeScript", code: "import { create } from 'zustand';\n\nexport const useStore = create((set) => ({\n  count: 0,\n  inc: () => set((state) => ({ count: state.count + 1 })),\n}));" },
    { title: "Tailwind Keyframes", language: "CSS", code: "@keyframes breathe {\n  0%, 100% { opacity: 0.4; }\n  50% { opacity: 0.7; }\n}\n\n.animate-breathe {\n  animation: breathe 8s infinite;\n}" }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Code2 className="w-6 h-6 text-[var(--accent)]" />
            Code Snippets
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Your personal, searchable library of reusable code.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" /> New Snippet
        </button>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="w-1/3 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl flex flex-col">
          <div className="p-4 border-b border-[var(--border)] relative">
            <Search className="w-4 h-4 absolute left-7 top-6 text-[var(--text-secondary)]" />
            <input type="text" placeholder="Search..." className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md pl-9 pr-3 py-2 text-sm focus:border-[var(--accent)] outline-none text-[var(--text-primary)]" />
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {snippets.map(s => (
              <div key={s.title} className="p-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-surface)] cursor-pointer rounded-md transition-colors">
                <div className="font-bold text-sm text-[var(--text-primary)]">{s.title}</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">{s.language}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[var(--bg-base)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col relative group">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold transition-colors">
              <Files className="w-3 h-3" /> Copy
            </button>
          </div>
          <div className="bg-[var(--bg-elevated)] px-4 py-2 border-b border-[var(--border)] text-xs font-mono text-[var(--text-secondary)]">
            {snippets[0].title}.ts
          </div>
          <pre className="p-6 flex-1 overflow-auto text-sm text-[var(--text-primary)]" style={{ fontFamily: "var(--editor-font)", fontSize: "var(--editor-font-size)", fontVariantLigatures: "var(--editor-ligatures)" }}>
            <code>{snippets[0].code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
