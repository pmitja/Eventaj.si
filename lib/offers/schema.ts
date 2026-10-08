import { z } from "zod";

export const offerOptionsSchema = z.object({
  service: z.enum(["photo", "360"]),
  hours: z.enum(["2", "3", "4"]),
  extraHours: z.number().int().min(0).max(12),
  albumSize: z.enum(["", "small", "large"]),
  albumColor: z.enum(["", "black", "white"]),
  qrGallery: z.boolean(),
  customItems: z
    .array(z.object({ description: z.string().trim().min(1).max(200), amount: z.number().min(-100000).max(100000) }))
    .max(20),
  locationUnknown: z.boolean(),
  distanceKm: z.number().min(0).max(2000).nullable(),
  pricePerKm: z.number().min(0).max(10),
  validityDays: z.number().int().min(1).max(90),
  instructions: z.string().max(4000),
});

export type OfferOptions = z.infer<typeof offerOptionsSchema>;

export const offerContentSchema = z.object({
  narocnik: z.object({
    naziv: z.string(),
    naslov: z.string(),
    posta: z.string(),
  }),
  dogodek: z.object({
    naziv: z.string(),
    datum: z.string(),
    cas: z.string(),
    lokacija: z.string(),
    kraj: z.string(),
  }),
  tema: z.string(),
  nagovor: z.string(),
  uvod: z.string(),
  razpolozljivost: z.string(),
  opis_storitve: z.array(z.string()),
  tematska_prilagoditev: z.array(z.string()),
  tehnicni_pogoji: z.array(z.string()),
  placilni_pogoji: z.array(z.string()),
  poziv_naslov: z.string(),
  poziv: z.string(),
  zakljucek: z.string(),
  spremno_besedilo_emaila: z.string(),
  opombe_za_pregled: z.array(z.string()),
});

export type OfferContent = z.infer<typeof offerContentSchema>;
