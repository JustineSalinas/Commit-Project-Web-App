"use client";

import { Timer as TimerIcon, AlertCircle, Play, Pause, RotateCcw, Check, RefreshCcw } from "lucide-react";
import { usePomodoro } from "@/lib/hooks/usePomodoro";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getDistractions, createDistraction, resolveDistraction } from "@/app/actions/crud";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function FocusPage() {
  const { mode, timeLeft, isActive, toggleTimer, switchMode, overrideTime } = usePomodoro();
  const [dumpText, setDumpText] = useState("");
  const [dumpSaved, setDumpSaved] = useState(false);
  const [distractions, setDistractions] = useState<any[]>([]);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState("");

  useEffect(() => {
    fetchDistractions();
  }, []);

  const fetchDistractions = async () => {
    const data = await getDistractions();
    setDistractions(data);
  };

  const handleDumpKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!dumpText.trim()) return;
      
      const content = dumpText.trim();
      setDumpText("");
      
      // Optimistic update
      const tempId = crypto.randomUUID();
      setDistractions([{ id: tempId, content, resolved: false, timestamp: new Date() }, ...distractions]);
      
      const res = await createDistraction({ id: crypto.randomUUID(), content });
      if (res.success) {
        setDumpSaved(true);
        setTimeout(() => setDumpSaved(false), 2000);
        fetchDistractions(); // Refresh to get proper ID and order
      }
    }
  };

  const handleResolve = async (id: string) => {
    // Optimistic
    setDistractions(distractions.map(d => d.id === id ? { ...d, resolved: true } : d));
    await resolveDistraction(id);
    fetchDistractions();
  };

  const handleTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTimeInput) return;
    
    const parts = customTimeInput.split(':').map(Number);
    let totalSeconds = 0;
    
    if (parts.length === 3) {
      totalSeconds = (parts[0] * 3600) + (parts[1] * 60) + (parts[2] || 0);
    } else if (parts.length === 2) {
      totalSeconds = (parts[0] * 60) + (parts[1] || 0);
    } else if (parts.length === 1 && !isNaN(parts[0])) {
      totalSeconds = parts[0] * 60;
    }

    if (totalSeconds > 0) {
      overrideTime(totalSeconds);
    }
    
    setIsEditingTime(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <TimerIcon className="w-6 h-6 text-[var(--accent)]" />
          Focus Session
        </h1>
        <p className="text-[var(--text-secondary)] text-sm">Deep work with integrated distraction tracking.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          {/* Mode Switcher */}
          <div className="flex bg-[var(--bg-base)] border border-[var(--border)] p-1 rounded-md mb-8">
            <button
              onClick={() => switchMode('focus')}
              className={cn("px-4 py-2 text-sm font-medium rounded-sm transition-colors", mode === 'focus' ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]")}
            >
              Pomodoro
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={cn("px-4 py-2 text-sm font-medium rounded-sm transition-colors", mode === 'shortBreak' ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]")}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={cn("px-4 py-2 text-sm font-medium rounded-sm transition-colors", mode === 'longBreak' ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]")}
            >
              Long Break
            </button>
          </div>

          {isEditingTime ? (
            <form onSubmit={handleTimeSubmit} className="mb-8">
              <input 
                autoFocus
                type="text"
                value={customTimeInput}
                onChange={(e) => setCustomTimeInput(e.target.value)}
                onBlur={() => setIsEditingTime(false)}
                placeholder="25:00 or 1:00:00"
                className="text-[4rem] md:text-[6rem] font-bold tracking-tighter leading-none bg-transparent text-center border-b-2 border-[var(--accent)] outline-none text-[var(--text-primary)] w-full max-w-[400px]"
              />
              <p className="text-[var(--text-secondary)] text-sm text-center mt-2">Enter MM:SS or HH:MM:SS format</p>
            </form>
          ) : (
            <h2 
              onClick={() => {
                if (!isActive) {
                  setCustomTimeInput(formatTime(timeLeft));
                  setIsEditingTime(true);
                }
              }}
              className={cn(
                "text-[6rem] md:text-[8rem] font-bold tracking-tighter leading-none mb-8 transition-colors cursor-pointer hover:opacity-80", 
                mode === 'focus' ? "text-[var(--text-primary)]" : "text-[#60A5FA]",
                isActive && "cursor-default hover:opacity-100"
              )}
              title={!isActive ? "Click to edit timer duration" : ""}
            >
              {formatTime(timeLeft)}
            </h2>
          )}
          
          <div className="flex gap-4">
            <button 
              onClick={toggleTimer}
              className={cn(
                "font-bold px-8 py-3 rounded-md transition-colors flex items-center gap-2",
                isActive 
                  ? "bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]" 
                  : mode === 'focus' ? "bg-[var(--accent)] text-black hover:brightness-110" : "bg-[#60A5FA] text-black hover:bg-[#3B82F6]"
              )}
            >
              {isActive ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
            </button>
            
            <button 
              onClick={() => switchMode(mode)}
              className="bg-transparent border border-[var(--border)] text-[var(--text-secondary)] font-medium p-3 rounded-md hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-6 flex flex-col max-h-[500px]">
          <div className="flex items-center gap-2 mb-4 text-[var(--text-secondary)] shrink-0">
            <AlertCircle className="w-4 h-4" />
            <h3 className="font-medium text-sm">Distraction Dump</h3>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4 shrink-0">Log passing thoughts without breaking focus.</p>
          <div className="relative shrink-0 mb-4">
            <textarea 
              value={dumpText}
              onChange={(e) => setDumpText(e.target.value)}
              onKeyDown={handleDumpKeyDown}
              placeholder="Type and press enter to save..."
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-md p-3 text-sm focus:outline-none focus:border-[var(--accent)] text-[var(--text-primary)] h-20 resize-none transition-colors"
            />
            {dumpSaved && (
              <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-[10px] px-2 py-1 flex items-center gap-1 rounded animate-pulse">
                <Check className="w-3 h-3" /> Saved
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
            {distractions.map(d => (
              <div key={d.id} className={`p-3 rounded-lg border text-sm flex justify-between items-start gap-3 transition-colors ${d.resolved ? 'bg-transparent border-transparent opacity-50' : 'bg-[var(--bg-base)] border-[var(--border)]'}`}>
                <div className="flex-1">
                  <div className={`text-[var(--text-primary)] ${d.resolved ? 'line-through' : ''}`}>
                    {d.content}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-1">
                    {new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {!d.resolved && (
                  <button 
                    onClick={() => handleResolve(d.id)}
                    className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black px-2 py-1 rounded transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            ))}
            {distractions.length === 0 && (
              <div className="text-center text-[var(--text-muted)] text-sm py-4">No distractions yet. Keep focusing!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
