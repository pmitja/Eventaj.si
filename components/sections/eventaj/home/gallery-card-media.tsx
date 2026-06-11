"use client";

import { galleryItems } from "@/content/eventaj/data";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function getGalleryCardClass(type: (typeof galleryItems)[number]["type"]) {
  if (type === "video") {
    return "aspect-[9/16] lg:row-span-2 lg:max-h-[600px] lg:[aspect-ratio:auto]";
  }

  return "aspect-[4/3] lg:row-span-1 lg:[aspect-ratio:auto]";
}

export function GalleryCardMedia({
  item,
  priority,
  isActive,
}: {
  item: (typeof galleryItems)[number];
  priority: boolean;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type !== "video") return;
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      void video.play().catch(() => undefined);
      return;
    }
    video.pause();
    video.currentTime = 0;
  }, [isActive, item.type]);

  if (item.type === "video") {
    return (
      <video
        ref={videoRef}
        aria-label={item.alt}
        loop
        muted
        playsInline
        poster={item.poster}
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.09]"
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      priority={priority}
      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
      className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.09]"
    />
  );
}
