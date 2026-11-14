import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Storitve",
    links: [
      ["Photo Booth", "/photo-booth"],
      ["360° Booth", "/360-photo-booth"],
      ["QR Galerija", "/qr-galerija"],
      ["Fotografiranje dogodkov", "/fotografiranje-dogodkov"],
      ["Oprema za dogodke", "/oprema-za-dogodke"],
      ["Cenik", "/cenik"],
      ["Reference", "/#reference"],
    ],
  },
  {
    title: "Podjetje",
    links: [
      ["Nasveti", "/nasveti"],
      ["Pogosta vprašanja", "/pogosta-vprasanja"],
      ["Zasebnost", "/zasebnost"],
      ["Pogoji uporabe", "/pogoji-uporabe"],
    ],
  },
] as const;

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/eventaj.si/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61567672817538", Icon: FacebookIcon },
] as const;

/** `formal` switches the copy to vikanje; `type` preselects the service in the inquiry dialog. */
export function RedesignClosing({ formal = false, type }: { formal?: boolean; type?: string } = {}) {
  return (
    <section aria-labelledby="ev-closing-title" className="ev-dark relative isolate overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image src="/application/redesign-cta-bg.webp" alt="" fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,13,23,0.7)_0%,rgba(28,13,23,0.35)_60%,rgba(28,13,23,0.2)_100%)]" />
      </div>
      <div className="ev-wrap text-center">
        <h2 id="ev-closing-title" className="ev-display mx-auto max-w-[18ch] text-[clamp(34px,4.8vw,72px)]">
          Naj bo {formal ? "vaš" : "tvoj"} dogodek tisti, o katerem <em>govorijo še dolgo</em>
        </h2>
        <p className="mx-auto mt-8 max-w-[48ch] text-[18px] leading-relaxed text-[var(--ev-porcelain)]/90">
          {formal
            ? "Pošljite povpraševanje in v 24 urah prejmete ponudbo, prilagojeno vašemu dogodku."
            : "Pošlji povpraševanje in v 24 urah prejmeš ponudbo, prilagojeno tvojemu dogodku."}
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <InquiryTrigger defaults={type ? { type } : undefined} className="ev-btn ev-btn-primary">
            {formal ? "Pošljite povpraševanje" : "Pošlji povpraševanje"}
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </InquiryTrigger>
          <a href="tel:+38631285143" className="ev-btn ev-btn-ghost">
            <Phone aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            {formal ? "Pokličite" : "Pokliči"} 031 285 143
          </a>
        </div>
      </div>
    </section>
  );
}

export function RedesignFooter() {
  return (
    <footer className="ev-dark border-t border-[var(--ev-rule-dark)] pb-10 pt-20 md:pt-24">
      <div className="ev-wrap">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3" aria-label="Eventaj.si, domov">
              <Image src="/application/logo.svg" alt="" width={48} height={48} className="h-12 w-12" />
              <span className="ev-display text-[28px] leading-none">Eventaj.si</span>
            </Link>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-[var(--ev-mist)]">
              Photo Booth, 360° Booth in izbrana oprema za poroke, poslovne dogodke ter zasebne zabave
              po vsej Sloveniji.
            </p>
            <ul className="mt-7 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center border border-[var(--ev-rule-dark)] transition-colors hover:border-[var(--ev-porcelain)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="mb-5 text-[12px] uppercase tracking-[0.14em] text-[var(--ev-mist)]">{column.title}</h2>
              <ul className="grid gap-3 text-[15px]">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="transition-opacity hover:opacity-70">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="mb-5 text-[12px] uppercase tracking-[0.14em] text-[var(--ev-mist)]">Kontakt</h2>
            <address className="grid gap-3 text-[15px] not-italic">
              <a href="tel:+38631285143" className="transition-opacity hover:opacity-70">+386 31 285 143</a>
              <a href="mailto:info@eventaj.si" className="transition-opacity hover:opacity-70">info@eventaj.si</a>
              <span className="mt-2 text-[var(--ev-mist)]">
                Slomškova ulica 1<br />2230 Lenart, Slovenija
              </span>
            </address>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-[var(--ev-rule-dark)] pt-6 text-[13px] text-[var(--ev-mist)] md:flex-row">
          <span>© 2026 Orbtio. Vse pravice pridržane.</span>
          <span>Narejeno s srcem v Sloveniji.</span>
        </div>
      </div>
    </footer>
  );
}
