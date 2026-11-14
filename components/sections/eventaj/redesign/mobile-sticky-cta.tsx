"use client";

import { openInquiryDialog } from "@/components/inquiry/inquiry-trigger";
import type { InquiryData } from "@/components/inquiry/inquiry-types";
import { qrGalleryOrderUrl } from "@/content/qr-gallery";
import { cn } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type CtaConfig = { label: string; defaults?: Partial<InquiryData>; href?: string };

/** The action that fits the page the visitor is reading. */
function ctaFor(pathname: string): CtaConfig {
  if (pathname.startsWith("/qr-galerija")) return { label: "Ustvari QR galerijo", href: qrGalleryOrderUrl };
  if (pathname.startsWith("/360")) return { label: "Rezerviraj 360° Booth", defaults: { type: "360° Booth" } };
  if (pathname.startsWith("/photo-booth") || pathname.startsWith("/foto-")) {
    return { label: "Rezerviraj Photo Booth", defaults: { type: "Photo Booth" } };
  }
  if (pathname.startsWith("/oprema-za-dogodke")) {
    return { label: "Povprašaj za opremo", defaults: { type: "Oprema za dogodke" } };
  }
  return { label: "Preveri prost termin" };
}

/**
 * Mobile-only bar pinned to the bottom of the screen. It appears once the hero is scrolled past
 * and steps aside while the closing CTA or the footer is on screen, so it never doubles them.
 */
export function MobileStickyCta() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const targets = [
      document.querySelector('section[aria-labelledby="ev-closing-title"]'),
      document.querySelector("footer"),
    ].filter((node): node is Element => Boolean(node));
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setNearEnd(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  const cta = ctaFor(pathname);
  const shown = pastHero && !nearEnd;
  const buttonClass = "ev-btn ev-btn-primary min-h-[48px] flex-1 justify-center";

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--ev-rule-dark)] bg-[color-mix(in_srgb,var(--ev-night)_92%,transparent)] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3">
        {cta.href ? (
          <a href={cta.href} className={buttonClass}>
            {cta.label}
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </a>
        ) : (
          <button type="button" onClick={() => openInquiryDialog(cta.defaults)} className={buttonClass}>
            {cta.label}
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </button>
        )}
        <a
          href="tel:+38631285143"
          aria-label="Pokliči 031 285 143"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--ev-porcelain)] !text-[var(--ev-night)]"
        >
          <Phone aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
