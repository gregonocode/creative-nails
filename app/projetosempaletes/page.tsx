import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import {
  ArrowRight,
  Check,
  PackageCheck,
  PencilRuler,
  Recycle,
  ShieldCheck,
} from "lucide-react";
import ProjectsCarousel from "./ProjectsCarousel";
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
    title: "Material reaproveitado",
    text: "Transforme madeira acessível em peças bonitas, úteis e cheias de personalidade.",
  },
  {
    icon: PencilRuler,
    title: "Projetos bem explicados",
    text: "Medidas, lista de materiais e uma sequência clara para facilitar a montagem.",
  },
  {
    icon: ShieldCheck,
    title: "Estrutura confiável",
    text: "Orientações para preparar, tratar e montar cada peça com mais segurança.",
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
              +100 projetos e videos prontos com paletes pra fazer
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
                href="#projetos"
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
              <GradientText>Ainda hoje .</GradientText>
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
        </div>
      </section>

      {/* SEÇÃO 04 — COMO FUNCIONA */}
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

      {/* SEÇÃO 05 — CHAMADA FINAL */}
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
              href="#projetos"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-1"
              style={{ backgroundImage: "var(--headline-gradient)" }}
            >
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
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
