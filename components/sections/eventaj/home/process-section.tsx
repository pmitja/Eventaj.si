import { processSteps } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <section className="bg-[var(--eventaj-ink)] px-5 py-24 text-[var(--eventaj-paper)] md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-cream)] opacity-60">
              Kako poteka
            </div>
            <h2 className="max-w-[800px] font-serif-display text-[clamp(40px,5.5vw,76px)] font-[350] leading-none text-balance">
              Trije{" "}
              <em className="font-serif-italic italic text-[#E8B584]">
                preprosti
              </em>{" "}
              koraki do nepozabnega dogodka.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div
              key={step.n}
              className={cn(
                "px-0 py-9 md:px-9 md:py-12",
                index > 0 &&
                  "border-t border-[rgba(244,239,230,0.15)] md:border-l md:border-t-0",
              )}
            >
              <div className="mb-7 font-serif-italic text-lg italic text-[#E8B584]">
                {step.n}
              </div>
              <h3 className="font-serif-display text-[28px] font-normal leading-tight">
                {step.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--eventaj-cream)] opacity-75">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
