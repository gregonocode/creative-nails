// app/ofertaClient/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import "@/app/components/quiz/css/shine.css";
import SocialProofToast from "@/app/components/SocialProofToast";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const UTM_STORAGE_KEY = "sereja_utm_qs";

function pickTrackingParamsFromSearch(search: string) {
  const sp = new URLSearchParams(search);
  const out = new URLSearchParams();

  for (const [k, v] of sp.entries()) {
    const key = k.toLowerCase();
    if (key.startsWith("utm_")) out.set(k, v);
    if (key === "fbclid") out.set(k, v);
  }

  return out;
}

function getStoredTrackingParams(): URLSearchParams {
  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return new URLSearchParams();
    return new URLSearchParams(raw);
  } catch {
    return new URLSearchParams();
  }
}

function storeTrackingParams(params: URLSearchParams) {
  try {
    const s = params.toString();
    if (s) window.localStorage.setItem(UTM_STORAGE_KEY, s);
  } catch {}
}

function buildCheckoutUrl(base: string) {
  const fromUrl = pickTrackingParamsFromSearch(window.location.search);
  const stored = getStoredTrackingParams();

  // mescla: prioriza o que está na URL atual, completa com o salvo
  for (const [k, v] of stored.entries()) {
    if (!fromUrl.has(k)) fromUrl.set(k, v);
  }

  // salva de volta (pra manter atualizado)
  storeTrackingParams(fromUrl);

  const qs = fromUrl.toString();
  if (!qs) return base;

  // preserva se já tiver query no base
  return base.includes("?") ? `${base}&${qs}` : `${base}?${qs}`;
}

