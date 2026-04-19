export function TopBar() {
  return (
    <header className="h-16 border-b border-[#1A1A1F] bg-[#09090B]/80 backdrop-blur-sm flex items-center px-6 justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Placeholder for Breadcrumbs or Active Route Title */}
        <span className="text-[#A1A1AA] font-medium text-sm">Workspace</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Streak Counter */}
        <div className="flex items-center gap-2 bg-[#111113] border border-[#1A1A1F] rounded-full px-3 py-1">
          <span className="text-orange-500 text-sm">🔥</span>
          <span className="text-[#FAFAFA] text-sm font-bold">12</span>
        </div>

        {/* User Profile Stub (Clerk will replace this) */}
        <div className="w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center">
          <span className="text-[#FAFAFA] text-xs font-medium">U</span>
        </div>
      </div>
    </header>
  );
}
