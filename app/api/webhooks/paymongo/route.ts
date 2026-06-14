import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { inngest } from "@/lib/inngest";

function verifySignature(rawBody: string, header: string, secret: string): boolean {
  const tPart = header.split(",").find(p => p.startsWith("t="));
  const tePart = header.split(",").find(p => p.startsWith("te="));
  if (!tPart || !tePart) return false;
  const t = tPart.slice(2);
  const te = tePart.slice(3);
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${t}.${rawBody}`)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(te, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("paymongo-signature") || "";
  const secret = process.env.PAYMONGO_WEBHOOK_SECRET;

  if (secret && !verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = event?.data?.attributes?.type;

  if (type === "checkout_session.payment.paid") {
    const sessionData = event?.data?.attributes?.data || {};
    const sessionAttrs = sessionData?.attributes || {};
    const metadata = sessionAttrs.metadata || {};
    const { clerkId, planKey } = metadata;

    if (clerkId && planKey) {
      const plan = String(planKey).startsWith("teams") ? "teams" : "pro";
      // B3 fix: store the stable payment_intent_id as customerId, checkout session id as subscriptionId
      const checkoutSessionId = sessionData?.id ?? event?.data?.id;
      const paymentIntentId = sessionAttrs?.payment_intent_id ?? checkoutSessionId;
      await inngest.send({
        name: "billing/subscription.activate",
        data: { clerkId, plan, provider: "paymongo", customerId: paymentIntentId, subscriptionId: checkoutSessionId },
      });
    }
  }

  return NextResponse.json({ received: true });
}
