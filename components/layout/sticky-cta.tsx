"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export function StickyCTA() {
  const show = useScrolled(() => window.innerHeight * 1.2);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 transition-all duration-300 md:bottom-7 md:right-7",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0",
      )}
    >
      <InquiryTrigger className="flex items-center gap-3 rounded-full bg-[var(--eventaj-ink)] px-5 py-4 text-sm font-medium text-[var(--eventaj-paper)] shadow-[0_20px_50px_-10px_rgba(20,17,15,0.5)] transition-colors hover:bg-[var(--eventaj-accent)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#E8B584]" />
        Pridobi ponudbo →
      </InquiryTrigger>
    </div>
  );
}
