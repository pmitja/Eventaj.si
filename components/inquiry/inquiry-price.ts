export type InquiryServiceType = "360" | "basic" | "both" | "equipment";

const servicePrices = {
  basic: { "2": 279, "3": 329, "4": 379 },
  "360": { "2": 299, "3": 349, "4": 399 },
} as const;

export function calculateInquiryPrice(
  serviceType: InquiryServiceType,
  hours: string,
  quantity: number,
) {
  if (serviceType === "equipment") return quantity * 10;
  if (serviceType === "both") return 0;

  return servicePrices[serviceType][
    hours as keyof (typeof servicePrices)[typeof serviceType]
  ] ?? 0;
}
