import { Field, PillGrid } from "@/components/inquiry/inquiry-fields";
import {
  albumOptions,
  albumPriceLabel,
  durations,
  eventTypes,
  type EventDetailsDraft,
} from "@/lib/event-details/schema";
import { cn } from "@/lib/utils";
import { FieldError, Hint, Label, Section } from "./form-parts";

type Props = {
  data: EventDetailsDraft;
  errors: Partial<Record<keyof EventDetailsDraft, string>>;
  update: <K extends keyof EventDetailsDraft>(key: K, value: EventDetailsDraft[K]) => void;
};

const durationLabels: Record<string, string> = { "2": "2 uri", "3": "3 ure", "4": "4 ure" };
const albumAnswers = { yes: "Da", no: "Ne" } as const;

export function BasicsSection({ data, errors, update }: Props) {
  return (
    <Section title="Osnovne informacije">
      <div>
        <Label htmlFor="location">Točna lokacija</Label>
        <input
          id="location"
          className="eventaj-input"
          value={data.location}
          onChange={(event) => update("location", event.target.value)}
          placeholder="Naslov ali ime prostora, kraj"
          autoComplete="street-address"
        />
        <FieldError message={errors.location} />
      </div>

      <Field label="Vrsta dogodka">
        <PillGrid
          columns="grid-cols-2 md:grid-cols-4"
          items={[...eventTypes]}
          value={data.eventType}
          onChange={(value) => update("eventType", value as EventDetailsDraft["eventType"])}
        />
        {data.eventType === "Drugo" && (
          <input
            className="eventaj-input mt-2"
            value={data.eventTypeOther}
            onChange={(event) => update("eventTypeOther", event.target.value)}
            placeholder="Kakšen dogodek je?"
            aria-label="Vrsta dogodka, drugo"
          />
        )}
        <FieldError message={errors.eventType ?? errors.eventTypeOther} />
      </Field>

      <div className="grid gap-7 md:grid-cols-2 md:gap-4">
        <div>
          <Label htmlFor="startTime">Pričetek najema photo booth-a</Label>
          <input
            id="startTime"
            type="time"
            className="eventaj-input min-h-[56px]"
            value={data.startTime}
            onChange={(event) => update("startTime", event.target.value)}
          />
          <FieldError message={errors.startTime} />
        </div>
        <Field label="Trajanje najema">
          <PillGrid
            columns="grid-cols-3"
            items={durations.map((hours) => durationLabels[hours])}
            value={data.hours ? durationLabels[data.hours] : ""}
            onChange={(label) => update("hours", durations.find((hours) => durationLabels[hours] === label) ?? "")}
          />
          <FieldError message={errors.hours} />
        </Field>
      </div>

      <div className="grid gap-7 md:grid-cols-2 md:gap-4">
        <div>
          <Label htmlFor="contactName">Kontaktna oseba na dogodku</Label>
          <input
            id="contactName"
            className="eventaj-input"
            value={data.contactName}
            onChange={(event) => update("contactName", event.target.value)}
            placeholder="Ime in priimek"
            autoComplete="name"
          />
          <FieldError message={errors.contactName} />
        </div>
        <div>
          <Label htmlFor="contactPhone">Telefonska številka</Label>
          <input
            id="contactPhone"
            type="tel"
            inputMode="tel"
            className="eventaj-input"
            value={data.contactPhone}
            onChange={(event) => update("contactPhone", event.target.value)}
            placeholder="npr. 041 123 456"
            autoComplete="tel"
          />
          <FieldError message={errors.contactPhone} />
        </div>
      </div>
      <Hint>Na to številko vas pokličemo, ko prispemo na dogodek.</Hint>
    </Section>
  );
}

