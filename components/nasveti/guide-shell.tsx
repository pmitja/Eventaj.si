import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { relatedGuides } from "@/content/nasveti";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { GuideToc, GuideTocMobile, type TocItem } from "./guide-toc";

export const guideShell = "mx-auto w-full max-w-7xl px-5 md:px-10";
export const guidePrimaryButton =
  "qr-gallery-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold no-underline transition-colors";
export const guideSecondaryButton =
  "qr-gallery-secondary inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(20,17,15,0.2)] px-6 py-4 text-sm font-semibold no-underline transition-colors hover:border-[var(--eventaj-ink)]";

const rule = "border-[rgba(20,17,15,0.12)]";

export function GuideBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Drobtinice" className="mb-8 text-xs text-[var(--eventaj-muted)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="no-underline hover:text-[var(--eventaj-ink)]">
            Domov
          </Link>
        </li>
        <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
        <li>
          <Link href="/nasveti" className="no-underline hover:text-[var(--eventaj-ink)]">
            Nasveti
          </Link>
        </li>
        <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
        <li aria-current="page" className="text-[var(--eventaj-ink)]">
          {current}
        </li>
      </ol>
    </nav>
  );
}

export function GuideHero({
  eyebrow,
  title,
  lede,
  breadcrumb,
  readMinutes,
  updated,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  breadcrumb: string;
  readMinutes: number;
  updated: string;
}) {
  return (
    <section className="pb-14 pt-32 md:pb-20 md:pt-44">
      <div className={`${guideShell} max-w-4xl`}>
        <GuideBreadcrumb current={breadcrumb} />
        <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
          {eyebrow}
        </div>
        <h1 className="font-serif-display text-[clamp(40px,6vw,78px)] font-[350] leading-[0.98] tracking-[-0.035em] text-balance">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-muted)] md:text-xl">
          {lede}
        </p>
        <div className={`mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t ${rule} pt-5 text-xs text-[var(--eventaj-muted)]`}>
          <span>{readMinutes} min branja</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>
            Posodobljeno{" "}
            <time dateTime={updated}>
              {new Date(updated).toLocaleDateString("sl-SI", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>Eventaj.si</span>
        </div>
      </div>
    </section>
  );
}

/**
 * Three column reading layout: table of contents, article, sticky offer card.
 * Both side rails collapse away below `lg`, where the TOC becomes a dropdown.
 */
