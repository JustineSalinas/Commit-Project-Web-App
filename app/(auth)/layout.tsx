"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InteractiveGrid } from "@/components/auth/InteractiveGrid";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignIn = pathname?.includes("sign-in");
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen flex bg-[#09090B] relative">
      <InteractiveGrid />
      {/* Left Panel — Branded Hero */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090B] via-[#0d1f1a] to-[#09090B]" />

        {/* Glowing orb accents with custom breathing animations */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#00FFAA]/20 blur-[120px] pointer-events-none animate-breathe" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[#00FFAA]/15 blur-[100px] pointer-events-none animate-breathe-slow" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 170, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 170, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(circle at top left, black, transparent)",
            WebkitMaskImage: "radial-gradient(circle at top left, black, transparent)"
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[#00FFAA] text-2xl font-bold tracking-widest group-hover:text-[#00E599] transition-colors">
              COMMIT<span className="animate-blink">_</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-[#FAFAFA] leading-tight">
              Learn.<br/>
              <span className="text-[#00FFAA]">Document.</span><br/>
              Grow.<br/>
              Repeat.
            </h2>
            <p className="mt-4 text-[#71717A] text-lg leading-relaxed max-w-sm">
              Track your focus sessions, log deep-work insights, and master the exact skills your career needs.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <div className="text-[#00FFAA] font-medium text-sm">25-min</div>
              <div className="text-[#71717A] text-xs uppercase tracking-widest">Focus Loops</div>
            </div>
            <div className="w-px h-6 bg-[#1A1A1F]" />
            <div className="space-y-1">
              <div className="text-[#00FFAA] font-medium text-sm">Daily</div>
              <div className="text-[#71717A] text-xs uppercase tracking-widest">TIL Logs</div>
            </div>
            <div className="w-px h-6 bg-[#1A1A1F]" />
            <div className="space-y-1">
              <div className="text-[#00FFAA] font-medium text-sm">Built-in</div>
              <div className="text-[#71717A] text-xs uppercase tracking-widest">Flashcards</div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[#71717A] text-xs">
            © {year || "2026"} Commit. Designed & built by Adrian Salinas.
          </p>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/">
            <span className="text-[#00FFAA] text-2xl font-bold tracking-widest">COMMIT<span className="animate-blink">_</span></span>
          </Link>
        </div>

        {/* Elevated Form Panel */}
        <div className="w-full max-w-md flex flex-col items-center bg-[#111113] p-8 rounded-2xl border border-[#1A1A1F] shadow-2xl relative z-10">
          <div className="text-center w-full mb-4">
            <h1 className="text-2xl font-bold text-[#FAFAFA]">
              {isSignIn ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-[#71717A] text-sm mt-1">
              {isSignIn
                ? "Sign in to your Commit workspace"
                : "Start your developer journey today"}
            </p>
          </div>

          <div className="w-full flex justify-center mb-6">
            {children}
          </div>

          <p className="text-center text-[#71717A] text-sm">
            {isSignIn ? (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-[#00FFAA] hover:opacity-80 transition-colors font-medium">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/sign-in" className="text-[#00FFAA] hover:opacity-80 transition-colors font-medium">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
