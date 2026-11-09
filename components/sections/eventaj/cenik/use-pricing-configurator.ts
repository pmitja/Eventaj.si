"use client";

import { photoBoothQrGalleryPrice, qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import {
  AlbumColor,
  AlbumSize,
  getAlbumPrice,
} from "@/content/eventaj/album-pricing";
import { useState } from "react";

type ConfiguratorType = "photo" | "360" | "custom";

const packagePrices = {
  photo: { 2: 299, 3: 349, 4: 399 },
  "360": { 2: 319, 3: 369, 4: 419 },
} as const;

const addonLabels = {
  qrGallery: "QR galerija dogodka",
  woodenSigns: "Personalizirane lesene tablice",
  animations360: "Personalizirane animacije za 360° Booth",
};

export function usePricingConfigurator() {
  const [hours, setHours] = useState(3);
  const [type, setType] = useState<ConfiguratorType>("photo");
  const [selectedAddons, setSelectedAddons] = useState({
    qrGallery: false,
    woodenSigns: false,
    animations360: false,
  });
  const [albumSize, setAlbumSize] = useState<AlbumSize>("small");
  const [albumColor, setAlbumColor] = useState<AlbumColor>("");

  const addonPrices = { qrGallery: type === "360" ? qrGalleryPrice : photoBoothQrGalleryPrice, woodenSigns: 40, animations360: 59 };
  // Same rule as the offer generator: 2–4 h use the package price, only hours above 4 are extra.
  const baseHours = type === "custom" ? 0 : Math.min(hours, 4);
  const basePrice = type === "custom" ? 0 : packagePrices[type][baseHours as 2 | 3 | 4];
  const hourPrice = type === "360" ? 80 : 60;
  const extraHours = type === "custom" ? 0 : Math.max(0, hours - 4);
  const albumPrice = type === "photo" ? getAlbumPrice(hours, albumSize) : 0;
  const animations360Available = type === "360";
  const rangeMin = 2;
  const rangeProgress = ((hours - rangeMin) / (8 - rangeMin)) * 100;
  const addonsTotal = Object.entries(selectedAddons)
    .filter(
      ([key, value]) => value && (key !== "animations360" || animations360Available),
    )
    .reduce(
      (sum, [key]) => sum + addonPrices[key as keyof typeof addonPrices],
      0,
    );
  const total =
    type === "custom" ? 0 : basePrice + extraHours * hourPrice + addonsTotal + albumPrice;

  const selectType = (nextType: ConfiguratorType) => {
    setType(nextType);
    if (nextType === "photo") setHours(2);
    if (nextType === "360") setHours(2);
    setAlbumSize("");
    setAlbumColor("");
    setSelectedAddons((current) => ({
      ...current,
      animations360: nextType === "360" ? current.animations360 : false,
    }));
  };

  const changeHours = (nextHours: number) => {
    setHours(nextHours);
    setAlbumSize((current) => {
      if (nextHours >= 3) return current || "small";
      return hours >= 3 && current === "small" ? "" : current;
    });
    if (nextHours === 2 && hours >= 3 && albumSize === "small") setAlbumColor("");
  };

  const selectAlbumSize = (size: AlbumSize) => {
    setAlbumSize(size);
    if (!size) setAlbumColor("");
  };

  const toggleAddon = (id: string, checked: boolean) => {
    setSelectedAddons((current) => ({ ...current, [id]: checked }));
  };

  return {
    hours,
    type,
    selectedAddons,
    albumSize,
    albumColor,
    baseHours,
    basePrice,
    hourPrice,
    extraHours,
    albumPrice,
    animations360Available,
    rangeMin,
    rangeProgress,
    addonPrices,
    addonLabels,
    total,
    selectType,
    changeHours,
    selectAlbumSize,
    setAlbumColor,
    toggleAddon,
  };
}
