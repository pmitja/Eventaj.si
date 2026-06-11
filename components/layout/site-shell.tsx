"use client";

import { InquiryDialog } from "@/components/inquiry/inquiry-dialog";
import { useScrolled } from "@/hooks/use-scrolled";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { SiteHeader } from "./header/site-header";
import { SiteFooter } from "./footer/site-footer";
import { StickyCTA } from "./sticky-cta";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const open = () => setInquiryOpen(true);
    window.addEventListener("eventaj:open-inquiry", open);
    return () => window.removeEventListener("eventaj:open-inquiry", open);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="eventaj-redesign min-h-screen bg-[var(--eventaj-paper)] text-[var(--eventaj-ink)]">
      <SiteHeader
        scrolled={scrolled}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        pathname={pathname}
      />

      {children}

      <SiteFooter />
      <StickyCTA />
      <InquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
