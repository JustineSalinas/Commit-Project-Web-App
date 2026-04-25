"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardStats } from "@/app/actions/crud";
import { usePomodoroStore } from "@/lib/zustand/pomodoroStore";
import { usePomodoro } from "@/lib/hooks/usePomodoro";
import { 
  Loader2, 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Star, 
  Map as MapIcon, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Zap
} from "lucide-react";

function TypewriterEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); 
    
    if (!text) return;

    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, 40); 
    
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}<span className="animate-blink">_</span></span>;
}
export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState({ 
    focusTime: "0h 0m", 
    cardsDue: 0, 
    streak: "0 Days", 
    heatmap: {} as Record<string, number>,
    recentLogs: [] as any[],
    roadmapProgress: 0,
    mastery: { teach: 0, use: 0, explain: 0, heard: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { toggleTimer, resetTimer } = usePomodoro();
  const { timeLeft, isActive, mode, sessionsCompleted, activeTaskTitle } = usePomodoroStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const userName = user?.firstName || "Developer";

  useEffect(() => {
    async function fetchStats() {
      const data = await getDashboardStats();
      setStats(data);
      setLoading(false);
    }
    if (isLoaded) {
      fetchStats();
    }
  }, [isLoaded]);

  const getIntensityColor = (count: number) => {
    if (count === 0) return "bg-[#18181B]";
    if (count <= 2) return "bg-[var(--accent)] opacity-30";
    if (count <= 5) return "bg-[var(--accent)] opacity-60";
    return "bg-[var(--accent)]";
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!mounted) {
    return <div className="animate-pulse bg-[var(--bg-base)] min-h-screen" />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      {/* Left Column: Main Content */}
      <div className="flex-1 space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Deep Work Session
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
            Your intellectual sanctuary is ready. You have maintained a <span className="text-[var(--accent)] font-bold">{stats.streak}</span> streak. Focus on conceptual mastery today.
          </p>
        </div>

        {/* Consistency Matrix (Heatmap) */}
        <div className="bg-[#111113] border border-[#1A1A1F] rounded-2xl p-8 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[var(--text-secondary)] text-sm font-bold uppercase tracking-widest">Consistency Matrix</h3>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">2026-YTD</span>
          </div>
          
          <div className="flex gap-1.5 overflow-x-auto pb-4 custom-scrollbar">
            {Array.from({ length: 24 }).map((_, w_idx) => (
              <div key={w_idx} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((__, d_idx) => {
                  const date = new Date(today);
                  const dayOffset = ((23 - w_idx) * 7) + (6 - d_idx);
                  date.setDate(today.getDate() - dayOffset);
                  
                  const count = stats.heatmap[date.toDateString()] || 0;
                  const colorClass = getIntensityColor(count);

                  return (
                    <div 
                      key={d_idx} 
                      className={`w-4 h-4 rounded-sm ${colorClass} hover:ring-1 hover:ring-[var(--accent)] cursor-pointer transition-all duration-300`}
                      title={`${date.toDateString()}: ${count} commits`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-[#18181B]" />
                <div className="w-3 h-3 rounded-sm bg-[var(--accent)] opacity-30" />
                <div className="w-3 h-3 rounded-sm bg-[var(--accent)] opacity-60" />
                <div className="w-3 h-3 rounded-sm bg-[var(--accent)]" />
              </div>
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">More</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest">
              Total Contributions: {Object.values(stats.heatmap).reduce((a, b) => a + b, 0)} Commits
            </div>
          </div>
        </div>

        {/* Bottom Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Roadmap Horizon */}
          <div className="bg-[#0A0A0B] border border-[#1A1A1F] rounded-2xl p-8 relative overflow-hidden group hover:border-[var(--accent)]/30 transition-colors">
            <div className="flex items-center gap-2 mb-6 text-[var(--accent)]">
              <MapIcon className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Roadmap Horizon</h3>
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-12">Fullstack Web Development</p>
            
            <div className="flex items-end justify-between mb-4">
              <div className="text-5xl font-bold text-[var(--text-primary)]">
                {stats.roadmapProgress}<span className="text-xl ml-1 opacity-50">%</span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-2">
                Est. 3 months
              </div>
            </div>
            
            <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--accent)] transition-all duration-1000 ease-out"
                style={{ width: `${stats.roadmapProgress}%` }}
              />
            </div>
          </div>

          {/* Cognitive Mastery */}
          <div className="bg-[#111113] border border-[#1A1A1F] rounded-2xl p-8 group hover:border-[var(--accent)]/30 transition-colors">
            <div className="flex items-center gap-2 mb-6 text-[var(--accent)]">
              <Star className="w-4 h-4 fill-current" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Cognitive Mastery</h3>
            </div>
            <p className="text-[var(--text-secondary)] text-sm mb-8">Feynman Technique Breakdown</p>
            
            <div className="space-y-4">
              {[
                { label: 'Teach', val: stats.mastery.teach },
                { label: 'Use', val: stats.mastery.use },
                { label: 'Explain', val: stats.mastery.explain },
                { label: 'Heard', val: stats.mastery.heard },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-4">
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase w-12">{m.label}</span>
                  <div className="flex-1 h-1.5 bg-[#18181B] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent)]/60" style={{ width: `${m.val}%` }} />
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono w-8 text-right">{m.val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Timer & Logs */}
      <div className="w-full lg:w-80 space-y-8">
        {/* Timer Card */}
        <div className="bg-[#18181B] border border-[#27272A] rounded-2xl p-8 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)] opacity-20" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-8">
            Focus {isActive ? 'Active' : 'Standby'}
          </h3>
          
          <div className="text-7xl font-mono font-bold text-[var(--text-primary)] mb-8 tracking-tighter">
            {formatTime(timeLeft)}
          </div>
          
          <div className="space-y-1 mb-8">
            <div className="text-sm font-bold text-[var(--text-primary)]">
              {mode === 'focus' ? (activeTaskTitle ? activeTaskTitle : 'Deep Work Session') : 'Rest & Recharge'}
            </div>
            <div className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">
              Session {(sessionsCompleted % 4) + 1} of 4
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={toggleTimer}
              className="flex-1 bg-[#27272A] hover:bg-[#323238] text-[var(--text-primary)] py-3 rounded-xl border border-[#3F3F46] transition-all flex items-center justify-center gap-2"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-xs font-bold uppercase tracking-widest">{isActive ? 'Pause' : 'Start'}</span>
            </button>
            <button 
              onClick={resetTimer}
              className="p-3 bg-[#27272A] hover:bg-[#323238] rounded-xl border border-[#3F3F46] text-[var(--text-muted)] hover:text-white transition-all"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Today's Log */}
        <div className="bg-[#111113] border border-[#1A1A1F] rounded-2xl p-8 flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--text-muted)]" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)]">Today's Log</h3>
            </div>
            <Link href="/journal" className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest hover:underline">View All</Link>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
            {stats.recentLogs.length > 0 ? stats.recentLogs.map((log) => (
              <div key={log.id} className="relative pl-6 border-l border-[#27272A]">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[var(--accent)]" />
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase mb-2">{log.time}</div>
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                  {log.message}
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full opacity-20">
                <Zap className="w-8 h-8 mb-2" />
                <p className="text-xs uppercase font-bold tracking-widest">No activity yet</p>
              </div>
            )}
          </div>

          <Link href="/journal" className="mt-8 w-full py-3 border border-dashed border-[#27272A] rounded-xl text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-2">
            <Plus className="w-3 h-3" />
            Quick Entry
          </Link>
        </div>
      </div>
    </div>
  );
}
