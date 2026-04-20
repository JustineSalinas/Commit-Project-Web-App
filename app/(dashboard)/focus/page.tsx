"use client";

import { Timer as TimerIcon, AlertCircle, Play, Pause, RotateCcw, Check, RefreshCcw } from "lucide-react";
import { usePomodoro } from "@/lib/hooks/usePomodoro";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function FocusPage() {
  const { mode, timeLeft, isActive, toggleTimer, switchMode, overrideTime } = usePomodoro();
  const [dumpText, setDumpText] = useState("");
  const [dumpSaved, setDumpSaved] = useState(false);
  
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [customTimeInput, setCustomTimeInput] = useState("");

  const handleDumpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!dumpText.trim()) return;
      // "Save" to local state or DB
      setDumpText("");
      setDumpSaved(true);
      setTimeout(() => setDumpSaved(false), 2000);
    }
  };

  const handleTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTimeInput) return;
    
    // Parse "HH:MM:SS" or "MM:SS" or just "MM"
    const parts = customTimeInput.split(':').map(Number);
    let totalSeconds = 0;
    
    if (parts.length === 3) {
      // HH:MM:SS
      totalSeconds = (parts[0] * 3600) + (parts[1] * 60) + (parts[2] || 0);
    } else if (parts.length === 2) {
      // MM:SS
      totalSeconds = (parts[0] * 60) + (parts[1] || 0);
    } else if (parts.length === 1 && !isNaN(parts[0])) {
      // MM
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
        <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
          <TimerIcon className="w-6 h-6 text-[var(--accent)]" />
          Focus Session
        </h1>
        <p className="text-[#A1A1AA] text-sm">Deep work with integrated distraction tracking.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111113] border border-[#1A1A1F] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          {/* Mode Switcher */}
          <div className="flex bg-[#09090B] border border-[#27272A] p-1 rounded-md mb-8">
            <button
              onClick={() => switchMode('focus')}
              className={cn("px-4 py-2 text-sm font-medium rounded-sm transition-colors", mode === 'focus' ? "bg-[#18181B] text-[#FAFAFA]" : "text-[#71717A] hover:text-[#A1A1AA]")}
            >
              Pomodoro
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={cn("px-4 py-2 text-sm font-medium rounded-sm transition-colors", mode === 'shortBreak' ? "bg-[#18181B] text-[#FAFAFA]" : "text-[#71717A] hover:text-[#A1A1AA]")}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={cn("px-4 py-2 text-sm font-medium rounded-sm transition-colors", mode === 'longBreak' ? "bg-[#18181B] text-[#FAFAFA]" : "text-[#71717A] hover:text-[#A1A1AA]")}
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
                className="text-[4rem] md:text-[6rem] font-bold tracking-tighter leading-none bg-transparent text-center border-b-2 border-[var(--accent)] outline-none text-[#FAFAFA] w-full max-w-[400px]"
              />
              <p className="text-[#A1A1AA] text-sm text-center mt-2">Enter MM:SS or HH:MM:SS format</p>
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
                mode === 'focus' ? "text-[#FAFAFA]" : "text-[#60A5FA]",
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
                  ? "bg-transparent border border-[#27272A] text-[#FAFAFA] hover:bg-[#18181B]" 
                  : mode === 'focus' ? "bg-[var(--accent)] text-black hover:brightness-110" : "bg-[#60A5FA] text-black hover:bg-[#3B82F6]"
              )}
            >
              {isActive ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
            </button>
            
            <button 
              onClick={() => switchMode(mode)}
              className="bg-transparent border border-[#27272A] text-[#A1A1AA] font-medium p-3 rounded-md hover:bg-[#18181B] hover:text-[#FAFAFA] transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 text-[#A1A1AA]">
            <AlertCircle className="w-4 h-4" />
            <h3 className="font-medium text-sm">Distraction Dump</h3>
          </div>
          <p className="text-xs text-[#71717A] mb-4">Log passing thoughts without breaking focus.</p>
          <div className="relative">
            <textarea 
              value={dumpText}
              onChange={(e) => setDumpText(e.target.value)}
              onKeyDown={handleDumpKeyDown}
              placeholder="Type and press enter to save..."
              className="w-full bg-[#09090B] border border-[#27272A] rounded-md p-3 text-sm focus:outline-none focus:border-[var(--accent)] text-[#FAFAFA] h-32 resize-none transition-colors"
            />
            {dumpSaved && (
              <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 flex items-center gap-1 rounded animate-pulse">
                <Check className="w-3 h-3" /> Saved target
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
