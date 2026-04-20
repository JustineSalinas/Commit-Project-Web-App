import { Calendar, Flame } from "lucide-react";

export default function HeatmapPage() {
  // Generate mock year blocks
  const weeks = Array.from({ length: 52 });
  const days = Array.from({ length: 7 });

  const getColor = () => {
    const r = Math.random();
    if (r > 0.8) return "bg-[var(--accent)]";
    if (r > 0.6) return "bg-[var(--accent)]/70";
    if (r > 0.4) return "bg-[var(--accent)]/40";
    if (r > 0.2) return "bg-[var(--accent)]/20";
    return "bg-[var(--bg-elevated)]";
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Calendar className="w-6 h-6 text-[var(--accent)]" />
            Activity Heatmap
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Visualize your consistency and daily effort over time.</p>
        </div>
        <div className="flex items-center gap-2 bg-[var(--bg-elevated)] border border-[var(--border)] px-4 py-2 rounded-lg">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="font-bold text-[var(--text-primary)]">12 Day Streak</span>
        </div>
      </header>

      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-8 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 mr-2 text-xs text-[var(--text-secondary)] justify-between py-1">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            {weeks.map((_, w_idx) => (
              <div key={w_idx} className="flex flex-col gap-1">
                {days.map((__, d_idx) => (
                  <div 
                    key={d_idx} 
                    className={`w-3 h-3 rounded-sm ${getColor()} hover:ring-1 hover:ring-white cursor-pointer transition-all`}
                    title="4 contributions"
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Learn to rest, not to quit.</span>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-[var(--bg-elevated)]" />
              <div className="w-3 h-3 rounded-sm bg-[var(--accent)]/20" />
              <div className="w-3 h-3 rounded-sm bg-[var(--accent)]/40" />
              <div className="w-3 h-3 rounded-sm bg-[var(--accent)]/70" />
              <div className="w-3 h-3 rounded-sm bg-[var(--accent)]" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
