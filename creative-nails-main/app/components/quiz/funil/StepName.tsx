'use client';

import { useEffect, useMemo, useState } from 'react';

function normalizeName(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function isValidName(value: string): boolean {
  const v = normalizeName(value);
  if (v.length < 2) return false;
  // aceita letras acentuadas e espaços
  return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v);
}

export default function StepName({
  value,
  onBack,
  onSubmit,
}: {
  value: string;
  onBack: () => void;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState<string>(value);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setName(value);
  }, [value]);

  const normalized = useMemo(() => normalizeName(name), [name]);
  const valid = useMemo(() => isValidName(name), [name]);

  function submit(): void {
    setTouched(true);
    if (!valid) return;
    onSubmit(normalized);
  }

  return (
    <div className="space-y-4">
      {/* mensagem estilo WhatsApp (tema claro) */}
      <div className="max-w-[92%] rounded-2xl bg-black/5 px-4 py-3 text-[#111b21]">
        <div className="text-sm font-semibold">Coloque seu nome para finalizar</div>
        <div className="text-sm text-black/60">
          Assim eu personalizo sua tabela do jeito certo.
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <label className="text-xs text-black/60">Seu nome</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Ex: Maria"
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#111b21] outline-none placeholder:text-black/30 focus:border-[#0FDB6B]/60"
          inputMode="text"
          autoComplete="name"
        />

        {touched && !valid && (
          <div className="mt-2 text-xs text-red-600">
            Digite um nome válido (mínimo 2 letras).
          </div>
        )}

        <div className="mt-2 text-xs text-black/45">
          Dica: só o primeiro nome já funciona.
        </div>
      </div>

      <button
        type="button"
        onClick={submit}
        className={[
          'w-full rounded-2xl py-3 font-semibold transition',
          valid ? 'shine-button bg-[#0FDB6B] text-[#062b16]' : 'bg-black/10 text-black/40',
        ].join(' ')}
      >
        Finalizar
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full rounded-2xl border border-black/10 bg-white py-3 font-semibold text-black/70 hover:bg-black/5"
      >
        Voltar
      </button>
    </div>
  );
}
