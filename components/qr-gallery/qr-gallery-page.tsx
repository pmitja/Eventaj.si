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
import { EVENTS_DONE, REVIEW_COUNT, REVIEW_RATING_LABEL } from "@/content/eventaj/proof";
import { qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import { RedesignFaq } from "@/components/sections/eventaj/redesign/redesign-faq";

const shell = "ev-wrap";
const orderButton = "ev-btn ev-btn-primary";
const secondaryButton = "ev-btn ev-btn-ghost";

function PhoneShot({ alt, priority = false }: { alt: string; priority?: boolean }) {
  return (
    <div className="relative mx-auto aspect-[9/19] w-full max-w-[300px] overflow-hidden rounded-[34px] border-[9px] border-[var(--ev-night-3)] bg-white shadow-[0_38px_90px_-35px_rgba(0,0,0,0.8)] lg:max-w-[330px]">
      <Image
        src="/qr-galerija/screenshots/galerija-mobile.png"
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes="330px"
      />
    </div>
  );
}

function HeroFrame({
  eyebrow,
  title,
  description,
  actions,
  note,
  phoneAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions: React.ReactNode;
  note?: React.ReactNode;
  phoneAlt: string;
}) {
  return (
    <section className="ev-dark relative isolate overflow-hidden">
      <div className="ev-wrap grid items-center gap-14 pb-16 pt-32 md:pb-24 md:pt-40 lg:min-h-[min(100svh,1000px)] lg:grid-cols-12 lg:gap-10">
        <div className="ev-rise lg:col-span-7">
          <p className="mb-7 flex flex-wrap items-center gap-4 text-[19px] sm:text-[23px]">
            <a href="/qr-galerija#cena" className="ev-tag transition-transform hover:-translate-y-0.5">
              <small>Galerija</small> {qrGalleryPrice} €
            </a>
            <span className="flex items-center gap-2 text-[14px] text-[var(--ev-mist)]">
              <QrCode className="h-4 w-4" aria-hidden="true" />
              {eyebrow}
            </span>
          </p>
          <h1 className="ev-display max-w-[16ch] text-[clamp(40px,5.6vw,84px)] leading-[1.02]">{title}</h1>
          <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">{description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>
          {note}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <PhoneShot alt={phoneAlt} priority />
        </div>
      </div>
    </section>
  );
}

function GalleryHero({ useCase }: { useCase?: QrGalleryUseCase }) {
  return (
    <HeroFrame
      eyebrow={useCase?.eyebrow ?? "QR galerija za dogodke"}
      title={useCase?.title ?? "Vse fotografije gostov na enem mestu"}
      description={
        useCase?.description ??
        "Ena QR koda na mizah. Gostje skenirajo in naložijo fotografije, kratke videe in glasovna voščila. Brez aplikacije in brez registracije."
      }
      phoneAlt="Galerija dogodka Ana in Marko na telefonu"
      actions={
        <>
          <a href={qrGalleryOrderUrl} className={orderButton}>
            Ustvari galerijo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={qrGalleryDemoUrl} className="ev-link">
            Poglej demo galerijo
          </a>
        </>
      }
      note={
        <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[var(--ev-mist)]">
          <li>Postavitev v treh minutah</li>
          <li>Neomejeno gostov</li>
          <li>Galerija odprta 180 dni</li>
        </ul>
      }
    />
  );
}

function SectionHeading({
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-12 lg:items-end">
      <h2 className="ev-display ev-h2 lg:col-span-7">{title}</h2>
      {description ? (
        <p className="ev-lede text-[var(--ev-stone)] lg:col-span-4 lg:col-start-9">{description}</p>
      ) : null}
    </div>
  );
}

function ProofStrip() {
  return (
    <section className="border-b ev-rule">
      <div className="ev-wrap flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-5 text-center text-[14px] text-[var(--ev-stone)]">
        <span className="ev-tabular">
          {REVIEW_RATING_LABEL} ★ iz {REVIEW_COUNT} Google ocen
        </span>
        <span aria-hidden="true">·</span>
        <span>{EVENTS_DONE} izvedenih dogodkov</span>
        <span aria-hidden="true">·</span>
        <span>Photo Booth, 360° Booth in QR galerija</span>
      </div>
    </section>
  );
}

function GalleryProblem() {
  return (
    <section className="py-24 md:py-32">
      <div className={`${shell} max-w-5xl`}>
        <div className="ev-label ev-accent">
          Zakaj QR galerija
        </div>
        <h2 className="mt-5 max-w-4xl ev-display ev-h2">
          Fotograf ujame obred. Gostje ujamejo vse ostalo
        </h2>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--ev-stone)] md:text-xl">
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
      className="ev-blush-bg py-24 md:py-32"
    >
      <div className={shell}>
        <SectionHeading eyebrow="Trije koraki" title="Kako deluje" />
        <div className="grid border-l border-t border-[var(--ev-rule)] lg:grid-cols-3">
          {qrGallerySteps.map((step) => (
            <article
              key={step.number}
              className="flex min-h-[560px] flex-col overflow-hidden border-b border-r border-[var(--ev-rule)]"
            >
              <div className="p-7 md:p-9">
                <span className="text-xs font-semibold tracking-[0.18em] ev-accent">
                  {step.number}
                </span>
                <h3 className="mt-14 ev-display text-3xl leading-tight">
                  {step.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--ev-stone)]">
                  {step.description}
                </p>
              </div>
              <div className="relative mt-auto flex h-80 items-start justify-center overflow-hidden bg-[var(--ev-white)] pt-6">
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
    <section className="py-24 md:py-32">
      <div className={shell}>
        <SectionHeading
          eyebrow="Kje naj bo QR koda"
          title="Postavite jo tja, kjer jo gostje res vidijo."
          description="Isto kodo uporabite na več mestih. Večkrat ko jo gost opazi, večja je možnost, da bo dodal svoje fotografije."
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {qrGalleryPlacements.map((item) => (
            <article key={item.title}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ev-white)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                />
              </div>
              <h3 className="mt-5 ev-display text-2xl">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ev-stone)]">
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
    <section className="py-24 md:py-32">
      <div className={shell}>
        <SectionHeading eyebrow="Vključeno v ceno" title="Kaj je vključeno" />
        <div className="grid border-l border-t border-[var(--ev-rule)] md:grid-cols-2 lg:grid-cols-3">
          {qrGalleryFeatures.map(([title, description], index) => (
            <article
              key={title}
              className="min-h-72 border-b border-r border-[var(--ev-rule)] p-7 md:p-9"
            >
              <span className="text-xs font-semibold ev-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-12 ev-display text-3xl leading-tight">
                {title}
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--ev-stone)]">
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
    <section className="overflow-hidden ev-dark py-24 md:py-32">
      <div
        className={`${shell} grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20`}
      >
        <div>
          <div className="ev-label ev-accent">
            Živa projekcija
          </div>
          <h2 className="mt-5 ev-display ev-h2">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ev-mist)]">
            {description}
          </p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden border border-[var(--ev-rule-dark)] bg-black/25 shadow-2xl">
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
      className="ev-dark py-24 md:py-32"
    >
      <div className={shell}>
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="mb-4 ev-label ev-accent">
            Cena
          </div>
          <h2 className="ev-display ev-h2">
            Galerija dogodka, {qrGalleryPrice} € na dogodek
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--ev-mist)] md:text-lg">
            Enkratno plačilo. Brez naročnine in brez skritih doplačil.
          </p>
        </div>
        <div className="mx-auto max-w-4xl border border-[var(--ev-rule-dark)] p-7 md:p-10">
          <ul className="grid gap-4 md:grid-cols-2">
            {landingPriceItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 ev-accent"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 grid gap-6 border-t border-[var(--ev-rule-dark)] pt-8 md:grid-cols-2">
            <div>
              <h3 className="ev-display text-2xl">
                AI Best Photos, +15 €
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ev-mist)]">
                Do 3.000 fotografij. Izloči podvojene in tehnično neuspele
                posnetke, da vam ni treba pregledovati vsega ročno.
              </p>
            </div>
            <div>
              <h3 className="ev-display text-2xl">
                Neomejeni videi, +15 €
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ev-mist)]">
                Število videov ni omejeno. Veljajo pravila razumne uporabe.
              </p>
            </div>
          </div>
          <a
            href={qrGalleryOrderUrl}
            className="ev-btn ev-btn-primary mt-9"
          >
            Ustvari galerijo, {qrGalleryPrice} €{" "}
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
      className="ev-dark py-24 md:py-32"
    >
      <div className={shell}>
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="ev-label ev-accent">
              Cena
            </div>
            <h2 className="mt-5 ev-display text-[clamp(48px,6vw,76px)] leading-[0.98]">
              Enkratnih {qrGalleryPrice} €.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--ev-mist)]">
              En dogodek, ena cena. Brez naročnine in brez doplačila na gosta.
            </p>
            <a
              href={qrGalleryOrderUrl}
              className="ev-btn ev-btn-primary mt-auto"
            >
              Ustvari dogodek{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="border border-[var(--ev-rule-dark)] p-7 md:p-10">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-[var(--ev-rule-dark)] pb-8">
              <div>
                <div className="text-sm text-[var(--ev-mist)]">
                  Galerija dogodka
                </div>
                <div className="mt-2 ev-display text-6xl">
                  {qrGalleryPrice} €
                </div>
              </div>
              <div className="text-right text-sm text-[var(--ev-mist)]">
                z DDV
                <br />
                brez naročnine
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {included.map(([title]) => (
                <li key={title} className="flex items-center gap-3 text-sm">
                  <Check
                    className="h-4 w-4 shrink-0 ev-accent"
                    aria-hidden="true"
                  />{" "}
                  {title}
                </li>
              ))}
            </ul>
            <div className="mt-9 grid gap-3 border-t border-[var(--ev-rule-dark)] pt-7 text-sm text-[var(--ev-mist)] sm:grid-cols-2">
              <div>
                <span className="ev-accent">+15 €</span> AI Best Photos
              </div>
              <div>
                <span className="ev-accent">+15 €</span> neomejeno videov
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
    <section className="overflow-hidden border-b border-[var(--ev-rule)] bg-[var(--ev-white)] py-24 md:py-32">
      <div className={shell}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <div className="ev-label ev-accent">
              Brez aplikacije
            </div>
            <h2 className="mt-5 ev-display ev-h2">
              Gost od QR kode do nalaganja pride v nekaj sekundah.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ev-stone)]">
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
            <div className="absolute -bottom-8 right-[6%] h-[70%] w-[26%] overflow-hidden rounded-[22px] border-[6px] border-[var(--ev-night)] bg-white shadow-2xl">
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
    <section className="py-24 md:py-32">
      <div className={shell}>
        <SectionHeading eyebrow="Primeri uporabe" title="Za katere dogodke" />
        <div className="grid border-l border-t border-[var(--ev-rule)] md:grid-cols-2">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group min-h-64 border-b border-r border-[var(--ev-rule)] p-7 no-underline transition-colors hover:bg-[var(--ev-white)] md:p-9"
            >
              <span className="text-xs font-semibold ev-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-12 max-w-lg ev-display text-3xl leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 max-w-lg leading-relaxed text-[var(--ev-stone)]">
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
        <p className="mt-6 text-sm text-[var(--ev-stone)]">
          Tudi za{" "}
          <Link href="/qr-galerija/za-dogodke/praznovanja" className="underline underline-offset-4">
            praznovanja in obletnice
          </Link>{" "}
          ter{" "}
          <Link href="/qr-galerija/za-dogodke/konference-in-sejmi" className="underline underline-offset-4">
            konference in sejme
          </Link>
          .
        </p>
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
    <RedesignFaq
      items={items.map(([q, a]) => ({ q, a }))}
      moreLink={{ href: "/pogosta-vprasanja", label: "Vsa pogosta vprašanja" }}
    />
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="qr-final-title" className="ev-dark relative isolate overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src="/application/redesign-cta-bg.webp" alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,13,23,0.7)_0%,rgba(28,13,23,0.35)_60%,rgba(28,13,23,0.2)_100%)]" />
      </div>
      <div className="ev-wrap text-center">
        <h2 id="qr-final-title" className="ev-display mx-auto max-w-[18ch] text-[clamp(34px,4.8vw,72px)]">
          Postavi galerijo za <em>svoj dogodek</em>
        </h2>
        <p className="mx-auto mt-8 max-w-[48ch] text-[18px] leading-relaxed text-[var(--ev-porcelain)]/90">
          Tri minute za postavitev. 180 dni za spomine.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={qrGalleryOrderUrl} className={orderButton}>
            Ustvari galerijo, {qrGalleryPrice} €
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
      className="border-t border-[var(--ev-rule)] py-8"
    >
      <div
        className={`${shell} flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="underline decoration-[rgba(20,17,15,0.25)] underline-offset-4 hover:decoration-[var(--ev-night)]"
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
    <HeroFrame
      eyebrow={eyebrow}
      title={title}
      description={description}
      phoneAlt="QR galerija dogodka na telefonu"
      actions={
        <>
          <a href={qrGalleryOrderUrl} className={orderButton}>
            Ustvari galerijo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={secondaryHref} className="ev-link">
            {secondaryLabel}
          </a>
        </>
      }
    />
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
    <>
      <DetailHero
        eyebrow="QR galerija za poroko"
        title="Zberite poročne fotografije svojih gostov z eno QR kodo"
        description="Kodo postavite na mize, welcome tablo ali vabila. Gostje skenirajo in naložijo fotografije, kratke videe in glasovna voščila naravnost s telefona. Brez aplikacije in brez registracije."
        secondaryLabel="Poglej demo galerijo"
        secondaryHref={qrGalleryDemoUrl}
      />
      <section className="ev-blush-bg py-24 md:py-32">
        <div className={`${shell} max-w-5xl`}>
          <h2 className="max-w-4xl ev-display ev-h2">
            Fotograf odide ob polnoči. Zabava se takrat šele začne
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--ev-stone)]">
            Fotograf vam preda nekaj sto izbranih posnetkov obreda, pozdravov in
            prvega plesa. Vaših sto gostov jih naredi nekajkrat več. Najboljši
            obrazi pogosto nastanejo ob dveh zjutraj. Če fotografij ne zberete
            tisti večer, jih po treh tednih nima smisla več loviti.
          </p>
        </div>
      </section>
      <section className="py-24 md:py-32">
        <div className={shell}>
          <SectionHeading
            eyebrow="Poročna QR koda"
            title="Kam postaviti QR kodo"
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {placements.map(([title, description, imageSrc, alt]) => (
              <article key={title}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ev-white)]">
                  <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  />
                </div>
                <h3 className="mt-5 ev-display text-2xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ev-stone)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl border-l-2 border-[var(--ev-wine)] pl-6 text-lg leading-relaxed">
            Na stojalo napišite &ldquo;Naloži svoje fotografije z najine
            poroke&rdquo;. To pove več kot samo &ldquo;Skeniraj QR kodo&rdquo;.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[var(--ev-stone)]">
            Kodo lahko vključite na <Link href="/oprema-za-dogodke/tabla-dobrodoslice" className="underline underline-offset-4">tablo dobrodošlice</Link> ali jo postavite ob <Link href="/oprema-za-dogodke/stevilke-miz" className="underline underline-offset-4">številke miz</Link>, kjer jo gostje opazijo tudi med večerjo.
          </p>
        </div>
      </section>
      <section className="border-y border-[var(--ev-rule)] bg-[var(--ev-white)] py-24 md:py-32">
        <div
          className={`${shell} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}
        >
          <div>
            <div className="ev-label ev-accent">
              Glasovna knjiga
            </div>
            <h2 className="mt-5 ev-display ev-h2">
              Voščila, ki jih slišite, ne preberete
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ev-stone)]">
              Gost lahko namesto zapisa v knjigo gostov posname do dve minuti
              glasu. Babičin nasvet, prijateljevo neprimerno šalo ali otroka, ki
              komaj govori. Posnetki ostanejo v galeriji poleg fotografij in jih
              prenesete skupaj z njimi.
            </p>
          </div>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[30px] border-[9px] border-[var(--ev-night)] bg-white shadow-2xl">
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
      <section className="py-24 md:py-32">
        <div className={shell}>
          <SectionHeading
            eyebrow="Po poroki"
            title="Kaj dobite naslednji dan"
          />
          <div className="grid border-l border-t border-[var(--ev-rule)] md:grid-cols-3">
            {[
              "Galerijo s fotografijami, videi in glasovnimi voščili, odprto 180 dni",
              "ZIP z originali na e-pošto, brez stiskanja",
              "Povezavo, ki jo lahko delite s starši in pričami",
            ].map((item, index) => (
              <article
                key={item}
                className="min-h-56 border-b border-r border-[var(--ev-rule)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold ev-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-12 ev-display text-2xl leading-snug">
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
        <div className="mx-auto max-w-5xl border border-[var(--ev-rule)] p-8 text-center md:p-12">
          <h2 className="ev-display text-4xl">
            Se še odločate?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[var(--ev-stone)]">
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
      <FinalCta />
      <RelatedLinks
        links={[
          { href: "/qr-galerija", label: "QR galerija za dogodke" },
          { href: "/photo-booth", label: "Photo Booth za poroko" },
        ]}
      />
    </>
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
    <>
      <DetailHero
        eyebrow="Foto galerija za poslovni dogodek"
        title="Fotografije udeležencev z vašega dogodka na enem mestu"
        description="Ena QR koda na mizah, badgeih ali roll-upu. Udeleženci naložijo fotografije in kratke videe brez aplikacije in brez registracije."
        secondaryLabel="Pošlji povpraševanje za več dogodkov"
        secondaryHref="mailto:info@eventaj.si?subject=QR%20galerija%20za%20več%20dogodkov"
      />
      <section className="ev-blush-bg py-24 md:py-32">
        <div className={`${shell} max-w-5xl`}>
          <div className="ev-label ev-accent">
            Za marketing po dogodku
          </div>
          <h2 className="mt-5 max-w-4xl ev-display ev-h2">
            Vsebina, ki je fotograf ne posname
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--ev-stone)]">
            Najeti fotograf posname oder, panel in skupinsko sliko. Za omrežja
            pa potrebujete obraze ljudi med odmorom, reakcije v dvorani in
            posnetke iz prve roke. Po vsakem dogodku jih je na telefonih
            udeležencev na stotine. QR galerija jih z njihovim dovoljenjem zbere
            pri vas in ohrani originalno kakovost.
          </p>
        </div>
      </section>
      <section className="py-24 md:py-32">
        <div className={shell}>
          <SectionHeading eyebrow="Primeri" title="Kje to deluje" />
          <div className="grid border-l border-t border-[var(--ev-rule)] md:grid-cols-3">
            {scenarios.map(([title, description], index) => (
              <article
                key={title}
                className="min-h-72 border-b border-r border-[var(--ev-rule)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold ev-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-12 ev-display text-3xl">
                  {title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--ev-stone)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[var(--ev-white)] py-24 md:py-32">
        <div
          className={`${shell} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}
        >
          <div>
            <div className="ev-label ev-accent">
              Zasebnost
            </div>
            <h2 className="mt-5 ev-display ev-h2">
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
                    className="mt-1 h-4 w-4 shrink-0 ev-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-l-2 border-[var(--ev-wine)] pl-5 text-sm leading-relaxed text-[var(--ev-stone)]">
              Udeležence na kodi ali v vabilu obvestite, kam gredo posnetki in
              kdo jih bo videl. Organizator lahko posamezno vsebino v
              administraciji tudi skrije ali odstrani.
            </p>
          </div>
        </div>
      </section>
      <section className="ev-dark py-24 md:py-32">
        <div
          className={`${shell} grid gap-px bg-[var(--ev-rule-dark)] md:grid-cols-2`}
        >
          <article className="flex min-h-96 flex-col bg-[var(--ev-night)] p-8 md:p-10">
            <div className="ev-label ev-accent">
              Posamezen dogodek
            </div>
            <h2 className="mt-6 ev-display text-5xl">
              En dogodek, {qrGalleryPrice} €
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--ev-mist)]">
              Vse vključeno, brez naročnine. Enako kot pri zasebnih dogodkih.
            </p>
            <a
              href={qrGalleryOrderUrl}
              className="ev-btn ev-btn-primary mt-auto"
            >
              Ustvari en dogodek, {qrGalleryPrice} €
            </a>
          </article>
          <article className="flex min-h-96 flex-col bg-[var(--ev-night)] p-8 md:p-10">
            <div className="ev-label ev-accent">
              Paket
            </div>
            <h2 className="mt-6 ev-display text-5xl">
              Več dogodkov na leto
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--ev-mist)]">
              Pripravimo paket in po dogovoru prevzamemo postavitev, tisk stojal
              ter projekcijo na kraju samem. Pošljite nam število dogodkov in
              okvirne termine.
            </p>
            <a
              href="mailto:info@eventaj.si?subject=QR%20galerija%20za%20več%20dogodkov"
              className="ev-btn ev-btn-primary mt-auto"
            >
              Pošlji povpraševanje
            </a>
          </article>
        </div>
      </section>
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl border border-[var(--ev-rule)] p-8 text-center md:p-12">
          <h2 className="ev-display text-4xl">
            QR galerija in Photo Booth se dopolnjujeta
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-[var(--ev-stone)]">
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
      <FinalCta />
      <RelatedLinks
        links={[
          { href: "/qr-galerija", label: "QR galerija za dogodke" },
          { href: "/oprema-za-dogodke", label: "Oprema za dogodke" },
          { href: "/cenik", label: "Cenik" },
        ]}
      />
    </>
  );
}

export function QrGalleryLandingPage() {
  return (
    <>
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
    </>
  );
}

export function QrGalleryFeaturesPage() {
  return (
    <>
      <HeroFrame
        eyebrow="Funkcije QR galerije"
        title="Vse, kar potrebuješ za fotografije gostov"
        description="Gostom ostane kratek in jasen postopek. Ti dobiš nadzor, prikaz v živo in prenos vseh izvirnikov."
        phoneAlt="QR galerija dogodka na telefonu"
        actions={
          <>
            <a href={qrGalleryOrderUrl} className={orderButton}>
              Ustvari galerijo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={qrGalleryDemoUrl} className="ev-link">
              Poglej demo galerijo
            </a>
          </>
        }
      />
      <section className="ev-blush-bg py-24 md:py-32">
        <div className={shell}>
          <div className="grid border-l border-t border-[var(--ev-rule)] md:grid-cols-2 lg:grid-cols-3">
            {qrGalleryFeatures.map(([title, description], index) => (
              <article
                key={title}
                className="min-h-64 border-b border-r border-[var(--ev-rule)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold ev-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-14 ev-display text-3xl">
                  {title}
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--ev-stone)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32">
        <div className={`${shell} grid gap-10 lg:grid-cols-2`}>
          <article>
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--ev-white)]">
              <Image
                src="/qr-galerija/screenshots/live-slideshow.png"
                alt="Live Slideshow fotografij na velikem zaslonu"
                fill
                className="object-contain"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
            <h2 className="mt-7 ev-display text-4xl">
              Fotografije na zaslonu med dogodkom
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--ev-stone)]">
              Live Slideshow sproti pokaže odobrene fotografije. Odprete ga na
              računalniku, povezanem s televizorjem ali projektorjem.
            </p>
          </article>
          <article>
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--ev-white)]">
              <Image
                src="/qr-galerija/screenshots/email-qr.png"
                alt="E-pošta s povezavo za nastavitev in QR kodo"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
            <h2 className="mt-7 ev-display text-4xl">
              Nastavitev brez novega računa
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--ev-stone)]">
              Po plačilu prejmete zasebno povezavo za ureditev dogodka. Tam
              prenesete QR kodo, upravljate fotografije in pripravite ZIP.
            </p>
          </article>
        </div>
      </section>
      <Faq />
      <FinalCta />
    </>
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
    <>
      <GalleryHero useCase={useCase} />
      <HowItWorks />
      <PlacementGrid />
      <section className="ev-blush-bg py-24 md:py-32">
        <div className={shell}>
          <SectionHeading
            eyebrow="Za ta dogodek"
            title="Kaj boste imeli pripravljeno."
          />
          <div className="grid gap-px bg-[var(--ev-rule)] md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <article
                key={benefit}
                className="min-h-48 bg-[var(--ev-porcelain)] p-7 md:p-9"
              >
                <span className="text-xs font-semibold ev-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-12 max-w-lg ev-display text-2xl leading-snug">
                  {benefit}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {useCase.occasions.map((occasion) => (
              <span
                key={occasion}
                className="rounded-full border border-[var(--ev-rule)] px-5 py-2.5 text-sm"
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
    </>
  );
}
