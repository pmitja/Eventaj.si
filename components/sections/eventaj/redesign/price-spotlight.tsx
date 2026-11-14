import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { booth360Packages, photoPackages } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";
import { ArrowRight, Camera, Clock, RotateCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Pkg = { name: string; price: number; hours: number; featured?: boolean };

const columns = [
  {
    key: "photo",
    title: "Photo Booth",
    note: "Neomejeno fotografij s takojšnjim tiskom",
    type: "Photo Booth",
    href: "/photo-booth#cenik",
    image: "/application/photo-booth-hero/jozek-50.webp",
    Icon: Camera,
    packages: photoPackages as ReadonlyArray<Pkg>,
  },
  {
    key: "360",
    title: "360° Booth",
    note: "Slow-motion video, deljen prek QR kode",
    type: "360° Booth",
    href: "/360-photo-booth",
    image: "/application/360-action-images.webp",
    Icon: RotateCw,
    packages: booth360Packages as ReadonlyArray<Pkg>,
  },
] as const;

const hoursLabel = (hours: number) => `${hours} ${hours === 2 ? "uri" : "ure"}`;

export function PriceSpotlight() {
  return (
    <section id="cenik" aria-labelledby="ev-spot-title" className="ev-blush-bg py-24 md:py-32">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ev-spot-title" className="ev-display ev-h2 lg:col-span-7">
            Cene, ki jih vidiš <em>takoj</em>
          </h2>
          <p className="ev-lede text-[var(--ev-stone)] lg:col-span-4 lg:col-start-9">
            Vsak paket vključuje postavitev, rekvizite in pomoč na dogodku. Prevoz uskladimo glede na
            lokacijo in ga vključimo v ponudbo.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-2">
          {columns.map((column) => (
            <article key={column.key} className="flex flex-col overflow-hidden rounded-[20px] bg-[var(--ev-white)]">
              <div className="flex items-center gap-5 p-6 md:p-8">
                <div className="ev-photo relative h-[88px] w-[88px] shrink-0 rounded-[14px] md:h-[104px] md:w-[104px]">
                  <Image src={column.image} alt="" fill sizes="104px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 className="ev-display flex items-center gap-2.5 text-[clamp(28px,2.6vw,38px)]">
                    <column.Icon aria-hidden="true" strokeWidth={1.75} className="h-6 w-6 shrink-0 text-[var(--ev-wine)]" />
                    {column.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-[var(--ev-stone)]">{column.note}</p>
                </div>
              </div>

              <ul className="grid gap-2 px-3 md:px-4">
                {column.packages.map((pkg) => {
                  const featured = Boolean(pkg.featured);
                  return (
                    <li key={pkg.name}>
                      <InquiryTrigger
                        defaults={{
                          type: column.type,
                          hours: String(pkg.hours),
                          ...(column.key === "photo" && pkg.hours >= 3 ? { albumSize: "small" } : {}),
                        }}
                        className={cn(
                          "group flex w-full items-center gap-4 rounded-[14px] px-4 py-4 text-left transition-[transform,background-color] duration-200 hover:-translate-y-0.5 md:px-5",
                          featured
                            ? "bg-[var(--ev-wine)] text-[var(--ev-white)]"
                            : "bg-[var(--ev-porcelain)] hover:bg-[#f3e4dc]",
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="ev-display text-[20px] md:text-[22px]">{pkg.name}</span>
                            {featured && (
                              <span className="rounded-full bg-[var(--ev-champagne)] px-2.5 py-0.5 text-[12px] font-semibold text-[var(--ev-night)]">
                                Najpogostejša izbira
                              </span>
                            )}
                          </span>
                          <span
                            className={cn(
                              "mt-1 flex items-center gap-1.5 text-[14px]",
                              featured ? "text-white/80" : "text-[var(--ev-stone)]",
                            )}
                          >
                            <Clock aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5" />
                            {hoursLabel(pkg.hours)}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "ev-display ev-tabular text-[clamp(36px,3.4vw,48px)] font-bold leading-none",
                            featured ? "text-[var(--ev-champagne)]" : "text-[var(--ev-wine)]",
                          )}
                        >
                          {pkg.price} €
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          strokeWidth={1.75}
                          className="hidden h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 sm:block"
                        />
                      </InquiryTrigger>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
                <Link href={column.href} className="ev-link">
                  Kaj vključuje {column.title}
                </Link>
                <InquiryTrigger defaults={{ type: column.type }} className="ev-btn ev-btn-dark">
                  Pridobi ponudbo
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
                </InquiryTrigger>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
          <span className="text-[var(--ev-stone)]">Dodatki:</span>
          <span>
            QR galerija <strong className="ev-price font-semibold">od +25 €</strong>
          </span>
          <span>
            Dodatna ura <strong className="ev-price font-semibold">od +60 €</strong>
          </span>
          <span>
            Veliki album <strong className="ev-price font-semibold">od +15 €</strong>
          </span>
          <a href="#cenik-po-meri" className="ev-link sm:ml-auto">
            Sestavi svoj paket
          </a>
        </p>
      </div>
    </section>
  );
}
