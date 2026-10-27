import { requireAdminApi } from "@/lib/admin-auth";
import { offerErrorResponse } from "@/lib/offers/claude";
import { prefillOffer } from "@/lib/offers/prefill";
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
    return Response.json(await prefillOffer(Number(id), parsed.data));
  } catch (error) {
    return offerErrorResponse(error, "Izpolnjevanje obrazca ni uspelo");
  }
}
