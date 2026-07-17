import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import {
  ArrowRight,
  Check,
  PackageCheck,
  PencilRuler,
  Recycle,
  ShieldCheck,
  Star,
} from "lucide-react";
import ProjectsCarousel from "./ProjectsCarousel";
import SpecialProjectsCarousel from "./SpecialProjectsCarousel";
import paletteMockup from "@/public/modelos/palette-mockup.webp";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const theme = {
  // Troque somente estas cores quando decidir o degradê definitivo.
  "--headline-gradient": "linear-gradient(100deg, #ef4444 0%, #f97316 100%)",
  "--accent": "#ef4444",
  "--accent-soft": "#fff1f2",
} as CSSProperties;

const benefits = [
  {
    icon: Recycle,
    title: "+800 projetos fáceis para você fazer ainda hoje",
    text: "Tenha centenas de ideias prontas para escolher e começar o seu próximo projeto.",
  },
  {
    icon: PencilRuler,
    title: "Projetos bem explicados",
    text: "Medidas, lista de materiais e uma sequência clara para facilitar a montagem.",
  },
  {
    icon: ShieldCheck,
    title: "Comece com o que você já tem",
    text: "Com apenas 1 martelo, pregos e os paletes de madeira que você tiver, você já pode começar.",
  },
];

const testimonials = [
  {
    text: "Eu nunca tinha feito um móvel antes e consegui montar meu primeiro projeto seguindo o passo a passo. Ficou lindo e já estou escolhendo o próximo!",
    name: "Ana Flavia",
    rating: 5,
  },
  {
    text: "A variedade de ideias é enorme e as explicações facilitam muito. Consegui aproveitar os paletes que estavam parados e transformar tudo em móveis úteis.",
    name: "Carlos Silva",
    rating: 4,
  },
  {
    text: "O acesso chegou rápido e o conteúdo é muito completo. Economizei bastante fazendo minhas próprias peças e ainda recebi vários elogios.",
    name: "Mariana Costa",
    rating: 5,
  },
];

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: "var(--headline-gradient)" }}
    >
      {children}
    </span>
  );
}

