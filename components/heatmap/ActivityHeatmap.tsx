import { Activity, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// Generate a mock year of data
const MOCK_WEEKS = Array.from({ length: 52 }).map(() => 
  Array.from({ length: 7 }).map(() => ({
    count: Math.floor(Math.random() * 5),
    date: new Date().toISOString()
  }))
);

const getIntensityClass = (count: number) => {
  if (count === 0) return "bg-[#18181B] border-[#27272A]";
  if (count === 1) return "bg-[#00FFAA]/20 border-[#00FFAA]/20";
  if (count <= 3) return "bg-[#00FFAA]/50 border-[#00FFAA]/50";
  return "bg-[#00FFAA] border-[#00FFAA] shadow-[0_0_10px_rgba(0,255,170,0.4)]";
};

export function ActivityHeatmap() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#18181B] flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6 text-[#A1A1AA]" />
          </div>
          <div>
            <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-1">Total Contributions</p>
            <p className="text-[#FAFAFA] text-2xl font-bold">1,248</p>
          </div>
        </div>
        
        <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-1">Current Streak</p>
            <p className="text-[#FAFAFA] text-2xl font-bold">12 Days</p>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#00FFAA]/10 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-[#00FFAA]" />
          </div>
          <div>
            <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-1">Longest Streak</p>
            <p className="text-[#FAFAFA] text-2xl font-bold">45 Days</p>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
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
              {MOCK_WEEKS.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div 
                      key={`${wIdx}-${dIdx}`}
                      className={cn(
                        "w-[11px] h-[11px] rounded-sm border transition-all cursor-crosshair hover:scale-125 hover:z-10",
                        getIntensityClass(day.count)
                      )}
                      title={`${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-6 text-xs text-[#71717A] justify-end">
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
      </div>
    </div>
  );
}
