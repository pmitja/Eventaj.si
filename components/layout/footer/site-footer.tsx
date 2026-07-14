import { FooterCta } from "./footer-cta";
import { FooterColumn } from "./footer-column";
import { FooterSocials } from "./footer-socials";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]">
      <FooterCta />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-14">
          <div>
            <div className="mb-5 flex items-baseline gap-2">
              <span className="font-serif-display text-[32px]">Eventaj</span>
              <span className="font-serif-italic italic opacity-60">.si</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--eventaj-cream)] opacity-65">
              Photo Booth, 360° Booth in izbrana oprema za poroke, poslovne
              dogodke ter zasebne zabave po vsej Sloveniji.
            </p>
          </div>
          <FooterColumn
            title="Storitve"
            links={[
              ["Photo Booth", "/photo-booth"],
              ["360° Booth", "/360-photo-booth"],
              ["Oprema za dogodke", "/oprema-za-dogodke"],
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
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--eventaj-cream)] opacity-50">
              Kontakt
            </div>
            <div className="grid gap-2 text-sm text-[var(--eventaj-cream)] opacity-85">
              <a href="tel:+38631285143" className="no-underline">
                +386 31 285 143
              </a>
              <a href="mailto:info@eventaj.si" className="no-underline">
                info@eventaj.si
              </a>
              <span className="mt-2 opacity-70">
                Slomškova ulica 1<br />2230 Lenart, Slovenija
              </span>
            </div>
            <FooterSocials />
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
