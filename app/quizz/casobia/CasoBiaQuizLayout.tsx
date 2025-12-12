// app/quizz/casobia/CasoBiaQuizLayout.tsx
"use client";

import React from "react";

type CasoBiaQuizLayoutProps = {
  children: React.ReactNode;
};

export function CasoBiaQuizLayout({ children }: CasoBiaQuizLayoutProps) {
  return (
    <main className="min-h-screen bg-[#050308] text-gray-100 flex items-center justify-center px-4">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-red-900/40 bg-gradient-to-b from-[#050308] to-[#0b0b12] shadow-[0_0_40px_rgba(248,113,113,0.18)] p-6 md:p-8">
        {/* Glow vermelho no topo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.12),transparent_60%)]" />
        {/* Faixa de “fitas de isolamento” policia */}
        <div className="pointer-events-none absolute -top-6 left-0 right-0 h-10 bg-[repeating-linear-gradient(135deg,_#7f1d1d_0,_#7f1d1d_10px,_#111827_10px,_#111827_20px)] opacity-40" />
        {/* Conteúdo */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </main>
  );
}
