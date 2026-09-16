import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import PurchaseNotification from "./PurchaseNotification";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  Flower2,
  Gift,
  Heart,
  Instagram,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const theme = {
  "--accent": "#E91E63",
  "--accent-dark": "#BE185D",
  "--accent-soft": "#FFF0F5",
  "--headline-gradient": "linear-gradient(100deg, #E91E63 0%, #FF4D8D 100%)",
} as CSSProperties;

const modelos = [
  "Buquês românticos",
  "Buquês delicados",
  "Buquês de rosas",
  "Buquês econômicos",
  "Buquês premium",
  "Buquês para aniversário",
  "Buquês para pedidos especiais",
  "Buquês para surpresa",
];

const bonusPostImages = [
  "/ideias/image 2.webp",
  "/ideias/image 2-1.webp",
  "/ideias/image 2-2.webp",
  "/ideias/image 2-3.webp",
  "/ideias/image 2-4.webp",
  "/ideias/image 2-5.webp",
  "/ideias/image 2-6.webp",
  "/ideias/image 2-7.webp",
];

const completeBenefits = [
  "+75 modelos de buquês coreanos em vídeo para copiar, adaptar e vender",
  "Vídeos passo a passo para você montar cada modelo",
  "Ideias de combinações, cores e estilos",
  "Estratégia Buquê Anônimo para gerar novas vendas",
  "Como captar clientes pelo WhatsApp usando tráfego pago",
  "Referência de precificação para buquês coreanos",
  "Bônus: ideias de posts prontos para Instagram e Status",
  "Acesso imediato após a compra",
];

const basicBenefits = [
  "+75 modelos de buquês coreanos em vídeo",
  "Vídeos passo a passo de montagem",
  "Ideias de combinações e estilos",
  "Acesso imediato após a compra",
];

const faqs = [
  {
    question: "Preciso já trabalhar com flores?",
    answer:
      "Não. O material foi pensado tanto para quem está começando quanto para quem já vende flores e quer aumentar o repertório de modelos e ofertas.",
  },
  {
    question: "O que recebo no Pack Completo?",
    answer:
      "Você recebe 75 modelos de buquês coreanos em vídeos passo a passo, ideias de combinações, a estratégia do Buquê Anônimo, orientações para captar clientes pelo WhatsApp com anúncios e referências para precificar suas ofertas.",
  },
  {
    question: "Qual a diferença do Básico para o Completo?",
    answer:
      "O Básico entrega os modelos. O Completo adiciona as estratégias comerciais para ajudar você a transformar os modelos em ofertas e buscar clientes.",
  },
  {
    question: "O acesso é imediato?",
    answer:
      "Sim. Após a confirmação do pagamento, o acesso ao material é liberado.",
  },
];

function PinkText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: "var(--headline-gradient)" }}
    >
      {children}
    </span>
  );
}

