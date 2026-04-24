"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { completeOnboarding } from "@/app/actions/crud";
import { toast } from "sonner";
import { Rocket, Code2, Layout, Sparkles, Target, CheckCircle2 } from "lucide-react";

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
      } else {
        // Silently log the database error and bypass to allow user into the dashboard
        console.warn("Bypassed database error:", res.error);
      }
    } catch (err) {
      console.warn("Bypassed unexpected error:", err);
    } finally {
      setLoading(false);
      onComplete(); // Direct immediately to the dashboard regardless of error
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
            {step === 3 && "The Developer's Pledge"}
          </DialogTitle>
          <DialogDescription className="text-[var(--text-secondary)]">
            {step === 1 && "Commit is your secondary brain, designed to help you master your craft and track your growth as a developer."}
            {step === 2 && "Focus timers, smart flashcards, code journals, and a roadmap tracker—all in one place."}
            {step === 3 && "Before we begin, let's set the foundation for your growth."}
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
                  className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 cursor-pointer group will-change-transform"
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
              className="bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 cursor-pointer"
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
