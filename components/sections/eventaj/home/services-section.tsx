import { services } from "@/content/eventaj/data";
import { ServiceCard } from "./service-card";

export function ServicesSection() {
  return (
    <section className="bg-[var(--eventaj-paper)]">
      <div className="px-5 pt-16 lg:pt-28 lg:text-center md:px-10">
        <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--eventaj-muted)]">
          Naša ponudba
        </div>
        <h2 className="font-serif-display text-[clamp(40px,6vw,80px)] font-[350] leading-none text-balance">
          Dva načina ustvarjanja{" "}
          <em className="font-serif-italic italic">spominov.</em>
        </h2>
      </div>
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </section>
  );
}
