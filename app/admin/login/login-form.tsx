"use client";

import { useActionState } from "react";
import { login } from "../actions";

const inputClass =
  "w-full rounded-xl border border-adm-ink bg-adm-card px-3.5 py-2.5 outline-none transition-shadow focus:shadow-[0_0_0_3px_#E7DCCB]";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="mt-8 space-y-4">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium" htmlFor="email">E-naslov</label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div className="space-y-1.5">
        <label className="block text-sm font-medium" htmlFor="password">Geslo</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      {error && <p className="text-sm text-adm-accent">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-adm-ink px-5 py-3 text-sm font-medium text-adm-bg disabled:opacity-60"
      >
        {pending ? "Prijavljam …" : "Prijava"}
      </button>
    </form>
  );
}
