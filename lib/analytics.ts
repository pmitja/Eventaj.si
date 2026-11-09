type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** GA4 recommended event, sent once after the inquiry API confirms it was received. */
export function trackLead(params: { service: string; value?: number }) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "generate_lead", {
    currency: "EUR",
    value: params.value,
    service: params.service,
  });
}
