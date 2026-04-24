import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface ProfileHeatmapProps {
  data: Record<string, number>;
}

const getIntensityClass = (count: number) => {
  if (count === 0) return "bg-[#18181B] border-[#27272A]";
  if (count === 1) return "bg-[#00FFAA]/20 border-[#00FFAA]/20";
  if (count <= 3) return "bg-[#00FFAA]/50 border-[#00FFAA]/50";
  return "bg-[#00FFAA] border-[#00FFAA] shadow-[0_0_10px_rgba(0,255,170,0.4)]";
};

export function ProfileHeatmap({ data }: ProfileHeatmapProps) {
  // Generate a year of data up to today
  const today = new Date();
  const WEEKS = 52;
  const heatmapData = [];
  
  // Start from 52 weeks ago
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (WEEKS * 7) + 1);

  for (let w = 0; w < WEEKS; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + (w * 7) + d);
      
      const dateString = date.toISOString().split('T')[0];
      const count = data[dateString] || 0;
      
      week.push({ count, date: dateString });
    }
    heatmapData.push(week);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-[var(--accent)]" />
        <h2 className="text-lg font-bold text-[var(--text-primary)]">Study Consistency Heatmap</h2>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-xs text-[#71717A]">
          <span>Less</span>
          <div className="flex gap-[3px]">
            <div className="w-[11px] h-[11px] rounded-sm bg-[#18181B] border border-[#27272A]" />
            <div className="w-[11px] h-[11px] rounded-sm bg-[#00FFAA]/20 border border-[#00FFAA]/20" />
            <div className="w-[11px] h-[11px] rounded-sm bg-[#00FFAA]/50 border border-[#00FFAA]/50" />
            <div className="w-[11px] h-[11px] rounded-sm bg-[#00FFAA] shadow-[0_0_10px_rgba(0,255,170,0.4)]" />
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-8 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex gap-2 mb-2 text-xs text-[#71717A] font-medium ml-[30px]">
            <span className="flex-1">Jan</span>
            <span className="flex-1">Feb</span>
            <span className="flex-1">Mar</span>
            <span className="flex-1">Apr</span>
            <span className="flex-1">May</span>
            <span className="flex-1">Jun</span>
            <span className="flex-1">Jul</span>
            <span className="flex-1">Aug</span>
            <span className="flex-1">Sep</span>
            <span className="flex-1">Oct</span>
            <span className="flex-1">Nov</span>
            <span className="flex-1">Dec</span>
          </div>
          
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 text-xs text-[#71717A] font-medium w-[26px] justify-between py-[4px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            <div className="flex gap-[3px] flex-1">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div 
                      key={`${wIdx}-${dIdx}`}
                      className={cn(
                        "w-[11px] h-[11px] rounded-sm border transition-all cursor-crosshair hover:scale-125 hover:z-10",
                        getIntensityClass(day.count)
                      )}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
