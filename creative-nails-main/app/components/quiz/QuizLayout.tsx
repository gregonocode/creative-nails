// app/components/quiz/QuizLayout.tsx
"use client";

import React from "react";

type QuizLayoutProps = {
  children: React.ReactNode;
};

export function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <main className="min-h-screen bg-[#FFF8FD] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-lg border border-pink-100 p-6 md:p-8">
        {children}
      </div>
    </main>
  );
}
