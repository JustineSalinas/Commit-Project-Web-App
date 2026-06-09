import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createStripeCheckout } from "@/lib/billing";
import type { PlanKey } from "@/lib/billing/plans.config";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { planKey } = (await req.json()) as { planKey: PlanKey };
  if (!planKey) return NextResponse.json({ error: "planKey is required" }, { status: 400 });

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const { checkoutUrl } = await createStripeCheckout({
      planKey,
      clerkId: userId,
      email,
      successUrl: `${origin}/settings?tab=billing&success=stripe`,
      cancelUrl: `${origin}/settings?tab=billing`,
    });
    return NextResponse.json({ checkoutUrl });
  } catch (err: any) {
    console.error("Stripe checkout error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
