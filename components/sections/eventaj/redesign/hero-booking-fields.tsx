"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dateFromDateString, dateToDateString, formatSlovenianDate, getSlovenianDateString } from "@/lib/slovenian-date";
import { cn } from "@/lib/utils";
import { sl } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

const fieldClass =
  "flex min-h-[56px] w-full items-center justify-between gap-3 px-5 text-left text-[16px] text-[var(--ev-porcelain)] transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05]";

/** shadcn Popover + Calendar, recoloured to the page. Value is a yyyy-mm-dd string. */
export function HeroDatePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = dateFromDateString(value);
  const today = dateFromDateString(getSlovenianDateString())!;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={fieldClass} aria-label="Datum dogodka">
        <span className={cn(!selected && "text-[var(--ev-mist)]")}>
          {selected ? formatSlovenianDate(value) : "dd. mm. llll"}
        </span>
        <CalendarDays aria-hidden="true" strokeWidth={1.5} className="h-[18px] w-[18px] shrink-0 text-[var(--ev-mist)]" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="ev-tokens z-[70] rounded-[18px] border-0 !bg-[var(--ev-white)] p-2 !text-[var(--ev-night)] shadow-[0_30px_70px_-30px_rgba(28,13,23,0.75)]"
      >
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
          classNames={{
            caption_label: "text-[15px] font-semibold capitalize",
            head_cell: "w-10 text-[12px] font-medium text-[var(--ev-stone)]",
            cell: "h-10 w-10 p-0 text-center text-[15px]",
            day: "h-10 w-10 rounded-full p-0 font-normal transition-colors hover:bg-[var(--ev-blush)] aria-selected:opacity-100",
            day_selected: "!bg-[var(--ev-wine)] !text-white hover:!bg-[var(--ev-wine)]",
            day_today: "font-semibold text-[var(--ev-wine)]",
            day_outside: "text-[var(--ev-stone-2)] opacity-60",
            day_disabled: "text-[var(--ev-stone-2)] opacity-35 hover:bg-transparent",
            nav_button:
              "flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ev-rule)] transition-colors hover:bg-[var(--ev-blush)]",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

/** shadcn Select for the occasion. */
export function HeroOccasionSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<string>;
}) {
  return (
    <Select value={value || undefined} onValueChange={onChange}>
      <SelectTrigger
        aria-label="Priložnost"
        className={cn(
          fieldClass,
          "h-auto rounded-none border-0 bg-transparent ring-offset-0 focus:ring-0 focus:ring-offset-0 [&>svg]:ml-auto [&>svg]:text-[var(--ev-mist)] [&>svg]:opacity-100",
        )}
      >
        <span className={cn("flex-1 text-left", !value && "text-[var(--ev-mist)]")}>
          <SelectValue placeholder="Priložnost" />
        </span>
      </SelectTrigger>
      <SelectContent className="ev-tokens z-[70] rounded-[16px] border-0 !bg-[var(--ev-white)] p-1 !text-[var(--ev-night)] shadow-[0_30px_70px_-30px_rgba(28,13,23,0.75)]">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="cursor-pointer rounded-[10px] py-2.5 text-[15px] focus:bg-[var(--ev-blush)] focus:text-[var(--ev-wine-deep)]"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
