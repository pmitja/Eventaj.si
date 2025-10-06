import Section from "../ui/section";
import PricingCalculator from "./pricing-calculator";

interface Step {
  number: string;
  title: string;
  description: string;
  video: string;
}

const photoBoothSteps: Step[] = [
  {
    number: "1",
    title: "Izberite rekvizite",
    description:
      "Izberite med zabavnimi rekviziti - očala, kape, table za sporočila, brke in še več. Dodatki naredijo vsako fotografijo še bolj zabavno in edinstveno.",
    video: "/application/video/photo-booth/izberi-rekvizite.mp4",
  },
  {
    number: "2",
    title: "Pozirajte pred kamero",
    description:
      "Postavite se pred photo booth in ustvarite svoje najboljše poze. Ob kliku na zaslon se bo pričelo fotografiranje - bodite pripravljeni na smeh!",
    video: "/application/video/photo-booth/poziraj.mp4",
  },
  {
    number: "3",
    title: "Prenesite spomine",
    description:
      "Vse svoje fotografije lahko takoj natisnete, prejmete preko AirDrop-a, e-pošte, QR kode ali pa dostopate do njih kasneje v spletni galeriji.",
    video: "/application/video/photo-booth/prevzami-slike.mp4",
  },
];

const PhotoBoothHowItWorks = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {photoBoothSteps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-[#6695C9] text-white flex items-center justify-center text-3xl font-bold mb-8 group-hover:bg-[#C99566] transition-colors duration-300 shrink-0">
                {step.number}
              </div>

              <div className="w-full aspect-[9/16] md:aspect-[3/4] rounded-2xl overflow-hidden mb-8 shadow-2xl border-2 border-white/20">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={step.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                {step.title}
              </h3>
              <p className="flex-grow text-base md:text-lg text-muted-foreground px-2">
                {step.description}
              </p>
              <div className="mt-8 h-[2px] w-32 bg-[#C99566] group-hover:w-48 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
      <PricingCalculator type="basic" />
    </Section>
  );
};

export default PhotoBoothHowItWorks;
