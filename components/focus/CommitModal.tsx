"use client";

import { useState } from "react";
import { usePomodoroStore } from "@/lib/zustand/pomodoroStore";
import { createSessionLog, getTasks, updateTask } from "@/app/actions/crud";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export function CommitModal() {
  const router = useRouter();
  const { 
    isCommitModalOpen, 
    setIsCommitModalOpen, 
    activeTaskId, 
    sessionsCompleted, 
    incrementSessionsCompleted,
    setMode,
    setTimeLeft
  } = usePomodoroStore();
  
  const [commitMessage, setCommitMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tasks to know the active task title and update its pomos
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks()
  });

  const activeTask = tasks?.find(t => t.id === activeTaskId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commitMessage.length < 10 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 1. Create SessionLog
      await createSessionLog({
        id: crypto.randomUUID(),
        taskId: activeTaskId || undefined,
        taskTitle: activeTask?.title || "Focus Session",
        commitMessage,
        duration: 1500, // 25 min in seconds
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });

      // 2. Increment actualPomos if a task is active
      if (activeTask) {
        await updateTask(activeTask.id, {
          actualPomos: (activeTask.actualPomos || 0) + 1
        });
      }

      // 3. Advance the timer to break mode
      incrementSessionsCompleted();
      const nextMode = (sessionsCompleted + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      
      const TIMES = {
        focus: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
      };

      setMode(nextMode);
      setTimeLeft(TIMES[nextMode]);
      
      // Close modal
      setCommitMessage("");
      setIsCommitModalOpen(false);
      router.refresh();
      toast.success("Session committed successfully");

    } catch (error) {
      console.error("Failed to commit session", error);
      toast.error("Failed to save session log");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCommitModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl w-full max-w-lg p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Session complete.</h2>
        <p className="text-[var(--text-secondary)] mb-6">What did you build?</p>
        
        {activeTask && (
          <div className="bg-[var(--bg-base)] border border-[var(--border)] rounded-md px-3 py-2 mb-4">
            <span className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider">Active Task</span>
            <div className="text-[var(--text-primary)] text-sm font-medium">{activeTask.title}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            autoFocus
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Document your progress, challenges, or learnings... (min 10 chars)"
            className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] h-32 resize-none transition-colors"
          />
          <div className="flex justify-between items-center pt-4">
            <span className={`text-xs ${commitMessage.length >= 10 ? 'text-[var(--accent)]' : 'text-red-400'}`}>
              {commitMessage.length}/10 chars minimum
            </span>
            <button
              type="submit"
              disabled={commitMessage.length < 10 || isSubmitting}
              className="bg-[var(--accent)] text-black font-bold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Commit Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
