import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="block">
      <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">
        {label}
      </span>
      {children}
    </div>
  );
}

export function PillGrid({
  items,
  value,
  onChange,
  columns,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  columns: string;
}) {
  return (
    <div className={cn("grid gap-2", columns)}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            "border px-4 py-3.5 text-center text-[13px] font-medium transition-colors",
            value === item
              ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]"
              : "border-[rgba(20,17,15,0.15)] bg-transparent text-[var(--eventaj-ink)] hover:border-[var(--eventaj-ink)]",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
