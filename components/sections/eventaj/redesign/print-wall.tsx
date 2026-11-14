import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { serviceHeroVisuals } from "@/content/eventaj/service-visuals";
import { cn } from "@/lib/utils";
import { ArrowRight, Palette, Printer, Sparkles } from "lucide-react";
import { PhotoLightboxGrid } from "./photo-lightbox-grid";

const prints = serviceHeroVisuals.photo.images;

const facts = [
  { Icon: Palette, text: "Okvir z imenom, datumom in barvami dogodka" },
  { Icon: Printer, text: "Tisk v nekaj sekundah, neomejeno" },
  { Icon: Sparkles, text: "Rekviziti in ozadje po izbiri" },
] as const;

/** A wall of real prints from past events: the product itself, every frame designed for its event. */
export function PrintWall({
  title,
  lede,
  secondary = { href: "#reference", label: "Poglej videe s 360° Bootha" },
}: {
  title?: React.ReactNode;
  lede?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="ev-prints-title" className="ev-dark ev-wine-bg overflow-hidden py-24 md:py-32">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ev-prints-title" className="ev-display ev-h2 lg:col-span-7">
            {title ?? (
              <>
                Vsak dogodek dobi <em>svoj okvir</em>
              </>
            )}
          </h2>
          <p className="ev-lede text-[var(--ev-mist)] lg:col-span-4 lg:col-start-9">
            {lede ??
              "To so pravi printi z naših dogodkov. Okvir oblikujemo posebej za vas, gostje pa fotografijo odnesejo domov še isti večer."}
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
          {facts.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ev-champagne)] text-[var(--ev-night)]">
                <Icon aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
              </span>
              {text}
            </li>
          ))}
        </ul>

        <PhotoLightboxGrid
          photos={prints.slice(0, 12)}
          framed
          className="mt-12 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3 lg:grid-cols-4"
          itemClassNames={prints.slice(0, 12).map((_, index) =>
            cn("aspect-[3/2] rounded-[10px]", index === 8 && "hidden md:block", index > 8 && "hidden lg:block"),
          )}
          sizes="(max-width: 767px) 46vw, (max-width: 1023px) 31vw, 23vw"
        />

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <InquiryTrigger defaults={{ type: "Photo Booth" }} className="ev-btn ev-btn-primary">
            Rezerviraj Photo Booth
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </InquiryTrigger>
          <a href={secondary.href} className="ev-link">
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
