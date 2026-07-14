"use client";

import { FormEvent, useEffect, useState } from "react";
import { InquiryData, initialInquiryData } from "./inquiry-types";

export function useInquiryForm(
  open: boolean,
  defaults: Partial<InquiryData> = {},
) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InquiryData>(initialInquiryData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setData({ ...initialInquiryData, ...defaults });
      setSubmitted(false);
      setError("");
    }
  }, [open, defaults]);

  const update = (key: keyof InquiryData, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const canNext = () => {
    if (step === 1) {
      if (data.type === "Oprema za dogodke") {
        return Boolean(
          data.type &&
            data.eventType &&
            data.product &&
            data.quantity &&
            data.tableclothColor,
        );
      }
      return Boolean(data.type && data.eventType);
    }
    if (step === 2) {
      return Boolean(
        data.date &&
          data.location &&
          (data.type !== "Oprema za dogodke" || data.fulfillment),
      );
    }
    return Boolean(data.name && data.email && data.phone);
  };

  const back = (onClose: () => void) =>
    step > 1 ? setStep((value) => value - 1) : onClose();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canNext()) return;
    if (step < 3) {
      setStep((value) => value + 1);
      return;
    }

    try {
      setLoading(true);
      const serviceType =
        data.type === "360° Booth"
          ? "360"
          : data.type === "Oba"
            ? "both"
            : data.type === "Oprema za dogodke"
              ? "equipment"
              : "basic";
      const quantity = Math.min(15, Math.max(1, Number(data.quantity) || 1));
      const totalPrice =
        serviceType === "360"
          ? 299
          : serviceType === "basic"
            ? 279
            : serviceType === "equipment"
              ? quantity * 10
              : 0;
      const hours = serviceType === "equipment" ? "1 dan" : serviceType === "360" || serviceType === "basic" ? "2" : "po meri";
      const message = [
        data.notes,
        data.eventType ? `Tip dogodka: ${data.eventType}` : "",
        data.guests ? `Število gostov: ${data.guests}` : "",
        data.type === "Oba" ? "Storitev: Photo Booth + 360° Booth po meri" : "",
        serviceType === "equipment" ? `Izdelek: ${data.product}` : "",
        serviceType === "equipment" ? `Količina: ${quantity}` : "",
        serviceType === "equipment" ? `Prt: ${data.tableclothColor}` : "",
        serviceType === "equipment" ? `Prevzem/dostava: ${data.fulfillment}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: {
            type: serviceType,
            hours,
            name: data.name,
            email: data.email,
            phone: data.phone,
            location: data.location,
            date: data.date,
            message,
            eventType: data.eventType,
            guests: data.guests,
            product: serviceType === "equipment" ? data.product : undefined,
            quantity: serviceType === "equipment" ? String(quantity) : undefined,
            tableclothColor: serviceType === "equipment" ? data.tableclothColor : undefined,
            fulfillment: serviceType === "equipment" ? data.fulfillment : undefined,
          },
          totalPrice,
        }),
      });

      if (!response.ok) throw new Error("Pošiljanje ni uspelo");
      setSubmitted(true);
    } catch {
      setError("Pri pošiljanju je prišlo do napake. Poskusite ponovno ali nas pokličite.");
    } finally {
      setLoading(false);
    }
  };

  return { step, data, submitted, loading, error, update, canNext, back, submit };
}
