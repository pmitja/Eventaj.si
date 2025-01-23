import "@/app/globals.css";
import "@/app/notion.css";
import WithNavigation from "@/components/navigation/with-navigation";
import { Footer } from "@/components/ui/footer-section";
import { baloo2 } from "@/lib/fonts";
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
    <html lang="sl" className={baloo2.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <WithNavigation showBanner={true} />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
