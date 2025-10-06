"use client";

import { Button } from "../ui/button";
import Section from "../ui/section";
import { HeroBookingDialog } from "./hero-booking-dialog";

interface BrandingFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const brandingFeatures: BrandingFeature[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    title: "Poroke",
    description:
      "Popolnoma prilagojene fotografije z vašimi imeni, datumom poroke in edinstvenim dizajnom, ki ustreza vašemu slogu poroke",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
        />
      </svg>
    ),
    title: "Rojstni dnevi",
    description:
      "Zabavne in barvite fotografije s slavljenčevim imenom, starostjo in tematikami, ki jih osrečijo in ustvarijo nepozabne spomine",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    ),
    title: "Korporativni dogodki",
    description:
      "Profesionalno oblikovanje z vašim logotipom podjetja, barvami blagovne znamke in sporočili za team buildinge, otvoritve ali promocije",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
    title: "Tematski dogodki",
    description:
      "Popolnoma prilagojene teme za katerikoli dogodek - od retro zabav do pravljičnih tem, vse po vaših željah in predstavah",
  },
];

const CustomBrandingSection = () => {
  return (
    <Section
      heading={
        <>
          <span className="text-[#C99566]">POPOLNOMA</span>{" "}
          <span className="text-[#94A3B8]">PRILAGOJENO</span>
        </>
      }
      text="Vsak dogodek je edinstven. Ponujamo popolnoma prilagojeno oblikovanje fotografij, ozadij in celotne izkušnje, ki se popolnoma ujema z vašo vizijo"
      headingClassName="font-semibold text-2xl md:text-3xl flex items-center justify-center flex-wrap gap-2"
      id="prilagoditev"
    >
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {brandingFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-6 items-start p-8 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm 
								border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl
								transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-full bg-[#C99566]/20 text-[#C99566]">
                {feature.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-base text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C99566]/10 via-[#6695C9]/10 to-[#C99566]/10 border border-white/20 p-8 md:p-12">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Naredite si svoj photo booth
            </h3>
            <p className="text-base md:text-lg mb-8 text-muted-foreground">
              Ne glede na to, ali načrtujete poroko, praznujete rojstni dan ali
              organizirate korporativni dogodek - ustvarimo nekaj posebnega, kar
              bo popolnoma odražalo vas in vaš dogodek. Vsaka podrobnost je
              lahko prilagojena vašim željam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <HeroBookingDialog>
                <Button variant="glow" size="lg" className="min-w-[200px]">
                  Rezerviraj z prilagoditvijo
                </Button>
              </HeroBookingDialog>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[200px]"
                asChild
              >
                <a href="tel:+38631285143">Pokliči nas</a>
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C99566]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6695C9]/20 rounded-full blur-3xl" />
        </div>
      </div>
    </Section>
  );
};

export default CustomBrandingSection;
