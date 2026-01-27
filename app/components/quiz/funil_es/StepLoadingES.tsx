'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Goal = 'casa' | 'viagem' | 'carro' | 'tranquilidade' | 'outro';
type Amount = 10000 | 20000 | 40000 | 100000;

type FunnelAnswers = {
  goal: Goal | null;
  amount: Amount | null;
  name: string;
};

const STORAGE_KEY = 'prosperidad_funnel_v1';

function goalLabel(goal: Goal | null): string {
  switch (goal) {
    case 'casa':
      return 'dar el enganche de una casa';
    case 'viagem':
      return 'hacer un viaje';
    case 'carro':
      return 'comprar/cambiar de coche';
    case 'tranquilidade':
      return 'tener tranquilidad';
    case 'outro':
      return 'tu objetivo';
    default:
      return 'tu objetivo';
  }
}

function formatMXN(n: number): string {
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}

export default function StepLoadingES({
  answers,
  seconds,
}: {
  answers: FunnelAnswers;
  seconds: number;
}) {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);

  const safeName = useMemo(() => {
    const v = answers.name.trim();
    return v.length > 0 ? v : 'Tú';
  }, [answers.name]);

  const goalText = useMemo(() => goalLabel(answers.goal), [answers.goal]);

  const amountText = useMemo(() => {
    if (!answers.amount) return '';
    return formatMXN(answers.amount);
  }, [answers.amount]);

  useEffect(() => {
    // guarda en localStorage
    try {
      const payload = {
        ...answers,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // si falla, seguimos igual
    }

    // contador + redirect
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const s = Math.min(seconds, Math.floor((now - startedAt) / 1000));
      setElapsed(s);

      if (s >= seconds) {
        window.clearInterval(interval);
        router.push('/funil_es/oferta');
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, [answers, router, seconds]);

  const progress = Math.min(1, elapsed / Math.max(1, seconds));

  return (
    <div className="space-y-4">
      {/* mensaje estilo WhatsApp (tema claro) */}
      <div className="max-w-[92%] rounded-2xl bg-black/5 px-4 py-3 text-[#111b21]">
        <div className="text-sm font-semibold">Creando tu tabla personalizada…</div>
        <div className="mt-1 text-sm text-black/60">
          {safeName}, ajustando para{' '}
          <span className="font-semibold text-[#111b21]">{goalText}</span>
          {answers.amount ? (
            <>
              {' '}
              con meta de{' '}
              <span className="font-semibold text-[#111b21]">{amountText}</span>.
            </>
          ) : (
            '.'
          )}
        </div>
      </div>

      {/* barra */}
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex items-center justify-between text-xs text-black/60">
          <span>Personalización</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>

        <div className="mt-2 h-2 w-full rounded-full bg-black/10">
          <div
            className="h-2 rounded-full bg-[#0FDB6B] transition-[width]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="mt-3 text-xs text-black/45">
          Esto toma solo unos segundos…
        </div>
      </div>

      {/* “status card” */}
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#0FDB6B]/15 ring-1 ring-[#0FDB6B]/35" />
          <div>
            <div className="text-sm font-semibold text-[#111b21]">
              Tabla de Prosperidad
            </div>
            <div className="text-xs text-black/60">preparando tu versión</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { STORAGE_KEY };
