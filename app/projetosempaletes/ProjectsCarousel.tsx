"use client";

import Image from "next/image";

const images = [
  "/modelos/modelo01.webp",
  "/modelos/modelo02.webp",
  "/modelos/modelo04.webp",
  "/modelos/modelo06.webp",
  "/modelos/modelo07.webp",
  "/modelos/modelo08.webp",
  "/modelos/modelo09.webp",
  "/modelos/modelo10.webp",
  "/modelos/modelo11.webp",
];

const doubledImages = [...images, ...images];

export default function ProjectsCarousel() {
  return (
    <div
      className="relative mt-14 overflow-hidden"
      aria-label="Modelos de projetos em paletes"
    >
      <div
        className="flex w-max gap-4 animate-auto-carousel will-change-transform motion-reduce:[animation-play-state:paused]"
        style={{ animationDuration: "28s" }}
      >
        {doubledImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative aspect-[4/5] w-[180px] shrink-0 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg sm:w-[220px] md:w-[260px]"
            aria-hidden={index >= images.length}
          >
            <Image
              src={src}
              alt={`Modelo de projeto em paletes ${(index % images.length) + 1}`}
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
              className="object-cover"
              priority={index < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
