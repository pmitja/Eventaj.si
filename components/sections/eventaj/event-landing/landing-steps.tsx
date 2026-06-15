import { eventLandingSteps, EventLanding } from "@/content/eventaj/event-pages";
import { cn } from "@/lib/utils";

export function LandingSteps({ landing }: { landing: EventLanding }) {
  const steps = eventLandingSteps[landing.product];
  return (
    <section className="bg-[var(--eventaj-ink)] px-5 py-24 text-[var(--eventaj-paper)] md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#E8B584]">
            · Brez skrbi za vas ·
          </div>
          <h2 className="font-serif-display text-[clamp(34px,4.2vw,56px)] font-[350] leading-[1.05] text-balance">
            Vi imate dogodek.
            <br />
            Mi imamo{" "}
            <em className="font-serif-italic italic text-[#E8B584]">
              vse ostalo
            </em>
            .
          </h2>
          <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-[var(--eventaj-cream)] opacity-75">
            Pridemo 60–90 minut prej, postavimo in vodimo booth ves dogodek. Po
            zabavi vse pospravimo — vi ne dvignete niti prsta.
          </p>
        </div>
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                "grid grid-cols-[64px_1fr] gap-5 border-t border-[rgba(244,239,230,0.16)] py-6",
                index === steps.length - 1 &&
                  "border-b border-b-[rgba(244,239,230,0.16)]",
              )}
            >
              <span className="font-serif-display text-[28px] leading-none text-[#E8B584]">
                0{index + 1}
              </span>
              <span>
                <span className="block font-medium">{step.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-[var(--eventaj-cream)] opacity-70">
                  {step.desc}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
