"use client";

import "@/app/components/quiz/css/shine.css";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatMMSS(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${pad2(m)}:${pad2(s)}`;
}

type FaqItem = { q: string; a: string };

export default function SecaNatalPage() {
  // Oferta relâmpago de 10 minutos (persistente no browser)
  const OFFER_SECONDS = 10 * 60;
  const STORAGE_KEY = "secanatal_offer_started_at_v2";

  const [remaining, setRemaining] = useState<number>(OFFER_SECONDS);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let startedAt = Number(localStorage.getItem(STORAGE_KEY));
    if (!startedAt || Number.isNaN(startedAt)) {
      startedAt = Date.now();
      localStorage.setItem(STORAGE_KEY, String(startedAt));
    }

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const left = Math.max(0, OFFER_SECONDS - elapsed);
      setRemaining(left);
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, []);

  const isOfferLive = remaining > 0;

  const ctaHref = useMemo(() => {
    // troque pelo link do seu checkout (Cakto/Stripe/etc.)
    return "https://pay.cakto.com.br/zdh62jm_689995";
  }, []);

  const faqs: FaqItem[] = [
    {
      q: "Como eu recebo o material?",
      a: "Após o pagamento, você recebe acesso instantâneo à área de membros para baixar o e-book e os bônus.",
    },
    {
      q: "Isso serve mesmo se eu não quiser abrir mão da ceia?",
      a: "Sim. O método é justamente sobre estratégia: preparo antes, escolhas inteligentes durante e recuperação depois, sem terrorismo alimentar.",
    },
    {
      q: "Por quanto tempo terei acesso?",
      a: "Acesso imediato para baixar os materiais e consultar sempre que quiser (conforme sua área de membros).",
    },
    {
      q: "E se eu não gostar?",
      a: "Você tem 7 dias de garantia. Se não achar que valeu muito mais que R$10, devolvemos 100%.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7F2] text-[#1B1B1F]">
      {/* Background decor (clean salmon + subtle pattern) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(239, 68, 68, 0.03),transparent_62%)] blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(1, 169, 32, 0.06),transparent_62%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(0, 0, 0, 0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            
        
          </div>

          {/* Mini timer */}
          <div className="hidden items-center gap-3 rounded-3xl border border-black/10 bg-white/70 px-4 py-2 shadow-sm md:flex">
            <span className="text-xs text-black/60">Oferta relâmpago:</span>
            <span
              className={[
                "rounded-full px-3 py-1 text-sm font-extrabold tabular-nums",
                isOfferLive
                  ? "bg-red-500/15 text-red-700 ring-1 ring-red-500/25"
                  : "bg-black/5 text-black/50 ring-1 ring-black/10",
              ].join(" ")}
            >
              {isOfferLive ? formatMMSS(remaining) : "encerrada"}
            </span>
            <a
              href="#cta"
              className="text-xs font-extrabold text-[#01A920] hover:opacity-80"
            >
              ver oferta ↓
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-10 pt-6 md:grid-cols-2 md:pb-16 md:pt-10">
          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs text-black/70 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Plano baseado em ciência • Natal & Réveillon
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              TODO NATAL É A MESMA COISA.
            </h1>

            <p className="mt-4 text-lg text-black/75 md:text-xl">
              Você passa o ano todo na luta… para ver{" "}
              <span className="font-extrabold text-black">TODO O SEU ESFORÇO</span>{" "}
              ir embora em poucos dias de festa.
              <br />
              <span className="text-black/65">A calça aperta, a frustração volta. É um ciclo sem fim.</span>
            </p>
            <p className="text-[#039c03] text-bold"> Do jeito certo você pode passar o natal comendo bem sem medo</p>

            {/* Image moved here (below the block you asked) */}
            <div className="mt-6 overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="relative aspect-[16/11] w-full">
                {/* IMAGEM: Dra. Alicia segurando o ebook sorrindo */}
                <Image
                  src="/secanatal/hero-dra-alicia.webp"
                  alt="Dra. Jessy Oliveira sorrindo e segurando o e-book Seca Natal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-black/10 bg-white/70 p-4">
                  <p className="text-sm font-extrabold">Sem culpa</p>
                  <p className="mt-1 text-xs text-black/60">
                    Estratégia inteligente pra curtir a ceia sem exagero.
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/70 p-4">
                  <p className="text-sm font-extrabold">Passo a passo</p>
                  <p className="mt-1 text-xs text-black/60">
                    Pré-ceia, celebração e recuperação pós-24.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[32px] border border-red-500/20 bg-white/70 p-5 shadow-sm">
              <p className="text-black/85">
                Mas esse ano…{" "}
                <span className="font-extrabold text-black">ESSE ANO, VOCÊ TEM A CIÊNCIA DO SEU LADO.</span>
              </p>
              <p className="mt-3 text-black/70">
                Eu, <span className="font-extrabold">Dra. Jessica Oliveira</span>, especialista em Nutrição ,
                vou te provar que é possível{" "}
                <span className="font-extrabold">SAIR DO NATAL MAIS LEVE E FELIZ</span>, sem abrir mão de uma ceia incrível.
              </p>
            </div>

            <div className="mt-6 rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-wider text-red-700">
                ATENÇÃO
              </p>
              <p className="mt-2 text-black/75">
                “Estas são as <span className="font-extrabold">MESMAS estratégias e receitas</span> que passo para minhas
                clientes em consultas particulares por valores muito mais altos. Hoje, você terá acesso a esse método completo
                por um <span className="font-extrabold">valor simbólico</span>.”
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                id="shine-button"
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
              >
                QUERO O SECA NATAL + BÔNUS!
              </a>
              <a
                href="#conteudo"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 text-base font-extrabold text-black/85 shadow-sm transition hover:bg-white"
              >
                Ver o que tem dentro ↓
              </a>
            </div>

            <p className="mt-4 text-xs text-black/55">
              Acesso instantâneo após o pagamento • Garantia de 7 dias • Oferta por tempo limitado
            </p>
          </div>

          {/* Right column (product cover + objective) */}
          <div className="relative">
            <div className="rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
              <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,rgba(239,68,68,0.10),rgba(1,169,32,0.08))]">
                {/* IMAGEM: capa do ebook */}
                <Image
                  src="/secanatal/capa-ebook.webp"
                  alt="Capa do e-book Seca Natal"
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="mt-5 rounded-[26px] border border-[#01A920]/20 bg-[#01A920]/10 p-4">
                <p className="text-sm font-extrabold text-[#0B6E1F]">Objetivo prático</p>
                <p className="mt-1 text-sm text-black/70">
                  Você vai saber exatamente o que fazer <span className="font-extrabold">antes</span>,{" "}
                  <span className="font-extrabold">durante</span> e <span className="font-extrabold">depois</span> das festas.
                </p>
              </div>

              <div className="mt-4 rounded-[26px] border border-black/10 bg-white/70 p-4">
                <p className="text-sm font-extrabold">Não é só um e-book</p>
                <p className="mt-1 text-sm text-black/65">
                  É o plano baseado em ciência pra você curtir a ceia e ainda sair mais leve pro Réveillon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product content */}
      <section id="conteudo" className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="rounded-[36px] border border-black/10 bg-white/70 p-6 shadow-sm md:p-10">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              SECA NATAL: <span className="text-black/65">o método da nutri para você celebrar sem culpa</span>
            </h2>
            <p className="mt-4 text-black/70">
              No <span className="font-extrabold">“SECA NATAL”</span> você vai aprender:
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "✅ Estratégia Pré-Ceia: como se preparar nos dias anteriores para “ganhar” uma margem extra.",
                "✅ O Poder do Modo Celebração: como montar o prato de forma inteligente para comer de tudo, sem exagero.",
                "✅ Receitas-Chave: substituições simples nos pratos mais perigosos que cortam centenas de calorias.",
                "✅ Plano de Recuperação Pós-24: o que fazer nos dias seguintes para resetar o corpo e continuar secando.",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-[28px] border border-black/10 bg-white/70 px-5 py-4 text-black/80"
                >
                  <p className="font-semibold">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Offer / bonus */}
      <section id="cta" className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[36px] border border-red-500/20 bg-white/70 p-6 shadow-sm md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#fc7b03] px-4 py-2 text-xs font-extrabold tracking-wide text-white">
                  OFERTA RELÂMPAGO • 10 MIN
                </span>
                <span className="text-sm text-black/60">
                  {isOfferLive ? "Bônus liberado agora" : "Tempo esgotado (bônus encerrado)"}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-extrabold md:text-3xl">
                🎁 “Sobremesas da Nutri”
              </h3>
              <p className="mt-3 text-black/70">
                Mini-guia com <span className="font-extrabold">4 receitas natalinas</span> com{" "}
                <span className="font-extrabold">menos de 100 calorias</span>. Repetir o doce sem medo.
              </p>

              <div className="mt-6 flex items-center gap-4 rounded-[28px] border border-black/10 bg-white/70 p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5">
                  ⏳
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold">Contagem regressiva</p>
                  <p className="text-xs text-black/60">Quando o tempo acabar, essa oferta some.</p>
                </div>
                <div
                  className={[
                    "rounded-full px-4 py-2 text-lg font-extrabold tabular-nums",
                    isOfferLive
                      ? "bg-red-500/15 text-red-700 ring-1 ring-red-500/25"
                      : "bg-black/5 text-black/50 ring-1 ring-black/10",
                  ].join(" ")}
                >
                  {isOfferLive ? formatMMSS(remaining) : "00:00"}
                </div>
              </div>
              {/* IMAGEM: relógio / contagem regressiva (placeholder) */}
              <div className="mt-6 overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-sm">
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/secanatal/relogio-10min.webp"
                    alt="Relógio com contagem regressiva de 10 minutos"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={ctaHref}
                  id="shine-button"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-red-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
                >
                  QUERO O MÉTODO {isOfferLive ? "+ SOBREMESAS!" : "AGORA!"}
                </a>
                <a
                  href="#valor"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 text-base font-extrabold text-black/85 shadow-sm transition hover:bg-white"
                >
                  Ver o valor ↓
                </a>
              </div>

              
            </div>

            {/* What you get + pricing */}
            <div id="valor" className="rounded-[36px] border border-black/10 bg-white/70 p-6 shadow-sm md:p-10">
              <h3 className="text-2xl font-extrabold md:text-3xl">Veja o que você leva HOJE</h3>
              <p className="mt-2 text-black/60">Por um investimento menor que uma marmita fitness:</p>

              <div className="mt-6 space-y-3">
                {[
                  { name: 'E-book Principal "Seca Natal"', val: "R$187" },
                  { name: 'Bônus Imediato: "Sobremesas da Nutri"', val: "R$67" },
                  { name: "Acesso ao Meu Protocolo Pós-Festas", val: "R$57" },
                ].map((i) => (
                  <div
                    key={i.name}
                    className="flex items-center justify-between gap-4 rounded-[28px] border border-black/10 bg-white/70 px-5 py-4"
                  >
                    <p className="text-black/80">{i.name}</p>
                    <p className="text-sm font-extrabold text-black/60">{i.val}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black/60">Valor Total</p>
                  <p className="text-sm font-extrabold text-black/60"> ̶R̶$̶2̶9̶1̶</p>
                </div>

                <div className="mt-4 rounded-[32px] border border-red-500/20 bg-red-500/10 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-wider text-red-700">
                    APENAS DE HOJE {isOfferLive ? "COM A OFERTA RELÂMPAGO" : ""}
                  </p>

                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-5xl font-extrabold tracking-tight md:text-6xl">R$ 10</p>
                    
                  </div>

                  

                  <a
                    href={ctaHref}
                    
                    className="shine-button mt-5 inline-flex w-full items-center justify-center rounded-full bg-red-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
                  >
                    SIM, EU QUERO 
                  </a>

                  <p className="mt-3 text-xs text-black/55">
                    Após o pagamento, você receberá acesso instantâneo no seu email.<strong> Oferta válida por tempo limitado.</strong>
                  </p>
                </div>

                <div className="mt-5 rounded-[28px] border border-[#01A920]/20 bg-[#01A920]/10 p-5">
                  <p className="text-sm font-extrabold tracking-wide text-[#0B6E1F]">GARANTIA DE 7 DIAS</p>
                  <p className="mt-2 text-black/70">
                    Compre, aplique. Se em uma semana você achar que não valeu MUITO MAIS que esses R$10, devolvemos 100%.
                    <span className="font-extrabold"> O risco é zero.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing + FAQ */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-2 md:pb-24">
          <div className="rounded-[36px] border border-black/10 bg-white/70 p-6 shadow-sm md:p-10">
            <h3 className="text-2xl font-extrabold md:text-3xl">Esse é o empurrão que faltava.</h3>
            <p className="mt-3 text-black/70">
              Pare de acreditar que precisa passar vontade. A nutrição inteligente existe, e ela cabe em{" "}
              <span className="font-extrabold">R$ 10</span> e na sua ceia.
            </p>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm md:flex-row md:items-center">
              <div>
                <p className="text-sm font-extrabold">Oferta relâmpago</p>
                <p className="text-xs text-black/60">
                  O tempo para garantir as Sobremesas da Nutri está acabando.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "rounded-full px-4 py-2 text-lg font-extrabold tabular-nums",
                    isOfferLive
                      ? "bg-red-500/15 text-red-700 ring-1 ring-red-500/25"
                      : "bg-black/5 text-black/50 ring-1 ring-black/10",
                  ].join(" ")}
                >
                  {isOfferLive ? formatMMSS(remaining) : "00:00"}
                </div>
                <a
                  href={ctaHref}
                  
                  className="shine-button inline-flex items-center justify-center rounded-full bg-red-500 px-7 py-3 text-sm font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
                >
                  GARANTIR AGORA
                </a>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-xl font-extrabold">Dúvidas rápidas</h4>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm"
                  >
                    <summary className="cursor-pointer list-none font-extrabold text-black/85">
                      {f.q}
                      <span className="float-right text-black/40 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-black/70">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={ctaHref}
               
                className="shine-button inline-flex flex-1 items-center justify-center rounded-full bg-red-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
              >
                QUERO O SECA NATAL POR R$10
              </a>
              <a
                href="#conteudo"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 text-base font-extrabold text-black/85 shadow-sm transition hover:bg-white"
              >
                Voltar ao topo ↑
              </a>
            </div>

            <p className="mt-5 text-xs text-black/45">
              Aviso: este material tem caráter educativo e não substitui acompanhamento profissional individual.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-extrabold">
              Seca Natal por <span className="text-red-700">R$10</span>{" "}
              {isOfferLive ? <span className="text-black/60">+ bônus por tempo limitado</span> : null}
            </p>
            <p className="text-xs text-black/55">
              {isOfferLive
                ? `Oferta relâmpago termina em ${formatMMSS(remaining)}`
                : "Bônus encerrado • oferta principal ativa"}
            </p>
          </div>

          <a
            href={ctaHref}
            id="shine-button"
            className="inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
          >
            GARANTIR AGORA
          </a>
        </div>
      </div>
    </div>
  );
}
