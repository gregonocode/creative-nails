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

const STORAGE_KEY = 'prosperidade_funnel_v1';

function goalLabel(goal: Goal | null): string {
  switch (goal) {
    case 'casa':
      return 'dar entrada na casa';
    case 'viagem':
      return 'fazer uma viagem';
    case 'carro':
      return 'comprar/trocar de carro';
    case 'tranquilidade':
      return 'garantir tranquilidade';
    case 'outro':
      return 'seu objetivo';
    default:
      return 'seu objetivo';
  }
}

function formatBRL(n: number): string {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function StepLoading({
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
    return v.length > 0 ? v : 'Você';
  }, [answers.name]);

  const goalText = useMemo(() => goalLabel(answers.goal), [answers.goal]);

  const amountText = useMemo(() => {
    if (!answers.amount) return '';
    return formatBRL(answers.amount);
  }, [answers.amount]);

  useEffect(() => {
    // salva no localStorage
    try {
      const payload = {
        ...answers,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // se falhar, segue mesmo assim
    }

    // contador + redirect
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const s = Math.min(seconds, Math.floor((now - startedAt) / 1000));
      setElapsed(s);

      if (s >= seconds) {
        window.clearInterval(interval);
        router.push('/funil/oferta');
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, [answers, router, seconds]);

  const progress = Math.min(1, elapsed / Math.max(1, seconds));

  return (
    <div className="space-y-4">
      {/* mensagem estilo WhatsApp (tema claro) */}
      <div className="max-w-[92%] rounded-2xl bg-black/5 px-4 py-3 text-[#111b21]">
        <div className="text-sm font-semibold">Criando sua tabela personalizada…</div>
        <div className="mt-1 text-sm text-black/60">
          {safeName}, ajustando para <span className="font-semibold text-[#111b21]">{goalText}</span>
          {answers.amount ? (
            <>
              {' '}
              com meta de <span className="font-semibold text-[#111b21]">{amountText}</span>.
            </>
          ) : (
            '.'
          )}
        </div>
      </div>

      {/* barra */}
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex items-center justify-between text-xs text-black/60">
          <span>Personalização</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>

        <div className="mt-2 h-2 w-full rounded-full bg-black/10">
          <div
            className="h-2 rounded-full bg-[#0FDB6B] transition-[width]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="mt-3 text-xs text-black/45">
          Isso leva só alguns segundos…
        </div>
      </div>

      {/* “status card” */}
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#0FDB6B]/15 ring-1 ring-[#0FDB6B]/35" />
          <div>
            <div className="text-sm font-semibold text-[#111b21]">Tabela da Prosperidade</div>
            <div className="text-xs text-black/60">preparando sua versão</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { STORAGE_KEY };
