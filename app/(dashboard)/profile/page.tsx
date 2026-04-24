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
          <User className="w-8 h-8 text-[#71717A]" />
        </div>
        <h1 className="text-2xl font-bold text-[#FAFAFA]">Profile Not Found</h1>
        <p className="text-[#A1A1AA] max-w-md">
          Your developer profile hasn't been initialized yet. This can happen if onboarding wasn't completed or there was a database sync error.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/"
            className="bg-[#00FFAA] text-black px-6 py-2 rounded-lg font-medium hover:brightness-110 transition-all"
          >
            Return to Dashboard
          </Link>
        </div>
        <p className="text-xs text-[#71717A]">
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
            <span className="text-[10px] text-[#71717A] font-bold tracking-widest uppercase mb-4">Developer Profile</span>
            <div className="w-32 h-32 bg-gradient-to-b from-[#2A2A35] to-[#18181B] rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-[#27272A]">
              {/* Fallback avatar shape if no image is available */}
              <div className="w-16 h-16 bg-[#3F3F46] rounded-full translate-y-2"></div>
              <div className="w-24 h-24 bg-[#3F3F46] rounded-full translate-y-16 absolute"></div>
            </div>
            <span className="text-sm text-[#A1A1AA]">{user.clerkId ? user.clerkId.substring(0, 10) : "@user"}</span>
          </div>

          <button className="w-full py-2.5 bg-[#00FFAA]/10 hover:bg-[#00FFAA]/20 text-[#00FFAA] rounded-lg font-bold flex items-center justify-center gap-2 transition-colors border border-[#00FFAA]/20">
            <UserPlus className="w-4 h-4" />
            Follow
          </button>

          <div className="flex justify-between bg-[#111113] border border-[#1A1A1F] rounded-xl p-4 px-6 text-center">
            <div>
              <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-widest mb-1">Followers</p>
              <p className="text-xl font-bold text-[#FAFAFA]">2.4k</p>
            </div>
            <div className="w-px bg-[#27272A]"></div>
            <div>
              <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-widest mb-1">Following</p>
              <p className="text-xl font-bold text-[#FAFAFA]">842</p>
            </div>
          </div>
        </div>

        {/* Right Column - Info & Stats */}
        <div className="flex-1 space-y-6 pt-2">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-extrabold text-[#FAFAFA]">{displayName}</h1>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#18181B] text-[#A1A1AA] border border-[#27272A] rounded-md">
                {displayTitle}
              </span>
            </div>
            <p className="text-[#A1A1AA] text-lg max-w-2xl leading-relaxed">
              {displayBio}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 relative overflow-hidden group hover:border-[#27272A] transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00FFAA] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-widest mb-2">Consistency Score</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#FAFAFA]">{displayScore}</span>
                <span className="text-sm font-medium text-[#00FFAA] mb-1">+1.4%</span>
              </div>
            </div>

            <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 relative overflow-hidden group hover:border-[#27272A] transition-colors">
              <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-widest mb-2">Concepts Mastered</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#FAFAFA]">{conceptsMastered}</span>
                <span className="text-sm font-medium text-[#71717A] mb-1">Total</span>
              </div>
            </div>

            <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5 relative overflow-hidden group hover:border-[#27272A] transition-colors">
              <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-widest mb-2">TIL Logs</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-[#FAFAFA]">{tilsCount}</span>
                <span className="text-sm font-medium text-[#71717A] mb-1">Entries</span>
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
          <h3 className="text-xs font-bold text-[#00FFAA] uppercase tracking-widest mb-6">Top Concepts Mastered</h3>
          
          <div className="space-y-6">
            {topConcepts.length > 0 ? topConcepts.map((concept, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#FAFAFA]">{concept.title}</span>
                  <span className="text-[#71717A]">Level {3 - idx}</span>
                </div>
                <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FFAA]" style={{ width: `${100 - (idx * 20)}%` }}></div>
                </div>
              </div>
            )) : (
              // Mock fallback if no data
              <>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[#FAFAFA]">Distributed Systems</span>
                    <span className="text-[#71717A]">Level 8</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00FFAA]" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[#FAFAFA]">Rust Internals</span>
                    <span className="text-[#71717A]">Level 7</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00FFAA]" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[#FAFAFA]">Vector Databases</span>
                    <span className="text-[#71717A]">Level 6</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden">
                    <div className="h-full bg-[#00FFAA]" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recent TIL Logs */}
        <div className="lg:col-span-2 bg-[#111113] border border-[#1A1A1F] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#FAFAFA]">Recent TIL Logs</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#18181B] text-[#A1A1AA] border border-[#27272A] rounded-md text-xs font-medium hover:text-[#FAFAFA]">All</button>
              <button className="px-3 py-1 bg-transparent text-[#71717A] border border-transparent rounded-md text-xs font-medium hover:text-[#FAFAFA]">Architecture</button>
              <button className="px-3 py-1 bg-transparent text-[#71717A] border border-transparent rounded-md text-xs font-medium hover:text-[#FAFAFA]">Systems</button>
            </div>
          </div>

          <div className="space-y-6">
            {recentTils.length > 0 ? recentTils.map((til, idx) => (
              <div key={idx} className="flex gap-6 group cursor-pointer">
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <span className="text-xl font-bold text-[#FAFAFA]">
                    {new Date(til.createdAt || '').getDate()}
                  </span>
                  <span className="text-[10px] text-[#71717A] font-bold uppercase">
                    {new Date(til.createdAt || '').toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 space-y-2 group-hover:translate-x-1 transition-transform">
                  <h4 className="text-[#FAFAFA] font-bold text-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFAA]"></span>
                    {til.title}
                  </h4>
                  <p className="text-[#A1A1AA] text-sm line-clamp-2 leading-relaxed">
                    {til.content}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="px-2 py-1 bg-[#18181B] border border-[#27272A] rounded text-[10px] font-bold text-[#71717A] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FFAA]"></span>
                      SYSTEM STATUS: OPTIMAL
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              // Mock fallback if no data
              <div className="flex gap-6 group cursor-pointer">
                <div className="flex flex-col items-center pt-1 shrink-0">
                  <span className="text-xl font-bold text-[#FAFAFA]">14</span>
                  <span className="text-[10px] text-[#71717A] font-bold uppercase">AUG</span>
                </div>
                <div className="flex-1 space-y-2 group-hover:translate-x-1 transition-transform">
                  <h4 className="text-[#FAFAFA] font-bold text-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFAA]"></span>
                    Understanding Zero-Copy Networking in Linux
                  </h4>
                  <p className="text-[#A1A1AA] text-sm line-clamp-2 leading-relaxed">
                    Explored how `splice()` and `vmsplice()` can bypass the overhead of copying data between user buffers. Critical for the new gateway project...
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="px-2 py-1 bg-[#18181B] border border-[#27272A] rounded text-[10px] font-bold text-[#71717A] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FFAA]"></span>
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
