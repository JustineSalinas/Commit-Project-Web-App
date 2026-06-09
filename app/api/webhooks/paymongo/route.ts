import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { activateSubscription } from "@/lib/billing/subscriptions";

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
    const sessionAttrs = event?.data?.attributes?.data?.attributes || {};
    const metadata = sessionAttrs.metadata || {};
    const { clerkId, planKey } = metadata;

    if (clerkId && planKey) {
      const plan = String(planKey).startsWith("teams") ? "teams" : "pro";
      await activateSubscription(
        clerkId,
        plan as "pro" | "teams",
        "paymongo",
        event.data.id,
        event.data.id
      );
    }
  }

  return NextResponse.json({ received: true });
}
