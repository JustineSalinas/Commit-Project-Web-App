"use client";

import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserProfile } from "@/app/actions/crud";
import { OnboardingModal } from "./OnboardingModal";
import { toast } from "sonner";

export function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const hasGreeted = useRef(false);

  useEffect(() => {
    async function checkOnboarding() {
      if (!isLoaded || !user) return;

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
        // If profile doesn't exist in our DB yet, it might be a new user 
        // who just signed up through Clerk but hasn't been synced to Drizzle yet.
        // Usually, middleware or a webhook handles this, but we'll trigger onboarding
        // as a fallback or if the sync is pending.
        setShowOnboarding(true);
      }
      setProfileLoaded(true);
    }

    checkOnboarding();
  }, [isLoaded, user]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    hasGreeted.current = true; // Don't show "Welcome back" right after onboarding
  };

  return (
    <>
      {children}
      {isLoaded && user && (
        <OnboardingModal 
          isOpen={showOnboarding} 
          onComplete={handleOnboardingComplete}
          userName={user.firstName || "Developer"}
        />
      )}
    </>
  );
}
