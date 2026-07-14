import { standingTable, standingTableFaq } from "@/content/eventaj/equipment";
import { Check, GlassWater, MessageCircle, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "../shared/faq-section";
import { EquipmentInquiryCard } from "./equipment-inquiry-card";

const useCases = [
  { icon: GlassWater, title: "Sprejemi in pogostitve", text: "Prijetna točka za pijačo, prigrizke in sproščen pogovor." },
  { icon: Sparkles, title: "Poroke in praznovanja", text: "Elegantna dopolnitev aperitiva, druženja ali večernega dela dogodka." },
  { icon: Users, title: "Poslovni dogodki", text: "Praktična postavitev za mreženje, predstavitve in interne dogodke." },
] as const;

export function EquipmentProductPage() {
  return (
    <main>
      <section className="px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-[1480px]">
          <nav aria-label="Drobtinice" className="mb-10 text-xs text-[var(--eventaj-muted)]">
            <Link href="/" className="no-underline hover:text-[var(--eventaj-ink)]">Domov</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link href="/oprema-za-dogodke" className="no-underline hover:text-[var(--eventaj-ink)]">Oprema za dogodke</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>Stoječa barska miza</span>
          </nav>

          <div className="mb-12 max-w-[980px]">
            <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-accent)]">{standingTable.eyebrow}</div>
            <h1 className="font-serif-display text-[clamp(48px,7vw,96px)] font-[350] leading-[0.94] text-balance">Najem stoječih <em className="font-serif-italic italic text-[var(--eventaj-accent)]">barskih miz.</em></h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--eventaj-ink-2)] md:text-xl">{standingTable.description}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.6fr)] lg:items-start xl:gap-12">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden bg-white sm:row-span-2">
                <Image src={standingTable.images[0].src} alt={standingTable.images[0].alt} fill priority sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="relative hidden aspect-[4/5] overflow-hidden bg-white sm:block">
                <Image src={standingTable.images[1].src} alt={standingTable.images[1].alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="relative hidden aspect-[4/5] overflow-hidden bg-white sm:block">
                <Image src={standingTable.images[2].src} alt={standingTable.images[2].alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
            <EquipmentInquiryCard />
            <div className="grid gap-4 sm:hidden">
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image src={standingTable.images[1].src} alt={standingTable.images[1].alt} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image src={standingTable.images[2].src} alt={standingTable.images[2].alt} fill sizes="100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--eventaj-ink)] px-5 py-20 text-[var(--eventaj-paper)] md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[#E8B584]">Vključeno v ceno</div>
            <h2 className="font-serif-display text-[clamp(42px,5vw,70px)] font-[350] leading-[0.98] text-balance">Vse bistveno za urejeno postavitev.</h2>
          </div>
          <div className="grid content-start gap-0 border-t border-[rgba(244,239,230,0.18)]">
            {["Stoječa barska miza", "Najem za en dan", "Bel ali črn prt po izbiri", "Možnost kombiniranja barv", "Do 15 miz za isti termin"].map((item) => (
              <div key={item} className="flex items-center gap-4 border-b border-[rgba(244,239,230,0.18)] py-5 text-[15px]">
                <Check className="h-5 w-5 shrink-0 text-[#E8B584]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 max-w-2xl">
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">Za različne priložnosti</div>
            <h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-none text-balance">Več prostora za druženje.</h2>
          </div>
          <div className="grid border border-[rgba(20,17,15,0.12)] md:grid-cols-3">
            {useCases.map((item, index) => (
              <article key={item.title} className={`p-7 md:p-9 ${index > 0 ? "border-t border-[rgba(20,17,15,0.12)] md:border-l md:border-t-0" : ""}`}>
                <item.icon className="h-7 w-7 text-[var(--eventaj-accent)]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-10 font-serif-display text-3xl font-[350]">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--eventaj-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--eventaj-paper-2)] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Hiter dogovor</div>
            <h2 className="font-serif-display text-[clamp(38px,5vw,64px)] font-[350] leading-none text-balance">Potrebuješ pomoč pri količini?</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--eventaj-ink-2)]">Sporoči število gostov in tip dogodka. Pomagali ti bomo oceniti primerno število miz ter uskladiti osebni prevzem ali dostavo do 75 km po ceni 0,40 €/km.</p>
          </div>
          <a href="tel:+38631285143" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--eventaj-ink)] px-7 text-sm font-medium no-underline transition-colors hover:bg-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)]">Pokliči 031 285 143</a>
        </div>
      </section>

      <FAQSection items={standingTableFaq} eyebrow="Stoječe mize · FAQ" />
    </main>
  );
}
