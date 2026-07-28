import Image from "next/image";

type ThemeCarouselProps = {
  variant: "notebooks" | "stickers";
};

const notebookImages = Array.from(
  { length: 8 },
  (_, index) => `/capa/capa (${index + 1}).webp`,
);

const stickerImages = [
  "/adesivo/adesivo.webp",
  ...Array.from({ length: 6 }, (_, index) => `/adesivo/adesivo-${index + 1}.webp`),
];

export default function ThemeCarousel({ variant }: ThemeCarouselProps) {
  if (variant === "notebooks") {
    const doubledImages = [...notebookImages, ...notebookImages];

    return (
      <div className="relative mt-10 overflow-hidden" aria-label="Prévia dos cadernos personalizados">
        <div
          className="flex w-max gap-4 animate-auto-carousel will-change-transform motion-reduce:[animation-play-state:paused]"
          style={{ animationDuration: "28s" }}
        >
          {doubledImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              aria-hidden={index >= notebookImages.length}
              className="relative aspect-[4/5] w-[180px] shrink-0 overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-xl sm:w-[220px] md:w-[250px]"
            >
              <Image
                src={src}
                alt={index < notebookImages.length ? `Modelo de caderno personalizado ${index + 1}` : ""}
                fill
                sizes="(max-width: 639px) 180px, (max-width: 767px) 220px, 250px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const doubledImages = [...stickerImages, ...stickerImages];

  return (
    <div className="relative mt-10 overflow-hidden" aria-label="Prévia dos adesivos personalizados">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#160b2d] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#160b2d] to-transparent sm:w-24" />
      <div
        className="flex w-max gap-4 animate-auto-carousel will-change-transform motion-reduce:[animation-play-state:paused]"
        style={{ animationDuration: "20s" }}
      >
        {doubledImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            aria-hidden={index >= stickerImages.length}
            className="relative aspect-[3/4] w-[180px] shrink-0 overflow-hidden rounded-[24px] border border-white/10 bg-white shadow-xl sm:w-[220px] md:w-[250px]"
          >
            <Image
              src={src}
              alt={index < stickerImages.length ? `Cartela de adesivos personalizados ${index + 1}` : ""}
              fill
              sizes="(max-width: 639px) 180px, (max-width: 767px) 220px, 250px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
