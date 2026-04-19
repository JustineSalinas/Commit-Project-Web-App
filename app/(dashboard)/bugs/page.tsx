import { Bug, Plus } from "lucide-react";
import { BugList } from "@/components/bugs/BugList";

export default function BugsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Bug className="w-6 h-6 text-[#FF4757]" />
            Bug Journal
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Track errors to their root causes so you never solve the same bug twice.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#FF4757] text-[#FAFAFA] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#FF4757]/90 transition-colors w-full md:w-auto">
          <Plus className="w-4 h-4" /> Log Error
        </button>
      </header>

      <div className="pt-2">
        <BugList />
      </div>
    </div>
  );
}
