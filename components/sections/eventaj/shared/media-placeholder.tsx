import { cn } from "@/lib/utils";
import Image from "next/image";
import { MediaVideo } from "./media-video";

export function MediaPlaceholder({
  media,
  sizes,
  className,
  dark = false,
}: {
  media: { src: string; alt: string; poster?: string };
  sizes: string;
  className?: string;
  dark?: boolean;
}) {
  if (!media.src) {
    return (
      <div
        aria-hidden
        className={cn("relative overflow-hidden", className)}
        style={{
          backgroundImage: dark
            ? "repeating-linear-gradient(45deg, rgba(244,239,230,0.06) 0 14px, rgba(244,239,230,0.02) 14px 28px)"
            : "repeating-linear-gradient(45deg, rgba(20,17,15,0.07) 0 14px, rgba(20,17,15,0.03) 14px 28px)",
        }}
      />
    );
  }
  if (media.src.endsWith(".mp4")) {
    return (
      <MediaVideo
        src={media.src}
        poster={media.poster}
        alt={media.alt}
        className={className}
      />
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
