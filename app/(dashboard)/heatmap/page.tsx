import { Calendar, Flame } from "lucide-react";
import { getDashboardStats } from "@/app/actions/crud";

export default async function HeatmapPage() {
  const stats = await getDashboardStats();
  const data = stats.heatmap;
  // stats.streak is a string like "12 Days". Let's extract the number.
  const streakMatch = stats.streak.match(/(\d+)/);
  const streak = streakMatch ? parseInt(streakMatch[0], 10) : 0;

  // Generate the last 364 days (52 weeks x 7 days)
  const today = new Date();
  const daysArray: { dateStr: string; count: number }[] = [];
  
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // getDashboardStats returns keys as toDateString(), so we use that!
    const localStr = d.toDateString();
    daysArray.push({
      dateStr: localStr,
      count: data[localStr] || 0
    });
  }

  const getColor = (count: number) => {
    if (count >= 4) return "bg-[var(--accent)]";
    if (count === 3) return "bg-[var(--accent)]/70";
    if (count === 2) return "bg-[var(--accent)]/40";
    if (count === 1) return "bg-[var(--accent)]/20";
    return "bg-[var(--bg-elevated)]";
  };

  // Organize days into 52 columns of 7 rows
  // Days usually flow top to bottom, left to right
  const weeks = Array.from({ length: 52 });
  const days = Array.from({ length: 7 });

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
          <Flame className={`w-4 h-4 ${streak > 0 ? "text-orange-500" : "text-[var(--text-muted)]"}`} />
          <span className="font-bold text-[var(--text-primary)]">{streak} Day Streak</span>
        </div>
      </header>

      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-8 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 mr-2 text-xs text-[var(--text-secondary)] justify-between py-1">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>
            {weeks.map((_, w_idx) => (
              <div key={w_idx} className="flex flex-col gap-1">
                {days.map((__, d_idx) => {
                  const dayIndex = w_idx * 7 + d_idx;
                  const dayData = daysArray[dayIndex];
                  if (!dayData) return <div key={d_idx} className="w-3 h-3" />;
                  return (
                    <div 
                      key={d_idx} 
                      className={`w-3 h-3 rounded-sm ${getColor(dayData.count)} hover:ring-1 hover:ring-[var(--text-muted)] cursor-pointer transition-all`}
                      title={`${dayData.count} sessions on ${dayData.dateStr}`}
                    />
                  );
                })}
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
