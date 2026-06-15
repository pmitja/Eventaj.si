/* eslint-disable @next/next/no-page-custom-font */
import "@/app/globals.css";
import "@/app/notion.css";
import SiteShell from "@/components/layout/site-shell";
import { Toaster } from "@/components/ui/toaster";
import { baloo2 } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Eventaj.si | Photo Booth & 360° Booth po Sloveniji",
  description:
    "Eventaj.si ponuja profesionalni Photo Booth in 360° Booth najem z asistenco, rekviziti in instant tiskom po celotni Sloveniji.",
  keywords: [
    "Photo Booth Slovenija",
    "360° Booth najem",
    "eventaj",
    "foto stojnica",
  ],
  metadataBase: new URL("https://www.eventaj.si"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eventaj.si | Photo Booth & 360° Booth po Sloveniji",
    description:
      "Najem Photo Booth in 360° Booth storitev z brezplačnim prevozom po celotni Sloveniji.",
    siteName: "Eventaj.si",
    url: "https://www.eventaj.si",
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventaj.si | Photo Booth & 360° Booth po Sloveniji",
    description:
      "Photo Booth in 360° Booth najem z asistenco in rekviziti po Sloveniji.",
  },
  verification: {
    google: "v9KCsI_ie0FgHL5ow8zD3M_gjvPEXc",
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8VJCJTK81D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8VJCJTK81D');
          `}
        </Script>
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