export function AlbumSection({ data, errors, update }: Props) {
  return (
    <Section title="Album">
      <Field label="Želite album?">
        <PillGrid
          columns="grid-cols-2"
          items={[albumAnswers.yes, albumAnswers.no]}
          value={data.album ? albumAnswers[data.album] : ""}
          onChange={(value) => update("album", value === albumAnswers.yes ? "yes" : "no")}
        />
      </Field>

      {data.album === "yes" && (
        <Field label="Izberite album">
          <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Izberite album">
            {albumOptions.map((option) => {
              const selected = data.albumSize === option.size && data.albumColor === option.color;
              return (
                <button
                  key={option.label}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    update("albumSize", option.size);
                    update("albumColor", option.color);
                  }}
                  className={cn(
                    "flex items-center justify-between gap-4 border px-4 py-3.5 text-left transition-colors",
                    selected
                      ? "border-[var(--eventaj-ink)] bg-[var(--eventaj-ink)] text-[var(--eventaj-paper)]"
                      : "border-[rgba(20,17,15,0.15)] hover:border-[var(--eventaj-ink)]",
                  )}
                >
                  <span>
                    <span className="block text-sm font-medium">{option.label}</span>
                    <span className="mt-0.5 block text-xs opacity-70">{option.photos}</span>
                  </span>
                  <span className="whitespace-pre-line text-right text-xs opacity-70">
                    {albumPriceLabel(data.hours, option.size)}
                  </span>
                </button>
              );
            })}
          </div>
          <FieldError message={errors.albumSize} />
        </Field>
      )}

      <ul className="m-0 grid list-none gap-1 border-t border-[rgba(20,17,15,0.1)] p-0 pt-4 text-sm text-[var(--eventaj-muted)]">
        <li>Mali album (40 fotografij): pri 2-urnem najemu doplačilo 20 €, pri 3- ali 4-urnem najemu je v ceni.</li>
        <li>Veliki album (80 fotografij): pri 2-urnem najemu doplačilo 30 €, pri 3- ali 4-urnem najemu doplačilo 15 €.</li>
      </ul>
    </Section>
  );
}

// Inline color: the site-wide `.eventaj-redesign a { color: inherit }` outranks a utility class.
const linkStyle = { color: "var(--eventaj-accent)" };
const linkClass =
  "text-sm font-medium underline decoration-[rgba(184,85,58,0.35)] underline-offset-4 hover:decoration-[var(--eventaj-accent)]";

export function FrameSection({ data, errors, update }: Props) {
  return (
    <Section title="Priprava okvirja">
      <div>
        <Label htmlFor="frameIdea">Ideja za okvir</Label>
        <textarea
          id="frameIdea"
          rows={4}
          className="eventaj-input resize-y"
          value={data.frameIdea}
          onChange={(event) => update("frameIdea", event.target.value)}
          placeholder="Napisi, tematika, barve ..."
        />
        <FieldError message={errors.frameIdea} />
      </div>
      <div>
        <Label htmlFor="background">Izbrano ozadje</Label>
        <input
          id="background"
          className="eventaj-input"
          value={data.background}
          onChange={(event) => update("background", event.target.value)}
          placeholder="Ime ali številka ozadja iz mape"
        />
        <FieldError message={errors.background} />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
        <a href="https://drive.google.com/drive/folders/1DSFlzAzcT8Xqqahe4JBPvsG-syFdrC0B" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
          Ideje za okvirje →
        </a>
        <a href="https://drive.google.com/drive/folders/1FYA4vmkcMAgLXMTWP77OqFDqH9YLs1Qm" target="_blank" rel="noopener noreferrer" className={linkClass} style={linkStyle}>
          Ozadja, ki so na voljo →
        </a>
      </div>
      <Hint>
        Če želite, nam posredujte tudi vabilo, da si lažje predstavljamo stil dogodka. Priložite ga v odgovor na našo
        e-pošto ali ga pošljite na{" "}
        <a href="mailto:info@eventaj.si" className="underline underline-offset-4">
          info@eventaj.si
        </a>
        .
      </Hint>
    </Section>
  );
}
