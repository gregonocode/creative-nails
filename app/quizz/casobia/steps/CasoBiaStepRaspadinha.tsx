// app/quizz/casobia/steps/CasoBiaStepRaspadinha.tsx
"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { ScratchCard } from "../../../components/quiz/ScratchCard";

type CasoBiaStepRaspadinhaProps = {
  onUnlockedBonus: () => void;
};

export function CasoBiaStepRaspadinha({
  onUnlockedBonus,
}: CasoBiaStepRaspadinhaProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [fullyRevealed, setFullyRevealed] = useState(false);

  function handleScratchStart() {
    if (!hasStarted) {
      setHasStarted(true);
    }
  }

  function handleReveal() {
    if (fullyRevealed) return;

    setFullyRevealed(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.4 },
        scalar: 0.9,
      });
    } catch (err) {
      console.error("Erro ao disparar confetti:", err);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] tracking-[0.25em] uppercase text-red-400/80">
          Pista secreta desbloqueável
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-50">
          Chegaram novos documentos sobre o caso
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Uma nova remessa de arquivos acabou de chegar à promotoria. 
          Raspe o cartão abaixo e descubra{" "}
          <span className="font-semibold text-red-400">
            quantos documentos você pode levar
          </span>{" "}
          do Caso Bia Andrade.
        </p>
      </div>

      {/* Texto "raspe aqui" acima da raspadinha */}
      {!hasStarted && (
        <p className="text-center text-sm md:text-base font-medium text-red-200">
          Passe o dedo sobre o cartão para raspar e liberar sua recompensa.
        </p>
      )}

      {/* Raspadinha */}
      <div className="flex justify-center">
        <ScratchCard
          width={320}
          height={160}
          onReveal={handleReveal}
          onScratchStart={handleScratchStart}
        >
          <div className="px-4 py-2 flex flex-col items-center justify-center gap-2">
            <p className="text-sm md:text-base font-semibold text-gray-100">
              Pista secreta do Caso Bia
            </p>
            <p className="text-xs md:text-sm text-gray-300">
              Raspe para liberar novos documentos de investigação.
            </p>
          </div>
        </ScratchCard>
      </div>

      {/* Texto e botão depois de começar a raspar */}
      {hasStarted ? (
        <div className="space-y-4 text-sm md:text-base text-gray-200">
          <p>
            <span className="font-semibold text-red-400">
              Parabéns! Você acabou de ganhar 9 novos documentos
            </span>{" "}
            sobre o Caso Bia Andrade. Somando com os 15 arquivos oficiais
            do dossiê, agora você tem acesso a{" "}
            <span className="font-semibold">24 arquivos em PDF</span> para
            investigar: relatórios, prints, depoimentos, bilhetes e muito mais.
          </p>
          <p>
            Na próxima etapa, vou te mostrar como ter acesso a{" "}
            <span className="font-semibold">
              todo esse material para imprimir e jogar
            </span>{" "}
            em casa, em casal ou com um grupo de amigos.
          </p>

          <button
            type="button"
            onClick={onUnlockedBonus}
            className="shine-button w-full rounded-full border border-red-800/70 bg-red-600/90 px-4 py-3 text-sm md:text-base font-medium text-white transition hover:bg-red-500 hover:border-red-500 active:scale-[0.98]"
          >
            Quero ver como ter acesso a esses 24 arquivos
          </button>

          {!fullyRevealed && (
            <p className="text-[11px] text-center text-gray-500">
              Você já garantiu seus 9 arquivos extras, mas pode continuar
              raspando o cartão só pela experiência.
            </p>
          )}
        </div>
      ) : (
        <p className="text-[11px] text-center text-gray-500">
          Raspe o cartão para começar a revelar sua recompensa especial.
        </p>
      )}
    </div>
  );
}
