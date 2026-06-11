import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function ConfiguratorBlock({
  label,
  children,
  last = false,
}: {
  label: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={cn(!last && "mb-10")}>
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">
        {label}
      </div>
      {children}
    </div>
  );
}

export function PriceRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className={cn("flex justify-between gap-4", muted && "opacity-50")}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
