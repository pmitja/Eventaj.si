"use client";

import { FormEvent, useState, useTransition } from "react";
import { eventDetailsSchema, type EventDetailsDraft } from "@/lib/event-details/schema";
import { submitEventDetails } from "./actions";
import { AlbumSection, BasicsSection, FrameSection } from "./event-details-sections";

type Errors = Partial<Record<keyof EventDetailsDraft, string>>;

type Props = { token: string; initialData: EventDetailsDraft; alreadySubmitted: boolean };

export function EventDetailsForm({ token, initialData, alreadySubmitted }: Props) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(alreadySubmitted);
  const [pending, startTransition] = useTransition();

  function update<K extends keyof EventDetailsDraft>(key: K, value: EventDetailsDraft[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = eventDetailsSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof EventDetailsDraft;
        next[key] ??= issue.message;
      }
      setErrors(next);
      setFormError("Dopolnite označena polja.");
      requestAnimationFrame(() =>
        document.querySelector("[data-field-error]")?.scrollIntoView({ block: "center", behavior: "smooth" }),
      );
      return;
    }
    setFormError("");
    startTransition(async () => {
      const result = await submitEventDetails(token, parsed.data);
      if (!result.ok) setFormError(result.error);
      else {
        setDone(true);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  if (done) {
    return (
      <div className="border border-[rgba(20,17,15,0.12)] px-6 py-14 text-center">
        <div className="mb-4 font-serif-italic text-lg italic text-[var(--eventaj-accent)]">Hvala!</div>
        <h2 className="font-serif-display text-4xl font-[350] leading-tight">
          Podatke smo <em className="font-serif-italic italic">prejeli</em>.
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-[var(--eventaj-ink-2)]">
          Okvir pripravimo po vaših željah. Če se kaj spremeni, lahko podatke kadarkoli popravite prek iste povezave.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-8 rounded-full border border-[var(--eventaj-ink)] px-7 py-3.5 text-sm font-medium"
        >
          Uredi podatke
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      {submitted && (
        <p className="border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] px-5 py-4 text-sm">
          Podatke ste že oddali. Spodaj jih lahko popravite in ponovno shranite.
        </p>
      )}
      <BasicsSection data={data} errors={errors} update={update} />
      <AlbumSection data={data} errors={errors} update={update} />
      <FrameSection data={data} errors={errors} update={update} />

      <div className="mt-4 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-red-700" role="status">
          {formError}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[var(--eventaj-ink)] px-8 py-4 text-sm font-medium text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)] disabled:cursor-wait disabled:bg-[rgba(20,17,15,0.2)]"
        >
          {pending ? "Pošiljanje ..." : submitted ? "Shrani spremembe →" : "Pošlji podatke →"}
        </button>
      </div>
    </form>
  );
}
