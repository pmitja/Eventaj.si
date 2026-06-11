"use client";

import { FormEvent, useEffect, useState } from "react";
import { InquiryData, initialInquiryData } from "./inquiry-types";

export function useInquiryForm(open: boolean) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InquiryData>(initialInquiryData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitted(false);
      setError("");
    }
  }, [open]);

  const update = (key: keyof InquiryData, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const canNext = () => {
    if (step === 1) return Boolean(data.type && data.eventType);
    if (step === 2) return Boolean(data.date && data.location);
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
            : "basic";
      const totalPrice = serviceType === "360" ? 299 : serviceType === "basic" ? 279 : 0;
      const hours = serviceType === "360" || serviceType === "basic" ? "2" : "po meri";
      const message = [
        data.notes,
        data.eventType ? `Tip dogodka: ${data.eventType}` : "",
        data.guests ? `Število gostov: ${data.guests}` : "",
        data.type === "Oba" ? "Storitev: Photo Booth + 360° Booth po meri" : "",
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
