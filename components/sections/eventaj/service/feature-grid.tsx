import { cn } from "@/lib/utils";

export function FeatureGrid({
  title,
  italicWord,
  features,
  accent,
  eyebrow = "Kaj je vključeno",
}: {
  title: string;
  italicWord: string;
  features: ReadonlyArray<{ title: string; desc: string }>;
  accent: string;
  eyebrow?: string;
}) {
  return (
    <section className="bg-[var(--eventaj-paper-2)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-[720px]">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            {eyebrow}
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.8vw,64px)] font-[350] leading-none text-balance">
            {title}{" "}
            <em className="font-serif-italic italic" style={{ color: accent }}>
              {italicWord}
            </em>
            .
          </h2>
        </div>
        <div className="grid border border-[rgba(20,17,15,0.1)] bg-[var(--eventaj-paper)] md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "p-8 md:p-9",
                index % 3 !== 0 && "md:border-l md:border-[rgba(20,17,15,0.1)]",
                index >= 3 && "border-t border-[rgba(20,17,15,0.1)]",
              )}
            >
              <div
                className="mb-5 font-serif-italic italic"
                style={{ color: accent }}
              >
                0{index + 1}
              </div>
              <h3 className="font-serif-display text-2xl font-normal leading-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--eventaj-ink-2)]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
