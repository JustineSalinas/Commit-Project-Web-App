import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

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
        await inngest.send({
          name: "billing/subscription.activate",
          data: { clerkId, plan, provider: "stripe", customerId: session.customer, subscriptionId: session.subscription },
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await inngest.send({
        name: "billing/subscription.cancel",
        data: { stripeCustomerId: sub.customer },
      });
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      await inngest.send({
        name: "billing/subscription.past-due",
        data: { stripeCustomerId: invoice.customer },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
