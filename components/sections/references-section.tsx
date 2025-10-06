"use client";

import { HeroBookingDialog } from "@/components/sections/hero-booking-dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Section from "@/components/ui/section";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Camera,
  PartyPopper,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

interface EventExample {
  id: string;
  title: string;
  eventType: string;
  description: string;
  image: string;
  date?: string;
  attendees?: string;
}

interface Reference {
  id: string;
  client: string;
  event: string;
  logo: string;
  description: string;
  rating: number;
  image?: string;
}

interface ReferencesSectionProps {
  title: string;
  description: string;
  eventExamples?: EventExample[];
  references?: Reference[];
  className?: string;
}

const defaultEventExamples: EventExample[] = [
  {
    id: "event-1",
    title: "Mlada Slovenija",
    eventType: "Srečanje članov",
    description:
      "Na dogodku je bil photo booth / foto stojnica zelo dobro sprejet in sem prepričana, da se vidimo še ob kakšni priložnosti, hvala!",
    image: "/application/primeri/msi-primer.webp",
    date: "2025",
    attendees: "1100 gostov",
  },
  {
    id: "event-2",
    title: "Forvis Marzars",
    eventType: "Poslovni dogodek",
    description:
      "Zelo korektna in profesionalna izkušnja – od začetne komunikacije do izvedbe na dogodku. Mitja je bil izjemno prijazen in zanesljiv, kar je sodelovanje naredilo res enostavno. Priporočamo vsem, ki razmišljajo o najemu photobootha – z ekipo Eventaj poteka vse gladko in brez zapletov.",
    image: "/application/primeri/forvis-mazars-primer.webp",
    date: "2025",
    attendees: "80 udeležencev",
  },
  {
    id: "event-3",
    title: "30. rojstni dan",
    eventType: "Rojstnodnevna zabava",
    description:
      "Foto stojnica je bil absolutni hit na 30. rojstnem dnevu! Gostje so govorili, da česa tako zabavnega še niso doživeli.",
    image: "/application/primeri/maja-primer.webp",
    date: "2025",
    attendees: "75 gostov",
  },
  {
    id: "event-4",
    title: "Zaključek leta",
    eventType: "Dogodek družbenega društva",
    description:
      "Photo booth je bil odlična dodatek na našem zaključku leta. Gostje so se zabavali in ustvarili nepozabne spomine.",
    image: "/application/primeri/20241214_225221741.webp",
    date: "December 2024",
    attendees: "80 gostov",
  },
  {
    id: "event-5",
    title: "Rojnodnevna zabava",
    eventType: "Rojstnodnevna zabava",
    description:
      "Naš rojnodnevni dogodek je bil še bolj poseben z vašim photo booth-om. Ekipa je bila profesionalna in gostje navdušeni.",
    image: "/application/primeri/20250612_022056055.webp",
    date: "Junij 2025",
    attendees: "50 udeležencev",
  },
  {
    id: "event-7",
    title: "Rojnodnevna zabava",
    eventType: "Rojstnodnevna zabava",
    description:
      "Photo booth je bil središče naše rojnodnevne zabave. Vsi so želeli biti del tega nepozabnega doživetja.",
    image: "/application/primeri/20250621_161011627 (4).webp",
    date: "Junij 2025",
    attendees: "80 gostov",
  },
  {
    id: "event-8",
    title: "Rojnodnevna zabava",
    eventType: "Rojstnodnevna zabava",
    description:
      "Perfekten dodatek našemu rojnodnevniemu dogodku. Zaposleni so bili navdušeni in atmosfera je bila odlična.",
    image: "/application/primeri/20250705_152814942 (4).webp",
    date: "Julij 2025",
    attendees: "90 udeležencev",
  },
  {
    id: "event-9",
    title: "Rojnodnevna zabava",
    eventType: "Rojstnodnevna zabava",
    description:
      "Photo booth je dodal poseben čar naši rojnodnevni večerji. Gostje so bili navdušeni nad rekviziti in kvaliteto fotografij.",
    image: "/application/primeri/20250726_210028119 (4).webp",
    date: "Julij 2025",
    attendees: "100 gostov",
  },
  {
    id: "event-10",
    title: "Rojnodnevna zabava",
    eventType: "Rojstni dan",
    description:
      "Najboljša odločitev za našo rojnodnevno zabavo! Foto stojnica je bila hit med gostmi vseh starosti.",
    image: "/application/primeri/20250727_145739308 (4).webp",
    date: "Julij 2025",
    attendees: "50 gostov",
  },
  {
    id: "event-11",
    title: "Poroka",
    eventType: "Poroka",
    description:
      "Odlično doživetje! Photo booth je bil središče naše poroke in vsi so bili navdušeni.",
    image: "/application/primeri/20250802_194512229.webp",
    date: "Avgust 2025",
    attendees: "110 gostov",
  },
  {
    id: "event-12",
    title: "Rojnodnevna zabava",
    eventType: "Rojstnodnevna zabava",
    description:
      "Photo booth je dodal posebno noto naši rojnodnevni zabavi. Priporočamo vsem, ki želijo nekaj posebnega.",
    image: "/application/primeri/20250815_213827130 (1).webp",
    date: "Avgust 2025",
    attendees: "95 gostov",
  },
  {
    id: "event-14",
    title: "Poroka",
    eventType: "Poroka",
    description:
      "Photo booth je bil odličen dodatek našemu poročnem dogodku. Vsi so bili navdušeni nad izkušnjo.",
    image: "/application/primeri/20250906_192544302.webp",
    date: "September 2025",
    attendees: "130 gostov",
  },
  {
    id: "event-15",
    title: "Večerna zabava",
    eventType: "Zabava",
    description:
      "Najboljši photo booth, ki smo ga imeli na naših dogodkih. Profesionalna storitev in odlične fotografije.",
    image: "/application/primeri/20250906_203416839.webp",
    date: "September 2025",
    attendees: "105 gostov",
  },
];

