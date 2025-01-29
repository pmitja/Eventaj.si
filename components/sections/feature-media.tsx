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
          preload="metadata"
          className="object-contain p-4 w-full h-full"
          controlsList="nodownload"
        >
          <source src={media.src} type="video/mp4" />
          <source src={media.src.replace(".mp4", ".webm")} type="video/webm" />
          <p>
            Your browser doesn&apos;t support HTML video. Here is a
            <a href={media.src}>link to the video</a> instead.
          </p>
        </video>
      )}
    </div>
  );
}
