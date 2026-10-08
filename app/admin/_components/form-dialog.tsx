"use client";

import { motion, useAnimationControls } from "framer-motion";
import { LoaderCircle, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { ease } from "./motion";

export type FieldOption = string | { value: string; label: string };

export type FieldSpec = {
  key: string;
  label: string;
  kind: "text" | "number" | "money" | "date" | "password" | "email" | "select" | "seg" | "area";
  wide?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  initial?: string;
};

export type FormValues = Record<string, string>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eyebrow: string;
  title: string;
  fields: FieldSpec[];
  summary?: (values: FormValues) => [string, ReactNode][];
  validate?: (values: FormValues) => string | null;
  // Resolves to an error message, or null when saved.
  onSubmit: (values: FormValues) => Promise<string | null>;
  submitLabel?: string;
};

const optionValue = (o: FieldOption) => (typeof o === "string" ? o : o.value);
const optionLabel = (o: FieldOption) => (typeof o === "string" ? o : o.label);

function initialValues(fields: FieldSpec[]): FormValues {
  return Object.fromEntries(fields.map((f) => [f.key, f.initial ?? (f.kind === "seg" && f.options?.length ? optionValue(f.options[0]) : "")]));
}

export function FormDialog(props: Props) {
  // Remount the body each time the dialog opens so it starts from fresh defaults.
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="admin-root flex max-h-[calc(100vh-32px)] w-[calc(100vw-24px)] max-w-[640px] flex-col gap-0 overflow-hidden rounded-[20px] border border-adm-ink bg-adm-bg p-0 shadow-[0_24px_60px_rgba(28,24,20,.25)] sm:rounded-[20px] [&>button:last-child]:hidden">
        {props.open && <FormBody {...props} />}
      </DialogContent>
    </Dialog>
  );
}

