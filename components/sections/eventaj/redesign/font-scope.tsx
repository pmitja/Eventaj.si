"use client";

import { evDisplay, evSans } from "@/lib/fonts";
import { useEffect } from "react";

/**
 * Exposes the /redesign font variables on <body> while this page is mounted,
 * so the shared inquiry dialog and portalled lightbox (rendered outside .ev) get the same faces.
 */
export function FontScope() {
  useEffect(() => {
    const classes = [evDisplay.variable, evSans.variable];
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, []);
  return null;
}
