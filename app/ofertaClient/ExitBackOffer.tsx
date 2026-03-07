"use client";

import React, { useEffect, useRef, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ExitBackOfferProps = {
  onAcceptOffer: () => void;
  onDeclineOffer: () => void;
};

export default function ExitBackOffer({
  onAcceptOffer,
  onDeclineOffer,
}: ExitBackOfferProps) {
  const [open, setOpen] = useState(false);

  const hasShownRef = useRef(false);
  const allowLeaveRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mountedRef.current) return;
    mountedRef.current = true;

    // cria um estado extra no histórico para interceptar o botão voltar
    window.history.pushState({ exitBackOffer: true }, "", window.location.href);

    const onPopState = () => {
      // se já liberou saída, não intercepta mais
      if (allowLeaveRef.current) return;

      // mostra a oferta só uma vez
      if (!hasShownRef.current) {
        hasShownRef.current = true;
        setOpen(true);

        // recoloca o estado para manter o usuário na página
        window.history.pushState({ exitBackOffer: true }, "", window.location.href);
        return;
      }

      // se insistir em sair depois de já ter visto a oferta, libera
      allowLeaveRef.current = true;
      window.history.back();
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  function handleCloseOnly() {
    setOpen(false);
  }

  function handleAccept() {
    setOpen(false);
    onAcceptOffer();
  }

  function handleDeclineAndLeave() {
    setOpen(false);
    allowLeaveRef.current = true;
    onDeclineOffer();

    // volta de verdade
    window.history.back();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 p-3 sm:items-center sm:p-4">
      <div className="w-full max-w-[560px] overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        {/* topo */}
        <div className="bg-sky-50 p-5 sm:p-6">
          <p className="text-xs font-semibold text-sky-700">
            ESPERA! ANTES DE SAIR 👇
          </p>

          <h3 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Leve o <span className="text-sky-700">Pack Completo</span> por apenas{" "}
            <span className="text-lime-700">R$19,90</span>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            A gente quer te ajudar a começar a construir suas quitinetes com mais
            economia. Antes de sair, aproveite essa condição especial.
          </p>
        </div>

        {/* corpo */}
        <div className="p-5 sm:p-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-800">
              Você vai receber:
            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>✅ +40 modelos 3D de quitinetes</li>
              <li>✅ Método de alvenaria econômica</li>
              <li>✅ Ideias práticas pra reduzir custo</li>
              <li>✅ IA que transforma rascunho em planta 3D</li>
              <li>✅ Material para começar mesmo do zero</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={handleAccept}
            className={cn(
              "shine-button mt-5 w-full rounded-2xl px-5 py-4 text-base font-semibold text-white shadow-sm transition",
              "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
            )}
          >
            Sim, quero a oferta de R$19,90
          </button>

          <button
            type="button"
            onClick={handleDeclineAndLeave}
            className={cn(
              "mt-3 w-full rounded-2xl border px-5 py-4 text-sm font-semibold transition",
              "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            )}
          >
            Não, quero sair da página
          </button>

          <button
            type="button"
            onClick={handleCloseOnly}
            className="mt-4 w-full text-center text-xs text-slate-500 hover:text-slate-700"
          >
            Continuar nesta página
          </button>
        </div>
      </div>
    </div>
  );
}