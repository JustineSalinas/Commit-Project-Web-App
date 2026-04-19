export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#FAFAFA]">Welcome back</h1>
          <p className="text-[#A1A1AA] mt-1 text-sm">Here's your learning progress today.</p>
        </div>
      </div>
      
      {/* Quick Stats Stub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Focus Time Today", value: "2h 30m" },
          { label: "Flashcards Due", value: "14" },
          { label: "Current Streak", value: "12 Days" }
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-5">
            <h3 className="text-[#71717A] text-sm font-medium mb-2">{stat.label}</h3>
            <p className="text-2xl font-bold text-[#FAFAFA]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111113] border border-[#1A1A1F] rounded-xl p-6 h-64 flex items-center justify-center">
        <p className="text-[#71717A]">Activity / Next Milestones Placeholder</p>
      </div>
    </div>
  );
}
