"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  dateFromDateString,
  dateToDateString,
  formatSlovenianDate,
  getSlovenianDateString,
} from "@/lib/slovenian-date";
import { cn } from "@/lib/utils";
import { sl } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SlovenianDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export function SlovenianDatePicker({
  value,
  onChange,
  className,
  placeholder = "Izberi datum",
  required,
}: SlovenianDatePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selected = dateFromDateString(value);
  const today = dateFromDateString(getSlovenianDateString())!;

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        className={cn(
          "eventaj-input flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 text-left transition-colors",
          !value && "text-[var(--eventaj-muted)]",
          className
        )}
        aria-expanded={open}
        aria-label="Izberi datum dogodka"
        data-required={required || undefined}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected ? formatSlovenianDate(value) : placeholder}</span>
        <CalendarDays className="h-5 w-5 shrink-0 text-[var(--eventaj-muted)]" />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-[110] w-auto border border-[rgba(20,17,15,0.15)] bg-[var(--eventaj-paper)] p-0 text-[var(--eventaj-ink)] shadow-[0_24px_60px_-28px_rgba(20,17,15,0.6)]">
          <Calendar
            mode="single"
            locale={sl}
          selected={selected}
          defaultMonth={selected ?? today}
          disabled={{ before: today }}
          onSelect={(date) => {
            if (!date) return;
            onChange(dateToDateString(date));
            setOpen(false);
          }}
            initialFocus
          />
          <p className="border-t border-[rgba(20,17,15,0.1)] px-4 py-2 text-center text-xs text-[var(--eventaj-muted)]">
            Časovni pas: Slovenija
          </p>
        </div>
      )}
    </div>
  );
}
