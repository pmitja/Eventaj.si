import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-xs uppercase tracking-[.08em] text-adm-muted", className)}>{children}</span>;
}

// Soft-bordered card used for charts and lists.
export function Panel({ title, note, children, className }: { title?: ReactNode; note?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("flex min-w-0 flex-col gap-6 rounded-2xl border border-adm-line bg-adm-card p-5 sm:p-6", className)}>
      {(title || note) && (
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          {title && <Eyebrow>{title}</Eyebrow>}
          {note && <span className="text-[13px] text-adm-muted">{note}</span>}
        </div>
      )}
      {children}
    </section>
  );
}

export function LegendDot({ color, label }: { color: string; label: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-[3px]" style={{ background: color }} />
      {label}
    </span>
  );
}
