import { albumColorLabels, getAlbumPrice, type AlbumColor, type AlbumSize } from "@/content/eventaj/album-pricing";
import { services, tableclothLabels, tableRental, type OfferService, type PackageHours, type TableclothColor } from "./services";

export type { OfferService, PackageHours } from "./services";

export const defaultPricePerKm = 0.4;
export const qrGalleryPromoPrice = 25;

export type CustomItem = { description: string; amount: number };

export type PricingOptions = {
  service: OfferService;
  hours: PackageHours;
  extraHours: number;
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
};

export type OfferItem = {
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

function transportItem(options: PricingOptions, labels: ItemLabels): OfferItem {
  if (options.locationUnknown || options.distanceKm === null) {
    return { description: "Prevoz – lokacija dogodka ni znana, zato prevoz ni zaračunan", amount: null, note: "ni zaračunano" };
  }
  return {
    description: `Prevoz (Lenart – ${labels.place?.trim() || "lokacija"} – Lenart)`,
    amount: Math.round(options.distanceKm * options.pricePerKm * 100) / 100,
  };
}

function customItems(options: PricingOptions): OfferItem[] {
  return options.customItems
    .filter((item) => item.description.trim())
    .map((item) => ({ description: item.description.trim(), amount: item.amount }));
}

function buildTableItems(options: PricingOptions, labels: ItemLabels): OfferItem[] {
  const count = options.tableCount ?? 1;
  const color = options.tableclothColor ? tableclothLabels[options.tableclothColor] : "bel ali črn prt po izbiri";
  return [
    {
      description: `Najem stoječe barske mize za en dan (${count} × ${eur(tableRental.unitPrice)})`,
      amount: count * tableRental.unitPrice,
    },
    { description: `Prti (${color})`, amount: null, note: "vključeno" },
    ...customItems(options),
    options.pickup
      ? { description: "Osebni prevzem in vračilo miz po dogovoru", amount: null, note: "brez stroška" }
      : transportItem(options, labels),
  ];
}

export function buildOfferItems(options: PricingOptions, labels: ItemLabels = {}): OfferItem[] {
  if (options.service === "tables") return buildTableItems(options, labels);
  const service = services[options.service];
  const pkg = service.packages[options.hours];
  const items: OfferItem[] = [{ description: pkg.name, amount: pkg.price }];

  if (options.extraHours > 0) {
    items.push({
      description: `Podaljšanje najema${pkg.parts ? " obeh stojnic" : ""} (${options.extraHours} × ${eur(service.extraHourPrice)} na dodatno uro)`,
      amount: options.extraHours * service.extraHourPrice,
    });
  }

  if (service.hasAlbum && options.albumSize) {
    const color = options.albumColor ? `, ${albumColorLabels[options.albumColor]}` : "";
    const albumPrice = getAlbumPrice(options.hours, options.albumSize);
    const label = options.albumSize === "large"
      ? Number(options.hours) >= 3 ? `Nadgradnja na veliki spominski album${color}` : `Veliki spominski album${color}`
      : `Spominski album (40 listov)${color}`;
    // An included small album is already listed in the package description.
    if (albumPrice > 0) items.push({ description: label, amount: albumPrice });
  }

  if (options.qrGallery) {
    const promo = options.qrGalleryPromo && service.qrGalleryPrice > qrGalleryPromoPrice;
    items.push(promo
      ? { description: `QR galerija za goste – promocijska cena (redno ${eur(service.qrGalleryPrice)})`, amount: qrGalleryPromoPrice }
      : { description: "QR galerija za goste", amount: service.qrGalleryPrice });
  }

  items.push(...customItems(options), transportItem(options, labels));

  items.push(
    { description: "Postavitev in odstranitev opreme", amount: null, note: "vključeno" },
    { description: service.staffItem, amount: null, note: "vključeno" },
  );

  return items;
}

export function sumItems(items: OfferItem[]) {
  return Math.round(items.reduce((sum, item) => sum + (item.amount ?? 0), 0) * 100) / 100;
}
