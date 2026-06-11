import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { booth360Packages, photoPackages } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";

export function PackageTiers({ service }: { service: "photo" | "360" }) {
  const accent = "var(--eventaj-accent)";
  const packages: readonly (
    | (typeof booth360Packages)[number]
    | (typeof photoPackages)[number]
  )[] = service === "360" ? booth360Packages : photoPackages;
  return (
    <section
      id="cenik"
      className="bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1300px]">
        <div className="mx-auto mb-16 max-w-[720px] text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Cenik · Paketi
          </div>
          <h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-none text-balance">
            Paketi za vsak tip dogodka
          </h2>
          <p className="mt-4 text-[17px] text-[var(--eventaj-ink-2)]">
            Transparentne cene brez nepričakovanih doplačil.
          </p>
        </div>
        <div
          className={cn(
            "grid items-stretch",
            packages.length === 2
              ? "mx-auto max-w-[920px] lg:grid-cols-2"
              : "lg:grid-cols-3",
          )}
        >
          {packages.map((item, index) => {
            const featured = "featured" in item && item.featured;

            return (
              <article
                key={item.name}
                className={cn(
                  "relative flex flex-col border border-[rgba(20,17,15,0.1)] p-8 md:p-10 lg:p-12",
                  featured
                    ? "z-[2] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)] shadow-[0_30px_60px_-20px_rgba(20,17,15,0.4)] lg:scale-[1.04]"
                    : "bg-[var(--eventaj-paper)]",
                  index > 0 && !featured && "lg:border-l-0",
                )}
              >
                {featured && (
                  <div
                    className="absolute right-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--eventaj-paper)]"
                    style={{ backgroundColor: accent }}
                  >
                    Najpogostejša izbira
                  </div>
                )}
                <div
                  className="mb-3 font-serif-italic italic"
                  style={{ color: featured ? "#E8B584" : accent }}
                >
                  {item.name}
                </div>
                <div className="font-serif-display text-[64px] font-[350] leading-none">
                  {item.price}
                  <span className="text-2xl opacity-60"> €</span>
                </div>
                <div
                  className={cn(
                    "mt-2 text-[13px] opacity-80",
                    featured
                      ? "text-[var(--eventaj-cream)]"
                      : "text-[var(--eventaj-muted)]",
                  )}
                >
                  {item.hours} {item.hours === 2 ? "uri" : "ure"}
                </div>
                <p
                  className={cn(
                    "my-8 font-serif-italic italic leading-snug",
                    featured
                      ? "text-[var(--eventaj-cream)]"
                      : "text-[var(--eventaj-ink-2)]",
                  )}
                >
                  {item.tagline}
                </p>
                <ul
                  className={cn(
                    "mb-8 grid gap-3 border-t pt-7",
                    featured
                      ? "border-[rgba(244,239,230,0.15)]"
                      : "border-[rgba(20,17,15,0.1)]",
                  )}
                >
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-baseline gap-3 text-sm",
                        featured
                          ? "text-[var(--eventaj-cream)]"
                          : "text-[var(--eventaj-ink-2)]",
                      )}
                    >
                      <span
                        className="shrink-0 font-semibold"
                        style={{ color: featured ? "#E8B584" : accent }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <InquiryTrigger
                  className={cn(
                    "mt-auto w-full rounded-full px-6 py-4 text-sm font-medium transition-colors",
                    featured
                      ? "bg-[var(--eventaj-paper)] text-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)]"
                      : "bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]",
                  )}
                >
                  Izberi paket →
                </InquiryTrigger>
              </article>
            );
          })}
        </div>
        <div className="mt-12 text-center text-sm text-[var(--eventaj-muted)]">
          Dodatne ure: +50 €/h (Photo Booth), +80 €/h (360° Booth). Prevoz in
          posebne zahteve potrdimo v končni ponudbi.
        </div>
      </div>
    </section>
  );
}
