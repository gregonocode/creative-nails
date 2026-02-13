"use client";

import type { ReactNode } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function FunnelShell({
  children,
  progress,
  title,
  subtitle,
}: {
  children: ReactNode;
  progress: number; // 0..100
  title: string;
  subtitle?: string;
}) {
  const p = clamp(progress, 0, 100);

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#111b21]">
      <div className="mx-auto max-w-xl px-4 py-6">
        {/* header */}
        <div className="mb-4 rounded-2xl border border-black/10 bg-white/80 p-4 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">{title}</div>
              {subtitle ? (
                <div className="mt-1 text-xs text-black/55">{subtitle}</div>
              ) : null}
            </div>

            <div className="rounded-full bg-[#7C3AED]/10 px-3 py-1 text-xs font-semibold text-[#7C3AED]">
              Quiz
            </div>
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#7C3AED] transition-all duration-300"
              style={{ width: `${p}%` }}
            />
          </div>
        </div>

        {/* content */}
        <div className="rounded-2xl border border-black/10 bg-white p-4">
          {children}
        </div>

        <div className="mt-4 text-center text-xs text-black/45">
          Dinâmicas personalizadas • 100% online
        </div>
      </div>
    </div>
  );
}