export default function OfertaPage() {
  const sp = useSearchParams();

  useEffect(() => {
    const tracking = pickTrackingParamsFromSearch(window.location.search);
    const prev = getStoredTrackingParams();

    for (const [k, v] of prev.entries()) {
      if (!tracking.has(k)) tracking.set(k, v);
    }

    storeTrackingParams(tracking);
  }, []);

  const nomeRaw = sp.get("nome") ?? "";
  const nome = useMemo(() => {
    const cleaned = nomeRaw.trim();
    if (!cleaned) return "aí";
    return cleaned.split(" ").filter(Boolean)[0] ?? cleaned;
  }, [nomeRaw]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // URLs em produção
  function goCheckout27() {
    const url = buildCheckoutUrl("https://pay.sereja.com.br/checkout/DjV1ETPC");
    window.location.assign(url);
  }

  function goCheckout10() {
    const url = buildCheckoutUrl("https://pay.sereja.com.br/checkout/Y6rCfPS5");
    window.location.assign(url);
  }

  function goCheckout1990() {
    const url = buildCheckoutUrl("https://pay.sereja.com.br/checkout/DjV1ETPC?p=oferta");
    window.location.assign(url);
  }

  function scrollToPlanos() {
    const el = document.getElementById("planos");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-[100dvh] bg-white text-slate-900">
      <SocialProofToast everyMs={18_000} durationMs={3_000} />
      {/* ===========================
          HERO (novo) — foco aluguel
         =========================== */}
      <section className="relative overflow-hidden">
        {/* fundo leve azul -> verde limão */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-lime-50" />
        <div className="absolute -top-28 right-[-140px] h-[420px] w-[420px] rounded-full bg-lime-200/40 blur-3xl" />
        <div className="absolute -bottom-28 left-[-140px] h-[420px] w-[420px] rounded-full bg-sky-200/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
          {/* chip */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            Plano de kitnets para aluguel • baixo custo
          </div>

          {/* headline */}
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {nome}, aqui está seu plano pra kitnets de baixo custo{" "}
            <span className="bg-gradient-to-r from-sky-700 to-lime-600 bg-clip-text text-transparent">
              para aluguel
            </span>
            .
          </h1>

          {/* subheadline */}
          <p className="mt-4 max-w-[860px] text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
            A ideia é simples: <b>reduzir o custo por unidade</b> usando um método de construção mais econômico
             e com o mesmo orçamento, sair do “vou fazer uma kitinete” pra{" "}
            <b>fazer duas com mesmo valor!</b>.
          </p>

          {/* cards (nova proposta) */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-slate-500">ECONOMIA DAS GRANDES</p>
              <p className="mt-2 text-base font-extrabold text-slate-900">
                Até <span className="text-lime-700">~50%</span> mais barato*
              </p>
              <p className="mt-2 text-sm text-slate-600">
                com o valor de uma kitinete você faz duas, apenas substituindo o método tradicional por um mais econômico.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-slate-500">RENDA MENSAL</p>
              <p className="mt-2 text-base font-extrabold text-slate-900">
                tenha uma renda todo mês com aluguel de kitinetes
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Deixe suas kitinetes trabalhar pra você e tenha uma renda todo mês, sem precisar vender ou depender de valorização.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-slate-500">APENAS COMEÇE</p>
              <p className="mt-2 text-base font-extrabold text-slate-900">
                Lhe mostramos 3 modelos de emprestimo para começar a construir.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Lhe mostramos 3 modelos para você começar mesmo que nao tenha 1 real no bolso!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollToPlanos}
              className={cn(
                "shine-button w-full rounded-2xl px-6 py-4 text-base font-extrabold text-white shadow-sm transition sm:w-auto",
                "bg-gradient-to-r from-sky-600 to-lime-600 hover:from-sky-700 hover:to-lime-700",
                "focus:outline-none focus:ring-4 focus:ring-lime-200"
              )}
            >
              Quero construir economizando!
            </button>

            <p className="text-xs text-slate-500">
              *Varia por região, padrão e acabamento. Aqui é um caminho de economia (sem “mágica”).
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
  <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
    {/* Cabeçalho */}
    <div className="max-w-[860px]">
      <div className="inline-flex items-center gap-2 rounded-full border border-lime-200 bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-800">
        <span className="h-2 w-2 rounded-full bg-lime-500" />
        Por que funciona (e por que fica mais barato)
      </div>

      <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        O maior custo de uma obra não é “subir parede”.
        <span className="block bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
  O maior custo é o acabamento.
</span>
      </h2>

      <p className="mt-4 text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
        Levantar as paredes é a parte “tranquila”. O problema começa quando você escolhe o método
        convencional: a parede crua fica feia, e aí entra um efeito dominó de etapas (e gastos)
        até ficar apresentável.
      </p>
    </div>

    {/* Conteúdo */}
    <div className="mt-7 grid gap-4 lg:grid-cols-2">
      {/* Caixa: convencional */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-extrabold text-slate-900">
          O que acontece na alvenaria convencional
        </p>

        <p className="mt-2 text-sm text-slate-700">
          Além de gastar bastante cimento pra assentar bloco por bloco, você quase sempre precisa
          “corrigir” a parede depois pra ela ficar bonita.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>❌ Chapisco</li>
          <li>❌ Reboco</li>
          <li>❌ Selador</li>
          <li>❌ Massa corrida</li>
          <li>❌ Lixamento</li>
          <li>❌ Pintura</li>
        </ul>

        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-bold text-rose-700">
            É aqui que o custo explode.
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Dependendo da região e do padrão, <b>uma parede dos dois lados</b> (com todos esses passos)
            pode chegar perto de <b>R$300/m²</b> só de acabamento.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            *Valor estimado e variável por cidade, mão de obra e padrão de material.
          </p>
        </div>
      </div>

      {/* Caixa: econômica */}
      <div className="rounded-3xl border border-lime-200 bg-lime-50 p-6 shadow-sm">
        <p className="text-sm font-extrabold text-slate-900">
          Como a alvenaria econômica reduz isso
        </p>

        <p className="mt-2 text-sm text-slate-700">
          ✅ A proposta é usar <b>alvenaria econômica com tijolo ecológico</b> pra diminuir etapas caras.
          Em muitos casos, a parede já fica com um visual bonito logo após levantar — e você não precisa
          passar por todo aquele “ciclo de acabamento”.
        </p>

        <div className="mt-4 grid gap-3">
          <div className="rounded-2xl border border-lime-200 bg-white p-4">
            <p className="text-xs font-semibold text-lime-800">O que você economiza</p>
            <p className="mt-1 text-sm text-slate-700">
             ✅ Menos chapisco/reboco/massa corrida/lixamento → menos material, menos mão de obra, menos tempo.
            </p>
          </div>

          <div className="rounded-2xl border border-lime-200 bg-white p-4">
            <p className="text-xs font-semibold text-lime-800">Por que isso ajuda no aluguel</p>
            <p className="mt-1 text-sm text-slate-700">
              ✅ Quando você baixa o custo por unidade, o orçamento rende. E aí vem a lógica:
              <b> por que fazer 1, se dá pra fazer 2?</b>
            </p>
          </div>

          <div className="rounded-2xl border border-lime-200 bg-white p-4">
            <p className="text-xs font-semibold text-lime-800">O que eu vou te ensinar</p>
            <p className="mt-1 text-sm text-slate-700">
              ✅ Um modelo simples de kitnets para aluguel com foco em baixo custo, repetição de layout e execução direta
              (sem frescura que estoura obra).
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-600">
          Obs: não é “milagre”. É método + escolhas certas + corte de etapas que drenam dinheiro.
        </p>
      </div>
    </div>

    {/* Imagem (1647 x 1559) */}
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <img
        src="/oferta/alvenaria.webp"
        alt="Comparação visual: alvenaria convencional vs alvenaria econômica (tijolo ecológico)"
        className="h-auto w-full object-cover"
      />
    </div>
  </div>
</section>
<section className="bg-white">
  <div className="mx-auto w-full max-w-[980px] px-4 py-8 sm:py-10">
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Dá pra começar mesmo sem dinheiro
          </div>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Você não precisa ter tudo à vista pra sair do papel.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Muita gente trava porque acha que só dá pra construir quando tiver “uma bolada”.
            Na prática, o jogo é <b>estratégia</b>: você começa com um plano, escolhe o modelo certo
            e organiza o caminho pra viabilizar a obra sem se enrolar.
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-bold text-slate-900">
              ✅ Dentro do pack, tem um módulo ensinando <span className="text-amber-700">3 modelos de financiamento</span>
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Pra você entender as opções, o que faz sentido em cada cenário. <strong>Você tem a vantagem de fazer o dobro com o mesmo orçamento!</strong>
            </p>
          </div>
        </div>

        {/* Mini card lateral */}
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:max-w-[280px]">
          <p className="text-xs font-semibold text-slate-500">O que isso resolve</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• ✅ Dar pra começar do zero</li>
            <li>• ✅ Dar pra começar com pouco dinheiro</li>
            <li>• ✅ O financiamneto se pagar sozinho</li>
          </ul>
        </div>
      </div>

      {/* Botão para ir pros planos */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("planos");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={cn(
            "shine-button w-full rounded-2xl px-6 py-4 text-base font-extrabold text-white shadow-sm transition sm:w-auto",
            "bg-gradient-to-r from-sky-600 to-lime-600 hover:from-sky-700 hover:to-lime-700",
            "focus:outline-none focus:ring-4 focus:ring-lime-200"
          )}
        >
          QUERO COMEÇAR!
        </button>

        <p className="mt-3 text-xs text-slate-500">
          Acesso imediato. Você recebe tudo no e-mail após a compra.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* ===========================
          <section> O QUE VOCÊ RECEBE
         =========================== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            O que você vai receber
          </h2>
          <p className="mt-2 max-w-[780px] text-slate-700">
            Tudo que você vai receber ainda hoje!
          </p>
          {/* Banner 40 modelos */}
         <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img
        src="/oferta/40 modelos.webp"
        alt="40+ modelos de plantas 3D de quitinetes de baixo custo"
         className="h-auto w-full object-cover"
       />
        </div>


          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "+ 40 modelos 3D de quitinetes de baixo custo",
                desc: "modelos prontos pra você se inspirar e criar seus proprior projetos",
              },
              {
                title: "3 modelo de emprestimo pra começar do zero",
                desc: "mesmo que você não tenha 1 real no bolso, tem um modelo de financiamento que se paga sozinho com o aluguel das kitinetes",
              },
              {
                title: "Metodo de alvenaria economica",
                desc: "um método de construção mais econômico, que corta etapas caras de acabamento e deixa a parede com um visual apresentável logo após levantar",
              },
              {
                title: "Formula completa",
                desc: "pra você não ficar perdido e ter clareza do caminho, a gente te entrega uma fórmula simples pra você seguir e ter o melhor resultado possível",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-lg font-semibold">{c.title}</p>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  
{/* ===========================
    <section> IA QUE CRIA PLANTAS 3D
   =========================== */}
<section className="bg-white">
  <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
    <div className="rounded-3xl border border-sky-100 bg-sky-50 p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-xl shadow-sm">
          🎁
          
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Crie suas próprias plantas 3D (realistas) com IA treinada por mim!
          </h2>
          <p className="mt-2 max-w-[820px] text-sm text-slate-700 sm:text-base">
            Hoje, mandar fazer uma planta 3D com alguém costuma custar em média{" "}
            <b>de R$500 a R$3.000</b> por projeto (dependendo do nível de detalhe).
            Aqui você pode gerar as suas quando quiser.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs text-slate-600">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Faça quantas vezes quiser • Sem mensalidade
          </div>
        </div>
      </div>

      {/* passo a passo */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-sky-100 bg-white p-4">
          <p className="text-xs font-semibold text-sky-700">PASSO 1</p>
          <p className="mt-1 font-semibold text-slate-900">Rascunhe no papel</p>
          <p className="mt-2 text-sm text-slate-600">
            Faça seu desenho simples com papel e caneta (do seu jeito).
          </p>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-white p-4">
          <p className="text-xs font-semibold text-sky-700">PASSO 2</p>
          <p className="mt-1 font-semibold text-slate-900">Envie para a IA</p>
          <p className="mt-2 text-sm text-slate-600">
            Você manda o rascunho e a IA entende a ideia do layout.
          </p>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-white p-4">
          <p className="text-xs font-semibold text-sky-700">PASSO 3</p>
          <p className="mt-1 font-semibold text-slate-900">Receba em 3D</p>
          <p className="mt-2 text-sm text-slate-600">
            A IA transforma pra você em um modelo 3D e você pode repetir quantas vezes quiser.
          </p>
        </div>
      </div>

      {/* banner rascunho */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm">
        <img
          src="/oferta/rascunho.webp"
          alt="Rascunho no papel transformado em planta 3D com IA"
          className="h-auto w-full object-cover"
        />
      </div>
 
      {/* reforço final */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          ✅ Use pra testar layouts, ganhar tempo e evitar erro caro antes de construir.
        </p>

        {/* Se quiser, você pode apontar esse botão pro checkout 19,90 ou 27 */}
        {/* <button
          type="button"
          onClick={goCheckout1990}
          className={cn(
            "shine-button w-full rounded-2xl px-5 py-4 text-base font-semibold text-white shadow-sm transition sm:w-auto",
            "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
          )}
        >
          Quero acessar a IA
        </button> */}
      </div>
    </div>
  </div>
</section>
    
      {/* BONUS IMEDIATO */}
<div className="mt-6 rounded-3xl border border-sky-200 bg-[#ffffff] p-5 shadow-sm sm:p-6">
  <div className="grid gap-5 sm:grid-cols-[220px_1fr] sm:items-center">
    {/* imagem (placeholder) */}
    <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
      <img
        src="/oferta/dicas.webp"
        alt="Bônus: Pack de decoração visual"
        className="h-[160px] w-full object-cover sm:h-[180px]"
      />
    </div>

    {/* texto */}
    <div>
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-lg shadow-sm">
          🎁
        </span>
        <p className="text-sm font-semibold text-sky-700">Bônus imediato</p>
      </div>

      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
        Se você adquirir qualquer plano nos próximos 10 minutos…
      </h3>

      <p className="mt-2 text-sm text-slate-700">
        Vamos te dar <b>totalmente de graça</b> um combo de videos de outras obras que foram feitas com o método de baixo custo <b>alvenaria economica</b>, pra você se inspirar
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs text-slate-600">
        <span className="h-2 w-2 rounded-full bg-sky-400" />
        Liberado automaticamente após a compra
      </div>
    </div>
  </div>
</div>


      {/* ===========================
          <section> COMPARATIVO (27 vs 10)
         =========================== */}
      <section className="bg-sky-50">
        <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Escolha a melhor opção!
          </h2>

          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {/* principal */}
            <div className="relative overflow-hidden rounded-3xl border border-sky-200 bg-white p-6 shadow-sm">
              <div className="absolute right-4 top-4 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white">
                Recomendado
              </div>

              <p className="text-lg font-semibold">Pack Completo</p>
              <p className="mt-1 text-3xl font-bold">R$27</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>✅ +40 modelos 3D baixo orçamento</li>
                <li>✅ Metodo alvenaria economica completa</li>
                <li>✅ Ideias visuais pra melhorar o ambiente gastando pouco</li>
                <li>✅ tabelas de objetivos para juntar de mil a 50 mil</li>
                <li>✅ Dica de 3 modelo de financiamento pra começar do zero</li>
                <li>✅ combo de videos de outras obras</li>
                <li>✅ faça as suas proprias com IA de rascunho para trasformar em 3D ( sem custo ) </li>
                
              </ul>


              <button
                type="button"
                onClick={goCheckout27}
                className={cn(
                  "shine-button mt-6 w-full rounded-2xl px-5 py-4 text-base font-semibold text-white shadow-sm transition",
                  "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
                )}
              >
                Sim, quero o completo
              </button>

            
            </div>

            {/* economico */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-semibold">Pack Basico</p>
              <p className="mt-1 text-3xl font-bold">R$10</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>✅ +25 modelos baixo orçamento</li>
                <li>✅ Menos modelos/variações</li>
                
                <li>✅ Ideal se você só quer “dar uma olhada”</li>
              </ul>

              <button
                type="button"
                onClick={() => setIsPopupOpen(true)}
                className={cn(
                  "mt-6 w-full rounded-2xl px-5 py-4 text-base font-semibold transition",
                  "bg-sky-100 text-sky-900 hover:bg-sky-200 focus:outline-none focus:ring-4 focus:ring-sky-100"
                )}
              >
                Quero a opção de R$10
              </button>

              <p className="mt-3 text-center text-xs text-slate-500">
                Acesso imedianto no seu e-mail!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
  <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Pra quem o Metodo é indicado?
           
          </h2>

          </div>
      </div>

      {/* grid de “para quem” */}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Quem quer gastar até ~50% menos",
            desc: "Usar um método mais econômico e cortar etapas de acabamento que drenam o orçamento.",
            badge: "Economia",
          },
          {
            title: "Quem pensa: “se der pra fazer 2, eu faço”",
            desc: "Diminuir o custo por unidade pra aumentar o número de kitnets no mesmo terreno/orçamento.",
            badge: "Escala",
          },
          {
            title: "Quem quer renda mensal com aluguel",
            desc: "Criar uma base de renda recorrente com unidades simples, repetíveis e fáceis de manter.",
            badge: "Renda",
          },
          {
            title: "Quem tá começando do zero",
            desc: "Sem precisar ser engenheiro: o material é simples, visual e feito pra iniciante.",
            badge: "Iniciante",
          },
          {
            title: "Quem quer obra mais rápida e previsível",
            desc: "Menos etapas = menos “vai e volta” na obra e menos surpresa no custo final.",
            badge: "Tempo",
          },
          {
            title: "Quem quer evitar erro caro",
            desc: "Enxergar a kitnet em 3D antes e seguir um modelo pronto evita retrabalho e desperdício.",
            badge: "Segurança",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              <span className="h-2 w-2 rounded-full bg-lime-500" />
              {c.badge}
            </div>
            <p className="mt-3 text-lg font-extrabold text-slate-900">{c.title}</p>
            <p className="mt-2 text-sm text-slate-700">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* “não é pra quem” (ajuda a filtrar e aumenta confiança) */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-extrabold text-slate-900">E não é pra quem…</p>
        <p className="mt-2 text-sm text-slate-700">
          quer luxo e acabamento caro, ou quer “fórmula mágica” sem obra. Aqui é método simples pra reduzir custo
          e construir pra aluguel do jeito certo.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* ===========================
          <section> GARANTIA / CONFIANÇA
         =========================== */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Garantia de 7 dias
            </h2>
            <p className="mt-2 text-slate-700">
              Se por qualquer motivo você não gostar, você tem <b>7 dias</b> pra pedir reembolso.
              A gente prefere devolver seu dinheiro do que deixar você insatisfeito!
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={goCheckout27}
                className={cn(
                  "shine-button w-full rounded-2xl px-5 py-4 text-base font-semibold text-white shadow-sm transition",
                  "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 sm:w-auto"
                )}
              >
                Quero o pack completo (R$27)
              </button>

              <button
                type="button"
                onClick={() => setIsPopupOpen(true)}
                className={cn(
                  "w-full rounded-2xl px-5 py-4 text-base font-semibold transition sm:w-auto",
                  "bg-sky-100 text-sky-900 hover:bg-sky-200 focus:outline-none focus:ring-4 focus:ring-sky-100"
                )}
              >
                Ver opção econômica (R$10)
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ===========================
    <section> POR QUE TÃO BARATO?
   =========================== */}
<section className="bg-white">
  <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
    <h2 className="text-center text-2xl font-semibold tracking-tight text-sky-700 sm:text-3xl">
      Por que tão barato?
    </h2>

    <p className="mx-auto mt-4 max-w-[820px] text-center text-sm text-slate-700 sm:text-base">
      A ideia é <b>democratizar o conhecimento</b> e permitir que qualquer pessoa consiga desenvolver
      suas plantas  seja para <b>alugar</b>, <b>morar</b> ou <b>revender</b>  sem custos elevados.
      <br />
      <span className="font-semibold text-rose-500">
        Aproveite: talvez você não veja essa oferta novamente.
      </span>
    </p>
  </div>
</section>
      {/* ===========================
          <section> FAQ
         =========================== */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Perguntas e Respostas
          </h2>

          <div className="mt-7 grid gap-4">
            <FaqItem
              q="E se eu não gostar?"
              a="Confiamos tanto no nosso produto que nos responsabilizamos por qualquer coisa. Se por acaso você não gostar, você tem 7 dias pra pedir reembolso."
            />
            <FaqItem
              q="E vitalicio ?"
              a="Sim. Você tem acesso vitalício a todo o conteúdo que entregamos hoje, e também a qualquer atualização ou material extra que a gente for adicionando no futuro (sem custo adicional)."
            />
            <FaqItem
              q="Como vou receber o acesso?"
              a="Assim que o pagamento for confirmado, você recebe o acesso imediatamente (e também no seu e-mail)."
            />
            <FaqItem
              q="Isso é pra iniciante?"
              a="Sim. A proposta é justamente facilitar: em 3D você entende melhor o espaço e evita erro bobo, tem dezenas de videos mostrando todo o metodo deixando ele muito facil"
            />
            <FaqItem
              q="Serve pra casa propria ?"
              a="Serve. O método é focado em kitnets pra aluguel, mas as ideias de economia e o modelo de financiamento podem ser aplicados em outros tipos de obra também."
            />
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} • Conteúdo digital • Acesso imediato
          </p>
        </div>
      </section>

      {/* ===========================
          POPUP - UPSELL IRRESISTÍVEL (19,90)
         =========================== */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[560px] overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* topo */}
            <div className="bg-sky-50 p-5 sm:p-6">
              <p className="text-xs font-semibold text-sky-700">
                ESPERA! OFERTA IRRESISTÍVEL 👇
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Leve tudo do Pack Completo por apenas <span className="text-sky-700">R$19,90</span>
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Antes de ir pro básico, faz mais sentido pegar o pacote completo com um desconto especial.
              </p>
            </div>

            {/* corpo */}
            <div className="p-5 sm:p-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-800">Você vai receber:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>✅ +40 modelos 3D baixo orçamento</li>
                  <li>✅ Metodo alvenaria Economica</li>
                  <li>✅ Ideias simples pra deixar moderno gastando pouco</li>
                  <li>✅ AI trasforma rascunho em planta 3D</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsPopupOpen(false);
                  goCheckout1990();
                }}
                className={cn(
                  "shine-button mt-5 w-full rounded-2xl px-5 py-4 text-base font-semibold text-white shadow-sm transition",
                  "bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
                )}
              >
                Quero essa oferta (R$19,90)
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPopupOpen(false);
                  goCheckout10();
                }}
                className={cn(
                  "mt-3 w-full rounded-2xl border px-5 py-4 text-sm font-semibold transition",
                  "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
                )}
              >
                Quero a de R$10 mesmo
              </button>

              <button
                type="button"
                onClick={() => setIsPopupOpen(false)}
                className="mt-4 w-full text-center text-xs text-slate-500 hover:text-slate-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <p className="text-base font-semibold text-slate-900">{q}</p>
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full border text-slate-600 transition",
            open ? "border-sky-200 bg-sky-50" : "border-slate-200 bg-white"
          )}
        >
          {open ? "–" : "+"}
        </span>
      </button>

      {open && <p className="mt-3 text-sm text-slate-600">{a}</p>}
    </div>
  );
}
