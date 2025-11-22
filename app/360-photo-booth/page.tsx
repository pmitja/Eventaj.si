import { CTAContactSection } from "@/components/sections/cta-contact-section";
import Features from "@/components/sections/features";
import { threeSixtyFeatures } from "@/components/sections/features-content";
import HowItWorks from "@/components/sections/how-it-works";
import { PricingPlans } from "@/components/sections/pricing-plans";
import PromoImage from "@/components/sections/promo-image";
import { ReferencesSection } from "@/components/sections/references-section";
import WhenToChoose from "@/components/sections/when-to-choose";
import ThreeSixtyHero from "@/components/three-sixty-hero";
import { Button } from "@/components/ui/button";
import { threeSixtyWhenToChoose } from "@/content/when-to-choose";
import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";

export const metadata: Metadata = {
  title: "360° Photo Booth 299€ - Viralni TikTok Posnetki! | Eventaj.si",
  description:
    "🎆 360° Photo Booth - HIT za TikTok & Instagram! Od 299€/2h. ✨ Slow motion posnetki ✅ QR deljenje ✅ Vsi rekviziti. Postani viralen!",
  keywords: [
    "360 photo booth najem",
    "photobooth 360",
    "360 photobooth",
    "360 photo booth",
    "foto booth 360",
    "360 fotografiranje",
    "360 video booth",
    "360 photo booth za poroko",
    "najem 360 photo booth Ljubljana",
    "360 photo booth cena",
  ],
  openGraph: {
    title: "360° Photo Booth 299€ - Viralni TikTok Posnetki! | Eventaj.si",
    description:
      "🎆 360° Photo Booth - HIT za TikTok & Instagram! Od 299€/2h. ✨ Slow motion posnetki ✅ QR deljenje ✅ Vsi rekviziti. Postani viralen!",
    url: "https://eventaj.si/360-photo-booth",
    siteName: "Eventaj.si",
    images: [
      {
        url: "/og/photo-booth.webp",
        width: 1200,
        height: 630,
        alt: "360 Photo Booth Najem - Eventaj.si",
      },
    ],
    locale: "sl_SI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "360° Photo Booth 299€ - Viralni TikTok Posnetki! | Eventaj.si",
    description:
      "🎆 360° Photo Booth - HIT za TikTok & Instagram! Od 299€/2h. ✨ Slow motion posnetki ✅ QR deljenje ✅ Vsi rekviziti. Postani viralen!",
    images: ["/og/photo-booth.webp"],
  },
  alternates: {
    canonical: "https://eventaj.si/360-photo-booth",
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

const pricingPlans = [
  {
    name: "Mini paket",
    price: "299",
    period: "2 uri",
    features: [
      "najem do 2 uri",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Idealno za manjše dogodke in zabave",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: false,
  },
  {
    name: "Osnovni paket",
    price: "349",
    period: "3 ure",
    features: [
      "najem do 3 ure",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Najpogostejša izbira za poroke in večje dogodke",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
    isPopular: true,
  },
  {
    name: "Maxi paket",
    price: "399",
    period: "4 ure",
    features: [
      "najem do 4 ure",
      "vključeni različni rekviziti",
      "priprava digitalnega okvirja (4 predlogi)",
      "delitev videoposnetkov preko QR kode in Airdrop-a",
      "pomoč pri uporabi",
    ],
    description: "Za tiste, ki želijo popolno izkušnjo",
    buttonText: "Rezerviraj termin",
    href: "/kontakt",
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
  "Neomejeno snemanje in takojšnje deljenje posnetkov",
] as const;

export default function ThreeSixtyPhotoBooth() {
  return (
    <>
      <JsonLd<Service>
        item={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "360 Photo Booth Najem",
          provider: {
            "@type": "LocalBusiness",
            name: "Eventaj.si",
            image: "https://eventaj.si/logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lenart v Slovenskih goricah",
              addressRegion: "Slovenija",
              postalCode: "2230",
              streetAddress: "Slomškova ulica 1",
            },
            telephone: "+386 31 285 143",
          },
          areaServed: "Slovenija",
          description:
            "Profesionalni najem 360 photo booth naprave za dogodke, poroke in zabave. Vključuje operaterja, rekvizite in takojšnje deljenje posnetkov. Specifikacije: platforma premera 100cm, 360-stopinjsko snemanje v slow motion, deljenje preko QR kode, Airdrop-a, e-pošte in družbenih omrežij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "299",
            highPrice: "499",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil: "2025-12-31",
          },
          serviceType: "360 Photo Booth Rental",
          category: ["360 Photo Booth", "Event Services", "Video Services"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "360 Photo Booth Packages",
            itemListElement: pricingPlans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price,
              priceCurrency: "EUR",
              description: plan.description,
              itemOffered: {
                "@type": "Service",
                name: `${plan.name} 360 Photo Booth Package`,
                description: plan.features.join(", "),
              },
            })),
          },
          termsOfService: "https://eventaj.si/pogoji-poslovanja",
          serviceOutput: {
            "@type": "Thing",
            name: "360 Photo Booth Experience",
            description:
              "Platform Size: 100cm diameter, Video Type: 360-degree slow motion, Sharing Options: QR code, Airdrop, Email, Social Media",
          },
        }}
      />

      <main className="pt-[48px]">
        <ThreeSixtyHero />
        <section
          aria-labelledby="360-photo-booth-slovenia-heading"
          className="container mx-auto px-4 py-12 md:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#C99566]">
                Eventaj.si
              </p>
              <h2
                id="360-photo-booth-slovenia-heading"
                className="mt-3 text-3xl font-semibold leading-snug md:text-4xl"
              >
                360 Photo Booth najem po celi Sloveniji
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Z našo 360° kamero pridemo kamor koli – od Ljubljane in Maribora
                do Kopra in Novega mesta. Ustvarite nepozabne videoposnetke, ki
                bodo preplavili družbena omrežja. Prevoz, postavitev in
                asistenca so vključeni.
              </p>
              <p className="mt-3 text-muted-foreground">
                Vsak najem vključuje personalizirane predloge, rekvizite,
                takojšnje deljenje ter podporo v slovenskem in angleškem jeziku.
                Pišite na{" "}
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
                  <Link href="#360-pricing">Rezerviraj 360 Photo Booth</Link>
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
        <WhenToChoose content={threeSixtyWhenToChoose} />
        <PromoImage />
        <Features {...threeSixtyFeatures} />
        <HowItWorks type="360" />
        <section
          id="360-pricing"
          aria-label="Cenik najema 360 photo booth"
          className="scroll-mt-24"
        >
          <PricingPlans plans={pricingPlans} />
        </section>
        <ReferencesSection
          title="Kaj pravijo naši zadovoljni uporabniki"
          description="Preverite, kaj o nas menijo stranke, ki so že uporabljale naš 360° photo booth"
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
