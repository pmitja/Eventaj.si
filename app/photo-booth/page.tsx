import BasicBoothHero from "@/components/basic-booth-hero";
import { CTAContactSection } from "@/components/sections/cta-contact-section";
import Features from "@/components/sections/features";
import { basicBoothFeatures } from "@/components/sections/features-content";
import PhotoBoothHowItWorks from "@/components/sections/photo-booth-how-it-works";
import {
  PricingPlans,
  type PricingPlan,
} from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { ReferencesSection } from "@/components/sections/references-section";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

export const metadata: Metadata = {
  title: "Photo booth najem po Sloveniji od 249 € | Eventaj.si",
  description:
    "Photo booth najem za poroke, zabave in poslovne dogodke po celotni Sloveniji (Ljubljana, Maribor, Celje, Primorska, Gorenjska). Od 249 €/2h z neomejenimi fotografijami, rekviziti, takojšnjim tiskom, spletno galerijo in brezplačnim prevozom. Pokličite 031 285 143.",
  keywords: [
    "photo booth najem",
    "photo booth Slovenija",
    "photo booth Ljubljana",
    "photo booth Maribor",
    "photo booth Celje",
    "najem photo booth cena",
    "photo booth za poroko",
    "photo booth za zabavo",
    "foto stojnica za dogodke",
    "photo booth cena",
  ],
  openGraph: {
    title: "Photo booth najem po Sloveniji od 249 € | Eventaj.si",
    description:
      "Najem photo booth stojnice z neomejenimi fotografijami in rekviziti po vsej Sloveniji. Pokrivamo Ljubljano, Maribor, Celje, Primorsko in ostale regije.",
    url: "https://www.eventaj.si/photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo booth najem po Sloveniji od 249 € | Eventaj.si",
    description:
      "Najem photo booth naprave z asistenco in rekviziti po celotni Sloveniji. Rezerviraj termin že danes.",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://www.eventaj.si/photo-booth",
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
          name: "Photo Booth Najem",
          url: "https://eventaj.si/photo-booth",
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
            {
              "@type": "Country",
              name: "Slovenija",
            },
            {
              "@type": "City",
              name: "Ljubljana",
            },
            {
              "@type": "City",
              name: "Maribor",
            },
            {
              "@type": "City",
              name: "Celje",
            },
            {
              "@type": "AdministrativeArea",
              name: "Primorska",
            },
            {
              "@type": "AdministrativeArea",
              name: "Gorenjska",
            },
          ],
          serviceArea: {
            "@type": "AdministrativeArea",
            name: "Slovenija",
          },
          description:
            "Profesionalni najem photo booth naprave za poroke, poslovne dogodke, festivale in zabave po vsej Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge in takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "249",
            highPrice: "349",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil: "2025-12-31",
          },
          serviceType: "Photo Booth Rental",
          category: ["Photo Booth", "Event Services", "Photography Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Photo Booth Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
              itemOffered: {
                "@type": "Service",
                name: `${plan.name} Photo Booth Package`,
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
          title="Photo Booth Najem"
          text="Naš photo booth je središče vsake zabave in se iz Lenarta odpravi v Ljubljano, Maribor, Celje, Primorsko in vse ostale regije. Gostje se zabavajo, natisnejo neomejeno fotografij, prejmejo digitalne kopije in jih takoj delijo na družbenih omrežjih."
        />
        <section
          aria-labelledby="photo-booth-slovenia-heading"
          className="container mx-auto px-4 py-12 md:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#C99566]">
                Eventaj.si
              </p>
              <h2
                id="photo-booth-slovenia-heading"
                className="mt-3 text-3xl font-semibold leading-snug md:text-4xl"
              >
                Photo booth najem po celi Sloveniji
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Z ekipo pridemo kamor koli, kjer potrebujete dodatno zabavo – od
                porok v Ljubljani in Škofji Loki, do poslovnih dogodkov v
                Mariboru, Celju in na Obali. Prevoz, postavitev in asistenca so
                že vključeni, zato se lahko posvetite programu dogodka.
              </p>
              <p className="mt-3 text-muted-foreground">
                Vsak najem vključuje personalizirane predloge, rekvizite,
                spletno galerijo ter podporo v slovenskem in angleškem jeziku.
                Ob rezervaciji nas lahko kontaktirate na{" "}
                <a
                  href="mailto:info@eventaj.si"
                  className="text-[#C99566] underline-offset-2 hover:underline"
                >
                  info@eventaj.si
                </a>{" "}
                ali preko telefona.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="glow" asChild>
                  <Link href="#photo-booth-pricing">
                    Rezerviraj najem photo booth
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
        <PromoImage />
        <Features {...basicBoothFeatures} />
        <PhotoBoothHowItWorks />
        <section
          id="photo-booth-pricing"
          aria-label="Cenik najema photo booth"
          className="scroll-mt-24"
        >
          <PricingPlans plans={pricingPlans} />
        </section>
        <ReferencesSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš photo booth"
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
