"use client";

import { useEffect, useState } from "react";

const TEN_MINUTES = 10 * 60 * 1000;

export default function ScarcityCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);

  useEffect(() => {
    const storageKey = "caderno-personalizado-bonus-expira";
    const savedDeadline = Number(window.localStorage.getItem(storageKey));
    const deadline = savedDeadline > Date.now() ? savedDeadline : Date.now() + TEN_MINUTES;

    if (savedDeadline <= Date.now()) {
      window.localStorage.setItem(storageKey, String(deadline));
    }

    const updateCountdown = () => {
      setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 shadow-2xl backdrop-blur-sm">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-300" />
      <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-100">
        Bônus reservado por
      </span>
      <span className="font-mono text-2xl font-black tabular-nums text-white" aria-live="polite">
        {minutes}:{seconds}
      </span>
    </div>
  );
}
