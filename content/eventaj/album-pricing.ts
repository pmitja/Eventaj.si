export type AlbumSize = "" | "small" | "large";
export type AlbumColor = "" | "black" | "white";

export const albumSizeLabels = {
  small: "Mali album",
  large: "Veliki album",
} as const;

export const albumColorLabels = {
  black: "črn",
  white: "bel",
} as const;

export function isSmallAlbumIncluded(hours: string | number) {
  return Number(hours) >= 3;
}

export function getAlbumPrice(hours: string | number, size: AlbumSize) {
  if (!size) return 0;

  if (size === "small") {
    return isSmallAlbumIncluded(hours) ? 0 : 20;
  }

  return isSmallAlbumIncluded(hours) ? 15 : 30;
}

export function getAlbumPriceLabel(hours: string | number, size: Exclude<AlbumSize, "">) {
  const price = getAlbumPrice(hours, size);
  return price === 0 ? "vključen" : `+${price} €`;
}
