// app/quizz/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { QuizLayout } from "../components/quiz/QuizLayout";
import { QuizStepIntro } from "../components/quiz/QuizStepIntro";
import { ScratchCard } from "../components/quiz/ScratchCard";
import type { QuizOption, QuizStepId } from "../types/quiz";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";



export default function QuizzPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Define o ID do pixel na window (igual ao snippet da Utmify)
    (window as any).googlePixelId = "6934df829f45845fcb041a76";

    // Cria o script do pixel
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel-google.js";

    document.head.appendChild(script);

    // (opcional) limpar no unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [currentStep, setCurrentStep] = useState<QuizStepId>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scratchRevealed, setScratchRevealed] = useState(false); // <-- novo

  // ETAPA 1 – INTRO
  function handleSelectIntro(option: QuizOption) {
    setAnswers((prev) => ({
      ...prev,
      conhece_produto: option.value ?? option.id,
    }));

    setCurrentStep("pergunta1");
  }

  // ETAPA 2 – ÁREA QUE INCOMODA
  function handleSelectArea(areaId: string) {
    setAnswers((prev) => ({
      ...prev,
      area_principal: areaId,
    }));

    setCurrentStep("pergunta2");
  }

  // ETAPA 3 – TEMPO DO PROBLEMA
  function handleSelectTempo(tempoId: string) {
    setAnswers((prev) => ({
      ...prev,
      tempo_manchas: tempoId,
    }));

    setCurrentStep("pergunta3");
  }

  // ETAPA 4 – O QUE JÁ TENTOU
  function handleSelectTentativa(tentativaId: string) {
    setAnswers((prev) => ({
      ...prev,
      o_que_ja_tentou: tentativaId,
    }));

    // próxima etapa: tela de 4 benefícios em 1
    setCurrentStep("beneficios");
  }

  // ETAPA 5 – BENEFÍCIOS EM 1
  function handleSelectBeneficio(beneficioId: string) {
    setAnswers((prev) => ({
      ...prev,
      beneficio_principal: beneficioId,
    }));

    // por enquanto manda para "resultado" (depois entra vídeo + raspadinha + oferta)
    setCurrentStep("ingredientes");
  }

  


  function renderStep() {
    // ETAPA 1 – INTRO
    if (currentStep === "intro") {
      return <QuizStepIntro onSelectOption={handleSelectIntro} />;
    }

    // ETAPA 2 – ÁREA QUE INCOMODA
    if (currentStep === "pergunta1") {
      return (
        <div className="flex flex-col gap-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Passo 1 de 5
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Qual área do corpo mais te incomoda pelas manchas?
            </h2>
            <p className="text-sm text-gray-500">
              Escolha a opção que mais representa o que você sente hoje.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => handleSelectArea("axilas")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Axilas
            </button>
            <button
              onClick={() => handleSelectArea("virilhas")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Virilhas
            </button>
            <button
              onClick={() => handleSelectArea("pescoco")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Pescoço
            </button>
            <button
              onClick={() => handleSelectArea("joelhos_cotovelos")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Joelhos / Cotovelos
            </button>
            <button
              onClick={() => handleSelectArea("rosto_melasma")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Rosto / Melasma
            </button>
            <button
              onClick={() => handleSelectArea("varias_areas")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Várias áreas ao mesmo tempo
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-1">
            Não se preocupe, isso é só para indicar o tratamento ideal para você.
          </p>
        </div>
      );
    }

    // ETAPA 3 – TEMPO DO PROBLEMA
    if (currentStep === "pergunta2") {
      return (
        <div className="flex flex-col gap-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Passo 2 de 5
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Há quanto tempo essas manchas te incomodam?
            </h2>
            <p className="text-sm text-gray-500">
              Isso ajuda a indicar o tempo ideal de tratamento para o seu caso.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => handleSelectTempo("menos_6_meses")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Menos de 6 meses
            </button>
            <button
              onClick={() => handleSelectTempo("6_12_meses")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              De 6 meses a 1 ano
            </button>
            <button
              onClick={() => handleSelectTempo("1_3_anos")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              De 1 a 3 anos
            </button>
            <button
              onClick={() => handleSelectTempo("mais_3_anos")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Mais de 3 anos
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-1">
            Quanto mais tempo de manchas, mais importante é seguir um tratamento contínuo.
          </p>
        </div>
      );
    }

    // ETAPA 4 – O QUE JÁ TENTOU
    if (currentStep === "pergunta3") {
      return (
        <div className="flex flex-col gap-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Passo 3 de 5
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              O que você já tentou para clarear essas manchas?
            </h2>
            <p className="text-sm text-gray-500">
              Isso ajuda a entender por que ainda não teve o resultado que merece.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => handleSelectTentativa("nunca_tentou")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Nunca tentei nada
            </button>
            <button
              onClick={() => handleSelectTentativa("cremes_comuns")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Sabonetes ou cremes comuns
            </button>
            <button
              onClick={() => handleSelectTentativa("receitas_caseiras")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Receitas caseiras
            </button>
            <button
              onClick={() => handleSelectTentativa("produtos_acidos")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Produtos com ácidos
            </button>
            <button
              onClick={() => handleSelectTentativa("outros_clareadores")}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Outros clareadores
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-1">
            Muita gente já tentou de tudo e só vê resultado quando começa um tratamento correto.
          </p>
        </div>
      );
    }

    // ETAPA 5 – TELA 4 BENEFÍCIOS EM 1
    if (currentStep === "beneficios") {
      return (
        <div className="flex flex-col gap-6">
          {/* Imagem 4 benefícios em 1 */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-2xl overflow-hidden">
              <Image
                src="/4beneficios.png"
                alt="4 benefícios em 1 - Amazolee Clareador"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Pergunta + botões */}
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Passo 4 de 5
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Quais benefícios você pretende usar primeiro?
            </h2>
            <p className="text-sm text-gray-500">
              Escolha o foco principal do seu tratamento com o Amazolee Clareador.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() =>
                handleSelectBeneficio("esfoliar_clarear_manchas")
              }
              className="w-full rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
            >
              Esfoliar + clarear manchas
            </button>
            <button
              onClick={() =>
                handleSelectBeneficio("esfoliar_clarear_axilas")
              }
              className="w-full rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
            >
              Esfoliar + clarear axilas
            </button>
            <button
              onClick={() =>
                handleSelectBeneficio("esfoliar_clarear_virilhas")
              }
              className="w-full rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
            >
              Esfoliar + clarear virilha
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-1">
            Em todos os casos, o Amazolee atua clareando, esfoliando suavemente e deixando a pele mais macia.
          </p>
        </div>
      );
    }
    // ETAPA – VOCÊ SABIA? INGREDIENTES NATURAIS
if (currentStep === "ingredientes") {
  return (
    <div className="flex flex-col gap-6">
      {/* Título / contexto */}
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
          Você sabia?
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          porque O Amazolee Clareador funciona ?
        </h2>
        <p className="text-sm text-gray-500">
          A combinação de ingredientes naturais potencializa o clareamento sem
          agredir a pele.
        </p>
      </div>

      {/* Layout imagem + ingredientes */}
<div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
  {/* Imagem em formato banner, ocupando a largura da div pai */}
  <div className="w-full md:w-1/2">
    <div className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden my-2">
      <Image
        src="/poteingredientes.png"
        alt="Amazolee Clareador com os 4 ingredientes principais"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>

        {/* Lista dos 4 ingredientes */}
        <div className="w-full md:w-1/2 space-y-3 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-900">Mulateiro</p>
            <p className="text-xs md:text-sm">
              Planta da Amazônia com alto poder cicatrizante e antioxidante,
              ajuda a{" "}
              <span className="font-semibold">uniformizar o tom da pele</span>.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Dolomita</p>
            <p className="text-xs md:text-sm">
              Mineral rico em cálcio e magnésio, auxilia na{" "}
              <span className="font-semibold">regeneração da pele</span> e no
              clareamento de manchas.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Óleo de Melaleuca</p>
            <p className="text-xs md:text-sm">
              Combate bactérias e inflamações, mantendo a pele{" "}
              <span className="font-semibold">limpa e saudável</span>.
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Argila Branca</p>
            <p className="text-xs md:text-sm">
              Suaviza a pele, clareia naturalmente e{" "}
              <span className="font-semibold">
                controla a oleosidade sem agredir
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* CTA para seguir para o antes/depois */}
      <button
        onClick={() => setCurrentStep("antes_depois")}
        className="w-full rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
      >
        Não sabia, Muito interessante!
      </button>
    </div>
  );
}

    // ETAPA 6 – ANTES E DEPOIS (depoimento visual)
    if (currentStep === "antes_depois") {
      return (
        <div className="flex flex-col gap-6">
          {/* Imagem de antes e depois */}
          <div className="flex justify-center">
            <div className="relative w-full h-52 md:h-64 rounded-2xl overflow-hidden">
              <Image
                src="/axilaclara.png"
                alt="Antes e depois de axila com Amazolee Clareador"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto e pergunta */}
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Resultado real
            </p>
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              Esse foi o resultado da Marcela Gomes, de Anápolis (GO).
            </h2>
            <p className="text-sm text-gray-500">
              Ela contou pra gente que teve esse resultado em apenas{" "}
              <span className="font-semibold text-pink-500">
                2 semanas de uso contínuo
              </span>
              . Gostou desse resultado?
            </p>
          </div>

          {/* Botões de escolha */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => {
                setAnswers((prev) => ({
                  ...prev,
                  gostou_resultado: "sim",
                }));
                setCurrentStep("resultado"); // depois podemos trocar para raspadinha/oferta
              }}
              className="w-full rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
            >
              Sim, eu quero ter esse resultado!
            </button>

            <button
              onClick={() => {
                setAnswers((prev) => ({
                  ...prev,
                  gostou_resultado: "gostou",
                }));
                setCurrentStep("resultado");
              }}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Nossa, gostei bastante!
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-1">
            Cada pele reage de um jeito, mas seguir direitinho o uso aumenta
            muito a chance de ter um resultado parecido.
          </p>
        </div>
      );
    }
        // ETAPA FINAL – OPÇÃO DE PAGAR SÓ QUANDO CHEGAR
    if (currentStep === "resultado") {
      return (
        <div className="flex flex-col gap-6">
          {/* Imagem segurando o produto */}
          <div className="flex justify-center">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden">
              <Image
                src="/segurando.png"
                alt="Receba o Amazolee Clareador e pague só quando chegar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Texto principal */}
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Pagamento só na entrega
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Temos a opção de você só pagar o{" "}
              <span className="text-pink-500">Amazolee Clareador</span>{" "}
              quando ele chegar na sua casa!
            </h2>

            <p className="text-sm text-gray-500">
              Seu pedido é enviado com entrega rápida pelo entregador, e
              você recebe o produto em{" "}
              <span className="font-semibold text-pink-500">até 24 horas</span>{" "}
              na sua região. O pagamento só é feito na hora da entrega.
            </p>
          </div>

          {/* Botões de escolha */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => {
                setAnswers((prev) => ({
                  ...prev,
                  preferencia_pagamento: "pagar_na_entrega",
                }));
                // aqui depois vamos redirecionar para o checkout "raspadinha"
                setScratchRevealed(false);
                setCurrentStep("raspadinha"); // vai para raspadinha
              }}
              className="w-full rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
            >
              Sim, quero pagar só quando chegar
            </button>

            <button
              onClick={() => {
                setAnswers((prev) => ({
                  ...prev,
                  preferencia_pagamento: "pagar_agora",
                }));
                // aqui depois podemos mandar raspadinha
                setScratchRevealed(false);
                setCurrentStep("raspadinha"); // também vai para raspadinha
              }}
              className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Prefiro pagar agora no cartão/Pix
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-1">
            Fica totalmente a seu critério: o importante é você se sentir segura
            com a forma de pagamento.
          </p>
        </div>
      );
    }

        // ETAPA – RASPADINHA DE DESCONTO
    if (currentStep === "raspadinha") {
      const descontoTexto = "R$ 41,00 de desconto";

      return (
        <div className="flex flex-col gap-6">
          {/* Cabeçalho da raspadinha */}
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Raspadinha exclusiva
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Raspe para descobrir seu desconto especial no kit com 2 frascos.
            </h2>
            <p className="text-sm text-gray-500">
              Essa condição de desconto não aparece para todo mundo, é só para
              quem chegou até essa etapa do quiz.
            </p>
          </div>

          {/* Cartão da raspadinha */}
                    {/* Cartão da raspadinha */}
          <div className="mx-auto w-full max-w-md space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-center text-pink-500 uppercase">
              Raspe a área abaixo
            </p>

            <div className="flex justify-center">
              <ScratchCard
                width={320}
                height={160}
                onReveal={() => setScratchRevealed(true)}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-pink-400">
                    Desconto revelado
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-pink-600">
                    {descontoTexto}
                  </span>
                </div>
              </ScratchCard>
            </div>
          </div>


          {!scratchRevealed ? (
            <div className="text-center text-sm text-gray-600 space-y-1">
              <p>
                Passe o dedo ou clique e arraste na área rosa para revelar seu
                desconto.
              </p>
              <p className="text-xs text-gray-400">
                Funciona no celular e no computador.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center text-sm text-gray-600">
                <p>Desconto revelado! Escolha abaixo como deseja seguir.</p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <button
                  onClick={() => {
                    setAnswers((prev) => ({
                      ...prev,
                      raspadinha_desbloqueada: "kit_2_frascos_197",
                    }));
                    // Confete 🎉
                    confetti({
                    particleCount: 120,
                    spread: 70,
                    origin: { y: 0.3 },
                    });
                    setCurrentStep("oferta"); // TODO: redirecionar para tela de preços/checkout com o desconto aplicado
                  }}
                  className="w-full rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
                >
                  Quero os 41 reais de desconto!
                </button>

                <button
                  onClick={() => {
                    setAnswers((prev) => ({
                      ...prev,
                      raspadinha_desbloqueada: "nao_quero_desconto",
                    }));
                    setCurrentStep("oferta"); // TODO: redirecionar para etapa de preços sem aplicar o desconto
                  }}
                  className="w-full rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
                >
                  Não quero os 41 reais de desconto
                </button>
              </div>
            </>
          )}
        </div>
      );
    }


        // ETAPA – OFERTA FINAL (escolha 1 ou 2 frascos)
    if (currentStep === "oferta") {
      return (
        <div className="flex flex-col gap-6">
          {/* Título / contexto da oferta */}
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] text-pink-500 uppercase">
              Oferta especial de hoje
            </p>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Escolha o kit ideal para o seu tratamento.
            </h2>

            <p className="text-sm text-gray-500">
              Na próxima tela você só preenche o endereço, escolhe o dia da
              entrega e pronto.
            </p>

            <p className="text-sm text-gray-600">
              Você só paga quando o{" "}
              <span className="font-semibold text-pink-500">
                Amazolee Clareador
              </span>{" "}
              chegar, direto com o entregador.
            </p>
          </div>

          {/* Cards de preços + imagens */}
          <div className="space-y-4">
            {/* Kit 2 frascos */}
           {/* Kit 2 frascos */}
<div className="rounded-2xl border border-pink-100 bg-white px-4 py-3 shadow-sm space-y-2">
  <div className="flex items-center gap-3">
    <Image
      src="/ofertadehoje.png"
      alt="Kit com 2 frascos de Amazolee Clareador"
      width={220}
      height={120}
      className="w-32 md:w-40 h-auto rounded-xl object-cover"
    />

    <div className="flex-1 space-y-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-500">
        Mais vantajoso
      </p>
      <p className="text-sm md:text-base font-semibold text-gray-900">
        Kit com 2 frascos
      </p>

      <div className="flex items-baseline gap-2">
        <span className="text-xs md:text-sm text-gray-400 line-through">
          R$ 238,00
        </span>
        <span className="text-lg md:text-xl font-bold text-pink-600">
          R$ 197,00
        </span>
      </div>
    </div>
  </div>

  {/* texto de economia ocupando toda a largura do card */}
  <p className="text-xs text-gray-500">
    Você economiza R$ 41,00 e garante tratamento completo por mais tempo.
  </p>
</div>


            {/* 1 frasco */}
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <Image
                src="/umfrasco.png"
                alt="1 frasco de Amazolee Clareador"
                width={180}
                height={110}
                className="w-28 md:w-32 h-auto rounded-xl object-cover"
              />

              <div className="flex-1 space-y-1">
                <p className="text-sm md:text-base font-semibold text-gray-900">
                  1 frasco
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg md:text-xl font-bold text-pink-600">
                    R$ 119,00
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  Ideal para testar o produto e começar o clareamento.
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-center text-gray-500">
            Pagamento só na entrega com{" "}
            <span className="font-semibold">cartão, Pix ou dinheiro</span>.
          </p>

          {/* Botões de escolha dos kits */}
          <div className="flex flex-col gap-3 mt-1">
            {/* 2 frascos com desconto */}
            <Link
              href="https://entrega.logzz.com.br/pay/KAEBZA/2-frasco-19700-principal"
              className="w-full inline-flex items-center justify-center rounded-full border border-pink-200 bg-pink-500 text-white font-medium py-3 text-sm md:text-base transition hover:bg-pink-600 hover:border-pink-300 active:scale-[0.98]"
            >
              Comprar 2 frascos com desconto 
            </Link>

            {/* 1 frasco sem desconto */}
            <Link
              href="https://entrega.logzz.com.br/pay/KAEBZA/1-frasco-11900"
              className="w-full inline-flex items-center justify-center rounded-full border border-pink-200 bg-pink-50 text-pink-600 font-medium py-3 text-sm md:text-base transition hover:bg-pink-100 active:scale-[0.98]"
            >
              Comprar 1 frasco sem desconto 
            </Link>
          </div>

          <p className="text-[11px] text-center text-gray-400 mt-1">
            Seu pedido será separado e entregue pela Logzz. Você só realiza o
            pagamento quando receber o Amazolee Clareador em mãos.
          </p>
        </div>
      );
    }


    // fallback de segurança (não deve cair aqui)
    return (
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Algo deu errado ao carregar o quiz. Tente voltar e responder novamente.
        </p>

        <pre className="mt-4 text-xs text-gray-400 bg-gray-50 rounded-lg p-3 text-left overflow-auto">
          {JSON.stringify({ currentStep, answers }, null, 2)}
        </pre>
      </div>
    );


    
  }

  return <QuizLayout>{renderStep()}</QuizLayout>;
}
