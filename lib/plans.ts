import { db } from "@/db";
import { profiles, teamMembers, teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { PlanTier } from "./billing/plans.config";

export async function getUserPlan(clerkId: string): Promise<PlanTier> {
  try {
    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.clerkId, clerkId),
    });
    if (!profile) return "free";

    const directPlan = profile.plan as PlanTier | null;
    if (directPlan && directPlan !== "free" && profile.subscriptionStatus === "active") {
      return directPlan;
    }

    // Check team membership for active teams plan
    const membership = await db.query.teamMembers
      .findFirst({ where: eq(teamMembers.clerkId, clerkId) })
      .catch(() => null);

    if (membership) {
      const team = await db.query.teams
        .findFirst({ where: eq(teams.id, membership.teamId) })
        .catch(() => null);
      if (team?.subscriptionStatus === "active") return "teams";
    }
  } catch {
    // Tables may not exist yet; fall through to free
  }

  return "free";
}

export async function isPro(clerkId: string): Promise<boolean> {
  const plan = await getUserPlan(clerkId);
  return plan === "pro" || plan === "teams";
}

export async function isTeams(clerkId: string): Promise<boolean> {
  const plan = await getUserPlan(clerkId);
  return plan === "teams";
}
