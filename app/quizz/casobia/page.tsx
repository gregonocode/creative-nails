// app/quizz/casobia/page.tsx
"use client";

import { useState } from "react";
import type { QuizOption } from "../../types/quiz";
import { CasoBiaQuizLayout } from "./CasoBiaQuizLayout";
import { CasoBiaStepIntro } from "./steps/CasoBiaStepIntro";
import { CasoBiaStepBriefing } from "./steps/CasoBiaStepBriefing";
import {
  CasoBiaStepPerfil,
  type PerfilInvestigadorData,
} from "./steps/CasoBiaStepPerfil";
import { CasoBiaStepPistas } from "./steps/CasoBiaStepPistas";
import { CasoBiaStepRaspadinha } from "./steps/CasoBiaStepRaspadinha";

type StepId =
  | "intro"
  | "briefing"
  | "perfil"
  | "pistas"
  | "raspadinha"
  | "oferta";

export default function CasoBiaQuizPage() {
  const [step, setStep] = useState<StepId>("intro");

  // Perfil do investigador (pra usar na oferta)
  const [perfilInvestigador, setPerfilInvestigador] =
    useState<PerfilInvestigadorData | null>(null);

  // Se o bônus de +9 arquivos foi desbloqueado
  const [bonusDesbloqueado, setBonusDesbloqueado] = useState(false);

  function handleIntroOption(option: QuizOption) {
    if (option.id === "mais-infos" || option.id === "pronto") {
      setStep("briefing");
    }
  }

  function handleBriefingContinue(option: QuizOption) {
    if (option.id === "continuar-perfil") {
      setStep("perfil");
    }
  }

  function handlePerfilComplete(perfil: PerfilInvestigadorData) {
    setPerfilInvestigador(perfil);
    setStep("pistas");
  }

  function handlePistasContinue() {
    setStep("raspadinha");
  }

  function handleRaspadinhaUnlocked() {
    setBonusDesbloqueado(true);
    setStep("oferta");
  }

  return (
    <CasoBiaQuizLayout>
      {step === "intro" && (
        <CasoBiaStepIntro onSelectOption={handleIntroOption} />
      )}

      {step === "briefing" && (
        <CasoBiaStepBriefing onContinue={handleBriefingContinue} />
      )}

      {step === "perfil" && (
        <CasoBiaStepPerfil onComplete={handlePerfilComplete} />
      )}

      {step === "pistas" && (
        <CasoBiaStepPistas onContinue={handlePistasContinue} />
      )}

      {step === "raspadinha" && (
        <CasoBiaStepRaspadinha onUnlockedBonus={handleRaspadinhaUnlocked} />
      )}

      {step === "oferta" && (
        <div className="space-y-4 text-sm md:text-base text-gray-200">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-50">
            Oferta do Dossiê do Caso Bia Andrade
          </h2>

          <p>
            Agora que você desbloqueou a pista secreta, o seu dossiê não tem
            mais apenas{" "}
            <span className="font-semibold text-red-400">15 arquivos</span>, e
            sim um total de{" "}
            <span className="font-semibold text-red-400">24 arquivos</span> em
            PDF: documentos oficiais, prints, depoimentos, bilhetes e muito
            mais para investigar com quem você quiser.
          </p>

          {perfilInvestigador && (
            <p>
              Pelo seu perfil, você é um investigador(a){" "}
              <span className="font-semibold text-red-300">
                {perfilInvestigador.estilo.label.toLowerCase()}
              </span>{" "}
              que presta atenção principalmente em{" "}
              <span className="font-semibold text-red-300">
                {perfilInvestigador.abordagem.label.toLowerCase()}
              </span>
              . Esse caso foi feito sob medida pra esse tipo de mente curiosa.
            </p>
          )}

          {bonusDesbloqueado && (
            <p className="text-xs text-red-300">
              *Os 9 arquivos extras foram desbloqueados exclusivamente porque
              você avançou até a pista secreta deste quiz.
            </p>
          )}

          <p className="text-sm text-gray-300">
            Aqui depois vamos colocar o botão final para o checkout / página de
            venda, com o preço e os detalhes completos da oferta.
          </p>
        </div>
      )}
    </CasoBiaQuizLayout>
  );
}
