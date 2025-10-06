"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import Section from "../ui/section";

interface Background {
  title: string;
  description: string;
  image: string;
  category: "elegant" | "fun" | "minimal";
}

const backgrounds: Background[] = [
  {
    title: "Belo ozadje",
    description: "Klasično belo ozadje za eleganten in vsestranski videz",
    image: "/application/ozadja/belo (1).webp",
    category: "elegant",
  },
  {
    title: "Zlato ozadje",
    description: "Glamurozno zlato ozadje za posebne priložnosti",
    image: "/application/ozadja/zlato (1).webp",
    category: "elegant",
  },
  {
    title: "Rožnato ozadje",
    description: "Zabavno rožnato ozadje za rojstne dneve in zabave",
    image: "/application/ozadja/roza.webp",
    category: "fun",
  },
  {
    title: "Črno ozadje",
    description: "Elegantno črno ozadje za sofisticiran videz",
    image: "/application/ozadja/crno.webp",
    category: "elegant",
  },
  {
    title: "Rožno-zlato ozadje",
    description: "Priljubljeno rožno zlato ozadje za poroke in posebne dogodke",
    image: "/application/ozadja/gold-rose.webp",
    category: "elegant",
  },
  {
    title: "Travnato ozadje",
    description: "Naravno travnato ozadje za poletne dogodke na prostem",
    image: "/application/ozadja/travnato-ozadje.webp",
    category: "minimal",
  },
];

const BackgroundsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Section
      heading={
        <>
          <span className="text-[#C99566]">OZADJA</span>{" "}
          <span className="text-[#94A3B8]">ZA VSAKO PRILOŽNOST</span>
        </>
      }
      text="Izberite med našo raznovrstno ponudbo ozadij, ki so primerna za vsak dogodek - od elegantnih porok do zabavnih rojstnih dni"
      headingClassName="font-semibold text-2xl md:text-3xl flex items-center justify-center flex-wrap gap-2"
      id="ozadja"
    >
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="py-4">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {backgrounds.map((background) => (
                <CarouselItem
                  key={background.title}
                  className="pl-4 basis-[280px] sm:basis-[320px]"
                >
                  <div className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col my-2">
                    <div className="w-full h-[210px] sm:h-[240px] relative overflow-hidden flex-shrink-0">
                      <Image
                        src={background.image}
                        alt={background.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 280px, 320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#C99566] flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 relative z-10 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-2">
                        {background.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow">
                        {background.description}
                      </p>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#C99566]/20 text-[#C99566] self-start">
                        {background.category === "elegant"
                          ? "Elegantno"
                          : background.category === "fun"
                            ? "Zabavno"
                            : "Minimalistično"}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {backgrounds.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#C99566] w-8" : "bg-white/30"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Prikaži ozadje ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BackgroundsSection;
