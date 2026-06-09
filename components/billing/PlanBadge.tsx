"use client";

import type { PlanTier } from "@/lib/billing/plans.config";

const styles: Record<PlanTier, string> = {
  free:  "bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]",
  pro:   "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30",
  teams: "bg-[var(--info)]/10 text-[var(--info)] border-[var(--info)]/30",
};

const labels: Record<PlanTier, string> = {
  free:  "Free",
  pro:   "Pro",
  teams: "Teams",
};

export function PlanBadge({ plan }: { plan: PlanTier }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${styles[plan]}`}>
      {labels[plan]}
    </span>
  );
}
