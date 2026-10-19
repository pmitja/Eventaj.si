// Podatki ponudnika na PDF ponudbi. Manjkajoče vrednosti izpolni ročno.
export const company = {
  name: "Mitja Pak s.p., Mipa",
  address: "Slomškova ulica 1",
  postal: "2230 Lenart",
  taxNumber: "", // Davčna številka
  registrationNumber: "", // Matična številka
  iban: "", // TRR
  bank: "",
  phone: "+386 31 285 143",
  email: "info@eventaj.si",
  web: "eventaj.si",
};

export const vatNote =
  "DDV ni obračunan na podlagi 1. odstavka 94. člena Zakona o davku na dodano vrednost (ZDDV-1). Ponudnik ni zavezanec za DDV.";

export const defaultPaymentTerms =
  "Celoten znesek se poravna najkasneje 72 ur pred začetkom dogodka. Plačilo z bančnim nakazilom.";

// No deposit, so nothing to refund: the offer only states the rule for moving the date.
export const cancellationPolicy = [
  "Sprememba termina je možna brez dodatnih stroškov najmanj 14 dni pred dogodkom, če je novi termin prost. Kasnejše spremembe termina se obravnavajo kot odpoved rezervacije.",
];
