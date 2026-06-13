"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  Timer,
  BookOpen,
  Brain,
  Map,
  Star,
  Bug,
  ChevronDown,
  Check,
  Menu,
  ArrowRight,
  Flame,
  BarChart2,
  Lightbulb,
  Target,
  Cpu,
  TrendingUp,
  Users,
  Pause,
  Play,
  Zap,
  LineChart,
  GraduationCap,
} from "lucide-react";

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    // Don't gate content when page loads in a background tab —
    // the IntersectionObserver won't fire and sections stay blank.
    if (document.visibilityState === "hidden") {
      // If the tab later becomes visible, just show everything.
      const handleVisible = () => {
        if (document.visibilityState === "visible") {
          els.forEach((el) => el.classList.add("is-visible"));
          document.removeEventListener("visibilitychange", handleVisible);
        }
      };
      document.addEventListener("visibilitychange", handleVisible);
      return () => document.removeEventListener("visibilitychange", handleVisible);
    }

    document.documentElement.classList.add("animations-loaded");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("animations-loaded");
    };
  }, []);
}

function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0px,0px)";
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);
  return ref;
}

function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove as EventListener);
    return () => el.removeEventListener("mousemove", onMove as EventListener);
  }, [onMove]);
  return ref;
}

function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * max * 2}deg) rotateX(${
        -py * max * 2
      }deg) scale3d(1.02,1.02,1.02)`;
    },
    [max]
  );
  const onLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);
  return ref;
}

function useCounter(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (reducedMotion) {
            setCount(target);
            return;
          }
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { count, ref };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const HEATMAP_INTENSITIES = [
  2, 0, 1, 3, 4, 2, 0, 1, 3, 4, 2, 1, 0, 3, 4, 2, 1, 3, 0, 4,
  1, 3, 2, 0, 4, 1, 3, 0, 2, 4, 3, 1, 0, 2, 4, 3, 1, 2, 0, 4,
  0, 2, 4, 1, 3, 0, 2, 3, 1, 4, 2, 0, 3, 4, 1, 2, 0, 3, 1, 4,
  3, 1, 2, 4, 0, 3, 1, 4, 2, 0, 1, 3, 4, 2, 0, 1, 3, 2, 4, 0,
  4, 2, 0, 3, 1, 4, 2, 1, 3, 0, 4, 2, 3, 1, 0, 4, 2, 3, 0, 1,
  1, 4, 0, 2, 3, 1, 4, 0, 3, 2, 1, 4, 0, 2, 3, 1, 4, 0, 2, 3,
];

// 7 rows (Mon–Sun) × 24 cols (weeks, oldest→newest)
const HEATMAP_GRID: number[][] = [
  [0,1,0,2,1,0,1,2,0,3,1,2,0,1,3,2,1,3,2,4,3,4,3,4],
  [1,0,1,0,2,1,3,0,1,2,3,1,2,0,1,3,2,4,3,2,4,3,4,4],
  [0,2,0,1,0,2,1,3,2,0,1,2,3,1,2,1,3,2,1,3,4,2,4,3],
  [2,1,2,0,1,0,2,1,0,1,2,0,1,2,3,2,1,3,4,3,2,4,3,4],
  [1,0,1,2,0,1,0,2,3,1,0,2,1,3,2,4,3,2,4,3,4,3,4,4],
  [0,0,1,0,1,0,1,0,2,1,1,0,2,1,0,2,1,2,3,2,3,4,3,4],
  [0,0,0,1,0,0,1,0,0,1,0,1,0,1,2,1,2,1,2,3,2,3,4,3],
];

const heatColor = (v: number) => {
  if (v === 0) return "var(--bg-elevated)";
  if (v === 1) return "rgba(0,255,170,0.15)";
  if (v === 2) return "rgba(0,255,170,0.38)";
  if (v === 3) return "rgba(0,255,170,0.62)";
  return "rgba(0,255,170,0.92)";
};

function LiveTimer({ compact = false }: { compact?: boolean }) {
  const [seconds, setSeconds] = useState(24 * 60 + 15);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : 25 * 60)),
      1000
    );
    return () => clearInterval(id);
  }, [running]);
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");

  if (compact) {
    return (
      <span className="font-mono text-[22px] font-bold text-[var(--text-primary)] timer-pulse tabular-nums leading-none">
        {m}:{s}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-3xl font-bold text-[var(--accent)] timer-pulse tabular-nums">
        {m}:{s}
      </span>
      <button
        onClick={() => setRunning((r) => !r)}
        className="p-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
      >
        {running ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
}

function BentoFlashcard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="perspective-1000 cursor-pointer w-full"
      style={{ height: "130px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="transform-style-3d relative w-full h-full"
        style={{
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="backface-hidden absolute inset-0 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] flex flex-col justify-between p-4">
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
            Question
          </span>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            What is the time complexity of binary search?
          </p>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">
            tap to reveal →
          </span>
        </div>
        <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-xl border border-[var(--accent)]/30 bg-[var(--bg-elevated)] flex flex-col justify-between p-4">
          <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest">
            Answer
          </span>
          <p className="text-sm font-bold text-[var(--text-primary)] font-mono">
            O(log n)
          </p>
          <div className="flex gap-2">
            {["Again", "Hard", "Good", "Easy"].map((l, i) => (
              <button
                key={l}
                className={`text-[9px] px-2 py-0.5 rounded-md font-mono ${
                  i === 2
                    ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40"
                    : "bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border)]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const phpFormat = (n: number) =>
  n === 0 ? "0" : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const toUSD = (php: number) =>
  php === 0 ? "0" : Math.round(php / 56).toString();

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRICING_PLANS = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "For developers starting their learning journey.",
    features: [
      "Unlimited Pomodoro sessions",
      "TIL daily log",
      "Up to 3 roadmaps",
      "50 code snippets",
      "Spaced repetition flashcards",
      "Bug journal",
      "Community support",
    ],
    cta: "Get started free",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: { monthly: 899, annual: 719 },
    description: "For developers serious about retention and growth.",
    features: [
      "Everything in Free",
      "Unlimited roadmaps",
      "Unlimited snippets",
      "AI Code Explainer (Claude)",
      "Advanced heatmap analytics",
      "Export to PDF / Markdown",
      "Concept mastery tracking",
      "Priority support",
      "Early access to features",
    ],
    cta: "Start Pro",
    href: "/sign-up?plan=pro",
    highlighted: true,
  },
  {
    name: "Teams",
    price: { monthly: 4499, annual: 3599 },
    description: "For bootcamps and study groups, up to 10 seats.",
    features: [
      "Everything in Pro, up to 10 seats",
      "Shared roadmap templates",
      "Team productivity heatmap",
      "Admin dashboard",
      "Member progress visibility",
      "Priority onboarding call",
      "SLA support",
      "Custom integrations",
    ],
    cta: "Talk to us",
    href: "/sign-up?plan=teams",
    highlighted: false,
  },
];

