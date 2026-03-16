"use client";

import Image from "next/image";

type AutoBookCarouselProps = {
  images: string[];
  speedSeconds?: number;
};

export default function AutoBookCarousel({
  images,
  speedSeconds = 28,
}: AutoBookCarouselProps) {
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
            className="relative h-[160px] w-[110px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg sm:h-[220px] sm:w-[150px] md:h-[260px] md:w-[180px]"
          >
            <Image
              src={src}
              alt={`Livro famoso ${index + 1}`}
              fill
              sizes="(max-width: 640px) 110px, (max-width: 768px) 150px, 180px"
              className="object-cover"
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}