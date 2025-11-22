import BasicBoothHero from "@/components/basic-booth-hero";
import BackgroundsSection from "@/components/sections/backgrounds-section";
import { CTAContactSection } from "@/components/sections/cta-contact-section";
import CustomBrandingSection from "@/components/sections/custom-branding-section";
import Features from "@/components/sections/features";
import { basicBoothFeatures } from "@/components/sections/features-content";
import PhotoBoothHowItWorks from "@/components/sections/photo-booth-how-it-works";
import {
  PricingPlans,
  type PricingPlan,
} from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { ReferencesSection } from "@/components/sections/references-section";
import WhenToChoose from "@/components/sections/when-to-choose";
import { Button } from "@/components/ui/button";
import { photoBoothWhenToChoose } from "@/content/when-to-choose";
import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

export const metadata: Metadata = {
  title: "Foto stojnica najem po Sloveniji od 249 € | Eventaj.si",
  description:
    "Foto stojnica najem za poroke, zabave in poslovne dogodke po celotni Sloveniji. Od 249 €/2h z neomejenimi fotografijami, rekviziti, takojšnjim tiskom, spletno galerijo in brezplačnim prevozom do 20 km. Pokličite 031 285 143.",
  keywords: [
    "foto stojnica najem",
    "foto stojnica Slovenija",
    "foto stojnica Ljubljana",
    "foto stojnica Maribor",
    "foto stojnica Celje",
    "foto stojnica cena",
    "foto stojnica za poroke",
    "foto stojnica za zabave",
    "fotobox najem",
  ],
  openGraph: {
    title: "Foto stojnica najem po Sloveniji od 249 € | Eventaj.si",
    description:
      "Najem foto stojnice z neomejenimi fotografijami in rekviziti po vsej Sloveniji. Pokrivamo Ljubljano, Maribor, Celje, Primorsko in ostale regije.",
    url: "https://www.eventaj.si/foto-stojnica",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Foto Stojnica Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foto stojnica najem po Sloveniji od 249 € | Eventaj.si",
    description:
      "Najem foto stojnice z asistenco in rekviziti po celotni Sloveniji. Rezerviraj termin že danes.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/foto-stojnica",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://eventaj.si/application/icon-32x32.png",
    apple: "https://eventaj.si/application/icon-256x256.png",
  },
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "249",
    period: "2 uri",
    features: [
      "najem do 2 uri",
      "neomejeno število fotografij",
      "pomoč pri uporabi",
      "rekviziti za fotografiranje",
      "takojšnje tiskanje fotografij",
      "digitalne fotografije",
      "personalizacija fotografij",
      "online galerija",
    ],
    description: "Popoln paket za manjše dogodke in zabave.",
    buttonText: "Rezerviraj termin",
    isPopular: false,
  },
  {
    name: "Standard",
    price: "299",
    period: "3 ure",
    features: [
      "najem do 3 ure",
      "neomejeno število fotografij",
      "pomoč pri uporabi",
      "rekviziti za fotografiranje",
      "takojšnje tiskanje fotografij",
      "digitalne fotografije",
      "personalizacija fotografij",
      "online galerija",
    ],
    description: "Najbolj priljubljen paket za večje dogodke.",
    buttonText: "Rezerviraj termin",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "349",
    period: "4 ure",
    features: [
      "najem do 4 ure",
      "neomejeno število fotografij",
      "pomoč pri uporabi",
      "rekviziti za fotografiranje",
      "takojšnje tiskanje fotografij",
      "digitalne fotografije",
      "personalizacija fotografij",
      "online galerija",
    ],
    description: "Premium paket za posebne priložnosti.",
    buttonText: "Rezerviraj termin",
    isPopular: false,
  },
];

const serviceAreas = [
  "Ljubljana, Domžale in Kamnik",
  "Maribor, Ptuj in celotna Štajerska",
  "Celje, Velenje in Savinjska",
  "Koper, Obala in Primorska",
  "Novo mesto, Dolenjska in Bela krajina",
] as const;

const serviceGuarantees = [
  "Brezplačen prevoz do 20 km iz Lenarta v Slovenskih goricah",
  "Profesionalen operater, ki vodi goste in skrbi za opremo",
  "Personalizirane predloge in rekviziti, prilagojeni dogodku",
  "Neomejeno tiskanje fotografij in spletna galerija",
] as const;

