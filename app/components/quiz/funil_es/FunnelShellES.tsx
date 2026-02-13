'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';

export default function FunnelShellES({
  children,
  progress,
}: {
  children: ReactNode;
  progress: number;
}) {
  return (
    <div className="min-h-screen bg-[#efeae2] text-[#111b21]">
      <div className="mx-auto max-w-xl px-4 py-6">
        {/* header clean */}
        <div className="mb-4 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-[#0FDB6B]/40">
              <Image
                src="/perfil horta.webp"
                alt="Perfil"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold">Tabla de Prosperidad</div>
              <div className="text-xs text-black/50">mensaje guiado • 2026</div>
            </div>
          </div>

          <div className="mt-3 h-2 w-full rounded-full bg-black/10">
            <div
              className="h-2 rounded-full bg-[#0FDB6B]"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>

        {/* card central */}
        <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
          {children}
        </div>

        <div className="mt-4 text-center text-xs text-black/40">
          © 2026 • Tabla de Prosperidad
        </div>
      </div>
    </div>
  );
}
