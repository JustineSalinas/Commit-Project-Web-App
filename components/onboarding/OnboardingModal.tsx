"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { completeOnboarding } from "@/app/actions/crud";
import { toast } from "sonner";
import { Rocket, Code2, Layout, Sparkles } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  userName: string;
}

export function OnboardingModal({ isOpen, onComplete, userName }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    preferredIDE: "",
    languages: [] as string[],
    workflow: ""
  });

  const totalSteps = 3;
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
        onComplete();
      } else {
        toast.error("Failed to save preferences.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px] bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-primary)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--bg-elevated)] overflow-hidden">
          <Progress value={progress} className="h-full bg-[var(--accent)] transition-all duration-500" />
        </div>

        <DialogHeader className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-[var(--accent-muted)] text-[var(--accent)]">
              {step === 1 && <Rocket className="w-5 h-5" />}
              {step === 2 && <Layout className="w-5 h-5" />}
              {step === 3 && <Sparkles className="w-5 h-5" />}
            </div>
            <span className="text-xs font-medium text-[var(--text-muted)] tracking-wider uppercase">
              Step {step} of {totalSteps}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold">
            {step === 1 && `Welcome, ${userName}!`}
            {step === 2 && "The Developer's Workspace"}
            {step === 3 && "Unleash Your Potential"}
          </DialogTitle>
          <DialogDescription className="text-[var(--text-secondary)]">
            {step === 1 && "Commit is your secondary brain, designed to help you master your craft and track your growth as a developer."}
            {step === 2 && "Focus timers, smart flashcards, code journals, and a roadmap tracker—all in one place."}
            {step === 3 && "Finalize your setup to begin your journey toward mastery."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 min-h-[120px]">
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
                  className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:scale-[1.02] hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 cursor-default group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[var(--accent)] group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h4 className="text-sm font-semibold group-hover:text-[var(--accent)] transition-colors">{feature.title}</h4>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] leading-tight">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-[var(--text-muted)]">Preferred IDE</label>
                <Select onValueChange={(v) => setPreferences({ ...preferences, preferredIDE: v })}>
                  <SelectTrigger className="bg-[var(--bg-elevated)] border-[var(--border)]">
                    <SelectValue placeholder="Select an IDE" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--bg-surface)] border-[var(--border)]">
                    <SelectItem value="vscode">VS Code</SelectItem>
                    <SelectItem value="cursor">Cursor</SelectItem>
                    <SelectItem value="neovim">Neovim</SelectItem>
                    <SelectItem value="intellij">IntelliJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-[var(--text-muted)]">Primary Workflow</label>
                <Select onValueChange={(v) => setPreferences({ ...preferences, workflow: v })}>
                  <SelectTrigger className="bg-[var(--bg-elevated)] border-[var(--border)]">
                    <SelectValue placeholder="Select workflow style" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--bg-surface)] border-[var(--border)]">
                    <SelectItem value="frontend">Frontend Focused</SelectItem>
                    <SelectItem value="backend">Backend Focused</SelectItem>
                    <SelectItem value="fullstack">Fullstack / Generalist</SelectItem>
                    <SelectItem value="devops">DevOps / Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button 
            variant="ghost" 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1 || loading}
            className="text-[var(--text-muted)]"
          >
            Back
          </Button>
          {step < totalSteps ? (
            <Button 
              onClick={handleNext}
              className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90"
            >
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleFinish}
              disabled={loading}
              className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90"
            >
              {loading ? "Saving..." : "Get Started"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
