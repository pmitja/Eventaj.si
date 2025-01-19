import Section from "../ui/section";
import PricingCalculator from "./pricing-calculator";

const steps = [
  {
    number: "1",
    title: "Stopite na platformo",
    description:
      "Opremljeni z rekviziti stopite na okroglo platformo, kjer ustvarite posnetek s 360° kamero, ki vas večkrat zaokroži!",
  },
  {
    number: "2",
    title: "Oglejte si video",
    description:
      "Ko končate, si lahko svoj čudovit video takoj ogledate na zaslonu na dotik.",
  },
  {
    number: "3",
    title: "Delite spomine",
    description:
      "Vse svoje videe lahko delite z AirDropom, si jih pošljete na e-pošto, shranite preko QR kode ali pa dostopate do njih kasneje v spletni galeriji.",
  },
];

const HowItWorks = ({ type }: { type: "360" | "basic" }) => {
  return (
    <Section
      heading={
        <>
          <span className="text-[#C99566]">KAKO DELUJE?</span>{" "}
          <span className="text-[#94A3B8]">ČISTO ENOSTAVNO.</span>
        </>
      }
      headingClassName="font-semibold text-2xl md:text-3xl flex items-center justify-center flex-wrap gap-2"
    >
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-[#6695C9] text-white flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-[#C99566] transition-colors duration-300">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="flex-grow">{step.description}</p>
              <div className="mt-6 h-[2px] w-32 bg-[#C99566] group-hover:w-48 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
      <PricingCalculator type={type} />
    </Section>
  );
};

export default HowItWorks;
