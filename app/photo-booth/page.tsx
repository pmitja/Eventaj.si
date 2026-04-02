import { CTABookingDialog } from "@/components/sections/cta-booking-dialog";
import { HeroBookingDialog } from "@/components/sections/hero-booking-dialog";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "react-schemaorg";
import { Service } from "schema-dts";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  Heart,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  Printer,
  Phone,
  Share2,
  Smile,
  Star,
  Truck,
  Users,
  Flame,
  type LucideIcon,
} from "lucide-react";

const photoBoothPageTitle = "Photo booth najem po Sloveniji od 279 € | Eventaj.si";

export const metadata: Metadata = {
  title: photoBoothPageTitle,
  description:
    "Photo booth najem za poroke, zabave in poslovne dogodke po celotni Sloveniji (Ljubljana, Maribor, Celje, Primorska, Gorenjska). Od 279 €/2h z neomejenimi fotografijami, rekviziti, takojšnjim tiskom, spletno galerijo in brezplačnim prevozom. Pokličite 031 285 143.",
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
    title: photoBoothPageTitle,
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
    title: photoBoothPageTitle,
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

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  tag: string;
  isPopular?: boolean;
  features: string[];
}

interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  video: string;
  icon: LucideIcon;
}

interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface TestimonialCard {
  name: string;
  event: string;
  quote: string;
  image: string;
  logo?: string;
  logoAlt?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "279",
    period: "2 uri",
    description: "Popoln paket za manjše dogodke in zabave.",
    tag: "Za manjše dogodke",
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
  },
  {
    name: "Standard",
    price: "329",
    period: "3 ure",
    description: "Najbolj priljubljen paket za večje dogodke.",
    tag: "Najbolj priljubljeno",
    isPopular: true,
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
  },
  {
    name: "Premium",
    price: "379",
    period: "4 ure",
    description: "Premium paket za posebne priložnosti.",
    tag: "Za daljši program",
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
  },
];

const serviceAreas = [
  "Ljubljana, Domžale in Kamnik",
  "Maribor, Ptuj in celotna Štajerska",
  "Celje, Velenje in Savinjska",
  "Koper, Obala in Primorska",
  "Novo mesto, Dolenjska in Bela krajina",
  "Kranj, Gorenjska in okolica",
] as const;

const serviceGuarantees = [
  "Brezplačen prevoz do 20 km iz Lenarta v Slovenskih goricah",
  "Profesionalen operater, ki vodi goste in skrbi za opremo",
  "Personalizirane predloge in rekviziti, prilagojeni dogodku",
  "Neomejeno tiskanje fotografij in spletna galerija",
] as const;

const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "1",
    title: "Izberite rekvizite",
    description:
      "Očala, table z napisi, pokrivala in tematski dodatki poskrbijo, da je vsaka fotografija drugačna.",
    video: "/application/video/photo-booth/izberi-rekvizite.mp4",
    icon: Smile,
  },
  {
    number: "2",
    title: "Pozirajte pred kamero",
    description:
      "Photo booth vodi goste skozi fotografiranje, vi pa se prepustite poziranju in zabavi v skupini.",
    video: "/application/video/photo-booth/poziraj.mp4",
    icon: Camera,
  },
  {
    number: "3",
    title: "Tiskajte in delite",
    description:
      "Fotke lahko takoj natisnete, pošljete na telefon ali dostopate do njih kasneje v spletni galeriji.",
    video: "/application/video/photo-booth/prevzami-slike.mp4",
    icon: Share2,
  },
];

const featureCards: FeatureCard[] = [
  {
    icon: Users,
    title: "Odlična ekipa",
    description:
      "Prijazno in zanesljivo osebje poskrbi za postavitev, delovanje in pomoč gostom skozi celoten najem.",
  },
  {
    icon: Truck,
    title: "Prevoz po Sloveniji",
    description:
      "Z ekipo pridemo na lokacijo po celotni Sloveniji, zato lahko photo booth vključite tudi v oddaljene dogodke.",
  },
  {
    icon: ImageIcon,
    title: "Personalizirane predloge",
    description:
      "Uredimo grafiko fotografij glede na vaš dogodek, poroko, rojstni dan ali branding podjetja.",
  },
  {
    icon: Printer,
    title: "Kakovosten tisk",
    description:
      "Takojšnje tiskanje na dogodku in digitalne kopije za deljenje po e-pošti, QR kodi ali AirDrop-u.",
  },
  {
    icon: Camera,
    title: "Profesionalna kakovost",
    description:
      "Kombinacija osvetlitve in kamere zagotovi čiste, ostre in estetske fotografije tudi v večernih terminih.",
  },
  {
    icon: Share2,
    title: "Digitalni spomini",
    description:
      "Po dogodku prejmete tudi spletno galerijo, da lahko fotografije enostavno delite z vsemi gosti.",
  },
];

