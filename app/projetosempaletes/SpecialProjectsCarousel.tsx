"use client";

import Image from "next/image";

const images = [
  "/modelos/especial/ESPECIAL.webp",
  "/modelos/especial/ESPECIAL01.webp",
  "/modelos/especial/ESPECIAL02.webp",
  "/modelos/especial/ESPECIAL03.webp",
  "/modelos/especial/ESPECIAL04.webp",
];

const doubledImages = [...images, ...images];

export default function SpecialProjectsCarousel() {
  return (
    <div
      className="relative mt-12 overflow-hidden sm:mt-14"
      aria-label="Projetos especiais incluídos gratuitamente"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-stone-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-stone-950 to-transparent sm:w-24" />

      <div
        className="flex w-max gap-4 animate-auto-carousel will-change-transform motion-reduce:[animation-play-state:paused]"
        style={{ animationDuration: "22s" }}
      >
        {doubledImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative aspect-[4/5] w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-stone-900 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:w-[220px] md:w-[260px]"
            aria-hidden={index >= images.length}
          >
            <Image
              src={src}
              alt={`Projeto especial gratuito ${(index % images.length) + 1}`}
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
