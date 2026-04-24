import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

// Root layout — ClerkProvider, ReactQueryProvider, ThemeProvider, fonts
// Generated in Phase 0
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
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
