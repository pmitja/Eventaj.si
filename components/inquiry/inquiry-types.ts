export type InquiryData = {
  type: string;
  eventType: string;
  date: string;
  location: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  product: string;
  quantity: string;
  tableclothColor: string;
  fulfillment: string;
};

export const initialInquiryData: InquiryData = {
  type: "",
  eventType: "",
  date: "",
  location: "",
  guests: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
  product: "",
  quantity: "1",
  tableclothColor: "Bel prt",
  fulfillment: "",
};
