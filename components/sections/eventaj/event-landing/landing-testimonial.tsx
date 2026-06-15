import { EventLanding } from "@/content/eventaj/event-pages";

export function LandingTestimonial({ landing }: { landing: EventLanding }) {
  const review = landing.testimonial;
  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-24 text-center md:px-10 md:py-28">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-7 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-lg text-[var(--eventaj-accent)]">
              ★
            </span>
          ))}
          <span className="ml-3 text-sm text-[var(--eventaj-muted)]">
            4.9 / 5 · mnenja strank
          </span>
        </div>
        <blockquote className="font-serif-display text-[clamp(26px,3.2vw,40px)] font-[350] leading-tight text-balance">
          <span className="font-serif-italic text-[1.4em] italic leading-none text-[var(--eventaj-accent)]">
            “
          </span>
          {review.quote}
          <span className="font-serif-italic text-[1.4em] italic leading-none text-[var(--eventaj-accent)]">
            ”
          </span>
        </blockquote>
        <div className="mt-8 font-medium">{review.author}</div>
        <div className="mt-1 font-serif-italic text-[13px] italic text-[var(--eventaj-muted)]">
          {review.role}
        </div>
      </div>
    </section>
  );
}
