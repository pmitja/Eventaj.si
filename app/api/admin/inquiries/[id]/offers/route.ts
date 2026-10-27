import { requireAdminApi } from "@/lib/admin-auth";
import { offerErrorResponse } from "@/lib/offers/claude";
import { generateOffer } from "@/lib/offers/generate";
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
    return offerErrorResponse(error, "Generiranje ponudbe ni uspelo");
  }
}
