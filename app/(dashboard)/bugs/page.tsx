import { Bug, CheckCircle2, CircleDashed } from "lucide-react";

export default function BugsPage() {
  const bugs = [
    { id: 1, title: "Hydration Mismatch on Settings", status: "resolved", time: "2 hours ago" },
    { id: 2, title: "Clerk UserProfile dark theme override", status: "open", time: "1 day ago" },
    { id: 3, title: "PostgreSQL connection aborting", status: "open", time: "3 days ago" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
            <Bug className="w-6 h-6 text-red-500" />
            Bug Tracker
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Document persistent bugs, their root causes, and solutions.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--accent)] text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all">
          Report Bug
        </button>
      </header>

      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex border-b border-[var(--border)]">
          <div className="w-1/2 p-4 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Issue</div>
          <div className="w-1/4 p-4 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Status</div>
          <div className="w-1/4 p-4 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Logged</div>
        </div>
        <div>
          {bugs.map((b) => (
            <div key={b.id} className="flex border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-surface)] transition-colors cursor-pointer">
              <div className="w-1/2 p-4 flex items-center gap-3 text-[var(--text-primary)]">
                <Bug className={`w-4 h-4 ${b.status === 'resolved' ? 'text-[var(--text-secondary)]' : 'text-red-500'}`} />
                <span className={b.status === 'resolved' ? 'line-through text-[var(--text-secondary)]' : 'font-medium'}>{b.title}</span>
              </div>
              <div className="w-1/4 p-4 flex items-center">
                {b.status === "resolved" 
                  ? <span className="flex items-center gap-1.5 text-xs text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-1 rounded-md"><CheckCircle2 className="w-3 h-3"/> Resolved</span>
                  : <span className="flex items-center gap-1.5 text-xs text-red-400 border border-red-500/30 bg-red-500/10 px-2 py-1 rounded-md"><CircleDashed className="w-3 h-3"/> Open</span>
                }
              </div>
              <div className="w-1/4 p-4 flex items-center text-sm text-[var(--text-secondary)]">
                {b.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
