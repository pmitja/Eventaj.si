"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Autoplaying, muted, looping video for landing hero/gallery tiles.
 * Plays only while in view (IntersectionObserver) so pages with many
 * clips don't decode them all at once.
 */
export function MediaVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        ref={ref}
        aria-label={alt}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
