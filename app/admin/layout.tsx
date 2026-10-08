import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AdminToaster } from "./_components/admin-toaster";
import { MotionProvider } from "./_components/motion";

export const metadata: Metadata = {
  title: "Admin | Eventaj.si",
  robots: { index: false, follow: false },
};

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cn("admin-root min-h-screen", newsreader.variable)}>
      {/* Dialogs and menus render in a portal outside this div, so expose the font on :root too. */}
      <style>{`:root{--font-newsreader:${newsreader.style.fontFamily};}`}</style>
      <MotionProvider>{children}</MotionProvider>
      <AdminToaster />
    </div>
  );
}
