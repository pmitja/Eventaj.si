import Image from "next/image";
import { Button } from "../ui/button";
import Section from "../ui/section";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {options.map((option) => (
          <div
            key={option.title}
            className="relative group overflow-hidden rounded-2xl border bg-card hover:shadow-lg transition-all"
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
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-muted-foreground mb-4">{option.description}</p>
              <Button variant="outline" asChild>
                <a href={option.href}>Learn more</a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
