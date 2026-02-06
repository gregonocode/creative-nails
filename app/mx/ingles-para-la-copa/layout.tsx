// app/mx/ingles-para-la-copa/layout.tsx
import type { ReactNode } from "react";

export const metadata = {
  title: "Inglés para la Copa",
  description: "Embudo (quiz) personalizado — México",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      {/* background decor (clean) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* green spotlight (primary) */}
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#0B7A3B]/12 blur-3xl" />
        {/* red accent (very subtle) */}
        <div className="absolute -bottom-56 right-[-120px] h-[520px] w-[520px] rounded-full bg-[#D62828]/6 blur-3xl" />
        {/* super subtle texture */}
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* brand mark */}
            <div className="h-9 w-9 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <div className="flex h-full w-full">
                <div className="h-full w-1/3 bg-[#0B7A3B]" />
                <div className="h-full w-1/3 bg-white" />
                <div className="h-full w-1/3 bg-[#D62828]/80" />
              </div>
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold">Inglés para la Copa</div>
              <div className="text-xs text-black/55">Quiz personalizado • México</div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] font-medium text-black/70 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-[#0B7A3B]" />
            MX
          </span>
        </div>
      </header>

      {/* page container */}
      <main className="mx-auto max-w-xl px-4 py-6">{children}</main>

      {/* footer */}
      <footer className="mx-auto max-w-xl px-4 pb-10 pt-2 text-center">
        <p className="text-xs text-black/50">
          © {new Date().getFullYear()} • Inglés para la Copa
        </p>
      </footer>
    </div>
  );
}
