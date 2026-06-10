"use client";

import { eventajNav, trustedNames } from "@/content/eventaj/data";
import Logo from "@/components/logo";
import { SlovenianDatePicker } from "@/components/ui/slovenian-date-picker";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useState } from "react";

export function openInquiryDialog() {
  window.dispatchEvent(new CustomEvent("eventaj:open-inquiry"));
}

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const open = () => setInquiryOpen(true);
    window.addEventListener("eventaj:open-inquiry", open);
    return () => window.removeEventListener("eventaj:open-inquiry", open);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="eventaj-redesign min-h-screen bg-[var(--eventaj-paper)] text-[var(--eventaj-ink)]">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          aria-label="Glavna navigacija"
          className={cn(
            "flex items-center justify-between px-5 transition-all duration-300 md:px-10",
            scrolled || menuOpen
              ? "border-b border-[rgba(20,17,15,0.08)] bg-[rgba(251,248,242,0.92)] py-3 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent py-5 md:py-6"
          )}
        >
          <Link
            href="/"
            className="flex items-center text-[var(--eventaj-ink)] no-underline [&_svg]:h-8 [&_svg]:w-auto md:[&_svg]:h-10"
            aria-label="Eventaj.si domov"
          >
            <Logo />
          </Link>

          <div className="hidden items-center gap-8 text-sm lg:flex">
            {eventajNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-medium text-[var(--eventaj-ink)] opacity-85 transition-opacity hover:opacity-100",
                    active && "opacity-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+38631285143"
              className="text-[13px] tracking-[0.02em] text-[var(--eventaj-ink)] tabular-nums no-underline"
            >
              031 285 143
            </a>
            <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-5 py-3 text-[13px] font-medium tracking-[0.02em] text-[var(--eventaj-paper)] transition-colors hover:bg-[var(--eventaj-accent)]">
              Pridobi ponudbo →
            </InquiryTrigger>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(20,17,15,0.15)] text-[var(--eventaj-ink)] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Zapri meni" : "Odpri meni"}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">{menuOpen ? "Zapri meni" : "Odpri meni"}</span>
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-5 bg-current transition-transform",
                  menuOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2 h-px w-5 bg-current transition-opacity",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-5 bg-current transition-transform",
                  menuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </span>
          </button>
        </nav>

        {menuOpen && (
          <div className="border-b border-[rgba(20,17,15,0.08)] bg-[rgba(251,248,242,0.98)] px-5 pb-6 pt-2 shadow-2xl shadow-black/10 backdrop-blur-xl lg:hidden">
            <div className="grid gap-1">
              {eventajNav.map((item) => (
                <Link key={item.href} href={item.href} className="border-b border-[rgba(20,17,15,0.08)] py-4 font-serif-display text-2xl">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a href="tel:+38631285143" className="rounded-full border border-[rgba(20,17,15,0.18)] px-5 py-4 text-center font-medium">
                Pokliči 031 285 143
              </a>
              <InquiryTrigger className="rounded-full bg-[var(--eventaj-ink)] px-5 py-4 text-center font-medium text-[var(--eventaj-paper)]">
                Pridobi ponudbo →
              </InquiryTrigger>
            </div>
          </div>
        )}
      </header>

      {children}

      <Footer />
      <StickyCTA />
      <InquiryDialog open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}

export function InquiryTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={openInquiryDialog}>
      {children}
    </button>
  );
}

