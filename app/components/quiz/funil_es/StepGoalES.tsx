'use client';

type Goal = 'casa' | 'viagem' | 'carro' | 'tranquilidade' | 'outro';

const options: Array<{ id: Goal; title: string; desc: string }> = [
  {
    id: 'casa',
    title: 'Dar el enganche de una casa 🏠',
    desc: 'Ahorrar con foco y fecha',
  },
  {
    id: 'viagem',
    title: 'Hacer un viaje ✈️',
    desc: 'Planear sin apretar las finanzas',
  },
  {
    id: 'carro',
    title: 'Comprar/cambiar de coche 🚗',
    desc: 'Juntar con constancia',
  },
  {
    id: 'tranquilidade',
    title: 'Tener tranquilidad 🧘‍♂️',
    desc: 'Fondo de emergencia y seguridad',
  },
  {
    id: 'outro',
    title: 'Otro objetivo 🎯',
    desc: 'Personalizar a tu manera',
  },
];

export default function StepGoalES({
  value,
  onBack,
  onSelect,
}: {
  value: Goal | null;
  onBack: () => void;
  onSelect: (goal: Goal) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="max-w-[92%] rounded-2xl bg-black/5 px-4 py-3 text-[#111b21]">
        <div className="text-sm font-semibold">¿Cuál es tu objetivo?</div>
        <div className="text-sm text-black/60">
          Esto va a personalizar tu Tabla de Prosperidad.
        </div>
      </div>

      <div className="grid gap-3">
        {options.map((o) => {
          const selected = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelect(o.id)}
              className={[
                'w-full rounded-2xl border p-4 text-left transition',
                selected
                  ? 'border-[#0FDB6B]/60 bg-[#0FDB6B]/10'
                  : 'border-black/10 bg-white hover:bg-black/5',
              ].join(' ')}
              aria-pressed={selected}
            >
              <div className="text-sm font-semibold text-[#111b21]">{o.title}</div>
              <div className="mt-1 text-xs text-black/60">{o.desc}</div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="w-full rounded-2xl border border-black/10 bg-white py-3 font-semibold text-black/70 hover:bg-black/5"
      >
        Volver
      </button>
    </div>
  );
}
