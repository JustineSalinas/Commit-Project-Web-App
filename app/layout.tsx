import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Commit — The Developer Learning Workspace",
  description:
    "Focus sessions, spaced repetition flashcards, code journaling, and progress tracking — all built around your learning. Not a tutorial platform. Infrastructure for developers who take learning seriously.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${bricolageGrotesque.variable} ${jetbrainsMono.variable}`}>
        <body suppressHydrationWarning>
          <QueryProvider>
            <SettingsProvider>
              {children}
              <Toaster position="top-right" theme="dark" />
            </SettingsProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
