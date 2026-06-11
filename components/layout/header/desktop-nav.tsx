"use client";

import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { eventajNav } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <>
      <div className="hidden items-center gap-8 text-sm lg:flex">
        {eventajNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-medium text-[var(--eventaj-ink)] opacity-85 transition-opacity hover:opacity-100",
                active && "opacity-100",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <a
          href="tel:+38631285143"
          className="text-[13px] tracking-[0.02em] text-[var(--eventaj-ink)] tabular-nums no-underline"
        >
          031 285 143
        </a>
        <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-5 py-3 text-[13px] font-medium tracking-[0.02em] text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">
          Pridobi ponudbo →
        </InquiryTrigger>
      </div>
    </>
  );
}
