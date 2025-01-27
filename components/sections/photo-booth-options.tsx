import Image from "next/image";
import { Button } from "../ui/button";
import Section from "../ui/section";
import { HeroBookingDialog } from "./hero-booking-dialog";

interface BoothOption {
  title: string;
  description: string;
  image?: string;
  video?: string;
  href: string;
}

const options: BoothOption[] = [
  {
    title: "Photo booth",
    description:
      "Fotograf. Povod k pogovoru. Ustvarjalec spominov. Vse to je Photo Booth. Je popoln dodatek vsaki zabavi ali dogodku. Naš Photo Booth je magnet za ljudi.",
    image: "/application/photo-booth.webp",
    href: "/photo-booth",
  },
  {
    title: "360° photo booth",
    description:
      "360° Photo Booth je popolna izbira za poroke, rojstne dneve, poslovne dogodke, festivale in zasebne zabave, kjer iščete nekaj posebnega.",
    image: "/application/360-action-images.webp",
    href: "/360-photo-booth",
  },
  {
    title: "Duet photo booth",
    description:
      "Duet Photo Booth je popolna izbira za poroke, rojstne dneve, poslovne dogodke, festivale in zasebne zabave, kjer iščete nekaj posebnega.",
    image: "/application/combo-image.webp",
    href: "/duet-photo-booth",
  },
];

export function PhotoBoothOptions() {
  return (
    <Section
      heading="Eventaj.si za spomine poskrbi"
      text="Ustvarite spomine s fotografijami in videoposnetki – zabava, nasmehi in čudoviti trenutki na dosegu roke!"
      className="bg-background"
      textClassName="text-muted-foreground"
    >
      <div className="container-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {options.map((option) => (
          <div
            key={option.title}
            className="relative group overflow-hidden rounded-2xl border bg-card hover:shadow-lg transition-all flex flex-col"
          >
            <div className="aspect-[4/3] relative">
              {option.image ? (
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  className="aspect-[4/3] relative"
                  src={option.video}
                  autoPlay
                  loop
                  muted
                />
              )}
            </div>
            <div className="flex flex-col gap-2 p-6 grow">
              <h2 className="text-3xl font-semibold">{option.title}</h2>
              <p className="text-muted-foreground mb-2 grow">
                {option.description}
              </p>
              <div className="flex flex-row flex-wrap gap-2">
                <HeroBookingDialog>
                  <Button className="w-fit" variant="glow">
                    Rezerviraj
                  </Button>
                </HeroBookingDialog>
                <Button className="w-fit" variant="outline" asChild>
                  <a href={option.href}>Več o {option.title}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
