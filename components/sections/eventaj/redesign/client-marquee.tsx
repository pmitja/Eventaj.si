"use client";

import { cn } from "@/lib/utils";
import { Building2, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useState, type CSSProperties } from "react";

type Client = { name: string; logo?: { src: string; width: number; height: number; boost?: number } };

// Companies we have worked with: logos where we hold the file, the name otherwise (their branded prints are on the site).
const clients: ReadonlyArray<Client> = [
  { name: "ŠKSG", logo: { src: "/application/sksg.webp", width: 374, height: 154 } },
  { name: "AutoDelta", logo: { src: "/application/autodelta.webp", width: 257, height: 169 } },
  { name: "Forvis Mazars", logo: { src: "/application/forvis-marzars.webp", width: 210, height: 113 } },
  { name: "Mlada Slovenija", logo: { src: "/application/msi-logo.webp", width: 240, height: 239 } },
  { name: "KPMG", logo: { src: "/application/kpmg.webp", width: 249, height: 104 } },
  { name: "Kelag", logo: { src: "/application/kelag.webp", width: 666, height: 292 } },
  { name: "Halcom", logo: { src: "/application/halcom.webp", width: 703, height: 141 } },
  { name: "Kronoterm", logo: { src: "/application/kronoterm.webp", width: 624, height: 77 } },
  { name: "Vigros", logo: { src: "/application/vigros.webp", width: 364, height: 53 } },
  {
    name: "Univerza v Mariboru, Fakulteta za gradbeništvo, prometno inženirstvo in arhitekturo",
    logo: { src: "/application/um-fgpa.webp", width: 328, height: 191, boost: 1.5 },
  },
  { name: "DOBA", logo: { src: "/application/doba.webp", width: 271, height: 89 } },
  { name: "Orbtio", logo: { src: "/application/orbtio.svg", width: 357, height: 112 } },
];

/**
 * Optical sizing: every logo gets roughly the same ink area instead of the same height,
 * so wide wordmarks and round badges read as equally heavy. `boost` lifts logos with fine detail.
 */
function logoBox(logo: NonNullable<Client["logo"]>, area: number, maxW: number, maxH: number) {
  const ratio = logo.width / logo.height;
  let h = Math.sqrt((area * (logo.boost ?? 1)) / ratio);
  let w = h * ratio;
  if (w > maxW) { w = maxW; h = w / ratio; }
  if (h > maxH) { h = maxH; w = h * ratio; }
  return { w: Math.round(w), h: Math.round(h) };
}

function Item({ client }: { client: Client }) {
  const sm = client.logo && logoBox(client.logo, 2600, 168, 50);
  const md = client.logo && logoBox(client.logo, 3400, 190, 60);
  return (
    <li className="flex h-[72px] w-[240px] shrink-0 items-center justify-center rounded-full bg-[var(--ev-white)] px-6 md:h-[84px] md:w-[270px]">
      {client.logo && sm && md ? (
        <Image
          src={client.logo.src}
          alt={client.name}
          width={client.logo.width}
          height={client.logo.height}
          sizes="190px"
          loading="eager"
          style={{ "--w": `${sm.w}px`, "--h": `${sm.h}px`, "--w-md": `${md.w}px`, "--h-md": `${md.h}px` } as CSSProperties}
          className="h-[var(--h)] w-[var(--w)] object-contain md:h-[var(--h-md)] md:w-[var(--w-md)]"
        />
      ) : (
        <span className="ev-display flex items-center gap-2.5 whitespace-nowrap text-[20px] text-[var(--ev-wine-deep)] md:text-[22px]">
          <Building2 aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-[var(--ev-wine)]" />
          {client.name}
        </span>
      )}
    </li>
  );
}

export function ClientMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="ev-clients-title" className="overflow-hidden border-b ev-rule bg-[var(--ev-porcelain)] py-10 md:py-12">
      <div className="ev-wrap mb-6 flex items-center justify-between gap-4">
        <h2 id="ev-clients-title" className="text-[15px] font-medium text-[var(--ev-stone)]">
          Z nami so praznovali
        </h2>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? "Predvajaj trak podjetij" : "Ustavi trak podjetij"}
          className="flex h-11 w-11 items-center justify-center rounded-full border ev-rule text-[var(--ev-wine-deep)] transition-colors hover:bg-white/60"
        >
          {paused ? (
            <Play aria-hidden="true" strokeWidth={1.75} className="ml-0.5 h-4 w-4" />
          ) : (
            <Pause aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="ev-marquee group flex motion-reduce:justify-center motion-reduce:px-[var(--ev-gutter)] motion-reduce:[mask-image:none] [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className={cn(
              "ev-marquee-track flex shrink-0 gap-3 pr-3 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0",
              copy === 1 && "motion-reduce:hidden",
              paused && "ev-marquee-paused",
            )}
          >
            {clients.map((client) => (
              <Item key={client.name} client={client} />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
