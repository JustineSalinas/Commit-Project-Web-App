import { auth } from "@clerk/nextjs/server";
import { getTeam } from "@/app/actions/crud";
import { isPro } from "@/lib/plans";
import TeamClient from "./TeamClient";
import { Users } from "lucide-react";

export default async function TeamPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const [teamData, pro] = await Promise.all([
    getTeam(),
    isPro(userId),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[var(--text-primary)]">
          <Users className="w-6 h-6 text-[var(--info)]" />
          Team
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          Collaborate with your study group or bootcamp cohort.
        </p>
      </div>
      <div className="h-px bg-[var(--border)] w-full" />
      <TeamClient
        initialData={teamData as any}
        currentClerkId={userId}
        isPro={pro}
      />
    </div>
  );
}
