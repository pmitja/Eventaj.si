import { EquipmentIcon } from "@/components/icons/EquipmentIcon";
import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { equipmentNavGroups, eventajNav } from "@/content/eventaj/data";
import { equipmentFaq, equipmentProducts, type EquipmentProduct } from "@/content/eventaj/equipment";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarCheck, Check, PackageCheck, Phone, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EquipmentInquiryCard } from "../equipment/equipment-inquiry-card";
import { ProductImageCarousel } from "../equipment/product-image-carousel";
import { RedesignFaq } from "./redesign-faq";
import { RedesignClosing } from "./redesign-footer";
import { FeatureList, SectionHead } from "./service-sections";

const productGuides: Record<string, { slug: string; label: string }> = {
  "knjiga-gostov-v-okvirju": { slug: "knjiga-gostov-za-poroko", label: "Kako izbrati knjigo gostov" },
  "igre-za-dogodke": { slug: "igre-na-poroki", label: "Katere igre izbrati za poroko" },
  "tabla-dobrodoslice": { slug: "kaj-napisati-na-tablo-dobrodoslice", label: "Kaj napisati na tablo dobrodošlice" },
};

const steps = [
  { Icon: Send, title: "Izberi opremo", desc: "Oglej si izdelek, izberi količino in možnosti, ki ustrezajo tvojemu dogodku." },
  { Icon: CalendarCheck, title: "Pošlji datum", desc: "Sporoči nam datum in lokacijo. Razpoložljivost preverimo v najkrajšem času." },
  { Icon: PackageCheck, title: "Potrdi podrobnosti", desc: "Uskladimo prevoz na lokacijo ali pošiljanje po pošti ter ti pošljemo končno ponudbo." },
] as const;

const groupDetails: Record<string, { icon: string; lede: string }> = {
  pogostitev: { icon: "standing-table", lede: "Mize in kozarci za sprejem, aperitiv ali zdravico." },
  zabava: { icon: "games", lede: "Igre, ki zabavo držijo pokonci, ko se ples umiri." },
  poroka: { icon: "sign", lede: "Personalizirani izdelki od vhoda do sedežnega reda." },
};

// Same groups as the Oprema menu; the product's nav entry decides its group.
const productGroup = new Map<string, string>(
  eventajNav.flatMap((item) => ("children" in item ? item.children : [])).map((child) => [child.href.split("/").pop() ?? "", child.group]),
);

const groupedProducts = equipmentNavGroups
  .map((group) => ({
    ...group,
    ...groupDetails[group.id],
    products: equipmentProducts.filter((product) => (productGroup.get(product.slug) ?? "poroka") === group.id),
  }))
  .filter((group) => group.products.length > 0);

const stripDot =(text: string) => text.replace(/\.$/, "");
const fmt = new Intl.NumberFormat("sl-SI", { maximumFractionDigits: 2 });

