import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#FAFAFA]">Settings</h1>
        <p className="text-[#71717A] text-sm mt-1">
          Manage your account, profile, and application preferences.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1A1A1F] w-full" />

      {/* Clerk UserProfile */}
      <div className="flex justify-start">
        <UserProfile
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: "#111113",
              colorInputBackground: "#18181B",
              colorInputText: "#FAFAFA",
              colorText: "#FAFAFA",
              colorTextSecondary: "#A1A1AA",
              colorPrimary: "#00FFAA",
              colorDanger: "#FF4757",
              borderRadius: "0.5rem",
              fontFamily: "inherit",
            },
            elements: {
              card: "shadow-none bg-transparent",
              navbar: "border-r border-[#1A1A1F] bg-[#111113]",
              navbarButton: "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]",
              navbarButtonActive: "text-[#00FFAA] bg-[#00FFAA]/10",
              pageScrollBox: "bg-[#09090B]",
              formButtonPrimary:
                "bg-[#00FFAA] text-black font-semibold hover:bg-[#00E599]",
              formFieldInput:
                "bg-[#18181B] border-[#27272A] text-[#FAFAFA] focus:border-[#00FFAA]",
              profileSectionPrimaryButton: "text-[#00FFAA] hover:text-[#00E599]",
              badge: "bg-[#00FFAA]/10 text-[#00FFAA] border border-[#00FFAA]/20",
              avatarBox: "ring-2 ring-[#1A1A1F]",
              headerTitle: "text-[#FAFAFA]",
              headerSubtitle: "text-[#71717A]",
            },
          }}
        />
      </div>
    </div>
  );
}
