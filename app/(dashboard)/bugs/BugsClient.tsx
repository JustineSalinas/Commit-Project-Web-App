"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bug, CheckCircle2, CircleDashed } from "lucide-react";
import { addBug, resolveBug } from "@/app/actions/crud";

export default function BugsClient({ initialBugs }: { initialBugs: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    setError("");
    
    const result = await addBug({ title, description });
    
    setSaving(false);
    if (result.success) {
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      router.refresh();
    } else {
      setError(result.error || "Failed to save");
    }
  };

  const handleResolve = async (id: number) => {
    const result = await resolveBug(id);
    if (result.success) {
      router.refresh();
    }
  };

  return (
    <div className="space-y-6 relative">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Bug className="w-6 h-6 text-red-500" />
            Bug Tracker
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Document persistent bugs, their root causes, and solutions.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          Report Bug
        </button>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Report an Issue</h2>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-md mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Bug Title</label>
                <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="e.g. Postgres Connection Dropping" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Description / Stack Trace</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none h-32 resize-none font-mono text-xs" placeholder="Paste error logs here..." />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button type="button" onClick={() => { setIsModalOpen(false); setError(""); }} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:brightness-110 disabled:opacity-50">{saving ? "Saving..." : "Save Bug"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {initialBugs.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-12 border border-dashed border-[var(--border)] rounded-xl">
          <Bug className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No bugs reported. You&apos;re writing perfect code!</p>
        </div>
      ) : (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="flex border-b border-[var(--border)] bg-[var(--bg-surface)]">
            <div className="w-1/2 p-4 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Issue</div>
            <div className="w-1/4 p-4 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Status</div>
            <div className="w-1/4 p-4 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Logged</div>
          </div>
          <div>
            {initialBugs.map((b) => (
              <div key={b.id} className="flex border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-surface)] transition-colors group">
                <div className="w-1/2 p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[var(--text-primary)]">
                    <Bug className={`w-4 h-4 flex-shrink-0 ${b.status === 'resolved' ? 'text-[var(--text-secondary)]' : 'text-red-500'}`} />
                    <span className={b.status === 'resolved' ? 'line-through text-[var(--text-secondary)]' : 'font-medium'}>{b.title}</span>
                  </div>
                  {b.description && <div className="mt-1 ml-7 text-xs text-[var(--text-secondary)] line-clamp-1">{b.description}</div>}
                </div>
                <div className="w-1/4 p-4 flex items-center">
                  {b.status === "resolved" 
                    ? <span className="flex items-center gap-1.5 text-xs text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-1 rounded-md"><CheckCircle2 className="w-3 h-3"/> Resolved</span>
                    : <button onClick={() => handleResolve(b.id)} className="flex items-center gap-1.5 text-xs text-red-500 border border-red-500/30 bg-red-500/10 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition-colors cursor-pointer"><CircleDashed className="w-3 h-3"/> Mark Resolved</button>
                  }
                </div>
                <div className="w-1/4 p-4 flex items-center text-sm text-[var(--text-secondary)]">
                  {new Date(b.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
