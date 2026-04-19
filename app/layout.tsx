import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

// Root layout — ClerkProvider, ReactQueryProvider, ThemeProvider, fonts
// Generated in Phase 0
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
