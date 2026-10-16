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
  "Predplačilo v višini 30 % ob potrditvi rezervacije, preostali znesek najkasneje 72 ur pred začetkom dogodka. Plačilo z bančnim nakazilom.";

// Keep in sync with app/pogoji-uporabe (3. Odpoved ali sprememba rezervacije).
export const cancellationPolicy = [
  "Odpoved več kot 14 dni pred dogodkom: vračilo celotnega predplačila.",
  "Odpoved 7–14 dni pred dogodkom: vračilo 50 % predplačila.",
  "Odpoved manj kot 7 dni pred dogodkom: predplačilo se ne vrača.",
  "Sprememba termina je možna brez dodatnih stroškov najmanj 14 dni pred dogodkom, če je novi termin prost. Kasnejše spremembe termina se obravnavajo kot odpoved rezervacije.",
];
