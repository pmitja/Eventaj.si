import { EventLanding } from "@/content/eventaj/event-pages";

export function LandingIdealFor({ landing }: { landing: EventLanding }) {
  if (!landing.idealFor) return null;

  const { eyebrow, title, description, items } = landing.idealFor;

  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
        <div>
          <div className="mb-5 text-[11px] uppercase tracking-[0.22em] text-[var(--eventaj-muted)]">
            {eyebrow}
          </div>
          <h2 className="font-serif-display text-[clamp(34px,4vw,52px)] font-[350] leading-[1.05] text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[460px] text-[16px] leading-relaxed text-[var(--eventaj-ink-2)]">
            {description}
          </p>
        </div>
        <ul className="grid gap-x-8 border-y border-[rgba(20,17,15,0.12)] sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="border-b border-[rgba(20,17,15,0.12)] py-4 text-[16px] font-medium last:border-b-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
