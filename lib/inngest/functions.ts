import { inngest } from "@/lib/inngest";
import { activateSubscription, cancelSubscriptionByStripeCustomer, handlePastDue } from "@/lib/billing/subscriptions";
import { db } from "@/db";
import { profiles, teams, teamMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const activateSubscriptionFn = inngest.createFunction(
  {
    id: "activate-subscription",
    retries: 5,
    triggers: [{ event: "billing/subscription.activate" }],
  },
  async ({ event, step }) => {
    const { clerkId, plan, provider, customerId, subscriptionId } = event.data as {
      clerkId: string;
      plan: "pro" | "teams";
      provider: "stripe" | "paymongo";
      customerId: string;
      subscriptionId: string;
    };

    await step.run("write-subscription-to-db", async () => {
      await activateSubscription(clerkId, plan, provider, customerId, subscriptionId);
    });

    if (plan === "teams") {
      await step.run("auto-create-team", async () => {
        const existing = await db.query.teamMembers.findFirst({
          where: eq(teamMembers.clerkId, clerkId),
        });
        if (!existing) {
          const profile = await db.query.profiles.findFirst({
            where: eq(profiles.clerkId, clerkId),
          });
          const teamName = profile?.name ? `${profile.name}'s Team` : "My Team";
          const [team] = await db.insert(teams).values({ name: teamName, ownerId: clerkId }).returning();
          await db.insert(teamMembers).values({ teamId: team.id, clerkId, role: "owner" });
        }
      });
    }

    return { success: true, clerkId, plan };
  }
);

export const cancelSubscriptionFn = inngest.createFunction(
  {
    id: "cancel-subscription",
    retries: 3,
    triggers: [{ event: "billing/subscription.cancel" }],
  },
  async ({ event, step }) => {
    const { stripeCustomerId } = event.data as { stripeCustomerId: string };
    await step.run("cancel-in-db", async () => {
      await cancelSubscriptionByStripeCustomer(stripeCustomerId);
    });
    return { success: true };
  }
);

export const markPastDueFn = inngest.createFunction(
  {
    id: "mark-past-due",
    retries: 3,
    triggers: [{ event: "billing/subscription.past-due" }],
  },
  async ({ event, step }) => {
    const { stripeCustomerId } = event.data as { stripeCustomerId: string };
    await step.run("mark-past-due-in-db", async () => {
      const profile = await db.query.profiles.findFirst({
        where: eq(profiles.stripeCustomerId, stripeCustomerId),
      });
      if (profile) await handlePastDue(profile.clerkId);
    });
    return { success: true };
  }
);
