"use client";

import Image from "next/image";

type AutoImageCarouselProps = {
  images: string[];
  speedSeconds?: number;
};

export default function AutoImageCarousel({
  images,
  speedSeconds = 28,
}: AutoImageCarouselProps) {
  const doubledImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex w-max gap-4 animate-auto-carousel will-change-transform"
        style={{
          animationDuration: `${speedSeconds}s`,
        }}
      >
        {doubledImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:h-[180px] sm:w-[180px] md:h-[220px] md:w-[220px]"
          >
            <Image
              src={src}
              alt={`Exemplo de forro ${index + 1}`}
              fill
              sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
              className="object-cover"
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}