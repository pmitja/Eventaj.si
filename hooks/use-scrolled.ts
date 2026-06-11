"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the window has scrolled past `threshold` pixels.
 * `threshold` may be a number or a function evaluated on each scroll
 * (e.g. `() => window.innerHeight * 1.2`). Shared by the site header
 * and the sticky CTA.
 */
export function useScrolled(threshold: number | (() => number)) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const limit = typeof threshold === "function" ? threshold() : threshold;
      setScrolled(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
