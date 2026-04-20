import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SettingsProvider } from "@/components/providers/SettingsProvider";

// Root layout — ClerkProvider, ReactQueryProvider, ThemeProvider, fonts
// Generated in Phase 0
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
