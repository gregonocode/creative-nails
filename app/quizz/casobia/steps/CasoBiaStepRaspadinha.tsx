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
  const [revealed, setRevealed] = useState(false);

  function handleReveal() {
    if (revealed) return;

    setRevealed(true);

    // Dispara um confetti simples quando a raspadinha é revelada
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.4 },
        scalar: 0.9,
      });
    } catch (err) {
      // se der algum erro no confetti, só ignora pra não quebrar o fluxo
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

      {/* Raspadinha */}
      <div className="flex justify-center">
        <ScratchCard
          width={320}
          height={160}
          onReveal={handleReveal}
        >
          <div className="px-4 py-2 flex flex-col items-center justify-center gap-2">
            {!revealed ? (
              <>
                <p className="text-sm md:text-base font-semibold text-gray-900">
                  Raspe aqui para descobrir
                </p>
                <p className="text-xs md:text-sm text-gray-700">
                  Quantos arquivos você pode levar deste caso?
                </p>
              </>
            ) : (
              <>
                <p className="text-sm md:text-base font-semibold text-gray-900">
                  Parabéns! Você destravou um mega dossiê.
                </p>
                <p className="text-xs md:text-sm text-gray-700">
                  Agora você pode levar{" "}
                  <span className="font-bold">24 arquivos de investigação</span>
                  : 15 documentos oficiais do caso +{" "}
                  <span className="font-semibold">9 novos arquivos extras</span>.
                </p>
              </>
            )}
          </div>
        </ScratchCard>
      </div>

      {/* Texto e botão depois de revelar */}
      {revealed ? (
        <div className="space-y-4 text-sm md:text-base text-gray-200">
          <p>
            Você acabou de Ganhar 🥳{" "}
            <span className="font-semibold text-red-400">
              9 novos documentos
            </span>{" "}
            sobre o Caso Bia Andrade. Somando tudo, o seu dossiê agora conta com{" "}
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
        </div>
      ) : (
        <p className="text-[11px] text-center text-gray-500">
          Raspe o cartão acima até revelar a mensagem completa para desbloquear
          os documentos extras.
        </p>
      )}
    </div>
  );
}
