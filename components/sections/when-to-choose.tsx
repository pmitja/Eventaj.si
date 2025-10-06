import type { WhenToChooseContent } from "@/content/when-to-choose";
import Section from "../ui/section";

interface WhenToChooseProps {
  content: WhenToChooseContent;
}

const WhenToChoose = ({ content }: WhenToChooseProps) => {
  return (
    <Section
      heading={content.heading}
      text={content.text}
      className="container-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {content.occasions.map((occasion) => (
          <div
            key={occasion.title}
            className="group relative animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C89364]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            {/* Card */}
            <div className="relative h-full bg-card/50 hover:bg-card backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col items-center text-center border border-border/50 hover:border-[#C89364]/30 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              {/* Icon container with gradient ring */}
              <div className="relative mb-5 md:mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C89364] to-[#A67C52] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full scale-150" />
                <div className="relative h-16 w-16 md:h-20 md:w-20 flex items-center justify-center shrink-0 rounded-full bg-gradient-to-br from-[#C89364]/10 to-transparent group-hover:from-[#C89364]/20 group-hover:scale-110 transition-all duration-300">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {occasion.icon ? (
                      <occasion.icon />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#C89364]/20" />
                    )}
                  </div>
                </div>
              </div>

              {/* Title with subtle animation */}
              <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-[#C89364] transition-colors duration-300">
                {occasion.title}
              </h3>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C89364] to-transparent transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhenToChoose;
