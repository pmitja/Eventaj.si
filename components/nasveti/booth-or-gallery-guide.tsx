import { getGuide, serviceVerdicts } from "@/content/nasveti";
import Image from "next/image";
import Link from "next/link";
import {
  GuideAside,
  GuideClosingCta,
  GuideHero,
  GuideLayout,
  GuideSection,
  P,
  RelatedGuides,
} from "./guide-shell";
import { ServiceComparisonTable } from "./comparison-tables";
import type { TocItem } from "./guide-toc";

const guide = getGuide("photo-booth-ali-qr-galerija");

const toc: readonly TocItem[] = [
  { id: "uvod", label: "Uvod" },
  { id: "kaj-dela", label: "Kaj dela vsaka" },
  { id: "tabela", label: "Primerjava" },
  { id: "kdaj-katera", label: "Kdaj katera" },
];

const services = [
  {
    title: "Photo booth",
    price: "Od 279 €",
    href: "/photo-booth",
    linkLabel: "Photo Booth paketi",
    image: "/qr-galerija/utrinki/photo-3.jpg",
    alt: "Gostje v photo booth kotičku z rekviziti",
    body: "Fizični kotiček z DSLR fotoaparatom, osvetlitvijo, rekviziti in našim človekom ob njem. Gost dobi natisnjeno fotografijo v roke še isti večer. Je atrakcija, ob kateri se ljudje zbirajo, in v večernem programu zapolni čas med večerjo in plesom.",
  },
  {
    title: "QR galerija",
    price: "35 € na dogodek",
    href: "/qr-galerija",
    linkLabel: "QR galerija",
    image: "/qr-galerija/postavitve/table.jpg",
    alt: "QR koda v stojalu na mizi med dogodkom",
    body: "Nič opreme in nikogar na kraju samem. Koda na mizah zbere, kar gostje slikajo sami, po celem prostoru in cel večer. Zraven gredo kratki videi in glasovna voščila.",
  },
] as const;

export function BoothOrGalleryGuide() {
  return (
    <main>
      <GuideHero
        eyebrow="Primerjava naših storitev"
        title="Photo booth ali QR galerija: kaj izbrati za svoj dogodek"
        lede="Ponujamo oboje, zato je pošteno, da to takoj napišemo. Pa vendar: v večini primerov to nista dve možnosti za isto stvar, ampak dve različni storitvi, ki se dopolnjujeta."
        breadcrumb="Photo booth ali QR galerija"
        readMinutes={guide.readMinutes}
        updated={guide.updated}
      />

      <GuideLayout
        toc={toc}
        aside={
          <GuideAside
            eyebrow="Vse cene na enem mestu"
            title="Cenik Eventaj"
            body="Photo Booth od 279 €, 360° Booth od 299 €, QR galerija 35 € na dogodek."
            href="/cenik"
            cta="Odpri cenik"
            secondary={{ href: "/360-photo-booth", label: "360° Booth za videe" }}
          />
        }
      >
        <GuideSection id="uvod" title="Dve storitvi, ki delata različni stvari">
          <P>
            Photo booth ustvarja fotografije. QR galerija zbira tiste, ki nastanejo povsod drugod.
            To je celotna razlika in iz nje sledi vse ostalo na tej strani.
          </P>
          <P>
            Če iščete atrakcijo za večerni program, je odgovor photo booth. Če iščete spomine z
            vsega večera, je odgovor galerija. Če iščete oboje, ju vzemite skupaj, kar naredi
            večina parov.
          </P>
        </GuideSection>

        <GuideSection id="kaj-dela" eyebrow="Kaj dela vsaka" title="Photo booth in QR galerija">
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="border border-[rgba(20,17,15,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--eventaj-paper-2)]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-accent)]">
                    {service.price}
                  </div>
                  <h3 className="mt-3 font-serif-display text-3xl font-[400] leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.7] text-[var(--eventaj-muted)]">
                    {service.body}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-6 inline-block text-sm font-semibold underline-offset-4 hover:text-[var(--eventaj-accent)]"
                  >
                    {service.linkLabel} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </GuideSection>

        <GuideSection id="tabela" eyebrow="Primerjava" title="Drug ob drugem">
          <ServiceComparisonTable />
          <P>
            Za videe iz kotička je pravi izdelek{" "}
            <Link href="/360-photo-booth" className="font-semibold underline underline-offset-4">
              360° Booth
            </Link>
            , ki od 299 € naprej snema počasne posnetke namesto tiskanih fotografij.
          </P>
        </GuideSection>

        <GuideSection id="kdaj-katera" eyebrow="Priporočilo" title="Kdaj katera">
          <div className="grid border-t border-[rgba(20,17,15,0.12)]">
            {serviceVerdicts.map((verdict) => (
              <div key={verdict.title} className="border-b border-[rgba(20,17,15,0.12)] py-7">
                <h3 className="font-serif-display text-2xl font-[400] leading-tight">
                  {verdict.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[17px] leading-[1.75] text-[var(--eventaj-muted)]">
                  {verdict.body}
                </p>
              </div>
            ))}
          </div>
        </GuideSection>
      </GuideLayout>

      <GuideClosingCta
        title="Izberite eno ali obe."
        body="Photo Booth od 279 €, QR galerija 35 €. Skupaj 314 €."
        actions={[
          { href: "/photo-booth", label: "Poglej Photo Booth pakete", variant: "primary" },
          { href: "/qr-galerija", label: "Ustvari QR galerijo, 35 €", variant: "secondary" },
        ]}
      />

      <RelatedGuides currentSlug={guide.slug} />
    </main>
  );
}