const testimonials: TestimonialCard[] = [
  {
    name: "Mlada Slovenija",
    event: "Večji dogodek",
    quote:
      "Na dogodku je bil photo booth zelo dobro sprejet in sem prepričana, da se vidimo še ob kakšni priložnosti.",
    image: "/application/primeri/msi-primer.webp",
    logo: "/application/LOGO_MSI_POZ.webp",
    logoAlt: "Mlada Slovenija logo",
  },
  {
    name: "Forvis Mazars",
    event: "Poslovni dogodek",
    quote:
      "Zelo korektna in profesionalna izkušnja – od začetne komunikacije do izvedbe. Sodelovanje je bilo res enostavno.",
    image: "/application/primeri/forvis-mazars-primer.webp",
    logo: "/application/forvis-marzars.webp",
    logoAlt: "Forvis Mazars logo",
  },
  {
    name: "Maja",
    event: "30. rojstni dan",
    quote:
      "Foto stojnica je bila absolutni hit na rojstnem dnevu. Gostje so govorili, da česa tako zabavnega še niso doživeli.",
    image: "/application/primeri/maja-primer.webp",
  },
];

const galleryImages = [
  "/application/primeri/20250802_194512229.webp",
  "/application/primeri/20250906_192544302.webp",
  "/application/primeri/20250906_203416839.webp",
  "/application/primeri/20250815_230030593.webp",
];

