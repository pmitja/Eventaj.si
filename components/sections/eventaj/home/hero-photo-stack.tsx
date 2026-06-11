import { PhotoScene } from "@/components/media/photo-scene";
import { cn } from "@/lib/utils";

export type HeroPhotoItem = {
  variant: number;
  label: string;
  className: string;
};

export function HeroPhotoStack({
  photos,
  align = "start",
}: {
  photos: HeroPhotoItem[];
  align?: "start" | "end";
}) {
  return (
    <div
      className={cn(
        "hidden content-center gap-9 min-[1440px]:grid",
        align === "end" ? "justify-items-end pr-6" : "justify-items-start pl-6",
      )}
    >
      {photos.map((photo) => (
        <HeroStackPhoto key={photo.label} {...photo} />
      ))}
    </div>
  );
}

function HeroStackPhoto({ variant, label, className }: HeroPhotoItem) {
  return (
    <div
      className={cn(
        "pointer-events-none relative rounded-[3px] bg-white p-2 pb-8 shadow-[0_28px_70px_-24px_rgba(20,17,15,0.62),0_8px_18px_-10px_rgba(20,17,15,0.45)]",
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden bg-[var(--eventaj-ink)]">
        <PhotoScene variant={variant} label={label} />
      </div>
      <div className="absolute inset-x-0 bottom-2.5 text-center font-serif-italic text-[10px] italic tracking-[0.04em] text-[rgba(20,17,15,0.45)]">
        eventaj.si
      </div>
    </div>
  );
}

export function HeroMobilePhoto({
  variant,
  label,
  rotate,
}: {
  variant: number;
  label: string;
  rotate: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[3px] bg-white p-1.5 pb-5 shadow-[0_20px_50px_-24px_rgba(20,17,15,0.58)]",
        rotate,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <PhotoScene variant={variant} label={label} />
      </div>
    </div>
  );
}
