"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border-8 border-white bg-slate-200 shadow-2xl lg:aspect-square">
      
      {/* Imagem Base (Depois) - Fica no fundo */}
      <Image
        src={afterSrc}
        alt={afterLabel}
        fill
        className="pointer-events-none object-cover"
        priority
      />

      {/* Imagem Sobreposta (Antes) - Fica no topo sendo "cortada" pelo clip-path */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeLabel}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Input nativo invisível - A "Mágica" da performance leve */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
      />

      {/* Labels */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
        {beforeLabel}
      </div>

      <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-[#1ad7a6]/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
        {afterLabel}
      </div>

      {/* Linha divisória e o botão central */}
      <div
        className="pointer-events-none absolute bottom-0 top-0 z-20 w-[3px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#1ad7a6] shadow-xl">
          <div className="flex items-center gap-1 text-white">
            {/* Ícones SVG em vez de emojis */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Gradiente Inferior */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/25 to-transparent" />

      
      {/* Texto inferior (Modesto e em 1 linha) */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/50 px-4 py-2 shadow-sm backdrop-blur">
        <p className="text-xs font-bold text-slate-800">
          Arraste para ver a transformação
        </p>
      </div>

    </div>
  );
}