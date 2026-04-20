"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Map, Plus, CheckCircle, Circle, ArrowRight, BookOpen } from "lucide-react";
import { addRoadmapMilestone, markRoadmapStatus } from "@/app/actions/crud";
import { ROADMAP_TEMPLATES } from "@/lib/data/roadmapTemplates";

export default function RoadmapClient({ initialRoadmap }: { initialRoadmap: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || saving) return;
    setSaving(true);
    setError("");
    
    const result = await addRoadmapMilestone({ title, description });
    setSaving(false);
    
    if (result.success) {
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      router.refresh(); // Refresh data from server
    } else {
      setError(result.error || "Failed to save");
    }
  };

  const handleApplyTemplate = async (templateName: string) => {
    const template = ROADMAP_TEMPLATES.find(t => t.name === templateName);
    if (!template || saving) return;
    
    setSaving(true);
    for (const milestone of template.milestones) {
      await addRoadmapMilestone({ 
        title: milestone.title, 
        description: milestone.description 
      });
    }
    setSaving(false);
    router.refresh();
  };

  return (
    <div className="space-y-6 relative h-full">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Map className="w-6 h-6 text-[var(--accent)]" />
            Learning Roadmap
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Track your macro project milestones and course paths.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg px-3 py-1.5 overflow-hidden">
            <BookOpen className="w-4 h-4 text-[var(--accent)]" />
            <select 
              disabled={saving}
              onChange={(e) => handleApplyTemplate(e.target.value)}
              className="bg-transparent text-xs font-bold text-[var(--text-secondary)] outline-none cursor-pointer"
            >
              <option value="">Apply Template...</option>
              {ROADMAP_TEMPLATES.map(t => (
                <option key={t.name} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all flex-shrink-0">
            <Plus className="w-4 h-4" /> Add Milestone
          </button>
        </div>
      </header>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Add Project Milestone</h2>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-md mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Milestone Title</label>
                <input autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="e.g. Build authentication" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Description / Deliverables</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none h-24 resize-none" placeholder="List key sub-tasks here..." />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button type="button" onClick={() => { setIsModalOpen(false); setError(""); }} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[var(--accent)] text-black rounded-lg font-bold hover:brightness-110 disabled:opacity-50">{saving ? "Saving..." : "Save Milestone"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {initialRoadmap.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-20 border border-dashed border-[var(--border)] rounded-xl mt-8">
          <Map className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No milestones created yet. Map out your next big project!</p>
        </div>
      ) : (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-8 relative mt-8 shadow-sm">
          <div className="absolute left-[55px] top-8 bottom-8 w-1 bg-[var(--bg-base)] border-l border-r border-[var(--border)]" />
          
          <div className="space-y-10 relative z-10">
            {initialRoadmap.map((m) => (
              <div key={m.id} className="flex gap-8 items-start group">
                <div className={`mt-1.5 bg-[var(--bg-base)] rounded-full p-2 border-[3px] shadow-sm transition-colors ${
                  m.status === "complete" ? "border-[var(--accent)] text-[var(--accent)] ring-4 ring-[var(--accent)]/10" : 
                  m.status === "in-progress" ? "border-blue-500 text-blue-500 ring-4 ring-blue-500/10" : "border-[var(--text-secondary)] text-[var(--text-secondary)]"
                }`}>
                  {m.status === "complete" ? <CheckCircle className="w-5 h-5" /> : 
                   m.status === "in-progress" ? <ArrowRight className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </div>
                
                <div className={`flex-1 bg-[var(--bg-surface)] border ${
                  m.status === "in-progress" ? "border-blue-500/30" : "border-[var(--border)]"
                } rounded-xl p-6 transition-all shadow-sm group-hover:shadow-md group-hover:border-[var(--accent)]/50 relative overflow-hidden`}>
                  
                  {m.status === "complete" && <div className="absolute inset-0 bg-[var(--bg-base)]/50 pointer-events-none" />}
                  
                  <div className="flex items-center justify-between relative z-10">
                    <h3 className={`font-bold text-xl tracking-tight ${m.status === "complete" ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                      {m.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      {m.status !== 'complete' && (
                        <button onClick={() => handleStatusChange(m.id, 'complete')} className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black px-3 py-1.5 rounded-md font-bold transition-colors cursor-pointer">
                          Complete
                        </button>
                      )}
                      {m.status === 'pending' && (
                         <button onClick={() => handleStatusChange(m.id, 'in-progress')} className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-md font-bold transition-colors cursor-pointer">
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <p className={`mt-3 text-sm leading-relaxed ${m.status === "complete" ? "text-[var(--text-secondary)]" : "text-[var(--text-secondary)]"}`}>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
