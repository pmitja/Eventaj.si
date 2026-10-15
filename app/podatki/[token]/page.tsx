import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventDetailsForm } from "@/components/event-details/event-details-form";
import Logo from "@/components/logo";
import { getEventDetailsByToken, prefillEventDetails } from "@/lib/db/event-details";
import { formatSlovenianDate } from "@/lib/slovenian-date";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Podatki za vaš dogodek | Eventaj.si",
  robots: { index: false, follow: false },
};

export default async function EventDetailsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const request = token.length <= 64 ? await getEventDetailsByToken(token) : null;
  if (!request) notFound();

  const form = request.inquiry.formData;
  const eventDate = form.date ? formatSlovenianDate(form.date) : "";

  return (
    <main className="mx-auto w-full max-w-[760px] px-4 pb-20 pt-8 md:pt-12">
      <Link href="/" aria-label="Eventaj.si" className="inline-block text-[var(--eventaj-ink)]">
        <Logo />
      </Link>

      <header className="mb-10 mt-12 md:mt-16">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
          Photo booth{eventDate ? ` · ${eventDate}` : ""}
        </div>
        <h1 className="mt-3 font-serif-display text-[40px] font-normal leading-[1.05] md:text-[56px]">
          Podatki za vaš <em className="font-serif-italic italic">dogodek</em>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-[var(--eventaj-ink-2)]">
          Kmalu se vidimo! Ker se vaš dogodek hitro približuje, vas prosimo za naslednje podatke. Kar že vemo iz
          povpraševanja, smo izpolnili namesto vas.
        </p>
      </header>

      <EventDetailsForm
        token={token}
        initialData={request.data ?? prefillEventDetails(request.inquiry)}
        alreadySubmitted={Boolean(request.submittedAt)}
      />

      <footer className="mt-14 border-t border-[rgba(20,17,15,0.1)] pt-6 text-center font-serif-display text-lg">
        Lep dan,
        <br />
        ekipa Eventaj.si
      </footer>
    </main>
  );
}
