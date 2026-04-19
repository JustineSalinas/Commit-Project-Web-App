import { Lightbulb, Tag, CalendarDays } from "lucide-react";

interface TILEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
}

const mockTILs: TILEntry[] = [
  {
    id: "1",
    title: "Zustand doesn't need context providers",
    content: "Unlike React Context or Redux, Zustand uses a pub/sub model under the hood so you don't actually need to wrap your app in a provider. It's completely separate from the React tree until you consume it via a hook, preventing unnecessary re-renders.",
    tags: ["React", "Zustand", "State"],
    date: "2026-04-18",
  },
  {
    id: "2",
    title: "CSS grid-template-columns: minmax()",
    content: "You can achieve fully responsive grid layouts without media queries using `repeat(auto-fit, minmax(250px, 1fr))`. This instructs CSS to fit as many 250px wide columns as possible, and scale them up equally to fill remaining space.",
    tags: ["CSS", "Grid", "Responsive"],
    date: "2026-04-15",
  }
];

export function TILFeed() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input 
          type="text" 
          placeholder="Search learnings..."
          className="bg-[#09090B] border border-[#27272A] p-3 rounded-md text-sm text-[#FAFAFA] w-full md:flex-1 focus:outline-none focus:border-[#00FFAA]"
        />
        <button className="bg-[#18181B] w-full md:w-auto text-[#FAFAFA] border border-[#27272A] px-4 py-3 rounded-md text-sm font-medium hover:bg-[#27272A] transition-colors">
          Filter Tags
        </button>
      </div>

      <div className="space-y-4">
        {mockTILs.map(til => (
          <div key={til.id} className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-6 hover:border-[#27272A] transition-colors relative group">
            <div className="absolute -left-3 top-6 w-6 h-6 bg-[#09090B] border border-[#27272A] rounded-full hidden md:flex items-center justify-center">
              <Lightbulb className="w-3 h-3 text-[#00FFAA]" />
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between items-start mb-2 gap-2">
              <h3 className="text-xl font-bold text-[#FAFAFA]">{til.title}</h3>
              <div className="flex items-center gap-1 text-[#71717A] text-xs shrink-0 mt-1 md:mt-0">
                <CalendarDays className="w-3 h-3" />
                {til.date}
              </div>
            </div>
            
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
              {til.content}
            </p>
            
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-[#71717A]" />
              {til.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-[#09090B] text-[#71717A] rounded text-xs font-mono border border-[#1A1A1F]">
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
