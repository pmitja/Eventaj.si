import Anthropic from "@anthropic-ai/sdk";
import { requireAdminApi } from "@/lib/admin-auth";
import { generateOffer, OfferGenerationError } from "@/lib/offers/generate";
import { offerOptionsSchema } from "@/lib/offers/schema";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const parsed = offerOptionsSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: "Neveljavni podatki za ponudbo" }, { status: 400 });
  }

  try {
    const offer = await generateOffer(Number(id), parsed.data);
    return Response.json({
      offer: {
        id: offer.id,
        number: offer.number,
        total: offer.total,
        email: offer.content.spremno_besedilo_emaila,
        reviewNotes: offer.content.opombe_za_pregled,
      },
    });
  } catch (error) {
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
    console.error("Offer generation failed:", error);
    return Response.json({ error: "Generiranje ponudbe ni uspelo" }, { status: 500 });
  }
}
