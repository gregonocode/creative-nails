// app/quizz/casobia/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { CasoBiaStepOferta } from "./steps/CasoBiaStepOferta";

type StepId =
  | "intro"
  | "briefing"
  | "perfil"
  | "pistas"
  | "raspadinha"
  | "oferta";

export default function CasoBiaQuizPage() {
  const router = useRouter();

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

  function handleCheckoutClick() {
    // 👉 Ajuste aqui para a URL real do seu checkout
    // Ex: router.push("https://sua-plataforma.com/checkout/caso-bia");
    router.push("/casobia/checkout");
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
        <CasoBiaStepOferta
          perfilInvestigador={perfilInvestigador}
          bonusDesbloqueado={bonusDesbloqueado}
          onClickCheckout={handleCheckoutClick}
        />
      )}
    </CasoBiaQuizLayout>
  );
}
