import { NextRequest, NextResponse } from "next/server";
import {
  activateSubscription,
  cancelSubscriptionByStripeCustomer,
  handlePastDue,
} from "@/lib/billing/subscriptions";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const rawBody = Buffer.from(await req.arrayBuffer());
  const signature = req.headers.get("stripe-signature") || "";

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey);

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { clerkId, planKey } = session.metadata || {};
      if (clerkId && planKey) {
        const plan = String(planKey).startsWith("teams") ? "teams" : "pro";
        await activateSubscription(
          clerkId,
          plan as "pro" | "teams",
          "stripe",
          session.customer as string,
          session.subscription as string
        );
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await cancelSubscriptionByStripeCustomer(sub.customer as string);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const profile = await db.query.profiles.findFirst({
        where: eq(profiles.stripeCustomerId, invoice.customer as string),
      });
      if (profile) await handlePastDue(profile.clerkId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
