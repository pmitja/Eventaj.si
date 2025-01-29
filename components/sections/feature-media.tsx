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
  const getVideoUrl = (src: string) => {
    return process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${src}`
      : src;
  };

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
          <source src={getVideoUrl(media.src)} type="video/mp4" />
          <source
            src={getVideoUrl(media.src.replace(".mp4", ".webm"))}
            type="video/webm"
          />
          <p>
            Your browser doesn&apos;t support HTML video. Here is a
            <a href={getVideoUrl(media.src)}>link to the video</a> instead.
          </p>
        </video>
      )}
    </div>
  );
}