export default function PhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Foto Stojnica Najem",
          url: "https://eventaj.si/foto-stojnica",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            url: "https://eventaj.si",
            image: "https://eventaj.si/application/logo.svg",
            email: "info@eventaj.si",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Slovenija",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Štajerska",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
            telephone: "+386 31 285 143",
            sameAs: [
              "https://www.facebook.com/profile.php?id=61567672817538",
              "https://www.instagram.com/eventaj.si/profilecard/?igsh=MWZtMWx4N2dsNDc0dA==",
              "https://www.tiktok.com/@eventaj.si?_t=ZN-8tKYVf1BUcI&_r=1",
            ],
          },
          areaServed: [
            { "@type": "Country", name: "Slovenija" },
            { "@type": "City", name: "Ljubljana" },
            { "@type": "City", name: "Maribor" },
            { "@type": "City", name: "Celje" },
            { "@type": "AdministrativeArea", name: "Primorska" },
            { "@type": "AdministrativeArea", name: "Gorenjska" },
          ],
          serviceArea: {
            "@type": "AdministrativeArea",
            name: "Slovenija",
          },
          description:
            "Profesionalni najem foto stojnice za dogodke, poroke, rojstne dneve in zabave po celotni Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge ter takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "249",
            highPrice: "349",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil: "2025-12-31",
          },
          serviceType: "Foto Stojnica Rental",
          category: ["Foto Stojnica", "Event Services", "Photography Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Foto Stojnica Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
              itemOffered: {
                "@type": "Service",
                name: `${plan.name} Foto Stojnica Package`,
                description: plan.features.join(", "),
              },
            })),
          },
          termsOfService: "https://eventaj.si/pogoji-uporabe",
          isRelatedTo: [
            {
              "@type": "Service",
              name: "Wedding Services",
            },
            {
              "@type": "Service",
              name: "Event Planning",
            },
            {
              "@type": "Service",
              name: "Party Services",
            },
          ],
          additionalType: [
            "https://schema.org/PhotographyStore",
            "https://schema.org/EventService",
            "https://schema.org/EntertainmentBusiness",
          ],
        }}
      />

      <main className="pt-[48px]">
        <BasicBoothHero
          title="Foto Stojnica Najem"
          text="Naša foto stojnica pride iz Lenarta na vašo lokacijo v Ljubljani, Mariboru, Celju, na Primorskem ali kjer koli drugje po Sloveniji. Gostje se zabavajo, ustvarjajo neomejene fotografije, jih natisnejo ali delijo digitalno, mi pa poskrbimo za rekvizite in asistenco."
        />
        <section
          aria-labelledby="foto-stojnica-slovenia-heading"
          className="container mx-auto px-4 py-12 md:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#C99566]">
                Eventaj.si
              </p>
              <h2
                id="foto-stojnica-slovenia-heading"
                className="mt-3 text-3xl font-semibold leading-snug md:text-4xl"
              >
                Foto stojnica najem po celi Sloveniji
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Postavimo foto stojnico na poroke, rojstne dneve in poslovne
                dogodke v Ljubljani, Štajerski, Savinjski, na Obali ali kjer
                koli drugje. Prevoz, postavitev in asistenca so vključeni do 20
                km, za daljše poti pripravimo jasen izračun potnih stroškov.
              </p>
              <p className="mt-3 text-muted-foreground">
                V pakete vključimo personalizirane predloge, rekvizite, spletno
                galerijo ter podporo v slovenskem in angleškem jeziku. Pišite na{" "}
                <a
                  href="mailto:info@eventaj.si"
                  className="text-[#C99566] underline-offset-2 hover:underline"
                >
                  info@eventaj.si
                </a>{" "}
                ali nas pokličite za hitro ponudbo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="glow" asChild>
                  <Link href="#foto-stojnica-pricing">
                    Rezerviraj najem foto stojnice
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+38631285143">Pokliči 031 285 143</a>
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-black/5 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-background/80">
                <p className="text-sm uppercase tracking-wide text-[#C99566]">
                  Pokrivamo celotno Slovenijo
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {serviceAreas.map((area) => (
                    <li key={area} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#C99566]" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-black/5 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur dark:border-white/10 dark:bg-background/80">
                <p className="text-sm uppercase tracking-wide text-[#94A3B8]">
                  Kaj je vedno vključeno
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {serviceGuarantees.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#94A3B8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <WhenToChoose content={photoBoothWhenToChoose} />
        <PromoImage />
        <Features {...basicBoothFeatures} />
        <PhotoBoothHowItWorks />
        <BackgroundsSection />
        <CustomBrandingSection />
        <section
          id="foto-stojnica-pricing"
          aria-label="Cenik najema foto stojnice"
          className="scroll-mt-24"
        >
          <PricingPlans plans={pricingPlans} />
        </section>
        <ReferencesSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale našo foto stojnico"
        />
        <CTAContactSection
          title="Ni ustreznega paketa?"
          description="Kontaktiraj nas in skupaj bomo našli najboljšo rešitev za vaš dogodek."
          action={{
            text: "Pošlji povpraševanje",
            variant: "glow",
          }}
          isGlow={true}
        />
      </main>
    </>
  );
}
