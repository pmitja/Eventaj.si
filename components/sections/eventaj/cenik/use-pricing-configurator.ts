"use client";

import { photoBoothQrGalleryPrice, qrGalleryPrice } from "@/content/eventaj/qr-gallery-pricing";
import {
  AlbumColor,
  AlbumSize,
  getAlbumPrice,
} from "@/content/eventaj/album-pricing";
import { useState } from "react";

type ConfiguratorType = "photo" | "360" | "custom";

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
  const baseHours = type === "360" ? 2 : type === "photo" ? 2 : 0;
  const basePrice = type === "360" ? 299 : type === "photo" ? 279 : 0;
  const hourPrice = type === "360" ? 80 : 50;
  const extraHours = type === "custom" ? 0 : Math.max(0, hours - baseHours);
  const albumPrice = type === "photo" ? getAlbumPrice(hours, albumSize) : 0;
  const animations360Available = type === "360";
  const rangeMin = baseHours || 2;
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
