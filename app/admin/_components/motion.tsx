"use client";

import { animate, MotionConfig, motion, useInView, useMotionValue, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { formatEur, formatNumber, formatPlain } from "@/lib/ledger/compute";

export const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({ delay = 0, y = 12, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
      {...props}
    />
  );
}

const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };
const staggerChild = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Stagger(props: HTMLMotionProps<"div">) {
  return <motion.div variants={staggerParent} initial="hidden" animate="show" {...props} />;
}

export function StaggerItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={staggerChild} {...props} />;
}

// Charts below the fold animate when they scroll into view.
export function useAppear<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return [ref, inView] as const;
}

export type NumberFormat = "eur" | "plain" | "int" | "km" | "pct";

export function formatValue(value: number, format: NumberFormat) {
  if (format === "eur") return formatEur(value);
  if (format === "int") return formatNumber(value, 0);
  if (format === "km") return formatNumber(value, 1);
  if (format === "pct") return `${formatNumber(value, 1)} %`;
  return formatPlain(value);
}

// Counts up from the previous value; the final frame is always the exact formatted value.
export function AnimatedNumber({ value, format = "plain" }: { value: number; format?: NumberFormat }) {
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [text, setText] = useState(() => formatValue(0, format));

  useEffect(() => {
    if (reduce) {
      setText(formatValue(value, format));
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 0.9,
      ease,
      onUpdate: (latest) => setText(formatValue(latest, format === "eur" || format === "km" || format === "pct" ? format : "int")),
      onComplete: () => setText(formatValue(value, format)),
    });
    return () => controls.stop();
  }, [value, format, reduce, motionValue]);

  return <span className="tabular">{text}</span>;
}
