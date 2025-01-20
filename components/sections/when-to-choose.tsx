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
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {content.occasions.map((occasion) => (
          <div
            key={occasion.title}
            className="bg-card hover:bg-accent transition-colors backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center border border-border shadow-lg"
          >
            <div className="h-12 w-12 flex items-center justify-center shrink-0 mb-4">
              {occasion.icon ? (
                <occasion.icon />
              ) : (
                <div className="w-full h-full rounded-full bg-[#C89364]/20" />
              )}
            </div>
            <h3 className="text-base md:text-lg font-semibold">
              {occasion.title}
            </h3>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhenToChoose;
