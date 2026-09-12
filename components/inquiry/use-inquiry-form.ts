"use client";

import { FormEvent, useEffect, useState } from "react";
import { calculateInquiryPrice } from "./inquiry-price";
import { getAlbumPrice } from "@/content/eventaj/album-pricing";
import { photoBoothQrGalleryPrice, qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import { equipmentProducts } from "@/content/eventaj/equipment";
import { EquipmentSelection, InquiryData, initialInquiryData } from "./inquiry-types";

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
      const defaultProduct = equipmentProducts.find((product) => product.name === defaults.product);
      const defaultEquipment: EquipmentSelection[] = defaults.equipmentSelections
        ?? (defaultProduct
          ? [{
              productId: defaultProduct.id,
              quantity: Number(defaults.quantity) || defaultProduct.quantity?.defaultValue || 1,
              options: defaults.tableclothColor,
            }]
          : []);
      setStep(1);
      const nextData = { ...initialInquiryData, ...defaults, equipmentSelections: defaultEquipment };
      if (
        nextData.type === "Photo Booth" &&
        Number(nextData.hours) >= 3 &&
        !nextData.albumSize
      ) {
        nextData.albumSize = "small";
      }
      setData(nextData);
      setSubmitted(false);
      setError("");
    }
  }, [open, defaults]);

  const update = <K extends keyof InquiryData>(key: K, value: InquiryData[K]) => {
    setData((current) => {
      const next = { ...current, [key]: value };

      if (key === "type") {
        if (value !== "Photo Booth") {
          next.albumSize = "";
          next.albumColor = "";
        } else if (Number(next.hours) >= 3 && !next.albumSize) {
          next.albumSize = "small";
        }
        if (value === "Oprema za dogodke") next.qrGallery = false;
      }

      if (key === "hours" && next.type === "Photo Booth") {
        const previousHours = Number(current.hours);
        const nextHours = Number(value);
        if (nextHours >= 3 && !next.albumSize) next.albumSize = "small";
        if (nextHours === 2 && previousHours >= 3 && current.albumSize === "small") {
          next.albumSize = "";
          next.albumColor = "";
        }
      }

      if (key === "albumSize" && !value) next.albumColor = "";

      return next;
    });
    setError("");
  };

  const canNext = () => {
    if (step === 1) {
      if (data.type === "Oprema za dogodke") {
        return Boolean(
          data.type &&
            data.eventType &&
            data.equipmentSelections.length > 0,
        );
      }
      return Boolean(
        data.type &&
          data.hours &&
          data.eventType &&
          (!data.albumSize || data.albumColor),
      );
    }
    if (step === 2) {
      return Boolean(data.date && data.location);
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
      const equipmentTotal = data.equipmentSelections.reduce((sum, selection) => {
        const product = equipmentProducts.find((item) => item.id === selection.productId);
        if (!product) return sum;
        const unitPrice = product.quantityTiers?.reduce(
          (price, tier) => selection.quantity >= tier.min ? tier.unitPrice : price,
          product.price,
        ) ?? product.price;
        return sum + unitPrice * selection.quantity;
      }, 0);
      const boothPrice = serviceType === "equipment"
        ? 0
        : calculateInquiryPrice(serviceType, data.hours, 1);
      const qrGallery = data.qrGallery && serviceType !== "equipment";
      const qrGalleryAddonPrice = qrGallery
        ? serviceType === "360" ? qrGalleryPrice : photoBoothQrGalleryPrice
        : 0;
      const albumPrice = serviceType === "basic"
        ? getAlbumPrice(data.hours, data.albumSize)
        : 0;
      const totalPrice = boothPrice + equipmentTotal + qrGalleryAddonPrice + albumPrice;
      const hours = serviceType === "equipment" ? "1 dan" : data.hours;
      const equipmentSummary = data.equipmentSelections.map((selection) => {
        const product = equipmentProducts.find((item) => item.id === selection.productId);
        if (!product) return "";
        return `${product.name}: ${selection.quantity}${selection.options ? `, ${selection.options}` : ""}`;
      }).filter(Boolean).join("\n");
      const selectedProducts = data.equipmentSelections
        .map((selection) => equipmentProducts.find((product) => product.id === selection.productId))
        .filter(Boolean);
      const needsPost = selectedProducts.some((product) => product?.fulfillmentMode === "post");
      const needsTransport = selectedProducts.some((product) => product?.fulfillmentMode === "transport");
      const fulfillment = needsPost && needsTransport
        ? "Po pošti in s prevozom na lokacijo"
        : needsTransport
          ? "Prevoz na lokacijo"
          : needsPost
            ? "Pošiljanje po pošti"
            : "";
      const message = [
        data.notes,
        data.eventType ? `Tip dogodka: ${data.eventType}` : "",
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
            qrGallery,
            albumSize: serviceType === "basic" ? data.albumSize || undefined : undefined,
            albumColor: serviceType === "basic" ? data.albumColor || undefined : undefined,
            equipmentSummary: equipmentSummary || undefined,
            fulfillment: fulfillment || undefined,
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
