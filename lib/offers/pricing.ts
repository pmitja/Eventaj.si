import { albumColorLabels, getAlbumPrice, type AlbumColor, type AlbumSize } from "@/content/eventaj/album-pricing";
import { servicesForDate, tableclothLabels, tableRental, type OfferService, type PackageHours, type TableclothColor } from "./services";

export type { OfferService, PackageHours } from "./services";

export const defaultPricePerKm = 0.4;
/** Booths: transport is free up to this many km (one way from Lenart); beyond it the whole distance is charged. */
export const freeTransportKm = 20;
export const qrGalleryPromoPrice = 25;

export type CustomItem = { description: string; amount: number };

/** A manual change to a computed line, keyed by `${variantIndex}:${item.key}`. */
export type ItemOverride = { description?: string; amount?: number | null; removed?: boolean };
export type ItemOverrides = Record<string, ItemOverride>;

export function overrideKey(variantIndex: number, itemKey: string) {
  return `${variantIndex}:${itemKey}`;
}

export type PricingOptions = {
  service: OfferService;
  hours: PackageHours;
  eventDate?: string;
  extraHours: number;
  days?: number;
  compareHours?: PackageHours | "";
  discountPercent?: number;
  albumSize: AlbumSize;
  albumColor: AlbumColor;
  qrGallery: boolean;
  qrGalleryPromo?: boolean;
  tableCount?: number;
  tableclothColor?: TableclothColor;
  pickup?: boolean;
  customItems: CustomItem[];
  locationUnknown: boolean;
  distanceKm: number | null;
  pricePerKm: number;
  itemOverrides?: ItemOverrides;
};

export type OfferItem = {
  /** Stable id of a computed line, so it can be overridden. Custom items use `custom:<index>`. */
  key?: string;
  description: string;
  amount: number | null;
  note?: string;
};

