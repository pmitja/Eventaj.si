"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { eventajNav } from "@/content/eventaj/data";
import Link from "next/link";

export function MobileMenu() {
  return (
    <div className="border-b border-[rgba(20,17,15,0.08)] bg-[rgba(251,248,242,0.98)] px-5 pb-6 pt-2 shadow-2xl shadow-black/10 backdrop-blur-xl lg:hidden">
      <div className="grid gap-1">
        {eventajNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-b border-[rgba(20,17,15,0.08)] py-4 font-serif-display text-2xl"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href="tel:+38631285143"
          className="rounded-full border border-[rgba(20,17,15,0.18)] px-5 py-4 text-center font-medium"
        >
          Pokliči 031 285 143
        </a>
        <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-5 py-4 text-center font-medium text-[var(--eventaj-paper)]">
          Pridobi ponudbo →
        </InquiryTrigger>
      </div>
    </div>
  );
}
