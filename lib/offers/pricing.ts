import { albumColorLabels, getAlbumPrice, type AlbumColor, type AlbumSize } from "@/content/eventaj/album-pricing";
import { services, type OfferService, type PackageHours } from "./services";

export type { OfferService, PackageHours } from "./services";

export const defaultPricePerKm = 0.4;

export type CustomItem = { description: string; amount: number };

export type PricingOptions = {
  service: OfferService;
  hours: PackageHours;
  extraHours: number;
  albumSize: AlbumSize;
  albumColor: AlbumColor;
  qrGallery: boolean;
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

export function buildOfferItems(options: PricingOptions, labels: ItemLabels = {}): OfferItem[] {
  const service = services[options.service];
  const pkg = service.packages[options.hours];
  const items: OfferItem[] = [{ description: pkg.name, amount: pkg.price }];

  if (options.extraHours > 0) {
    items.push({
      description: `Podaljšanje najema (${options.extraHours} × ${eur(service.extraHourPrice)} na dodatno uro)`,
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
    items.push({ description: "QR galerija za goste", amount: service.qrGalleryPrice });
  }

  for (const item of options.customItems) {
    if (item.description.trim()) items.push({ description: item.description.trim(), amount: item.amount });
  }

  if (options.locationUnknown || options.distanceKm === null) {
    items.push({ description: "Prevoz – lokacija dogodka ni znana, zato prevoz ni zaračunan", amount: null, note: "ni zaračunano" });
  } else {
    items.push({
      description: `Prevoz (Lenart – ${labels.place?.trim() || "lokacija"} – Lenart)`,
      amount: Math.round(options.distanceKm * options.pricePerKm * 100) / 100,
    });
  }

  items.push(
    { description: "Postavitev in odstranitev opreme", amount: null, note: "vključeno" },
    { description: service.staffItem, amount: null, note: "vključeno" },
  );

  return items;
}

export function sumItems(items: OfferItem[]) {
  return Math.round(items.reduce((sum, item) => sum + (item.amount ?? 0), 0) * 100) / 100;
}
