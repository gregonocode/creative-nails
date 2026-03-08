"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Antes",
  afterLabel = "Depois",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  function updatePosition(clientX: number) {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percent));
    setPosition(clamped);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    setDragging(true);
    updatePosition(e.clientX);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!dragging) return;
    updatePosition(e.clientX);
  }

  function handleMouseUp() {
    setDragging(false);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    updatePosition(e.touches[0].clientX);
  }

  function handleTouchEnd() {
    setDragging(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border-8 border-white bg-slate-200 shadow-2xl select-none lg:aspect-square"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Base - Depois */}
      <Image
        src={beforeSrc}
        alt="Depois"
        fill
        className="object-cover pointer-events-none"
        priority
      />

      {/* Camada - Antes */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <div className="relative h-full w-full">
          <Image
            src={afterSrc}
            alt="Antes"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
        {beforeLabel}
      </div>

      <div className="absolute right-4 top-4 rounded-full bg-[#1ad7a6]/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
        {afterLabel}
      </div>

      {/* Linha divisória */}
      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="relative h-full w-[3px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]">
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#1ad7a6] shadow-xl">
            <div className="flex items-center gap-1 text-white">
              <span className="text-xs font-black">◀</span>
              <span className="text-xs font-black">▶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />

      {/* Texto inferior */}
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 rounded-2xl bg-white/88 p-4 backdrop-blur shadow-lg">
        <p className="text-sm font-bold text-slate-900">
          Arraste para ver a transformação
        </p>
        <p className="mt-1 text-xs text-slate-600">
          Compare o antes e depois do acabamento visual
        </p>
      </div>
    </div>
  );
}