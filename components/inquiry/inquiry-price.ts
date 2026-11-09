export type InquiryServiceType = "360" | "basic" | "both" | "equipment";

const servicePrices = {
  basic: { "2": 299, "3": 349, "4": 399 },
  "360": { "2": 319, "3": 369, "4": 419 },
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
