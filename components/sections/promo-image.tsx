import Image from "next/image";

const PromoImage = () => {
  return (
    <div className="relative w-full h-[200px] md:h-[225px] lg:h-[250px] overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20 z-10" />

      <Image
        src="/application/promo-image.webp"
        alt="360° Photo Booth Promo"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

export default PromoImage;
