import { Map, Plus } from "lucide-react";
import { RoadmapBoard } from "@/components/roadmap/RoadmapBoard";

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Map className="w-6 h-6 text-[#00FFAA]" />
            Learning Roadmap
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Structured learning paths and active milestones.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-[#09090B] border border-[#27272A] rounded-md p-1">
            <button className="px-3 py-1.5 text-sm font-medium rounded-sm bg-[#18181B] text-[#FAFAFA]">Full Stack</button>
            <button className="px-3 py-1.5 text-sm font-medium rounded-sm text-[#71717A] hover:text-[#A1A1AA]">DSA</button>
          </div>
          <button className="flex items-center gap-2 bg-[#00FFAA] text-[#000000] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#00E599] transition-colors">
            <Plus className="w-4 h-4" /> Add Path
          </button>
        </div>
      </header>

      {/* Progress Overview */}
      <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full border-[6px] border-[#18181B] flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="42" cy="42" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-[#18181B]" />
            <circle cx="42" cy="42" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="264" strokeDashoffset="176" className="text-[#00FFAA]" />
          </svg>
          <span className="text-xl font-bold text-[#FAFAFA]">33%</span>
        </div>
        <div className="flex-1">
          <h3 className="text-[#FAFAFA] font-bold text-lg mb-1">Full Stack Developer</h3>
          <p className="text-[#A1A1AA] text-sm mb-4">You're making steady progress. Focus on finishing React Fundamentals this week.</p>
          <div className="flex gap-6">
            <div>
              <span className="block text-2xl font-bold text-[#FAFAFA]">2</span>
              <span className="text-xs text-[#71717A] uppercase tracking-wider font-bold">Completed</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#60A5FA]">1</span>
              <span className="text-xs text-[#71717A] uppercase tracking-wider font-bold">In Progress</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#A1A1AA]">3</span>
              <span className="text-xs text-[#71717A] uppercase tracking-wider font-bold">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <RoadmapBoard />
      </div>
    </div>
  );
}
