import { BlogSearch } from "@/components/sections/blog-search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Eventaj.si",
  description:
    "Preberite naše najnovejše članke o photo booth-ih, dogodkih in zabavah. Najdite navdih in ideje za vaš naslednji dogodek.",
  keywords:
    "blog, photo booth blog, 360 photo booth blog, photo booth nasveti, organizacija dogodkov",
  openGraph: {
    title: "Blog | Eventaj.si",
    description:
      "Preberite naše najnovejše članke o photo booth-ih, dogodkih in zabavah. Najdite navdih in ideje za vaš naslednji dogodek.",
    images: [
      {
        url: "https://eventaj.si/application/blog-hero.webp",
        width: 1200,
        height: 630,
        alt: "Eventaj.si Blog",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://eventaj.si/blog",
  },
};

const featuredArticles = [
  {
    title: "Kako izbrati pravi photo booth za vaš dogodek",
    excerpt:
      "Vodič po različnih vrstah photo boothov in kako izbrati najprimernejšega za vašo priložnost.",
    image: "/application/photo-booth.webp",
    date: "22. marec 2024",
    slug: "kako-izbrati-photo-booth",
  },
  {
    title: "10 kreativnih idej za poročne fotografije",
    excerpt:
      "Odkrijte edinstvene načine za uporabo photo bootha na vaši poroki in ustvarite nepozabne spomine.",
    image: "/application/photo-booth-device.webp",
    date: "20. marec 2024",
    slug: "kreativne-ideje-poroka",
  },
  {
    title: "Trendi v photo booth tehnologiji za leto 2024",
    excerpt:
      "Spoznajte najnovejše trende in inovacije v svetu photo boothov ter kako lahko popestrijo vaš dogodek.",
    image: "/application/promo-image.webp",
    date: "18. marec 2024",
    slug: "trendi-photo-booth-2024",
  },
];

const recentArticles = [
  {
    title: "Kako organizirati popoln dogodek s photo boothom",
    excerpt:
      "Praktični nasveti za integracijo photo bootha v vaš dogodek in maksimiziranje zabave.",
    image: "/application/basic-booth-hero-image.webp",
    date: "15. marec 2024",
    slug: "organizacija-dogodka-photo-booth",
  },
  {
    title: "5 razlogov za najem 360° photo bootha",
    excerpt:
      "Odkrijte, zakaj je 360° photo booth popolna izbira za moderne dogodke.",
    image: "/application/360-hero-image.webp",
    date: "12. marec 2024",
    slug: "razlogi-360-photo-booth",
  },
  {
    title: "Najboljši rekviziti za photo booth",
    excerpt:
      "Seznam najbolj priljubljenih rekvizitov in kako jih uporabiti za najboljše fotografije.",
    image: "/application/photo-booth.webp",
    date: "10. marec 2024",
    slug: "rekviziti-photo-booth",
  },
  {
    title: "Photo booth na korporativnih dogodkih",
    excerpt:
      "Kako lahko photo booth popestri vaš poslovni dogodek in poveča engagement.",
    image: "/application/promo-image.webp",
    date: "8. marec 2024",
    slug: "korporativni-dogodki-photo-booth",
  },
  {
    title: "Najnovejši trendi v photo booth ozadjih",
    excerpt:
      "Spoznajte moderne trende v dizajnu ozadij za photo booth fotografije.",
    image: "/application/basic-booth-hero-image.webp",
    date: "5. marec 2024",
    slug: "trendi-ozadja-photo-booth",
  },
  {
    title: "Kako izbrati lokacijo za photo booth",
    excerpt:
      "Vodič po izbiri najboljše lokacije za postavitev photo bootha na vašem dogodku.",
    image: "/application/360-hero-image.webp",
    date: "3. marec 2024",
    slug: "lokacija-photo-booth",
  },
];

export default function BlogPage() {
  return (
    <main className="pt-[48px]">
      <BlogSearch
        featuredArticles={featuredArticles}
        recentArticles={recentArticles}
      />
    </main>
  );
}
