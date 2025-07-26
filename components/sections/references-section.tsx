import { HeroBookingDialog } from "@/components/sections/hero-booking-dialog";
import { Button } from "@/components/ui/button";
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventExamples.map((example, index) => (
              <div
                key={example.id}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card with project color border */}
                <div className="relative overflow-hidden rounded-2xl bg-card shadow-2xl hover:shadow-3xl transition-all duration-500 border border-border">
                  {/* Colorful gradient border using project colors */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-2xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-2xl animate-pulse" />
                  </div>

                  {/* Card content */}
                  <div className="relative bg-card rounded-2xl overflow-hidden">
                    {/* Image container */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={example.image}
                        alt={example.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Event type badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-full shadow-lg">
                          <Sparkles className="w-4 h-4" />
                          {example.eventType}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h4 className="font-bold text-2xl mb-3 text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {example.title}
                      </h4>
                      <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                        {example.description}
                      </p>

                      {/* Stats with project color icons */}
                      <div className="flex items-center justify-between">
                        {example.date && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span className="font-semibold">
                              {example.date}
                            </span>
                          </div>
                        )}
                        {example.attendees && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-primary-foreground" />
                            </div>
                            <span className="font-semibold">
                              {example.attendees}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client References */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
              <Star className="w-5 h-5" />
              <span className="font-semibold">Mnenja strank</span>
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Kaj pravijo naši zadovoljni uporabniki
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preverite, kaj o nas menijo stranke, ki so že uporabljale naš
              photo booth
            </p>
          </div>

          {/* Detailed References */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {references.map((reference, index) => (
              <div
                key={reference.id}
                className="group relative transform hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card with project color border */}
                <div className="relative p-8 rounded-2xl bg-card shadow-2xl hover:shadow-3xl transition-all duration-500 border border-border">
                  {/* Colorful gradient border using project colors */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-2xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-2xl animate-pulse" />
                  </div>

                  {/* Card content */}
                  <div className="relative bg-card rounded-2xl p-8">
                    {/* Quote decoration */}
                    <div className="absolute top-4 right-4 text-6xl text-primary/20 font-serif">
                      &ldquo;
                    </div>

                    <div className="flex items-start gap-6 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-primary rounded-2xl p-2 flex items-center justify-center">
                          <Image
                            src={reference.logo}
                            alt={`${reference.client} logo`}
                            width={64}
                            height={64}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <Star className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-2xl text-card-foreground mb-2">
                          {reference.client}
                        </h4>
                        <p className="text-lg text-primary font-semibold mb-4">
                          {reference.event}
                        </p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: reference.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-muted-foreground leading-relaxed text-lg relative">
                      &ldquo;{reference.description}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
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
