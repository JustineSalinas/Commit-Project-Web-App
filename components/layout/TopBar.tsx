"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { Settings } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 border-b border-[#1A1A1F] bg-[#09090B]/80 backdrop-blur-sm flex items-center px-6 justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Page context label */}
        <span className="text-[#A1A1AA] font-medium text-sm">Workspace</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Streak Counter */}
        <div className="flex items-center gap-2 bg-[#111113] border border-[#1A1A1F] rounded-full px-3 py-1">
          <span className="text-orange-500 text-sm">🔥</span>
          <span className="text-[#FAFAFA] text-sm font-bold">12</span>
        </div>

        {/* Settings shortcut button */}
        <Link
          href="/settings"
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#18181B] transition-all"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* Clerk User Profile Button */}
        <UserButton
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: "#111113",
              colorText: "#FAFAFA",
              colorTextSecondary: "#A1A1AA",
              colorPrimary: "#00FFAA",
              colorDanger: "#FF4757",
              borderRadius: "0.5rem",
            },
            elements: {
              avatarBox: "w-8 h-8 ring-2 ring-[#1A1A1F] hover:ring-[#00FFAA]/50 transition-all",
              userButtonPopoverCard: "bg-[#111113] border border-[#1A1A1F] shadow-xl",
              userButtonPopoverActionButton: "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]",
              userButtonPopoverActionButtonText: "text-[#A1A1AA]",
              userButtonPopoverFooter: "hidden",
            },
          }}
          userProfileUrl="/settings"
          userProfileMode="navigation"
        />
      </div>
    </header>
  );
}
