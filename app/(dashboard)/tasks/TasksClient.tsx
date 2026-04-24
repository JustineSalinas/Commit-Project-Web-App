"use client";

import { useState } from "react";
import { Plus, Play, CheckCircle, Circle, AlertTriangle, Layout } from "lucide-react";
import { createTask, updateTask } from "@/app/actions/crud";
import { SplitPaneEditor } from "@/components/tasks/SplitPaneEditor";
import { usePomodoroStore } from "@/lib/zustand/pomodoroStore";
import { useRouter } from "next/navigation";

export default function TasksClient({ initialTasks }: { initialTasks: any[] }) {
  const router = useRouter();
  const { activeTaskId, setActiveTaskId } = usePomodoroStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedPomos, setEstimatedPomos] = useState(1);
  const [saving, setSaving] = useState(false);

  const activeTask = initialTasks.find(t => t.id === activeTaskId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || estimatedPomos < 1 || saving) return;
    setSaving(true);
    
    const res = await createTask({ 
      id: crypto.randomUUID(), 
      title, 
      description, 
      estimatedPomos 
    });
    
    setSaving(false);
    if (res.success) {
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      setEstimatedPomos(1);
      router.refresh();
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateTask(id, { status });
    router.refresh();
  };

  const isOverEstimate = (task: any) => task.actualPomos > task.estimatedPomos;

  const renderColumn = (title: string, status: string) => {
    const columnTasks = initialTasks.filter(t => t.status === status);
    
    return (
      <div className="flex-1 min-w-[280px] bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl flex flex-col overflow-hidden max-h-full">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-base)]">
          <h3 className="font-bold text-sm text-[var(--text-secondary)] uppercase tracking-wider flex justify-between items-center">
            {title}
            <span className="bg-[var(--bg-surface)] px-2 py-0.5 rounded-full text-xs">{columnTasks.length}</span>
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {columnTasks.map(task => (
            <div 
              key={task.id}
              onClick={() => setActiveTaskId(task.id)}
              className={`bg-[var(--bg-base)] border p-4 rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${
                activeTaskId === task.id ? 'border-[var(--accent)] shadow-[0_0_10px_rgba(0,255,170,0.1)]' : 'border-[var(--border)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-bold text-[var(--text-primary)] ${task.status === 'done' ? 'line-through opacity-50' : ''}`}>
                  {task.title}
                </h4>
                {isOverEstimate(task) && (
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4">
                {task.description || "No description provided."}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="text-[10px] font-bold tracking-widest uppercase bg-[#18181B] border border-[#27272A] px-2 py-1 rounded text-[#A1A1AA]">
                  {task.actualPomos} / {task.estimatedPomos} Pomos
                </div>
                
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  {task.status === 'todo' && (
                    <button onClick={() => handleStatusChange(task.id, 'in-progress')} className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded" title="Start Task">
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                  {task.status === 'in-progress' && (
                    <button onClick={() => handleStatusChange(task.id, 'done')} className="p-1.5 text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded" title="Mark Done">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
      <header className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Layout className="w-6 h-6 text-[var(--accent)]" />
            Agile Task Board
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Manage your sprint, track estimations, and document context.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Kanban Board - Scrollable horizontally if needed */}
        <div className="w-1/2 flex gap-4 overflow-x-auto overflow-y-hidden pb-2 custom-scrollbar">
          {renderColumn("To Do", "todo")}
          {renderColumn("In Progress", "in-progress")}
          {renderColumn("Done", "done")}
        </div>

        {/* Editor Pane */}
        <div className="w-1/2 h-full">
          {activeTask ? (
            <SplitPaneEditor task={activeTask} />
          ) : (
            <div className="h-full border border-[var(--border)] rounded-xl flex flex-col items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
              <Layout className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a task to start writing notes.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Title</label>
                <input required autoFocus type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" placeholder="Task title..." />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Description (Optional)</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none h-20 resize-none" placeholder="Brief context..." />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-secondary)] uppercase">Estimated Pomodoros</label>
                <input type="number" min="1" value={estimatedPomos} onChange={(e) => setEstimatedPomos(parseInt(e.target.value))} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mt-1 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[var(--accent)] text-black rounded-lg font-bold hover:brightness-110 disabled:opacity-50">{saving ? "Creating..." : "Create Task"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