const FAQS = [
  // ── Getting Started ──────────────────────────────────────────────
  {
    category: "Getting Started",
    q: "What exactly is Commit, in one sentence?",
    a: "Commit is a closed learning loop for developers: you run a 25-minute focused session, write what you learned, AI generates flashcards from your notes, and spaced repetition schedules the review at the exact moment your brain would otherwise forget — all inside one workspace.",
    impact: "Every session leaves a permanent trace. Six months in, you have a searchable record of every concept you've ever touched — not a graveyard of half-read tabs and forgotten Notion pages.",
  },
  {
    category: "Getting Started",
    q: "Is this for beginners, mid-level, or senior engineers?",
    a: "All three, for different reasons. Beginners use it to build structured habits and stop bouncing between tutorials without retaining anything. Mid-level engineers use it to close knowledge gaps and accelerate toward senior-level topics. Senior engineers use it to onboard new stacks, prep for system design interviews, or build a written record of the mentoring and debugging insights that usually disappear in Slack threads.",
    impact: "The tools adapt to your level. A junior's roadmap looks nothing like a staff engineer's, but the retention loop — session → log → review — works the same regardless of experience.",
  },
  {
    category: "Getting Started",
    q: "Walk me through what a real 30-minute Commit session looks like.",
    a: "Start a 25-minute Pomodoro and link it to a roadmap milestone (e.g., 'React hooks — useEffect dependencies'). Work on your topic — code, docs, a video, anything. When the timer ends, Commit shows one prompt: 'What did you learn?' Write 2–4 sentences in your own words. On Pro, AI Auto-Cards reads that entry and generates 3–6 optimally worded flashcards. Those cards join your spaced repetition queue with SM-2 scheduling. That's the whole loop — 25 minutes of work plus 5 minutes of capture.",
    impact: "You go from 'I read about useEffect today' to 'I have a card due in 3 days that asks exactly the thing I struggled to articulate.' That 5-minute gap is where most developer knowledge permanently disappears.",
  },
  {
    category: "Getting Started",
    q: "I already use Notion / Obsidian. Why isn't that enough?",
    a: "Notion and Obsidian are blank canvases — great for storage, not for retention. They don't end each session with a structured learning prompt, don't schedule review at scientifically optimal intervals, don't track which concepts you've actually internalized versus just written down, and don't connect your notes to a spaced repetition queue. Commit doesn't replace your note-taking app — it replaces the forgetting that happens after you close it.",
    impact: "The problem isn't where you store your notes. It's that nobody schedules re-reading them at the right time. Commit handles the scheduling automatically.",
  },
  // ── Learning & Retention ─────────────────────────────────────────
  {
    category: "Learning & Retention",
    q: "Why is spaced repetition genuinely better than re-reading my notes?",
    a: "Re-reading feels productive but produces weak retention — you're recognizing familiar material, not retrieving it from memory. Retrieval practice (actively recalling an answer before seeing it) is consistently the highest-leverage study technique in cognitive science research. Spaced repetition combines retrieval with optimal timing: reviews are scheduled to hit right before you'd forget, which forces your brain to reconstruct the memory each time. Commit uses the SM-2 algorithm — the same one behind Anki — and generates the cards from your own session notes so you're always reviewing in your own words.",
    impact: "The main reason developers don't use Anki isn't skepticism — it's that making cards from scratch is tedious. AI Auto-Cards removes that bottleneck entirely.",
  },
  {
    category: "Learning & Retention",
    q: "How does the Bug Journal actually make me a better developer over time?",
    a: "When you hit a bug, you log: the error message, what you tried, what fixed it, and the root cause. Commit stores this with syntax-highlighted code. Six months later when you hit the same class of error — and you will — you search your journal and find your own fix in your own words. Over time, patterns emerge: if you're logging ten TypeScript type errors in a month, that's a signal to close a foundational gap rather than continue patching symptoms.",
    impact: "The average developer Googles the same class of error 4–6 times before it finally sticks. One well-logged bug journal entry ends that loop permanently.",
  },
  {
    category: "Learning & Retention",
    q: "What is the Feynman-based Concept Mastery scale and why is it more honest than a checklist?",
    a: "Standard checklists are binary — done or not done. Concept Mastery uses four levels: 'Heard Of' → 'Can Explain It Simply' → 'Can Use It in Code' → 'Can Teach It.' The distinction is meaningful: having written a closure doesn't mean you can explain why closures matter, and being able to explain doesn't mean you'd use them correctly under interview pressure. Commit tracks which level each concept is at across your roadmap so you have an honest picture of your actual knowledge state — not an optimistic one.",
    impact: "Developers chronically overestimate concepts they've used but never explained. The mastery scale makes that gap visible — which is the first step to closing it before an interview does.",
  },
  // ── AI Features ──────────────────────────────────────────────────
  {
    category: "AI Features",
    q: "What are the three AI features and what specific problem does each solve?",
    a: "AI Code Intelligence: paste any code, select depth (ELI5 → beginner → intermediate → senior dev), get a plain-language explanation. It also flags related concepts you haven't reviewed recently as knowledge gaps. AI Auto-Cards: paste your TIL entry or session notes, get 3–8 question/answer pairs generated and immediately queued for spaced repetition — no manual card writing. Learning Intelligence: analyzes your mastery data to surface at-risk concepts (things you're forgetting faster than you're reinforcing), predict time-to-mastery per roadmap milestone, and compute an interview readiness score per tech stack based on your actual review history.",
    impact: "Each feature targets a different failure mode: Code Intelligence fixes shallow understanding, Auto-Cards removes the creation bottleneck, and Learning Intelligence fixes the 'I don't know what I don't know' problem.",
  },
  {
    category: "AI Features",
    q: "Do AI Auto-Cards generate quality flashcards, or will I need to rewrite everything?",
    a: "Quality scales directly with input specificity. 'Learned about hooks today' produces shallow cards. 'useCallback prevents child re-renders by memoizing the function reference — critical when the child uses React.memo, because React.memo does a shallow props comparison and a new function reference always fails that check' produces precise, testable cards. The generator is tuned for active recall — it creates question/answer pairs designed for retrieval, not recognition. You review generated cards before they enter your queue and can edit or delete any of them.",
    impact: "Rule of thumb: write your TIL entry as if explaining the concept to a junior dev who asked why it matters. That specificity produces the best cards — and is also the most effective active learning technique on its own.",
  },
  {
    category: "AI Features",
    q: "Is my code or session content used to train AI models?",
    a: "No. Content you submit to AI features is sent to Anthropic's Claude API for real-time processing only. Anthropic does not use API inputs for model training under their current API terms. We do not use your content to train any models ourselves. Your TIL entries, code snippets, bug journal, and session notes are stored in our database and belong entirely to you — exportable and deletable from Settings at any time.",
    impact: "You can safely paste proprietary work code for explanations without worrying about it surfacing in a competitor's AI output or public model responses.",
  },
  // ── Pricing & Account ────────────────────────────────────────────
  {
    category: "Pricing & Account",
    q: "What does the free plan include — is anything meaningful paywalled?",
    a: "Free includes: unlimited Pomodoro sessions, TIL daily log, bug journal, spaced repetition flashcards (manual creation), concept mastery tracking, up to 3 learning roadmaps, 50 code snippets, and the full productivity heatmap. The core learning loop — session → log → review — is completely functional on free. Pro adds: all three AI features (Code Intelligence, Auto-Cards, Learning Intelligence), unlimited roadmaps, unlimited snippets, advanced analytics, and PDF/Markdown export. Teams adds shared roadmaps, admin dashboard, and member progress visibility.",
    impact: "We want you to build the habit before asking you to pay for acceleration. The free plan is intentionally generous — it is not a 14-day trial.",
  },
  {
    category: "Pricing & Account",
    q: "What happens to my data if I downgrade or delete my account?",
    a: "If you downgrade from Pro to Free, every piece of content you created is preserved — TIL logs, flashcards, roadmaps, snippets, and bug journal entries all stay intact. You lose access to AI features and higher limits, nothing else. If you delete your account, your data is permanently removed within 30 days. Before deleting, you can export everything from the Settings page in JSON format (for programmatic use) or as a PDF.",
    impact: "Your knowledge base belongs to you, not us. We don't hold data hostage to retain subscribers.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  useScrollReveal();

  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const magneticCta = useMagnetic(0.28);
  const heroSpotlight = useSpotlight();
  const heroMock = useTilt(6);
  const pricingRef1 = useSpotlight();
  const pricingRef2 = useSpotlight();
  const pricingRef3 = useSpotlight();

  const stat1 = useCounter(14);
  const stat2 = useCounter(25);
  const stat3 = useCounter(89);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const pricingSpotlights = [pricingRef1, pricingRef2, pricingRef3];

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden">

      {/* ─── Navbar ────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(9,9,11,0.85)] backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-lg font-bold tracking-widest text-[var(--accent)]">
            COMMIT_<span className="animate-blink">|</span>
          </span>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", id: "features" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Pricing", id: "pricing" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-muted)] hover:text-[var(--text-primary)] transition-all hover-fill"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-semibold hover:bg-[var(--accent-hover)] transition-colors active:scale-[0.97]"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-[var(--text-secondary)] p-1"
          >
            <Menu size={22} />
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden bg-[var(--bg-surface)] border-b border-[var(--border)] px-6 py-5 flex flex-col gap-4">
            {[
              { label: "Features", id: "features" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Pricing", id: "pricing" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-[var(--text-secondary)] text-left py-1"
              >
                {label}
              </button>
            ))}
            <Link
              href="/sign-up"
              className="text-sm py-2.5 text-center rounded-lg bg-[var(--accent)] text-black font-semibold mt-2"
            >
              Get Started Free
            </Link>
          </div>
        )}
      </header>

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        ref={heroSpotlight}
        className="spotlight-card min-h-[100dvh] flex items-center pt-16 relative overflow-hidden"
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-muted) 1px, transparent 1px), linear-gradient(90deg, var(--border-muted) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-28 w-full grid md:grid-cols-[55fr_45fr] gap-16 lg:gap-24 items-center">
          {/* Copy */}
          <div>
            <div className="hero-enter hero-d1 inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-xs text-[var(--text-muted)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-breathe inline-block" />
              14 AI-powered tools. One workspace.
            </div>

            <h1 className="hero-enter hero-d2 font-display text-[56px] md:text-[72px] lg:text-[80px] font-bold leading-[0.92] tracking-tight mb-7">
              Stop re-learning
              <br />
              <span className="text-[var(--accent)]">the same thing</span>
              <br />
              twice.
            </h1>

            <p className="hero-enter hero-d3 text-lg text-[var(--text-secondary)] leading-relaxed max-w-[480px] mb-10">
              Commit is the workspace built around how developers actually
              retain knowledge — structured focus sessions, spaced repetition,
              and a searchable record of everything you&apos;ve learned.
            </p>

            <div className="hero-enter hero-d4 flex flex-wrap items-center gap-4">
              <button
                ref={magneticCta}
                onClick={() => (window.location.href = "/sign-up")}
                className="group relative px-7 py-3.5 bg-[var(--accent)] text-black font-semibold rounded-xl transition-colors active:scale-[0.97] overflow-hidden"
                style={{ transition: "background 0.18s, transform 0.12s" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--accent-hover)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "var(--accent)")
                }
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start for free
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </span>
              </button>
              <button
                onClick={() => scrollTo("features")}
                className="px-7 py-3.5 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:border-[var(--border-muted)] hover:text-[var(--text-primary)] transition-all hover-fill"
              >
                See features
              </button>
            </div>

            <p className="hero-enter hero-d5 mt-5 text-xs text-[var(--text-muted)] font-mono">
              No credit card required — free forever
            </p>
          </div>

          {/* Dashboard mock — matches real Commit dashboard layout */}
          <div
            ref={heroMock}
            className="hero-enter hero-d6 hidden md:block"
            style={{ transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden shadow-2xl shadow-black/60">
              {/* Browser chrome */}
              <div className="h-9 flex items-center gap-2 px-4 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[10px] font-mono text-[var(--text-muted)]">
                  commit — dashboard
                </span>
              </div>

              {/* App layout: sidebar + main content */}
              <div className="flex" style={{ height: "372px" }}>
                {/* Mini icon sidebar */}
                <div className="w-10 flex-shrink-0 border-r border-[var(--border)] bg-[var(--bg-base)] flex flex-col items-center pt-3 gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[var(--accent)]/15 border border-[var(--accent)]/20 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-[1.5px] w-[9px] h-[9px]">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="rounded-[0.5px] bg-[var(--accent)]/70" />
                      ))}
                    </div>
                  </div>
                  {[Timer, BookOpen, Map, Target, Brain].map((Icon, i) => (
                    <div key={i} className="w-6 h-6 rounded-md flex items-center justify-center text-[var(--border-muted)]">
                      <Icon size={11} />
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex flex-1 gap-2.5 p-3 overflow-hidden min-w-0">
                  {/* Left column */}
                  <div className="flex-1 flex flex-col gap-2.5 min-w-0 overflow-hidden">
                    {/* Page header */}
                    <div>
                      <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">
                        Deep Work Session
                      </p>
                      <p className="text-[9px] text-[var(--text-muted)] font-mono">
                        14 day streak · Fullstack track
                      </p>
                    </div>

                    {/* Consistency Matrix */}
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]/40 p-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                          Consistency Matrix
                        </p>
                        <p className="text-[8px] font-mono text-[var(--text-muted)]">
                          2026-YTD
                        </p>
                      </div>
                      {/* 24 columns (weeks) × 7 rows (days) */}
                      <div className="flex gap-[2px]">
                        {HEATMAP_GRID[0].map((_, colIdx) => (
                          <div key={colIdx} className="flex flex-col gap-[2px]">
                            {HEATMAP_GRID.map((row, rowIdx) => (
                              <div
                                key={rowIdx}
                                className="w-[7px] h-[7px] rounded-[1px]"
                                style={{
                                  background: heatColor(row[colIdx]),
                                  animation: `cellPop 0.35s cubic-bezier(0.16,1,0.3,1) ${(colIdx * 7 + rowIdx) * 8 + 300}ms both`,
                                }}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom cards */}
                    <div className="grid grid-cols-2 gap-2 flex-1">
                      {/* Roadmap Horizon */}
                      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-base)] p-2.5 flex flex-col">
                        <p className="text-[7.5px] font-mono text-[var(--accent)] uppercase tracking-widest mb-1.5">
                          Roadmap Horizon
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] font-mono mb-2 leading-tight">
                          Fullstack Dev
                        </p>
                        <p className="text-[22px] font-mono font-bold text-[var(--text-primary)] leading-none">
                          62<span className="text-[11px] opacity-40">%</span>
                        </p>
                        <div className="mt-auto pt-2">
                          <div className="h-[3px] rounded-full bg-[var(--bg-elevated)]">
                            <div
                              className="h-full rounded-full bg-[var(--accent)] fill-progress"
                              style={{ "--progress": "62%" } as React.CSSProperties}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cognitive Mastery */}
                      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-base)] p-2.5">
                        <p className="text-[7.5px] font-mono text-[var(--accent)] uppercase tracking-widest mb-2">
                          Cognitive Mastery
                        </p>
                        <div className="space-y-1.5">
                          {[
                            { label: "Teach", pct: 42 },
                            { label: "Use", pct: 71 },
                            { label: "Explain", pct: 58 },
                            { label: "Heard", pct: 85 },
                          ].map(({ label, pct }) => (
                            <div key={label} className="flex items-center gap-1.5">
                              <span className="text-[7px] font-mono text-[var(--text-muted)] w-7 flex-shrink-0">
                                {label}
                              </span>
                              <div className="flex-1 h-[3px] rounded-full bg-[var(--bg-elevated)]">
                                <div
                                  className="h-full rounded-full bg-[var(--accent)]/60 fill-progress"
                                  style={{ "--progress": `${pct}%` } as React.CSSProperties}
                                />
                              </div>
                              <span className="text-[7px] font-mono text-[var(--text-muted)] w-5 text-right flex-shrink-0">
                                {pct}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column: Timer card */}
                  <div className="w-[108px] flex-shrink-0 rounded-xl border border-[var(--border-muted)] bg-[var(--bg-elevated)] flex flex-col items-center py-4 px-3">
                    <div className="w-full h-[2px] rounded-full bg-[var(--accent)]/20 mb-3" />
                    <p className="text-[7.5px] font-mono text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
                      Focus Active
                    </p>
                    <LiveTimer compact />
                    <div className="mt-3 mb-2 text-[8px] font-mono text-[var(--text-muted)] text-center">
                      Binary Trees
                    </div>
                    <div className="text-[7.5px] font-mono text-[var(--text-muted)] mb-4">
                      Session 2 of 4
                    </div>
                    <div className="flex items-center gap-[3px] mb-auto">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`w-[5px] h-[5px] rounded-full ${
                            i <= 2 ? "bg-[var(--accent)]" : "bg-[var(--bg-base)]"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                      <Flame size={9} className="text-[var(--warning)]" />
                      <span className="text-[8px] font-mono font-semibold text-[var(--text-primary)]">
                        14 Days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem ───────────────────────────────────────────── */}
      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[40fr_60fr] gap-16 items-start">
          <div className="md:sticky md:top-28">
            <h2 className="reveal font-display text-4xl md:text-[52px] font-bold leading-[1.05] tracking-tight">
              You learn.
              <br />
              You forget.
              <br />
              <span className="text-[var(--text-muted)]">You re-learn.</span>
            </h2>
          </div>

          <div className="divide-y divide-[var(--border)]">
            {[
              {
                icon: <TrendingUp size={20} />,
                title: "Momentum fades after week two",
                desc: "Starting a new topic feels great. Then enthusiasm wears off, sessions get shorter, gaps grow longer. Without structure, learning stalls before it sticks.",
              },
              {
                icon: <Brain size={20} />,
                title: "Learning without retention",
                desc: "You read the docs, follow the tutorial, then draw a blank two weeks later. Without a review system, knowledge evaporates before it can compound.",
              },
              {
                icon: <BarChart2 size={20} />,
                title: "No record of growth",
                desc: "You can't see how far you've come. Without visible progress, it's hard to stay motivated — or explain your skills in an interview.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className={`reveal stagger-${i + 1} group flex gap-6 py-8 cursor-default`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all duration-300">
                  {icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Bento ────────────────────────────────────── */}
      <section id="features" className="py-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="reveal font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-4">
              Features
            </p>
            <h2 className="reveal stagger-1 font-display text-4xl md:text-[52px] font-bold tracking-tight max-w-2xl leading-tight">
              AI-powered tools built for
              <br />
              <span className="text-[var(--accent)]">how developers actually learn.</span>
            </h2>
            <p className="reveal stagger-2 mt-5 text-base text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Not a note-taking app. Not a tutorial site. A closed loop — from focused session
              to spaced review to measurable mastery — with AI accelerating every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Timer — large */}
            <div className="reveal md:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
                  <Timer size={20} />
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest border border-[var(--border)] rounded-full px-2.5 py-0.5">
                  Live
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Pomodoro Focus Timer
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-sm">
                25-minute sessions linked to your roadmap milestones. Every
                session ends with a structured learning prompt.
              </p>
              <LiveTimer />
            </div>

            {/* Flashcards */}
            <div className="reveal stagger-1 md:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <Star size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Spaced Repetition
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                SM-2 algorithm — same as Anki — schedules each card at the
                optimal review interval.
              </p>
              <BentoFlashcard />
            </div>

            {/* Heatmap */}
            <div className="reveal stagger-2 md:col-span-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <BarChart2 size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Productivity Heatmap
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                GitHub-style activity graph of every focus session.
              </p>
              <div className="flex gap-[3px] flex-wrap">
                {HEATMAP_INTENSITIES.slice(0, 70).map((v, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-[2px]"
                    style={{ background: heatColor(v) }}
                  />
                ))}
              </div>
            </div>

            {/* AI Code Intelligence */}
            <div className="reveal stagger-2 md:col-span-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
                  <Cpu size={20} />
                </div>
                <span className="text-[10px] font-mono text-[var(--accent)] border border-[var(--accent)]/30 rounded-full px-2.5 py-0.5 bg-[var(--accent)]/5">
                  Claude
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                AI Code Intelligence
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Paste any code. Get an explanation at your depth — from
                5-year-old to senior dev. Also surfaces knowledge gaps
                and suggests what to review next.
              </p>
              <div className="rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] p-3 font-mono text-xs space-y-1.5">
                <p className="text-[var(--text-muted)]">
                  <span className="text-[var(--accent)]">{">"}</span> explain
                  useCallback at depth: beginner
                </p>
                <p className="text-[var(--text-secondary)]">
                  useCallback is like a note that tells React to reuse a
                  function instead of recreating it...
                </p>
                <p className="text-[var(--text-muted)] pt-1 border-t border-[var(--border)]">
                  <span className="text-[var(--warning)]">gap:</span> You haven&apos;t reviewed closures yet
                </p>
              </div>
            </div>

            {/* Code Journal */}
            <div className="reveal stagger-3 md:col-span-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <BookOpen size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Code Journal</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Rich text notes with Shiki syntax highlighting. Every
                session&apos;s learning, searchable forever.
              </p>
            </div>

            {/* Roadmap */}
            <div className="reveal stagger-1 md:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <Map size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Roadmap Tracker</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                Personal learning paths with milestones, dependencies, and
                progress tracking.
              </p>
              <div className="space-y-2.5">
                {[
                  { label: "Algorithms Fundamentals", pct: 67, done: true },
                  { label: "System Design Basics", pct: 34, done: false },
                  { label: "TypeScript Advanced", pct: 12, done: false },
                ].map(({ label, pct, done }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        done
                          ? "border-[var(--accent)] bg-[var(--accent)]/20"
                          : "border-[var(--border-muted)]"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span
                          className={`truncate ${
                            done
                              ? "text-[var(--text-muted)]"
                              : "text-[var(--text-secondary)]"
                          }`}
                        >
                          {label}
                        </span>
                        <span className="text-[var(--text-muted)] font-mono ml-2">
                          {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--bg-elevated)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TIL */}
            <div className="reveal stagger-2 md:col-span-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <Lightbulb size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">TIL Daily Log</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Auto-prompted after every session. Build a searchable record
                of every insight.
              </p>
            </div>

            {/* Bug Journal */}
            <div className="reveal stagger-3 md:col-span-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <Bug size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bug Journal</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Structured error tracking with root cause analysis. Turn
                every bug into a lesson.
              </p>
            </div>

            {/* Concept Mastery */}
            <div className="reveal stagger-4 md:col-span-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <Brain size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Concept Mastery
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Feynman 4-level self-assessment: Heard Of → Can Explain → Can
                Use → Can Teach. AI suggests when you&apos;re ready to level up.
              </p>
              <div className="flex gap-1.5">
                {["Heard Of", "Can Explain", "Can Use", "Can Teach"].map(
                  (level, i) => (
                    <div
                      key={level}
                      title={level}
                      className={`flex-1 h-1.5 rounded-full ${
                        i <= 2
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--bg-elevated)] border border-[var(--border)]"
                      }`}
                    />
                  )
                )}
              </div>
            </div>

            {/* AI Auto-Cards — new */}
            <div className="reveal stagger-1 md:col-span-4 rounded-2xl border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--accent)]/40 transition-colors relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, var(--accent), transparent 70%)",
                }}
              />
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
                  <Zap size={20} />
                </div>
                <span className="text-[10px] font-mono text-[var(--accent)] border border-[var(--accent)]/30 rounded-full px-2.5 py-0.5 bg-[var(--accent)]/5">
                  New
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Auto-Cards</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                After every session, paste your notes. AI generates perfectly
                worded flashcards and drops them straight into your review
                queue — no manual card writing.
              </p>
              <div className="rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] p-3 space-y-2">
                <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                  Generated from your TIL
                </p>
                {[
                  { q: "What does useCallback prevent?", due: "2d" },
                  { q: "When does memoization hurt perf?", due: "5d" },
                ].map(({ q, due }) => (
                  <div
                    key={q}
                    className="flex items-center justify-between gap-3 py-1.5 border-t border-[var(--border)]"
                  >
                    <p className="text-xs text-[var(--text-secondary)] flex-1 min-w-0 truncate">
                      {q}
                    </p>
                    <span className="text-[10px] font-mono text-[var(--accent)] flex-shrink-0">
                      due {due}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Intelligence — new */}
            <div className="reveal stagger-2 md:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
                  <LineChart size={20} />
                </div>
                <span className="text-[10px] font-mono text-[var(--accent)] border border-[var(--accent)]/30 rounded-full px-2.5 py-0.5 bg-[var(--accent)]/5">
                  New
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Learning Intelligence</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-5">
                AI analyzes your session patterns and mastery levels to predict
                time-to-mastery, surface at-risk concepts, and recommend what
                to focus on next. Know exactly where you stand.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Mastery velocity", value: "+12% this week", color: "var(--success)" },
                  { label: "At-risk concepts", value: "3 need review", color: "var(--warning)" },
                  { label: "Interview readiness", value: "React: 74%", color: "var(--accent)" },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
                  >
                    <span className="text-xs text-[var(--text-muted)] font-mono">{label}</span>
                    <span className="text-xs font-semibold font-mono" style={{ color }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Readiness — new */}
            <div className="reveal stagger-3 md:col-span-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interview Readiness</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Real-time interview score per tech stack — computed from your
                actual mastery state, not self-assessment.
              </p>
              <div className="space-y-2.5">
                {[
                  { label: "React", pct: 74 },
                  { label: "Node.js", pct: 58 },
                  { label: "SQL", pct: 41 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-[var(--text-muted)]">{label}</span>
                      <span className="text-[var(--accent)]">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--bg-elevated)]">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-32 border-t border-[var(--border)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="reveal font-display text-4xl md:text-[52px] font-bold tracking-tight mb-20 max-w-lg leading-tight">
            One loop.
            <br />
            Infinite retention.
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                num: "01",
                icon: <Target size={24} />,
                title: "Set your session",
                desc: "Pick a roadmap milestone, set your focus intent. The timer starts — no distractions, just the work.",
              },
              {
                num: "02",
                icon: <Timer size={24} />,
                title: "Deep work",
                desc: "25 minutes of focused work. Intrusive thoughts? Drop them in the Distraction Dump — they won't vanish, just wait.",
              },
              {
                num: "03",
                icon: <BookOpen size={24} />,
                title: "Commit",
                desc: "Session ends. One prompt: 'What did you learn?' Your answer auto-schedules a flashcard review. Knowledge stacks.",
              },
            ].map(({ num, icon, title, desc }, i) => (
              <div
                key={title}
                className={`reveal stagger-${i + 1} flex gap-5`}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--accent)]">
                  {icon}
                </div>
                <div>
                  <span className="font-mono text-xs text-[var(--text-muted)] block mb-2">
                    {num}
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats ─────────────────────────────────────────────── */}
      <section className="border-t border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          {[
            { r: stat1.ref, c: stat1.count, suffix: "", label: "AI-powered tools in one workspace" },
            { r: stat2.ref, c: stat2.count, suffix: " min", label: "Scientifically optimal deep work session" },
            { r: stat3.ref, c: stat3.count, suffix: "%", label: "Retention improvement with spaced repetition" },
          ].map(({ r, c, suffix, label }, i) => (
            <div
              key={label}
              className={`reveal stagger-${i + 1} px-8 py-14 text-center`}
            >
              <div className="font-display text-5xl font-bold text-[var(--accent)] mb-2 tabular-nums">
                <span ref={r}>{c}</span>
                {suffix}
              </div>
              <p className="text-sm text-[var(--text-secondary)] max-w-[200px] mx-auto leading-relaxed">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pricing ───────────────────────────────────────────── */}
      <section id="pricing" className="py-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="reveal font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-4">
            Pricing
          </p>

          <div className="reveal stagger-1 flex items-end justify-between flex-wrap gap-6 mb-16">
            <h2 className="font-display text-4xl md:text-[52px] font-bold tracking-tight max-w-xs leading-tight">
              Start free.
              <br />
              Scale when ready.
            </h2>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)]">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  !isAnnual
                    ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isAnnual
                    ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                Annual
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] font-mono border border-[var(--accent)]/30">
                  −20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PRICING_PLANS.map((plan, i) => (
              <div
                key={plan.name}
                ref={pricingSpotlights[i]}
                className={`reveal stagger-${i + 1} spotlight-card relative rounded-2xl border p-7 flex flex-col transition-colors ${
                  plan.highlighted
                    ? "border-[var(--accent)]/40 bg-[var(--bg-surface)]"
                    : "border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-muted)]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-px left-8 px-4 py-1 rounded-b-xl bg-[var(--accent)] text-black text-[10px] font-bold uppercase tracking-widest font-mono">
                    Most popular
                  </div>
                )}

                <div className="mb-6 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {plan.name === "Teams" && (
                      <Users
                        size={16}
                        className="text-[var(--text-muted)]"
                      />
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[var(--text-muted)]">₱</span>
                    <span className="font-display text-5xl font-bold">
                      {phpFormat(isAnnual ? plan.price.annual : plan.price.monthly)}
                    </span>
                  </div>
                  {plan.price.monthly > 0 ? (
                    <span className="text-sm text-[var(--text-muted)] font-mono">
                      / month
                    </span>
                  ) : (
                    <span className="text-sm text-[var(--text-muted)]">
                      forever
                    </span>
                  )}
                  {plan.price.monthly > 0 && (
                    <p className="text-[11px] text-[var(--text-muted)] font-mono mt-1">
                      ≈ ${toUSD(isAnnual ? plan.price.annual : plan.price.monthly)} USD / mo
                    </p>
                  )}
                  {isAnnual && plan.price.annual > 0 && (
                    <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                      billed ₱{phpFormat(plan.price.annual * 12)} / year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                    >
                      <Check
                        size={14}
                        className="text-[var(--accent)] mt-0.5 flex-shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] hover-fill ${
                    plan.highlighted
                      ? "bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)]"
                      : "border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-muted)]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="py-32 border-t border-[var(--border)] relative overflow-hidden">
        {/* Dot-grid atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(250,250,250,0.035) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Accent glow top-right */}
        <div
          className="absolute -top-32 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--accent), transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Heading row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="reveal font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-5">
                // FAQ
              </p>
              <h2 className="reveal stagger-1 font-display text-4xl md:text-[52px] font-bold tracking-tight leading-[1.0]">
                Questions worth
                <br />
                <span className="text-[var(--accent)]">asking.</span>
              </h2>
            </div>
            <p className="reveal stagger-2 text-sm text-[var(--text-muted)] leading-relaxed md:text-right max-w-xs md:pb-2">
              Can&apos;t find what you need?{" "}
              <a
                href="mailto:cdg.solutionsph@gmail.com"
                className="text-[var(--accent)] hover:underline underline-offset-2"
              >
                Reach out directly.
              </a>
            </p>
          </div>

          {/* ── IDE Panel ─────────────────────────────────────── */}
          <div className="reveal stagger-3 rounded-2xl border border-[var(--border)] overflow-hidden shadow-2xl shadow-black/60">

            {/* Window chrome */}
            <div className="h-10 flex items-center gap-2 px-4 bg-[var(--bg-elevated)] border-b border-[var(--border)] select-none">
              <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57] flex-shrink-0" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E] flex-shrink-0" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#28C840] flex-shrink-0" />
              <div className="flex-1 flex items-center justify-center">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  commit — faq.md
                </span>
              </div>
            </div>

            {/* ── Desktop split view ── */}
            <div
              className="hidden md:grid"
              style={{ gridTemplateColumns: "38% 62%" }}
            >
              {/* Left — Question file tree */}
              <div className="border-r border-[var(--border)] bg-[var(--bg-surface)] flex flex-col">
                {/* File-tree header */}
                <div className="h-8 flex items-center gap-2 px-4 border-b border-[var(--border)] bg-[var(--bg-base)]/60 select-none">
                  <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-[0.15em]">
                    explorer
                  </span>
                  <span className="ml-auto text-[9px] font-mono text-[var(--text-muted)]">
                    {FAQS.length} items
                  </span>
                </div>

                {/* Question list */}
                <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
                  {FAQS.map((faq, i) => {
                    const showCat =
                      i === 0 || FAQS[i - 1].category !== faq.category;
                    return (
                      <div key={i}>
                        {/* Category header */}
                        {showCat && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-base)]/70 border-b border-[var(--border)] select-none">
                            <span className="text-[9px] font-mono text-[var(--accent)]/70 uppercase tracking-[0.18em]">
                              ▸ {faq.category}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => setOpenFaq(i)}
                          className={`group w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-[var(--border)] transition-all duration-150 outline-none border-l-2 ${
                            openFaq === i
                              ? "bg-[rgba(0,255,170,0.04)] border-l-[var(--accent)]"
                              : "border-l-transparent hover:bg-[var(--bg-elevated)] hover:border-l-[var(--border-muted)]"
                          }`}
                        >
                          <span
                            className={`font-mono text-[10px] mt-[3px] flex-shrink-0 w-5 tabular-nums transition-colors ${
                              openFaq === i
                                ? "text-[var(--accent)]"
                                : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex items-start gap-1.5 flex-1 min-w-0">
                            <span
                              className={`text-[10px] mt-[3px] flex-shrink-0 transition-colors ${
                                openFaq === i
                                  ? "text-[var(--accent)]"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {openFaq === i ? "▶" : "›"}
                            </span>
                            <span
                              className={`text-[13px] leading-snug transition-colors ${
                                openFaq === i
                                  ? "text-[var(--text-primary)] font-medium"
                                  : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                              }`}
                            >
                              {faq.q}
                            </span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right — Answer pane */}
              <div className="bg-[var(--bg-base)] flex flex-col min-h-[480px]">
                {/* Tab bar */}
                <div className="flex items-stretch border-b border-[var(--border)] h-9">
                  {/* Active tab */}
                  <div className="flex items-center gap-1.5 px-5 border-r border-[var(--border)] bg-[var(--bg-surface)] relative">
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                      style={{ borderRadius: "0 0 2px 2px" }}
                    />
                    {openFaq !== null ? (
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        <span className="text-[var(--text-muted)]/50">
                          {FAQS[openFaq].category
                            .toLowerCase()
                            .replace(" & ", "-")
                            .replace(/ /g, "-")}{" "}
                          /{" "}
                        </span>
                        q{String(openFaq + 1).padStart(2, "0")}.answer
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        select.md
                      </span>
                    )}
                  </div>
                  <div className="flex-1" />
                  {/* Language indicator */}
                  <div className="flex items-center gap-1.5 px-4 border-l border-[var(--border)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-breathe" />
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      md
                    </span>
                  </div>
                </div>

                {/* Line-number gutter + answer content */}
                <div className="flex flex-1">
                  {/* Gutter */}
                  <div className="w-10 flex-shrink-0 border-r border-[var(--border)] bg-[var(--bg-surface)]/40 flex flex-col pt-7 pb-4 select-none">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-[var(--border-muted)] text-right pr-3 leading-[1.9]"
                      >
                        {i + 1}
                      </span>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-7 overflow-y-auto custom-scrollbar">
                    {openFaq !== null ? (
                      <div key={`faq-${openFaq}`} className="faq-answer-reveal flex flex-col">
                        {/* Category breadcrumb */}
                        <p className="font-mono text-[9px] text-[var(--text-muted)]/50 uppercase tracking-widest mb-3">
                          {FAQS[openFaq].category}
                        </p>

                        {/* Markdown comment — question as heading */}
                        <p className="font-mono text-[11px] text-[var(--text-muted)] mb-5 leading-relaxed">
                          <span className="text-[var(--accent)]">#</span>{" "}
                          {FAQS[openFaq].q}
                        </p>

                        {/* Divider */}
                        <div className="flex items-center gap-3 mb-5">
                          <div className="h-px flex-1 bg-[var(--border)]" />
                          <span className="text-[9px] font-mono text-[var(--border-muted)] uppercase tracking-widest">
                            answer
                          </span>
                          <div className="h-px flex-1 bg-[var(--border)]" />
                        </div>

                        {/* Answer body */}
                        <p className="text-[14px] text-[var(--text-secondary)] leading-[1.85] mb-6">
                          {FAQS[openFaq].a}
                        </p>

                        {/* "Why this helps developers" callout */}
                        <div className="relative rounded-r-xl border border-[var(--accent)]/15 bg-[rgba(0,255,170,0.03)] p-4 overflow-hidden mb-8">
                          {/* Left accent bar */}
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)]/50 rounded-l-sm" />
                          <p className="font-mono text-[9px] text-[var(--accent)]/80 uppercase tracking-[0.18em] mb-2 pl-1">
                            → why this helps developers
                          </p>
                          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed pl-1">
                            {FAQS[openFaq].impact}
                          </p>
                        </div>

                        {/* Navigation */}
                        <div className="pt-5 border-t border-[var(--border)] flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[var(--text-muted)] tabular-nums">
                            {openFaq + 1} / {FAQS.length}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setOpenFaq(Math.max(0, (openFaq ?? 0) - 1))
                              }
                              disabled={openFaq === 0}
                              className="text-[11px] px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-muted)] disabled:opacity-25 disabled:cursor-not-allowed transition-all font-mono"
                            >
                              ← prev
                            </button>
                            <button
                              onClick={() =>
                                setOpenFaq(
                                  Math.min(
                                    FAQS.length - 1,
                                    (openFaq ?? 0) + 1
                                  )
                                )
                              }
                              disabled={openFaq === FAQS.length - 1}
                              className="text-[11px] px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-muted)] disabled:opacity-25 disabled:cursor-not-allowed transition-all font-mono"
                            >
                              next →
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-sm font-mono text-[var(--text-muted)]">
                          select a question →
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status bar — VS Code style */}
                <div className="h-7 flex items-center justify-between px-4 border-t border-[var(--border)] bg-[var(--accent)] select-none flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-mono text-black font-semibold uppercase tracking-wider">
                      COMMIT
                    </span>
                    <span className="text-[9px] font-mono text-black/60">
                      faq › {openFaq !== null ? `q${String(openFaq + 1).padStart(2, "0")}` : "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono text-black/60">
                      Ln {openFaq !== null ? openFaq * 6 + 1 : 1}, Col 1
                    </span>
                    <span className="text-[9px] font-mono text-black/60">UTF-8</span>
                    <span className="text-[9px] font-mono text-black font-semibold">
                      Markdown
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Mobile accordion ── */}
            <div className="md:hidden bg-[var(--bg-surface)] divide-y divide-[var(--border)]">
              {FAQS.map((faq, i) => {
                const showCat =
                  i === 0 || FAQS[i - 1].category !== faq.category;
                return (
                  <div key={i}>
                    {/* Category header */}
                    {showCat && (
                      <div className="px-5 py-2 bg-[var(--bg-base)]/70 border-b border-[var(--border)] select-none">
                        <span className="text-[9px] font-mono text-[var(--accent)]/70 uppercase tracking-[0.18em]">
                          ▸ {faq.category}
                        </span>
                      </div>
                    )}
                    <button
                      className={`group flex items-start gap-3.5 w-full px-5 py-5 text-left outline-none border-l-2 transition-all duration-150 ${
                        openFaq === i
                          ? "bg-[rgba(0,255,170,0.04)] border-l-[var(--accent)]"
                          : "border-l-transparent hover:bg-[var(--bg-elevated)]"
                      }`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span
                        className={`font-mono text-[10px] mt-0.5 flex-shrink-0 tabular-nums transition-colors ${
                          openFaq === i
                            ? "text-[var(--accent)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-sm font-medium leading-snug transition-colors ${
                          openFaq === i
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={15}
                        className={`flex-shrink-0 mt-0.5 transition-all duration-300 ${
                          openFaq === i
                            ? "rotate-180 text-[var(--accent)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: openFaq === i ? "600px" : "0px",
                        opacity: openFaq === i ? 1 : 0,
                      }}
                    >
                      <p className="px-5 pt-1 pb-4 pl-[52px] text-[13px] text-[var(--text-secondary)] leading-relaxed">
                        {faq.a}
                      </p>
                      {/* Impact callout — mobile */}
                      <div className="mx-5 mb-5 ml-[52px] relative rounded-r-lg border border-[var(--accent)]/15 bg-[rgba(0,255,170,0.03)] p-3 overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent)]/50" />
                        <p className="font-mono text-[8px] text-[var(--accent)]/80 uppercase tracking-[0.18em] mb-1.5 pl-1">
                          → why this helps
                        </p>
                        <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed pl-1">
                          {faq.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Mobile status bar */}
              <div className="h-8 flex items-center justify-between px-5 bg-[var(--accent)]">
                <span className="text-[9px] font-mono text-black font-semibold uppercase tracking-wider">
                  COMMIT
                </span>
                <span className="text-[9px] font-mono text-black/60">
                  {FAQS.length} questions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────── */}
      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="reveal font-display text-5xl md:text-[64px] font-bold tracking-tight leading-[0.95] mb-7">
            Stop losing
            <br />
            your learning.
          </h2>
          <p className="reveal stagger-2 text-xl text-[var(--text-secondary)] max-w-lg mx-auto mb-12 leading-relaxed">
            Every session adds to your knowledge base. Six months from now,
            you&apos;ll have a searchable record of everything you&apos;ve
            learned — and it starts today.
          </p>
          <div className="reveal stagger-3">
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-black font-bold rounded-xl hover:bg-[var(--accent-hover)] transition-colors active:scale-[0.97]"
            >
              Start building your knowledge base
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
          <p className="reveal stagger-4 mt-5 text-sm text-[var(--text-muted)] font-mono">
            No credit card required
          </p>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
            <div>
              <span className="font-display text-lg font-bold tracking-widest text-[var(--accent)]">
                COMMIT_<span className="animate-blink">|</span>
              </span>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                The developer learning workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--text-secondary)]">
              {[
                { label: "Features", action: () => scrollTo("features") },
                { label: "How It Works", action: () => scrollTo("how-it-works") },
                { label: "Pricing", action: () => scrollTo("pricing") },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {label}
                </button>
              ))}
              <Link
                href="/sign-in"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--text-muted)] font-mono">
              © 2026 Commit. Built by Adrian Salinas.
            </p>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
