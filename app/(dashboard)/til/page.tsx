import { Lightbulb, Plus, Tag } from "lucide-react";

export default function TILPage() {
  const tils = [
    { id: 1, title: "Zustand Persist Middleware", content: "You can automatically sync Zustand state to localStorage using the persist middleware.", tags: ["react", "state"], date: "Today" },
    { id: 2, title: "Drizzle Schema generation", content: "drizzle-kit generate creates SQL migrations automatically from your TypeScript schema definitions.", tags: ["db", "orm"], date: "Yesterday" }
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Lightbulb className="w-6 h-6 text-[var(--accent)]" />
            Today I Learned (TIL)
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Short, actionable micro-learnings.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" /> Log a TIL
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tils.map((t) => (
          <div key={t.id} className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] transition-all cursor-pointer shadow-sm relative group">
            <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">{t.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{t.content}</p>
            <div className="flex items-center justify-between mt-auto absolute bottom-5 left-5 right-5">
              <div className="flex gap-2">
                {t.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] uppercase tracking-widest bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-[var(--text-secondary)]">{t.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
