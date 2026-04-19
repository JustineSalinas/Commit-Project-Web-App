import { Activity, Download } from "lucide-react";
import { ActivityHeatmap } from "@/components/heatmap/ActivityHeatmap";

export default function HeatmapPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00FFAA]" />
            Productivity Heatmap
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Visualize your learning consistency and maintain your momentum.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#18181B] text-[#FAFAFA] border border-[#27272A] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#27272A] transition-colors w-full md:w-auto">
          <Download className="w-4 h-4" /> Export Image
        </button>
      </header>

      <div className="pt-4">
        <ActivityHeatmap />
      </div>

      {/* Weekly Review Mock block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#1A1A1F]">
        <div className="bg-[#09090B] border border-[#1A1A1F] rounded-xl p-6">
          <h3 className="text-[#FAFAFA] font-bold mb-2 text-sm uppercase tracking-wider">Top Skills Practiced</h3>
          <p className="text-[#71717A] text-sm mb-4">Based on snippet, TIL, and journal tags.</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-[#A1A1AA] mb-1">
                <span>React</span>
                <span>45%</span>
              </div>
              <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                <div className="h-full bg-[#00FFAA] w-[45%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#A1A1AA] mb-1">
                <span>TypeScript</span>
                <span>30%</span>
              </div>
              <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                <div className="h-full bg-[#60A5FA] w-[30%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-[#A1A1AA] mb-1">
                <span>Next.js</span>
                <span>25%</span>
              </div>
              <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[25%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
