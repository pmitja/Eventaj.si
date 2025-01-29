"use client";

import Image from "next/image";

interface FeatureMediaProps {
  media: {
    type: "image" | "video";
    src: string;
    alt?: string;
  };
}

export function FeatureMedia({ media }: FeatureMediaProps) {
  return (
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
            src={
              process.env.NODE_ENV === "production" ? `${media.src}` : media.src
            }
            type="video/mp4; codecs=hevc,mp4a.40.2"
          />
          <source
            src={
              process.env.NODE_ENV === "production"
                ? `${media.src.replace(".mp4", ".webm")}`
                : media.src.replace(".mp4", ".webm")
            }
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
