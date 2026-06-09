"use client";

import { useEffect, useState } from "react";
import { Check, CreditCard, Zap, Users, Loader2, ExternalLink } from "lucide-react";
import { getBillingInfo, cancelMySubscription } from "@/app/actions/crud";
import { PlanBadge } from "@/components/billing/PlanBadge";
import type { PlanTier } from "@/lib/billing/plans.config";

interface BillingInfo {
  plan: string;
  subscriptionStatus: string;
  planExpiresAt: Date | null;
  stripeCustomerId: string | null;
  paymongoCustomerId: string | null;
}

const PRO_FEATURES = [
  "Unlimited roadmaps and milestones",
  "Unlimited code snippets",
  "AI Code Explainer (Claude-powered)",
  "Advanced depth toggle for explanations",
  "Export to Markdown",
  "Priority support",
  "Early access to new features",
];

const TEAMS_FEATURES = [
  "Everything in Pro, up to 10 seats",
  "Shared team dashboard",
  "Invite members by email",
  "Team progress overview",
];

function PricingCard({
  tier,
  monthlyPhp,
  yearlyPhp,
  monthlyUsd,
  yearlyUsd,
  features,
  isAnnual,
  currentPlan,
  onUpgrade,
  loading,
}: {
  tier: "pro" | "teams";
  monthlyPhp: number;
  yearlyPhp: number;
  monthlyUsd: number;
  yearlyUsd: number;
  features: string[];
  isAnnual: boolean;
  currentPlan: string;
  onUpgrade: (planKey: string, provider: "paymongo" | "stripe") => void;
  loading: string | null;
}) {
  const isActive = currentPlan === tier;
  const phpPrice = isAnnual ? Math.round(yearlyPhp / 12) : monthlyPhp;
  const usdPrice = isAnnual ? Math.round(yearlyUsd / 12) : monthlyUsd;
  const planKey = `${tier}_${isAnnual ? "yearly" : "monthly"}`;

  return (
    <div
      className={`border rounded-2xl p-6 flex flex-col gap-4 transition-all ${
        isActive
          ? "border-[var(--accent)] bg-[var(--accent)]/5"
          : tier === "pro"
          ? "border-[var(--accent)]/40 bg-[var(--bg-elevated)]"
          : "border-[var(--info)]/40 bg-[var(--bg-elevated)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {tier === "pro" ? (
            <Zap className="w-5 h-5 text-[var(--accent)]" />
          ) : (
            <Users className="w-5 h-5 text-[var(--info)]" />
          )}
          <span className="font-bold text-[var(--text-primary)] text-lg capitalize">{tier}</span>
        </div>
        {isActive && <PlanBadge plan={tier as PlanTier} />}
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[var(--text-primary)]">₱{phpPrice}</span>
          <span className="text-[var(--text-muted)] text-sm">/mo</span>
        </div>
        <div className="text-xs text-[var(--text-muted)] mt-0.5">≈ ${usdPrice} USD</div>
        {isAnnual && (
          <div className="text-xs text-[var(--accent)] mt-1 font-medium">
            Save 20% — billed ₱{isAnnual ? (tier === "pro" ? 8628 : 43188) : 0}/year
          </div>
        )}
      </div>

      <ul className="space-y-2 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <Check className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      {!isActive && (
        <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
          <button
            onClick={() => onUpgrade(planKey, "paymongo")}
            disabled={!!loading}
            className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-black font-bold text-sm hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading === `${planKey}_paymongo` ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : null}
            Pay with GCash / Maya (PHP)
          </button>
          <button
            onClick={() => onUpgrade(planKey, "stripe")}
            disabled={!!loading}
            className="w-full py-2.5 rounded-xl border border-[var(--border-muted)] text-[var(--text-secondary)] font-medium text-sm hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading === `${planKey}_stripe` ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : null}
            Pay with Card (USD)
          </button>
        </div>
      )}
    </div>
  );
}

export function BillingTab() {
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [fetching, setFetching] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [cancelConfirm, setCancelConfirm] = useState(false);

  useEffect(() => {
    getBillingInfo().then(info => {
      setBilling(info as BillingInfo | null);
      setFetching(false);
    });
  }, []);

  const handleUpgrade = async (planKey: string, provider: "paymongo" | "stripe") => {
    const key = `${planKey}_${provider}`;
    setLoading(key);
    try {
      const res = await fetch(`/api/billing/${provider}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      alert(err.message);
      setLoading(null);
    }
  };

  const handleManageStripe = async () => {
    setLoading("portal");
    try {
      const res = await fetch("/api/billing/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err: any) {
      alert(err.message);
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    setLoading("cancel");
    const result = await cancelMySubscription();
    if (result.success) {
      setBilling(prev => prev ? { ...prev, plan: "free", subscriptionStatus: "cancelled" } : null);
      setCancelConfirm(false);
    } else {
      alert(result.error || "Failed to cancel");
    }
    setLoading(null);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" />
      </div>
    );
  }

  const currentPlan = billing?.plan || "free";
  const isActive = billing?.subscriptionStatus === "active";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Billing & Subscription</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage your plan, payment method, and subscription.
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Current Plan</div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[var(--text-primary)] capitalize">{currentPlan}</span>
              <PlanBadge plan={currentPlan as PlanTier} />
            </div>
            {isActive && billing?.planExpiresAt && (
              <div className="text-xs text-[var(--text-muted)] mt-1">
                Renews {new Date(billing.planExpiresAt).toLocaleDateString()}
              </div>
            )}
            {!isActive && currentPlan !== "free" && (
              <div className="text-xs text-red-400 mt-1">
                Subscription {billing?.subscriptionStatus}
              </div>
            )}
          </div>
          {isActive && currentPlan !== "free" && (
            <div className="flex gap-2">
              {billing?.stripeCustomerId && (
                <button
                  onClick={handleManageStripe}
                  disabled={!!loading}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border-muted)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
                >
                  <ExternalLink className="w-3 h-3" />
                  Manage
                </button>
              )}
              <button
                onClick={() => setCancelConfirm(true)}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {cancelConfirm && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
          <p className="text-sm text-red-400">Cancel your subscription? You'll keep access until the end of the billing period.</p>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => setCancelConfirm(false)} className="text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]">Keep Plan</button>
            <button onClick={handleCancel} disabled={loading === "cancel"} className="text-xs px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 disabled:opacity-50">
              {loading === "cancel" ? "Cancelling..." : "Confirm Cancel"}
            </button>
          </div>
        </div>
      )}

      {/* Billing Cycle Toggle */}
      {currentPlan === "free" && (
        <>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isAnnual ? "bg-[var(--accent)]" : "bg-[var(--bg-elevated)] border border-[var(--border-muted)]"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[var(--bg-base)] rounded-full transition-transform duration-200 ${isAnnual ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
              Annual <span className="text-[var(--accent)] text-xs font-bold">Save 20%</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PricingCard
              tier="pro"
              monthlyPhp={899}
              yearlyPhp={8628}
              monthlyUsd={16}
              yearlyUsd={154}
              features={PRO_FEATURES}
              isAnnual={isAnnual}
              currentPlan={currentPlan}
              onUpgrade={handleUpgrade}
              loading={loading}
            />
            <PricingCard
              tier="teams"
              monthlyPhp={4499}
              yearlyPhp={43188}
              monthlyUsd={80}
              yearlyUsd={768}
              features={TEAMS_FEATURES}
              isAnnual={isAnnual}
              currentPlan={currentPlan}
              onUpgrade={handleUpgrade}
              loading={loading}
            />
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            PHP payments processed by PayMongo (GCash, Maya, card). USD payments via Stripe (card only). Secure checkout.
          </p>
        </>
      )}
    </div>
  );
}
