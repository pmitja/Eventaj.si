import Anthropic from "@anthropic-ai/sdk";

export const MODEL = "claude-opus-5-5";

export class OfferGenerationError extends Error {}

export function claudeClient() {
  if (!process.env.ANTHROPIC_API_KEY) throw new OfferGenerationError("ANTHROPIC_API_KEY ni nastavljen v .env");
  // Organization-scoped API keys must name the workspace on every request.
  const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID;
  return new Anthropic({
    defaultHeaders: workspaceId ? { "anthropic-workspace-id": workspaceId } : undefined,
  });
}

/** Maps a failed offer or prefill call to the JSON error the admin dialog shows. */
export function offerErrorResponse(error: unknown, fallback: string) {
  if (error instanceof OfferGenerationError) {
    return Response.json({ error: error.message }, { status: 422 });
  }
  if (error instanceof Anthropic.AuthenticationError) {
    return Response.json({ error: "Neveljaven ANTHROPIC_API_KEY" }, { status: 500 });
  }
  if (error instanceof Anthropic.RateLimitError) {
    return Response.json({ error: "Preveč zahtevkov, poskusite čez minuto" }, { status: 429 });
  }
  if (error instanceof Anthropic.APIError) {
    console.error("Claude API error:", error.status, error.message);
    return Response.json({ error: `Napaka Claude API (${error.status ?? "povezava"})` }, { status: 502 });
  }
  console.error(`${fallback}:`, error);
  return Response.json({ error: fallback }, { status: 500 });
}
