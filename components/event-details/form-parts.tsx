import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-7 border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper)] p-5 md:p-8">
      <h2 className="font-serif-display text-2xl font-normal leading-tight md:text-[28px]">{title}</h2>
      {children}
    </section>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p data-field-error className="mt-2 text-sm text-red-700">{message}</p>;
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-sm text-[var(--eventaj-muted)]">{children}</p>;
}

export function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]"
    >
      {children}
    </label>
  );
}
