import { ArrowRight, ArrowUpRight, QrCode, Smartphone, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const galleryFeatures = [
  { icon: QrCode, label: "Dostop prek QR kode" },
  { icon: Smartphone, label: "Brez aplikacije in registracije" },
  { icon: Users, label: "Neomejeno število gostov" },
] as const;

const demoPhotos = [
  {
    src: "https://galerija.eventaj.si/gallery/ana-marko/photo-5.jpg",
    alt: "Fotografija gostov iz demo galerije dogodka",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://galerija.eventaj.si/gallery/ana-marko/photo-7.jpg",
    alt: "Skupinska fotografija iz demo galerije dogodka",
    className: "",
  },
  {
    src: "https://galerija.eventaj.si/gallery/ana-marko/photo-6.jpg",
    alt: "Spontana fotografija gosta iz demo galerije dogodka",
    className: "",
  },
] as const;

export function RedesignQrGallery() {
  return (
    <section aria-labelledby="ev-qr-title" className="ev-dark py-24 md:py-36">
      <div className="ev-wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="ev-qr-title" className="ev-display ev-h2">
            Vse fotografije gostov. <em>Na enem mestu.</em>
          </h2>
          <p className="ev-lede mt-7 text-[var(--ev-mist)]">
            <span className="ev-badge">Novo</span> Eventaj QR Galerija. Gostje skenirajo QR kodo in sproti dodajajo svoje fotografije v skupno zasebno
            galerijo, brez nameščanja aplikacije in brez registracije.
          </p>
          <ul className="mt-8 grid border-t ev-rule">
            {galleryFeatures.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 border-b ev-rule py-3.5 text-[16px]">
                <Icon aria-hidden="true" strokeWidth={1.5} className="ev-accent h-5 w-5 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href="https://galerija.eventaj.si/" className="ev-btn ev-btn-ghost">
              Spoznaj QR galerijo
              <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </a>
            <span className="text-[15px] text-[var(--ev-mist)]">
              <span className="ev-display ev-price ev-tabular text-[30px]">35 €</span> na
              dogodek, brez naročnine
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="grid aspect-[4/3] grid-cols-3 grid-rows-2 gap-3 sm:gap-4">
            {demoPhotos.map((photo) => (
              <figure key={photo.src} className={`ev-photo relative ${photo.className}`}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1023px) 60vw, 480px" className="object-cover" />
              </figure>
            ))}
          </div>
          <p className="mt-4 flex items-baseline justify-between gap-4 border-t ev-rule pt-4 text-[14px] text-[var(--ev-mist)]">
            <span className="ev-display text-[22px] text-[var(--ev-porcelain)]">Ana &amp; Marko</span>
            <span className="ev-tabular">128 fotografij · 34 gostov</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function RedesignEquipment() {
  return (
    <section aria-labelledby="ev-equipment-title" className="py-24 md:py-36">
      <div className="ev-wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <figure className="ev-photo relative aspect-[4/3] lg:col-span-7">
          <Image
            src="/application/oprema/stojeca-miza/dogodek.webp"
            alt="Stoječe barske mize z belimi in črnimi prti na dogodku"
            fill
            sizes="(max-width: 1023px) 92vw, 760px"
            className="object-cover"
          />
        </figure>
        <div className="lg:col-span-5">
          <h2 id="ev-equipment-title" className="ev-display ev-h2">
            Za piko na <em>i</em>
          </h2>
          <p className="ev-lede mt-7 text-[var(--ev-stone)]">
            <span className="ev-badge">Novo</span> Oprema za dogodke. Najemi stoječe barske mize z belim ali črnim prtom, že od{" "}
            <strong className="ev-price ev-tabular font-medium">12,50 €</strong> na mizo za en dan.
          </p>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ev-stone)]">
            Dostava od 5 miz naprej v radiju 50 km od Maribora, manj miz lahko prevzameš osebno. Na
            voljo do 17 miz.
          </p>
          <div className="mt-10">
            <Link href="/oprema-za-dogodke" className="ev-btn ev-btn-dark">
              Oglej si opremo
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
