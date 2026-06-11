import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { services } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ServiceCardMedia } from "./service-card-media";

export function ServiceCard({
  id,
  tag,
  title,
  italicWord,
  description,
  features,
  price,
  accent,
  media,
  href,
  reverse,
}: (typeof services)[number] & { reverse?: boolean }) {
  return (
    <div id={id} className="border-b border-[rgba(20,17,15,0.1)]">
      <div
        className={cn(
          "mx-auto grid max-w-[1560px] gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-16 xl:gap-20 xl:px-20",
          reverse && "lg:[direction:rtl]",
        )}
      >
        <div className="lg:[direction:ltr]">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-7 bg-[var(--eventaj-ink)]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
              {tag}
            </span>
          </div>
          <h2 className="font-serif-display text-[clamp(46px,7vw,68px)] font-[350] leading-none text-balance">
            {title}{" "}
            <em className="font-serif-italic italic" style={{ color: accent }}>
              {italicWord}
            </em>
          </h2>
          <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-[var(--eventaj-ink-2)]">
            {description}
          </p>
          <ul className="mt-9 grid gap-3.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-baseline gap-3.5 text-[15px] text-[var(--eventaj-ink-2)]"
              >
                <span
                  className="font-serif-italic text-lg italic"
                  style={{ color: accent }}
                >
                  —
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-7 py-4 text-sm font-medium text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">
              Pridobi ponudbo →
            </InquiryTrigger>
            <Link
              href={href}
              className="border-b border-[rgba(20,17,15,0.3)] pb-0.5 text-sm no-underline"
            >
              Več podrobnosti →
            </Link>
            <div className="ml-auto">
              <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--eventaj-muted)]">
                od
              </div>
              <div className="mt-1 font-serif-display text-4xl leading-none">
                {price} €
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] lg:[direction:ltr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]">
            <ServiceCardMedia media={media[0]} priority />
          </div>
          <div
            className={cn(
              "absolute bottom-[-24px] w-[48%] overflow-hidden rounded-[4px] border-[7px] border-[var(--eventaj-paper)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] md:bottom-[-30px] md:border-[8px]",
              reverse
                ? "right-[-12px] md:right-[-28px]"
                : "left-[-12px] md:left-[-28px]",
            )}
          >
            <div className="aspect-[4/5]">
              <ServiceCardMedia media={media[1]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
