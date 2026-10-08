"use client";

import { Inbox } from "lucide-react";
import { useState } from "react";
import type { InquiryWithOffers } from "@/lib/db/inquiries";
import { InquiryCard } from "./inquiry-card";
import { Reveal, Stagger } from "./motion";
import { OfferDialog } from "./offer-dialog";

export function InquiryList({ inquiries }: { inquiries: InquiryWithOffers[] }) {
  const [active, setActive] = useState<InquiryWithOffers | null>(null);

  if (inquiries.length === 0) {
    return (
      <Reveal className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-adm-soft px-6 py-16 text-center text-adm-muted">
        <Inbox className="size-8" />
        Ni še povpraševanj.
      </Reveal>
    );
  }

  return (
    <>
      <Stagger className="flex flex-col gap-5">
        {inquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} inquiry={inquiry} onGenerate={() => setActive(inquiry)} />
        ))}
      </Stagger>
      {active && <OfferDialog key={active.id} inquiry={active} onClose={() => setActive(null)} />}
    </>
  );
}
