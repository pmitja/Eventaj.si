import { services } from "@/content/eventaj/data";
import Image from "next/image";

export function ServiceCardMedia({
  media,
  priority = false,
}: {
  media: (typeof services)[number]["media"][number];
  priority?: boolean;
}) {
  if (media.type === "video") {
    return (
      <video
        aria-label={media.alt}
        autoPlay
        loop
        muted
        playsInline
        poster={media.poster}
        preload={priority ? "auto" : "metadata"}
        className="h-full w-full object-cover"
      >
        <source src={media.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      sizes="(max-width: 1023px) 90vw, 600px"
      className="object-cover"
    />
  );
}
