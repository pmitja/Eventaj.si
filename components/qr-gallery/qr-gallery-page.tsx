import {
  qrGalleryDemoUrl,
  qrGalleryFaqs,
  qrGalleryFeatures,
  qrGalleryOrderUrl,
  qrGalleryPlacements,
  qrGallerySteps,
  type QrGalleryUseCase,
} from "@/content/qr-gallery";
import { ArrowRight, Check, ChevronRight, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const shell = "mx-auto w-full max-w-7xl px-5 md:px-10";
const orderButton =
  "qr-gallery-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold no-underline transition-colors";
const secondaryButton =
  "qr-gallery-secondary inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(20,17,15,0.2)] px-6 py-4 text-sm font-semibold no-underline transition-colors hover:border-[var(--eventaj-ink)]";

function GalleryHero({ useCase }: { useCase?: QrGalleryUseCase }) {
  const isLanding = !useCase;

  return (
    <section className="overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div
        className={`${shell} grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]`}
      >
        <div className="relative z-10 max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(20,17,15,0.12)] bg-white/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]">
            <QrCode
              className="h-4 w-4 text-[var(--eventaj-accent)]"
              aria-hidden="true"
            />
            {useCase?.eyebrow ?? "QR galerija za dogodke"}
          </div>
          <h1 className="font-serif-display text-[clamp(52px,7vw,94px)] font-[350] leading-[0.93] tracking-[-0.04em] text-balance">
            {useCase?.title ?? "Vse fotografije gostov na enem mestu"}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-muted)] md:text-xl">
            {useCase?.description ??
              "Ena QR koda na mizah. Gostje skenirajo in naložijo fotografije, kratke videe in glasovna voščila. Brez aplikacije in brez registracije."}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={qrGalleryOrderUrl} className={orderButton}>
              {isLanding
                ? "Ustvari galerijo, 35 €"
                : "Ustvari galerijo za 35 €"}{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={qrGalleryDemoUrl} className={secondaryButton}>
              Poglej demo galerijo
            </a>
          </div>
          {isLanding ? (
            <p className="mt-6 text-sm text-[var(--eventaj-muted)]">
              Postavitev traja tri minute. Galerija ostane odprta 180 dni.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--eventaj-muted)]">
              <span>Enkratno plačilo</span>
              <span>Neomejeno gostov</span>
              <span>Galerija 180 dni</span>
            </div>
          )}
        </div>

        <div className="relative mx-auto h-[530px] w-full max-w-[560px] md:h-[640px]">
          <div
            className="absolute inset-x-[8%] inset-y-[10%] rotate-3 bg-[#E8B584]"
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-1/2 w-[275px] -translate-x-1/2 overflow-hidden rounded-[34px] border-[10px] border-[var(--eventaj-ink)] bg-white shadow-[0_38px_90px_-35px_rgba(20,17,15,0.55)] md:w-[330px]">
            <Image
              src="/qr-galerija/screenshots/galerija-mobile.png"
              alt="Galerija dogodka Ana in Marko na telefonu"
              fill
              priority
              className="object-cover object-top"
              sizes="330px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
        {eyebrow}
      </div>
      <h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-[1] tracking-[-0.035em] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--eventaj-muted)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ProofStrip() {
  return (
    <section className="border-y border-[rgba(20,17,15,0.12)] bg-white/45">
      <div
        className={`${shell} flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4 text-center text-sm font-medium text-[var(--eventaj-ink-2)]`}
      >
        <span>4,9 ★ iz 30+ ocen</span>
        <span aria-hidden="true">·</span>
        <span>50+ izvedenih dogodkov</span>
        <span aria-hidden="true">·</span>
        <span>Photo Booth, 360° Booth in QR galerija</span>
      </div>
    </section>
  );
}