const eur = (value: number) =>
  `${value.toLocaleString("sl-SI", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

export const formatEur = eur;

export type ItemLabels = {
  place?: string;
};

export type OfferVariant = { label: string; items: OfferItem[]; total: number };

/** Applies the manual overrides of one variant; custom items are edited directly, so they are left alone. */
function overrider(options: PricingOptions, variantIndex: number) {
  const overrides = options.itemOverrides ?? {};
  return (items: OfferItem[]): OfferItem[] =>
    items.flatMap((item) => {
      const override = item.key && !item.key.startsWith("custom:") ? overrides[overrideKey(variantIndex, item.key)] : undefined;
      if (!override) return [item];
      if (override.removed) return [];
      const amount = override.amount === undefined ? item.amount : override.amount;
      return [{
        ...item,
        description: override.description?.trim() || item.description,
        amount,
        note: amount === null ? item.note ?? "vključeno" : undefined,
      }];
    });
}

const round = (value: number) => Math.round(value * 100) / 100;

export function daysLabel(days: number) {
  return `${days} ${days === 1 ? "dan" : days === 2 ? "dneva" : "dni"}`;
}

export function hoursLabel(hours: PackageHours) {
  return `${hours} ${hours === "2" ? "uri" : "ure"}`;
}

/** Tables are rented per day already, so only booths are multiplied. */
function eventDays(options: PricingOptions) {
  return options.service === "tables" ? 1 : Math.max(1, options.days ?? 1);
}

function transportItem(options: PricingOptions, labels: ItemLabels, days = 1): OfferItem {
  if (options.locationUnknown || options.distanceKm === null) {
    return { key: "transport", description: "Prevoz – lokacija dogodka ni znana, zato prevoz ni zaračunan", amount: null, note: "ni zaračunano" };
  }
  const trip = round(options.distanceKm * options.pricePerKm);
  const route = `Prevoz (Lenart – ${labels.place?.trim() || "lokacija"} – Lenart)`;
  if (options.service !== "tables" && options.distanceKm <= freeTransportKm) {
    return { key: "transport", description: `${route}, do ${freeTransportKm} km`, amount: null, note: "brezplačno" };
  }
  return days > 1
    ? { key: "transport", description: `${route}, vsak dan (${days} × ${eur(trip)})`, amount: round(days * trip) }
    : { key: "transport", description: route, amount: trip };
}

/** Comes after every charged item except transport, which never gets a discount. */
function discountItem(options: PricingOptions, items: OfferItem[], days: number): OfferItem[] {
  const percent = options.discountPercent ?? 0;
  const base = sumItems(items);
  if (percent <= 0 || base <= 0) return [];
  const scope = days > 1 ? ` na najem za ${daysLabel(days)}` : "";
  return [{ key: "discount", description: `Popust ${percent.toLocaleString("sl-SI")} %${scope} (brez prevoza)`, amount: -round((base * percent) / 100) }];
}

function customItems(options: PricingOptions): OfferItem[] {
  return options.customItems.flatMap((item, index) =>
    item.description.trim() ? [{ key: `custom:${index}`, description: item.description.trim(), amount: item.amount }] : []);
}

function buildTableItems(options: PricingOptions, labels: ItemLabels, variantIndex: number): OfferItem[] {
  const apply = overrider(options, variantIndex);
  const count = options.tableCount ?? 1;
  const color = options.tableclothColor ? tableclothLabels[options.tableclothColor] : "bel ali črn prt po izbiri";
  const items = apply([
    {
      key: "tables",
      description: `Najem stoječe barske mize za en dan (${count} × ${eur(tableRental.unitPrice)})`,
      amount: count * tableRental.unitPrice,
    },
    { key: "tablecloths", description: `Prti (${color})`, amount: null, note: "vključeno" },
    ...customItems(options),
  ]);
  return [
    ...items,
    ...apply(discountItem(options, items, 1)),
    ...apply([options.pickup
      ? { key: "pickup", description: "Osebni prevzem in vračilo miz po dogovoru", amount: null, note: "brez stroška" }
      : transportItem(options, labels)]),
  ];
}

export function buildOfferItems(options: PricingOptions, labels: ItemLabels = {}, variantIndex = 0): OfferItem[] {
  if (options.service === "tables") return buildTableItems(options, labels, variantIndex);
  const apply = overrider(options, variantIndex);
  const service = servicesForDate(options.eventDate)[options.service];
  const pkg = service.packages[options.hours];
  const days = eventDays(options);
  // Package, extra hours and transport repeat every day; album, QR gallery and custom items are one-off.
  const items: OfferItem[] = [days > 1
    ? { key: "package", description: `${pkg.name} – ${daysLabel(days)} (${days} × ${eur(pkg.price)})`, amount: days * pkg.price }
    : { key: "package", description: pkg.name, amount: pkg.price }];

  if (options.extraHours > 0) {
    const perDay = days > 1 ? ` na dan, ${daysLabel(days)}` : "";
    items.push({
      key: "extraHours",
      description: `Podaljšanje najema${pkg.parts ? " obeh stojnic" : ""} (${options.extraHours} × ${eur(service.extraHourPrice)} na dodatno uro${perDay})`,
      amount: days * options.extraHours * service.extraHourPrice,
    });
  }

  if (service.hasAlbum && options.albumSize) {
    const color = options.albumColor ? `, ${albumColorLabels[options.albumColor]}` : "";
    const albumPrice = getAlbumPrice(options.hours, options.albumSize);
    const label = options.albumSize === "large"
      ? Number(options.hours) >= 3 ? `Nadgradnja na veliki spominski album${color}` : `Veliki spominski album${color}`
      : `Spominski album (40 listov)${color}`;
    // An included small album is already listed in the package description.
    if (albumPrice > 0) items.push({ key: "album", description: label, amount: albumPrice });
  }

  if (options.qrGallery) {
    const promo = options.qrGalleryPromo && service.qrGalleryPrice > qrGalleryPromoPrice;
    items.push(promo
      ? { key: "qrGallery", description: `QR galerija za goste – promocijska cena (redno ${eur(service.qrGalleryPrice)})`, amount: qrGalleryPromoPrice }
      : { key: "qrGallery", description: "QR galerija za goste", amount: service.qrGalleryPrice });
  }

  items.push(...customItems(options));
  // Overrides go in before the discount, so an edited price changes the discount base too.
  const charged = apply(items);

  return [
    ...charged,
    ...apply(discountItem(options, charged, days)),
    ...apply([
      transportItem(options, labels, days),
      { key: "setup", description: "Postavitev in odstranitev opreme", amount: null, note: "vključeno" },
      { key: "staff", description: service.staffItem, amount: null, note: "vključeno" },
    ]),
  ];
}

export function sumItems(items: OfferItem[]) {
  return round(items.reduce((sum, item) => sum + (item.amount ?? 0), 0));
}

/** One variant, or two when a booth offer compares packages of different length. */
export function buildOfferVariants(options: PricingOptions, labels: ItemLabels = {}): OfferVariant[] {
  const compare = options.service !== "tables" && options.compareHours && options.compareHours !== options.hours
    ? options.compareHours
    : null;
  const hours = compare ? [options.hours, compare] : [options.hours];
  const perDay = eventDays(options) > 1 ? " na dan" : "";
  return hours.map((h, index) => {
    const items = buildOfferItems({ ...options, hours: h }, labels, index);
    return { label: compare ? `Možnost ${index + 1} – ${hoursLabel(h)}${perDay}` : "", items, total: sumItems(items) };
  });
}
