import { Target, Search, MoreHorizontal, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MasteryConcept {
  id: string;
  topic: string;
  category: string;
  level: 1 | 2 | 3 | 4; 
  lastReviewed: string;
}

const mockConcepts: MasteryConcept[] = [
  { id: "1", topic: "React Server Components", category: "React", level: 3, lastReviewed: "2026-04-18" },
  { id: "2", topic: "OAuth 2.0 Flow", category: "Security", level: 2, lastReviewed: "2026-04-10" },
  { id: "3", topic: "Zustand State Context", category: "State Management", level: 4, lastReviewed: "2026-04-20" },
  { id: "4", topic: "Docker Containerization", category: "DevOps", level: 1, lastReviewed: "2026-03-12" },
];

const levelColors = {
  1: { bg: "bg-[#18181B]", border: "border-[#27272A]", text: "text-[#A1A1AA]", label: "Heard of it" },
  2: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-500", label: "Can Explain" },
  3: { bg: "bg-[#60A5FA]/10", border: "border-[#60A5FA]/30", text: "text-[#60A5FA]", label: "Can Use" },
  4: { bg: "bg-[#00FFAA]/10", border: "border-[#00FFAA]/30", text: "text-[#00FFAA]", label: "Can Teach" },
};

export function MasteryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
          <input 
            type="text" 
            placeholder="Search concepts..."
            className="w-full bg-[#111113] border border-[#27272A] p-3 pl-12 rounded-xl text-sm text-[#FAFAFA] focus:outline-none focus:border-[#00FFAA] transition-colors"
          />
        </div>
        <button className="bg-[#18181B] w-full md:w-auto text-[#FAFAFA] border border-[#27272A] px-4 py-3 rounded-xl text-sm font-medium hover:bg-[#27272A] transition-colors">
          Filter Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
        {/* Level Legend/Filter Area */}
        {[1, 2, 3, 4].map((lvl) => {
          const l = lvl as keyof typeof levelColors;
          const { bg, border, text, label } = levelColors[l];
          const count = mockConcepts.filter(c => c.level === l).length;
          return (
            <div key={l} className={cn("p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-opacity-80", bg, border)}>
              <span className={cn("text-2xl font-bold mb-1", text)}>{count}</span>
              <span className={cn("text-xs uppercase font-bold tracking-wider", text)}>L{l}: {label}</span>
            </div>
          )
        })}
      </div>

      <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#09090B] border-b border-[#1A1A1F] text-[#71717A] text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Concept</th>
              <th className="p-4 hidden md:table-cell">Category</th>
              <th className="p-4">Mastery Level</th>
              <th className="p-4 hidden sm:table-cell">Last Reviewed</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockConcepts.map((concept) => {
              const { bg, border, text, label } = levelColors[concept.level];
              return (
                <tr key={concept.id} className="border-b border-[#1A1A1F] last:border-0 hover:bg-[#18181B] transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-[#FAFAFA] text-sm flex items-center gap-2">
                      {concept.level === 4 && <GraduationCap className="w-4 h-4 text-[#00FFAA]" />}
                      {concept.topic}
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-[#A1A1AA] text-sm">{concept.category}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", bg, border, text)}>
                      Level {concept.level}: {label}
                    </span>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="text-[#71717A] text-sm">{concept.lastReviewed}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#71717A] hover:text-[#FAFAFA] transition-colors p-1">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
