"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Clip = { src: string; poster?: string; alt: string };

/** 360° clips shown as held frames: one plays, then a hard cut to the next. No sliding. */
export function HeldFrameClips({
  clips,
  holdMs = 7000,
  className,
}: {
  clips: ReadonlyArray<Clip>;
  holdMs?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && inView && !reduceMotion) {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [active, inView, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % clips.length), holdMs);
    return () => window.clearTimeout(timer);
  }, [active, clips.length, holdMs, inView, reduceMotion]);

  return (
    <div ref={frameRef} className={className}>
      <div className="relative h-full overflow-hidden bg-[var(--ev-night)]">
        {clips.map((clip, index) => (
          <video
            key={clip.src}
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            aria-label={clip.alt}
            aria-hidden={index !== active}
            muted
            loop
            playsInline
            controls={reduceMotion}
            poster={clip.poster}
            preload={index === 0 ? "metadata" : "none"}
            className={cn("absolute inset-0 h-full w-full object-cover", index !== active && "invisible")}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-gradient-to-t from-black/60 to-transparent pb-2 pt-10" role="group" aria-label="Izberi 360° posnetek">
          {clips.map((clip, index) => (
            <button
              key={clip.src}
              type="button"
              aria-pressed={index === active}
              aria-label={`Posnetek ${index + 1}`}
              onClick={() => setActive(index)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-[2px] transition-all duration-500",
                  index === active ? "w-8 bg-[var(--ev-champagne)]" : "w-4 bg-white/50",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
