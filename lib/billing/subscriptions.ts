import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function activateSubscription(
  clerkId: string,
  plan: 'pro' | 'teams',
  provider: 'stripe' | 'paymongo',
  customerId: string,
  subscriptionId: string,
  expiresAt?: Date
) {
  if (provider === 'stripe') {
    await db.execute(sql`
      UPDATE profiles SET
        plan = ${plan},
        subscription_status = 'active',
        stripe_customer_id = ${customerId},
        stripe_subscription_id = ${subscriptionId},
        plan_expires_at = ${expiresAt || null}
      WHERE clerk_id = ${clerkId}
    `);
  } else {
    await db.execute(sql`
      UPDATE profiles SET
        plan = ${plan},
        subscription_status = 'active',
        paymongo_customer_id = ${customerId},
        stripe_subscription_id = ${subscriptionId},
        plan_expires_at = ${expiresAt || null}
      WHERE clerk_id = ${clerkId}
    `);
  }
}

export async function cancelSubscription(clerkId: string) {
  await db.execute(sql`
    UPDATE profiles SET
      plan = 'free',
      subscription_status = 'cancelled',
      stripe_subscription_id = NULL,
      plan_expires_at = NULL
    WHERE clerk_id = ${clerkId}
  `);
}

export async function cancelSubscriptionByStripeCustomer(customerId: string) {
  await db.execute(sql`
    UPDATE profiles SET
      plan = 'free',
      subscription_status = 'cancelled',
      stripe_subscription_id = NULL,
      plan_expires_at = NULL
    WHERE stripe_customer_id = ${customerId}
  `);
}

export async function handlePastDue(clerkId: string) {
  await db.execute(sql`
    UPDATE profiles SET subscription_status = 'past_due' WHERE clerk_id = ${clerkId}
  `);
}
