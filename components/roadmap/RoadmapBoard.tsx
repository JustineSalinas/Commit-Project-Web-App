import { MilestoneCard, MilestoneStatus } from "./MilestoneCard";

interface MilestoneData {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  tags?: string[];
}

const mockRoadmap: { phase: string; milestones: MilestoneData[] }[] = [
  {
    phase: "Phase 1: Fundamentals",
    milestones: [
      { id: "1", title: "HTML/CSS Basics", description: "Semantic markup, flexbox, grid, and responsive design fundamentals.", status: "completed", tags: ["HTML", "CSS"] },
      { id: "2", title: "JavaScript Core", description: "Variables, loops, functions, closures, and ES6+ features.", status: "completed", tags: ["JavaScript"] },
    ]
  },
  {
    phase: "Phase 2: Frontend Frameworks",
    milestones: [
      { id: "3", title: "React Fundamentals", description: "Components, props, state, hooks, and lifecycle.", status: "in-progress", tags: ["React", "Hooks"] },
      { id: "4", title: "Routing & State", description: "Next.js App router, Zustand, Tanstack Query.", status: "pending", tags: ["Next.js", "State"] },
    ]
  },
  {
    phase: "Phase 3: Backend Integration",
    milestones: [
      { id: "5", title: "Databases & ORMs", description: "PostgreSQL fundamentals, Drizzle ORM.", status: "pending", tags: ["SQL", "Drizzle"] },
      { id: "6", title: "Authentication", description: "OAuth, JWTs, Clerk integration.", status: "pending", tags: ["Security", "Clerk"] },
    ]
  }
];

export function RoadmapBoard() {
  return (
    <div className="space-y-12">
      {mockRoadmap.map((section, idx) => (
        <div key={idx} className="relative">
          {/* Connecting Line */}
          {idx !== mockRoadmap.length - 1 && (
            <div className="absolute left-8 top-12 bottom-[-3rem] w-px bg-gradient-to-b from-[#27272A] to-transparent z-0 hidden md:block" />
          )}
          
          <h2 className="text-[#FAFAFA] font-bold text-xl mb-6 flex items-center gap-4 relative z-10">
            <span className="w-16 h-8 bg-[#18181B] border border-[#27272A] rounded-full flex items-center justify-center text-[#A1A1AA] text-xs font-bold font-mono tracking-wider">
              0{idx + 1}
            </span>
            {section.phase}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:pl-20 relative z-10">
            {section.milestones.map(milestone => (
              <MilestoneCard key={milestone.id} {...milestone} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
