import "@/app/globals.css";
import "@/app/notion.css";
import WithNavigation from "@/components/navigation/with-navigation";
import { Footer } from "@/components/ui/footer-section";
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
          <div className="flex min-h-screen flex-col">
            <WithNavigation showBanner={true} />
            {children}
            <Footer />
            <Analytics />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