const trustedLogos = [
  {
    src: "/application/sksg.webp",
    alt: "ŠKSG",
  },
  {
    src: "/application/autodelta.webp",
    alt: "AutoDelta",
  },
  {
    src: "/application/LOGO_MSI_POZ.webp",
    alt: "Mlada Slovenija",
  },
  {
    src: "/application/forvis-marzars.webp",
    alt: "Forvis Mazars",
  },
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
            "Profesionalni najem photo booth naprave za poroke, poslovne dogodke, festivale in zabave po vsej Sloveniji. Vključuje operaterja, rekvizite, personalizirane predloge in takojšnje tiskanje fotografij.",
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "279",
            highPrice: "379",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2024-01-01",
            priceValidUntil: "2026-12-31",
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
            { "@type": "Service", name: "Wedding Services" },
            { "@type": "Service", name: "Event Planning" },
            { "@type": "Service", name: "Party Services" },
          ],
          additionalType: [
            "https://schema.org/PhotographyStore",
            "https://schema.org/EventService",
            "https://schema.org/EntertainmentBusiness",
          ],
        }}
      />

      <main className="relative overflow-hidden bg-background pt-[48px]">
        <section
          aria-labelledby="photo-booth-hero-heading"
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#ead8c7] via-[#f8f1e8] to-[#fffaf6] dark:from-[#191919] dark:via-background dark:to-background" />
          <div className="absolute -top-16 right-[-10%] -z-10 h-72 w-72 rounded-full bg-[#C99566]/20 blur-3xl md:h-96 md:w-96" />
          <div className="absolute left-[-15%] top-1/3 -z-10 h-64 w-64 rounded-full bg-[#94A3B8]/20 blur-3xl md:h-80 md:w-80" />

          <div className="container-lg pb-16 pt-32 md:pb-24 md:pt-36">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:items-center">
              <div className="max-w-3xl">
                <AnimateIn direction="down" delay={0.1}>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400">
                    <Flame className="h-4 w-4 fill-current" />
                    <span>Vikend termini se hitro polnijo!</span>
                  </div>
                </AnimateIn>

                <AnimateIn direction="up" delay={0.2}>
                  <h1
                    id="photo-booth-hero-heading"
                    className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                  >
                    {photoBoothPageTitle}
                  </h1>
                </AnimateIn>

                <AnimateIn direction="up" delay={0.3}>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Najem photo booth stojnice z neomejenimi fotografijami,
                    zabavnimi rekviziti in takojšnjim tiskom. Ekipa Eventaj pride
                    na vašo lokacijo, postavi opremo in vodi goste skozi celotno
                    izkušnjo.
                  </p>
                </AnimateIn>

                <AnimateIn direction="up" delay={0.4}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <HeroBookingDialog defaultBoothType="photo-booth">
                      <Button variant="glow" size="lg" className="group gap-2 relative overflow-hidden transition-all hover:scale-105">
                        Rezerviraj termin
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Button>
                    </HeroBookingDialog>

                    <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-transform">
                      <Link href="#paketi">Preveri pakete</Link>
                    </Button>

                    <Button variant="outline" size="lg" asChild className="hover:scale-105 transition-transform">
                      <a href="tel:+38631285143">Pokliči 031 285 143</a>
                    </Button>
                  </div>
                </AnimateIn>

                <AnimateIn direction="up" delay={0.5}>
                  <div className="mt-8 rounded-2xl border border-black/10 bg-white/85 p-5 text-foreground shadow-xl shadow-[#b59a82]/15 backdrop-blur transition-all hover:bg-white dark:border-white/10 dark:bg-zinc-900/70 dark:text-white dark:shadow-black/20 dark:hover:bg-zinc-900/80">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex -space-x-2">
                        {trustedLogos.map((logo) => (
                          <div
                            key={logo.alt}
                            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white shadow-sm transition-transform hover:scale-110 hover:z-10"
                          >
                            <Image
                              src={logo.src}
                              alt={logo.alt}
                              fill
                              sizes="40px"
                              className="object-contain p-1"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-[#f6c66e] mb-0.5">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-2 font-semibold text-foreground dark:text-white">5.0 ocena</span>
                        </div>
                        <p className="text-muted-foreground dark:text-zinc-300">
                          Preverjena izbira za poroke in poslovne dogodke
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>

                <AnimateIn direction="up" delay={0.6}>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {serviceGuarantees.slice(0, 4).map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm transition-colors hover:bg-white hover:border-black/20 dark:border-white/10 dark:bg-zinc-900/60 dark:text-white dark:hover:bg-zinc-900/80 dark:hover:border-white/20"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C99566]" />
                        <span className="text-foreground/80 dark:text-zinc-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              </div>

              <div className="relative lg:justify-self-end">
                <AnimateIn direction="left" delay={0.3}>
                  <div className="absolute -right-6 top-10 h-40 w-40 rounded-full bg-[#94A3B8]/20 blur-2xl animate-pulse" />
                  <div className="absolute -left-4 bottom-8 h-44 w-44 rounded-full bg-[#C99566]/20 blur-2xl animate-pulse delay-1000" />

                  <div className="relative mx-auto w-full max-w-xl">
                    <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
                      <div className="group overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-b from-[#f3ece3] to-white p-4 text-foreground shadow-2xl shadow-[#b59a82]/15 sm:p-5 transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-950 dark:text-white dark:shadow-black/20">
                        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-3 dark:border-white/10 dark:bg-white/5">
                          <Image
                            src="/application/photo-booth-device.webp"
                            alt="Photo booth naprava Eventaj"
                            width={828}
                            height={1123}
                            priority
                            className="mx-auto h-auto w-full max-w-[280px] object-contain sm:max-w-none transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-4 rounded-2xl border border-black/10 bg-white/85 p-4 backdrop-blur transition-colors group-hover:bg-white dark:border-white/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C99566]/15 text-[#C99566] shadow-inner">
                              <Printer className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground dark:text-white">Neomejeno tiskanje</p>
                              <p className="text-xs text-muted-foreground dark:text-zinc-300">
                                Fotografije takoj na dogodku
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <AnimateIn direction="right" delay={0.4}>
                          <div className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-[#b59a82]/15 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/20">
                            <div className="relative">
                              <Image
                                src="/application/photo-booth.webp"
                                alt="Gostje uporabljajo photo booth"
                                width={1800}
                                height={1200}
                                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-opacity group-hover:opacity-80" />
                              <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                                Eventaj photo booth izkušnja
                              </div>
                            </div>
                          </div>
                        </AnimateIn>

                        <AnimateIn direction="right" delay={0.5}>
                          <div className="group rounded-2xl border border-[#C99566]/25 bg-white/90 p-4 text-foreground shadow-lg shadow-[#b59a82]/15 transition-all hover:bg-white dark:bg-zinc-900/90 dark:text-white dark:shadow-black/20 dark:hover:bg-zinc-800">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C99566]/15 text-[#C99566] transition-transform group-hover:scale-110">
                                <Smile className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Zabavni rekviziti</p>
                                <p className="text-xs text-muted-foreground dark:text-zinc-300">očala, table, pokrivala</p>
                              </div>
                            </div>
                          </div>
                        </AnimateIn>

                        <AnimateIn direction="right" delay={0.6}>
                          <div className="group rounded-2xl border border-black/10 bg-gradient-to-br from-[#f1e4d6] to-white p-4 text-foreground shadow-xl shadow-[#b59a82]/15 transition-transform hover:-translate-y-1 hover:shadow-[#C99566]/10 dark:border-white/10 dark:bg-gradient-to-br dark:from-[#18191d] dark:to-[#101114] dark:text-white dark:shadow-black/20">
                            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 dark:text-white/60">Od</p>
                            <p className="mt-1 text-3xl font-bold tracking-tight text-[#f0c89b]">
                              279€
                              <span className="ml-2 text-base font-medium text-foreground/65 dark:text-white/70">/ 2h</span>
                            </p>
                            <p className="mt-2 text-xs text-muted-foreground dark:text-white/70">
                              Postavitev, asistenca in personalizacija vključeni.
                            </p>
                          </div>
                        </AnimateIn>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="coverage-heading"
          className="border-y border-black/5 bg-[#f2ede7] py-10 dark:border-white/10 dark:bg-[#111216]"
        >
          <div className="container-lg">
            <AnimateIn direction="up">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C99566]">
                    Pokrivamo celotno Slovenijo
                  </p>
                  <h2
                    id="coverage-heading"
                    className="mt-3 text-2xl font-bold text-foreground md:text-3xl dark:text-white"
                  >
                    Photo booth dostavimo tja, kjer je zabava.
                  </h2>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    {serviceAreas.map((area, index) => (
                      <AnimateIn
                        key={area}
                        direction="up"
                        delay={0.1 + index * 0.05}
                        className="max-w-full"
                      >
                        <div className="flex w-full cursor-default items-start gap-2 rounded-2xl border border-black/10 bg-white/75 px-4 py-3 text-sm text-foreground shadow-sm transition-colors hover:border-black/20 hover:bg-white sm:inline-flex sm:w-auto sm:items-center sm:rounded-full sm:py-2 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C99566] sm:mt-0" />
                          <span className="min-w-0 leading-snug">{area}</span>
                        </div>
                      </AnimateIn>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 rounded-2xl border border-black/10 bg-white/85 p-5 text-foreground shadow-lg shadow-[#b59a82]/15 dark:border-white/10 dark:bg-zinc-900/70 dark:text-white dark:shadow-black/20">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-muted-foreground dark:text-zinc-300">
                      Zaupajo nam tudi ekipe in podjetja
                    </p>
                    <span className="text-xs text-[#C99566]">
                      Ponavljajoča sodelovanja
                    </span>
                  </div>

                  <div className="mt-4 min-w-0 space-y-3">
                    {[false, true].map((reverseRow, rowIndex) => (
                      <div
                        key={`logo-row-${rowIndex}`}
                        className="relative min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-[#ece6df] p-2 dark:border-white/10 dark:bg-[#0e1014]"
                      >
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#ece6df] to-transparent dark:from-[#0e1014]" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#ece6df] to-transparent dark:from-[#0e1014]" />

                        <div className="flex min-w-0 overflow-hidden [--duration:22s] [--gap:0.75rem]">
                          {[0, 1].map((copyIndex) => (
                            <div
                              key={`logo-copy-${rowIndex}-${copyIndex}`}
                              aria-hidden={copyIndex === 1}
                              className={[
                                "flex shrink-0 items-center gap-3 pr-3 animate-marquee motion-reduce:animate-none [--duration:22s] [--gap:0.75rem]",
                                reverseRow ? "[animation-direction:reverse]" : "",
                              ].join(" ")}
                            >
                              {trustedLogos.map((logo) => (
                                <div
                                  key={`${rowIndex}-${copyIndex}-${logo.alt}`}
                                  className="relative flex h-12 w-28 items-center justify-center rounded-xl border border-white/10 bg-white p-3 transition-opacity hover:opacity-90 sm:h-14 sm:w-40"
                                >
                                  <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    sizes="160px"
                                    className="object-contain p-2"
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section
          id="kako-deluje"
          aria-labelledby="how-it-works-heading"
          className="scroll-mt-28 py-16 md:py-24"
        >
          <div className="container-lg">
            <AnimateIn direction="up">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                  Kako deluje
                </p>
                <h2 id="how-it-works-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Od rezervacije do spominov v treh preprostih korakih
                </h2>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  Enostaven potek, ki goste hitro vključi v dogajanje in poskrbi,
                  da nastanejo fotografije, ki jih z veseljem odnesejo domov.
                </p>
              </div>
            </AnimateIn>

            <div className="relative mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="pointer-events-none absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-[#C99566]/40 to-transparent lg:block" />

              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <AnimateIn key={step.number} direction="up" delay={index * 0.2}>
                    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/85 p-0 text-white shadow-xl shadow-black/20 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#C99566]/10">
                      <div className="absolute right-4 top-3 text-6xl font-black leading-none text-white/[0.05] transition-colors group-hover:text-[#C99566]/10">
                        {step.number}
                      </div>

                      <div className="flex items-center gap-3 px-5 pt-5 md:px-6 md:pt-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C99566]/15 text-[#C99566] transition-transform group-hover:scale-110 group-hover:bg-[#C99566]/25">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                            Korak {step.number}
                          </p>
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                        </div>
                      </div>

                      <div className="px-4 pt-4 md:px-5">
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-inner group-hover:border-white/20 transition-colors">
                          <div className="h-[21rem] bg-black sm:h-[24rem] lg:h-[22rem] xl:h-[24rem]">
                            <video
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                            >
                              <source src={step.video} type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pb-6 pt-4 md:px-6 md:pb-6">
                        <p className="min-h-[72px] text-sm leading-relaxed text-zinc-300 md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="prednosti"
          aria-labelledby="benefits-heading"
          className="scroll-mt-28 bg-[#fbfaf8] py-16 dark:bg-[#171717] md:py-24"
        >
          <div className="container-lg">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <AnimateIn direction="left">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C99566]">
                    Prednosti
                  </p>
                  <h2 id="benefits-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                    Photo booth, ki zabava goste in olajša organizacijo dogodka
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    Fotograf. Povod k pogovoru. Ustvarjalec spominov. Naša photo
                    booth postavitev je zasnovana tako, da deluje brez stresa za
                    organizatorja, hkrati pa gostom ponudi hitro in zabavno
                    izkušnjo s profesionalnim rezultatom.
                  </p>
                </AnimateIn>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {featureCards.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <AnimateIn key={feature.title} direction="up" delay={index * 0.1}>
                        <div className="group flex gap-4 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 text-white shadow-sm transition-all hover:bg-zinc-900 hover:border-white/20 hover:-translate-y-1">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#94A3B8]/15 text-[#5f7fa3] dark:text-[#a7bdd4] transition-colors group-hover:bg-[#C99566]/20 group-hover:text-[#C99566]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold md:text-base">
                              {feature.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </AnimateIn>
                    );
                  })}
                </div>
              </div>

              <div className="relative">
                <AnimateIn direction="right">
                  <div className="absolute -right-4 -top-4 h-28 w-28 rounded-3xl border border-[#C99566]/20 bg-[#C99566]/10 animate-pulse" />
                  <div className="group rounded-3xl border border-white/10 bg-zinc-900 p-4 text-white shadow-2xl shadow-black/20 md:p-5 relative z-10">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src="/application/photo-booth.webp"
                        alt="Photo booth najem na dogodku"
                        width={1800}
                        height={1200}
                        className="h-auto w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/95 p-5 md:p-6 transition-colors group-hover:border-white/20">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C99566]/15 text-[#C99566]">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Vedno vključeno</p>
                          <p className="text-sm text-zinc-300">
                            brez skritih stroškov za osnovni setup
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {serviceGuarantees.slice(0, 3).map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C99566]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        <AnimateIn direction="none" delay={0.2}>
          <section className="relative h-28 overflow-hidden border-y border-black/5 md:h-36 dark:border-white/10">
            <Image
              src="/application/promo-image.webp"
              alt="Photo booth promocijska fotografija"
              width={1728}
              height={245}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
          </section>
        </AnimateIn>

        <section
          id="paketi"
          aria-labelledby="pricing-heading"
          className="scroll-mt-28 bg-[#0f1115] py-16 text-white md:py-24"
        >
          <div className="container-lg">
            <AnimateIn direction="up">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C99566]">
                  Paketi
                </p>
                <h2 id="pricing-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Izberi paket po meri svojega dogodka
                </h2>
                <p className="mt-4 text-base text-white/70 md:text-lg">
                  Vsi paketi vključujejo postavitev, upravljanje photo bootha,
                  rekvizite, personalizacijo fotografij in digitalne kopije.
                </p>
              </div>
            </AnimateIn>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <AnimateIn key={plan.name} direction="up" delay={index * 0.15}>
                  <article
                    className={[
                      "group relative flex h-full flex-col rounded-3xl border p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[#C99566]/20",
                      plan.isPopular
                        ? "border-[#C99566]/60 bg-gradient-to-b from-[#2a2119] to-[#171514] md:-translate-y-3"
                        : "border-white/10 bg-white/5 backdrop-blur hover:bg-white/10",
                    ].join(" ")}
                  >
                    {plan.isPopular && (
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C99566] px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2a1a0b] shadow-lg shadow-[#C99566]/30">
                        {plan.tag}
                      </div>
                    )}

                    {!plan.isPopular && (
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                        {plan.tag}
                      </p>
                    )}

                    <h3 className="mt-2 text-2xl font-bold">{plan.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{plan.description}</p>

                    <div className="mt-6 flex items-end gap-2">
                      <span className="text-4xl font-bold tracking-tight text-[#f0c89b]">
                        {plan.price}€
                      </span>
                      <span className="pb-1 text-sm text-white/60">/ {plan.period}</span>
                    </div>

                    <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
                      {plan.features.map((feature) => (
                        <li key={`${plan.name}-${feature}`} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C99566]" />
                          <span className="text-white/85">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <HeroBookingDialog
                      defaultBoothType="photo-booth"
                      defaultPackage={index}
                    >
                      <Button
                        variant={plan.isPopular ? "glow" : "outline"}
                        className={[
                          "mt-8 w-full transition-all",
                          plan.isPopular
                            ? "group-hover:scale-105"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white group-hover:border-white/30",
                        ].join(" ")}
                      >
                        Rezerviraj termin
                      </Button>
                    </HeroBookingDialog>
                  </article>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <section
          id="mnenja"
          aria-labelledby="testimonials-heading"
          className="scroll-mt-28 py-16 md:py-24"
        >
          <div className="container-lg">
            <AnimateIn direction="up">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
                  Mnenja in primeri
                </p>
                <h2 id="testimonials-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Kaj pravijo naročniki in kako izgleda izkušnja v praksi
                </h2>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  Nekaj primerov dogodkov in povratnih informacij, kjer je bil
                  photo booth osrednji del zabave.
                </p>
              </div>
            </AnimateIn>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <AnimateIn key={testimonial.name} direction="up" delay={index * 0.1}>
                  <article className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 text-white shadow-xl shadow-black/20 transition-all hover:-translate-y-2 hover:shadow-2xl hover:bg-zinc-900">
                    <div className="relative">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.event} - ${testimonial.name}`}
                        width={1800}
                        height={1200}
                        className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity group-hover:opacity-80" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        <Star className="h-3.5 w-3.5 fill-current text-[#f6c66e]" />
                        <span>5.0</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-white">{testimonial.name}</h3>
                          <p className="text-sm text-zinc-300">
                            {testimonial.event}
                          </p>
                        </div>
                        {testimonial.logo && (
                          <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md border border-black/5 bg-white dark:border-white/10">
                            <Image
                              src={testimonial.logo}
                              alt={testimonial.logoAlt ?? testimonial.name}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-300 md:text-base italic">
                        “{testimonial.quote}”
                      </p>
                    </div>
                  </article>
                </AnimateIn>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {galleryImages.map((image, idx) => (
                <AnimateIn key={image} direction="up" delay={idx * 0.1}>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-sm group">
                    <Image
                      src={image}
                      alt={`Photo booth galerija ${idx + 1}`}
                      width={1800}
                      height={1200}
                      className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <section
          id="kontakt"
          aria-labelledby="contact-heading"
          className="scroll-mt-28 pb-20 md:pb-24"
        >
          <div className="container-lg">
            <AnimateIn direction="up">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101217] via-[#141720] to-[#1c1712] p-4 text-white shadow-2xl shadow-black/20 md:p-6">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#C99566]/20 blur-3xl animate-pulse" />
                  <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#94A3B8]/20 blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur md:p-8">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C99566]/15 text-[#f0c89b]">
                      <Heart className="h-7 w-7" />
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C99566]">
                      Rezervacija termina
                    </p>
                    <h2
                      id="contact-heading"
                      className="mt-3 text-3xl font-bold tracking-tight md:text-4xl"
                    >
                      Rezervirajte svoj photo booth termin
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                      Pošljite povpraševanje in pripravimo ponudbo glede na datum,
                      lokacijo, trajanju najema in tipu dogodka. Vikend termini se
                      hitro polnijo, zato priporočamo rezervacijo čim prej.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <CTABookingDialog>
                        <Button variant="glow" size="lg" className="gap-2 transition-transform hover:scale-105">
                          <MessageSquare className="h-4 w-4" />
                          Pošlji povpraševanje
                        </Button>
                      </CTABookingDialog>

                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white transition-all hover:scale-105"
                      >
                        <a href="mailto:info@eventaj.si">info@eventaj.si</a>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="border-white/20 bg-white/5 text-white hover:bg-white/15 hover:text-white transition-all hover:scale-105"
                      >
                        <a href="tel:+38631285143">031 285 143</a>
                      </Button>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                          Odgovor
                        </p>
                        <p className="mt-2 text-lg font-semibold">Hiter kontakt</p>
                        <p className="mt-1 text-sm text-zinc-300">
                          Po navadi odgovorimo še isti dan.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                          Vključeno
                        </p>
                        <p className="mt-2 text-lg font-semibold">
                          Ponudba po meri
                        </p>
                        <p className="mt-1 text-sm text-zinc-300">
                          Cena, logistika in personalizacija fotografij.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/50">
                      <div className="relative">
                        <Image
                          src="/application/primeri/msi-primer.webp"
                          alt="Photo booth primer dogodka"
                          width={1800}
                          height={1200}
                          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur transition-colors group-hover:bg-black/50">
                          <p className="text-sm font-semibold text-white">
                            Kaj vključimo v ponudbo
                          </p>
                          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C99566]" />
                              <span>Ceno glede na trajanje najema in lokacijo</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C99566]" />
                              <span>
                                Predlog personalizacije fotografij za vaš dogodek
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C99566]" />
                              <span>
                                Informacije o postavitvi, prostoru in logistiki
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-5 backdrop-blur md:p-6 transition-colors hover:bg-zinc-900/80">
                      <p className="text-sm font-semibold text-white">
                        Hiter kontakt
                      </p>
                      <div className="mt-4 grid gap-3">
                        <a
                          href="mailto:info@eventaj.si"
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all hover:bg-white/10 hover:scale-[1.02]"
                        >
                          <MessageSquare className="h-4 w-4 text-[#94A3B8]" />
                          <span>info@eventaj.si</span>
                        </a>
                        <a
                          href="tel:+38631285143"
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all hover:bg-white/10 hover:scale-[1.02]"
                        >
                          <Phone className="h-4 w-4 text-[#C99566]" />
                          <span>+386 31 285 143</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
    </>
  );
}
