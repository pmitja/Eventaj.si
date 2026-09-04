import type { EquipmentProduct } from "@/content/eventaj/equipment";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { FAQSection } from "../shared/faq-section";
import { EquipmentInquiryCard } from "./equipment-inquiry-card";
import { ProductImageCarousel } from "./product-image-carousel";

export function EquipmentProductPage({ product }: { product: EquipmentProduct }) {
  return (
    <main>
      <section className="px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-[1480px]">
          <nav aria-label="Drobtinice" className="mx-auto mb-10 max-w-[1200px] text-xs text-[var(--eventaj-muted)]">
            <Link href="/" className="no-underline hover:text-[var(--eventaj-ink)]">Domov</Link><span aria-hidden="true" className="mx-2">/</span>
            <Link href="/oprema-za-dogodke" className="no-underline hover:text-[var(--eventaj-ink)]">Oprema za dogodke</Link><span aria-hidden="true" className="mx-2">/</span><span>{product.name}</span>
          </nav>
          <div className="mx-auto mb-12 max-w-[1200px]">
            <div className="max-w-[980px]">
              <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-accent)]">{product.eyebrow}</div>
              <h1 className="font-serif-display text-[clamp(48px,7vw,96px)] font-[350] leading-[0.94] text-balance">{product.heading[0]} <em className="font-serif-italic italic text-[var(--eventaj-accent)]">{product.heading[1]}</em></h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--eventaj-ink-2)] md:text-xl">{product.description}</p>
            </div>
          </div>
          <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 lg:flex-row lg:items-start xl:gap-12">
            <ProductImageCarousel images={product.images} productName={product.name} />
            <div className="w-full max-w-[420px] shrink-0">
              <EquipmentInquiryCard product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--eventaj-ink)] px-5 py-20 text-[var(--eventaj-paper)] md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div><div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[#E8B584]">Vključeno v ceno</div><h2 className="font-serif-display text-[clamp(42px,5vw,70px)] font-[350] leading-[0.98] text-balance">{product.includedSubtitle}.</h2></div>
          <div className="grid content-start border-t border-[rgba(244,239,230,0.18)]">{product.included.map((item) => <div key={item} className="flex items-center gap-4 border-b border-[rgba(244,239,230,0.18)] py-5 text-[15px]"><Check className="h-5 w-5 shrink-0 text-[#E8B584]" />{item}</div>)}</div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 max-w-3xl"><div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">Uporaba</div><h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-none text-balance">{product.useCasesTitle}</h2></div>
          <div className="grid border border-[rgba(20,17,15,0.12)] md:grid-cols-3">{product.useCases.map((item, index) => <article key={item.title} className={`p-7 md:p-9 ${index > 0 ? "border-t border-[rgba(20,17,15,0.12)] md:border-l md:border-t-0" : ""}`}><Sparkles className="h-7 w-7 text-[var(--eventaj-accent)]" strokeWidth={1.5} /><h3 className="mt-10 font-serif-display text-3xl font-[350]">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-[var(--eventaj-muted)]">{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-[var(--eventaj-paper-2)] px-5 py-20 md:px-10 md:py-28"><div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1fr_auto]"><div><div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]"><MessageCircle className="h-4 w-4" /> Hiter dogovor</div><h2 className="font-serif-display text-[clamp(38px,5vw,64px)] font-[350] leading-none text-balance">{product.helpTitle}</h2><p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--eventaj-ink-2)]">{product.helpText}</p></div><a href="tel:+38631285143" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--eventaj-ink)] px-7 text-sm font-medium no-underline transition-colors hover:bg-[var(--eventaj-ink)] hover:text-[var(--eventaj-paper)]">Pokliči 031 285 143</a></div></section>
      <FAQSection items={product.faq} eyebrow={`${product.name} · FAQ`} />
    </main>
  );
}