export function GuideLayout({
  toc,
  aside,
  children,
}: {
  toc: readonly TocItem[];
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`${guideShell} pb-8`}>
      <div className="grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[190px_minmax(0,1fr)_290px]">
        <div className="hidden lg:block">
          <GuideToc items={toc} />
        </div>
        <div className="min-w-0">
          <div className="mb-10">
            <GuideTocMobile items={toc} />
          </div>
          <article className="grid gap-16 md:gap-20">{children}</article>
        </div>
        {aside ? (
          <div className="hidden xl:block">
            <div className="sticky top-28">{aside}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function GuideSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      {eyebrow ? (
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-serif-display text-[clamp(30px,3.6vw,46px)] font-[400] leading-[1.05] tracking-[-0.02em] text-balance">
        {title}
      </h2>
      <div className="mt-6 grid gap-5">{children}</div>
    </section>
  );
}

/** Body copy. Kept at a fixed reading size so all three guides match. */
export function P({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-2xl text-[17px] leading-[1.75] text-[var(--eventaj-ink-2)]">
      {children}
    </p>
  );
}

export function NumberedItems({
  items,
}: {
  items: readonly { number: string; title: string; body: string }[];
}) {
  return (
    <div className={`grid border-t ${rule}`}>
      {items.map((item) => (
        <div key={item.number} className={`grid gap-3 border-b ${rule} py-7 sm:grid-cols-[64px_minmax(0,1fr)]`}>
          <span className="text-xs font-semibold tabular-nums tracking-[0.18em] text-[var(--eventaj-accent)]">
            {item.number}
          </span>
          <div>
            <h3 className="font-serif-display text-2xl font-[400] leading-tight">{item.title}</h3>
            <p className="mt-3 max-w-xl text-[17px] leading-[1.75] text-[var(--eventaj-muted)]">
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TipList({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  return (
    <ul className={`grid border-t ${rule}`}>
      {items.map((item) => (
        <li key={item.title} className={`border-b ${rule} py-5`}>
          <h3 className="text-base font-semibold">{item.title}</h3>
          <p className="mt-1.5 max-w-2xl text-[16px] leading-[1.7] text-[var(--eventaj-muted)]">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[17px] leading-[1.6] text-[var(--eventaj-ink-2)]">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--eventaj-accent)]"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Sticky rail card that carries the page's commercial link without
 * interrupting the article itself.
 */
export function GuideAside({
  eyebrow,
  title,
  body,
  href,
  cta,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <aside className={`border ${rule} bg-[var(--eventaj-paper-2)] p-7`}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
        {eyebrow}
      </div>
      {/* Not a heading: the rail must not compete with the article outline. */}
      <p className="mt-4 font-serif-display text-[28px] font-[400] leading-[1.1]">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--eventaj-muted)]">{body}</p>
      <Link href={href} className={`${guidePrimaryButton} mt-6 w-full`}>
        {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      {secondary ? (
        <Link
          href={secondary.href}
          className="mt-4 block text-center text-sm text-[var(--eventaj-muted)] underline-offset-4 hover:text-[var(--eventaj-ink)]"
        >
          {secondary.label}
        </Link>
      ) : null}
    </aside>
  );
}

/** In-article link out to a service page. Used where the text names it. */
export function InlineCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[17px] font-semibold text-[var(--eventaj-ink)] no-underline"
    >
      {label}
      <ArrowRight
        className="h-4 w-4 text-[var(--eventaj-accent)] transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}

type GuideCtaAction = {
  /** Omit to open the site's inquiry dialog instead of navigating. */
  href?: string;
  label: string;
  variant: "primary" | "secondary";
};

export function GuideClosingCta({
  title,
  body,
  actions,
}: {
  title: string;
  body?: string;
  actions: readonly GuideCtaAction[];
}) {
  return (
    <section className="px-5 pb-16 pt-4 md:px-10 md:pb-24">
      <div className="mx-auto max-w-7xl bg-[#E8B584] px-6 py-16 text-center md:px-10 md:py-20">
        <h2 className="mx-auto max-w-3xl font-serif-display text-[clamp(34px,4.6vw,62px)] font-[350] leading-[1] tracking-[-0.03em] text-balance">
          {title}
        </h2>
        {body ? <p className="mt-5 text-[var(--eventaj-ink-2)]">{body}</p> : null}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          {actions.map((action) => {
            // Filled, not outlined: on pages that offer two real choices both
            // buttons have to carry the same visual weight.
            const className =
              action.variant === "primary"
                ? guidePrimaryButton
                : "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--eventaj-ink)] bg-[var(--eventaj-paper)] px-6 py-4 text-sm font-semibold text-[var(--eventaj-ink)] no-underline transition-colors hover:bg-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)]";
            const arrow =
              action.variant === "primary" ? (
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              ) : null;

            if (!action.href) {
              return (
                <InquiryTrigger key={action.label} className={className}>
                  {action.label}
                  {arrow}
                </InquiryTrigger>
              );
            }

            return (
              <Link key={action.href} href={action.href} className={className}>
                {action.label}
                {arrow}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const items = relatedGuides(currentSlug);
  if (items.length === 0) return null;

  return (
    <section className={`border-t ${rule} py-16 md:py-24`}>
      <div className={guideShell}>
        <div className="mb-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
          Preberite še
        </div>
        <div className={`grid border-l border-t ${rule} md:grid-cols-2`}>
          {items.map((guide) => (
            <Link
              key={guide.slug}
              href={`/nasveti/${guide.slug}`}
              className={`group flex min-h-56 flex-col border-b border-r ${rule} p-7 no-underline transition-colors hover:bg-white/60 md:p-9`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">
                {guide.eyebrow}
              </span>
              <h3 className="mt-6 max-w-sm font-serif-display text-[28px] font-[400] leading-tight">
                {guide.label}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--eventaj-muted)]">
                {guide.teaser}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold">
                Preberi
                <ChevronRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
