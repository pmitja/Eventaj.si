import { serviceHeroProof } from "@/content/eventaj/service-visuals";
import Image from "next/image";

export function HeroProof({ accent }: { accent: string }) {
  return (
    <div className="mt-5 flex max-w-full flex-col items-center gap-3 md:mt-8 md:gap-4">
      <div className="flex flex-nowrap items-center justify-center gap-2 md:flex-wrap md:gap-3">
        {serviceHeroProof.stats.map((item, index) => (
          <div
            key={item.label}
            className="rounded-full border border-[rgba(20,17,15,0.12)] bg-[rgba(251,248,242,0.62)] px-3 py-1.5 backdrop-blur-md md:px-4 md:py-2"
          >
            <span
              className="font-serif-display text-lg leading-none md:text-xl"
              style={{ color: index === 0 ? accent : "var(--eventaj-ink)" }}
            >
              {item.value}
            </span>
            <span className="ml-1.5 text-[9px] uppercase tracking-[0.08em] text-[var(--eventaj-muted)] md:ml-2 md:text-[10px] md:tracking-[0.12em]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden flex-wrap items-center justify-center gap-3 sm:flex">
        <div className="flex -space-x-2">
          {serviceHeroProof.logos.map((logo) => (
            <div
              key={logo.alt}
              className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[var(--eventaj-paper)] bg-white shadow-[0_8px_18px_-12px_rgba(20,17,15,0.5)] md:h-10 md:w-10"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="40px"
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
        <span className="max-w-[240px] text-left text-[12px] font-medium leading-snug text-[var(--eventaj-muted)] md:max-w-none md:text-sm">
          Med drugim so nam zaupali ŠKSG, AutoDelta, Forvis Mazars in Mlada Slovenija.
        </span>
      </div>
    </div>
  );
}
