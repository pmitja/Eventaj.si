import { eventLandingIncluded, EventLanding } from "@/content/eventaj/event-pages";
import { cn } from "@/lib/utils";

export function LandingIncluded({ landing }: { landing: EventLanding }) {
  const rows = landing.included ?? eventLandingIncluded[landing.product];
  return (
    <section className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[880px]">
        <div className="mb-12 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            V vsakem paketu
          </div>
          <h2 className="font-serif-display text-[clamp(34px,4.2vw,56px)] font-[350] leading-none text-balance">
            Vse vključeno,{" "}
            <em className="font-serif-italic italic text-[var(--eventaj-accent)]">
              brez skritih stroškov
            </em>
            .
          </h2>
        </div>
        <div className="flex flex-col">
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={cn(
                "grid gap-2 border-t border-[rgba(20,17,15,0.12)] px-2 py-4 text-sm md:grid-cols-[240px_1fr] md:gap-6 md:py-5",
                index === rows.length - 1 && "border-b",
              )}
            >
              <span className="font-semibold">{row.label}</span>
              <span className="text-[var(--eventaj-ink-2)]">{row.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
