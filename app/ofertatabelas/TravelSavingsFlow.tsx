"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gift,
  LoaderCircle,
  Plane,
  Route,
} from "lucide-react";
import RecipeIdeasCarousel from "./RecipeIdeasCarousel";
import TravelDestinationsCarousel from "./TravelDestinationsCarousel";

const goals = [
  { value: 10_000, label: "R$ 10 mil", monthly: "R$ 834" },
  { value: 20_000, label: "R$ 20 mil", monthly: "R$ 1.667" },
  { value: 40_000, label: "R$ 40 mil", monthly: "R$ 3.334" },
  { value: 100_000, label: "R$ 100 mil", monthly: "R$ 8.334" },
];

const travelPhraseOptions = [
  "sua viagem de fim de ano",
  "sua viagem de Réveillon",
  "sua viagem de 2027",
  "sua viagem em família",
  "sua próxima grande aventura",
];

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

type Step = "name" | "goal" | "preparing" | "offer";

export default function TravelSavingsFlow() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<number | null>(null);
  const [nameError, setNameError] = useState(false);
  const [travelPhraseIndex, setTravelPhraseIndex] = useState(0);

  const firstName = useMemo(() => name.trim().split(/\s+/)[0] || "Viajante", [name]);
  const currentStep = step === "name" ? 1 : step === "goal" ? 2 : 3;

  useEffect(() => {
    if (step !== "preparing") return;

    const timer = window.setTimeout(() => {
      setStep("offer");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== "offer") return;

    const interval = window.setInterval(() => {
      setTravelPhraseIndex((current) => (current + 1) % travelPhraseOptions.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [step]);

  function submitName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setNameError(true);
      return;
    }
    setNameError(false);
    setStep("goal");
  }

  function chooseGoal(value: number) {
    setGoal(value);
    setStep("preparing");
  }

  if (step === "offer" && goal) {
    return (
      <div className="min-h-screen overflow-hidden bg-white">
        <section className="relative overflow-hidden border-b border-emerald-100">
          <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-[15px] sm:px-8 sm:pb-24">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.06] tracking-[-.055em] sm:text-6xl lg:text-7xl">
                {firstName}, aqui está sua tabela de{" "}
                <GradientText>{money.format(goal)}</GradientText> para sua viagem .
              </h1>
              <Image
                src="/tabela/tabela_mockup.webp"
                alt="Tabela personalizada para guardar dinheiro para uma viagem"
                width={1024}
                height={819}
                priority
                sizes="(max-width: 767px) 100vw, 820px"
                className="mt-4 h-auto w-full max-w-[820px] object-contain"
              />
              <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                Sua tabela começa com <strong className="font-black text-slate-900">R$ 1</strong> e vai até{" "}
                <span key={travelPhraseIndex} className="travel-phrase-change inline-block font-black text-emerald-600">
                  {travelPhraseOptions[travelPhraseIndex]}
                </span>
                .
              </p>
              <a
                href="#oferta"
                className="shine-button mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-slate-950 shadow-[0_16px_40px_rgba(10,217,144,.28)] transition hover:-translate-y-1"
                style={{ backgroundImage: "var(--travel-gradient)" }}
              >
                QUERO COMEÇAR MEU PLANO <ArrowRight className="h-4 w-4" />
              </a>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-slate-500 sm:text-sm">
                {["Feito para sua meta", "Fácil de acompanhar", "Comece hoje"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-950 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-emerald-100 bg-[#f4fff9] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">Inspire sua próxima viagem</p>
                <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
                  Ainda não sabe para onde ir?
                </h2>
              </div>
              <p className="max-w-md text-sm font-semibold leading-7 text-slate-500 sm:text-base">
                Se você ainda não tem um destino em mente, veja alguns lugares que podem inspirar a viagem que você sempre quis fazer.
              </p>
            </div>

            <TravelDestinationsCarousel />
          </div>
        </section>

        <section className="border-b border-emerald-100 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">Acelere sua meta</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">
                Como preencher sua tabela <GradientText>mais rápido?</GradientText>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-500 sm:text-base">
                Sua geladeira já está aí consumindo energia. Ela também pode ajudar você a gerar uma renda extra e completar sua tabela muito mais rápido.
              </p>
              <div className="mx-auto mt-7 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-xs font-black uppercase tracking-[.12em] text-emerald-700">
                10 receitas para fazer e vender
              </div>
            </div>

            <RecipeIdeasCarousel />
          </div>
        </section>

        <section className="bg-[#00D664] py-20 text-white sm:py-28">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[.16em] text-[#181818]">
              <Gift className="h-4 w-4" />
              Bônus especial
            </div>

            <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-black uppercase leading-[1.02] tracking-[-.055em] sm:text-6xl">
              Compre agora e receba{" "}
              <span className="text-[#181818]">o Método Skiplagging: voos até 60% mais baratos</span>
            </h2>

            <Image
              src="/tabela/metodo.webp"
              alt="Comparação entre uma pesquisa normal de passagem e a economia encontrada com o método"
              width={4633}
              height={1668}
              sizes="(max-width: 1024px) 100vw, 960px"
              className="mx-auto mt-9 h-auto w-full max-w-4xl object-contain"
            />

            <p className="mx-auto mt-6 max-w-2xl text-base font-bold leading-8 text-white/90 sm:text-lg">
              Uma estratégia simples que pode ajudar você a encontrar passagens mais baratas para o destino que deseja.
            </p>

            <div className="mx-auto mt-10 max-w-3xl border-y border-[#181818]/20 py-8">
              <Route className="mx-auto h-8 w-8 text-[#181818]" />
              <p className="mt-4 text-base font-semibold leading-8 text-white sm:text-lg">
                Você busca um voo em que{" "}
                <strong className="font-black text-[#181818]">o seu destino aparece como uma escala</strong>.
                Em algumas rotas, ele pode custar menos do que comprar um voo direto para o mesmo lugar.
              </p>
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[.1em] text-white/85">
              Um método vendido por até <span className="text-[#181818] line-through">R$ 900</span>
            </p>
            <p className="mt-2 text-3xl font-black uppercase tracking-[-.03em] text-[#181818] sm:text-4xl">
              Hoje você recebe de bônus
            </p>

            <a
              href="#oferta"
              className="shine-button mx-auto mt-8 inline-flex min-h-16 w-full max-w-md items-center justify-center gap-2 rounded-2xl bg-[#181818] px-7 text-sm font-black text-white shadow-[0_16px_38px_rgba(0,70,32,.25)] transition hover:-translate-y-1 hover:bg-black"
            >
              QUERO GARANTIR MEU BÔNUS <ArrowRight className="relative z-10 h-5 w-5" />
            </a>
            <p className="mt-4 text-xs font-bold text-white/75">
              O bônus será liberado junto com o seu acesso.
            </p>
          </div>
        </section>

        <section
          id="oferta"
          aria-labelledby="titulo-oferta"
          className="scroll-mt-8 border-b border-emerald-100 bg-[#f7fffa] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">
                A hora é agora!
              </p>
              <h2
                id="titulo-oferta"
                className="mt-4 text-3xl font-black tracking-[-.045em] text-[#181818] sm:text-5xl"
              >
                Escolha o pacote ideal para sua próxima meta.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
                Sem mensalidades. Você paga uma vez só e recebe tudo no seu e-mail.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2 lg:items-start">
              <article className="relative overflow-hidden rounded-[32px] border-2 border-[#00D664] bg-white p-7 shadow-[0_24px_70px_rgba(0,214,100,.16)] sm:p-9">
                <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#00D664] px-5 py-2 text-[11px] font-black uppercase tracking-[.14em] text-[#181818]">
                  O MAIS VENDIDO 🔥
                </div>

                <p className="text-sm font-black uppercase tracking-[.16em] text-emerald-600">
                  Pacote Completo
                </p>
                <div className="mt-5 flex items-end gap-2 text-[#181818]">
                  <span className="pb-2 text-lg font-black text-slate-500">R$</span>
                  <span className="text-6xl font-black tracking-[-.06em]">27</span>
                  <span className="pb-2 text-sm font-bold text-slate-400">só!</span>
                </div>

                <div className="my-8 h-px bg-emerald-100" />

                <ul className="space-y-4">
                  {[
                    `Sua tabela personalizada de ${money.format(goal)}`,
                    "Tabelas de R$ 1.000 para presentear os filhos",
                    "Tabelas de R$ 10 mil, R$ 40 mil e R$ 100 mil",
                    "Metas maiores com tabelas de até R$ 200 mil",
                    "Todas as tabelas prontas para imprimir",
                    "10 receitas para vender e preencher suas tabelas mais rápido",
                    "Bônus: Método Skiplagging voos até 60% mais baratos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://pay.sereja.com.br/checkout/_CUBPHPI"
                  className="shine-button mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-black text-[#181818] shadow-[0_14px_34px_rgba(0,214,100,.24)] transition hover:-translate-y-1"
                  style={{ backgroundImage: "var(--travel-gradient)" }}
                >
                  QUERO O PACOTE COMPLETO <ArrowRight className="h-4 w-4" />
                </a>
              </article>

              <article className="rounded-[32px] border border-emerald-200 bg-white p-7 sm:p-9 lg:mt-8">
                <p className="text-sm font-black uppercase tracking-[.16em] text-slate-500">
                  Acesso Básico
                </p>
                <div className="mt-5 flex items-end gap-2 text-[#181818]">
                  <span className="pb-2 text-lg font-black text-slate-500">R$</span>
                  <span className="text-6xl font-black tracking-[-.06em]">12</span>
                  <span className="pb-2 text-sm font-bold text-slate-400">só!</span>
                </div>

                <div className="my-8 h-px bg-emerald-100" />

                <ul className="space-y-4">
                  {[
                    `1 tabela personalizada de ${money.format(goal)}`,
                    "Pronta para imprimir e começar",
                    "Acesso simples e imediato",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://pay.sereja.com.br/checkout/_CUBPHPI?p=promo12"
                  className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#181818] px-7 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-black"
                >
                  QUERO SÓ O BÁSICO <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section
          id="resultados"
          aria-labelledby="titulo-resultados"
          className="border-b border-emerald-100 bg-white py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">
                Feito para a vida real
              </p>
              <h2
                id="titulo-resultados"
                className="mt-4 text-3xl font-black tracking-[-.045em] text-[#181818] sm:text-5xl"
              >
                Quando a meta fica visível, guardar fica mais simples.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
                Veja como as tabelas ajudam a transformar um objetivo distante em pequenas conquistas que você consegue acompanhar.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Você enxerga seu progresso",
                  text: "Cada valor marcado mostra o quanto você já avançou e quanto ainda falta para chegar à sua viagem.",
                  label: "Mais clareza",
                },
                {
                  title: "A família participa da meta",
                  text: "Crie uma tabela para o casal, para os filhos ou para cada objetivo importante da sua casa.",
                  label: "Mais motivação",
                },
                {
                  title: "Você pode acelerar o plano",
                  text: "Use as ideias de receitas do pacote completo para gerar uma renda extra e preencher os valores mais rápido.",
                  label: "Mais possibilidades",
                },
              ].map(({ title, text, label }) => (
                <article
                  key={title}
                  className="flex h-full flex-col rounded-[28px] border border-emerald-100 bg-[#f7fffa] p-7 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_18px_45px_rgba(8,80,55,.08)] sm:p-8"
                >
                  <span className="text-xs font-black uppercase tracking-[.15em] text-emerald-600">
                    {label}
                  </span>
                  <h3 className="mt-5 text-xl font-black tracking-[-.025em] text-[#181818]">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm font-medium leading-7 text-slate-500 sm:text-base">
                    {text}
                  </p>
                  <div className="mt-7 border-t border-emerald-100 pt-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Check className="h-4 w-4 text-emerald-500" />
                      Método visual e fácil de acompanhar
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#eafff2] px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#00D664]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <Plane className="mx-auto h-10 w-10 text-emerald-600" />
              <h2 className="mt-6 text-3xl font-black tracking-[-.05em] text-[#181818] sm:text-5xl">
                {firstName}, sua próxima viagem pode começar hoje.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                Escolha sua tabela, marque o primeiro valor e acompanhe sua meta ficando cada vez mais perto.
              </p>
              <a
                href="#oferta"
                className="shine-button mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-[#181818] shadow-[0_14px_34px_rgba(0,214,100,.22)] transition hover:-translate-y-1"
                style={{ backgroundImage: "var(--travel-gradient)" }}
              >
                QUERO COMEÇAR AGORA <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="perguntas-frequentes"
          aria-labelledby="titulo-perguntas-frequentes"
          className="border-y border-emerald-100 bg-[#f7fffa] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">
                Ficou alguma dúvida?
              </p>
              <h2
                id="titulo-perguntas-frequentes"
                className="mt-4 text-3xl font-black tracking-[-.045em] text-[#181818] sm:text-5xl"
              >
                Perguntas frequentes
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
                Tudo o que você precisa saber antes de escolher seu acesso.
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {[
                {
                  question: "Preciso pagar todos os meses?",
                  answer:
                    "Não. O pagamento é único, tanto no acesso Básico de R$ 12 quanto no Pacote Completo de R$ 27.",
                },
                {
                  question: "Qual é a diferença entre o Básico e o Completo?",
                  answer:
                    `O Básico inclui uma tabela personalizada para a sua meta de ${money.format(goal)}. O Completo inclui essa tabela, todas as outras metas de R$ 1.000 até R$ 200 mil, as receitas e o Método Skiplagging.`,
                },
                {
                  question: "Como vou receber as tabelas?",
                  answer:
                    "Depois da confirmação do pagamento, o acesso é enviado para o e-mail informado no momento da compra.",
                },
                {
                  question: "Posso imprimir as tabelas?",
                  answer:
                    "Sim. Você pode imprimir em casa ou em uma gráfica e usar a tabela da forma que for mais prática para acompanhar sua meta.",
                },
                {
                  question: "A tabela será da meta que eu escolhi?",
                  answer:
                    `Sim. Sua escolha de ${money.format(goal)} faz parte do acesso Básico e também está incluída no Pacote Completo.`,
                },
                {
                  question: "As receitas e o Método Skiplagging estão em qual plano?",
                  answer:
                    "Os dois bônus fazem parte do Pacote Completo de R$ 27. O acesso Básico inclui somente a tabela personalizada.",
                },
                {
                  question: "E se eu me arrepender da compra?",
                  answer:
                    "Você pode solicitar o cancelamento dentro do prazo legal de 7 dias após a compra.",
                },
              ].map(({ question, answer }) => (
                <details
                  key={question}
                  className="group rounded-[24px] border border-emerald-100 bg-white px-6 py-1 transition open:border-emerald-300 open:shadow-[0_14px_40px_rgba(8,80,55,.06)] sm:px-8"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-black text-[#181818] marker:content-none sm:text-lg">
                    {question}
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-xl text-emerald-600 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-12 text-sm font-medium leading-7 text-slate-500 sm:text-base">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-white py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-xs font-semibold text-slate-400 sm:px-8 md:flex-row md:text-left">
            <p>© {new Date().getFullYear()} Minha Viagem.</p>
            <p>Uma meta de cada vez, cada vez mais perto do seu destino.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fffb]">
      <section className="grid flex-1 place-items-center px-5 py-8 sm:px-8 sm:py-12">
        <div className="w-full max-w-xl rounded-[28px] border border-emerald-100 bg-white p-6 shadow-[0_22px_70px_rgba(8,80,55,.07)] sm:p-10">
          {step === "name" && (
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-emerald-50 pb-6">
              <Brand />
              <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[.14em] text-slate-400 sm:text-xs">Etapa {currentStep}/2</span>
            </div>
          )}
          <div className="mb-9 h-1 overflow-hidden rounded-full bg-emerald-50">
            <div className="h-full rounded-full bg-emerald-400 transition-all duration-500" style={{ width: step === "name" ? "50%" : "100%" }} />
          </div>
          {step === "name" ? (
            <form onSubmit={submitName}>
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">Vamos planejar sua viagem</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-5xl">Antes de começar, como podemos te chamar?</h1>
              <p className="mt-4 font-semibold leading-7 text-slate-500">Vamos personalizar sua tabela para sua viagem.</p>
              <label htmlFor="traveler-name" className="mt-8 block text-sm font-black text-slate-700">Seu nome</label>
              <input
                id="traveler-name"
                value={name}
                onChange={(event) => { setName(event.target.value); setNameError(false); }}
                autoFocus
                autoComplete="given-name"
                placeholder="Digite seu nome"
                aria-invalid={nameError}
                aria-describedby={nameError ? "name-error" : undefined}
                className="mt-3 min-h-16 w-full rounded-2xl border-2 border-slate-200 bg-white px-5 text-base font-bold outline-none transition placeholder:font-semibold placeholder:text-slate-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
              {nameError && <p id="name-error" className="mt-2 text-sm font-bold text-red-500">Digite seu nome para continuar.</p>}
              <PrimaryButton>CONTINUAR <ArrowRight className="h-5 w-5" /></PrimaryButton>
            </form>
          ) : step === "goal" ? (
            <div>
              <button type="button" onClick={() => setStep("name")} className="mb-7 inline-flex items-center gap-2 text-sm font-black text-slate-400 transition hover:text-emerald-600">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="text-xs font-black uppercase tracking-[.2em] text-emerald-600">Ótimo, {firstName}!</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-5xl">Quanto você quer guardar para sua viagem?</h1>
              <p className="mt-4 font-semibold leading-7 text-slate-500">Escolha sua meta. Vamos preparar uma tabela especialmente para você.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {goals.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => chooseGoal(item.value)}
                    className="group flex min-h-20 items-center justify-between rounded-2xl border-2 border-slate-200 bg-white px-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  >
                    <span className="text-lg font-black text-slate-900">{item.label}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-400 transition group-hover:bg-emerald-400 group-hover:text-slate-950"><ArrowRight className="h-4 w-4" /></span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-6 text-center sm:py-9">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                <LoaderCircle className="h-8 w-8 animate-spin" strokeWidth={2.25} />
              </span>
              <p className="mt-6 text-xs font-black uppercase tracking-[.2em] text-emerald-600">Quase pronto</p>
              <h1 className="mx-auto mt-3 max-w-lg text-3xl font-black tracking-[-.045em] sm:text-4xl">
                {firstName}, estamos criando sua tabela.
              </h1>
              <p className="mx-auto mt-4 max-w-md font-semibold leading-7 text-slate-500">
                Personalizando sua meta de {goal ? money.format(goal) : "viagem"}.
              </p>
              <div className="mx-auto mt-7 h-1.5 max-w-xs overflow-hidden rounded-full bg-emerald-50">
                <div className="h-full w-full origin-left animate-pulse rounded-full bg-emerald-400" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 font-black tracking-[-.03em]">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Plane className="h-4 w-4" /></span>
      <span>Minha Viagem</span>
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--travel-gradient)" }}>{children}</span>;
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="shine-button mt-6 inline-flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl px-7 text-sm font-black text-slate-950 shadow-[0_14px_34px_rgba(10,217,144,.24)] transition hover:-translate-y-0.5"
      style={{ backgroundImage: "var(--travel-gradient)" }}
    >
      {children}
    </button>
  );
}
