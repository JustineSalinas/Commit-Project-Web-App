"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Link from "next/link";

interface UpgradePromptProps {
  feature: string;
  onClose?: () => void;
  inline?: boolean;
}

export function UpgradePrompt({ feature, onClose, inline = false }: UpgradePromptProps) {
  if (inline) {
    return (
      <div className="flex items-center gap-3 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl px-4 py-3 text-sm">
        <Sparkles className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
        <span className="text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--accent)]">{feature}</span> is a Pro feature.
        </span>
        <Link
          href="/settings?tab=billing"
          className="ml-auto text-xs font-bold text-[var(--accent)] hover:brightness-110 whitespace-nowrap"
        >
          Upgrade
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-8 max-w-sm w-full shadow-2xl relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-[var(--accent)]" />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Upgrade to Pro</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          <span className="font-semibold text-[var(--text-primary)]">{feature}</span> is available on the Pro plan.
          Unlock unlimited access starting at ₱899/month.
        </p>
        <div className="flex gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--text-secondary)] transition-colors"
            >
              Not now
            </button>
          )}
          <Link
            href="/settings?tab=billing"
            className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-black text-sm font-bold text-center hover:brightness-110 transition-all"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
