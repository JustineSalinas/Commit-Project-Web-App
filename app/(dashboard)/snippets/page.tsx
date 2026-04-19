import { Code2, Plus } from "lucide-react";
import { SnippetSearch } from "@/components/snippets/SnippetSearch";

export default function SnippetsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Code2 className="w-6 h-6 text-[#00FFAA]" />
            Code Snippets
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Personal, tagged repository of reusable code segments.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#00FFAA] text-[#000000] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#00E599] transition-colors w-full md:w-auto">
          <Plus className="w-4 h-4" /> Save Snippet
        </button>
      </header>

      <div className="pt-2">
        <SnippetSearch />
      </div>
    </div>
  );
}
