"use client";

import { cn } from "@/lib/utils";

export function HamburgerButton({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(20,17,15,0.15)] text-[var(--eventaj-ink)] lg:hidden"
      onClick={onToggle}
      aria-label={open ? "Zapri meni" : "Odpri meni"}
      aria-expanded={open}
    >
      <span className="sr-only">{open ? "Zapri meni" : "Odpri meni"}</span>
      <span className="relative block h-4 w-5">
        <span
          className={cn(
            "absolute left-0 top-0 h-px w-5 bg-current transition-transform",
            open && "translate-y-2 rotate-45",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-2 h-px w-5 bg-current transition-opacity",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 h-px w-5 bg-current transition-transform",
            open && "-translate-y-[7px] -rotate-45",
          )}
        />
      </span>
    </button>
  );
}
