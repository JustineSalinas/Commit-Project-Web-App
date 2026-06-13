import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Commit",
  description: "The rules and rights governing your use of Commit.",
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--text-muted)] font-mono">
            Effective date: January 1, 2026 &nbsp;·&nbsp; Last updated: June 13, 2026
          </p>
        </div>

        <div className="prose-commit space-y-12">
          <Section title="Overview">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of Commit, a developer
              learning workspace operated by Adrian Salinas (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              By creating an account or using Commit in any way, you agree to be bound by
              these Terms.
            </p>
            <p>
              If you are using Commit on behalf of an organization, you represent that you
              have authority to bind that organization to these Terms.
            </p>
          </Section>

          <Section title="1. The Service">
            <p>
              Commit is a developer learning workspace that includes a Pomodoro focus timer,
              spaced repetition flashcard system, learning roadmap tracker, TIL (Today I
              Learned) log, code snippet library, bug journal, concept mastery tracking,
              productivity heatmap, AI-powered code explanation, AI flashcard generation,
              and learning intelligence analytics.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any feature at any
              time with reasonable notice. We will not be liable to you or any third party
              for such changes.
            </p>
          </Section>

          <Section title="2. Accounts">
            <p>
              You must be at least 13 years old to use Commit. By creating an account, you
              represent that you meet this requirement.
            </p>
            <p>
              You are responsible for maintaining the security of your account credentials.
              You must notify us immediately at{" "}
              <a href="mailto:cdg.solutionsph@gmail.com" className="text-[var(--accent)] hover:underline">
                cdg.solutionsph@gmail.com
              </a>{" "}
              if you suspect unauthorized access to your account. We are not liable for
              losses caused by unauthorized use of your account.
            </p>
            <p>
              You may not create more than one free account per person. Account sharing
              or selling is prohibited.
            </p>
          </Section>

          <Section title="3. Your Content">
            <p>
              You own the content you create in Commit — your TIL logs, flashcards,
              roadmaps, snippets, journal entries, and notes. We claim no intellectual
              property rights over your content.
            </p>
            <p>
              By storing content on Commit, you grant us a limited, non-exclusive license
              to host, store, and display your content solely to provide the service to
              you. We will not use your content for training AI models without your
              explicit consent.
            </p>
            <p>
              You are solely responsible for the content you create. You must not store
              content that is illegal, infringes third-party rights, or violates these Terms.
            </p>
          </Section>

          <Section title="4. AI Features">
            <p>
              Commit includes AI-powered features (AI Code Explainer, AI Auto-Cards, and
              AI Learning Intelligence) powered by Anthropic&apos;s Claude API.
            </p>
            <p>
              When you use AI features, the text you submit is sent to Anthropic for
              processing. You agree to Anthropic&apos;s{" "}
              <a
                href="https://www.anthropic.com/legal/usage-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                usage policies
              </a>
              {" "}in addition to these Terms. Do not submit sensitive personal information,
              secrets, API keys, or confidential business data to AI features.
            </p>
            <p>
              AI-generated content is provided &quot;as is.&quot; It may be inaccurate, incomplete,
              or misleading. Do not rely on AI explanations for production-critical
              decisions without independent verification.
            </p>
            <p>
              AI features are available on the Pro and Teams plans. Usage is subject to
              fair use limits. Excessive automated usage that degrades the service for
              other users may result in rate limiting or account suspension.
            </p>
          </Section>

          <Section title="5. Payments & Subscriptions">
            <Subsection title="Plans">
              <p>
                Commit offers a Free plan and paid Pro and Teams plans. Paid plans are
                billed monthly or annually as selected at checkout.
              </p>
            </Subsection>
            <Subsection title="Payment processing">
              <p>
                Philippine customers are billed through PayMongo. International customers
                are billed through Paddle. By subscribing, you authorize recurring charges
                to your payment method at the frequency you select.
              </p>
            </Subsection>
            <Subsection title="Refunds">
              <p>
                We offer a 7-day refund on first-time purchases of a paid plan if you are
                not satisfied. After 7 days, payments are non-refundable except where
                required by applicable law. To request a refund, contact{" "}
                <a href="mailto:cdg.solutionsph@gmail.com" className="text-[var(--accent)] hover:underline">
                  cdg.solutionsph@gmail.com
                </a>{" "}
                within the refund window.
              </p>
            </Subsection>
            <Subsection title="Cancellation">
              <p>
                You may cancel your subscription at any time from your account settings.
                Cancellation takes effect at the end of the current billing period; you
                retain Pro/Teams access until then. We do not issue prorated refunds for
                mid-period cancellations.
              </p>
            </Subsection>
            <Subsection title="Price changes">
              <p>
                We may change pricing with 30 days&apos; notice. Price changes will not apply
                to your current billing period.
              </p>
            </Subsection>
          </Section>

          <Section title="6. Acceptable Use">
            <p>You agree not to:</p>
            <ul>
              <li>Use Commit for any unlawful purpose or in violation of any applicable law</li>
              <li>Attempt to probe, scan, or test the security or vulnerabilities of our systems</li>
              <li>Scrape, crawl, or harvest user data or content from Commit</li>
              <li>Reverse engineer, decompile, or disassemble any part of the service</li>
              <li>Circumvent authentication, access controls, or usage limits</li>
              <li>Use the AI features to generate harmful, abusive, or illegal content</li>
              <li>Impersonate another person or organization</li>
              <li>Resell or sublicense access to Commit without our written permission</li>
              <li>Use Commit to compete directly with us or to build a substantially similar product</li>
            </ul>
            <p>
              Violation of these rules may result in immediate account suspension or
              termination without refund.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              Commit, its design, logo, branding, and all product code are owned by
              Adrian Salinas and protected by copyright law. Nothing in these Terms grants
              you any rights to use our trademarks or branding without written permission.
            </p>
            <p>
              Feedback, feature suggestions, or bug reports you share with us may be used
              to improve Commit without compensation or attribution to you.
            </p>
          </Section>

          <Section title="8. Availability & Warranties">
            <p>
              We aim for high availability but do not guarantee uninterrupted service.
              Planned maintenance will be announced when feasible. We will use reasonable
              efforts to notify you of significant downtime in advance.
            </p>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF
              ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE
              FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN
              CONNECTION WITH YOUR USE OF COMMIT.
            </p>
            <p>
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING UNDER THESE TERMS SHALL
              NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              You may close your account at any time from account settings or by emailing
              us. We may suspend or terminate your account if you violate these Terms,
              if required by law, or if your account is inactive for more than 24 months
              on the Free plan.
            </p>
            <p>
              Upon termination, your right to use Commit ceases immediately. Sections on
              intellectual property, limitation of liability, and governing law survive
              termination.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms are governed by the laws of the Republic of the Philippines,
              without regard to conflict of law provisions. Any disputes shall be resolved
              in the courts of Manila, Philippines, except where prohibited by applicable
              consumer protection law in your jurisdiction.
            </p>
          </Section>

          <Section title="12. Changes to These Terms">
            <p>
              We may update these Terms from time to time. We will notify you of material
              changes at least 14 days before they take effect, via email or a prominent
              notice in the dashboard. Continued use of Commit after the effective date
              of revised Terms constitutes your acceptance.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:cdg.solutionsph@gmail.com" className="text-[var(--accent)] hover:underline">
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
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[var(--accent)]">Terms</Link>
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
        }
        .prose-commit li {
          margin-bottom: 0.5rem;
        }
        .prose-commit strong {
          color: var(--text-primary);
          font-weight: 600;
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
