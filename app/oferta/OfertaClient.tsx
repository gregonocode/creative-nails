// app/oferta/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import "@/app/components/quiz/css/shine.css";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type BuildFor = "morar" | "alugar" | "vender" | "planejando";
type Priority = "mais_espaco" | "mais_bonito" | "mais_barato" | "todas";
type MoneyIntent = "ja_pensei" | "nunca_pensei" | "to_pensando_agora" | "quero_morar";

function labelBuildFor(v: string | null): string {
  const map: Record<BuildFor, string> = {
    morar: "morar",
    alugar: "alugar",
    vender: "vender",
    planejando: "planejar",
  };
  if (!v) return "começar";
  return map[v as BuildFor] ?? "começar";
}

function labelPriority(v: string | null): string {
  const map: Record<Priority, string> = {
    mais_espaco: "mais espaço",
    mais_bonito: "mais bonito",
    mais_barato: "mais barato",
    todas: "equilíbrio (tudo)",
  };
  if (!v) return "equilíbrio";
  return map[v as Priority] ?? "equilíbrio";
}

function labelMoneyIntent(v: string | null): string {
  const map: Record<MoneyIntent, string> = {
    ja_pensei: "já pensou nisso",
    nunca_pensei: "nunca pensou nisso",
    to_pensando_agora: "tá pensando agora",
    quero_morar: "quer pra morar",
  };
  if (!v) return "tá no começo";
  return map[v as MoneyIntent] ?? "tá no começo";
}

export default function OfertaPage() {
  const sp = useSearchParams();

  const nomeRaw = sp.get("nome") ?? "";
  const nome = useMemo(() => {
    const cleaned = nomeRaw.trim();
    if (!cleaned) return "aí";
    // pega só o primeiro nome (opcional, fica mais “copy”)
    return cleaned.split(" ").filter(Boolean)[0] ?? cleaned;
  }, [nomeRaw]);

  const pra = sp.get("pra"); // morar/alugar/vender/planejando
  const prio = sp.get("prio"); // mais_espaco/mais_bonito/mais_barato/todas
  const obj = sp.get("obj"); // moneyIntent

  const [isPopupOpen, setIsPopupOpen] = useState(false);
 
  // deixamos as url limpoas pra rodar em produção !
function goCheckout27() {
  window.location.assign("https://pay.sereja.com.br/checkout/DjV1ETPC");
}

function goCheckout10() {
  window.location.assign("https://pay.sereja.com.br/checkout/Y6rCfPS5");
}

function goCheckout1990() {
  window.location.assign("https://pay.sereja.com.br/checkout/m5VgSbil");
}



  const headlinePersonal = useMemo(() => {
    const build = labelBuildFor(pra);
    const priority = labelPriority(prio);

    // personalização simples e forte
    if ((pra as BuildFor) === "alugar") {
      return `Como você quer ${build}, eu montei um pack pra você construir gastando pouco e aumentar seu retorno com um ambiente mais valorizado.`;
    }
    if ((pra as BuildFor) === "vender") {
      return `Como você quer ${build}, eu montei um pack pra você deixar a planta mais clara e o ambiente mais atrativo, sem inventar moda no custo.`;
    }
    if ((pra as BuildFor) === "morar") {
      return `Como você quer ${build}, eu montei um pack pra você ganhar ${priority} e ter uma quitinete bem organizada (sem erro bobo de espaço).`;
    }
    return `Pelo que você respondeu, eu montei um caminho simples pra você ganhar ${priority} usando plantas 3D fáceis de entender.`;
  }, [pra, prio]);

  return (
    <div className="min-h-[100dvh] bg-white text-slate-900">
      {/* ===========================
          <section> HERO PERSONALIZADO
         =========================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Resultado do seu quiz • personalizado
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {nome}, aqui está sua melhor opção pra quitinetes de baixo custo 👇
          </h1>

          <p className="mt-3 max-w-[740px] text-base text-slate-700 sm:text-lg">
            {headlinePersonal}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Seu objetivo</p>
              <p className="mt-1 font-semibold text-slate-800">
                {pra ? `Construir pra ${labelBuildFor(pra)}` : "Definir objetivo"}
              </p>
            </div>
            <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Prioridade</p>
              <p className="mt-1 font-semibold text-slate-800">
                {prio ? labelPriority(prio) : "Equilíbrio"}
              </p>
            </div>
            <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">Sobre ganhar dinheiro</p>
              <p className="mt-1 font-semibold text-slate-800">
                {obj ? labelMoneyIntent(obj) : "—"}
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
            A ideia é simples: parar de “adivinhar” no papel e enxergar a quitinete de verdade em 3D.
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
                title: "Plantas 3D fáceis de entender",
                desc: "Você bate o olho e entende circulação, posicionamento e aproveitamento de espaço.",
              },
              {
                title: "Modelos de quitinetes de baixo custo",
                desc: "Nada mirabolante: layout prático, construível e pensado pra ser econômico.",
              },
              {
                title: "Ideias simples pra valorizar gastando pouco",
                desc: "Organização + referências visuais pra deixar moderno sem estourar o orçamento.",
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
        Vamos te dar <b>totalmente de graça</b> um <b>Pack de Decoração Visual</b> com ideias simples
        pra deixar a quitinete mais bonita gastando pouco (sem “inventar moda” no orçamento).
      </p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1 text-xs text-slate-600">
        <span className="h-2 w-2 rounded-full bg-sky-400" />
        Liberado automaticamente após a compra
      </div>
    </div>
  </div>
</div>
{/* ===========================
    <section> IA QUE CRIA PLANTAS 3D
   =========================== */}
<section className="bg-white">
  <div className="mx-auto w-full max-w-[980px] px-4 py-10 sm:py-14">
    <div className="rounded-3xl border border-sky-100 bg-sky-50 p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-xl shadow-sm">
          
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
      {/* Banner detalhes */}
<div className="mt-6 overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm">
  <img
    src="/oferta/detalhes.png"
    alt="Detalhes do modelo 3D"
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
                <li>✅ Mais variações de layout (mais espaço/mais valorização)</li>
                <li>✅ Ideias visuais pra melhorar o ambiente gastando pouco</li>
                <li>✅ tabelas de objetivos para juntar de mil a 50 mil</li>
                <li>✅ Melhor custo-benefício (pra quem vai usar de verdade)</li>
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

              <p className="mt-3 text-center text-xs text-slate-500">
                Melhor escolha pra {pra ? labelBuildFor(pra) : "seu objetivo"}.
              </p>
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
              A gente prefere devolver seu dinheiro do que deixar você no prejuízo.
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
              q="Como vou receber o acesso?"
              a="Assim que o pagamento for confirmado, você recebe o acesso imediatamente (e também no seu e-mail)."
            />
            <FaqItem
              q="Isso é pra iniciante?"
              a="Sim. A proposta é justamente facilitar: em 3D você entende melhor o espaço e evita erro bobo."
            />
            <FaqItem
              q="Serve pra construir pra aluguel?"
              a="Serve. Inclusive o pack completo tem mais variações de modelos pra testar o que dá melhor retorno e aproveitamento."
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
                  <li>✅ Mais variações (mais espaço / mais valorização)</li>
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
