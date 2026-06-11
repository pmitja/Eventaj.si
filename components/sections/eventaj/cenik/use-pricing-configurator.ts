"use client";

import { useState } from "react";

type ConfiguratorType = "photo" | "360" | "custom";

const addonPrices = { album: 20, woodenSigns: 40, animations360: 59 };
const addonLabels = {
  album: "Album",
  woodenSigns: "Personalizirane lesene tablice",
  animations360: "Personalizirane animacije za 360° Booth",
};

export function usePricingConfigurator() {
  const [hours, setHours] = useState(3);
  const [type, setType] = useState<ConfiguratorType>("photo");
  const [selectedAddons, setSelectedAddons] = useState({
    album: false,
    woodenSigns: false,
    animations360: false,
  });

  const baseHours = type === "360" ? 2 : type === "photo" ? 2 : 0;
  const basePrice = type === "360" ? 299 : type === "photo" ? 279 : 0;
  const hourPrice = type === "360" ? 80 : 50;
  const extraHours = type === "custom" ? 0 : Math.max(0, hours - baseHours);
  const albumAvailable = type === "photo" && hours === 2;
  const animations360Available = type === "360";
  const rangeMin = baseHours || 2;
  const rangeProgress = ((hours - rangeMin) / (8 - rangeMin)) * 100;
  const addonsTotal = Object.entries(selectedAddons)
    .filter(
      ([key, value]) =>
        value &&
        (key !== "album" || albumAvailable) &&
        (key !== "animations360" || animations360Available),
    )
    .reduce(
      (sum, [key]) => sum + addonPrices[key as keyof typeof addonPrices],
      0,
    );
  const total =
    type === "custom" ? 0 : basePrice + extraHours * hourPrice + addonsTotal;

  const selectType = (nextType: ConfiguratorType) => {
    setType(nextType);
    if (nextType === "photo") setHours(2);
    if (nextType === "360") setHours(2);
    setSelectedAddons((current) => ({
      ...current,
      album: nextType === "photo" ? current.album : false,
      animations360: nextType === "360" ? current.animations360 : false,
    }));
  };

  const changeHours = (nextHours: number) => {
    setHours(nextHours);
    if (nextHours !== 2) {
      setSelectedAddons((current) => ({ ...current, album: false }));
    }
  };

  const toggleAddon = (id: string, checked: boolean) => {
    setSelectedAddons((current) => ({ ...current, [id]: checked }));
  };

  return {
    hours,
    type,
    selectedAddons,
    baseHours,
    basePrice,
    hourPrice,
    extraHours,
    albumAvailable,
    animations360Available,
    rangeMin,
    rangeProgress,
    addonPrices,
    addonLabels,
    total,
    selectType,
    changeHours,
    toggleAddon,
  };
}
