import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function BlogImage({ src, alt, caption }: BlogImageProps) {
  return (
    <figure className="my-12">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