function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 transition-all duration-300 md:bottom-7 md:right-7",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
      )}
    >
      <InquiryTrigger className="flex items-center gap-3 rounded-full bg-[var(--eventaj-ink)] px-5 py-4 text-sm font-medium text-[var(--eventaj-paper)] shadow-[0_20px_50px_-10px_rgba(20,17,15,0.5)] transition-colors hover:bg-[var(--eventaj-accent)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#E8B584]" />
        Pridobi ponudbo →
      </InquiryTrigger>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]">
      <div className="relative overflow-hidden border-b border-[rgba(244,239,230,0.12)] px-5 py-24 text-center md:px-10 md:py-32">
        <div className="absolute inset-0 bg-[url('/application/cta-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[rgba(20,17,15,0.78)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--eventaj-ink)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--eventaj-ink)] to-transparent" />
        <div className="relative z-10 mx-auto max-w-[880px]">
          <div className="mb-6 font-serif-italic text-xl italic text-[#E8B584]">Pripravljeni?</div>
          <h2 className="font-serif-display text-[clamp(48px,7vw,96px)] font-[350] leading-[0.95] text-balance">
            Naj bo tvoj dogodek <em className="font-serif-italic italic text-[#E8B584]">tisti</em>, o katerem govorijo še dolgo.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--eventaj-cream)] opacity-75">
            Pošlji povpraševanje in v 24 urah prejmeš ponudbo, prilagojeno tvojemu dogodku.
          </p>
          <div className="mt-11 flex flex-wrap justify-center gap-3">
            <InquiryTrigger className="rounded-full bg-[var(--eventaj-paper)] px-8 py-5 text-[15px] font-medium text-[var(--eventaj-ink)] transition-colors hover:bg-[#E8B584]">
              Pošlji povpraševanje
            </InquiryTrigger>
            <a
              href="tel:+38631285143"
              className="inline-flex items-center gap-3 rounded-full border border-[rgba(244,239,230,0.3)] px-8 py-5 text-[15px] font-medium text-[var(--eventaj-paper)] no-underline transition-colors hover:border-[var(--eventaj-paper)]"
            >
              <span className="text-[13px] opacity-60">Pokliči</span>
              031 285 143
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-14">
          <div>
            <div className="mb-5 flex items-baseline gap-2">
              <span className="font-serif-display text-[32px]">Eventaj</span>
              <span className="font-serif-italic italic opacity-60">.si</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--eventaj-cream)] opacity-65">
              Najem Photo Bootha in 360° Bootha za poroke, poslovne dogodke in zasebne zabave po vsej Sloveniji.
            </p>
          </div>
          <FooterColumn
            title="Storitve"
            links={[
              ["Photo Booth", "/photo-booth"],
              ["360° Booth", "/360-photo-booth"],
              ["Cenik", "/cenik"],
              ["Reference", "/#reference"],
            ]}
          />
          <FooterColumn
            title="Podjetje"
            links={[
              ["FAQ", "/#faq"],
              ["Zasebnost", "/zasebnost"],
              ["Pogoji uporabe", "/pogoji-uporabe"],
            ]}
          />
          <div>
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-cream)] opacity-50">Kontakt</div>
            <div className="grid gap-2 text-sm text-[var(--eventaj-cream)] opacity-85">
              <a href="tel:+38631285143" className="no-underline">+386 31 285 143</a>
              <a href="mailto:info@eventaj.si" className="no-underline">info@eventaj.si</a>
              <span className="mt-2 opacity-70">Slomškova ulica 1<br />2230 Lenart, Slovenija</span>
            </div>
            <div className="mt-5 flex gap-2.5">
              {["IG", "FB", "TT"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(244,239,230,0.2)] text-[11px] tracking-[0.05em] no-underline transition-colors hover:bg-[rgba(244,239,230,0.1)]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-[rgba(244,239,230,0.12)] pt-6 text-xs text-[var(--eventaj-cream)] opacity-50 md:flex-row">
          <span>© 2026 MIPA Solutions. Vse pravice pridržane.</span>
          <span className="font-serif-italic italic">Made with care in Slovenia.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-cream)] opacity-50">{title}</div>
      <div className="grid gap-2.5">
        {links.map(([label, href]) => (
          <Link key={label} href={href} className="text-sm text-[var(--eventaj-cream)] opacity-85 no-underline transition-opacity hover:opacity-100">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

type InquiryData = {
  type: string;
  eventType: string;
  date: string;
  location: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const initialInquiryData: InquiryData = {
  type: "",
  eventType: "",
  date: "",
  location: "",
  guests: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function InquiryDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InquiryData>(initialInquiryData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitted(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const update = (key: keyof InquiryData, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const canNext = () => {
    if (step === 1) return Boolean(data.type && data.eventType);
    if (step === 2) return Boolean(data.date && data.location);
    return Boolean(data.name && data.email && data.phone);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canNext()) return;
    if (step < 3) {
      setStep((value) => value + 1);
      return;
    }

    try {
      setLoading(true);
      const serviceType = data.type === "360° Booth" ? "360" : data.type === "Oba" ? "both" : "basic";
      const totalPrice = serviceType === "360" ? 299 : serviceType === "basic" ? 279 : 0;
      const hours = serviceType === "360" || serviceType === "basic" ? "2" : "po meri";
      const message = [
        data.notes,
        data.eventType ? `Tip dogodka: ${data.eventType}` : "",
        data.guests ? `Število gostov: ${data.guests}` : "",
        data.type === "Oba" ? "Storitev: Photo Booth + 360° Booth po meri" : "",
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: {
            type: serviceType,
            hours,
            name: data.name,
            email: data.email,
            phone: data.phone,
            location: data.location,
            date: data.date,
            message,
            eventType: data.eventType,
            guests: data.guests,
          },
          totalPrice,
        }),
      });

      if (!response.ok) throw new Error("Pošiljanje ni uspelo");
      setSubmitted(true);
    } catch {
      setError("Pri pošiljanju je prišlo do napake. Poskusite ponovno ali nas pokličite.");
    } finally {
      setLoading(false);
    }
  };

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
            <div className="mb-4 font-serif-italic text-lg italic text-[var(--eventaj-accent)]">Hvala!</div>
            <h3 id="inquiry-title" className="font-serif-display text-4xl font-[350] leading-tight md:text-[44px]">
              Tvoja ponudba je <em className="font-serif-italic italic">na poti</em>.
            </h3>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-[var(--eventaj-ink-2)]">
              Personalizirano ponudbo prejmeš na <strong>{data.email}</strong> v naslednjih 24 urah.
            </p>
            <button type="button" onClick={onClose} className="mt-8 rounded-full bg-[var(--eventaj-ink)] px-8 py-4 text-sm font-medium text-[var(--eventaj-paper)]">
              Zapri
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">Korak {step} od 3</div>
            <h3 id="inquiry-title" className="font-serif-display text-4xl font-normal leading-tight">
              {step === 1 && <>Pridobi <em className="font-serif-italic italic">ponudbo</em> za svoj dogodek</>}
              {step === 2 && <>Kdaj in <em className="font-serif-italic italic">kje</em> bo dogodek?</>}
              {step === 3 && <>Tvoji <em className="font-serif-italic italic">kontaktni</em> podatki</>}
            </h3>
            <p className="mb-8 mt-2 text-sm text-[var(--eventaj-muted)]">
              {step === 1 && "V nekaj korakih zberemo informacije za pripravo ponudbe."}
              {step === 2 && "Preverimo razpoložljivost termina in pripravimo okvirno ponudbo."}
              {step === 3 && "V 24 urah prejmeš ponudbo, prilagojeno tvojemu dogodku."}
            </p>

            <div className="mb-8 flex gap-1.5">
              {[1, 2, 3].map((item) => (
                <div key={item} className={cn("h-[3px] flex-1 transition-colors", item <= step ? "bg-[var(--eventaj-ink)]" : "bg-[rgba(20,17,15,0.15)]")} />
              ))}
            </div>

            {step === 1 && (
              <div className="grid gap-6">
                <Field label="Izberi storitev">
                  <PillGrid columns="md:grid-cols-3" items={["Photo Booth", "360° Booth", "Oba"]} value={data.type} onChange={(value) => update("type", value)} />
                </Field>
                <Field label="Tip dogodka">
                  <PillGrid
                    columns="md:grid-cols-2"
                    items={["Poroka", "Poslovni dogodek", "Rojstni dan", "Zasebna zabava", "Maturantski ples", "Drugi dogodek"]}
                    value={data.eventType}
                    onChange={(value) => update("eventType", value)}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6">
                <Field label="Datum dogodka">
                  <SlovenianDatePicker value={data.date} onChange={(value) => update("date", value)} required />
                </Field>
                <Field label="Kraj dogodka">
                  <input type="text" placeholder="npr. Ljubljana" value={data.location} onChange={(event) => update("location", event.target.value)} className="eventaj-input" required />
                </Field>
                <Field label="Predvideno število gostov (opcijsko)">
                  <PillGrid columns="grid-cols-2 md:grid-cols-4" items={["<50", "50-100", "100-200", "200+"]} value={data.guests} onChange={(value) => update("guests", value)} />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-6">
                <Field label="Ime in priimek">
                  <input type="text" value={data.name} onChange={(event) => update("name", event.target.value)} className="eventaj-input" required />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="E-pošta">
                    <input type="email" value={data.email} onChange={(event) => update("email", event.target.value)} className="eventaj-input" required />
                  </Field>
                  <Field label="Telefon">
                    <input type="tel" value={data.phone} onChange={(event) => update("phone", event.target.value)} className="eventaj-input" required />
                  </Field>
                </div>
                <Field label="Dodatne informacije (opcijsko)">
                  <textarea rows={3} placeholder="Npr. želena postavitev, personalizacija, dodatne ure ali posebne želje." value={data.notes} onChange={(event) => update("notes", event.target.value)} className="eventaj-input resize-y" />
                </Field>
              </div>
            )}

            {error && <p className="mt-5 text-sm text-red-700">{error}</p>}

            <div className="mt-9 flex items-center justify-between border-t border-[rgba(20,17,15,0.1)] pt-7">
              <button
                type="button"
                onClick={() => (step > 1 ? setStep((value) => value - 1) : onClose())}
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="block">
      <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">{label}</span>
      {children}
    </div>
  );
}

function PillGrid({
  items,
  value,
  onChange,
  columns,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  columns: string;
}) {
  return (
    <div className={cn("grid gap-2", columns)}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            "border px-4 py-3.5 text-center text-[13px] font-medium transition-colors",
            value === item
              ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]"
              : "border-[rgba(20,17,15,0.15)] bg-transparent text-[var(--eventaj-ink)] hover:border-[var(--eventaj-ink)]"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function TrustLogosText() {
  return (
    <div className="mt-24 border-t border-[rgba(20,17,15,0.1)] pt-14">
      <div className="mb-7 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">Zaupajo nam</div>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
        {trustedNames.map((name) => (
          <span key={name} className="font-serif-display text-[22px] font-normal tracking-[0.02em] text-[var(--eventaj-ink)] opacity-50">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
