import { PageIntro } from "@/components/sections/eventaj/redesign/service-sections";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageIntro
      title={
        <>
          Te strani <em>ni več tukaj</em>
        </>
      }
      lede="Morda je bila premaknjena ali izbrisana. Začni na domači strani ali poglej, kaj ponujamo."
    >
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 pb-24">
        <Link href="/" className="ev-btn ev-btn-primary">
          Nazaj na domačo stran
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="h-4 w-4" />
        </Link>
        <Link href="/photo-booth" className="ev-link">
          Photo Booth
        </Link>
        <Link href="/360-photo-booth" className="ev-link">
          360° Booth
        </Link>
        <Link href="/cenik" className="ev-link">
          Cenik
        </Link>
      </div>
    </PageIntro>
  );
}
