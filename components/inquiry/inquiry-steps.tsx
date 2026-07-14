import { SlovenianDatePicker } from "@/components/ui/slovenian-date-picker";
import { standingTable } from "@/content/eventaj/equipment";
import { Field, PillGrid } from "./inquiry-fields";
import { InquiryData } from "./inquiry-types";

type StepProps = {
  data: InquiryData;
  update: (key: keyof InquiryData, value: string) => void;
};

export function InquiryStepService({ data, update }: StepProps) {
  return (
    <div className="grid gap-6">
      <Field label="Izberi storitev">
        <PillGrid
          columns="grid-cols-2"
          items={["Photo Booth", "360° Booth", "Oba", "Oprema za dogodke"]}
          value={data.type}
          onChange={(value) => {
            update("type", value);
            if (value === "Oprema za dogodke") {
              update("product", standingTable.name);
            }
          }}
        />
      </Field>
      {data.type === "Oprema za dogodke" && (
        <div className="grid gap-5 border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] p-5">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">Izdelek</div>
            <div className="mt-2 flex items-center justify-between gap-5">
              <strong className="font-serif-display text-2xl font-normal">{standingTable.name}</strong>
              <span className="text-sm font-medium">10 € / dan</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[0.65fr_1.35fr]">
            <Field label="Količina (1–15)">
              <input
                type="number"
                min={1}
                max={standingTable.available}
                value={data.quantity}
                onChange={(event) =>
                  update(
                    "quantity",
                    String(
                      Math.min(
                        standingTable.available,
                        Math.max(1, Number(event.target.value) || 1),
                      ),
                    ),
                  )
                }
                className="eventaj-input"
                aria-label="Število stoječih miz"
              />
            </Field>
            <Field label="Barva prta">
              <PillGrid
                columns="grid-cols-2"
                items={[...standingTable.clothColors]}
                value={data.tableclothColor}
                onChange={(value) => update("tableclothColor", value)}
              />
            </Field>
          </div>
          <div className="flex items-end justify-between border-t border-[rgba(20,17,15,0.1)] pt-4">
            <span className="text-xs text-[var(--eventaj-muted)]">Informativna cena najema</span>
            <strong className="font-serif-display text-3xl font-normal">{(Number(data.quantity) || 1) * standingTable.price} €</strong>
          </div>
        </div>
      )}
      <Field label="Tip dogodka">
        <PillGrid
          columns="md:grid-cols-2"
          items={[
            "Poroka",
            "Poslovni dogodek",
            "Rojstni dan",
            "Zasebna zabava",
            "Maturantski ples",
            "Drugi dogodek",
          ]}
          value={data.eventType}
          onChange={(value) => update("eventType", value)}
        />
      </Field>
    </div>
  );
}

export function InquiryStepDetails({ data, update }: StepProps) {
  return (
    <div className="grid gap-6">
      <Field label="Datum dogodka">
        <SlovenianDatePicker
          value={data.date}
          onChange={(value) => update("date", value)}
          required
        />
      </Field>
      <Field label="Kraj dogodka">
        <input
          type="text"
          placeholder="npr. Ljubljana"
          value={data.location}
          onChange={(event) => update("location", event.target.value)}
          className="eventaj-input"
          required
        />
      </Field>
      {data.type === "Oprema za dogodke" && (
        <Field label="Način prevzema">
          <PillGrid
            columns="grid-cols-2"
            items={[
              "Osebni prevzem",
              `Dostava do ${standingTable.delivery.maxDistanceKm} km · ${standingTable.delivery.priceLabel}`,
            ]}
            value={data.fulfillment}
            onChange={(value) => update("fulfillment", value)}
          />
          <p className="mt-3 text-xs leading-relaxed text-[var(--eventaj-muted)]">
            Končno razdaljo in strošek dostave potrdimo v ponudbi.
          </p>
        </Field>
      )}
      <Field label="Predvideno število gostov (opcijsko)">
        <PillGrid
          columns="grid-cols-2 md:grid-cols-4"
          items={["<50", "50-100", "100-200", "200+"]}
          value={data.guests}
          onChange={(value) => update("guests", value)}
        />
      </Field>
    </div>
  );
}

export function InquiryStepContact({ data, update }: StepProps) {
  return (
    <div className="grid gap-6">
      <Field label="Ime in priimek">
        <input
          type="text"
          value={data.name}
          onChange={(event) => update("name", event.target.value)}
          className="eventaj-input"
          required
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="E-pošta">
          <input
            type="email"
            value={data.email}
            onChange={(event) => update("email", event.target.value)}
            className="eventaj-input"
            required
          />
        </Field>
        <Field label="Telefon">
          <input
            type="tel"
            value={data.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="eventaj-input"
            required
          />
        </Field>
      </div>
      <Field label="Dodatne informacije (opcijsko)">
        <textarea
          rows={3}
          placeholder="Npr. želena postavitev, personalizacija, dodatne ure ali posebne želje."
          value={data.notes}
          onChange={(event) => update("notes", event.target.value)}
          className="eventaj-input resize-y"
        />
      </Field>
    </div>
  );
}
