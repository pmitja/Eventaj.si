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
  title: "360° Photo Booth",
  description: "360° Photo Booth za nepozabne spomine",
  metadataBase: new URL("https://www.eventaj.si"),
  alternates: {
    canonical: "/",
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
