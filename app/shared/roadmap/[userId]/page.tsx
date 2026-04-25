import { db } from "@/db";
import { roadmap, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Map, CheckCircle, Circle, ArrowRight, BookOpen, Clock, Lock, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SharedRoadmapPage(props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const userId = params.userId;

  // Fetch the user's profile to show their name
  const profileRows = await db.select().from(profiles).where(eq(profiles.clerkId, userId));
  const userProfile = profileRows[0];

  if (!userProfile) {
    return notFound();
  }

  // Fetch the user's roadmap
  const roadmapItems = await db.query.roadmap.findMany({ 
    where: eq(roadmap.userId, userId),
    orderBy: (r, { asc }) => [asc(r.order), asc(r.createdAt)]
  });

  const sortedRoadmap = roadmapItems; // already sorted by DB query

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] p-8 md:p-12 font-sans max-w-4xl mx-auto">
      <header className="mb-12 border-b border-[var(--border)] pb-8 text-center">
        <Map className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Learning Roadmap</h1>
        <p className="text-[var(--text-secondary)] text-lg">
          {userProfile.name}'s Public Milestone Tracker
        </p>
      </header>

      {sortedRoadmap.length === 0 ? (
        <div className="text-center text-[var(--text-secondary)] py-20 border border-dashed border-[var(--border)] rounded-xl mt-8">
          <Map className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No milestones found for this user.</p>
        </div>
      ) : (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-8 relative shadow-sm overflow-hidden">
          {/* Main timeline line */}
          <div className="absolute left-[55px] top-12 bottom-12 w-1 bg-[var(--bg-base)] border-l border-r border-[var(--border)] hidden sm:block" />
          
          <div className="space-y-10 relative z-10">
            {sortedRoadmap.map((m, index) => {
              const previousMilestone = index > 0 ? sortedRoadmap[index - 1] : null;
              const isLocked = previousMilestone && previousMilestone.status !== 'complete';
              
              let progressPercent = 0;
              if (m.status === 'complete') progressPercent = 100;
              else if (m.status === 'in-progress') progressPercent = 50;

              return (
                <div key={m.id} className={`flex gap-8 items-start group ${isLocked ? 'opacity-60' : ''}`}>
                  <div className={`hidden sm:block mt-1.5 bg-[var(--bg-base)] rounded-full p-2 border-[3px] shadow-sm relative z-10 ${
                    m.status === "complete" ? "border-[var(--accent)] text-[var(--accent)] ring-4 ring-[var(--accent)]/10" : 
                    m.status === "in-progress" ? "border-blue-500 text-blue-500 ring-4 ring-blue-500/10" : 
                    isLocked ? "border-[var(--text-secondary)]/50 text-[var(--text-secondary)]/50" : "border-[var(--text-secondary)] text-[var(--text-secondary)]"
                  }`}>
                    {isLocked ? <Lock className="w-5 h-5" /> : 
                     m.status === "complete" ? <CheckCircle className="w-5 h-5" /> : 
                     m.status === "in-progress" ? <ArrowRight className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  
                  <div className={`flex-1 bg-[var(--bg-surface)] border ${
                    m.status === "in-progress" ? "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-[var(--border)]"
                  } rounded-xl p-6 relative overflow-hidden`}>
                    
                    {/* Progress Bar Background */}
                    {progressPercent > 0 && (
                       <div className="absolute top-0 left-0 h-1 bg-[var(--bg-base)] w-full">
                         <div className={`h-full transition-all duration-1000 ease-out ${progressPercent === 100 ? 'bg-[var(--accent)]' : 'bg-blue-500'}`} style={{ width: \`\${progressPercent}%\` }} />
                       </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                      <div>
                        <h3 className={`font-bold text-xl tracking-tight ${m.status === "complete" ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                          {m.title}
                        </h3>
                        {m.linkedConcept && (
                          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-full mt-2">
                            <BookOpen className="w-3.5 h-3.5" /> Concept: {m.linkedConcept}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                          {m.status === 'complete' && <span className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-md font-bold border border-[var(--accent)]/20">Completed</span>}
                          {m.status === 'in-progress' && <span className="text-xs bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-md font-bold border border-blue-500/20">In Progress</span>}
                          {m.status === 'pending' && <span className="text-xs bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] px-3 py-1.5 rounded-md font-bold border border-[var(--text-secondary)]/20">Pending</span>}
                      </div>
                    </div>
                    
                    <p className={`mt-4 text-sm leading-relaxed ${m.status === "complete" ? "text-[var(--text-secondary)]" : "text-[var(--text-secondary)]"}`}>
                      {m.description}
                    </p>

                    {/* Sub-goals */}
                    {m.subGoals && (m.subGoals as any[]).length > 0 && (
                      <div className="mt-5 space-y-2">
                        {(m.subGoals as any[]).map((sg: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${sg.completed || m.status === 'complete' ? 'bg-[var(--accent)] border-[var(--accent)] text-black' : 'border-[var(--text-secondary)]'}`}>
                              {(sg.completed || m.status === 'complete') && <CheckCircle className="w-3 h-3" />}
                            </div>
                            <span className={(sg.completed || m.status === 'complete') ? 'line-through opacity-70' : ''}>{sg.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Metadata Footer */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-4 text-xs font-bold text-[var(--text-secondary)] uppercase">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {m.pomosSpent || 0} Pomos Spent
                      </div>
                      {m.linkedJournalId && (
                        <div className="flex items-center gap-1.5 text-blue-400">
                          <LinkIcon className="w-4 h-4" />
                          Code Journal Linked
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-sm text-[var(--text-secondary)] font-bold">
        <p>Built with <Link href="/" className="text-[var(--accent)] hover:underline">Commit Productivity</Link></p>
      </footer>
    </div>
  );
}
