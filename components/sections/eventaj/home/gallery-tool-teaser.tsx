import { ArrowUpRight, Images, QrCode, Users } from "lucide-react";
import Image from "next/image";

const galleryFeatures = [
  { icon: QrCode, label: "Dostop prek QR kode" },
  { icon: Users, label: "Brez aplikacije in registracije" },
  { icon: Images, label: "Neomejeno število gostov" },
] as const;

export function GalleryToolTeaser() {
  return (
    <section
      aria-labelledby="qr-gallery-title"
      className="overflow-hidden bg-[var(--eventaj-ink)] px-5 py-20 text-[var(--eventaj-paper)] md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-cream)]">
            <span className="rounded-full bg-[var(--eventaj-accent)] px-2.5 py-1 text-[9px] font-semibold tracking-[0.14em] text-white">
              Novo
            </span>
            Eventaj QR Galerija
          </div>
          <h2
            id="qr-gallery-title"
            className="max-w-2xl font-serif-display text-[clamp(42px,5.5vw,76px)] font-[350] leading-[0.98] text-balance"
          >
            Vse fotografije gostov.{" "}
            <em className="font-serif-italic italic text-[#D7866F]">
              Na enem mestu.
            </em>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--eventaj-cream)] opacity-75 md:text-lg">
            Gostje skenirajo QR kodo in sproti dodajajo svoje fotografije v
            skupno zasebno galerijo — brez nameščanja aplikacije in brez
            registracije.
          </p>

          <ul className="mt-8 grid gap-3 text-sm text-[var(--eventaj-cream)] sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {galleryFeatures.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon
                  className="h-4 w-4 shrink-0 text-[#D7866F]"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <span className="opacity-85">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="https://galerija.eventaj.si/"
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[var(--eventaj-paper)] px-7 py-3.5 text-sm font-semibold !text-[var(--eventaj-ink)] no-underline transition-colors duration-200 hover:bg-[#D7866F] hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--eventaj-paper)]"
            >
              Spoznaj QR galerijo
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <span className="text-sm text-[var(--eventaj-cream)] opacity-65">
              35 € na dogodek · brez naročnine
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[680px] pb-8 pt-4">
          <div
            aria-hidden="true"
            className="absolute -inset-12 rounded-full bg-[var(--eventaj-accent)] opacity-[0.12] blur-3xl"
          />
          <div className="relative grid grid-cols-[0.78fr_1.22fr] gap-3 rounded-[24px] border border-white/15 bg-white/[0.07] p-3 shadow-[0_35px_100px_-35px_rgba(0,0,0,0.75)] backdrop-blur-sm sm:gap-4 sm:p-4">
            <div className="grid gap-3 sm:gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[14px]">
                <Image
                  src="https://galerija.eventaj.si/gallery/ana-marko/photo-5.jpg"
                  alt="Fotografija gostov iz demo galerije dogodka"
                  fill
                  sizes="(max-width: 1024px) 38vw, 240px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[14px]">
                <Image
                  src="https://galerija.eventaj.si/gallery/ana-marko/photo-6.jpg"
                  alt="Spontana fotografija gosta iz demo galerije dogodka"
                  fill
                  sizes="(max-width: 1024px) 38vw, 240px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <Image
                  src="https://galerija.eventaj.si/gallery/ana-marko/photo-7.jpg"
                  alt="Skupinska fotografija iz demo galerije dogodka"
                  fill
                  sizes="(max-width: 1024px) 58vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-h-32 flex-col justify-between rounded-[14px] bg-[var(--eventaj-paper)] p-4 text-[var(--eventaj-ink)] sm:min-h-44 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">
                    Galerija dogodka
                  </span>
                  <QrCode
                    className="h-7 w-7 text-[var(--eventaj-accent)] sm:h-9 sm:w-9"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="font-serif-display text-2xl leading-none sm:text-4xl">
                    Ana &amp; Marko
                  </div>
                  <div className="mt-2 text-xs text-[var(--eventaj-muted)] sm:text-sm">
                    128 fotografij · 34 gostov
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
