// app/quizz/casobia/page.tsx
"use client";

import { useState } from "react";
import Script from "next/script";
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
    // Mantido caso ainda queira usar router em outra situação
    router.push("/casobia/checkout");
  }

  return (
    <>
      {/* UTMify Pixel */}
      <Script
        id="utmify-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.pixelId = "693c9040d8d1c51c530746b2";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `,
        }}
      />

      {/* UTMify UTMs */}
      <Script
        id="utmify-utms"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        strategy="afterInteractive"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
      />

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
    </>
  );
}
