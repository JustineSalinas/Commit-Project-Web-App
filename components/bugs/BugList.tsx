import { Search, Bug, CheckCircle2, ChevronRight, XCircle } from "lucide-react";

interface BugEntry {
  id: string;
  title: string;
  message: string;
  cause: string;
  fix: string;
  status: "resolved" | "unresolved";
  date: string;
}

const mockBugs: BugEntry[] = [
  {
    id: "1",
    title: "Vercel Build Failed: 404 Not Found",
    message: "npm error 404 Not Found - GET @radix-ui/react-badge",
    cause: "Shadcn's badge component isn't actually a published Radix UI primitive on npm. It relies on a local `cva` styled div instead.",
    fix: "Removed `@radix-ui/react-badge` from `package.json` dependencies entirely.",
    status: "resolved",
    date: "2026-04-19"
  },
  {
    id: "2",
    title: "Zustand State Unsynced across tabs",
    message: "Values reset when opening new tab despite localStorage middleware.",
    cause: "Missing exact configuration required for strict cross-tab synchronicity.",
    fix: "Pending investigation into `zustand/middleware` sync strategies.",
    status: "unresolved",
    date: "2026-04-18"
  }
];

export function BugList() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
        <input 
          type="text" 
          placeholder="Search by error message, title..."
          className="w-full bg-[#111113] border border-[#27272A] p-4 pl-12 rounded-xl text-sm text-[#FAFAFA] focus:outline-none focus:border-[#00FFAA] transition-colors"
        />
      </div>

      <div className="space-y-4">
        {mockBugs.map(bug => (
          <div key={bug.id} className="bg-[#111113] border border-[#1A1A1F] rounded-xl overflow-hidden hover:border-[#27272A] transition-colors">
            
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {bug.status === 'resolved' ? (
                  <CheckCircle2 className="w-6 h-6 text-[#00FFAA] shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-[#FF4757] shrink-0" />
                )}
                <div>
                  <h3 className="font-bold text-[#FAFAFA] text-lg">{bug.title}</h3>
                  <p className="font-mono text-[#FF4757] text-xs bg-[#FF4757]/10 border border-[#FF4757]/20 px-2 py-1 rounded mt-1 inline-block">
                    {bug.message}
                  </p>
                </div>
              </div>
              <span className="text-[#71717A] text-xs font-medium shrink-0">{bug.date}</span>
            </div>

            <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#09090B] border border-[#1A1A1F] rounded-lg p-4">
                <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-2">Root Cause</p>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{bug.cause}</p>
              </div>
              <div className="bg-[#09090B] border border-[#1A1A1F] rounded-lg p-4">
                <p className="text-[#71717A] text-xs font-bold uppercase tracking-wider mb-2 flex justify-between">
                  Fix
                  {bug.status === "unresolved" && <span className="text-[#FFB347] font-medium lowercase">pending</span>}
                </p>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{bug.fix}</p>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
