"use client";

import React, { useEffect, useMemo, useState } from "react";

type PurchaseNotif = {
  name: string;
  state: string;
  product: "Firebook Premium" | "Firebook Essencial";
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const PURCHASES: PurchaseNotif[] = [
  { name: "Jessica Lima", state: "MG", product: "Firebook Premium" },
  { name: "Camila Santos", state: "RJ", product: "Firebook Essencial" },
  { name: "Larissa Rocha", state: "BA", product: "Firebook Premium" },
  { name: "Ana Beatriz", state: "CE", product: "Firebook Premium" },
  { name: "Mariana Costa", state: "GO", product: "Firebook Essencial" },
  { name: "Isabela Nunes", state: "AM", product: "Firebook Premium" },
  { name: "Vitória Carvalho", state: "ES", product: "Firebook Premium" },
  { name: "Juliana Mendes", state: "MA", product: "Firebook Essencial" },
  { name: "Bianca Silva", state: "MS", product: "Firebook Premium" },
  { name: "Letícia Araújo", state: "PB", product: "Firebook Premium" },
  { name: "Priscila Monteiro", state: "RO", product: "Firebook Essencial" },
  { name: "Fernanda Alves", state: "SP", product: "Firebook Premium" },
  { name: "Patrícia Souza", state: "PE", product: "Firebook Essencial" },
  { name: "Bruna Martins", state: "PR", product: "Firebook Premium" },
  { name: "Aline Ribeiro", state: "SC", product: "Firebook Premium" },
  { name: "Tatiane Oliveira", state: "PA", product: "Firebook Essencial" },
  { name: "Débora Fernandes", state: "RN", product: "Firebook Premium" },
  { name: "Carla Mendes", state: "DF", product: "Firebook Essencial" },
  { name: "Renata Barros", state: "RS", product: "Firebook Premium" },
  { name: "Amanda Nogueira", state: "TO", product: "Firebook Premium" },
];

function pickRandom<T>(arr: T[], avoid?: T) {
  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0];

  let item = arr[Math.floor(Math.random() * arr.length)];
  if (avoid && item === avoid) {
    item = arr[Math.floor(Math.random() * arr.length)];
  }

  return item;
}

export default function SocialProofToast(props: {
  everyMs?: number;
  durationMs?: number;
  enabled?: boolean;
}) {
  const everyMs = props.everyMs ?? 10_000;
  const durationMs = props.durationMs ?? 3_000;
  const enabled = props.enabled ?? true;

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<PurchaseNotif | null>(null);

  const message = useMemo(() => {
    if (!current) return "";
    return `${current.name}, ${current.state}, garantiu o ${current.product}`;
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
          visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        )}
        aria-live="polite"
      >
        <div className="rounded-2xl border border-rose-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2.5 w-2.5 flex-none rounded-full bg-[#E40627]" />
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-[#960016]">
                Novo acesso liberado
              </p>
              <p className="mt-1 text-sm text-slate-700">{message}</p>
              <p className="mt-1 text-[11px] text-slate-500">
                há poucos instantes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}