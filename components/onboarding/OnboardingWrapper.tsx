"use client";

import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserProfile } from "@/app/actions/crud";
import { OnboardingModal } from "./OnboardingModal";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const hasGreeted = useRef(false);

  useEffect(() => {
    async function checkOnboarding() {
      if (!isLoaded || !user) return;

      // Check if we've already bypassed onboarding locally to prevent loop on refresh
      const localBypass = localStorage.getItem(`onboarding_bypassed_${user.id}`);
      if (localBypass === "true") {
        setProfileLoaded(true);
        return;
      }

      const profile = await getUserProfile();
      
      if (profile) {
        if (!profile.hasCompletedOnboarding) {
          setShowOnboarding(true);
        } else if (!hasGreeted.current) {
          // Returning User Greeting
          toast.success(`Welcome back, ${user.firstName || user.username || "Developer"}!`, {
            description: "Ready for another session of focused growth?",
            duration: 4000,
          });
          hasGreeted.current = true;
        }
      } else {
        // If profile doesn't exist in our DB yet, trigger onboarding
        setShowOnboarding(true);
      }
      setProfileLoaded(true);
    }

    checkOnboarding();
  }, [isLoaded, user]);

  const handleOnboardingComplete = () => {
    if (user) {
      localStorage.setItem(`onboarding_bypassed_${user.id}`, "true");
    }
    setShowOnboarding(false);
    hasGreeted.current = true; // Don't show "Welcome back" right after onboarding
  };

  if (!isLoaded || !profileLoaded) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-surface)] flex items-center justify-center z-[100]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--accent)]" />
          <p className="text-sm font-medium text-[var(--text-muted)] animate-pulse">Initializing workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!showOnboarding && children}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete}
        userName={user?.fullName || user?.username || user?.firstName || "Developer"}
      />
    </>
  );
}
