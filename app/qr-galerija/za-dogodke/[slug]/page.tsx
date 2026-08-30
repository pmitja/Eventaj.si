import { QrGalleryUseCasePage } from "@/components/qr-gallery/qr-gallery-page";
import { getQrGalleryUseCase, qrGalleryUseCases } from "@/content/qr-gallery";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return qrGalleryUseCases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getQrGalleryUseCase(slug);
  if (!useCase) return {};

  const canonical = `/qr-galerija/za-dogodke/${useCase.slug}`;
  return {
    title: `${useCase.eyebrow} za 35 € | Eventaj.si`,
    description: useCase.description,
    alternates: { canonical },
    openGraph: {
      title: useCase.title,
      description: useCase.description,
      url: `https://www.eventaj.si${canonical}`,
      images: ["/qr-galerija/screenshots/galerija-desktop.png"],
      locale: "sl_SI",
      type: "website",
    },
  };
}

export default async function QrGalleryEventPage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = getQrGalleryUseCase(slug);
  if (!useCase) notFound();

  return <QrGalleryUseCasePage useCase={useCase} />;
}
