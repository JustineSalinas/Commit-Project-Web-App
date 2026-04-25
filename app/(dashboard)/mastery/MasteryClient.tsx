"use client";

import { Target, TrendingUp, Plus, Trash2, Loader2, Info } from "lucide-react";
import { useState } from "react";
import { addSkill, updateSkillLevel, deleteSkill } from "@/app/actions/crud";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LEVEL_MAP: Record<number, { percent: number; label: string; desc: string }> = {
  1: { percent: 25, label: "Heard of It", desc: "I have encountered this concept." },
  2: { percent: 50, label: "Can Explain It", desc: "I can describe what it does in plain language." },
  3: { percent: 75, label: "Can Use It", desc: "I can apply it in code with some reference." },
  4: { percent: 100, label: "Can Teach It", desc: "I can explain and implement it from memory." }
};

export default function MasteryClient({ initialSkills }: { initialSkills: any[] }) {
  const router = useRouter();
  const [skills, setSkills] = useState(initialSkills);
  const [newConcept, setNewConcept] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConcept.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const res = await addSkill({ concept: newConcept.trim(), level: 1 });
      if (res.success) {
        toast.success("Concept added");
        setNewConcept("");
        router.refresh();
      } else {
        toast.error("Failed to add concept");
      }
    } catch (err) {
      toast.error("Error adding concept");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: number, level: number) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, level } : s));
    const res = await updateSkillLevel(id, level);
    if (!res.success) {
      toast.error("Failed to update level");
      router.refresh();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this concept?")) return;
    setSkills(prev => prev.filter(s => s.id !== id));
    const res = await deleteSkill(id);
    if (!res.success) {
      toast.error("Failed to delete");
      router.refresh();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <TrendingUp className="w-5 h-5 text-[var(--text-secondary)]" /> Current Proficiencies
          </h2>
        </div>
        
        <form onSubmit={handleAdd} className="mb-6 flex gap-2">
          <input 
            type="text" 
            value={newConcept}
            onChange={(e) => setNewConcept(e.target.value)}
            placeholder="Add new concept (e.g. Next.js App Router)"
            className="flex-1 bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:border-[var(--accent)] outline-none text-[var(--text-primary)]"
          />
          <button 
            type="submit" 
            disabled={!newConcept.trim() || isSubmitting}
            className="bg-[var(--accent)] text-black px-4 py-2 rounded-md text-sm font-bold disabled:opacity-50 hover:brightness-110 transition-colors"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
          </button>
        </form>

        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {skills.length === 0 ? (
            <div className="text-center text-[var(--text-secondary)] text-sm py-4">No concepts added yet.</div>
          ) : skills.map((s) => {
            const currentLvl = LEVEL_MAP[s.level] || LEVEL_MAP[1];
            return (
              <div key={s.id} className="group relative bg-[var(--bg-base)] p-4 rounded-lg border border-[var(--border)]">
                <button 
                  onClick={() => handleDelete(s.id)}
                  className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                
                <div className="flex justify-between items-end text-sm mb-3 pr-6">
                  <span className="font-bold text-[var(--text-primary)]">{s.concept}</span>
                  <span className="text-[var(--text-secondary)] font-medium text-xs">{currentLvl.label} ({currentLvl.percent}%)</span>
                </div>
                
                <div className="w-full h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border)] mb-4">
                  <div 
                    className="h-full bg-[var(--accent)] transition-all duration-1000" 
                    style={{ width: \`\${currentLvl.percent}%\` }}
                  />
                </div>
                
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => handleUpdate(s.id, lvl)}
                      title={LEVEL_MAP[lvl].desc}
                      className={cn(
                        "flex-1 text-[10px] font-bold py-1.5 rounded transition-colors uppercase tracking-wider",
                        s.level === lvl 
                          ? "bg-[var(--accent)] text-black" 
                          : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      Lvl {lvl}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] border-dashed border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
        <Target className="w-12 h-12 text-[var(--text-secondary)] mb-4" />
        <h3 className="font-bold text-lg text-[var(--text-primary)]">Radar Chart Visualization</h3>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-sm">
          Future improvement: A comprehensive spider/radar chart will appear here to map your full skill area distribution based on your mastery levels.
        </p>
      </div>
    </div>
  );
}
