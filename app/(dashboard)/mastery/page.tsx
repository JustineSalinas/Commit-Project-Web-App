import { Target, Plus } from "lucide-react";
import { MasteryDashboard } from "@/components/mastery/MasteryDashboard";

export default function MasteryPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Target className="w-6 h-6 text-[#00FFAA]" />
            Concept Mastery
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">4-Level self-assessment tracker to visually gauge your curriculum proficiency.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#00FFAA] text-[#000000] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#00E599] transition-colors w-full md:w-auto">
          <Plus className="w-4 h-4" /> Add Concept
        </button>
      </header>

      <div className="pt-2">
        <MasteryDashboard />
      </div>
    </div>
  );
}
