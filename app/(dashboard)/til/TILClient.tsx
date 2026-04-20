"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, Plus, Tag } from "lucide-react";
import { addTil } from "@/app/actions/crud";

export default function TILClient({ initialTils }: { initialTils: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSaving(true);
    setError("");
    
    const result = await addTil({ 
      title, 
      content, 
      tags: tags.split(",").map(t => t.trim()).filter(Boolean) 
    });
    
    setSaving(false);
    if (result.success) {
      setIsModalOpen(false);
      setTitle("");
      setContent("");
      setTags("");
      router.refresh();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  return (
    <div className="space-y-6 relative">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Lightbulb className="w-6 h-6 text-[var(--accent)]" />
            Today I Learned (TIL)
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Short, actionable micro-learnings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Log a TIL
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Log New Learning</h2>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-md mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Title</label>
                <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="What did you learn?" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none h-24 resize-none" placeholder="Explain it briefly..." />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Tags (comma separated)</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="react, state, typescript" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button type="button" onClick={() => { setIsModalOpen(false); setError(""); }} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[var(--accent)] text-black rounded-lg font-bold hover:brightness-110 disabled:opacity-50">{saving ? "Saving..." : "Save Record"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {initialTils.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-12 border border-dashed border-[var(--border)] rounded-xl">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>You haven&apos;t logged any TILs yet. Start documenting your journey!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialTils.map((t) => (
            <div key={t.id} className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] transition-all cursor-pointer shadow-sm relative group flex flex-col min-h-[180px]">
              <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-1">{t.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3">{t.content}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2 truncate">
                  {(t.tags || []).slice(0, 3).map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] uppercase tracking-widest bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full whitespace-nowrap">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] flex-shrink-0 ml-2">
                  {new Date(t.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
