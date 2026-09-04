import { SlovenianDatePicker } from "@/components/ui/slovenian-date-picker";
import { equipmentProducts } from "@/content/eventaj/equipment";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Field, PillGrid } from "./inquiry-fields";
import { EquipmentSelection, InquiryData } from "./inquiry-types";

type StepProps = {
  data: InquiryData;
  update: <K extends keyof InquiryData>(key: K, value: InquiryData[K]) => void;
};

function equipmentPrice(selection: EquipmentSelection) {
  const product = equipmentProducts.find((item) => item.id === selection.productId);
  if (!product) return 0;

  const unitPrice = product.quantityTiers?.reduce(
    (price, tier) => selection.quantity >= tier.min ? tier.unitPrice : price,
    product.price,
  ) ?? product.price;

  return unitPrice * selection.quantity;
}

function EquipmentPicker({
  selections,
  onChange,
  onClose,
}: {
  selections: EquipmentSelection[];
  onChange: (selections: EquipmentSelection[]) => void;
  onClose: () => void;
}) {
  function setQuantity(productId: string, value: number) {
    const product = equipmentProducts.find((item) => item.id === productId);
    if (!product) return;

    const minimum = product.quantity?.min ?? 1;
    const maximum = product.quantity?.max ?? 1;
    const quantity = Math.min(maximum, Math.max(minimum, Math.trunc(value) || minimum));
    const current = selections.find((item) => item.productId === productId);

    onChange(current
      ? selections.map((item) => item.productId === productId ? { ...item, quantity } : item)
      : [...selections, { productId, quantity }]);
  }

  function remove(productId: string) {
    onChange(selections.filter((item) => item.productId !== productId));
  }

  const total = selections.reduce((sum, selection) => sum + equipmentPrice(selection), 0);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(20,17,15,0.68)] p-3 backdrop-blur-sm md:p-6"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="equipment-picker-title"
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[760px] overflow-auto rounded-[4px] bg-[var(--eventaj-paper)] p-5 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.55)] md:p-10"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(20,17,15,0.15)] text-xl"
          aria-label="Zapri izbiro opreme"
        >
          ×
        </button>
        <div className="pr-12">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-accent)]">
            Oprema za dogodke
          </div>
          <h4 id="equipment-picker-title" className="mt-2 font-serif-display text-3xl font-normal md:text-4xl">
            Kaj potrebuješ in koliko?
          </h4>
          <p className="mt-2 text-sm text-[var(--eventaj-muted)]">
            Izberi enega ali več izdelkov. Količine lahko pozneje še uskladimo.
          </p>
        </div>

        <div className="mt-7 grid gap-3">
          {equipmentProducts.map((product) => {
            const selection = selections.find((item) => item.productId === product.id);
            const selected = Boolean(selection);
            const defaultQuantity = product.quantity?.defaultValue ?? 1;

            return (
              <div
                key={product.id}
                className={cn(
                  "grid gap-4 border p-4 transition-colors sm:grid-cols-[1fr_auto] sm:items-center",
                  selected
                    ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-paper-2)]"
                    : "border-[rgba(20,17,15,0.13)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => selected ? remove(product.id) : setQuantity(product.id, defaultQuantity)}
                  className="text-left"
                  aria-pressed={selected}
                >
                  <span className="block font-medium text-[var(--eventaj-ink)]">{product.name}</span>
                  <span className="mt-1 block text-xs text-[var(--eventaj-muted)]">
                    {product.priceLabel} {product.priceSubtitle}
                  </span>
                </button>

                {selected ? (
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <label className="text-xs text-[var(--eventaj-muted)]" htmlFor={`equipment-${product.id}`}>
                      Količina
                    </label>
                    <input
                      id={`equipment-${product.id}`}
                      type="number"
                      min={product.quantity?.min ?? 1}
                      max={product.quantity?.max ?? 1}
                      step="1"
                      inputMode="numeric"
                      value={selection?.quantity ?? defaultQuantity}
                      onChange={(event) => setQuantity(product.id, Number(event.target.value))}
                      className="h-11 w-24 border border-[rgba(20,17,15,0.2)] bg-white px-3 text-center text-sm outline-none focus:border-[var(--eventaj-ink)]"
                    />
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="px-2 py-2 text-xs underline decoration-[rgba(20,17,15,0.35)] underline-offset-4"
                    >
                      Odstrani
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setQuantity(product.id, defaultQuantity)}
                    className="rounded-full border border-[var(--eventaj-ink)] px-4 py-2 text-xs font-medium"
                  >
                    Dodaj
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 mt-6 flex items-center justify-between gap-4 border-t border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper)] py-4">
          <div>
            <span className="block text-xs text-[var(--eventaj-muted)]">
              Izbranih izdelkov: {selections.length}
            </span>
            {total > 0 && <strong className="font-serif-display text-2xl font-normal">okvirno {total.toFixed(2).replace(".00", "").replace(".", ",")} €</strong>}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={selections.length === 0}
            className="rounded-full bg-[var(--eventaj-ink)] px-6 py-3.5 text-sm font-medium text-[var(--eventaj-paper)] disabled:cursor-not-allowed disabled:bg-[rgba(20,17,15,0.2)]"
          >
            Potrdi izbiro
          </button>
        </div>
      </div>
    </div>
  );
}

export function InquiryStepService({ data, update }: StepProps) {
  const [equipmentPickerOpen, setEquipmentPickerOpen] = useState(false);
  const hasEquipment = data.equipmentSelections.length > 0;
  const equipmentTotal = data.equipmentSelections.reduce(
    (sum, selection) => sum + equipmentPrice(selection),
    0,
  );

  function openEquipmentPicker() {
    setEquipmentPickerOpen(true);
  }

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
              openEquipmentPicker();
            }
          }}
        />
      </Field>
      {data.type && data.type !== "Oprema za dogodke" && (
        <Field label="Število ur">
          <PillGrid
            columns="grid-cols-3"
            items={["2", "3", "4"]}
            value={data.hours}
            onChange={(value) => update("hours", value)}
          />
        </Field>
      )}
      {data.type && data.type !== "Oprema za dogodke" && (
        <div className="border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <strong className="block text-sm font-medium">
                {hasEquipment ? "Oprema je dodana" : "Potrebuješ tudi opremo?"}
              </strong>
              <span className="mt-1 block text-xs text-[var(--eventaj-muted)]">
                {hasEquipment
                  ? `Izbranih izdelkov: ${data.equipmentSelections.length}, okvirno ${equipmentTotal.toFixed(2).replace(".00", "").replace(".", ",")} €`
                  : "Dodaj mize, table, igre ali drugo opremo v isto povpraševanje."}
              </span>
            </div>
            <button type="button" onClick={openEquipmentPicker} className="rounded-full border border-[var(--eventaj-ink)] px-5 py-2.5 text-xs font-medium">
              {hasEquipment ? "Uredi opremo" : "Dodaj opremo"}
            </button>
          </div>
        </div>
      )}
      {data.type === "Oprema za dogodke" && (
        <div className="grid gap-5 border border-[rgba(20,17,15,0.12)] bg-[var(--eventaj-paper-2)] p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eventaj-muted)]">Izbrana oprema</div>
              <strong className="mt-2 block font-serif-display text-2xl font-normal">
                {hasEquipment
                  ? `Izbranih izdelkov: ${data.equipmentSelections.length}`
                  : "Oprema še ni izbrana"}
              </strong>
              {hasEquipment && <span className="mt-1 block text-xs text-[var(--eventaj-muted)]">Okvirno {equipmentTotal.toFixed(2).replace(".00", "").replace(".", ",")} €</span>}
            </div>
            <button type="button" onClick={openEquipmentPicker} className="rounded-full border border-[var(--eventaj-ink)] px-5 py-2.5 text-xs font-medium">
              {hasEquipment ? "Uredi izbiro" : "Izberi opremo"}
            </button>
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
      {equipmentPickerOpen && (
        <EquipmentPicker
          selections={data.equipmentSelections}
          onChange={(selections) => update("equipmentSelections", selections)}
          onClose={() => setEquipmentPickerOpen(false)}
        />
      )}
    </div>
  );
}

export function InquiryStepDetails({ data, update }: StepProps) {
  const selectedProducts = data.equipmentSelections
    .map((selection) => equipmentProducts.find((product) => product.id === selection.productId))
    .filter(Boolean);
  const needsPost = selectedProducts.some((product) => product?.fulfillmentMode === "post");
  const needsTransport = selectedProducts.some((product) => product?.fulfillmentMode === "transport");
  const deliveryLabel = needsPost && needsTransport
    ? "Po pošti in s prevozom na lokacijo"
    : needsTransport
      ? "Prevoz na lokacijo"
      : "Pošiljanje po pošti";

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
      {data.equipmentSelections.length > 0 && (
        <Field label="Način dostave">
          <div className="eventaj-input flex items-center text-sm">{deliveryLabel}</div>
          <p className="mt-3 text-xs leading-relaxed text-[var(--eventaj-muted)]">
            Strošek dostave oziroma prevoza potrdimo v ponudbi.
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
