import {
  weddingPhotoComparison,
  serviceComparison,
  guidePricing,
  boothComparison,
} from "@/content/nasveti";

const rule = "border-[rgba(20,17,15,0.12)]";
const headCell =
  "px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--eventaj-muted)]";

/**
 * Five ways to collect guest photos. The paid option is marked so readers can
 * see which row is ours without the table hiding the free alternatives.
 */
export function WeddingMethodTable() {
  const { head, rows } = weddingPhotoComparison;

  return (
    <>
      {/* Desktop: real table. Scrolls inside its own container on narrow widths. */}
      <div className={`hidden overflow-x-auto border ${rule} md:block`}>
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">
            Primerjava petih načinov zbiranja fotografij gostov po ceni, rezultatu in slabosti
          </caption>
          <thead>
            <tr className={`border-b ${rule} bg-[var(--eventaj-paper-2)]`}>
              {head.map((cell) => (
                <th key={cell} scope="col" className={headCell}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.method}
                className={`border-b ${rule} last:border-b-0 ${
                  row.highlight ? "bg-[rgba(184,85,58,0.06)]" : ""
                }`}
              >
                <th scope="row" className="px-4 py-5 text-left font-semibold">
                  {row.method}
                </th>
                <td className="px-4 py-5 tabular-nums text-[var(--eventaj-ink-2)]">{row.price}</td>
                <td className="px-4 py-5 text-[var(--eventaj-ink-2)]">{row.gain}</td>
                <td className="px-4 py-5 text-[var(--eventaj-muted)]">{row.breaks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per method, so nothing is cut off horizontally. */}
      <div className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <div
            key={row.method}
            className={`border ${rule} p-5 ${row.highlight ? "bg-[rgba(184,85,58,0.06)]" : ""}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif-display text-2xl font-[400]">{row.method}</h3>
              <span className="text-sm font-semibold tabular-nums">{row.price}</span>
            </div>
            <dl className={`mt-4 grid gap-3 border-t ${rule} pt-4 text-sm`}>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--eventaj-muted)]">
                  Kaj dobite
                </dt>
                <dd className="mt-1 text-[var(--eventaj-ink-2)]">{row.gain}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--eventaj-muted)]">
                  Kje razpade
                </dt>
                <dd className="mt-1 text-[var(--eventaj-muted)]">{row.breaks}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}

/** Photo booth against QR galerija, attribute by attribute. */
export function ServiceComparisonTable() {
  const { head, rows } = serviceComparison;

  return (
    <>
      <div className={`hidden overflow-x-auto border ${rule} md:block`}>
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">
            Primerjava photo bootha in QR galerije po ceni, opremi in rezultatu
          </caption>
          <thead>
            <tr className={`border-b ${rule} bg-[var(--eventaj-paper-2)]`}>
              <th scope="col" className={`${headCell} w-[34%]`}>
                <span className="sr-only">Lastnost</span>
                {head[0]}
              </th>
              <th scope="col" className="px-4 py-4 text-left font-serif-display text-xl font-[400]">
                {head[1]}
              </th>
              <th scope="col" className="px-4 py-4 text-left font-serif-display text-xl font-[400]">
                {head[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className={`border-b ${rule} last:border-b-0`}>
                <th
                  scope="row"
                  className="px-4 py-5 text-left text-sm font-semibold text-[var(--eventaj-muted)]"
                >
                  {row.label}
                </th>
                <td className="px-4 py-5 text-[var(--eventaj-ink-2)]">{row.booth}</td>
                <td className="px-4 py-5 text-[var(--eventaj-ink-2)]">{row.gallery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {[
          { name: head[1], key: "booth" as const },
          { name: head[2], key: "gallery" as const },
        ].map((column) => (
          <div key={column.name} className={`border ${rule} p-5`}>
            <h3 className="font-serif-display text-2xl font-[400]">{column.name}</h3>
            <dl className={`mt-4 grid gap-3 border-t ${rule} pt-4 text-sm`}>
              {rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-4">
                  <dt className="text-[var(--eventaj-muted)]">{row.label}</dt>
                  <dd className="text-right font-medium text-[var(--eventaj-ink-2)]">
                    {row[column.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}

/** Our own package prices. Two of the rows are other services, so they are
 *  marked as such rather than reading like photo booth tiers. */
export function PricingTable() {
  const { head, rows } = guidePricing;

  return (
    <>
      <div className={`hidden overflow-x-auto border ${rule} md:block`}>
        <table className="w-full min-w-[520px] border-collapse text-left">
          <caption className="sr-only">Cenik paketov Eventaj po trajanju najema</caption>
          <thead>
            <tr className={`border-b ${rule} bg-[var(--eventaj-paper-2)]`}>
              {head.map((cell) => (
                <th key={cell} scope="col" className={headCell}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className={`border-b ${rule} last:border-b-0 ${
                  row.muted ? "text-[var(--eventaj-muted)]" : ""
                }`}
              >
                <th scope="row" className="px-4 py-5 text-left font-semibold">
                  {row.name}
                </th>
                <td className="px-4 py-5">{row.duration}</td>
                <td className="px-4 py-5 text-right font-semibold tabular-nums md:text-left">
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`grid border-t ${rule} md:hidden`}>
        {rows.map((row) => (
          <div
            key={row.name}
            className={`flex items-baseline justify-between gap-4 border-b ${rule} py-4`}
          >
            <div>
              <div className={`font-semibold ${row.muted ? "text-[var(--eventaj-muted)]" : ""}`}>
                {row.name}
              </div>
              <div className="mt-0.5 text-sm text-[var(--eventaj-muted)]">{row.duration}</div>
            </div>
            <div className="shrink-0 font-semibold tabular-nums">{row.price}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Photo booth against the 360° Booth, attribute by attribute. */
export function BoothComparisonTable() {
  const { head, rows } = boothComparison;

  return (
    <>
      <div className={`hidden overflow-x-auto border ${rule} md:block`}>
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">
            Primerjava photo bootha in 360° bootha po rezultatu, ceni in potrebnem prostoru
          </caption>
          <thead>
            <tr className={`border-b ${rule} bg-[var(--eventaj-paper-2)]`}>
              <th scope="col" className={`${headCell} w-[30%]`}>
                {head[0] || "Lastnost"}
              </th>
              <th scope="col" className="px-4 py-4 text-left font-serif-display text-xl font-[400]">
                {head[1]}
              </th>
              <th scope="col" className="px-4 py-4 text-left font-serif-display text-xl font-[400]">
                {head[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className={`border-b ${rule} last:border-b-0`}>
                <th
                  scope="row"
                  className="px-4 py-5 text-left text-sm font-semibold text-[var(--eventaj-muted)]"
                >
                  {row.label}
                </th>
                <td className="px-4 py-5 text-[var(--eventaj-ink-2)]">{row.booth}</td>
                <td className="px-4 py-5 text-[var(--eventaj-ink-2)]">{row.booth360}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {[
          { name: head[1], key: "booth" as const },
          { name: head[2], key: "booth360" as const },
        ].map((column) => (
          <div key={column.name} className={`border ${rule} p-5`}>
            <h3 className="font-serif-display text-2xl font-[400]">{column.name}</h3>
            <dl className={`mt-4 grid gap-3 border-t ${rule} pt-4 text-sm`}>
              {rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-4">
                  <dt className="text-[var(--eventaj-muted)]">{row.label}</dt>
                  <dd className="text-right font-medium text-[var(--eventaj-ink-2)]">
                    {row[column.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