function FormBody({ eyebrow, title, fields, summary, validate, onSubmit, submitLabel = "Shrani" }: Props) {
  const [values, setValues] = useState(() => initialValues(fields));
  const [tried, setTried] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const shake = useAnimationControls();

  const set = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const missing = fields.filter((f) => f.required && !values[f.key]?.trim());
  const rows = summary?.(values) ?? [];

  const submit = async () => {
    const problem = missing.length ? `Izpolnite obvezna polja: ${missing.map((m) => m.label).join(", ")}` : validate?.(values) ?? null;
    if (problem) {
      setTried(true);
      setError(problem);
      shake.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } });
      return;
    }
    setPending(true);
    setError(await onSubmit(values));
    setPending(false);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="flex min-h-0 flex-col"
    >
      <div className="flex items-start justify-between gap-4 border-b border-adm-line px-6 pb-[18px] pt-6 sm:px-7">
        <div className="flex flex-col gap-1.5">
          <DialogDescription className="text-xs uppercase tracking-[.08em] text-adm-muted">{eyebrow}</DialogDescription>
          <DialogTitle className="font-display text-[30px] font-normal leading-[1.05] tracking-normal sm:text-[32px]">{title}</DialogTitle>
        </div>
        <DialogClose className="grid size-9 shrink-0 place-items-center rounded-full border border-adm-soft transition-[border-color,transform] hover:rotate-90 hover:border-adm-ink">
          <X className="size-4" />
          <span className="sr-only">Zapri</span>
        </DialogClose>
      </div>

      <div className="min-h-0 overflow-y-auto">
        <motion.div
          className="grid grid-cols-1 gap-x-[18px] gap-y-4 px-6 py-[22px] sm:grid-cols-2 sm:px-7"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: 0.08 } } }}
        >
          {fields.map((field) => (
            <motion.label
              key={field.key}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } } }}
              className={cn("flex min-w-0 flex-col gap-1.5", field.wide && "sm:col-span-2")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[.06em] text-adm-sub">
                {field.label}
                {field.required && " *"}
              </span>
              <Field field={field} value={values[field.key] ?? ""} invalid={tried && Boolean(field.required) && !values[field.key]?.trim()} onChange={(v) => set(field.key, v)} />
            </motion.label>
          ))}
        </motion.div>

        {rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35, ease }}
            className="mx-6 flex flex-col rounded-[14px] bg-adm-sand px-4 py-1.5 sm:mx-7"
          >
            {rows.map(([label, value], i) => (
              <div key={label} className={cn("flex justify-between gap-3 py-2 text-sm", i > 0 && "border-t border-[#DDD2C2]")}>
                <span className="text-adm-sub">{label}</span>
                <span className="text-right font-semibold tabular">{value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-6 pt-5 sm:px-7">
        <span className="text-[13px] text-adm-accent">{error}</span>
        <motion.div animate={shake} className="ml-auto flex gap-2">
          <DialogClose className="rounded-full border border-adm-ink px-[18px] py-2.5 text-sm transition-colors hover:bg-adm-sand">Prekliči</DialogClose>
          <motion.button
            type="submit"
            disabled={pending}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-full border border-adm-ink bg-adm-ink px-5 py-2.5 text-sm text-adm-bg transition-opacity disabled:opacity-70"
          >
            {pending && <LoaderCircle className="size-4 animate-spin" />}
            {pending ? "Shranjujem …" : submitLabel}
          </motion.button>
        </motion.div>
      </div>
    </form>
  );
}

const control = "h-[42px] rounded-xl border-adm-ink bg-adm-card px-3.5 text-sm text-adm-ink ring-offset-0 transition-shadow placeholder:text-[#A89D90] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_0_3px_#E7DCCB] focus:ring-0 focus:ring-offset-0 focus:shadow-[0_0_0_3px_#E7DCCB]";

function Field({ field, value, invalid, onChange }: { field: FieldSpec; value: string; invalid: boolean; onChange: (value: string) => void }) {
  const border = invalid && "border-adm-accent";

  if (field.kind === "area") {
    return <Textarea rows={3} value={value} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} className={cn(control, "h-auto min-h-[84px] resize-y py-2.5", border)} />;
  }

  if (field.kind === "select") {
    return (
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className={cn(control, !value && "text-[#A89D90]", border)}>
          <SelectValue placeholder={field.placeholder ?? "Izberi"} />
        </SelectTrigger>
        <SelectContent className="admin-root max-h-64 rounded-xl border-adm-ink bg-adm-card shadow-[0_12px_30px_rgba(28,24,20,.18)]">
          {(field.options ?? []).map((o) => (
            <SelectItem key={optionValue(o)} value={optionValue(o)} className="rounded-lg focus:bg-adm-sand">
              {optionLabel(o)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field.kind === "seg") {
    const options = field.options ?? [];
    const narrow = rowSpans(options.length, options.length <= 3 ? options.length : options.length === 4 ? 2 : 3);
    const wide = field.wide ? rowSpans(options.length, options.length) : narrow;
    return (
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v)}
        className="grid grid-cols-[repeat(60,minmax(0,1fr))] gap-0 rounded-xl bg-adm-sand p-0.5"
      >
        {options.map((o, i) => {
          const active = optionValue(o) === value;
          return (
            <ToggleGroupItem
              key={optionValue(o)}
              value={optionValue(o)}
              style={{ "--m": narrow[i], "--d": wide[i] } as React.CSSProperties}
              className="admin-seg-item relative m-0.5 h-auto min-w-0 rounded-[9px] px-2 py-[7px] text-[13px] font-normal hover:bg-adm-card/50 hover:text-adm-ink data-[state=on]:bg-transparent data-[state=on]:text-adm-ink"
            >
              {active && (
                <motion.span
                  layoutId={`seg-${field.key}`}
                  className="absolute inset-0 rounded-[9px] bg-adm-card shadow-[0_1px_2px_rgba(28,24,20,.15)]"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative truncate">{optionLabel(o)}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    );
  }

  return (
    <Input
      type={field.kind === "money" || field.kind === "number" ? "text" : field.kind}
      inputMode={field.kind === "money" || field.kind === "number" ? "decimal" : undefined}
      autoComplete={field.kind === "password" ? "new-password" : undefined}
      value={value}
      placeholder={field.placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(control, border)}
    />
  );
}

// Column spans on a 60-column grid so every row is filled edge to edge: 5 options at 3 per row
// become 3 + 2 wide ones instead of 4 + 1 orphan.
function rowSpans(count: number, perRow: number) {
  const spans: number[] = [];
  for (let start = 0; start < count; start += perRow) {
    const inRow = Math.min(perRow, count - start);
    for (let i = 0; i < inRow; i++) spans.push(60 / inRow);
  }
  return spans;
}
