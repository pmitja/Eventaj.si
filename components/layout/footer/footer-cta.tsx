import { InquiryTrigger } from "@/components/inquiry/inquiry-trigger";

export function FooterCta() {
  return (
    <div className="relative overflow-hidden border-b border-[rgba(244,239,230,0.12)] px-5 py-24 text-center md:px-10 md:py-32">
      <div className="absolute inset-0 bg-[url('/application/cta-bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[rgba(20,17,15,0.78)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--eventaj-ink)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--eventaj-ink)] to-transparent" />
      <div className="relative z-10 mx-auto max-w-[880px]">
        <div className="mb-6 font-serif-italic text-xl italic text-[#E8B584]">
          Pripravljeni?
        </div>
        <h2 className="font-serif-display text-[clamp(48px,7vw,96px)] font-[350] leading-[0.95] text-balance">
          Naj bo tvoj dogodek{" "}
          <em className="font-serif-italic italic text-[#E8B584]">tisti</em>, o
          katerem govorijo še dolgo.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--eventaj-cream)] opacity-75">
          Pošlji povpraševanje in v 24 urah prejmeš ponudbo, prilagojeno tvojemu
          dogodku.
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
  );
}