export default function ProjetosEmPaletesPage() {
  return (
    <main
      style={theme}
      className={montserrat.variable + " min-h-screen overflow-hidden bg-white font-[family-name:var(--font-montserrat)] text-stone-950 selection:bg-red-100 selection:text-red-700"}
    >
      <Script id="meta-pixel-projetos-em-paletes" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1584821460029460');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* SEÇÃO 01 — HERO */}
      <section
        id="inicio"
        aria-labelledby="titulo-principal"
        className="relative border-b border-stone-100"
      >
        <div className="pointer-events-none absolute -right-40 -top-24 h-[480px] w-[480px] rounded-full bg-red-50 blur-3xl" />
        <div className="pointer-events-none absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-orange-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-[35px] sm:px-8 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
           

            <h1
              id="titulo-principal"
              className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              +800 projetos e videos prontos com paletes pra fazer
              <GradientText> Ainda hoje.</GradientText>
            </h1>

            <div className="relative mx-auto mt-8 w-full max-w-xl lg:max-w-none">
            <Image
              src={paletteMockup}
              alt="Prévia dos projetos em paletes"
              className="h-auto w-full object-contain"
              priority
            />
          </div>

            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-stone-600 sm:text-lg">
              com os projetos em mãos tudo fica <b>muito fácil</b>,
              e você pode começar a criar móveis incríveis hoje mesmo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#oferta"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(239,68,68,0.22)] transition hover:-translate-y-1"
                style={{ backgroundImage: "var(--headline-gradient)" }}
              >
                QUERO RECEBER AGORA! <ArrowRight className="h-4 w-4" />
              </Link>
             
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-stone-500 sm:text-sm">
              {["Passo a passo", "Medidas detalhadas", "Baixo investimento"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-stone-950 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          
        </div>
      </section>

      {/* SEÇÃO 02 — PROJETOS */}
      <section
        id="projetos"
        aria-labelledby="titulo-projetos"
        className="scroll-mt-8 border-b border-stone-100 bg-[#fcfbf9] pb-24 pt-[10px] sm:pb-32 sm:pt-[10px]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>Inspire-se</p>
              <h2
                id="titulo-projetos"
                className="mt-4 max-w-2xl text-3xl font-extrabold tracking-[-0.045em] sm:text-5xl"
              >
                Projetos para transformar cada espaço.
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-7 text-stone-500 sm:text-base">
              Comece com uma ideia simples e avance no seu ritmo. Cada projeto foi
              pensado para unir estética, economia e funcionalidade.
            </p>
          </div>

          <ProjectsCarousel />
        </div>
      </section>

      {/* SEÇÃO 03 — VANTAGENS */}
      <section
        id="vantagens"
        aria-labelledby="titulo-vantagens"
        className="scroll-mt-8 border-b border-stone-100 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>Simples de verdade</p>
            <h2
              id="titulo-vantagens"
              className="mt-4 text-3xl font-extrabold tracking-[-0.045em] sm:text-5xl"
            >
              Tudo o que você vai receber{" "}
              <GradientText>Ainda hoje.</GradientText>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[28px] border border-stone-200 p-7 sm:p-8">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-7 text-xl font-extrabold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-stone-500">{text}</p>
              </article>
            ))}
          </div>

          <article className="mt-5 grid overflow-hidden rounded-[28px] border border-stone-200 bg-[#fcfbf9] md:grid-cols-[0.72fr_1.28fr] md:items-center">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden md:max-w-none">
              <Image
                src="/modelos/videos.webp"
                alt="Videoaula mostrando a montagem de um móvel de madeira passo a passo"
                fill
                sizes="(max-width: 768px) 340px, 38vw"
                className="object-cover"
              />
            </div>

            <div className="p-7 sm:p-10 lg:p-14">
              <p
                className="text-xs font-extrabold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent)" }}
              >
                Aperte o play e comece
              </p>
              <h3 className="mt-4 max-w-xl text-2xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Vídeos passo a passo, direto ao ponto e sem enrolação.
              </h3>
              <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-stone-500 sm:text-base">
                Acompanhe cada etapa de forma simples e visual para começar seu
                projeto em poucos minutos, mesmo que você ainda não tenha experiência.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* SEÇÃO 04 — PROJETOS ESPECIAIS */}
      <section
        id="projetos-especiais"
        aria-labelledby="titulo-projetos-especiais"
        className="relative overflow-hidden bg-stone-950 py-24 text-white sm:py-32"
      >
        <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-300">
              Bônus por tempo limitado
            </p>
            <h2
              id="titulo-projetos-especiais"
              className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl"
            >
              Se você adquirir nos próximos{" "}
              <GradientText>10 minutos</GradientText>, vai levar totalmente{" "}
              <GradientText>GRÁTIS:</GradientText>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-stone-400 sm:text-lg">
              Todos estes projetos especiais também serão seus.
            </p>
          </div>

          <SpecialProjectsCarousel />

          <div className="mt-10 flex justify-center">
            <Link
              href="#oferta"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(239,68,68,0.28)] transition hover:-translate-y-1"
              style={{ backgroundImage: "var(--headline-gradient)" }}
            >
              QUERO OS ESPECIAIS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 05 — OFERTA */}
      <section
        id="oferta"
        aria-labelledby="titulo-oferta"
        className="scroll-mt-8 border-b border-stone-100 bg-[#fcfbf9] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="text-xs font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Escolha o seu acesso
            </p>
            <h2
              id="titulo-oferta"
              className="mt-4 text-3xl font-extrabold tracking-[-0.045em] sm:text-5xl"
            >
              Comece hoje com o plano que mais combina com você.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-stone-500 sm:text-base">
              Pagamento único e acesso imediato a uma coleção completa de ideias
              para tirar seus projetos do papel.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2 lg:items-start">
            <article className="relative overflow-hidden rounded-[32px] border-2 border-red-500 bg-white p-7 shadow-[0_24px_70px_rgba(239,68,68,0.16)] sm:p-9">
              <div
                className="absolute right-0 top-0 rounded-bl-2xl px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white"
                style={{ backgroundImage: "var(--headline-gradient)" }}
              >
                Mais completo
              </div>

              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-red-500">
                Plano Completo
              </p>
              <div className="mt-5 flex items-end gap-2">
                <span className="pb-2 text-lg font-extrabold text-stone-500">R$</span>
                <span className="text-6xl font-extrabold tracking-[-0.06em]">19,90</span>
                <span className="pb-2 text-sm font-bold text-stone-400">pagamento único</span>
              </div>

              <div className="my-8 h-px bg-stone-100" />

              <ul className="space-y-4">
                {[
                  "+2.000 arquivos de ideias",
                  "+1.500 projetos para construir",
                  "+350 projetos industriais com paletes e solda",
                  "Dezenas de vídeos com passo a passo",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-stone-700">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-50 text-red-500">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.sereja.com.br/checkout/iqL964O8"
                className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(239,68,68,0.24)] transition hover:-translate-y-1"
                style={{ backgroundImage: "var(--headline-gradient)" }}
              >
                QUERO O COMPLETO <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            <article className="rounded-[32px] border border-stone-200 bg-white p-7 sm:p-9 lg:mt-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-stone-500">
                Plano Essencial
              </p>
              <div className="mt-5 flex items-end gap-2">
                <span className="pb-2 text-lg font-extrabold text-stone-500">R$</span>
                <span className="text-6xl font-extrabold tracking-[-0.06em]">10</span>
                <span className="pb-2 text-sm font-bold text-stone-400">pagamento único</span>
              </div>

              <div className="my-8 h-px bg-stone-100" />

              <ul className="space-y-4">
                {["+800 projetos", "Ideias e referências para se inspirar", "Acesso imediato ao conteúdo"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-stone-700">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.sereja.com.br/checkout/iqL964O8?p=promo10"
                className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-7 text-sm font-extrabold text-white transition hover:-translate-y-1 hover:bg-stone-800"
              >
                QUERO ESSE <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* SEÇÃO 06 — DEPOIMENTOS */}
      <section
        id="depoimentos"
        aria-labelledby="titulo-depoimentos"
        className="border-b border-stone-100 bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="text-xs font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Histórias de quem já começou
            </p>
            <h2
              id="titulo-depoimentos"
              className="mt-4 text-3xl font-extrabold tracking-[-0.045em] sm:text-5xl"
            >
              Quem coloca a mão na massa, <GradientText>recomenda.</GradientText>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-stone-500 sm:text-base">
              Veja como os projetos estão ajudando pessoas a transformar paletes em
              peças bonitas, úteis e cheias de personalidade.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map(({ text, name, rating }, index) => (
              <article
                key={index}
                className="flex h-full flex-col rounded-[28px] border border-stone-200 bg-[#fcfbf9] p-7 transition hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_45px_rgba(28,25,23,0.08)] sm:p-8"
              >
                <div className="flex gap-1 text-amber-400" aria-label={`${rating} de 5 estrelas`}>
                  {Array.from({ length: rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 text-sm font-medium leading-7 text-stone-600 sm:text-base">
                  “{text}”
                </blockquote>
                <div className="mt-7 border-t border-stone-200 pt-5">
                  <p className="text-sm font-extrabold text-stone-950">{name}</p>
                  <p className="mt-1 text-xs font-semibold text-stone-400">
                    Aluno(a) Projetos em Paletes
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 07 — COMO FUNCIONA */}
      <section
        id="como-funciona"
        aria-labelledby="titulo-como-funciona"
        className="scroll-mt-8 bg-stone-950 py-24 text-white sm:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-300">Do zero ao projeto pronto</p>
            <h2
              id="titulo-como-funciona"
              className="mt-4 text-3xl font-extrabold tracking-[-0.045em] sm:text-5xl"
            >
              Seu próximo móvel em três etapas.
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-stone-400">
              Uma jornada clara para você construir com confiança, sem complicação
              e aproveitando melhor cada material.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              ["01", "Escolha o projeto", "Encontre a peça que combina com seu espaço e seu nível de experiência."],
              ["02", "Separe os materiais", "Confira medidas, ferramentas e tudo o que será necessário antes de começar."],
              ["03", "Construa no seu ritmo", "Siga as etapas, faça os acabamentos e deixe o projeto com a sua cara."],
            ].map(([number, title, text]) => (
              <article
                key={number}
                className="grid gap-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-[64px_1fr] sm:items-start sm:p-7"
              >
                <span className="text-3xl font-extrabold text-stone-700">{number}</span>
                <div>
                  <h3 className="text-lg font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-stone-400">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 08 — CHAMADA FINAL */}
      <section
        id="chamada-final"
        aria-labelledby="titulo-chamada-final"
        className="border-b border-stone-100 bg-white px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#f8f5f1] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-100/70 blur-3xl" />
          <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-orange-100 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <PackageCheck className="mx-auto h-10 w-10" style={{ color: "var(--accent)" }} />
            <h2
              id="titulo-chamada-final"
              className="mt-6 text-3xl font-extrabold tracking-[-0.05em] sm:text-5xl"
            >
              Pronto para criar algo{" "}
              <GradientText>com as próprias mãos?</GradientText>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-7 text-stone-600 sm:text-base">
              Explore os projetos, escolha o seu favorito e transforme um simples
              palete em uma peça única para sua casa.
            </p>
            <Link
              href="#oferta"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-1"
              style={{ backgroundImage: "var(--headline-gradient)" }}
            >
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 09 — PERGUNTAS FREQUENTES */}
      <section
        id="perguntas-frequentes"
        aria-labelledby="titulo-perguntas-frequentes"
        className="border-b border-stone-100 bg-[#fcfbf9] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <p
              className="text-xs font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Tire suas dúvidas
            </p>
            <h2
              id="titulo-perguntas-frequentes"
              className="mt-4 text-3xl font-extrabold tracking-[-0.045em] sm:text-5xl"
            >
              Perguntas frequentes
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-stone-500 sm:text-base">
              Veja as respostas para as principais dúvidas antes de garantir o seu acesso.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {[
              {
                question: "O acesso é vitalício?",
                answer:
                  "Sim. Você faz um único pagamento e recebe acesso vitalício ao conteúdo adquirido, sem mensalidades ou cobranças recorrentes.",
              },
              {
                question: "Como eu recebo o acesso?",
                answer:
                  "Assim que o pagamento for aprovado, o acesso é enviado imediatamente para o e-mail informado no momento da compra.",
              },
              {
                question: "Tenho garantia?",
                answer:
                  "Sim. Você tem 7 dias de garantia para conhecer o conteúdo. Se não ficar satisfeito, poderá solicitar o reembolso dentro desse prazo.",
              },
            ].map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-[24px] border border-stone-200 bg-white px-6 py-1 transition open:border-red-200 open:shadow-[0_14px_40px_rgba(28,25,23,0.06)] sm:px-8"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-extrabold marker:content-none sm:text-lg">
                  {question}
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-50 text-xl text-red-500 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 pr-12 text-sm font-medium leading-7 text-stone-500 sm:text-base">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-100 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-xs font-semibold text-stone-400 sm:px-8 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} Projetos em Paletes.</p>
          <p>Ideias simples. Resultados que transformam.</p>
        </div>
      </footer>
    </main>
  );
}
