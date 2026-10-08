import { addYear } from "../actions";

export function AddYearForm({ suggested }: { suggested: number }) {
  return (
    <form action={addYear} className="flex items-center gap-2 text-sm">
      <input
        name="year"
        type="number"
        defaultValue={suggested}
        min={2000}
        max={2100}
        aria-label="Leto"
        className="w-24 rounded-full border border-adm-ink bg-transparent px-3.5 py-[7px] tabular outline-none transition-shadow focus:shadow-[0_0_0_3px_#E7DCCB]"
      />
      <button type="submit" className="rounded-full border border-adm-ink px-3.5 py-[7px] transition-colors hover:bg-adm-ink hover:text-adm-bg">
        Dodaj leto
      </button>
    </form>
  );
}