function Breadcrumbs({ items }: { items: ReadonlyArray<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Drobtinice" className="mb-8 flex flex-wrap gap-2 text-[14px] text-[var(--ev-mist)]">
      {items.map((item, index) => (
        <span key={item.label} className="flex gap-2">
          {index > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition-opacity hover:opacity-70">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--ev-porcelain)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function ProductTile({ product, className }: { product: EquipmentProduct; className?: string }) {
  const image = product.slug === "najem-stojecih-miz" ? product.images[2] ?? product.images[0] : product.images[0];
  return (
    <div className={cn("ev-photo relative overflow-hidden rounded-[16px] bg-[var(--ev-white)]", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1023px) 46vw, 22vw"
        className={image.fit === "contain" ? "object-contain p-3" : "object-cover"}
      />
    </div>
  );
}

export function EquipmentCategoryRedesign() {
  const lowest = Math.min(...equipmentProducts.map((product) => product.price));
  return (
    <>
      <section className="ev-dark relative isolate overflow-hidden">
        <div className="ev-wrap grid items-center gap-12 pb-16 pt-32 md:pb-24 md:pt-40 lg:grid-cols-12 lg:gap-10">
          <div className="ev-rise lg:col-span-6">
            <Breadcrumbs items={[{ label: "Domov", href: "/" }, { label: "Oprema za dogodke" }]} />
            <p className="mb-7 text-[19px] sm:text-[23px]">
              <a href="#oprema" className="ev-tag transition-transform hover:-translate-y-0.5">
                <small>Oprema od</small> {fmt.format(lowest)} €
              </a>
            </p>
            <h1 className="ev-display text-[clamp(40px,5.6vw,84px)] leading-[1.02]">
              Oprema za dogodke, <em>brez kompliciranja</em>
            </h1>
            <p className="ev-lede mt-7 text-[var(--ev-porcelain)]/90">
              Izberi opremo ali personaliziran izdelek. Preverimo razpoložljivost oziroma rok izdelave
              in ti v 24 urah pošljemo vse podrobnosti. Dostava po vsej Sloveniji.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#oprema" className="ev-btn ev-btn-primary">
                Oglej si opremo
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
              </a>
              <InquiryTrigger defaults={{ type: "Oprema za dogodke" }} className="ev-link">
                Pošlji povpraševanje
              </InquiryTrigger>
            </div>
          </div>
          <div aria-hidden="true" className="grid grid-cols-2 gap-3 lg:col-span-5 lg:col-start-8">
            {equipmentProducts.slice(0, 4).map((product, index) => (
              <ProductTile key={product.id} product={product} className={cn("aspect-[4/5]", index % 2 === 1 && "translate-y-8")} />
            ))}
          </div>
        </div>
      </section>

      <section id="oprema" aria-labelledby="eq-grid-title" className="py-24 md:py-36">
        <div className="ev-wrap">
          <SectionHead
            id="eq-grid-title"
            title={
              <>
                Izberi <em>opremo</em>
              </>
            }
            lede="Vsak izdelek ima svojo ceno, možnosti in rok. Pri najemu preverimo termin, pri izdelavi pa potrdimo osnutek in datum dostave."
          />
          <nav aria-label="Skupine opreme" className="mt-10 flex flex-wrap gap-2.5">
            {groupedProducts.map((group) => (
              <a
                key={group.id}
                href={`#oprema-${group.id}`}
                className="flex items-center gap-2.5 rounded-full border ev-rule py-1.5 pl-1.5 pr-4 text-[15px] transition-colors hover:bg-[var(--ev-white)]"
              >
                <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[var(--ev-white)] [&_img]:h-6 [&_img]:w-6 [&_svg]:h-[18px] [&_svg]:w-[18px]">
                  <EquipmentIcon icon={group.icon} />
                </span>
                {group.label}
                <span className="ev-tabular text-[13px] text-[var(--ev-stone)]">{group.products.length}</span>
              </a>
            ))}
          </nav>
          <div className="mt-16 grid gap-20 md:mt-20 md:gap-28">
            {groupedProducts.map((group) => (
              <section key={group.id} id={`oprema-${group.id}`} aria-labelledby={`oprema-${group.id}-title`} className="scroll-mt-28">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b ev-rule pb-6 md:mb-10">
                  <h3 id={`oprema-${group.id}-title`} className="ev-display text-[clamp(30px,3.4vw,44px)] leading-tight">
                    {group.label}
                  </h3>
                  <p className="max-w-[46ch] text-[16px] leading-relaxed text-[var(--ev-stone)]">{group.lede}</p>
                </div>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.products.map((product) => {
                    const image = product.images[0];
                    return (
                      <li key={product.id} className="flex flex-col overflow-hidden rounded-[20px] bg-[var(--ev-white)]">
                        <Link href={`/oprema-za-dogodke/${product.slug}`} className="group flex flex-1 flex-col">
                          <span className="ev-photo relative block aspect-[4/5] bg-white">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                              className={image.fit === "contain" ? "object-contain p-4" : "object-cover"}
                            />
                            <span className="absolute left-4 top-4 rounded-full bg-[var(--ev-night)] px-3 py-1.5 text-[12px] font-medium text-[var(--ev-porcelain)]">
                              {product.status}
                            </span>
                          </span>
                          <span className="flex flex-1 flex-col p-6 md:p-7">
                            <span className="ev-display text-[26px]">{product.name}</span>
                            <span className="mt-3 block text-[15px] leading-relaxed text-[var(--ev-stone)]">{product.shortDescription}</span>
                            <span className="mt-auto flex items-end justify-between gap-4 border-t ev-rule pt-5">
                              <span className="text-[13px] text-[var(--ev-stone)]">{product.cardNote}</span>
                              <span className="ev-display ev-price ev-tabular text-[24px] font-bold">
                                {product.cardPriceLabel ?? product.priceLabel}
                              </span>
                            </span>
                          </span>
                        </Link>
                        {productGuides[product.slug] && (
                          <Link href={`/nasveti/${productGuides[product.slug].slug}`} className="ev-link mx-6 mb-6 md:mx-7">
                            {productGuides[product.slug].label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="eq-steps-title" className="ev-dark ev-wine-bg py-24 md:py-32">
        <div className="ev-wrap">
          <SectionHead
            id="eq-steps-title"
            dark
            title={
              <>
                Od izbire do dogodka v <em>treh korakih</em>
              </>
            }
          />
          <ol className="mt-14 grid gap-3 md:mt-16 md:grid-cols-3">
            {steps.map(({ Icon, title, desc }, index) => (
              <li key={title} className="rounded-[20px] bg-[var(--ev-night)] p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ev-champagne)] text-[var(--ev-night)]">
                    <Icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
                  </span>
                  <span className="ev-display ev-tabular text-[18px] text-[var(--ev-mist)]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="ev-display mt-10 text-[26px]">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--ev-mist)]">{desc}</p>
              </li>
            ))}
          </ol>
          <InquiryTrigger defaults={{ type: "Oprema za dogodke" }} className="ev-btn ev-btn-primary mt-12">
            Pošlji povpraševanje
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </InquiryTrigger>
        </div>
      </section>

      <RedesignFaq items={equipmentFaq} />
      <RedesignClosing />
    </>
  );
}

export function EquipmentProductRedesign({ product }: { product: EquipmentProduct }) {
  return (
    <>
      <section className="ev-dark pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="ev-wrap ev-rise">
          <Breadcrumbs
            items={[
              { label: "Domov", href: "/" },
              { label: "Oprema za dogodke", href: "/oprema-za-dogodke" },
              { label: product.name },
            ]}
          />
          <p className="mb-7 text-[19px] sm:text-[23px]">
            <a href="#narocilo" className="ev-tag transition-transform hover:-translate-y-0.5">
              {product.priceLabel} <small>{product.priceSubtitle}</small>
            </a>
          </p>
          <h1 className="ev-display max-w-[18ch] text-[clamp(40px,5.6vw,84px)] leading-[1.02]">
            {product.heading[0]} <em>{stripDot(product.heading[1])}</em>
          </h1>
          <p className="ev-lede mt-7 whitespace-pre-line text-[var(--ev-porcelain)]/90">{product.description}</p>
        </div>
      </section>

      <section id="narocilo" aria-label="Fotografije in naročilo" className="py-16 md:py-24">
        <div className="ev-wrap flex flex-col items-center gap-8 lg:flex-row lg:items-start xl:gap-12">
          <ProductImageCarousel images={product.images} productName={product.name} />
          <div className="ev-dialog-tokens w-full max-w-[420px] shrink-0 lg:sticky lg:top-28">
            <EquipmentInquiryCard product={product} />
          </div>
        </div>
      </section>

      <section aria-labelledby="eq-included-title" className="ev-dark ev-wine-bg py-24 md:py-32">
        <div className="ev-wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h2 id="eq-included-title" className="ev-display ev-h2 lg:col-span-5">
            {stripDot(product.includedSubtitle)}
          </h2>
          <ul className="border-t ev-rule lg:col-span-6 lg:col-start-7">
            {product.included.map((item) => (
              <li key={item} className="flex items-center gap-4 border-b ev-rule py-5 text-[16px]">
                <Check aria-hidden="true" strokeWidth={1.75} className="ev-accent h-5 w-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeatureList
        id="eq-uses-title"
        title={stripDot(product.useCasesTitle)}
        items={product.useCases.map((item) => ({ title: item.title, desc: item.text }))}
        icons={[Sparkles, Sparkles, Sparkles]}
      />

      <section aria-labelledby="eq-help-title" className="ev-blush-bg py-20 md:py-28">
        <div className="ev-wrap grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 id="eq-help-title" className="ev-display ev-h2">
              {stripDot(product.helpTitle)}
            </h2>
            <p className="mt-5 max-w-[60ch] whitespace-pre-line text-[17px] leading-relaxed">{product.helpText}</p>
          </div>
          <a href="tel:+38631285143" className="ev-btn ev-btn-dark">
            <Phone aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
            Pokliči 031 285 143
          </a>
        </div>
      </section>

      <RedesignFaq items={product.faq} moreLink={{ href: "/oprema-za-dogodke", label: "Vsa oprema za dogodke" }} />
      <RedesignClosing />
    </>
  );
}
