// app/quizz/casobia/steps/CasoBiaStepBriefing.tsx
"use client";

import Image from "next/image";
import type { QuizOption } from "../../../types/quiz";

type CasoBiaStepBriefingProps = {
  onContinue: (option: QuizOption) => void;
};

export function CasoBiaStepBriefing({ onContinue }: CasoBiaStepBriefingProps) {
  const continueOption: QuizOption = {
    id: "continuar-perfil",
    label: "Sim, eu aceito esse desafio",
    value: "aceitar-desafio",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Imagem do caso */}
      <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-xl border border-red-900/60 bg-black/40">
        <Image
          src="/casobia/bannerbia.png"
          alt="Dossiê do Caso Bia Andrade"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Título + breve texto */}
      <div className="space-y-3 text-sm md:text-base text-gray-200">
        <div className="space-y-1">
          <span className="text-[11px] tracking-[0.25em] uppercase text-red-400/80">
            Briefing do caso
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-50">
            Uma morte. Múltiplos suspeitos.
          </h2>
        </div>

        <p>
          Bia Andrade foi encontrada morta em uma biblioteca isolada. 
          Não há sinais claros de invasão ou fuga.
        </p>
        <p>
          Pelo menos{" "}
          <span className="font-semibold text-red-400">
            seis pessoas
          </span>{" "}
          podem estar envolvidas — cada uma com motivos, segredos e 
          contradições no que dizem.
        </p>
        <p>
          Reúna seus amigos ou seu crush, analise as pistas e tente montar 
          a sua própria teoria.{" "}
          <span className="font-medium">
            Você aceita esse desafio?
          </span>
        </p>
      </div>

      {/* Botão de aceitar o desafio */}
      <div className="mt-2">
        <button
          onClick={() => onContinue(continueOption)}
          className="shine-button w-full rounded-full border border-red-800/70 bg-red-600/90 px-4 py-3 text-sm md:text-base font-medium text-white transition hover:bg-red-500 hover:border-red-500 active:scale-[0.98]"
        >
          Sim, eu aceito esse desafio
        </button>
      </div>
    </div>
  );
}
