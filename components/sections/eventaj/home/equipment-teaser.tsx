import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EquipmentTeaser() {
  return (
    <section className="border-b border-[rgba(20,17,15,0.1)] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1480px] overflow-hidden bg-[var(--eventaj-paper-2)] lg:grid-cols-2">
        <div className="equipment-home-teaser-media relative">
          <Image src="/application/oprema/stojeca-miza/dogodek.webp" alt="Stoječe barske mize z belimi in črnimi prti na dogodku" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center p-7 md:p-12 lg:p-16">
          <div className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-accent)]">Novo · Oprema za dogodke</div>
          <h2 className="font-serif-display text-[clamp(42px,5vw,72px)] font-[350] leading-[0.96] text-balance">Za piko na <em className="font-serif-italic italic text-[var(--eventaj-accent)]">i.</em></h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--eventaj-ink-2)]">Najemi stoječe barske mize z belim ali črnim prtom. Že od 10 € na mizo za en dan.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/oprema-za-dogodke" className="inline-flex items-center gap-3 rounded-full bg-[var(--eventaj-ink)] px-7 py-4 text-sm font-medium !text-[var(--eventaj-paper)] no-underline transition-colors hover:bg-[var(--eventaj-accent)]">Oglej si opremo <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <span className="text-sm text-[var(--eventaj-muted)]">Na voljo do 15 miz</span>
          </div>
        </div>
      </div>
    </section>
  );
}
