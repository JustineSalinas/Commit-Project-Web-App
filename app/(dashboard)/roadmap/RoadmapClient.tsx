"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Map, Plus, CheckCircle, Circle, ArrowRight, BookOpen, Clock, Lock, Link as LinkIcon, Share2 } from "lucide-react";
import { addRoadmapMilestone, markRoadmapStatus, importRoadmapTemplate } from "@/app/actions/crud";

export default function RoadmapClient({ initialRoadmap, userId }: { initialRoadmap: any[], userId?: string }) {
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
    
    try {
      const order = initialRoadmap.length > 0 ? Math.max(...initialRoadmap.map(m => m.order || 0)) + 1 : 1;
      const result = await addRoadmapMilestone({ title, description, order });
      
      if (result.success) {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        router.refresh();
      } else {
        setError(result.error || "Failed to save");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleApplyTemplate = async (templateId: string) => {
    if (!templateId || saving) return;
    setSaving(true);
    try {
      await importRoadmapTemplate(templateId);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id: number, status: 'pending' | 'in-progress' | 'complete') => {
    const result = await markRoadmapStatus(id, status);
    if (result.success) {
      router.refresh();
    }
  };

  // Sort milestones by order
  const sortedRoadmap = [...initialRoadmap].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-6 relative h-full pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Map className="w-6 h-6 text-[var(--accent)]" />
            Learning Roadmap
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Track your macro project milestones and course paths.</p>
        </div>
        <div className="flex items-center gap-3">
          {userId && (
            <button 
              onClick={() => {
                const url = `${window.location.origin}/shared/roadmap/${userId}`;
                navigator.clipboard.writeText(url);
                alert("Shareable link copied to clipboard!");
              }} 
              className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-lg font-bold transition-all flex-shrink-0"
              title="Copy public roadmap link"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          )}
          <div className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg px-3 py-1.5 overflow-hidden">
            <BookOpen className="w-4 h-4 text-[var(--accent)]" />
            <select 
              disabled={saving}
              onChange={(e) => {
                handleApplyTemplate(e.target.value);
                e.target.value = "";
              }}
              className="bg-transparent text-xs font-bold text-[var(--text-secondary)] outline-none cursor-pointer"
            >
              <option value="">Apply Template...</option>
              <option value="web-dev-beginner">Web Development Beginner</option>
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

      {sortedRoadmap.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-20 border border-dashed border-[var(--border)] rounded-xl mt-8">
          <Map className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No milestones created yet. Select a template or add one!</p>
        </div>
      ) : (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-8 relative mt-8 shadow-sm overflow-hidden">
          {/* Main timeline line */}
          <div className="absolute left-[55px] top-12 bottom-12 w-1 bg-[var(--bg-base)] border-l border-r border-[var(--border)]" />
          
          <div className="space-y-10 relative z-10">
            {sortedRoadmap.map((m, index) => {
              const previousMilestone = index > 0 ? sortedRoadmap[index - 1] : null;
              const isLocked = previousMilestone && previousMilestone.status !== 'complete';
              
              let progressPercent = 0;
              if (m.status === 'complete') progressPercent = 100;
              else if (m.status === 'in-progress') progressPercent = 50;

              return (
                <div key={m.id} className={`flex gap-8 items-start group ${isLocked ? 'opacity-60' : ''}`}>
                  <div className={`mt-1.5 bg-[var(--bg-base)] rounded-full p-2 border-[3px] shadow-sm transition-colors relative z-10 ${
                    m.status === "complete" ? "border-[var(--accent)] text-[var(--accent)] ring-4 ring-[var(--accent)]/10" : 
                    m.status === "in-progress" ? "border-blue-500 text-blue-500 ring-4 ring-blue-500/10" : 
                    isLocked ? "border-[var(--text-secondary)]/50 text-[var(--text-secondary)]/50" : "border-[var(--text-secondary)] text-[var(--text-secondary)]"
                  }`}>
                    {isLocked ? <Lock className="w-5 h-5" /> : 
                     m.status === "complete" ? <CheckCircle className="w-5 h-5" /> : 
                     m.status === "in-progress" ? <ArrowRight className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  
                  <div className={`flex-1 bg-[var(--bg-surface)] border ${
                    m.status === "in-progress" ? "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-[var(--border)]"
                  } rounded-xl p-6 transition-all shadow-sm ${!isLocked && 'group-hover:border-[var(--accent)]/50'} relative overflow-hidden`}>
                    
                    {/* Progress Bar Background */}
                    {progressPercent > 0 && (
                       <div className="absolute top-0 left-0 h-1 bg-[var(--bg-base)] w-full">
                         <div className={`h-full transition-all duration-1000 ease-out ${progressPercent === 100 ? 'bg-[var(--accent)]' : 'bg-blue-500'}`} style={{ width: `${progressPercent}%` }} />
                       </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                      <div>
                        <h3 className={`font-bold text-xl tracking-tight ${m.status === "complete" ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                          {m.title}
                        </h3>
                        {m.linkedConcept && (
                          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-full mt-2">
                            <BookOpen className="w-3.5 h-3.5" /> Concept: {m.linkedConcept}
                          </div>
                        )}
                      </div>
                      
                      {!isLocked && (
                        <div className="flex items-center gap-2 pointer-events-auto sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          {m.status !== 'complete' && (
                            <button onClick={() => handleStatusChange(m.id, 'complete')} className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black px-3 py-1.5 rounded-md font-bold transition-colors cursor-pointer border border-[var(--accent)]/20">
                              Complete
                            </button>
                          )}
                          {m.status === 'pending' && (
                            <button onClick={() => handleStatusChange(m.id, 'in-progress')} className="text-xs bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-md font-bold transition-colors cursor-pointer border border-blue-500/20">
                              Start
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className={`mt-4 text-sm leading-relaxed ${m.status === "complete" ? "text-[var(--text-secondary)]" : "text-[var(--text-secondary)]"}`}>
                      {m.description}
                    </p>

                    {/* Sub-goals */}
                    {m.subGoals && m.subGoals.length > 0 && (
                      <div className="mt-5 space-y-2">
                        {m.subGoals.map((sg: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${sg.completed || m.status === 'complete' ? 'bg-[var(--accent)] border-[var(--accent)] text-black' : 'border-[var(--text-secondary)]'}`}>
                              {(sg.completed || m.status === 'complete') && <CheckCircle className="w-3 h-3" />}
                            </div>
                            <span className={(sg.completed || m.status === 'complete') ? 'line-through opacity-70' : ''}>{sg.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Metadata Footer */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-4 text-xs font-bold text-[var(--text-secondary)] uppercase">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {m.pomosSpent || 0} Pomos
                      </div>
                      {m.linkedJournalId && (
                        <div className="flex items-center gap-1.5 text-blue-400">
                          <LinkIcon className="w-4 h-4" />
                          Code Journal Linked
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
