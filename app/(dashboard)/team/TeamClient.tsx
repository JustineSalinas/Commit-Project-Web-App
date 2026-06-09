"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, UserPlus, Trash2, Crown, Loader2 } from "lucide-react";
import { createTeam, inviteTeamMember, removeTeamMember } from "@/app/actions/crud";
import { PlanBadge } from "@/components/billing/PlanBadge";
import Link from "next/link";

interface Member {
  id: number;
  clerkId: string;
  role: string | null;
  name: string;
  email: string;
  joinedAt: Date | null;
}

interface Team {
  id: number;
  name: string;
  ownerId: string;
  subscriptionStatus: string | null;
}

interface TeamData {
  team: Team;
  members: Member[];
  role: string | null;
}

export default function TeamClient({
  initialData,
  currentClerkId,
  isPro,
}: {
  initialData: TeamData | null;
  currentClerkId: string;
  isPro: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<TeamData | null>(initialData);
  const [teamName, setTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || loading) return;
    setLoading("create");
    setError("");
    const result = await createTeam(teamName);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || "Failed to create team");
    }
    setLoading(null);
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || loading) return;
    setLoading("invite");
    setError("");
    const result = await inviteTeamMember(inviteEmail);
    if (result.success) {
      setInviteEmail("");
      router.refresh();
    } else {
      setError(result.error || "Failed to invite member");
    }
    setLoading(null);
  };

  const handleRemove = async (memberClerkId: string) => {
    setLoading(`remove_${memberClerkId}`);
    const result = await removeTeamMember(memberClerkId);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || "Failed to remove member");
    }
    setLoading(null);
  };

  if (!isPro) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--info)]/10 border border-[var(--info)]/20 flex items-center justify-center">
          <Users className="w-8 h-8 text-[var(--info)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Teams is a Pro feature</h2>
        <p className="text-[var(--text-secondary)] max-w-sm">
          Upgrade to the Teams plan to collaborate with up to 10 members, share a dashboard, and track group progress.
        </p>
        <Link
          href="/settings?tab=billing"
          className="px-6 py-3 bg-[var(--accent)] text-black rounded-xl font-bold hover:brightness-110 transition-all"
        >
          View Plans
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-lg">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Create Your Team</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Start a team workspace and invite up to 9 other members.
          </p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            autoFocus
            type="text"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            placeholder="e.g. Study Group Alpha"
            className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none text-sm"
          />
          <button
            type="submit"
            disabled={!teamName || !!loading}
            className="px-5 py-3 bg-[var(--accent)] text-black rounded-xl font-bold hover:brightness-110 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {loading === "create" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Create
          </button>
        </form>
      </div>
    );
  }

  const { team, members, role } = data;
  const isOwner = role === "owner";

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Team Header */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--info)]/10 border border-[var(--info)]/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-[var(--info)]" />
          </div>
          <div>
            <div className="font-bold text-[var(--text-primary)]">{team.name}</div>
            <div className="text-xs text-[var(--text-muted)]">
              {members.length} member{members.length !== 1 ? "s" : ""} · {10 - members.length} seats remaining
            </div>
          </div>
        </div>
        <PlanBadge plan="teams" />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Invite Form (owner only) */}
      {isOwner && members.length < 10 && (
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-[var(--accent)]" />
            Invite a Member
          </h3>
          <form onSubmit={handleInvite} className="flex gap-3">
            <input
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="member@email.com"
              className="flex-1 bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none text-sm"
            />
            <button
              type="submit"
              disabled={!inviteEmail || !!loading}
              className="px-4 py-2.5 bg-[var(--accent)] text-black rounded-lg font-bold text-sm hover:brightness-110 disabled:opacity-50 flex items-center gap-2"
            >
              {loading === "invite" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Invite
            </button>
          </form>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            The member must already have a Commit account with this email.
          </p>
        </div>
      )}

      {/* Members List */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--border)]">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Members</h3>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {members.map(m => (
            <div key={m.id} className="flex items-center gap-3 px-5 py-3">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)]">
                {(m.name || m.email)[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--text-primary)] truncate">{m.name}</div>
                <div className="text-xs text-[var(--text-muted)] truncate">{m.email}</div>
              </div>
              <div className="flex items-center gap-2">
                {m.role === "owner" && (
                  <span className="flex items-center gap-1 text-xs text-[var(--accent)] font-medium">
                    <Crown className="w-3 h-3" /> Owner
                  </span>
                )}
                {isOwner && m.clerkId !== currentClerkId && (
                  <button
                    onClick={() => handleRemove(m.clerkId)}
                    disabled={loading === `remove_${m.clerkId}`}
                    className="p-1.5 text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Remove member"
                  >
                    {loading === `remove_${m.clerkId}` ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