export default function BuquesPage() {
  return (
    <main
      style={theme}
      className="min-h-screen overflow-hidden bg-white text-zinc-950 selection:bg-pink-100 selection:text-pink-700"
    >
      {/* REDLINE */}
      <div className="bg-[#E91E63] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.08em] text-white sm:text-sm">
        Você recebe +75 buquês coreanos em vídeo + estratégias para vender mais
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-pink-100 bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-pink-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-rose-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-14 sm:px-8 sm:pb-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#E91E63]">
              <Flower2 className="h-4 w-4" />
              Para fazer e vender
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              +75 buquês coreanos para você{" "}
              <PinkText>montar, divulgar e vender.</PinkText>
            </h1>

            <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-zinc-600 sm:text-lg">
              Tenha 75 modelos em vídeo, com passo a passo para montar, e um
              catálogo cheio de ideias para oferecer aos seus clientes. Os
              buquês coreanos estão em alta, e nós, mulheres, adoramos receber
              flores com docinhos também.
            </p>

            <div className="mt-8 rounded-[24px] border border-pink-100 bg-[#FFF7FA] p-5 sm:max-w-2xl">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#E91E63] text-white">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black">Inclui a estratégia &ldquo;Buquê Anônimo&rdquo;</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-zinc-600">
                    Uma ideia de oferta para alcançar homens que querem
                    surpreender alguém com flores, mesmo sem uma data especial.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#oferta"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-white shadow-[0_16px_40px_rgba(233,30,99,.25)] transition hover:-translate-y-1"
                style={{ backgroundImage: "var(--headline-gradient)" }}
              >
                QUERO COMEÇAR A VENDER <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-zinc-500 sm:text-sm">
              {["Acesso imediato", "+75 vídeos", "Pagamento único"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-pink-50 text-[#E91E63]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ESTIMATIVA */}
      <section className="border-b border-pink-100 bg-[#FFF7FA] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#E91E63]">
              Faça as contas
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
              Apenas 2 buquês por dia já representam{" "}
              <PinkText>R$ 9.000 em vendas no mês.</PinkText>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-7 text-zinc-600 sm:text-base">
              Exemplo ilustrativo considerando 2 buquês coreanos de Ferrero
              Rocher por dia, durante 30 dias, a uma média de R$ 150 cada. Isso
              representa faturamento bruto, antes dos custos com flores,
              embalagem, entrega, anúncios e outros gastos.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
            {[
              ["2", "buquês por dia"],
              ["R$ 150", "média por buquê coreano"],
              ["R$ 9.000", "faturamento bruto em 30 dias"],
            ].map(([value, label]) => (
              <article
                key={label}
                className="rounded-[28px] border border-pink-100 bg-white p-7 text-center shadow-sm"
              >
                <p className="text-4xl font-black tracking-[-.05em] text-[#E91E63]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-zinc-500">{label}</p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-semibold text-zinc-500">
            A precificação pode variar conforme sua região, os materiais e a
            montagem escolhida para cada modelo.
          </p>
        </div>
      </section>

      {/* MODELOS */}
      <section className="border-b border-zinc-100 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#E91E63]">
                Chega de falta de ideia
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
                75 modelos em vídeo para diferentes{" "}
                <PinkText>momentos e clientes.</PinkText>
              </h2>
              <p className="mt-6 text-base font-medium leading-8 text-zinc-600">
                Em vez de começar do zero toda vez que alguém pedir um buquê,
                você terá vídeos passo a passo e referências prontas para
                apresentar, adaptar e usar nas suas divulgações. Aproveite a alta
                dos buquês coreanos e crie opções ainda mais desejadas com
                docinhos e outros complementos.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {modelos.map((item) => (
                <article
                  key={item}
                  className="flex items-center gap-3 rounded-[22px] border border-pink-100 bg-[#FFF7FA] p-5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#E91E63] shadow-sm">
                    <Flower2 className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-black">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUQUÊ ANÔNIMO */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#E91E63]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-pink-300">
              <Heart className="h-4 w-4" />
              Estratégia Buquê Anônimo
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight tracking-[-.045em] sm:text-5xl">
              Existe um cliente querendo comprar flores...{" "}
              <span className="text-pink-400">
                mas ele não sabe qual escolher.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-zinc-400">
              Homens que querem surpreender uma namorada, esposa, ficante ou
              alguém que estão conhecendo podem virar um público para sua
              oferta. Você apresenta opções prontas e facilita a decisão.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[.04] p-7 sm:p-9">
            <p className="text-sm font-black uppercase tracking-[.15em] text-pink-300">
              Ideia de anúncio
            </p>
            <p className="mt-5 text-2xl font-black leading-snug sm:text-3xl">
              &ldquo;Quer surpreender alguém com flores, mas não sabe qual buquê
              escolher?&rdquo;
            </p>
            <div className="mt-7 space-y-3">
              {[
                "Mostre 3 opções prontas",
                "Receba o pedido pelo WhatsApp",
                "Ofereça entrega e cartão personalizado",
                "Transforme uma intenção em uma compra fácil",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E91E63]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-bold text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP + TRÁFEGO */}
      <section className="border-b border-zinc-100 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
            <div className="rounded-[36px] border border-pink-100 bg-[#FFF7FA] p-7 sm:p-10">
              <div className="mx-auto max-w-sm rounded-[30px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,.08)]">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black">Novo pedido</p>
                    <p className="text-xs font-semibold text-zinc-400">
                      WhatsApp
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-zinc-100 p-4 text-sm font-semibold leading-6 text-zinc-700">
                  Oi! Vi o anúncio dos buquês. Queria mandar uma surpresa hoje.
                  Quais modelos você tem?
                </div>

                <div className="ml-auto mt-3 max-w-[85%] rounded-2xl bg-green-100 p-4 text-sm font-semibold leading-6 text-zinc-700">
                  Tenho sim 💐 Vou te mandar 3 opções lindas dentro do seu
                  orçamento.
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#E91E63]">
                Exclusivo do Pack Completo
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
                Aprenda a buscar clientes e levar as conversas direto para o{" "}
                <PinkText>WhatsApp.</PinkText>
              </h2>
              <p className="mt-6 text-base font-medium leading-8 text-zinc-600">
                No Pack Completo você também recebe uma orientação prática para
                estruturar anúncios simples, apresentar sua oferta e direcionar
                interessados para conversar com você pelo WhatsApp.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [Smartphone, "Oferta simples", "Uma mensagem fácil de entender."],
                  [MessageCircle, "WhatsApp", "Conversa direta com o interessado."],
                  [TrendingUp, "Tráfego pago", "Como estruturar a captação."],
                  [BadgeDollarSign, "Venda", "Apresente opções e feche o pedido."],
                ].map(([Icon, title, text]) => {
                  const IconComponent = Icon as typeof Smartphone;
                  return (
                    <article
                      key={title as string}
                      className="rounded-[22px] border border-zinc-200 p-5"
                    >
                      <IconComponent className="h-5 w-5 text-[#E91E63]" />
                      <p className="mt-4 text-sm font-black">{title as string}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-zinc-500">
                        {text as string}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIFICAÇÃO */}
      <section className="border-b border-pink-100 bg-[#FFF7FA] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#E91E63] text-white">
              <Gift className="h-7 w-7" />
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[.18em] text-[#E91E63]">
              Venda modelos que chamam atenção
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
              Buquês coreanos de Ferrero Rocher têm{" "}
              <PinkText>alto valor percebido.</PinkText>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-zinc-600">
              A combinação de flores, acabamento e Ferrero Rocher transforma o
              presente em uma opção especial, que pode ser vendida em uma média
              de R$ 150.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            <article className="rounded-[28px] border border-pink-100 bg-white p-7">
              <Flower2 className="h-7 w-7 text-[#E91E63]" />
              <p className="mt-5 text-sm font-black text-zinc-500">
                Média por buquê coreano
              </p>
              <p className="mt-1 text-3xl font-black">R$ 150</p>
            </article>

            <article className="rounded-[28px] border border-pink-100 bg-white p-7">
              <PackageCheck className="h-7 w-7 text-[#E91E63]" />
              <p className="mt-5 text-sm font-black text-zinc-500">
                Vendas por dia
              </p>
              <p className="mt-1 text-3xl font-black">2 buquês</p>
            </article>

            <article className="rounded-[28px] bg-[#E91E63] p-7 text-white shadow-[0_20px_60px_rgba(233,30,99,.2)]">
              <TrendingUp className="h-7 w-7" />
              <p className="mt-5 text-sm font-black text-pink-100">
                Projeção mensal
              </p>
              <p className="mt-1 text-3xl font-black">R$ 9.000</p>
            </article>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs font-semibold leading-6 text-zinc-500">
            Exemplo meramente ilustrativo. O aumento real de lucro depende do
            seu custo de flores, chocolates, embalagem, entrega e preço de venda.
            Neste exemplo, o faturamento do pedido aumenta cerca de 25%.
          </p>
        </div>
      </section>

      {/* ESCASSEZ + BÔNUS */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#E91E63]/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#E91E63] px-4 py-2 text-xs font-black uppercase tracking-[.14em]">
            <Sparkles className="h-4 w-4" />
            Bônus especial
          </div>

          <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-tight tracking-[-.045em] sm:text-5xl">
            Comprando nos próximos <span className="text-pink-400">10 minutos</span>,
            receba ideias de posts prontas para ajudar você a vender mais.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-zinc-400">
            Ideias de conteúdo para publicar no Instagram e no Status do
            WhatsApp, apresentar seus buquês e manter sua oferta aparecendo para
            possíveis clientes.
          </p>

          <div className="relative mt-10 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-zinc-950 to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-zinc-950 to-transparent sm:w-28" />
            <div
              className="flex w-max gap-4 animate-auto-carousel hover:[animation-play-state:paused]"
              style={{ animationDuration: "32s" }}
            >
              {[...bonusPostImages, ...bonusPostImages].map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative h-56 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-800 shadow-xl sm:h-72 sm:w-52"
                >
                  <Image
                    src={src}
                    alt="Ideia de post para divulgar buquês"
                    fill
                    sizes="(max-width: 640px) 160px, 208px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              [Instagram, "Instagram", "Ideias para feed e stories"],
              [MessageCircle, "Status", "Conteúdo para WhatsApp"],
              [Gift, "Ofertas", "Sugestões para divulgar"],
            ].map(([Icon, title, text]) => {
              const IconComponent = Icon as typeof Instagram;
              return (
                <article
                  key={title as string}
                  className="rounded-[24px] border border-white/10 bg-white/[.05] p-6"
                >
                  <IconComponent className="mx-auto h-6 w-6 text-pink-400" />
                  <p className="mt-4 font-black">{title as string}</p>
                  <p className="mt-1 text-xs font-semibold text-zinc-500">
                    {text as string}
                  </p>
                </article>
              );
            })}
          </div>

          <Link
            href="#oferta"
            className="mt-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#E91E63] px-8 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#d81b60]"
          >
            QUERO GARANTIR MEU BÔNUS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="scroll-mt-8 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#E91E63]">
              Escolha seu acesso
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
              Comece com os modelos ou leve o{" "}
              <PinkText>pacote completo para vender.</PinkText>
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2 lg:items-start">
            {/* COMPLETO */}
            <article className="relative overflow-hidden rounded-[34px] border-2 border-[#E91E63] bg-white p-7 shadow-[0_24px_80px_rgba(233,30,99,.16)] sm:p-9">
              <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#E91E63] px-5 py-2 text-[11px] font-black uppercase tracking-[.14em] text-white">
                RECOMENDADO 🔥
              </div>

              <p className="text-sm font-black uppercase tracking-[.16em] text-[#E91E63]">
                Pack Completo
              </p>

              <div className="mt-5 flex items-end gap-2">
                <span className="pb-2 text-lg font-black text-zinc-500">R$</span>
                <span className="text-6xl font-black tracking-[-.065em]">24,90</span>
                <span className="pb-2 text-sm font-bold text-zinc-400">
                  pagamento único
                </span>
              </div>

              <p className="mt-4 text-sm font-bold leading-6 text-zinc-500">
                Para quem quer os modelos + estratégias para divulgar, captar
                interessados e aumentar o valor dos pedidos.
              </p>

              <div className="my-8 h-px bg-zinc-100" />

              <ul className="space-y-4">
                {completeBenefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-semibold leading-6 text-zinc-700"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pink-50 text-[#E91E63]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#E91E63] px-7 text-sm font-black text-white shadow-[0_14px_34px_rgba(233,30,99,.24)] transition hover:-translate-y-1 hover:bg-[#d81b60]"
              >
                QUERO O PACK COMPLETO <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            {/* BÁSICO */}
            <article className="rounded-[34px] border border-zinc-200 bg-white p-7 sm:p-9 lg:mt-8">
              <p className="text-sm font-black uppercase tracking-[.16em] text-zinc-500">
                Pack Básico
              </p>

              <div className="mt-5 flex items-end gap-2">
                <span className="pb-2 text-lg font-black text-zinc-500">R$</span>
                <span className="text-6xl font-black tracking-[-.065em]">9,90</span>
                <span className="pb-2 text-sm font-bold text-zinc-400">
                  pagamento único
                </span>
              </div>

              <p className="mt-4 text-sm font-bold leading-6 text-zinc-500">
                Para quem quer somente os modelos e referências para começar.
              </p>

              <div className="my-8 h-px bg-zinc-100" />

              <ul className="space-y-4">
                {basicBenefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-semibold leading-6 text-zinc-700"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-xs font-bold leading-5 text-zinc-500">
                Não inclui estratégia de tráfego pago, captação pelo WhatsApp,
                aumento de ticket e bônus de posts.
              </div>

              <a
                href="#"
                className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-zinc-800"
              >
                QUERO APENAS OS MODELOS <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 text-center text-xs font-bold text-zinc-500">
            <ShieldCheck className="h-4 w-4 text-[#E91E63]" />
            Compra protegida • acesso digital • pagamento único
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="border-y border-pink-100 bg-[#FFF7FA] py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-5 text-center sm:px-8">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#E91E63] shadow-sm">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-black tracking-[-.035em] sm:text-4xl">
            Você tem 7 dias para conhecer o material.
          </h2>
          <p className="max-w-2xl text-sm font-medium leading-7 text-zinc-600 sm:text-base">
            Acesse o conteúdo e veja se ele faz sentido para você. Consulte as
            condições de garantia apresentadas no checkout.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#E91E63]">
              Ficou alguma dúvida?
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
              Perguntas frequentes
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-[24px] border border-zinc-200 bg-white px-6 py-1 transition open:border-pink-200 open:shadow-[0_14px_40px_rgba(0,0,0,.05)] sm:px-8"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-black marker:content-none sm:text-lg">
                  {question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pink-50 text-xl text-[#E91E63] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 pr-12 text-sm font-medium leading-7 text-zinc-500 sm:text-base">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[38px] bg-[#E91E63] px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <PackageCheck className="mx-auto h-10 w-10" />
            <h2 className="mt-6 text-3xl font-black tracking-[-.05em] sm:text-5xl">
              Seu próximo buquê pode ser o começo de uma nova renda.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm font-semibold leading-7 text-pink-100 sm:text-base">
              Escolha seu pacote, acesse os modelos e comece a montar seu
              catálogo.
            </p>
            <Link
              href="#oferta"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-black text-[#E91E63] transition hover:-translate-y-1"
            >
              VER OS PACOTES <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-100 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-xs font-semibold text-zinc-400 sm:px-8 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Pack Modelos de Buquês.</p>
          <p>Inspiração, divulgação e vendas.</p>
        </div>
      </footer>

      <PurchaseNotification />
    </main>
  );
}
