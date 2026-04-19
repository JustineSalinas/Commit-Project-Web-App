import { BookOpen } from "lucide-react";
import { JournalEditor } from "@/components/journal/JournalEditor";

export default function JournalPage() {
  return (
    <div className="space-y-6 flex flex-col min-h-0 h-[calc(100vh-6rem)]">
      <header className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#00FFAA]" />
            Code Journal
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Document your learning process, track implementation notes.</p>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-[#18181B] text-[#FAFAFA] border border-[#27272A] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#27272A] transition-colors">
            All Entries
          </button>
          <button className="bg-[#00FFAA] text-[#000000] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#00E599] transition-colors">
            End Session & Save
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 w-full overflow-hidden">
        <JournalEditor />
      </div>
    </div>
  );
}
