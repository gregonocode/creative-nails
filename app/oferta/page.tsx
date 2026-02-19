// app/oferta/page.tsx
import { Suspense } from "react";
import OfertaClient from "./OfertaClient";

export default function OfertaPage() {
  return (
    <Suspense fallback={<OfertaLoading />}>
      <OfertaClient />
    </Suspense>
  );
}

function OfertaLoading() {
  return (
    <div className="min-h-[100dvh] bg-white">
      <div className="mx-auto w-full max-w-[980px] px-4 py-12">
        <div className="rounded-3xl border border-sky-100 bg-sky-50 p-6 shadow-sm">
          <p className="text-sm font-semibold text-sky-700">Carregando sua oferta…</p>
          <p className="mt-2 text-sm text-slate-600">
            Só um segundo que estamos preparando tudo.
          </p>
          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-sky-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
