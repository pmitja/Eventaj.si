import { equipmentProducts } from "@/content/eventaj/equipment";

// Artikli on the Oprema sheet: everything from /oprema-za-dogodke plus QR galerija, which is sold
// on its own and is not an event either. Rows can still hold any other typed name.
export const QR_GALLERY_ITEM = "QR galerija";

export function equipmentItems() {
  return [...equipmentProducts.map((product) => product.name), QR_GALLERY_ITEM];
}
