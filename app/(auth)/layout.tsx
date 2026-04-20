"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSignIn = pathname?.includes("sign-in");

  return (
    <div className="min-h-screen flex bg-[#09090B]">
      {/* Left Panel — Branded Hero */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#09090B] via-[#0d1f1a] to-[#09090B]" />

        {/* Glowing orb accents with custom breathing animations */}
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#00FFAA]/20 blur-[120px] pointer-events-none animate-breathe" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[#00FFAA]/15 blur-[100px] pointer-events-none animate-breathe-slow" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00FFAA 1px, transparent 1px), linear-gradient(90deg, #00FFAA 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[#00FFAA] text-2xl font-bold tracking-widest group-hover:text-[#00E599] transition-colors">
              COMMIT
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-[#FAFAFA] leading-tight">
              Build your
              <br />
              <span className="text-[#00FFAA]">deep work</span>
              <br />
              rhythm.
            </h2>
            <p className="mt-4 text-[#71717A] text-lg leading-relaxed max-w-sm">
              Track your focus sessions, document your breakthroughs, and master the skills that matter.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <div className="text-[#00FFAA] text-2xl font-bold">10k+</div>
              <div className="text-[#71717A] text-xs uppercase tracking-widest">Focus Sessions</div>
            </div>
            <div className="w-px h-10 bg-[#1A1A1F]" />
            <div className="space-y-1">
              <div className="text-[#00FFAA] text-2xl font-bold">500+</div>
              <div className="text-[#71717A] text-xs uppercase tracking-widest">Concepts Learned</div>
            </div>
            <div className="w-px h-10 bg-[#1A1A1F]" />
            <div className="space-y-1">
              <div className="text-[#00FFAA] text-2xl font-bold">99%</div>
              <div className="text-[#71717A] text-xs uppercase tracking-widest">Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[#71717A] text-xs">
            © {new Date().getFullYear()} Commit. Built for developers.
          </p>
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/">
            <span className="text-[#00FFAA] text-2xl font-bold tracking-widest">COMMIT</span>
          </Link>
        </div>

        <div className="w-full max-w-md flex flex-col items-center space-y-6">
          <div className="text-center w-full mb-2">
            <h1 className="text-2xl font-bold text-[#FAFAFA]">
              {isSignIn ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-[#71717A] text-sm mt-1">
              {isSignIn
                ? "Sign in to your Commit workspace"
                : "Start your developer journey today"}
            </p>
          </div>

          <div className="w-full flex justify-center">
            {children}
          </div>

          <p className="text-center text-[#71717A] text-sm">
            {isSignIn ? (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-[#00FFAA] hover:text-[#00E599] transition-colors font-medium">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/sign-in" className="text-[#00FFAA] hover:text-[#00E599] transition-colors font-medium">
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
