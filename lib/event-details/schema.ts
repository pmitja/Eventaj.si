import { z } from "zod";
import { getAlbumPrice, type AlbumColor, type AlbumSize } from "@/content/eventaj/album-pricing";

export const eventTypes = ["Rojstni dan", "Poroka", "Zaključek", "Drugo"] as const;
export const durations = ["2", "3", "4"] as const;

export const albumOptions = [
  { size: "small", color: "white", label: "Mali beli album", photos: "40 fotografij" },
  { size: "small", color: "black", label: "Mali črni album", photos: "40 fotografij" },
  { size: "large", color: "white", label: "Veliki beli album", photos: "80 fotografij" },
  { size: "large", color: "black", label: "Veliki črni album", photos: "80 fotografij" },
] as const satisfies readonly { size: AlbumSize; color: AlbumColor; label: string; photos: string }[];

export function albumLabel(size: AlbumSize, color: AlbumColor) {
  return albumOptions.find((option) => option.size === size && option.color === color)?.label ?? "";
}

export function albumPriceLabel(hours: string, size: Exclude<AlbumSize, "">) {
  if (!hours) return size === "large" ? "2 h: +30 €\n3–4 h: +15 €" : "2 h: +20 €\n3–4 h: v ceni";
  const price = getAlbumPrice(hours, size);
  return price === 0 ? "v ceni najema" : `doplačilo ${price} €`;
}

const text = (max: number) => z.string().trim().max(max, "Besedilo je predolgo.");

export const eventDetailsSchema = z
  .object({
    location: text(300).min(1, "Vpišite lokacijo dogodka."),
    eventType: z.enum(eventTypes, { error: "Izberite vrsto dogodka." }),
    eventTypeOther: text(200),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "Vpišite uro pričetka."),
    hours: z.enum(durations, { error: "Izberite trajanje najema." }),
    contactName: text(200).min(1, "Vpišite ime kontaktne osebe."),
    contactPhone: text(60).min(1, "Vpišite telefonsko številko."),
    album: z.enum(["", "yes", "no"]),
    albumSize: z.enum(["", "small", "large"]),
    albumColor: z.enum(["", "black", "white"]),
    frameIdea: text(3000),
    background: text(300),
  })
  .superRefine((data, ctx) => {
    if (data.eventType === "Drugo" && !data.eventTypeOther) {
      ctx.addIssue({ code: "custom", path: ["eventTypeOther"], message: "Napišite, kakšen dogodek je." });
    }
    if (data.album === "yes" && (!data.albumSize || !data.albumColor)) {
      ctx.addIssue({ code: "custom", path: ["albumSize"], message: "Izberite album." });
    }
  });

export type EventDetails = z.infer<typeof eventDetailsSchema>;
export type EventDetailsDraft = Omit<EventDetails, "eventType" | "hours"> & {
  eventType: EventDetails["eventType"] | "";
  hours: EventDetails["hours"] | "";
};

export function eventTypeText(data: Pick<EventDetails, "eventType" | "eventTypeOther">) {
  return data.eventType === "Drugo" && data.eventTypeOther ? `Drugo – ${data.eventTypeOther}` : data.eventType;
}

export function albumText(data: Pick<EventDetails, "album" | "albumSize" | "albumColor" | "hours">) {
  if (data.album === "no") return "Ne";
  if (data.album !== "yes" || !data.albumSize) return "";
  const option = albumOptions.find((item) => item.size === data.albumSize && item.color === data.albumColor);
  return option ? `${option.label} (${option.photos}, ${albumPriceLabel(data.hours, data.albumSize)})` : "Da";
}
