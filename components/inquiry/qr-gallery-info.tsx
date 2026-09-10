"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function QrGalleryInfo({
  selected,
  price,
  onAdd,
}: {
  selected: boolean;
  price: number;
  onAdd: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            "py-1 text-xs underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
            selected
              ? "text-[#245536] decoration-[#2F6B47]/40 hover:decoration-[#2F6B47] focus-visible:outline-[#2F6B47]"
              : "text-[#8F3029] decoration-[#A63830]/40 hover:decoration-[#A63830] focus-visible:outline-[#A63830]",
          )}
        >
          Kaj je QR galerija?
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm"
          onMouseDown={(event) => event.stopPropagation()}
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[121] max-h-[90dvh] w-[calc(100%-2rem)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[4px] border border-[#B4473D]/20 bg-[#FCF8F3] p-7 text-[#281C19] shadow-2xl sm:p-9"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <Dialog.Close
            type="button"
            aria-label="Zapri opis QR galerije"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#B4473D]/20 text-xl text-[#8F3029] hover:bg-[#F9EAE6]"
          >
            ×
          </Dialog.Close>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A63830]">
            QR galerija dogodka
          </p>
          <Dialog.Title className="pr-4 font-serif-display text-3xl font-normal leading-tight">
            Vsi utrinki gostov. Na enem mestu.
          </Dialog.Title>
          <Dialog.Description className="mt-4 text-sm leading-relaxed text-[#6B4941]">
            Gostje skenirajo QR kodo in dodajo fotografije, videoposnetke ter
            glasovna sporočila s svojega telefona. Brez nameščanja aplikacije.
          </Dialog.Description>
          <p className="mt-3 text-sm leading-relaxed text-[#6B4941]">
            Ujameš tudi trenutke s plesišča, omizij in iz zakulisja. Vse v zasebni
            galeriji, iz katere lahko po dogodku preneseš spomine.
          </p>
          <p className="mt-6 text-sm font-medium text-[#8F3029]">
            +{price} € za cel dogodek
          </p>
          <button
            type="button"
            onClick={() => {
              if (!selected) onAdd();
              setOpen(false);
            }}
            className="mt-4 w-full rounded-full bg-[#A63830] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#842B25] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A63830]"
          >
            {selected ? "Nazaj na povpraševanje" : "Dodaj QR galerijo"}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
