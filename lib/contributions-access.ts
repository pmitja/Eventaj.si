// Only these accounts see Poslovanje → Prispevki (the tab and the page).
const CONTRIBUTIONS_EMAILS = ["mitja@eventaj.si", "julija@eventaj.si"];

export const canSeeContributions = (email: string) => CONTRIBUTIONS_EMAILS.includes(email.trim().toLowerCase());