const defaultReferences: Reference[] = [
  {
    id: "sksg",
    client: "ŠKSG",
    event: "Zaključek leta",
    logo: "/application/sksg.webp",
    description:
      "Najem Photo Bootha in 360 Photo Bootha je bil vrhunec našega zaključka leta. Gostje so se zabavali ob ustvarjanju spominov, ki jih bomo lahko obujali še leta!",
    rating: 5,
  },
  {
    id: "autodelta",
    client: "AutoDelta",
    event: "Poslovni dogodek",
    logo: "/application/autodelta.webp",
    description:
      "Najlepša hvala za sodelovanje! 360 Photo Booth sta dodala posebno čarobnost našemu dogodku, gostje so bili navdušeni. Priporočilo gre z veseljem naprej.",
    rating: 5,
  },
  {
    id: "msi",
    client: "Mlada Slovenija",
    event: "Dogodek",
    logo: "/application/LOGO_MSI_POZ.webp",
    description:
      "Na dogodku je bil photo booth / foto stojnica zelo dobro sprejet in sem prepričana, da se vidimo še ob kakšni priložnosti, hvala!",
    rating: 5,
  },
  {
    id: "forvis",
    client: "Forvis Marzars",
    event: "Poslovni dogodek",
    logo: "/application/forvis-marzars.webp",
    description:
      "Zelo korektna in profesionalna izkušnja – od začetne komunikacije do izvedbe na dogodku. Mitja je bil izjemno prijazen in zanesljiv.",
    rating: 5,
  },
];

