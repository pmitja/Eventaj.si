import { serviceHeroVisuals, ServiceType } from "@/content/eventaj/service-visuals";
import { cn } from "@/lib/utils";
import { HeroReferenceCard } from "./hero-reference-card";

export function ServiceHeroRail({
  visuals,
  accent,
}: {
  visuals: (typeof serviceHeroVisuals)[ServiceType];
  accent: string;
}) {
  const railImages = [...visuals.images, ...visuals.images];

  return (
    <div className="relative z-[2] w-full overflow-hidden pb-2 pt-1 md:pt-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--eventaj-paper)] to-transparent md:w-36"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--eventaj-paper)] to-transparent md:w-36"
      />
      <div
        className={cn(
          "flex w-max items-center gap-3 px-3 sm:gap-4 sm:px-4 md:gap-5",
          visuals.railDuration,
        )}
      >
        {railImages.map((image, index) => (
          <div key={`${image.src}-${index}`} className="shrink-0">
            <HeroReferenceCard
              image={image}
              aspectClass={visuals.aspectClass}
              sizes="(max-width: 767px) 290px, (max-width: 1023px) 360px, 430px"
              priority={index === 0}
              playVideo={index < Math.min(visuals.images.length, 4)}
              className={visuals.cardClass}
              accent={accent}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
