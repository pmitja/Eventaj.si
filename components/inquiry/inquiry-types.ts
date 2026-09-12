import type { AlbumColor, AlbumSize } from "@/content/eventaj/album-pricing";

export type EquipmentSelection = {
  productId: string;
  quantity: number;
  options?: string;
};

export type InquiryData = {
  type: string;
  hours: string;
  qrGallery: boolean;
  albumSize: AlbumSize;
  albumColor: AlbumColor;
  eventType: string;
  date: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  product: string;
  quantity: string;
  tableclothColor: string;
  fulfillment: string;
  estimatedPrice: string;
  equipmentSelections: EquipmentSelection[];
};

export const initialInquiryData: InquiryData = {
  type: "",
  hours: "",
  qrGallery: false,
  albumSize: "",
  albumColor: "",
  eventType: "",
  date: "",
  location: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
  product: "",
  quantity: "1",
  tableclothColor: "Bel prt",
  fulfillment: "",
  estimatedPrice: "",
  equipmentSelections: [],
};
