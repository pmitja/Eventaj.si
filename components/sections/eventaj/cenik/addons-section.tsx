import { addons } from "@/content/eventaj/data";
import { cn } from "@/lib/utils";

export function AddonsSection() {
  return (
    <section className="bg-[var(--eventaj-paper)] px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-16 text-center">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
            Dodatki
          </div>
          <h2 className="font-serif-display text-[clamp(36px,4.8vw,60px)] font-[350] leading-none text-balance">
            Dodatki po meri
          </h2>
        </div>
        <div className="border border-[rgba(20,17,15,0.1)]">
          {addons.map((row, index) => (
            <div
              key={row.item}
              className={cn(
                "flex items-center justify-between gap-6 px-5 py-5 text-[15px] md:px-8",
                index > 0 && "border-t border-[rgba(20,17,15,0.08)]",
              )}
            >
              <span>{row.item}</span>
              <span className="font-serif-display text-lg">{row.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
