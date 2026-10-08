"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedNumber, StaggerItem, type NumberFormat } from "./motion";

type Props = { label: string; value: number; format?: NumberFormat; sub?: ReactNode; dark?: boolean; size?: "lg" | "md"; className?: string };

export function KpiCard({ label, value, format = "plain", sub, dark, size = "lg", className }: Props) {
  return (
    <StaggerItem
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "flex flex-col rounded-2xl border border-adm-ink",
        size === "lg" ? "gap-2 px-4 py-4 sm:gap-2.5 sm:px-[22px] sm:py-5" : "gap-2 px-4 py-4 sm:px-5 sm:py-[18px]",
        dark ? "bg-adm-ink text-adm-bg" : "bg-adm-card",
        className,
      )}
    >
      <span className={cn("text-[10px] uppercase leading-tight tracking-[.08em] sm:text-xs", dark ? "text-adm-soft" : "text-adm-muted")}>{label}</span>
      <span className={cn("font-display leading-none", size === "lg" ? "text-[22px] sm:text-[34px] xl:text-[40px]" : "text-[22px] sm:text-[34px]")}>
        <AnimatedNumber value={value} format={format} />
      </span>
      {sub && <span className={cn("text-[11px] sm:text-[13px]", dark ? "text-adm-soft" : "text-adm-muted")}>{sub}</span>}
    </StaggerItem>
  );
}
