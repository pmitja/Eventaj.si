/* eslint-disable @next/next/no-page-custom-font */
import "@/app/globals.css";
import "@/app/notion.css";
import SiteShell from "@/components/claude/site-shell";
import { Toaster } from "@/components/ui/toaster";
import { baloo2 } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventaj.si | Photo booth & 360° photo booth po Sloveniji",
  description:
    "Eventaj.si ponuja profesionalni photo booth in 360° photo booth najem z asistenco, rekviziti in instant tiskom po celotni Sloveniji.",
  keywords: [
    "photo booth Slovenija",
    "360 photo booth najem",
    "eventaj",
    "foto stojnica",
  ],
  metadataBase: new URL("https://www.eventaj.si"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eventaj.si | Photo booth & 360° photo booth po Sloveniji",
    description:
      "Najem photo booth in 360° photo booth storitev z brezplačnim prevozom po celotni Sloveniji.",
    siteName: "Eventaj.si",
    url: "https://www.eventaj.si",
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventaj.si | Photo booth & 360° photo booth po Sloveniji",
    description:
      "Photo booth in 360° photo booth najem z asistenco in rekviziti po Sloveniji.",
  },
  other: {
    "google-site-verification":
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sl"
      className={cn("min-h-screen bg-background antialiased", baloo2.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,30..100&family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&display=swap"
        />
        <link
          rel="preconnect"
          href="https://prod-files-secure.s3.us-west-2.amazonaws.com"
        />
        <link
          rel="dns-prefetch"
          href="https://prod-files-secure.s3.us-west-2.amazonaws.com"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteShell>
            {children}
            <Analytics />
            <Toaster />
          </SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
