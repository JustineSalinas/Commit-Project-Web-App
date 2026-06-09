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
  {
    q: "Is Commit a coding tutorial platform?",
    a: "No. Commit doesn't teach you to code — it helps you learn better while you do. Think of it as infrastructure around your learning: structured sessions, retention tools, and a record of your growth. Bring your own resources.",
  },
  {
    q: "How is this different from Notion or Obsidian?",
    a: "Notion and Obsidian are blank canvases. Commit is purpose-built for developer learning workflows: a Pomodoro timer that ends with a structured prompt, SM-2 flashcard scheduling, concept mastery tracking, and a bug journal — all connected.",
  },
  {
    q: "Do I need to use the Pomodoro technique?",
    a: "It helps, but it's not required. The 25-minute session is the default trigger for the Commit Prompt and TIL log. You can adjust session length to match your flow.",
  },
  {
    q: "How does spaced repetition work?",
    a: "Commit uses the SM-2 algorithm — the same one behind Anki — to schedule flashcard reviews. Rate each card after review and the algorithm calculates the optimal next review date based on your confidence.",
  },
  {
    q: "What AI features are included?",
    a: "Pro tier includes the AI Code Explainer powered by Claude. Paste any code, choose a depth level (5-year-old to senior dev), and get a plain-language explanation designed for learning, not just debugging.",
  },
  {
    q: "Is the free tier truly free?",
    a: "Yes. No credit card required. Free includes unlimited Pomodoro sessions, TIL logging, flashcards, and up to 3 roadmaps. Upgrade to Pro for AI features, unlimited roadmaps, and advanced analytics.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  useScrollReveal();

  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const magneticCta = useMagnetic(0.28);
  const heroSpotlight = useSpotlight();
  const heroMock = useTilt(6);
  const pricingRef1 = useSpotlight();
  const pricingRef2 = useSpotlight();
  const pricingRef3 = useSpotlight();

  const stat1 = useCounter(11);
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
              11 tools. One workspace.
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
            <h2 className="reveal stagger-1 font-display text-4xl md:text-[52px] font-bold tracking-tight max-w-xl leading-tight">
              Every tool your
              <br />
              learning needs
            </h2>
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

            {/* AI Explainer */}
            <div className="reveal stagger-2 md:col-span-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 spotlight-card hover:border-[var(--border-muted)] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-4">
                <Cpu size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                AI Code Explainer
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Paste any code. Choose depth — 5-year-old to senior dev.
                Powered by Claude.
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
                Use → Can Teach.
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
            { r: stat1.ref, c: stat1.count, suffix: "", label: "Learning tools in one workspace" },
            { r: stat2.ref, c: stat2.count, suffix: " min", label: "Proven focus session length" },
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
      <section className="py-32 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[40fr_60fr] gap-16">
          <div>
            <h2 className="reveal font-display text-4xl font-bold tracking-tight">
              Questions worth
              <br />
              asking.
            </h2>
          </div>

          <div className="divide-y divide-[var(--border)]">
            {FAQS.map(({ q, a }, i) => (
              <div key={q} className={`reveal stagger-${(i % 3) + 1}`}>
                <button
                  className="flex items-start justify-between w-full py-6 text-left gap-4 group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === i ? "300px" : "0px",
                    opacity: openFaq === i ? 1 : 0,
                  }}
                >
                  <p className="pb-6 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {a}
                  </p>
                </div>
              </div>
            ))}
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
