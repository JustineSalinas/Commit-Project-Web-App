import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { OnboardingWrapper } from "@/components/onboarding/OnboardingWrapper";
import { CommitModal } from "@/components/focus/CommitModal";
import { SyncQueueProvider } from "@/components/layout/SyncQueueProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

// cache() deduplicates this within a single render — safe to call from multiple server components
const getSubscriptionStatus = cache(async (userId: string): Promise<string | null> => {
  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.clerkId, userId),
      columns: { subscriptionStatus: true },
    });
    return profile?.subscriptionStatus ?? null;
  } catch {
    return null;
  }
});

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (userId) {
    const status = await getSubscriptionStatus(userId);
    if (status === "past_due") {
      redirect("/settings?tab=billing&alert=past_due");
    }
  }

  return (
    <OnboardingWrapper>
      <SyncQueueProvider />
      <div className="flex bg-[var(--bg-base)] min-h-screen text-[var(--text-primary)] font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 overflow-auto p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
      <CommitModal />
    </OnboardingWrapper>
  );
}
