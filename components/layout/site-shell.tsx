"use client";

import { InquiryDialog } from "@/components/inquiry/inquiry-dialog";
import type { InquiryData } from "@/components/inquiry/inquiry-types";
import { RedesignChrome } from "@/components/sections/eventaj/redesign/redesign-chrome";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryDefaults, setInquiryDefaults] = useState<Partial<InquiryData>>({});
  const pathname = usePathname();
  // Admin and the customer's event-details form render without the marketing chrome.
  const isBare = pathname.startsWith("/admin") || pathname.startsWith("/podatki/");

  useEffect(() => {
    const open = (event: Event) => {
      const customEvent = event as CustomEvent<Partial<InquiryData>>;
      setInquiryDefaults(customEvent.detail ?? {});
      setInquiryOpen(true);
    };
    window.addEventListener("eventaj:open-inquiry", open);
    return () => window.removeEventListener("eventaj:open-inquiry", open);
  }, []);

  useEffect(() => {
    document.body.style.overflow = inquiryOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [inquiryOpen]);

  if (isBare) {
    return <div className="eventaj-redesign min-h-screen bg-[var(--eventaj-paper)] text-[var(--eventaj-ink)]">{children}</div>;
  }

  return (
    <div className="eventaj-redesign min-h-screen">
      <RedesignChrome>{children}</RedesignChrome>
      <div className="ev-dialog-tokens">
        <InquiryDialog
          open={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          initialData={inquiryDefaults}
        />
      </div>
    </div>
  );
}
