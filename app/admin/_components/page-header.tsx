import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = { eyebrow?: ReactNode; title: ReactNode; subtitle?: ReactNode; action?: ReactNode; leading?: ReactNode; className?: string };

export function PageHeader({ eyebrow, title, subtitle, action, leading, className }: Props) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4 border-b border-adm-ink pb-5", className)}>
      <div className="flex items-center gap-5">
        {leading}
        <div className="flex flex-col gap-2">
          {eyebrow && <span className="text-xs uppercase tracking-[.08em] text-adm-muted">{eyebrow}</span>}
          <h1 className="m-0 font-display text-[40px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[52px]">{title}</h1>
          {subtitle && <div className="text-sm text-adm-muted">{subtitle}</div>}
        </div>
      </div>
      {action}
    </div>
  );
}
