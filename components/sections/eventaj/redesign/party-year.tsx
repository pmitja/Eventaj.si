import { homeEventTeasers } from "@/content/eventaj/event-pages";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const notes: Record<string, string> = {
  "Rojstni dan": "Vse leto",
  Poroka: "Poročna sezona",
  "Poslovni dogodek": "December je zaključek leta",
  "Promocija znamke": "Sejmi in lansiranja",
  Festival: "Poletni odri",
};

export function PartyYear() {
  return (
    <section aria-labelledby="ev-year-title" className="border-t ev-rule py-24 md:py-36">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ev-year-title" className="ev-display ev-h2 lg:col-span-7">
            Kateri dogodek <em>načrtujete?</em>
          </h2>
          <p className="ev-lede text-[var(--ev-stone)] lg:col-span-4 lg:col-start-9">
            Photo Booth in 360° Booth, prilagojena vašemu dogodku. Najbolj zasedeni so poletni
            vikendi in december, zato termin rezerviraj pravočasno.
          </p>
        </div>

        {/* Phones: one row you swipe through. Tablet and up: a grid. */}
        <ul className="-mx-[var(--ev-gutter)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--ev-gutter)] pb-4 md:mx-0 md:mt-20 md:grid md:snap-none md:grid-cols-3 md:gap-x-4 md:gap-y-10 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5 lg:gap-x-5">
          {homeEventTeasers.map((teaser) => (
            <li key={teaser.href} className="w-[72%] shrink-0 snap-center md:w-auto">
              <Link href={teaser.href} className="group block">
                <span className="ev-photo relative block aspect-[3/4]">
                  <Image
                    src={teaser.image.src}
                    alt={teaser.image.alt}
                    fill
                    sizes="(max-width: 767px) 72vw, (max-width: 1023px) 31vw, 19vw"
                    className="object-cover"
                  />
                </span>
                <span className="mt-4 flex items-start justify-between gap-3 border-b ev-rule pb-4">
                  <span>
                    <span className="ev-display block text-[22px] md:text-[25px]">{teaser.label}</span>
                    <span className="mt-1.5 block text-[14px] text-[var(--ev-stone)]">{notes[teaser.label]}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
