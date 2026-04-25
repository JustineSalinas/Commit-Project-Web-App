import { getProfileData } from "@/app/actions/crud";
import { ProfileHeatmap } from "@/components/profile/ProfileHeatmap";
import { UserPlus, Activity, BookOpen, Layers, User } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const profileData = await getProfileData();

  if (!profileData || !profileData.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <div className="w-16 h-16 bg-[#111113] border border-[#1A1A1F] rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-[var(--text-muted)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Profile Not Found</h1>
        <p className="text-[var(--text-secondary)] max-w-md">
          Your developer profile hasn't been initialized yet. This can happen if onboarding wasn't completed or there was a database sync error.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/"
            className="bg-[var(--accent)] text-black px-6 py-2 rounded-lg font-medium hover:brightness-110 transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Note: If you've already completed onboarding, try refreshing the page.
        </p>
      </div>
    );
  }

  const {
    user,
    tilsCount,
    recentTils,
    conceptsMastered,
    topConcepts,
    heatmapData,
    consistencyScore
  } = profileData;

  const displayName = user.name || "Developer";
  const displayTitle = user.title || "CORE ARCHITECT";
  const displayBio = user.bio || "Building the foundations of high-concurrency systems. Currently obsessed with Rust's memory safety and distributed state machines. Sanctuary of learning, one commit at a time.";
  const displayScore = consistencyScore || "85.0";

  return (
    <div className="space-y-10 animate-fade-in pb-10">
      
      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Column - Avatar & Social */}
        <div className="w-full md:w-[280px] shrink-0 space-y-4">
          <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-6 flex flex-col items-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold tracking-widest uppercase mb-4">Developer Profile</span>
            <div className="w-32 h-32 bg-gradient-to-b from-[#2A2A35] to-[#18181B] rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-[var(--border-muted)]">
              {/* Fallback avatar shape if no image is available */}
              <div className="w-16 h-16 bg-[#3F3F46] rounded-full translate-y-2"></div>
              <div className="w-24 h-24 bg-[#3F3F46] rounded-full translate-y-16 absolute"></div>
            </div>
            <span className="text-sm text-[var(--text-secondary)]">{user.clerkId ? user.clerkId.substring(0, 10) : "@user"}</span>
          </div>

          <button className="w-full py-2.5 bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg font-bold flex items-center justify-center gap-2 transition-colors border border-[var(--accent)]/20">
            <UserPlus className="w-4 h-4" />
            Follow
          </button>

          <div className="flex justify-between bg-[#111113] border border-[#1A1A1F] rounded-xl p-4 px-6 text-center">
            <div>
              <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1">Followers</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">2.4k</p>
            </div>
            <div className="w-px bg-[#27272A]"></div>
            <div>
              <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-1">Following</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">842</p>
            </div>
          </div>
        </div>

        {/* Right Column - Info & Stats */}
        <div className="flex-1 space-y-6 pt-2">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">{displayName}</h1>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-muted)] rounded-md">
                {displayTitle}
              </span>
            </div>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl leading-relaxed">
              {displayBio}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 relative overflow-hidden group hover:border-[var(--border-muted)] transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-2">Consistency Score</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[var(--text-primary)]">{displayScore}</span>
                <span className="text-sm font-medium text-[var(--accent)] mb-1">+1.4%</span>
              </div>
            </div>

            <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 relative overflow-hidden group hover:border-[var(--border-muted)] transition-colors">
              <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-2">Concepts Mastered</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[var(--text-primary)]">{conceptsMastered}</span>
                <span className="text-sm font-medium text-[var(--text-muted)] mb-1">Total</span>
              </div>
            </div>

            <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 relative overflow-hidden group hover:border-[var(--border-muted)] transition-colors">
              <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mb-2">TIL Logs</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[var(--text-primary)]">{tilsCount}</span>
                <span className="text-sm font-medium text-[var(--text-muted)] mb-1">Entries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <ProfileHeatmap data={heatmapData as Record<string, number>} />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Concepts Mastered */}
        <div className="lg:col-span-1 bg-[#111113] border border-[#1A1A1F] rounded-xl p-6">
          <h3 className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest mb-6">Top Concepts Mastered</h3>
          
          <div className="space-y-6">
            {topConcepts.length > 0 ? topConcepts.map((concept, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[var(--text-primary)]">{concept.title}</span>
                  <span className="text-[var(--text-muted)]">Level {3 - idx}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent)]" style={{ width: `${100 - (idx * 20)}%` }}></div>
                </div>
              </div>
            )) : (
              // Mock fallback if no data
              <>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[var(--text-primary)]">Distributed Systems</span>
                    <span className="text-[var(--text-muted)]">Level 8</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent)]" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[var(--text-primary)]">Rust Internals</span>
                    <span className="text-[var(--text-muted)]">Level 7</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent)]" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[var(--text-primary)]">Vector Databases</span>
                    <span className="text-[var(--text-muted)]">Level 6</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent)]" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recent TIL Logs */}
        <div className="lg:col-span-2 bg-[#111113] border border-[#1A1A1F] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Recent TIL Logs</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-muted)] rounded-md text-xs font-medium hover:text-[var(--text-primary)]">All</button>
              <button className="px-3 py-1 bg-transparent text-[var(--text-muted)] border border-transparent rounded-md text-xs font-medium hover:text-[var(--text-primary)]">Architecture</button>
              <button className="px-3 py-1 bg-transparent text-[var(--text-muted)] border border-transparent rounded-md text-xs font-medium hover:text-[var(--text-primary)]">Systems</button>
            </div>
          </div>

          <div className="space-y-6">
            {recentTils.length > 0 ? recentTils.map((til, idx) => (
              <div key={idx} className="flex gap-6 group cursor-pointer">
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <span className="text-xl font-bold text-[var(--text-primary)]">
                    {new Date(til.createdAt || '').getDate()}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">
                    {new Date(til.createdAt || '').toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 space-y-2 group-hover:translate-x-1 transition-transform">
                  <h4 className="text-[var(--text-primary)] font-bold text-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                    {til.title}
                  </h4>
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-2 leading-relaxed">
                    {til.content}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-muted)] rounded text-[10px] font-bold text-[var(--text-muted)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                      SYSTEM STATUS: OPTIMAL
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              // Mock fallback if no data
              <div className="flex gap-6 group cursor-pointer">
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <span className="text-xl font-bold text-[var(--text-primary)]">14</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">AUG</span>
                </div>
                <div className="flex-1 space-y-2 group-hover:translate-x-1 transition-transform">
                  <h4 className="text-[var(--text-primary)] font-bold text-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                    Understanding Zero-Copy Networking in Linux
                  </h4>
                  <p className="text-[var(--text-secondary)] text-sm line-clamp-2 leading-relaxed">
                    Explored how `splice()` and `vmsplice()` can bypass the overhead of copying data between user buffers. Critical for the new gateway project...
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="px-2 py-1 bg-[var(--bg-elevated)] border border-[var(--border-muted)] rounded text-[10px] font-bold text-[var(--text-muted)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                      SYSTEM STATUS: OPTIMAL
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
