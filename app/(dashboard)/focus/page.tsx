"use client";

import { Timer as TimerIcon, AlertCircle, Play, Pause, RotateCcw } from "lucide-react";
import { usePomodoro } from "@/lib/hooks/usePomodoro";
import { cn } from "@/lib/utils";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function FocusPage() {
  const { mode, timeLeft, isActive, toggleTimer, switchMode } = usePomodoro();

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

          <h2 className={cn("text-[6rem] md:text-[8rem] font-bold tracking-tighter leading-none mb-8 transition-colors", mode === 'focus' ? "text-[#FAFAFA]" : "text-[#60A5FA]")}>
            {formatTime(timeLeft)}
          </h2>
          
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
          <textarea 
            placeholder="Type and press enter to save..."
            className="w-full bg-[#09090B] border border-[#27272A] rounded-md p-3 text-sm focus:outline-none focus:border-[var(--accent)] text-[#FAFAFA] h-32 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
