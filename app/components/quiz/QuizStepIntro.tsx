// app/components/quiz/QuizStepIntro.tsx
"use client";

import Image from "next/image";
import type { QuizOption } from "../../types/quiz";

type QuizStepIntroProps = {
  onSelectOption: (option: QuizOption) => void;
};

const options: QuizOption[] = [
  { id: "nunca-ouvi", label: "Nunca ouvi falar", value: "nao-conhece" },
  { id: "sim", label: "Sim, já conheço", value: "conhece" },
];

export function QuizStepIntro({ onSelectOption }: QuizStepIntroProps) {
  return (
    <div className="flex flex-col gap-6">
    {/* Imagem do produto */}
      <div className="flex justify-center">
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden">
          <Image
            src="/umfrasco.png"
            alt="Amazolee Clareador"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Título / pergunta */}
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
          Quiz rápido
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Você conhece o{" "}
          <span className="text-pink-500">Amazolee Clareador</span>?
        </h1>
        <p className="text-sm text-gray-500">
          Responda abaixo para continuar a avaliação e ver se ele é indicado
          para o seu caso.
        </p>
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-3 mt-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option)}
            className="w-full rounded-full border border-pink-200 bg-pink-500/90 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Rodapé discreto */}
      <p className="text-[11px] text-center text-gray-400 mt-1">
        Leva menos de 1 minuto e ajuda a indicar o melhor tratamento para você.
      </p>
    </div>
  );
}
