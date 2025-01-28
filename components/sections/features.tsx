import Image from "next/image";
import Section from "../ui/section";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType;
}

interface FeaturesProps {
  heading: string;
  text: React.ReactNode;
  features: Feature[];
  media: {
    type: "image" | "video";
    src: string;
    alt?: string;
  };
  headingClassName?: string;
}

const Features = ({
  heading,
  text,
  features,
  media,
  headingClassName,
}: FeaturesProps) => {
  return (
    <Section
      heading={heading}
      text={text}
      className="container-lg"
      headingClassName={headingClassName}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-6">
            {features.slice(0, 3).map((feature) => (
              <div
                key={feature.title}
                className="flex gap-6 items-start p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm 
                  border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl
                  transition-all duration-300 transform hover:-translate-y-1 h-full"
              >
                <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                  <feature.icon />
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[500px] md:h-[400px] lg:h-full">
          {media.type === "image" ? (
            <Image
              src={media.src}
              alt={media.alt || ""}
              fill
              className="object-contain p-4"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="object-contain p-4 w-full h-full"
              controlsList="nodownload"
            >
              <source
                src={`${media.src}`}
                type="video/mp4; codecs=hevc,mp4a.40.2"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-6">
            {features.slice(3, 6).map((feature) => (
              <div
                key={feature.title}
                className="flex gap-6 items-start p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm 
                  border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl
                  transition-all duration-300 transform hover:-translate-y-1 h-full"
              >
                <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                  <feature.icon />
                </div>
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
