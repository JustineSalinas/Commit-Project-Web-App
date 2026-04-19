import { Lightbulb, Plus } from "lucide-react";
import { TILFeed } from "@/components/til/TILFeed";

export default function TILPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-[#00FFAA]" />
            Today I Learned
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">Searchable log of your daily learning outcomes and insights.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#00FFAA] text-[#000000] px-4 py-2 rounded-md text-sm font-bold hover:bg-[#00E599] transition-colors w-full md:w-auto">
          <Plus className="w-4 h-4" /> Log New Insight
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TILFeed />
        </div>
        
        <div className="space-y-6 mt-6 lg:mt-0">
          <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-6">
            <h3 className="text-[#FAFAFA] font-bold mb-4 text-sm uppercase tracking-wider">Top Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['react', 'typescript', 'drizzle', 'css', 'nextjs'].map(tag => (
                <button key={tag} className="px-3 py-1 bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA] rounded text-xs font-mono border border-[#27272A] transition-colors">
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-6">
            <h3 className="text-[#FAFAFA] font-bold mb-4 text-sm uppercase tracking-wider">Learning Stats</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-2xl font-bold text-[#00FFAA]">42</span>
                <span className="text-xs text-[#71717A]">Total Concepts Logged</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#FAFAFA]">3</span>
                <span className="text-xs text-[#71717A]">Entries this week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
