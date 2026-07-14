import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { equipmentFaq, equipmentProducts } from "@/content/eventaj/equipment";
import { ArrowRight, CalendarCheck, PackageCheck, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "../shared/faq-section";

const steps = [
  {
    icon: Send,
    number: "01",
    title: "Izberi opremo",
    description: "Oglej si izdelek, izberi količino in možnosti, ki ustrezajo tvojemu dogodku.",
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Pošlji datum",
    description: "Sporoči nam datum in lokacijo. Razpoložljivost preverimo v najkrajšem času.",
  },
  {
    icon: PackageCheck,
    number: "03",
    title: "Potrdi podrobnosti",
    description: "Uskladimo prevzem ali dostavo do 75 km po ceni 0,40 €/km ter ti pošljemo jasno končno ponudbo.",
  },
] as const;

export function EquipmentCategoryPage() {
  return (
    <main>
      <section className="px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-[1480px]">
          <nav aria-label="Drobtinice" className="mb-10 text-xs text-[var(--eventaj-muted)]">
            <Link href="/" className="no-underline hover:text-[var(--eventaj-ink)]">Domov</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>Oprema za dogodke</span>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="pb-2 lg:pb-12">
              <div className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-accent)]">
                Najem · osebni prevzem ali dostava
              </div>
              <h1 className="max-w-[760px] font-serif-display text-[clamp(52px,7vw,104px)] font-[350] leading-[0.92] text-balance">
                Oprema za dogodke, <em className="font-serif-italic italic text-[var(--eventaj-accent)]">brez kompliciranja.</em>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--eventaj-ink-2)] md:text-xl">
                Izberi opremo, količino in datum dogodka. Preverimo razpoložljivost ter ti v 24 urah pošljemo vse podrobnosti.
              </p>
              <a href="#oprema" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[var(--eventaj-ink)] px-7 py-4 text-sm font-medium !text-[var(--eventaj-paper)] no-underline transition-colors hover:bg-[var(--eventaj-accent)]">
                Oglej si opremo <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="equipment-category-hero-media relative overflow-hidden rounded-[4px] bg-[var(--eventaj-paper-2)]">
              <Image
                src="/application/oprema/stojeca-miza/dogodek.webp"
                alt="Stoječe barske mize z belimi in črnimi prti na dogodku"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-[rgba(251,248,242,0.92)] px-4 py-2 text-xs font-medium backdrop-blur-md md:bottom-6 md:left-6">
                Jasne cene · hiter dogovor
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="oprema" className="border-y border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-paper-2)] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1480px]">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">Na voljo za najem</div>
              <h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-none">Izberi opremo.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--eventaj-muted)]">
              Ponudbo širimo premišljeno. Vsak izdelek ima svojo ceno, zalogo in obrazec za preverjanje termina.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentProducts.map((product) => (
              <article key={product.id} className="group bg-[var(--eventaj-paper)]">
                <Link href={`/oprema-za-dogodke/${product.slug}`} className="block no-underline">
                  <div className="relative aspect-[4/5] overflow-hidden bg-white">
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[rgba(251,248,242,0.94)] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] backdrop-blur-md">
                      Na voljo {product.available}
                    </span>
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h3 className="font-serif-display text-3xl font-[350]">{product.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--eventaj-muted)]">{product.shortDescription}</p>
                      </div>
                      <ArrowRight className="mt-2 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </div>
                    <div className="mt-6 flex items-end justify-between border-t border-[rgba(20,17,15,0.1)] pt-5">
                      <span className="text-xs text-[var(--eventaj-muted)]">Bel ali črn prt vključen</span>
                      <strong className="font-serif-display text-2xl font-normal">{product.price} € <span className="font-sans text-xs text-[var(--eventaj-muted)]">/ dan</span></strong>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 max-w-2xl">
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">Kako deluje</div>
            <h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-none text-balance">Od izbire do dogodka v treh korakih.</h2>
          </div>
          <div className="grid border border-[rgba(20,17,15,0.12)] md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className={`p-7 md:p-9 ${index > 0 ? "border-t border-[rgba(20,17,15,0.12)] md:border-l md:border-t-0" : ""}`}>
                <div className="flex items-center justify-between">
                  <step.icon className="h-6 w-6 text-[var(--eventaj-accent)]" strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-serif-display text-lg text-[var(--eventaj-muted)]">{step.number}</span>
                </div>
                <h3 className="mt-10 font-serif-display text-3xl font-[350]">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--eventaj-muted)]">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-8 py-5 text-sm font-medium text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">
              Pošlji povpraševanje →
            </InquiryTrigger>
          </div>
        </div>
      </section>

      <FAQSection items={equipmentFaq} eyebrow="Najem opreme · FAQ" />
    </main>
  );
}
