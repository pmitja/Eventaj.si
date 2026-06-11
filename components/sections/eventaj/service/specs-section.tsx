import { SpecIcon } from "@/components/icons/SpecIcon";
import { cn } from "@/lib/utils";

export function SpecsSection({
  specs,
  accent,
}: {
  specs: ReadonlyArray<{ label: string; value: string; icon: string }>;
  accent: string;
}) {
  return (
    <section className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[880px]">
        <div className="mb-16 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            POMEMBNE INFORMACIJE
          </div>
          <h2 className="font-serif-display text-[clamp(32px,4.5vw,60px)] font-[350] leading-none text-balance">
            Vse, kar moraš{" "}
            <em className="font-serif-italic italic" style={{ color: accent }}>
              vedeti
            </em>
            .
          </h2>
        </div>
        <div>
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className={cn(
                "grid gap-4 border-t border-[rgba(20,17,15,0.12)] py-7 md:grid-cols-[auto_1fr_1.4fr] md:gap-7",
                index === specs.length - 1 && "border-b",
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--eventaj-paper-2)]">
                <SpecIcon name={spec.icon} color={accent} />
              </div>
              <div className="pt-1 font-serif-display text-xl font-normal md:pt-2.5">
                {spec.label}
              </div>
              <div className="text-[15px] leading-relaxed text-[var(--eventaj-ink-2)] md:pt-3">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
