"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { completeOnboarding } from "@/app/actions/crud";
import { toast } from "sonner";
import { Rocket, Code2, Layout, Sparkles, Target, CheckCircle2, Map, Briefcase } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  userName: string;
}

const TRACKS = [
  { id: "web-dev",        label: "Web Development",    desc: "HTML, CSS, JS, React, Next.js" },
  { id: "backend",        label: "Backend / APIs",      desc: "Node, Python, databases, auth" },
  { id: "cs-fundamentals",label: "CS Fundamentals",     desc: "Algorithms, data structures, theory" },
  { id: "mobile",         label: "Mobile Dev",          desc: "React Native, Swift, Android" },
  { id: "data",           label: "Data / ML",           desc: "Python, pandas, ML pipelines" },
];

const GOALS = [
  { id: "get-a-job",      label: "Get a job",           desc: "Build a portfolio and ace interviews" },
  { id: "build-project",  label: "Build a project",     desc: "Ship something real from scratch" },
  { id: "pass-bootcamp",  label: "Pass a bootcamp",     desc: "Stay on track with structured learning" },
  { id: "learn-for-fun",  label: "Learn for fun",       desc: "Curious minds just love building" },
];

export function OnboardingModal({ isOpen, onComplete, userName }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    preferredIDE: "",
    languages: [] as string[],
    workflow: "",
    learningTrack: "",
    primaryGoal: "",
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const res = await completeOnboarding(preferences);
      if (res.success) {
        toast.success("Onboarding complete! Welcome to Commit.");
      } else {
        console.warn("Bypassed database error:", res.error);
      }
    } catch (err) {
      console.warn("Bypassed unexpected error:", err);
    } finally {
      setLoading(false);
      onComplete();
    }
  };

  const stepIcon = [Rocket, Layout, Map, Target, Sparkles][step - 1];
  const StepIcon = stepIcon;

  const stepTitle = [
    `Welcome, ${userName}!`,
    "The Developer's Workspace",
    "Choose Your Learning Track",
    "What's Your Primary Goal?",
    "The Developer's Pledge",
  ][step - 1];

  const stepDesc = [
    "Commit is your secondary brain, designed to help you master your craft and track your growth as a developer.",
    "Focus timers, smart flashcards, code journals, and a roadmap tracker—all in one place.",
    "This helps us tailor your roadmap template and AI suggestions.",
    "We'll personalise your experience and first-run content around this.",
    "Before we begin, let's set the foundation for your growth.",
  ][step - 1];

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px] bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-primary)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--bg-elevated)] overflow-hidden">
          <Progress value={progress} className="h-full bg-[var(--accent)] transition-all duration-500" />
        </div>

        <DialogHeader className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-[var(--accent-muted)] text-[var(--accent)]">
              <StepIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)] tracking-wider uppercase">
              Step {step} of {totalSteps}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold">{stepTitle}</DialogTitle>
          <DialogDescription className="text-[var(--text-secondary)]">{stepDesc}</DialogDescription>
        </DialogHeader>

        <div className="py-6 min-h-[180px]">

          {/* Step 1 — Welcome */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                We're excited to have you here. This tool was built by developers, for developers, to bridge the gap between learning and doing.
              </p>
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-start gap-3">
                <Code2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                <p className="text-xs text-[var(--text-muted)]">
                  Pro-tip: Use the Pomodoro timer in the 'Focus' tab to maintain deep work sessions while logging your progress.
                </p>
              </div>
            </div>
          )}

          {/* Step 2 — Workspace Overview */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Journal", desc: "Log daily learnings", icon: <Code2 className="w-4 h-4" /> },
                { title: "Flashcards", desc: "Retain knowledge", icon: <Sparkles className="w-4 h-4" /> },
                { title: "Roadmap", desc: "Track milestones", icon: <Layout className="w-4 h-4" /> },
                { title: "Snippets", desc: "Save reusable code", icon: <Rocket className="w-4 h-4" /> }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 cursor-pointer group will-change-transform"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[var(--accent)] group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <h4 className="text-sm font-semibold group-hover:text-[var(--accent)] transition-colors">{feature.title}</h4>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] leading-tight">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Step 3 — Learning Track */}
          {step === 3 && (
            <div className="space-y-2">
              {TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setPreferences(p => ({ ...p, learningTrack: track.id }))}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                    preferences.learningTrack === track.id
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]"
                  }`}
                >
                  {preferences.learningTrack === track.id
                    ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                    : <div className="w-4 h-4 shrink-0 rounded-full border border-current opacity-40" />}
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{track.label}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{track.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 4 — Primary Goal */}
          {step === 4 && (
            <div className="space-y-2">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setPreferences(p => ({ ...p, primaryGoal: goal.id }))}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                    preferences.primaryGoal === goal.id
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]"
                  }`}
                >
                  {preferences.primaryGoal === goal.id
                    ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                    : <div className="w-4 h-4 shrink-0 rounded-full border border-current opacity-40" />}
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{goal.label}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{goal.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 5 — The Pledge */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-4">
                <div className="flex items-center gap-2 text-[var(--accent)]">
                  <Target className="w-5 h-5" />
                  <h4 className="text-sm font-bold uppercase tracking-wider">The Commit Mindset</h4>
                </div>
                <div className="space-y-3">
                  {[
                    { text: "Consistency over Intensity", sub: "I will show up for my craft every single day." },
                    { text: "Mastery through Reflection", sub: "I will journal my learnings and review my progress." },
                    { text: "Focused Deep Work", sub: "I will minimize distractions during learning sessions." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start group">
                      <div className="mt-1">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--text-primary)]">{item.text}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--accent-muted)]/10 border border-[var(--accent)]/20 text-center">
                <p className="text-xs font-medium text-[var(--accent)]">
                  Your growth engine is primed and ready for takeoff
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1 || loading}
            className="text-[var(--text-muted)] cursor-pointer"
          >
            Back
          </Button>
          {step < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 3 && !preferences.learningTrack) ||
                (step === 4 && !preferences.primaryGoal)
              }
              className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 cursor-pointer disabled:opacity-50"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={loading}
              className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 cursor-pointer"
            >
              {loading ? "Saving..." : "Get Started"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
