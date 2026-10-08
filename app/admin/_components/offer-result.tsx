"use client";

import { useState } from "react";
import { formatEur } from "@/lib/offers/pricing";

export type GeneratedOffer = {
  id: number;
  number: string;
  total: number;
  email: string;
  reviewNotes: string[];
};

export function OfferResult({ offer, onAnother }: { offer: GeneratedOffer; onAnother: () => void }) {
  const [copied, setCopied] = useState(false);
  const notes = offer.reviewNotes.filter(Boolean);
  const pdfUrl = `/api/admin/offers/${offer.id}/pdf`;

  const copy = async () => {
    await navigator.clipboard.writeText(offer.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5 space-y-5">
      <div className="rounded-xl bg-adm-card p-4">
        <p className="text-sm text-adm-muted">Ponudba ustvarjena</p>
        <p className="text-xl font-semibold">
          {offer.number} · {formatEur(offer.total)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={pdfUrl} target="_blank" rel="noreferrer" className="rounded-full bg-adm-ink px-4 py-2 text-sm font-medium !text-adm-bg">
            Odpri PDF
          </a>
          <a href={`${pdfUrl}?download`} className="rounded-full border border-adm-ink/20 px-4 py-2 text-sm">
            Prenesi
          </a>
          <button type="button" onClick={onAnother} className="rounded-full border border-adm-ink/20 px-4 py-2 text-sm">
            Nova različica
          </button>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="rounded-xl border border-adm-accent/50 bg-adm-card p-4">
          <p className="text-sm font-semibold text-adm-accent">Opombe za pregled</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {notes.map((note, index) => <li key={index}>{note}</li>)}
          </ul>
        </div>
      )}

      <div className="rounded-xl bg-adm-card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Spremno besedilo e-pošte</p>
          <button type="button" onClick={copy} className="text-sm text-adm-accent">
            {copied ? "Kopirano" : "Kopiraj"}
          </button>
        </div>
        <p className="mt-2 whitespace-pre-line text-sm">{offer.email}</p>
      </div>
    </div>
  );
}
