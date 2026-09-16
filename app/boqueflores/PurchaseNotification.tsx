"use client";

import { CheckCircle2, Flower2 } from "lucide-react";
import { useEffect, useState } from "react";

const purchases = [
  { name: "Maria", state: "MG" },
  { name: "Ana Clara", state: "SP" },
  { name: "Juliana", state: "RJ" },
  { name: "Larissa", state: "BA" },
  { name: "Camila", state: "CE" },
  { name: "Fernanda", state: "PR" },
  { name: "Beatriz", state: "PE" },
  { name: "Mariana", state: "GO" },
  { name: "Letícia", state: "SC" },
  { name: "Amanda", state: "RS" },
  { name: "Isabela", state: "ES" },
  { name: "Patrícia", state: "PA" },
] as const;

const MIN_INTERVAL = 5_000;
const MAX_INTERVAL = 10_000;
const DISPLAY_DURATION = 4_000;

function nextPurchase(previousIndex: number) {
  let index = Math.floor(Math.random() * purchases.length);

  if (purchases.length > 1 && index === previousIndex) {
    index = (index + 1) % purchases.length;
  }

  return index;
}

function randomInterval() {
  return MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
}

export default function PurchaseNotification() {
  const [visible, setVisible] = useState(false);
  const [purchaseIndex, setPurchaseIndex] = useState(0);

  useEffect(() => {
    let displayTimer: number | undefined;
    let nextTimer: number | undefined;
    let currentIndex = 0;

    const showNotification = () => {
      currentIndex = nextPurchase(currentIndex);
      setPurchaseIndex(currentIndex);
      setVisible(true);

      displayTimer = window.setTimeout(() => setVisible(false), DISPLAY_DURATION);
      nextTimer = window.setTimeout(showNotification, randomInterval());
    };

    nextTimer = window.setTimeout(showNotification, 1_500);

    return () => {
      window.clearTimeout(displayTimer);
      window.clearTimeout(nextTimer);
    };
  }, []);

  const purchase = purchases[purchaseIndex];

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] transition-all duration-500 sm:bottom-6 sm:left-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex w-[330px] max-w-full items-center gap-3 rounded-2xl border border-pink-100 bg-white px-4 py-3 shadow-[0_16px_40px_rgba(233,30,99,.18)]">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pink-50 text-[#E91E63]">
          <Flower2 className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-zinc-500">Compra confirmada</p>
          <p className="mt-0.5 text-sm font-black text-zinc-900">
            {purchase.name} de {purchase.state} comprou o Pack Completo
          </p>
        </div>
        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E91E63]" />
      </div>
    </div>
  );
}
