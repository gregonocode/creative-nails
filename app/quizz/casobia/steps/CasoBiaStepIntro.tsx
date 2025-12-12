// app/quizz/casobia/steps/CasoBiaStepIntro.tsx
"use client";

import type { QuizOption } from "../../../types/quiz";

type CasoBiaStepIntroProps = {
  onSelectOption: (option: QuizOption) => void;
  promotorNome?: string;
};

const options: QuizOption[] = [
  {
    id: "mais-infos",
    label: "Me passe mais informações do caso",
    value: "mais-informacoes",
  },
  {
    id: "pronto",
    label: "Sim, já nasci pronto(a)",
    value: "pronto-para-investigar",
  },
];

export function CasoBiaStepIntro({
  onSelectOption,
  promotorNome = "Dr. Henrique Vasconcelos",
}: CasoBiaStepIntroProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header / selo de caso */}
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-[11px] tracking-[0.25em] uppercase text-red-400/80">
          Caso Bia Andrade
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-50">
          Convocação Oficial para Investigação
        </h1>
      </div>

      {/* Texto do promotor */}
      <div className="space-y-3 text-sm md:text-base text-gray-200">
        <p>
          Oi, eu sou{" "}
          <span className="font-semibold text-red-400">{promotorNome}</span>, 
          promotor responsável pelo{" "}
          <span className="font-semibold">caso da Beatriz (Bia) Andrade</span>.
        </p>
        <p>
          Ela foi encontrada sem vida na mansão onde trabalhava, em circunstâncias
          suspeitas. O laudo é inconclusivo, os depoimentos são cheios de
          contradições e{" "}
          <span className="text-red-400 font-medium">
            alguém está claramente escondendo a verdade
          </span>
          .
        </p>
        <p>
          Eu estou oficialmente convocando você para analisar o dossiê completo
          do caso, cruzar as evidências e montar sua própria teoria sobre{" "}
          <span className="font-medium">quem matou Bia</span>,{" "}
          <span className="font-medium">por quê</span> e{" "}
          <span className="font-medium">o que mais pode estar em jogo</span>.
        </p>
        <p className="pt-1 text-gray-300">
          <span className="font-semibold text-red-400">Pergunta:</span>{" "}
          você está pronto(a) para assumir essa investigação?
        </p>
      </div>

      {/* Botões de escolha */}
      <div className="mt-2 flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option)}
            className="shine-button w-full rounded-full border border-red-800/70 bg-red-600/90 px-4 py-3 text-sm md:text-base font-medium text-white transition hover:bg-red-500 hover:border-red-500 active:scale-[0.98]"
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Rodapé discreto */}
      <p className="mt-1 text-[11px] text-center text-gray-500">
        Esta é uma simulação de investigação para fins de entretenimento. 
        Nenhum nome, data ou personagem representa pessoas reais.
      </p>
    </div>
  );
}
