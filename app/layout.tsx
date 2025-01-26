import "@/app/globals.css";
import "@/app/notion.css";
import WithNavigation from "@/components/navigation/with-navigation";
import { Footer } from "@/components/ui/footer-section";
import { Toaster } from "@/components/ui/toaster";
import { baloo2 } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata = {
  title: "360° Photo Booth",
  description: "360° Photo Booth za nepozabne spomine",
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
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
