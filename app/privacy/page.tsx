import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Commit",
  description: "How Commit collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Nav */}
      <header className="border-b border-[var(--border)] bg-[rgba(9,9,11,0.85)] backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-base font-bold tracking-widest text-[var(--accent)]"
          >
            COMMIT_
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 pb-10 border-b border-[var(--border)]">
          <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)] font-mono">
            Effective date: January 1, 2026 &nbsp;·&nbsp; Last updated: June 13, 2026
          </p>
        </div>

        <div className="prose-commit space-y-12">
          <Section title="Overview">
            <p>
              Commit (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is a developer learning workspace built and
              operated by Adrian Salinas. We take your privacy seriously. This policy explains
              what data we collect, how we use it, and your rights over it. We do not sell your
              personal data — ever.
            </p>
            <p>
              By using Commit you agree to this policy. If you disagree with any part, please
              discontinue use and contact us to delete your account.
            </p>
          </Section>

          <Section title="1. Information We Collect">
            <Subsection title="Account information">
              <p>
                Authentication is handled by <strong>Clerk</strong>. When you sign up, Clerk
                collects your email address, name (optional), and hashed password or OAuth
                tokens (GitHub, Google). We receive a user ID and email from Clerk — we do not
                store raw passwords.
              </p>
            </Subsection>
            <Subsection title="Content you create">
              <p>
                All content you create inside Commit — including TIL log entries, flashcards,
                roadmaps, code snippets, bug journal entries, session notes, and journal entries
                — is stored in our database and associated with your account.
              </p>
            </Subsection>
            <Subsection title="Usage data">
              <p>
                We collect usage events such as session start/end times, feature interactions,
                and streak activity. This data powers your heatmap and productivity analytics.
                It is tied to your account and not shared externally.
              </p>
            </Subsection>
            <Subsection title="Payment information">
              <p>
                Payments are processed by <strong>PayMongo</strong> (Philippine cards) and
                <strong> Paddle</strong> (international). We never see or store your full credit
                card number. These processors collect billing details directly and provide us
                with a subscription status only.
              </p>
            </Subsection>
            <Subsection title="Technical data">
              <p>
                We collect standard server logs including IP addresses, browser type, and
                referring URLs for security and debugging. These logs are retained for 30 days
                and then deleted.
              </p>
            </Subsection>
          </Section>

          <Section title="2. How We Use Your Data">
            <ul>
              <li>To provide, maintain, and improve the Commit service</li>
              <li>To authenticate you and keep your account secure</li>
              <li>
                To power AI features — when you use the AI Code Explainer or AI Auto-Cards,
                your input is sent to <strong>Anthropic</strong> (Claude) for processing.
                Anthropic&apos;s{" "}
                <a
                  href="https://www.anthropic.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  privacy policy
                </a>{" "}
                applies to that processing. We do not store AI prompts or responses beyond
                your session unless you explicitly save them.
              </li>
              <li>To calculate spaced repetition schedules (SM-2 algorithm, computed locally)</li>
              <li>To send transactional emails — password resets, payment receipts (no marketing without consent)</li>
              <li>To analyze aggregate, anonymized usage trends to improve the product</li>
            </ul>
          </Section>

          <Section title="3. Data Sharing & Third Parties">
            <p>We share your data only with the services required to operate Commit:</p>
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Purpose</th>
                  <th>Data shared</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Clerk</td>
                  <td>Authentication</td>
                  <td>Email, name, OAuth tokens</td>
                </tr>
                <tr>
                  <td>Supabase</td>
                  <td>Database &amp; storage</td>
                  <td>All user-created content</td>
                </tr>
                <tr>
                  <td>Anthropic (Claude)</td>
                  <td>AI features</td>
                  <td>Text you submit for AI processing</td>
                </tr>
                <tr>
                  <td>PayMongo</td>
                  <td>Payments (PH)</td>
                  <td>Billing details (processed directly)</td>
                </tr>
                <tr>
                  <td>Paddle</td>
                  <td>Payments (international)</td>
                  <td>Billing details (processed directly)</td>
                </tr>
                <tr>
                  <td>Vercel</td>
                  <td>Hosting &amp; CDN</td>
                  <td>Request logs, IP addresses</td>
                </tr>
              </tbody>
            </table>
            <p>
              We do not sell, rent, or trade your personal information to any third party
              for marketing purposes.
            </p>
          </Section>

          <Section title="4. Data Retention">
            <p>
              Your account data is retained for as long as your account is active. If you
              delete your account, we will delete your personal data within 30 days, except
              where retention is required by law (e.g., payment records for tax compliance,
              retained for 7 years).
            </p>
            <p>
              Anonymized, aggregated analytics data that cannot be linked back to you may
              be retained indefinitely.
            </p>
          </Section>

          <Section title="5. Your Rights">
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of all data we hold about you</li>
              <li><strong>Correction</strong> — update inaccurate data in your profile settings</li>
              <li><strong>Deletion</strong> — request full account and data deletion</li>
              <li><strong>Portability</strong> — export your TIL logs, flashcards, roadmaps, and snippets (available via the dashboard export feature)</li>
              <li><strong>Opt-out</strong> — unsubscribe from any marketing communications at any time</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:cdg.solutionsph@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                cdg.solutionsph@gmail.com
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="6. Cookies & Tracking">
            <p>
              Commit uses session cookies set by Clerk for authentication. We do not use
              advertising trackers, Facebook Pixel, Google Analytics, or any third-party
              behavioral tracking. Our analytics are first-party and stored in our own database.
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>
              We use industry-standard practices to protect your data: HTTPS everywhere,
              database encryption at rest via Supabase, and Row Level Security (RLS) ensuring
              users can only access their own records. Clerk handles password hashing and
              OAuth token management.
            </p>
            <p>
              No system is 100% secure. If we become aware of a breach affecting your data,
              we will notify you within 72 hours.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Commit is not directed at children under 13. We do not knowingly collect
              personal information from children. If you believe we have inadvertently
              collected data from a child, contact us immediately and we will delete it.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this policy from time to time. We will notify you of material
              changes by email or by posting a notice in the dashboard. Continued use of
              Commit after the effective date constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              Questions about this policy? Reach us at{" "}
              <a
                href="mailto:cdg.solutionsph@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                cdg.solutionsph@gmail.com
              </a>
              .
            </p>
            <p className="text-[var(--text-muted)] font-mono text-sm mt-2">
              Commit · Built by Adrian Salinas · CDG Philippines
            </p>
          </Section>
        </div>
      </main>

      <footer className="border-t border-[var(--border)] py-8 mt-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            © 2026 Commit. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[var(--text-secondary)]">
            <Link href="/privacy" className="text-[var(--accent)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">Terms</Link>
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
          </div>
        </div>
      </footer>

      <style>{`
        .prose-commit p {
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 0.75rem;
        }
        .prose-commit ul {
          color: var(--text-secondary);
          line-height: 1.75;
          padding-left: 1.25rem;
          list-style: disc;
          space-y: 0.5rem;
        }
        .prose-commit li {
          margin-bottom: 0.5rem;
        }
        .prose-commit strong {
          color: var(--text-primary);
          font-weight: 600;
        }
        .prose-commit table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0 1.25rem;
          font-size: 0.875rem;
        }
        .prose-commit th {
          text-align: left;
          padding: 0.625rem 1rem;
          background: var(--bg-elevated);
          color: var(--text-muted);
          font-family: monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid var(--border);
        }
        .prose-commit td {
          padding: 0.625rem 1rem;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          vertical-align: top;
        }
        .prose-commit tr:hover td {
          background: var(--bg-surface);
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-10 border-b border-[var(--border)] last:border-0 last:pb-0">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 font-display">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] font-mono uppercase tracking-wider mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}
