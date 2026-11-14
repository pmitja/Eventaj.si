"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { testimonials } from "@/content/eventaj/data";
import { EVENTS_DONE, REVIEW_COUNT, REVIEW_RATING_LABEL } from "@/content/eventaj/proof";
import { CalendarCheck, Clock, Pause, Play, Star } from "lucide-react";

type Review = (typeof testimonials)[number];
const rowOne = testimonials.filter((_, index) => index % 2 === 0);
const rowTwo = testimonials.filter((_, index) => index % 2 === 1);

/** Google's own multicolour "G", as Google publishes it. */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function Stars({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-0.5 text-[#f4b400] ${className ?? ""}`}>
      {Array.from({ length: 5 }).map((_, star) => (
        <Star key={star} className="h-full w-auto fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => /^\p{L}/u.test(part) && part !== "in")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

export function RedesignReviews() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="ev-reviews-title" className="overflow-hidden bg-[var(--ev-sand)] py-24 md:py-32">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ev-reviews-title" className="ev-display ev-h2 lg:col-span-7">
            Kaj pravijo <em>naše stranke</em>
          </h2>
          <p className="ev-lede text-[var(--ev-stone)] lg:col-span-4 lg:col-start-9">
            Vse ocene na našem Google profilu so pet zvezdic. Tukaj je nekaj njihovih besed.
          </p>
        </div>

        {/* The proof, set large. */}
        <dl className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-[20px] bg-[var(--ev-white)] p-6 md:p-7">
            <dt className="flex items-center gap-2.5 text-[15px] font-medium text-[var(--ev-stone)]">
              <GoogleG className="h-6 w-6" />
              Ocena na Googlu
            </dt>
            <dd className="mt-4">
              <span className="ev-display ev-tabular block text-[clamp(52px,5vw,80px)] font-bold leading-[0.9] text-[var(--ev-wine)]">
                {REVIEW_RATING_LABEL}
              </span>
              <span className="mt-4 flex flex-wrap items-center gap-3 text-[16px]">
                <Stars className="h-6" />
                iz {REVIEW_COUNT} ocen
              </span>
            </dd>
          </div>
          <div className="ev-dark ev-berry-bg flex flex-col justify-between rounded-[20px] p-6 md:p-7">
            <dt className="flex items-center gap-2.5 text-[15px] font-medium text-white/85">
              <CalendarCheck aria-hidden="true" strokeWidth={1.75} className="h-6 w-6 text-[var(--ev-champagne)]" />
              Izvedeni dogodki
            </dt>
            <dd className="mt-4">
              <span className="ev-display ev-tabular block text-[clamp(52px,5vw,80px)] font-bold leading-[0.9] text-[var(--ev-champagne)]">
                {EVENTS_DONE}
              </span>
              <span className="mt-4 block text-[16px] text-white/90">poroke, rojstni dnevi in poslovne zabave</span>
            </dd>
          </div>
          <div className="ev-dark ev-wine-bg flex flex-col justify-between rounded-[20px] p-6 md:p-7">
            <dt className="flex items-center gap-2.5 text-[15px] font-medium text-[var(--ev-mist)]">
              <Clock aria-hidden="true" strokeWidth={1.75} className="h-6 w-6 text-[var(--ev-champagne)]" />
              Odziv
            </dt>
            <dd className="mt-4">
              <span className="ev-display ev-tabular block text-[clamp(52px,5vw,80px)] font-bold leading-[0.9] text-[var(--ev-porcelain)]">
                24 h
              </span>
              <span className="mt-4 block text-[16px] text-[var(--ev-mist)]">do ponudbe za vaš dogodek</span>
            </dd>
          </div>
        </dl>

      </div>

      <div className="mt-3 flex flex-col gap-3">
        <ReviewRow reviews={rowOne} paused={paused} />
        <ReviewRow reviews={rowTwo} paused={paused} reverse />
      </div>

      <div className="ev-wrap mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? "Predvajaj mnenja" : "Ustavi mnenja"}
          className="flex h-11 w-11 items-center justify-center rounded-full border ev-rule text-[var(--ev-wine-deep)] transition-colors hover:bg-white/60 motion-reduce:hidden"
        >
          {paused ? (
            <Play aria-hidden="true" strokeWidth={1.75} className="ml-0.5 h-4 w-4" />
          ) : (
            <Pause aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
          )}
        </button>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const fromGoogle = review.role === "Google ocena";
  return (
    <figure className="flex h-full flex-col rounded-[20px] bg-[var(--ev-white)] p-7">
      <div className="flex items-center justify-between gap-4">
        <Stars className="h-[18px]" />
        {fromGoogle && <GoogleG className="h-5 w-5" />}
      </div>
      <span className="sr-only">5 od 5 zvezdic.</span>
      <blockquote className="mt-5 line-clamp-6 text-[17px] leading-relaxed sm:line-clamp-5 text-[var(--ev-wine-deep)]">„{review.quote}“</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--ev-blush)] text-[15px] font-semibold text-[var(--ev-wine)]"
        >
          {initials(review.author)}
        </span>
        <span className="text-[15px] leading-tight">
          <span className="block font-semibold">{review.author}</span>
          <span className="text-[var(--ev-stone)]">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Cards per track copy: 12 × 392px ≈ 4700px, wider than any screen, so the loop never shows a gap. */
const MIN_CARDS_PER_TRACK = 12;
/** Seconds each card takes to scroll past, so both rows move at the same speed whatever their length. */
const SECONDS_PER_CARD = 14;

/** One row of review cards that loops sideways without end; pauses on hover, focus or the pause button. Under reduced motion it wraps and rests. */
function ReviewRow({ reviews, paused, reverse }: { reviews: ReadonlyArray<Review>; paused: boolean; reverse?: boolean }) {
  const repeats = Math.max(1, Math.ceil(MIN_CARDS_PER_TRACK / reviews.length));
  const cards = Array.from({ length: repeats }, (_, round) => reviews.map((review) => ({ review, round }))).flat();

  return (
    <div className="ev-marquee flex min-w-0 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] motion-reduce:px-[var(--ev-gutter)] motion-reduce:[mask-image:none]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 ? "true" : undefined}
          style={{ animationDuration: `${cards.length * SECONDS_PER_CARD}s` }}
          className={cn(
            "ev-marquee-track flex shrink-0 gap-3 pr-3",
            reverse && "ev-marquee-reverse",
            paused && "ev-marquee-paused",
            "motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:pr-0",
            copy === 1 && "motion-reduce:hidden",
          )}
        >
          {cards.map(({ review, round }) => (
            <li
              key={`${round}-${review.author}`}
              aria-hidden={round > 0 ? "true" : undefined}
              className={cn(
                "h-[340px] w-[300px] shrink-0 sm:h-[300px] sm:w-[380px] motion-reduce:h-auto motion-reduce:w-full motion-reduce:sm:w-[calc(50%-6px)] motion-reduce:lg:w-[calc(33.333%-8px)]",
                round > 0 && "motion-reduce:hidden",
              )}
            >
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
