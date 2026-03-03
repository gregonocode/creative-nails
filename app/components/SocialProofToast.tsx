"use client";

import React, { useEffect, useMemo, useState } from "react";

type PurchaseNotif = {
  name: string;
  state: string; // UF
  product: "Pack Completo" | "Pack Básico";
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const PURCHASES: PurchaseNotif[] = [
  { name: "Jessica Lima", state: "MG", product: "Pack Completo" },
  { name: "Rafael Souza", state: "SP", product: "Pack Completo" },
  { name: "Camila Santos", state: "RJ", product: "Pack Básico" },
  { name: "Bruno Almeida", state: "PA", product: "Pack Completo" },
  { name: "Larissa Rocha", state: "BA", product: "Pack Básico" },
  { name: "Mateus Ferreira", state: "PR", product: "Pack Completo" },
  { name: "Ana Beatriz", state: "CE", product: "Pack Completo" },
  { name: "João Pedro", state: "SC", product: "Pack Básico" },
  { name: "Mariana Costa", state: "GO", product: "Pack Completo" },
  { name: "Diego Ribeiro", state: "RS", product: "Pack Completo" },
  { name: "Isabela Nunes", state: "AM", product: "Pack Básico" },
  { name: "Felipe Martins", state: "PE", product: "Pack Completo" },
  { name: "Vitória Carvalho", state: "ES", product: "Pack Completo" },
  { name: "Gabriel Oliveira", state: "DF", product: "Pack Básico" },
  { name: "Juliana Mendes", state: "MA", product: "Pack Completo" },
  { name: "Thiago Barros", state: "MT", product: "Pack Básico" },
  { name: "Bianca Silva", state: "MS", product: "Pack Completo" },
  { name: "Renato Azevedo", state: "RN", product: "Pack Básico" },
  { name: "Letícia Araújo", state: "PB", product: "Pack Completo" },
  { name: "Eduardo Pinto", state: "PI", product: "Pack Completo" },
  { name: "Priscila Monteiro", state: "RO", product: "Pack Básico" },
  { name: "André Luiz", state: "TO", product: "Pack Completo" },
];

function pickRandom<T>(arr: T[], avoid?: T) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0];
  let item = arr[Math.floor(Math.random() * arr.length)];
  // evita repetir o mesmo seguido
  if (avoid && item === avoid) {
    item = arr[Math.floor(Math.random() * arr.length)];
  }
  return item;
}

export default function SocialProofToast(props: {
  everyMs?: number; // default 10s
  durationMs?: number; // default 3s
  enabled?: boolean; // default true
}) {
  const everyMs = props.everyMs ?? 10_000;
  const durationMs = props.durationMs ?? 3_000;
  const enabled = props.enabled ?? true;

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<PurchaseNotif | null>(null);

  const message = useMemo(() => {
    if (!current) return "";
    return `${current.name}, ${current.state}, comprou o ${current.product}`;
  }, [current]);

  useEffect(() => {
    if (!enabled) return;

    let hideTimer: number | null = null;

    const showOne = () => {
      setCurrent((prev) => pickRandom(PURCHASES, prev) as PurchaseNotif);
      setVisible(true);

      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setVisible(false), durationMs);
    };

    // mostra a primeira depois de um pequeno delay (fica natural)
    const firstTimer = window.setTimeout(showOne, 1200);
    const interval = window.setInterval(showOne, everyMs);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearInterval(interval);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [enabled, everyMs, durationMs]);

  if (!current) return null;

  return (
    <div className="fixed right-4 top-4 z-[60]">
      <div
        className={cn(
          "pointer-events-none w-[320px] max-w-[88vw]",
          "transition-all duration-300",
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
        aria-live="polite"
      >
        <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2.5 w-2.5 flex-none rounded-full bg-lime-500" />
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-slate-900">Compra confirmada</p>
              <p className="mt-1 text-sm text-slate-700">{message}</p>
              <p className="mt-1 text-[11px] text-slate-500">há poucos instantes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}