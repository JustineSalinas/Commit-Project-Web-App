// Amounts in centavos (PHP) and cents (USD)
export const PLANS = {
  pro_monthly:   { php: 89900,   usd: 1600,   label: 'Pro Monthly',   interval: 'month' as const },
  pro_yearly:    { php: 862800,  usd: 15360,  label: 'Pro Yearly',    interval: 'year'  as const },
  teams_monthly: { php: 449900,  usd: 8000,   label: 'Teams Monthly', interval: 'month' as const },
  teams_yearly:  { php: 4318800, usd: 76800,  label: 'Teams Yearly',  interval: 'year'  as const },
} as const;

export type PlanKey = keyof typeof PLANS;

export const PLAN_META = {
  free:  { label: 'Free',  color: 'text-[var(--text-muted)]' },
  pro:   { label: 'Pro',   color: 'text-[var(--accent)]' },
  teams: { label: 'Teams', color: 'text-[var(--info)]' },
} as const;

export type PlanTier = keyof typeof PLAN_META;