function GalleryProblem() {
  return (
    <section className="py-20 md:py-28">
      <div className={`${shell} max-w-5xl`}>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
          Zakaj QR galerija
        </div>
        <h2 className="mt-5 max-w-4xl font-serif-display text-[clamp(42px,5.5vw,72px)] font-[350] leading-[1] tracking-[-0.035em] text-balance">
          Fotograf ujame obred. Gostje ujamejo vse ostalo
        </h2>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--eventaj-muted)] md:text-xl">
          Najboljši posnetki nastanejo takrat, ko fotografa ni v prostoru. Pri
          mizah, na plesišču, pred ogledalom ob polnoči. Potem ostanejo
          raztreseni po telefonih štiridesetih ljudi in do vas nikoli ne
          pridejo. QR galerija jih zbere na eno mesto še isti večer.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="kako-deluje"
      className="border-y border-[rgba(20,17,15,0.08)] bg-white/35 py-20 md:py-28"
    >
      <div className={shell}>
        <SectionHeading eyebrow="Trije koraki" title="Kako deluje" />
        <div className="grid border-l border-t border-[rgba(20,17,15,0.12)] lg:grid-cols-3">
          {qrGallerySteps.map((step) => (
            <article
              key={step.number}
              className="flex min-h-[560px] flex-col overflow-hidden border-b border-r border-[rgba(20,17,15,0.12)]"
            >
              <div className="p-7 md:p-9">
                <span className="text-xs font-semibold tracking-[0.18em] text-[var(--eventaj-accent)]">
                  {step.number}
                </span>
                <h3 className="mt-14 font-serif-display text-3xl font-[400] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--eventaj-muted)]">
                  {step.description}
                </p>
              </div>
              <div className="relative mt-auto flex h-80 items-start justify-center overflow-hidden bg-[var(--eventaj-paper-2)] pt-6">
                {step.number === "01" ? (
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1023px) 100vw, 33vw"
                  />
                ) : (
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={step.number === "02" ? 680 : 390}
                    height={step.number === "02" ? 1043 : 1848}
                    className={
                      step.number === "02"
                        ? "h-auto w-[68%]"
                        : "h-auto w-[42%] max-w-[190px]"
                    }
                    sizes="(max-width: 1023px) 68vw, 23vw"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlacementGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className={shell}>
        <SectionHeading
          eyebrow="Kje naj bo QR koda"
          title="Postavite jo tja, kjer jo gostje res vidijo."
          description="Isto kodo uporabite na več mestih. Večkrat ko jo gost opazi, večja je možnost, da bo dodal svoje fotografije."
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {qrGalleryPlacements.map((item) => (
            <article key={item.title}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--eventaj-paper-2)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-5 font-serif-display text-2xl font-[400]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--eventaj-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingFeatures() {
  return (
    <section className="py-20 md:py-28">
      <div className={shell}>
        <SectionHeading eyebrow="Vključeno v ceno" title="Kaj je vključeno" />
        <div className="grid border-l border-t border-[rgba(20,17,15,0.12)] md:grid-cols-2 lg:grid-cols-3">
          {qrGalleryFeatures.map(([title, description], index) => (
            <article
              key={title}
              className="min-h-72 border-b border-r border-[rgba(20,17,15,0.12)] p-7 md:p-9"
            >
              <span className="text-xs font-semibold text-[var(--eventaj-accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-12 font-serif-display text-3xl font-[400] leading-tight">
                {title}
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--eventaj-muted)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveProjection({
  title = "Fotografije gostov na velikem platnu",
  description = "Gost skenira kodo, čez nekaj sekund je njegova fotografija na projektorju in dvorana to opazi. Galerija je tako del večera, ne le arhiv po dogodku.",
}: {
  title?: string;
  description?: string;
} = {}) {
  return (
    <section className="overflow-hidden bg-[var(--eventaj-ink)] py-20 text-[var(--eventaj-paper)] md:py-28">
      <div
        className={`${shell} grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20`}
      >
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8B584]">
            Živa projekcija
          </div>
          <h2 className="mt-5 font-serif-display text-[clamp(44px,5vw,68px)] font-[350] leading-[1] tracking-[-0.035em]">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--eventaj-cream)] opacity-75">
            {description}
          </p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden border border-[rgba(244,239,230,0.18)] bg-black/25 shadow-2xl">
          <Image
            src="/qr-galerija/screenshots/live-slideshow.png"
            alt="Živa projekcija fotografij gostov na zaslonu"
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 62vw"
          />
        </div>
      </div>
    </section>
  );
}

const landingPriceItems = [
  "QR galerija brez aplikacije in neomejeno gostov",
  "Fotografije, komentarji in glasovna knjiga",
  "Do 20 videov, vsak do 60 sekund",
  "Živa projekcija v dvorani",
  "Administracija dogodka ter QR koda v SVG in PNG",
  "Prenos originalov in ZIP na e-pošto po dogodku",
  "Galerija odprta 180 dni",
] as const;

export function LandingPricing() {
  return (
    <section
      id="cena"
      className="bg-[var(--eventaj-ink)] py-20 text-[var(--eventaj-paper)] md:py-28"
    >
      <div className={shell}>
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8B584]">
            Cena
          </div>
          <h2 className="font-serif-display text-[clamp(40px,5vw,68px)] font-[350] leading-[1] tracking-[-0.035em] text-balance">
            Galerija dogodka, 35 € na dogodek
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--eventaj-cream)] opacity-70 md:text-lg">
            Enkratno plačilo. Brez naročnine in brez skritih doplačil.
          </p>
        </div>
        <div className="mx-auto max-w-4xl border border-[rgba(244,239,230,0.18)] p-7 md:p-10">
          <ul className="grid gap-4 md:grid-cols-2">
            {landingPriceItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#E8B584]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 grid gap-6 border-t border-[rgba(244,239,230,0.16)] pt-8 md:grid-cols-2">
            <div>
              <h3 className="font-serif-display text-2xl font-[400]">
                AI Best Photos, +15 €
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--eventaj-cream)] opacity-70">
                Do 3.000 fotografij. Izloči podvojene in tehnično neuspele
                posnetke, da vam ni treba pregledovati vsega ročno.
              </p>
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-[400]">
                Neomejeni videi, +15 €
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--eventaj-cream)] opacity-70">
                Število videov ni omejeno. Veljajo pravila razumne uporabe.
              </p>
            </div>
          </div>
          <a
            href={qrGalleryOrderUrl}
            className="qr-gallery-inverse mt-9 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold no-underline transition-colors"
          >
            Ustvari galerijo, 35 €{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const included = qrGalleryFeatures.slice(0, 8);
  return (
    <section
      id="cena"
      className="bg-[var(--eventaj-ink)] py-20 text-[var(--eventaj-paper)] md:py-28"
    >
      <div className={shell}>
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8B584]">
              Cena
            </div>
            <h2 className="mt-5 font-serif-display text-[clamp(48px,6vw,76px)] font-[350] leading-[0.98] tracking-[-0.035em]">
              Enkratnih 35 €.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--eventaj-cream)] opacity-70">
              En dogodek, ena cena. Brez naročnine in brez doplačila na gosta.
            </p>
            <a
              href={qrGalleryOrderUrl}
              className="qr-gallery-inverse mt-9 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold no-underline transition-colors"
            >
              Ustvari dogodek{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="border border-[rgba(244,239,230,0.18)] p-7 md:p-10">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-[rgba(244,239,230,0.16)] pb-8">
              <div>
                <div className="text-sm text-[var(--eventaj-cream)] opacity-60">
                  Galerija dogodka
                </div>
                <div className="mt-2 font-serif-display text-6xl font-[350]">
                  35 €
                </div>
              </div>
              <div className="text-right text-sm text-[var(--eventaj-cream)] opacity-60">
                z DDV
                <br />
                brez naročnine
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {included.map(([title]) => (
                <li key={title} className="flex items-center gap-3 text-sm">
                  <Check
                    className="h-4 w-4 shrink-0 text-[#E8B584]"
                    aria-hidden="true"
                  />{" "}
                  {title}
                </li>
              ))}
            </ul>
            <div className="mt-9 grid gap-3 border-t border-[rgba(244,239,230,0.16)] pt-7 text-sm text-[var(--eventaj-cream)] sm:grid-cols-2">
              <div>
                <span className="text-[#E8B584]">+15 €</span> AI Best Photos
              </div>
              <div>
                <span className="text-[#E8B584]">+15 €</span> neomejeno videov
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <section className="overflow-hidden border-b border-[rgba(20,17,15,0.08)] bg-[var(--eventaj-paper-2)] py-20 md:py-28">
      <div className={shell}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
              Brez aplikacije
            </div>
            <h2 className="mt-5 font-serif-display text-[clamp(44px,5vw,68px)] font-[350] leading-[1] tracking-[-0.035em]">
              Gost od QR kode do nalaganja pride v nekaj sekundah.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--eventaj-muted)]">
              Galerija deluje na telefonu in računalniku. Gostje ne ustvarjajo
              računa, organizator pa ima svoj zasebni nadzorni del.
            </p>
            <a href={qrGalleryDemoUrl} className={`${secondaryButton} mt-8`}>
              Odpri demo galerijo
            </a>
          </div>
          <div className="relative aspect-[16/11]">
            <Image
              src="/qr-galerija/screenshots/galerija-desktop.png"
              alt="Galerija dogodka na računalniku"
              fill
              className="object-contain"
              sizes="(max-width: 1023px) 100vw, 60vw"
            />
            <div className="absolute -bottom-8 right-[6%] h-[70%] w-[26%] overflow-hidden rounded-[22px] border-[6px] border-[var(--eventaj-ink)] bg-white shadow-2xl">
              <Image
                src="/qr-galerija/screenshots/galerija-mobile.png"
                alt="Galerija dogodka na telefonu"
                fill
                className="object-cover object-top"
                sizes="180px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const items = [
    {
      title: "Poroke",
      description: "Fotografije gostov, ki jih fotograf ne posname.",
      href: "/qr-galerija/poroka",
    },
    {
      title: "Poslovni dogodki in konference",
      description: "Vsebina za omrežja iz perspektive udeležencev.",
      href: "/qr-galerija/poslovni-dogodek",
    },
    {
      title: "Rojstni dnevi in praznovanja",
      description: "Glasovna voščila ostanejo, tudi ko se zabava konča.",
      href: "/qr-galerija/za-dogodke/rojstni-dnevi",
    },
    {
      title: "Team buildingi",
      description: "Živa projekcija razbije led hitreje kot uvodni nagovor.",
      href: "/qr-galerija/za-dogodke/team-building",
    },
  ] as const;

  return (
    <section className="py-20 md:py-28">
      <div className={shell}>
        <SectionHeading eyebrow="Primeri uporabe" title="Za katere dogodke" />
        <div className="grid border-l border-t border-[rgba(20,17,15,0.12)] md:grid-cols-2">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group min-h-64 border-b border-r border-[rgba(20,17,15,0.12)] p-7 no-underline transition-colors hover:bg-white/60 md:p-9"
            >
              <span className="text-xs font-semibold text-[var(--eventaj-accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-12 max-w-lg font-serif-display text-3xl font-[400] leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 max-w-lg leading-relaxed text-[var(--eventaj-muted)]">
                {item.description}
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                Preberi več{" "}
                <ChevronRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({
  items = qrGalleryFaqs,
}: {
  items?: readonly (readonly [string, string])[];
}) {
  return (
    <section
      id="pogosta-vprasanja"
      className="border-t border-[rgba(20,17,15,0.08)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <SectionHeading eyebrow="FAQ" title="Pogosta vprašanja" />
        <div className="border-t border-[rgba(20,17,15,0.14)]">
          {items.map(([question, answer]) => (
            <details
              key={question}
              className="group border-b border-[rgba(20,17,15,0.14)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-medium marker:hidden">
                {question}
                <span className="text-2xl font-light text-[var(--eventaj-accent)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-[var(--eventaj-muted)]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-7xl bg-[#E8B584] px-6 py-16 text-center md:px-10 md:py-24">
        <h2 className="mx-auto max-w-4xl font-serif-display text-[clamp(44px,6vw,80px)] font-[350] leading-[0.98] tracking-[-0.035em] text-balance">
          Postavite galerijo za svoj dogodek
        </h2>
        <p className="mt-6 text-[var(--eventaj-ink-2)]">
          Tri minute za postavitev. 180 dni za spomine.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={qrGalleryOrderUrl}
            className="qr-gallery-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold no-underline transition-colors"
          >
            Ustvari galerijo, 35 €{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={qrGalleryDemoUrl} className={secondaryButton}>
            Poglej demo galerijo
          </a>
        </div>
      </div>
    </section>
  );
}

function RelatedLinks({
  links,
}: {
  links: readonly { href: string; label: string }[];
}) {
  return (
    <nav
      aria-label="Povezane vsebine"
      className="border-t border-[rgba(20,17,15,0.08)] py-8"
    >
      <div
        className={`${shell} flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="underline decoration-[rgba(20,17,15,0.25)] underline-offset-4 hover:decoration-[var(--eventaj-ink)]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function DetailHero({
  eyebrow,
  title,
  description,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className="overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div
        className={`${shell} grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]`}
      >
        <div className="max-w-3xl">
          <div className="mb-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
            {eyebrow}
          </div>
          <h1 className="font-serif-display text-[clamp(50px,7vw,88px)] font-[350] leading-[0.95] tracking-[-0.04em] text-balance">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-muted)] md:text-xl">
            {description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={qrGalleryOrderUrl} className={orderButton}>
              Ustvari galerijo, 35 €{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={secondaryHref} className={secondaryButton}>
              {secondaryLabel}
            </a>
          </div>
        </div>
        <div className="relative mx-auto h-[520px] w-full max-w-[520px] md:h-[620px]">
          <div
            className="absolute inset-x-[8%] inset-y-[10%] -rotate-3 bg-[#E8B584]"
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-1/2 w-[270px] -translate-x-1/2 overflow-hidden rounded-[34px] border-[10px] border-[var(--eventaj-ink)] bg-white shadow-2xl md:w-[320px]">
            <Image
              src="/qr-galerija/screenshots/galerija-mobile.png"
              alt="QR galerija dogodka na telefonu"
              fill
              priority
              className="object-cover object-top"
              sizes="320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const weddingFaqs = [
  [
    "Kdaj naj ustvarim galerijo?",
    "Teden dni pred poroko je dovolj. Postavitev traja tri minute, več časa vzame priprava in tisk stojal.",
  ],
  [
    "Kaj če starejši gostje ne znajo skenirati?",
    "Kamera na telefonu prepozna kodo sama, dodatna aplikacija ni potrebna. Večja ovira je navadno to, da koda ni na mizi, ne uporaba telefona.",
  ],
  [
    "Kaj se zgodi, če je v dvorani slab signal?",
    "Za nalaganje je potrebna podatkovna povezava. Gost lahko fotografije naloži pozneje, ko ima boljši signal. Pred poroko je smiselno preveriti tudi Wi-Fi dvorane.",
  ],
  [
    "Ali lahko odstranim posamezno fotografijo?",
    "Da. Organizator lahko v administraciji posamezno fotografijo skrije ali odstrani iz galerije.",
  ],
  [
    "Kdo vidi galerijo?",
    "Galerijo odpre le tisti, ki ima povezavo ali QR kodo. Iskalniki je ne indeksirajo.",
  ],
] as const;

export function QrGalleryWeddingPage() {
  const placements = [
    [
      "Welcome tabla ob vhodu",
      "Prvi stik. Gost skenira, preden sede.",
      "/qr-galerija/postavitve/welcome-sign.jpg",
      "QR koda na poročni welcome tabli",
    ],
    [
      "Na vsako mizo",
      "Tu nastane največ nalaganj. Ena koda na vhodu ni dovolj, ker jo gostje do večerje pozabijo.",
      "/qr-galerija/postavitve/table.jpg",
      "Kartica s QR kodo na poročni mizi",
    ],
    [
      "Ob ogledalu",
      "Ljudje se tam ustavijo sami od sebe in imajo telefon že v roki.",
      "/qr-galerija/postavitve/menu-card.jpg",
      "Kartica s QR kodo za poročne fotografije",
    ],
    [
      "Pri sladki mizi in torti",
      "Takrat vsi fotografirajo, zato je koda na pravem mestu ob pravem času.",
      "/qr-galerija/postavitve/projection.jpg",
      "QR koda ob prikazu poročnih fotografij",
    ],
  ] as const;

  return (
    <main>
      <DetailHero
        eyebrow="QR galerija za poroko"
        title="Zberite poročne fotografije svojih gostov z eno QR kodo"
        description="Kodo postavite na mize, welcome tablo ali vabila. Gostje skenirajo in naložijo fotografije, kratke videe in glasovna voščila naravnost s telefona. Brez aplikacije in brez registracije."
        secondaryLabel="Poglej demo galerijo"
        secondaryHref={qrGalleryDemoUrl}
      />
      <section className="border-y border-[rgba(20,17,15,0.08)] bg-white/35 py-20 md:py-28">
        <div className={`${shell} max-w-5xl`}>
          <h2 className="max-w-4xl font-serif-display text-[clamp(42px,5.5vw,72px)] font-[350] leading-[1] tracking-[-0.035em] text-balance">
            Fotograf odide ob polnoči. Zabava se takrat šele začne
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--eventaj-muted)]">
            Fotograf vam preda nekaj sto izbranih posnetkov obreda, pozdravov in
            prvega plesa. Vaših sto gostov jih naredi nekajkrat več. Najboljši
            obrazi pogosto nastanejo ob dveh zjutraj. Če fotografij ne zberete
            tisti večer, jih po treh tednih nima smisla več loviti.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className={shell}>
          <SectionHeading
            eyebrow="Poročna QR koda"
            title="Kam postaviti QR kodo"
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {placements.map(([title, description, imageSrc, alt]) => (
              <article key={title}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--eventaj-paper-2)]">
                  <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  />
                </div>
                <h3 className="mt-5 font-serif-display text-2xl font-[400]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--eventaj-muted)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl border-l-2 border-[var(--eventaj-accent)] pl-6 text-lg leading-relaxed">
            Na stojalo napišite &ldquo;Naloži svoje fotografije z najine
            poroke&rdquo;. To pove več kot samo &ldquo;Skeniraj QR kodo&rdquo;.
          </p>
        </div>
      </section>
      <section className="border-y border-[rgba(20,17,15,0.08)] bg-[var(--eventaj-paper-2)] py-20 md:py-28">
        <div
          className={`${shell} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
              Glasovna knjiga
            </div>
            <h2 className="mt-5 font-serif-display text-[clamp(42px,5vw,66px)] font-[350] leading-[1] tracking-[-0.035em]">
              Voščila, ki jih slišite, ne preberete
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--eventaj-muted)]">
              Gost lahko namesto zapisa v knjigo gostov posname do dve minuti
              glasu. Babičin nasvet, prijateljevo neprimerno šalo ali otroka, ki
              komaj govori. Posnetki ostanejo v galeriji poleg fotografij in jih
              prenesete skupaj z njimi.
            </p>
          </div>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[30px] border-[9px] border-[var(--eventaj-ink)] bg-white shadow-2xl">
            <Image
              src="/qr-galerija/screenshots/galerija-mobile.png"
              alt="Glasovna voščila v poročni galeriji na telefonu"
              fill
              className="object-cover object-top"
              sizes="300px"
            />
          </div>
        </div>
      </section>
      <LiveProjection
        title="Fotografije na platnu med večerjo"
        description="Vklopite projekcijo in fotografije gostov se sproti prikazujejo na televizorju ali projektorju. Gostje začnejo nalagati več, ker vidijo, kam gredo njihove fotografije."
      />
      <section className="py-20 md:py-28">
        <div className={shell}>
          <SectionHeading
            eyebrow="Po poroki"
            title="Kaj dobite naslednji dan"
          />
          <div className="grid border-l border-t border-[rgba(20,17,15,0.12)] md:grid-cols-3">
            {[
              "Galerijo s fotografijami, videi in glasovnimi voščili, odprto 180 dni",
              "ZIP z originali na e-pošto, brez stiskanja",
              "Povezavo, ki jo lahko delite s starši in pričami",
            ].map((item, index) => (
              <article
                key={item}
                className="min-h-56 border-b border-r border-[rgba(20,17,15,0.12)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold text-[var(--eventaj-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-12 font-serif-display text-2xl leading-snug">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LandingPricing />
      <Faq items={weddingFaqs} />
      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-5xl border border-[rgba(20,17,15,0.12)] p-8 text-center md:p-12">
          <h2 className="font-serif-display text-4xl font-[350]">
            Se še odločate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--eventaj-muted)]">
            V vodniku primerjamo pet načinov zbiranja fotografij gostov, tudi
            brezplačne možnosti.
          </p>
          <Link
            href="/nasveti/kako-zbrati-fotografije-gostov-na-poroki"
            className={`${secondaryButton} mt-7`}
          >
            Kako zbrati fotografije gostov na poroki
          </Link>
        </div>
      </section>
      <RelatedLinks
        links={[
          { href: "/qr-galerija", label: "QR galerija za dogodke" },
          { href: "/photo-booth", label: "Photo Booth za poroko" },
        ]}
      />
    </main>
  );
}

export function QrGalleryBusinessPage() {
  const privacyItems = [
    "Galerija ni javno indeksirana in se ne pojavi v iskalnikih",
    "Dostop ima le, kdor ima povezavo ali QR kodo",
    "Fotografij, videov in glasovnih sporočil ne uporabljamo za promocijo brez dovoljenja",
    "Po dogodku dobite ZIP z originali, galerija pa se zapre po 180 dneh",
  ] as const;
  const scenarios = [
    [
      "Konference in sejmi",
      "Koda na badgeu in roll-upu. Po dogodku imate gradivo za objave, ne da bi čakali na fotografa.",
    ],
    [
      "Team buildingi",
      "Živa projekcija razbije led hitreje kot uvodni nagovor, ker ljudje takoj vidijo svoje posnetke na platnu.",
    ],
    [
      "Poslovna praznovanja in obletnice",
      "Glasovna sporočila zaposlenih ostanejo namesto knjige vtisov.",
    ],
  ] as const;

  return (
    <main>
      <DetailHero
        eyebrow="Foto galerija za poslovni dogodek"
        title="Fotografije udeležencev z vašega dogodka na enem mestu"
        description="Ena QR koda na mizah, badgeih ali roll-upu. Udeleženci naložijo fotografije in kratke videe brez aplikacije in brez registracije."
        secondaryLabel="Pošlji povpraševanje za več dogodkov"
        secondaryHref="mailto:info@eventaj.si?subject=QR%20galerija%20za%20več%20dogodkov"
      />
      <section className="border-y border-[rgba(20,17,15,0.08)] bg-white/35 py-20 md:py-28">
        <div className={`${shell} max-w-5xl`}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
            Za marketing po dogodku
          </div>
          <h2 className="mt-5 max-w-4xl font-serif-display text-[clamp(42px,5.5vw,72px)] font-[350] leading-[1] tracking-[-0.035em]">
            Vsebina, ki je fotograf ne posname
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--eventaj-muted)]">
            Najeti fotograf posname oder, panel in skupinsko sliko. Za omrežja
            pa potrebujete obraze ljudi med odmorom, reakcije v dvorani in
            posnetke iz prve roke. Po vsakem dogodku jih je na telefonih
            udeležencev na stotine. QR galerija jih z njihovim dovoljenjem zbere
            pri vas in ohrani originalno kakovost.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className={shell}>
          <SectionHeading eyebrow="Primeri" title="Kje to deluje" />
          <div className="grid border-l border-t border-[rgba(20,17,15,0.12)] md:grid-cols-3">
            {scenarios.map(([title, description], index) => (
              <article
                key={title}
                className="min-h-72 border-b border-r border-[rgba(20,17,15,0.12)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold text-[var(--eventaj-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-12 font-serif-display text-3xl font-[400]">
                  {title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--eventaj-muted)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--eventaj-paper-2)] py-20 md:py-28">
        <div
          className={`${shell} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}
        >
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
              Zasebnost
            </div>
            <h2 className="mt-5 font-serif-display text-[clamp(42px,5vw,66px)] font-[350] leading-[1] tracking-[-0.035em]">
              Kdo ima dostop do vsebin
            </h2>
          </div>
          <div>
            <ul className="grid gap-4">
              {privacyItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 leading-relaxed"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[var(--eventaj-accent)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-l-2 border-[var(--eventaj-accent)] pl-5 text-sm leading-relaxed text-[var(--eventaj-muted)]">
              Udeležence na kodi ali v vabilu obvestite, kam gredo posnetki in
              kdo jih bo videl. Organizator lahko posamezno vsebino v
              administraciji tudi skrije ali odstrani.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[var(--eventaj-ink)] py-20 text-[var(--eventaj-paper)] md:py-28">
        <div
          className={`${shell} grid gap-px bg-[rgba(244,239,230,0.18)] md:grid-cols-2`}
        >
          <article className="flex min-h-96 flex-col bg-[var(--eventaj-ink)] p-8 md:p-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8B584]">
              Posamezen dogodek
            </div>
            <h2 className="mt-6 font-serif-display text-5xl font-[350]">
              En dogodek, 35 €
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--eventaj-cream)] opacity-70">
              Vse vključeno, brez naročnine. Enako kot pri zasebnih dogodkih.
            </p>
            <a
              href={qrGalleryOrderUrl}
              className="qr-gallery-inverse mt-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold no-underline"
            >
              Ustvari en dogodek, 35 €
            </a>
          </article>
          <article className="flex min-h-96 flex-col bg-[var(--eventaj-ink)] p-8 md:p-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8B584]">
              Paket
            </div>
            <h2 className="mt-6 font-serif-display text-5xl font-[350]">
              Več dogodkov na leto
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--eventaj-cream)] opacity-70">
              Pripravimo paket in po dogovoru prevzamemo postavitev, tisk stojal
              ter projekcijo na kraju samem. Pošljite nam število dogodkov in
              okvirne termine.
            </p>
            <a
              href="mailto:info@eventaj.si?subject=QR%20galerija%20za%20več%20dogodkov"
              className="qr-gallery-inverse mt-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold no-underline"
            >
              Pošlji povpraševanje
            </a>
          </article>
        </div>
      </section>
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl border border-[rgba(20,17,15,0.12)] p-8 text-center md:p-12">
          <h2 className="font-serif-display text-4xl font-[350]">
            QR galerija in Photo Booth se dopolnjujeta
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-[var(--eventaj-muted)]">
            Photo Booth naredi tiskano fotografijo, ki jo gost odnese domov. QR
            galerija zbere vse ostale posnetke udeležencev.
          </p>
          <Link
            href="/nasveti/photo-booth-ali-qr-galerija"
            className={`${secondaryButton} mt-7`}
          >
            Primerjaj Photo Booth in QR galerijo
          </Link>
        </div>
      </section>
      <RelatedLinks
        links={[
          { href: "/qr-galerija", label: "QR galerija za dogodke" },
          { href: "/oprema-za-dogodke", label: "Oprema za dogodke" },
          { href: "/cenik", label: "Cenik" },
        ]}
      />
    </main>
  );
}

export function QrGalleryLandingPage() {
  return (
    <main>
      <GalleryHero />
      <ProofStrip />
      <GalleryProblem />
      <HowItWorks />
      <LandingFeatures />
      <LiveProjection />
      <UseCases />
      <LandingPricing />
      <RelatedLinks
        links={[
          { href: "/photo-booth", label: "Photo Booth" },
          {
            href: "/nasveti/photo-booth-ali-qr-galerija",
            label: "Photo Booth ali QR galerija",
          },
        ]}
      />
      <Faq />
      <FinalCta />
    </main>
  );
}

export function QrGalleryFeaturesPage() {
  return (
    <main>
      <section className="pb-16 pt-36 md:pb-24 md:pt-44">
        <div className={`${shell} max-w-5xl text-center`}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
            Funkcije QR galerije
          </div>
          <h1 className="mt-6 font-serif-display text-[clamp(52px,7vw,92px)] font-[350] leading-[0.94] tracking-[-0.04em] text-balance">
            Vse, kar potrebujete za fotografije gostov.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--eventaj-muted)] md:text-xl">
            Gostom pustite kratek in jasen postopek. Vi dobite nadzor, prikaz v
            živo in prenos vseh izvirnikov.
          </p>
          <a href={qrGalleryOrderUrl} className={`${orderButton} mt-9`}>
            Ustvari galerijo za 35 €
          </a>
        </div>
      </section>
      <section className="border-y border-[rgba(20,17,15,0.08)] bg-white/35 py-20 md:py-28">
        <div className={shell}>
          <div className="grid border-l border-t border-[rgba(20,17,15,0.12)] md:grid-cols-2 lg:grid-cols-3">
            {qrGalleryFeatures.map(([title, description], index) => (
              <article
                key={title}
                className="min-h-64 border-b border-r border-[rgba(20,17,15,0.12)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold text-[var(--eventaj-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-14 font-serif-display text-3xl font-[400]">
                  {title}
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--eventaj-muted)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className={`${shell} grid gap-10 lg:grid-cols-2`}>
          <article>
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--eventaj-paper-2)]">
              <Image
                src="/qr-galerija/screenshots/live-slideshow.png"
                alt="Live Slideshow fotografij na velikem zaslonu"
                fill
                className="object-contain"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
            <h2 className="mt-7 font-serif-display text-4xl font-[400]">
              Fotografije na zaslonu med dogodkom
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--eventaj-muted)]">
              Live Slideshow sproti pokaže odobrene fotografije. Odprete ga na
              računalniku, povezanem s televizorjem ali projektorjem.
            </p>
          </article>
          <article>
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--eventaj-paper-2)]">
              <Image
                src="/qr-galerija/screenshots/email-qr.png"
                alt="E-pošta s povezavo za nastavitev in QR kodo"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
            <h2 className="mt-7 font-serif-display text-4xl font-[400]">
              Nastavitev brez novega računa
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--eventaj-muted)]">
              Po plačilu prejmete zasebno povezavo za ureditev dogodka. Tam
              prenesete QR kodo, upravljate fotografije in pripravite ZIP.
            </p>
          </article>
        </div>
      </section>
      <Faq />
      <FinalCta />
    </main>
  );
}

export function QrGalleryUseCasePage({
  useCase,
}: {
  useCase: QrGalleryUseCase;
}) {
  const benefits = [
    useCase.benefits[0],
    useCase.benefits[1],
    "Iskanje fotografij s selfijem",
    "AI izbor najboljših fotografij",
  ];

  return (
    <main>
      <GalleryHero useCase={useCase} />
      <HowItWorks />
      <PlacementGrid />
      <section className="border-y border-[rgba(20,17,15,0.08)] bg-white/35 py-20 md:py-28">
        <div className={shell}>
          <SectionHeading
            eyebrow="Za ta dogodek"
            title="Kaj boste imeli pripravljeno."
          />
          <div className="grid gap-px bg-[rgba(20,17,15,0.12)] md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <article
                key={benefit}
                className="min-h-48 bg-[var(--eventaj-paper)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold text-[var(--eventaj-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-12 max-w-lg font-serif-display text-2xl leading-snug">
                  {benefit}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {useCase.occasions.map((occasion) => (
              <span
                key={occasion}
                className="rounded-full border border-[rgba(20,17,15,0.16)] px-5 py-2.5 text-sm"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </section>
      <Pricing />
      <ProductPreview />
      <Faq items={[...useCase.faq, ...qrGalleryFaqs.slice(0, 3)]} />
      <FinalCta />
    </main>
  );
}
