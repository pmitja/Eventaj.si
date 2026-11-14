"use client";

import { useEffect, useRef } from "react";

/** A muted clip that rests on its first frame and plays while the card is hovered or focused. */
export function HoverVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("a, li");
    if (!video || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const play = () => void video.play().catch(() => undefined);
    const stop = () => video.pause();
    card.addEventListener("pointerenter", play);
    card.addEventListener("pointerleave", stop);
    card.addEventListener("focusin", play);
    card.addEventListener("focusout", stop);
    return () => {
      card.removeEventListener("pointerenter", play);
      card.removeEventListener("pointerleave", stop);
      card.removeEventListener("focusin", play);
      card.removeEventListener("focusout", stop);
    };
  }, []);

  return (
    <video
      ref={ref}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={`${src}#t=0.1`} type="video/mp4" />
    </video>
  );
}
