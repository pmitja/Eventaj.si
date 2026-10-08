import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  OK: "bg-adm-ok text-adm-ok-fg",
  NAROČI: "bg-adm-no text-adm-no-fg",
};

export function StockStatus({ status, compact }: { status: string; compact?: boolean }) {
  return (
    <span
      title={status}
      className={cn(
        "inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-center text-[11px] font-semibold",
        tones[status] ?? "bg-adm-warn text-adm-warn-fg",
        compact && "min-w-[52px] px-2",
      )}
    >
      {compact && status.startsWith("VNESI") ? "VNESI" : status}
    </span>
  );
}
