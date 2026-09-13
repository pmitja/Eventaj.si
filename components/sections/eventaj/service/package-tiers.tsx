import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { getAlbumPriceLabel } from "@/content/eventaj/album-pricing";
import { booth360Packages, photoPackages } from "@/content/eventaj/data";
import { photoBoothQrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
                  defaults={{
                    type: service === "photo" ? "Photo Booth" : "360° Booth",
                    hours: String(item.hours),
                    albumSize: service === "photo" && item.hours >= 3 ? "small" : "",
                  }}
                  className={cn(
                    "mt-auto w-full rounded-full px-6 py-4 text-sm font-medium transition-colors",
                    featured
                      ? "bg-[var(--eventaj-paper)] text-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)]"
                      : "bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]",
                  )}
                >
                  Izberi paket →
                </InquiryTrigger>
                {service === "photo" && (
                  <InquiryTrigger
                    defaults={{
                      type: "Photo Booth",
                      hours: String(item.hours),
                      qrGallery: true,
                      albumSize: item.hours >= 3 ? "small" : "",
                    }}
                    className="mt-3 w-full rounded-full border border-current px-5 py-3 text-sm font-medium transition-opacity hover:opacity-75"
                  >
                    Dodaj QR galerijo · +{photoBoothQrGalleryPrice} € / dogodek
                  </InquiryTrigger>
                )}
              </article>
            );
          })}
        </div>
        {service === "photo" && (
          <div id="albumi" className="mt-24 border-t border-[rgba(20,17,15,0.12)] pt-14 md:mt-32 md:pt-20">
            <div>
              <h3 className="font-serif-display text-3xl font-[350] md:text-4xl">
                Spominski album
              </h3>
              <p className="mt-4 max-w-md text-[var(--eventaj-ink-2)]">
                Natisnjene fotografije z dogodka zberi v albumu. Izbereš lahko
                mali ali veliki album, oba sta na voljo v črni in beli barvi.
              </p>
              <p className="mt-3 text-sm text-[var(--eventaj-muted)]">
                Pri paketih s 3 ali 4 urami je mali album že vključen.
                Velikost in barvo izbereš ob povpraševanju.
              </p>
            </div>
            <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-2 md:gap-8">
              {([
                { size: "small", name: "Mali album", image: "/application/mali-album.webp" },
                { size: "large", name: "Veliki album", image: "/application/veliki-album.webp" },
              ] as const).map((album) => (
                <article key={album.size}>
                  <Image
                    src={album.image}
                    alt={`${album.name} v črni in beli barvi s spiralno vezavo`}
                    width={1448}
                    height={1086}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1380px) calc((100vw - 112px) / 2), 634px"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <h4 className="font-serif-display text-3xl font-[350]">{album.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-[var(--eventaj-muted)]">
                      <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[var(--eventaj-ink)]" />
                      <span aria-hidden="true" className="h-3 w-3 rounded-full border border-[rgba(20,17,15,0.2)] bg-white" />
                      Črn ali bel
                    </div>
                  </div>
                  <dl className="mt-5 text-sm">
                    <div className="flex justify-between gap-4 border-t border-[rgba(20,17,15,0.12)] py-3">
                      <dt className="text-[var(--eventaj-muted)]">Photo Booth · 2 uri</dt>
                      <dd>{getAlbumPriceLabel(2, album.size)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-y border-[rgba(20,17,15,0.12)] py-3">
                      <dt className="text-[var(--eventaj-muted)]">Photo Booth · 3 ali 4 ure</dt>
                      <dd className={album.size === "small" ? "font-medium text-[var(--eventaj-accent)]" : ""}>
                        {album.size === "small" ? "Vključen v paket" : getAlbumPriceLabel(3, album.size)}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        )}
        <div className="mt-12 text-center text-sm text-[var(--eventaj-muted)]">
          Dodatne ure: +50 €/h (Photo Booth), +80 €/h (360° Booth). Prevoz in
          posebne zahteve potrdimo v končni ponudbi.
        </div>
      </div>
    </section>
  );
}
