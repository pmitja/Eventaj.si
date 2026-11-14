import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";
import { services } from "@/content/eventaj/data";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { HeldFrameClips } from "./held-frame-clips";

type Service = (typeof services)[number];

function ServiceColumn({
  service,
  inquiryType,
  media,
}: {
  service: Service;
  inquiryType: string;
  media: ReactNode;
}) {
  return (
    <article id={service.id} className="flex flex-col">
      <div className="relative aspect-[4/5] w-full">{media}</div>
      <div className="mt-8 flex items-baseline justify-between gap-6 border-b ev-rule pb-6">
        <h3 className="ev-display text-[clamp(32px,3.2vw,48px)]">
          {service.title} <em>{service.italicWord}</em>
        </h3>
      </div>
      <p className="mt-6 max-w-[50ch] text-[17px] leading-relaxed text-[var(--ev-stone)]">{service.description}</p>
      <ul className="mt-6 grid">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 border-b ev-rule py-3 text-[15px]">
            <Check aria-hidden="true" strokeWidth={1.75} className="ev-accent h-4 w-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6 pt-10">
        <p className="flex items-baseline gap-2">
          <span className="text-[15px] text-[var(--ev-stone)]">od</span>
          <span className="ev-display ev-price ev-tabular text-[clamp(42px,4vw,60px)] leading-none">{service.price} €</span>
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href={service.href} className="ev-link">
            {service.linkLabel}
          </Link>
          <InquiryTrigger defaults={{ type: inquiryType }} className="ev-btn ev-btn-dark">
            Pridobi ponudbo
            <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
          </InquiryTrigger>
        </div>
      </div>
    </article>
  );
}

export function RedesignServices() {
  const [photo, booth360] = services;
  const photoMedia = photo.media.filter((item) => item.type === "image");
  const clips = booth360.media.flatMap((item) =>
    item.type === "video" ? [{ src: item.src, poster: item.poster, alt: item.alt }] : [],
  );

  return (
    <section aria-labelledby="ev-services-title" className="py-24 md:py-36">
      <div className="ev-wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ev-services-title" className="ev-display ev-h2 lg:col-span-7">
            Dva načina ustvarjanja <em>spominov</em>
          </h2>
          <p className="ev-lede text-[var(--ev-stone)] lg:col-span-4 lg:col-start-9">
            Photo Booth s takojšnjim tiskom ali 360° Booth. Oba pripeljemo, postavimo
            in z vami ostanemo ves večer.
          </p>
        </div>

        <div className="mt-16 grid gap-20 md:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <ServiceColumn
            service={photo}
            inquiryType="Photo Booth"
            media={
              <div className="ev-photo relative h-full">
                <Image
                  src={photoMedia[0].src}
                  alt={photoMedia[0].alt}
                  fill
                  sizes="(max-width: 1023px) 92vw, 46vw"
                  className="object-cover object-[30%_50%]"
                />
              </div>
            }
          />
          <div className="lg:pt-32">
            <ServiceColumn
              service={booth360}
              inquiryType="360° Booth"
              media={<HeldFrameClips clips={clips} className="h-full" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
