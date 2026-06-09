import { PLANS, PlanKey } from "./plans.config";

const PAYMONGO_BASE = "https://api.paymongo.com/v1";

function paymongoAuth() {
  const secret = process.env.PAYMONGO_SECRET_KEY;
  if (!secret) throw new Error("PAYMONGO_SECRET_KEY is not set");
  return `Basic ${Buffer.from(secret + ":").toString("base64")}`;
}

export async function createPayMongoCheckout({
  planKey,
  clerkId,
  successUrl,
  cancelUrl,
}: {
  planKey: PlanKey;
  clerkId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const plan = PLANS[planKey];

  const res = await fetch(`${PAYMONGO_BASE}/checkout_sessions`, {
    method: "POST",
    headers: {
      Authorization: paymongoAuth(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        attributes: {
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          payment_method_types: ["gcash", "paymaya", "card"],
          line_items: [
            {
              currency: "PHP",
              amount: plan.php,
              name: plan.label,
              quantity: 1,
            },
          ],
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata: { clerkId, planKey },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.errors?.[0]?.detail || "PayMongo checkout failed");
  }

  const data = await res.json();
  return {
    checkoutUrl: data.data.attributes.checkout_url as string,
    sessionId: data.data.id as string,
  };
}

export async function createStripeCheckout({
  planKey,
  clerkId,
  email,
  successUrl,
  cancelUrl,
}: {
  planKey: PlanKey;
  clerkId: string;
  email?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey);
  const plan = PLANS[planKey];

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    ...(email ? { customer_email: email } : {}),
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: plan.usd,
          recurring: { interval: plan.interval },
          product_data: { name: plan.label },
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { clerkId, planKey },
  });

  return {
    checkoutUrl: session.url!,
    sessionId: session.id,
  };
}
