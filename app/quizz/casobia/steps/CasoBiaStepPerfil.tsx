// app/quizz/casobia/steps/CasoBiaStepPerfil.tsx
"use client";

import { useState } from "react";
import type { QuizOption } from "../../../types/quiz";

export type PerfilInvestigadorData = {
  estilo: QuizOption;
  abordagem: QuizOption;
};

type CasoBiaStepPerfilProps = {
  onComplete: (perfil: PerfilInvestigadorData) => void;
};

const estilos: QuizOption[] = [
  {
    id: "estilo-logico",
    label: "Lógico e analítico",
    value: "logico-analitico",
  },
  {
    id: "estilo-intuitivo",
    label: "Intuitivo e emocional",
    value: "intuitivo-emocional",
  },
  {
    id: "estilo-observador",
    label: "Observador silencioso",
    value: "observador-silencioso",
  },
];

const abordagens: QuizOption[] = [
  {
    id: "abordagem-documentos",
    label: "Analisar documentos e evidências",
    value: "focado-documentos",
  },
  {
    id: "abordagem-depoimentos",
    label: "Ouvir depoimentos e histórias",
    value: "focado-depoimentos",
  },
  {
    id: "abordagem-contradicoes",
    label: "Caçar contradições e furos",
    value: "focado-contradicoes",
  },
];

export function CasoBiaStepPerfil({ onComplete }: CasoBiaStepPerfilProps) {
  const [estiloSelecionado, setEstiloSelecionado] = useState<QuizOption | null>(null);
  const [abordagemSelecionada, setAbordagemSelecionada] = useState<QuizOption | null>(null);

  const prontoParaContinuar = !!estiloSelecionado && !!abordagemSelecionada;

  function handleContinuar() {
    if (!estiloSelecionado || !abordagemSelecionada) return;

    onComplete({
      estilo: estiloSelecionado,
      abordagem: abordagemSelecionada,
    });
  }

  function renderBotaoOpcao(
    option: QuizOption,
    isSelected: boolean,
    onClick: () => void
  ) {
    return (
      <button
        key={option.id}
        type="button"
        onClick={onClick}
        className={[
          "w-full rounded-xl border px-4 py-3 text-sm md:text-base text-left transition active:scale-[0.98]",
          isSelected
            ? "border-red-500 bg-red-600/90 text-white shadow-[0_0_20px_rgba(248,113,113,0.35)]"
            : "border-red-900/60 bg-black/30 text-gray-200 hover:border-red-500/80 hover:bg-red-900/20",
        ].join(" ")}
      >
        {option.label}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] tracking-[0.25em] uppercase text-red-400/80">
          Perfil de Investigador
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-50">
          Que tipo de mente analisa este caso?
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Suas escolhas vão influenciar como descrevemos seu perfil na fase final
          da investigação.
        </p>
      </div>

      {/* Pergunta 1 */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-200">
          1. Como você se descreveria ao analisar um crime?
        </p>
        <div className="flex flex-col gap-2">
          {estilos.map((option) =>
            renderBotaoOpcao(option, estiloSelecionado?.id === option.id, () =>
              setEstiloSelecionado(option)
            )
          )}
        </div>
      </div>

      {/* Pergunta 2 */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-200">
          2. Em que você presta mais atenção durante uma investigação?
        </p>
        <div className="flex flex-col gap-2">
          {abordagens.map((option) =>
            renderBotaoOpcao(
              option,
              abordagemSelecionada?.id === option.id,
              () => setAbordagemSelecionada(option)
            )
          )}
        </div>
      </div>

      {/* Botão continuar */}
      <div className="mt-2">
        <button
          type="button"
          onClick={handleContinuar}
          disabled={!prontoParaContinuar}
          className={[
            " shine-button w-full rounded-full px-4 py-3 text-sm md:text-base font-medium transition",
            prontoParaContinuar
              ? "border border-red-800/70 bg-red-600/90 text-white hover:bg-red-500 hover:border-red-500 active:scale-[0.98]"
              : "border border-gray-700 bg-gray-800/60 text-gray-500 cursor-not-allowed opacity-60",
          ].join(" ")}
        >
          Continuar investigação
        </button>
      </div>

      <p className="text-[11px] text-center text-gray-500">
        Essas respostas serão usadas mais à frente para montar o seu{" "}
        <span className="text-red-400">perfil oficial de investigador(a)</span>.
      </p>
    </div>
  );
}