export function ReferencesSection({
  title,
  description,
  eventExamples = defaultEventExamples,
  references = defaultReferences,
  className,
}: ReferencesSectionProps) {
  return (
    <Section
      heading={title}
      text={description}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20",
        className
      )}
    >
      {/* Colorful background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400/40 to-emerald-400/40 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="container-lg mx-auto relative z-10">
        {/* Event Examples Gallery */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
              <Camera className="w-5 h-5" />
              <span className="font-semibold">Primeri iz dogodkov</span>
              <PartyPopper className="w-5 h-5" />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Poglejte si naše najboljše trenutke
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Od porok do poslovnih dogodkov - naš photo booth je bil del
              nepozabnih spominov
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2">
              {eventExamples.map((example, index) => (
                <CarouselItem
                  key={example.id}
                  className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div
                    className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Card with project color border */}
                    <div className="relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-2xl transition-all duration-500 border border-border">
                      {/* Colorful gradient border using project colors */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-xl animate-pulse" />
                      </div>

                      {/* Card content */}
                      <div className="relative bg-card rounded-xl overflow-hidden">
                        {/* Image container */}
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={example.image}
                            alt={example.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Event type badge */}
                          <div className="absolute top-2 left-2">
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-primary text-primary-foreground rounded-full shadow-lg">
                              <Sparkles className="w-3 h-3" />
                              {example.eventType}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-3">
                          <h4 className="font-bold text-base mb-2 text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                            {example.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
                            {example.description}
                          </p>

                          {/* Stats with project color icons */}
                          <div className="flex items-center justify-between text-xs">
                            {example.date && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                  <Calendar className="w-3 h-3 text-primary-foreground" />
                                </div>
                                <span className="font-semibold">
                                  {example.date}
                                </span>
                              </div>
                            )}
                            {example.attendees && (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <div className="w-5 h-5 bg-primary/80 rounded-full flex items-center justify-center">
                                  <Users className="w-3 h-3 text-primary-foreground" />
                                </div>
                                <span className="font-semibold text-xs">
                                  {example.attendees}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Client References */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 mb-6">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">
                Mnenja strank
              </span>
              <Star className="w-4 h-4 text-primary fill-primary" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Kaj pravijo naši zadovoljni uporabniki
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Zaupanje zadovoljnih strank po vsej Sloveniji
            </p>
          </div>

          {/* Detailed References Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-6">
              {references.map((reference) => (
                <CarouselItem
                  key={reference.id}
                  className="pl-6 md:basis-1/2 lg:basis-1/2"
                >
                  <div className="group relative h-full">
                    {/* Modern Card Design */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-card via-card to-card/95 shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 h-full">
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                      {/* Decorative corner element */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50 overflow-hidden rounded-tr-2xl" />

                      {/* Card content */}
                      <div className="relative p-6 md:p-8 h-full flex flex-col">
                        {/* Rating stars at top */}
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: reference.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                              />
                            )
                          )}
                        </div>

                        {/* Testimonial text */}
                        <blockquote className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6 flex-1 italic">
                          &ldquo;{reference.description}&rdquo;
                        </blockquote>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

                        {/* Client info */}
                        <div className="flex items-center gap-4">
                          <div className="relative shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-2.5 flex items-center justify-center ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                              <Image
                                src={reference.logo}
                                alt={`${reference.client} logo`}
                                width={48}
                                height={48}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-lg text-card-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">
                              {reference.client}
                            </h4>
                            <p className="text-sm text-muted-foreground font-medium">
                              {reference.event}
                            </p>
                          </div>
                          <div className="shrink-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                              <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-card border-2 border-primary/20 hover:bg-primary hover:border-primary" />
            <CarouselNext className="hidden md:flex -right-12 bg-card border-2 border-primary/20 hover:bg-primary hover:border-primary" />
          </Carousel>

          {/* Social proof stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                25+
              </div>
              <div className="text-sm text-muted-foreground">
                Zadovoljnih strank
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/60 text-yellow-400/60"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                4.8 povprečna ocena
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                35+
              </div>
              <div className="text-sm text-muted-foreground">
                Uspešnih dogodkov
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full shadow-lg mb-8 transform hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-6 h-6" />
            <span className="text-lg font-bold">
              Pridružite se našim zadovoljnim strankam
            </span>
            <PartyPopper className="w-6 h-6" />
          </div>
          <p className="text-xl text-muted-foreground mb-10">
            Ustvarite nepozabne spomine z našim photo booth-om
          </p>
          <HeroBookingDialog>
            <Button
              variant="glow"
              size="lg"
              className="relative overflow-hidden group px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Camera className="w-6 h-6" />
                Rezerviraj termin
                <Sparkles className="w-6 h-6" />
              </span>
            </Button>
          </HeroBookingDialog>
        </div>
      </div>
    </Section>
  );
}
