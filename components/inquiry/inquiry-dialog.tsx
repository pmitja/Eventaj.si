"use client";

import { cn } from "@/lib/utils";
import {
  InquiryStepContact,
  InquiryStepDetails,
  InquiryStepService,
} from "./inquiry-steps";
import { useInquiryForm } from "./use-inquiry-form";
import type { InquiryData } from "./inquiry-types";

export function InquiryDialog({
  open,
  onClose,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<InquiryData>;
}) {
  const { step, data, submitted, loading, error, update, canNext, back, submit } =
    useInquiryForm(open, initialData);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(20,17,15,0.55)] p-4 backdrop-blur-md"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[720px] overflow-auto rounded-[4px] bg-[var(--eventaj-paper)] p-6 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.5)] md:p-14"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(20,17,15,0.15)] text-xl"
          aria-label="Zapri"
        >
          ×
        </button>

        {submitted ? (
          <div className="px-2 py-14 text-center">
            <div className="mb-4 font-serif-italic text-lg italic text-[var(--eventaj-accent)]">
              Hvala!
            </div>
            <h3
              id="inquiry-title"
              className="font-serif-display text-4xl font-[350] leading-tight md:text-[44px]"
            >
              Tvoja ponudba je{" "}
              <em className="font-serif-italic italic">na poti</em>.
            </h3>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-[var(--eventaj-ink-2)]">
              Personalizirano ponudbo prejmeš na <strong>{data.email}</strong> v
              naslednjih 24 urah.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-[var(--eventaj-ink)] px-8 py-4 text-sm font-medium text-[var(--eventaj-paper)]"
            >
              Zapri
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
              Korak {step} od 3
            </div>
            <h3
              id="inquiry-title"
              className="font-serif-display text-4xl font-normal leading-tight"
            >
              {step === 1 && (
                <>
                  Pridobi <em className="font-serif-italic italic">ponudbo</em> za
                  svoj dogodek
                </>
              )}
              {step === 2 && (
                <>
                  Kdaj in <em className="font-serif-italic italic">kje</em> bo
                  dogodek?
                </>
              )}
              {step === 3 && (
                <>
                  Tvoji <em className="font-serif-italic italic">kontaktni</em>{" "}
                  podatki
                </>
              )}
            </h3>
            <p className="mb-8 mt-2 text-sm text-[var(--eventaj-muted)]">
              {step === 1 &&
                (data.type === "Oprema za dogodke"
                  ? "Izberi količino in prt. Nato preverimo razpoložljivost za tvoj datum."
                  : "V nekaj korakih zberemo informacije za pripravo ponudbe.")}
              {step === 2 &&
                "Preverimo razpoložljivost termina in pripravimo okvirno ponudbo."}
              {step === 3 &&
                "V 24 urah prejmeš ponudbo, prilagojeno tvojemu dogodku."}
            </p>

            <div className="mb-8 flex gap-1.5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={cn(
                    "h-[3px] flex-1 transition-colors",
                    item <= step
                      ? "bg-[var(--eventaj-ink)]"
                      : "bg-[rgba(20,17,15,0.15)]",
                  )}
                />
              ))}
            </div>

            {step === 1 && <InquiryStepService data={data} update={update} />}
            {step === 2 && <InquiryStepDetails data={data} update={update} />}
            {step === 3 && <InquiryStepContact data={data} update={update} />}

            {error && <p className="mt-5 text-sm text-red-700">{error}</p>}

            <div className="mt-9 flex items-center justify-between border-t border-[rgba(20,17,15,0.1)] pt-7">
              <button
                type="button"
                onClick={() => back(onClose)}
                className="bg-transparent py-3 text-sm text-[var(--eventaj-muted)]"
              >
                ← {step > 1 ? "Nazaj" : "Prekliči"}
              </button>
              <button
                type="submit"
                disabled={!canNext() || loading}
                className="rounded-full bg-[var(--eventaj-ink)] px-7 py-4 text-sm font-medium text-[var(--eventaj-paper)] disabled:cursor-not-allowed disabled:bg-[rgba(20,17,15,0.2)]"
              >
                {loading ? "Pošiljanje..." : step < 3 ? "Naprej →" : "Pošlji povpraševanje →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
