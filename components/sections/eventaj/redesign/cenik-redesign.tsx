import { addons, booth360Packages, photoPackages } from "@/content/eventaj/data";
import { photoBoothQrGalleryPrice, qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import Link from "next/link";
import { ClientMarquee } from "./client-marquee";
import { PriceBoard } from "./price-board";
import { RedesignFaq } from "./redesign-faq";
import { RedesignClosing } from "./redesign-footer";
import { RedesignReviews } from "./redesign-reviews";
import { PackageCards, QrGalleryUpsell, SectionHead } from "./service-sections";

const photoFrom = photoPackages[0].price;
const booth360From = booth360Packages[0].price;

function Intro({ h1 }: { h1: string }) {
  return (
    <section className="ev-dark pb-20 pt-36 md:pb-28 md:pt-48">
      <div className="ev-wrap ev-rise">
        <h1 className="sr-only">{h1}</h1>
        <p className="mb-8 flex flex-wrap gap-3 text-[19px] sm:text-[23px]">
          <a href="#cenik" className="ev-tag transition-transform hover:-translate-y-0.5">
            <small>Photo Booth od</small> {photoFrom} €
          </a>
          <a href="#cenik-360" className="ev-tag ev-tag-berry transition-transform hover:-translate-y-0.5">
            <small>360° Booth od</small> {booth360From} €
          </a>
        </p>
        <p aria-hidden="true" className="ev-display max-w-[18ch] text-[clamp(42px,6vw,88px)] leading-[1.02]">
          Za dogodke, ki ostanejo <em>v spominu</em>
        </p>
        <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">
          Izberi enega od pripravljenih paketov ali pa si ceno sestavi sam. Brez skritih stroškov,
          prevoz uskladimo glede na lokacijo.
        </p>
        <nav aria-label="Cenik" className="mt-10 flex flex-wrap gap-3">
          {[
            ["#cenik", "Photo Booth"],
            ["#cenik-360", "360° Booth"],
            ["#qr-galerija", "QR galerija"],
            ["#cenik-po-meri", "Sestavi ponudbo"],
            ["#dodatki", "Dodatki"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="ev-btn ev-btn-ghost min-h-[44px] px-5">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

function Addons() {
  return (
    <section id="dodatki" aria-labelledby="cenik-addons-title" className="border-t ev-rule py-24 md:py-36">
      <div className="ev-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 id="cenik-addons-title" className="ev-display ev-h2">
            Dodatki <em>po meri</em>
          </h2>
          <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">
            Dodaš jih v povpraševanju, končno ceno potrdimo v ponudbi.
          </p>
        </div>
        <dl className="border-t border-[var(--ev-night)] lg:col-span-7 lg:col-start-6">
          {addons.map((row) => (
            <div key={row.item} className="flex flex-col justify-between gap-1 border-b ev-rule py-5 sm:flex-row sm:items-baseline sm:gap-8">
              <dt className="text-[16px]">{row.item}</dt>
              <dd className="ev-display ev-price ev-tabular shrink-0 text-[20px]">{row.price}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CenikRedesignPage({ h1 }: { h1: string }) {
  return (
    <>
      <Intro h1={h1} />
      <section id="cenik" aria-labelledby="cenik-photo-title" className="ev-blush-bg py-24 md:py-36">
        <div className="ev-wrap">
          <SectionHead
            id="cenik-photo-title"
            title={
              <>
                Photo Booth s <em>takojšnjim tiskom</em>
              </>
            }
            lede="Neomejeno fotografij in tiska, rekviziti, personaliziran okvir in naša ekipa ves čas dogodka."
          />
          <PackageCards packages={photoPackages} type="Photo Booth" qrPrice={photoBoothQrGalleryPrice} />
          <Link href="/photo-booth" className="ev-link mt-10">
            Vse o Photo Boothu
          </Link>
        </div>
      </section>
      <section id="cenik-360" aria-labelledby="cenik-360-title" className="py-24 md:py-36">
        <div className="ev-wrap">
          <SectionHead
            id="cenik-360-title"
            title={
              <>
                360° Booth za <em>slow-motion</em> videe
              </>
            }
            lede="Gostje dobijo video v nekaj sekundah prek QR kode ali AirDropa, ti pa vse posnetke v zasebni galeriji."
          />
          <PackageCards packages={booth360Packages} type="360° Booth" qrPrice={qrGalleryPrice} />
          <Link href="/360-photo-booth" className="ev-link mt-10">
            Vse o 360° Boothu
          </Link>
        </div>
      </section>
      <div id="qr-galerija">
        <QrGalleryUpsell
          id="cenik-qr-title"
          type="Photo Booth"
          basePrice={photoFrom}
          qrPrice={photoBoothQrGalleryPrice}
          title={
            <>
              QR galerija za vse utrinke <em>gostov</em>
            </>
          }
        />
      </div>
      <PriceBoard />
      <Addons />
      <ClientMarquee />
      <RedesignReviews />
      <RedesignFaq />
      <RedesignClosing />
    </>
  );
}
