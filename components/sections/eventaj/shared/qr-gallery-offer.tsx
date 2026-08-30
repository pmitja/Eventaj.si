import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import {
  ArrowUpRight,
  Check,
  Images,
  MessageCircle,
  QrCode,
  Users,
} from "lucide-react";
import Image from "next/image";

const galleryFeatures = [
  { icon: QrCode, label: "Dostop prek QR kode, brez aplikacije" },
  { icon: Users, label: "Neomejeno število gostov" },
  { icon: Images, label: "Fotografije, videi in prenos originalov" },
  { icon: MessageCircle, label: "Komentarji in glasovna knjiga gostov" },
] as const;

const galleryIncludes = [
  "Do 20 videov, dolgih največ 60 sekund",
  "Live slideshow med dogodkom",
  "Administracija dogodka in QR koda",
  "ZIP izvoz vseh fotografij",
  "Galerija je na voljo 180 dni",
] as const;

type Service = "photo" | "360";

export function QrGalleryOffer({ service }: { service?: Service }) {
  const isStandalone = service === undefined;
  const isPhotoPackage = service === "photo";
  const basePrice = service === "360" ? 299 : 279;
  const packagePrice = basePrice + 35;
  const serviceName = service === "360" ? "360° Booth" : "Photo Booth";

  return (
    <section
      aria-labelledby={isStandalone ? "qr-gallery-pricing-title" : `qr-gallery-${service}-title`}
      className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid overflow-hidden border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between p-7 md:p-12 lg:p-14">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(20,17,15,0.15)] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--eventaj-accent)]" />
                {isStandalone
                  ? "En dogodek · brez naročnine"
                  : isPhotoPackage
                    ? "Paket · Photo Booth + QR galerija"
                    : "Dodatek k 360° Boothu"}
              </div>
              <h2
                id={isStandalone ? "qr-gallery-pricing-title" : `qr-gallery-${service}-title`}
                className="max-w-[620px] font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-[0.98] text-balance"
              >
                {isStandalone ? (
                  <>
                    Vsi utrinki gostov. <em className="font-serif-italic italic text-[var(--eventaj-accent)]">Ena galerija.</em>
                  </>
                ) : isPhotoPackage ? (
                  <>
                    Photo Booth in vsi utrinki <em className="font-serif-italic italic text-[var(--eventaj-accent)]">gostov.</em>
                  </>
                ) : (
                  <>
                    Dodaj še fotografije <em className="font-serif-italic italic text-[var(--eventaj-accent)]">gostov.</em>
                  </>
                )}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--eventaj-ink-2)] md:text-[17px]">
                Gostje skenirajo QR kodo ter sproti dodajajo fotografije, videe
                in komentarje. Vse se zbira v zasebni galeriji dogodka.
              </p>
            </div>

            <div className="mt-9 border-t border-[rgba(20,17,15,0.12)] pt-8">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">
                    {isStandalone ? "Galerija dogodka" : `${serviceName} + QR galerija`}
                  </div>
                  <div className="mt-2 font-serif-display text-[56px] font-[350] leading-none md:text-[64px]">
                    {isStandalone ? "35" : packagePrice}
                    <span className="ml-1 text-2xl opacity-60">€</span>
                  </div>
                  <div className="mt-2 text-xs text-[var(--eventaj-muted)]">
                    {isStandalone
                      ? "za en dogodek"
                      : `od ${basePrice} € + 35 € za galerijo`}
                  </div>
                </div>

                {isStandalone ? (
                  <a
                    href="https://galerija.eventaj.si/"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--eventaj-ink)] px-6 py-3.5 text-sm font-medium !text-[var(--eventaj-paper)] no-underline transition-colors duration-200 hover:bg-[var(--eventaj-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--eventaj-ink)]"
                  >
                    Ustvari galerijo za 35 €
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <InquiryTrigger
                    defaults={{
                      type: service === "360" ? "360° Booth" : "Photo Booth",
                      hours: "2",
                      notes: `${serviceName} + QR galerija za 35 €`,
                    }}
                    className="min-h-12 rounded-full bg-[var(--eventaj-ink)] px-6 py-3.5 text-sm font-medium text-[var(--eventaj-paper)] transition-colors duration-200 hover:bg-[var(--eventaj-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--eventaj-ink)]"
                  >
                    Povprašaj za paket →
                  </InquiryTrigger>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[var(--eventaj-ink)] p-7 text-[var(--eventaj-paper)] md:p-12 lg:p-14">
            <div className="relative mb-9 aspect-[16/10] overflow-hidden border border-white/15">
              <Image
                src="/qr-galerija/screenshots/galerija-desktop.png"
                alt="Primer zasebne QR galerije dogodka Ana in Marko"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-top"
              />
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {galleryFeatures.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-sm leading-snug text-[var(--eventaj-cream)]">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#D7866F]" strokeWidth={1.8} aria-hidden="true" />
                  <span className="opacity-85">{label}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-8 grid gap-3 border-t border-white/15 pt-7">
              {galleryIncludes.map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-sm text-[var(--eventaj-cream)]">
                  <Check className="h-4 w-4 shrink-0 text-[#D7866F]" strokeWidth={2} aria-hidden="true" />
                  <span className="opacity-75">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-2 border-t border-white/15 pt-7 text-sm sm:grid-cols-2">
              <div className="border border-white/15 p-4">
                <div className="font-medium">AI Best Photos</div>
                <div className="mt-1 text-xs opacity-60">do 3.000 fotografij</div>
                <div className="mt-3 font-serif-display text-lg text-[#D7866F]">+15 €</div>
              </div>
              <div className="border border-white/15 p-4">
                <div className="font-medium">Neomejeno videov</div>
                <div className="mt-1 text-xs opacity-60">do 1.000 videov</div>
                <div className="mt-3 font-serif-display text-lg text-[#D7866F]">+15 €</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
