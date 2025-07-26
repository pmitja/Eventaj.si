import {
  TestimonialAuthor,
  TestimonialCard,
} from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";
import Section from "../ui/section";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials?: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

const testimonials = [
  {
    author: {
      name: "Mojca Šauperl - ŠKSG",
      title: "Dogodek podjetja",
      image: "/application/sksg.webp",
    },
    text: "Najem Photo Bootha in 360 Photo Bootha je bil vrhunec našega zaključka leta. Gostje so se zabavali ob ustvarjanju spominov, ki jih bomo lahko obujali še leta!",
  },
  {
    author: {
      name: "Jure Tadina - AutoDelta",
      title: "Dogodek podjetja",
      image: "/application/autodelta.webp",
    },
    text: "Najlepša hvala za sodelovanje! 360 Photo Booth sta dodala posebno čarobnost našemu dogodku, gostje so bili navdušeni. Priporočilo gre z veseljem naprej. Želim vam uspešen december!",
  },
  {
    author: {
      name: "Eva in Ana",
      title: "Rojstnodnevna zabava",
    },
    text: "360 Photo Booth je bil absolutni hit na najinem 30. rojstnem dnevu! Gostje so govorili, da česa tako zabavnega še niso doživeli, in vsi posnetki so nepozabni. Hvala za čudovite spomine! Priporočilo gre zagotovo naprej.",
  },
  {
    author: {
      name: "Katja",
      title: "Rojstnodnevna zabava",
    },
    text: "360 Photo Booth je poskrbel za res zabavne trenutke in spomine. Hvala za odlično storitev, priporočamo naprej! Ekipa Eventaj.si je super!",
  },
  {
    author: {
      name: "Manuela",
      title: "Rojstnodnevna zabava",
    },
    text: "Photo Booth je bil odlična popestritev! Gostje so se res zabavali, slike pa so čudovit spomin za ta dan. Hvala vam, priporočamo naprej!",
  },
  {
    author: {
      name: "Maša | Mlada Slovenija",
      title: "Dogodek",
      image: "/application/LOGO_MSI_POZ.webp",
    },
    text: "Na dogodku je bil photo booth / foto stojnica zelo dobro sprejet in sem prepričana, da se vidimo še ob kakšni priložnosti, hvala!",
  },
  {
    author: {
      name: "Daniel | Forvis Marzars",
      title: "Poslovni dogodek",
      image: "/application/forvis-marzars.webp",
    },
    text: "Zelo korektna in profesionalna izkušnja – od začetne komunikacije do izvedbe na dogodku. Mitja je bil izjemno prijazen in zanesljiv, kar je sodelovanje naredilo res enostavno. Priporočamo vsem, ki razmišljajo o najemu photobootha – z ekipo Eventaj poteka vse gladko in brez zapletov.",
  },
];

export function TestimonialsSection({
  title,
  description,
  className,
}: TestimonialsSectionProps) {
  return (
    <Section
      heading={title}
      text={description}
      className={cn("bg-background", className)}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background sm:block" />
        </div>
      </div>
    </Section>
  );
}
