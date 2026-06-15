import { EventLanding } from "@/content/eventaj/event-pages";
import Link from "next/link";

export function LandingRelated({ landing }: { landing: EventLanding }) {
  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-14 md:px-10 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
          Morda vas zanima
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {landing.related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-xl border border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-paper)] px-6 py-5 text-[14.5px] font-semibold text-[var(--eventaj-ink)] no-underline transition-colors hover:border-[var(--eventaj-accent)]"
            >
              {link.label}
              <span className="text-[var(--eventaj-accent)]">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
