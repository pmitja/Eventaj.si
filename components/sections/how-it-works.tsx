import Section from "../ui/section";
import PricingCalculator from "./pricing-calculator";

const videoSteps = [
  {
    number: "1",
    title: "Stopite na platformo",
    description:
      "Z izbranimi rekviziti stopite na okroglo platformo, kjer ustvarite posnetek s 360° kamero, ki vas večkrat obkroži.",
  },
  {
    number: "2",
    title: "Oglejte si videoposnetek",
    description:
      "Ko se kamera ustavi, si lahko svoj videoposnetek takoj ogledate na dodatnem zaslonu.",
  },
  {
    number: "3",
    title: "Delite spomine",
    description:
      "Vse svoje videoposnetke lahko prejmete preko AirDrop-a, e-pošte, QR kode ali pa dostopate do njih kasneje v spletni galeriji.",
  },
];

const photoSteps = [
  {
    number: "1",
    title: "Stopite pred photo booth",
    description:
      "Opremljeni z rekviziti se postavite pred photo booth in pozirajte. Ob kliku na zaslon, se bo pričelo fotografiranje.",
  },
  {
    number: "2",
    title: "Oglejte si fotografije in jih natisnite",
    description:
      "Ko končate, si lahko svoje fotografije takoj ogledate na zaslonu na dotik in izberete tiste, ki jih želite natisniti",
  },
  {
    number: "3",
    title: "Delite spomine",
    description:
      "Vse svoje fotografije lahko prejmete preko AirDrop-a, e-pošte, QR kode ali pa dostopate do njih kasneje v spletni galeriji.",
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
      id="kako-deluje"
    >
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {type === "360"
            ? videoSteps.map((step) => (
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
              ))
            : photoSteps.map((step) => (
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
