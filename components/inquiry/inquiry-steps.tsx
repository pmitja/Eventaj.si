import { SlovenianDatePicker } from "@/components/ui/slovenian-date-picker";
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
          columns="md:grid-cols-3"
          items={["Photo Booth", "360° Booth", "Oba"]}
          value={data.type}
          onChange={(value) => update("type", value)}
        />
      </Field>
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
