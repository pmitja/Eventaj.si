import { renderToBuffer } from "@react-pdf/renderer";
import { requireAdminApi } from "@/lib/admin-auth";
import { getOffer } from "@/lib/db/offers";
import { OfferDocument } from "@/lib/offers/pdf/offer-document";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const offer = await getOffer(Number(id));
  if (!offer) return Response.json({ error: "Ponudba ne obstaja" }, { status: 404 });

  const pdf = await renderToBuffer(<OfferDocument offer={offer} />);
  const download = new URL(request.url).searchParams.has("download");
  const filename = `Ponudba-${offer.number}-Eventaj.pdf`;

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
