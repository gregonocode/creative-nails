'use client';

type Amount = 10000 | 20000 | 40000 | 100000;

const options: Array<{
  value: Amount;
  title: string;
  desc: string;
}> = [
  { value: 10000, title: 'R$ 10.000', desc: 'Meta rápida e motivadora' },
  { value: 20000, title: 'R$ 20.000', desc: 'Equilíbrio entre prazo e consistência' },
  { value: 40000, title: 'R$ 40.000', desc: 'Ótimo para planos maiores' },
  { value: 100000, title: 'R$ 100.000', desc: 'Projeto grande, avanço constante' },
];

function formatBRL(n: number): string {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function StepAmount({
  value,
  onBack,
  onSelect,
}: {
  value: Amount | null;
  onBack: () => void;
  onSelect: (amount: Amount) => void;
}) {
  return (
    <div className="space-y-4">
      {/* mensagem estilo WhatsApp (tema claro) */}
      <div className="max-w-[92%] rounded-2xl bg-black/5 px-4 py-3 text-[#111b21]">
        <div className="text-sm font-semibold">Quanto você pretende guardar?</div>
        <div className="text-sm text-black/60">
          Escolha uma meta para montar sua tabela personalizada.
        </div>
      </div>

      {/* opções */}
      <div className="grid gap-3">
        {options.map((o) => {
          const selected = value === o.value;

          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onSelect(o.value)}
              className={[
                'w-full rounded-2xl border p-4 text-left transition',
                selected
                  ? 'border-[#0FDB6B]/60 bg-[#0FDB6B]/10'
                  : 'border-black/10 bg-white hover:bg-black/5',
              ].join(' ')}
              aria-pressed={selected}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-[#111b21]">{o.title}</div>
                <div className="text-xs text-black/60">{formatBRL(o.value)}</div>
              </div>

              <div className="mt-1 text-xs text-black/60">{o.desc}</div>

              {selected && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#0FDB6B]/15 px-3 py-1 text-xs font-semibold text-[#0a7f3f]">
                  Selecionado
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* voltar */}
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
