"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../components/quiz/css/shine.css";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  ChevronDown,
  Gamepad2,
  Gift,
  Medal,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";

const CHECKOUT_COMPLETO = "https://pay.sereja.com.br/checkout/dcruR8nS";
const CHECKOUT_BASICO =
  "https://pay.sereja.com.br/checkout/dcruR8nS?p=oferta10";
const CHECKOUT_UPGRADE =
  "https://pay.sereja.com.br/checkout/dcruR8nS?p=oferta17";
const gameplayGifs = [
  {
    src: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGtydzVvNGJ3NnhhY2diMnk0ZzU5N250Y3pldWttdmpkZTNqbmY4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/psmjYov0chdqL9Uysz/giphy.gif",
    alt: "Gameplay retro estilo Bomberman",
  },
  {
    src: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHl2a3R0ZHRkNWluZm90dXo4ZXRmcGF6ejg4ajk3bXFvdmFrbm9payZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QxHphI2rwqtKo/giphy.gif",
    alt: "Gameplay retro de plataforma classica",
  },
  {
    src: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZzbXp2YjkxZWIxM2hnZjdra3kzYTNzNjlxbWk5Nnl0cDB0MGo0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LjULRGiyt1KpO/giphy.gif",
    alt: "Gameplay retro de corrida classica",
  },
];

const carouselImages = Array.from(
  { length: 8 },
  (_, index) => `/games/jogo-${index + 1}.png`,
);
const specialRetroImages = Array.from(
  { length: 10 },
  (_, index) => `/retro-especial/especial-${index + 1}.png`,
);

const reviews = [
  {
    name: "Marcos A.",
    text: "Comprei achando que ia ser complicado, mas consegui jogar direto no celular. Meu filho ficou impressionado com os jogos da minha epoca.",
  },
  {
    name: "Renata C.",
    text: "Foi nostalgia pura. Abri alguns jogos antigos no fim de semana e parecia que eu tinha voltado para a infancia.",
  },
  {
    name: "Diego M.",
    text: "Eu quase ia comprar um aparelho caro so pra jogar retro. Essa opcao resolveu com um valor bem menor.",
  },
];

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full border-b border-red-100 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
      <span>{children}</span>
    </li>
  );
}

function BenefitCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(220,38,38,0.12)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700">
        {icon}
      </div>
      <h3 className="text-xl font-black tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
        {text}
      </p>
    </div>
  );
}

function HeroImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-xl ${className}`}>
      <div className="absolute -inset-4 rounded-[32px] bg-red-500/20 blur-2xl" />
      <div className="relative aspect-[1054/660] overflow-hidden rounded-[28px] border border-red-200 bg-slate-950 shadow-2xl">
        <Image
          src="/imagem principal.webp"
          alt="Jogos retro para jogar diretamente no celular"
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

function PlanCard({
  badge,
  title,
  subtitle,
  price,
  oldPrice,
  items,
  cta,
  highlight,
  onClick,
}: {
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  oldPrice?: string;
  items: string[];
  cta: string;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={[
        "relative flex h-full flex-col rounded-[28px] border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8",
        highlight
          ? "border-red-500 ring-4 ring-red-100"
          : "border-slate-200",
      ].join(" ")}
    >
      <div
        className={[
          "mb-4 self-start rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]",
          highlight
            ? "bg-red-600 text-white"
            : "border border-slate-200 bg-slate-50 text-slate-700",
        ].join(" ")}
      >
        {badge}
      </div>

      <h3 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h3>
      <p className="mt-3 min-h-[56px] text-sm leading-relaxed text-slate-600">
        {subtitle}
      </p>

      <div className="mt-6 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-6 text-center">
        {oldPrice && (
          <p className="mb-1 text-sm font-semibold text-slate-400 line-through">
            De {oldPrice}
          </p>
        )}
        <div className="flex items-end justify-center gap-1">
          <span className="mb-2 text-base font-bold text-slate-500">R$</span>
          <span className="text-6xl font-black tracking-tight text-slate-950">
            {price}
          </span>
        </div>
        <p className="mt-3 rounded-full bg-red-100 px-4 py-1 text-sm font-bold text-red-700">
          Acesso imediato
        </p>
      </div>

      <ul className="mt-7 flex-1 space-y-4">
        {items.map((item) => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </ul>

      <button
        type="button"
        onClick={onClick}
        className={[
          "mt-8 inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-center text-sm font-black uppercase tracking-[0.08em] transition hover:scale-[1.02] active:scale-[0.98]",
          highlight
            ? "shine-button bg-red-600 text-white shadow-[0_16px_36px_rgba(220,38,38,0.28)] hover:bg-red-700"
            : "bg-slate-950 text-white hover:bg-slate-800",
        ].join(" ")}
      >
        {cta}
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function withCurrentParams(url: string) {
  if (typeof window === "undefined") return url;

  const currentParams = new URLSearchParams(window.location.search);
  const finalUrl = new URL(url);

  currentParams.forEach((value, key) => {
    if (!finalUrl.searchParams.has(key)) {
      finalUrl.searchParams.set(key, value);
    }
  });

  return finalUrl.toString();
}

export default function JogosRetroPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeGifIndex, setActiveGifIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGifIndex((current) => (current + 1) % gameplayGifs.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  function goToCheckout(url: string) {
    window.location.href = withCurrentParams(url);
  }

  const activeGif = gameplayGifs[activeGifIndex];

  return (
    <main className="min-h-screen bg-[#fffafa] text-slate-950 selection:bg-red-600 selection:text-white">
      <div className="w-full bg-red-600">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white sm:text-xs">
          <Sparkles className="mr-2 h-4 w-4" />
          Especial retro: jogue classicos direto no celular
        </div>
      </div>

      <Section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.16),transparent_38%),linear-gradient(to_bottom,#ffffff,#fff5f5)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-red-700 shadow-sm">
              <Gamepad2 className="h-4 w-4" />
              Biblioteca retro para celular
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              <span className="block font-black text-red-600">
                +900 jogos retro para jogar diretamente no celular
              </span>
            </h1>

            <HeroImage className="mt-8 lg:hidden" />

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">
              Reviva os momentos retro desses jogos, jogue com seus pequenos os
              classicos da sua epoca e aproveite sem precisar comprar nenhum
              aparelho a mais.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <Bullet>Sem precisar comprar aparelho de mais de R$ 200</Bullet>
              <Bullet>Jogue direto pelo celular, de forma simples</Bullet>
              <Bullet>Classicos de aventura, luta, corrida e futebol</Bullet>
              <Bullet>Acesso rapido para matar a saudade quando quiser</Bullet>
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#ofertas"
                className="shine-button inline-flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(220,38,38,0.28)] transition hover:scale-105 hover:bg-red-700"
              >
                Quero Jogar Agora
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-600 sm:justify-start">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                Ideal para reviver a infancia em familia
              </div>
            </div>
          </div>

          <HeroImage className="hidden lg:block" />
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">
            Nao e so jogar
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            E voltar para aquela epoca boa por alguns minutos
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Sabe aquele jogo que voce via na locadora, no videogame do primo ou
            na casa dos amigos? A ideia aqui e trazer essa sensacao para a tela
            que voce ja tem no bolso.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <BenefitCard
            icon={<Smartphone className="h-7 w-7" />}
            title="Sem console extra"
            text="Nao precisa comprar aparelho caro para matar a saudade. Use o celular."
          />
          <BenefitCard
            icon={<Users className="h-7 w-7" />}
            title="Jogue com os pequenos"
            text="Apresente os jogos da sua epoca e transforme a nostalgia em um momento divertido em familia."
          />
          <BenefitCard
            icon={<Trophy className="h-7 w-7" />}
            title="Clima de Copa"
            text="Aproveite a energia da copa e jogue titulos de futebol retro com aquela pegada classica ."
          />
        </div>
      </Section>

      <Section className="bg-[#fffafa]">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="inline-flex rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">
              Muitos Classicos
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Só para você sentir o clima
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Sinta a vibe dos jogos que você vai jogar ainda hoje.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-3 rounded-[28px] bg-red-500/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[24px] border border-red-200 bg-slate-950 p-3 shadow-xl">
              {/* External GIF test; keep as img to avoid remote image config while validating. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeGif.src}
                src={activeGif.src}
                alt={activeGif.alt}
                className="aspect-video w-full rounded-[18px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {gameplayGifs.map((gif, index) => (
                <button
                  key={gif.src}
                  type="button"
                  onClick={() => setActiveGifIndex(index)}
                  aria-label={`Ver GIF ${index + 1}`}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    index === activeGifIndex
                      ? "w-8 bg-red-600"
                      : "w-2.5 bg-red-200 hover:bg-red-300",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="overflow-hidden bg-slate-950">
        <div className="text-center">
          <div className="inline-flex rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-200">
            Muitos jogos
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Alguns classicos que voce vai Jogar hoje mesmo!
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            Futebol retro, plataforma, corrida, luta, aventura e outros jogos
            com aquela cara de infancia.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex w-max gap-4 animate-auto-carousel will-change-transform"
            style={{ animationDuration: "28s" }}
          >
            {[...carouselImages, ...carouselImages].map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative aspect-[415/500] w-[150px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg sm:w-[190px] md:w-[220px]"
              >
                <Image
                  src={src}
                  alt={`Jogo retro ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 190px, 220px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="overflow-hidden bg-[#fffafa]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">
            <Gift className="h-4 w-4" />
            Bonus de ação rapida
          </div>
          <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-[#181818] sm:text-5xl">
            Se voce adquirir nos proximos 10 minutos, recebera totalmente gratis
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-black leading-relaxed text-[#181818] sm:text-2xl">
            Esses jogos retro ESPECIAIS
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex w-max gap-4 animate-auto-carousel will-change-transform"
            style={{ animationDuration: "32s" }}
          >
            {[...specialRetroImages, ...specialRetroImages].map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative aspect-[415/500] w-[150px] shrink-0 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-lg sm:w-[190px] md:w-[220px]"
              >
                <Image
                  src={src}
                  alt={`Jogo retro especial ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 190px, 220px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="#ofertas"
            className="shine-button inline-flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(220,38,38,0.28)] transition hover:scale-105 hover:bg-red-700"
          >
            Quero os Especiais Agora
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </Section>

      <Section id="ofertas" className="bg-gradient-to-b from-red-50 to-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">
            Escolha seu acesso
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Comece hoje sem comprar videogame novo
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            A oferta completa libera tudo. A basica e uma porta de entrada mais
            barata, com a opcao de upgrade especial antes de finalizar.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-stretch">
          <PlanCard
            badge="Mais completo"
            title="Oferta Completa"
            subtitle="Acesso ao pacote mais completo para jogar, explorar categorias e reviver varios classicos retro."
            price="27"
            oldPrice="R$ 97"
            highlight
            items={[
              "+900 jogos retro para celular",
              "Jogos de futebol retro para entrar no clima da Copa",
              "Classicos de aventura, plataforma, corrida e luta",
              "Ideal para jogar sozinho ou mostrar para seu pequeno",
              "Pagamento unico e acesso imediato",
            ]}
            cta="Quero a oferta completa"
            onClick={() => goToCheckout(CHECKOUT_COMPLETO)}
          />

          <PlanCard
            badge="Basico"
            title="Oferta Basica"
            subtitle="Uma opcao de entrada para quem quer comecar gastando pouco e testar a experiencia retro."
            price="10"
            items={[
              "Acesso basico aos jogos retro",
              "Boa opcao para comecar agora",
              "Nao precisa comprar aparelho adicional",
              "Funciona para jogar direto no celular",
            ]}
            cta="Quero o basico"
            onClick={() => setShowUpgradeModal(true)}
          />
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-red-700">
            Avaliações
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Quem gosta de nostalgia entende na primeira partida
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-5 font-black text-slate-950">{review.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-[#fffafa]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              Duvidas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              [
                "Preciso comprar algum aparelho?",
                "Nao. A promessa da pagina e justamente jogar direto no celular, sem precisar comprar um aparelho de mais de R$ 200.",
              ],
              [
                "Tem jogos de futebol retro?",
                "Sim. A pagina ja destaca a categoria de futebol retro para aproveitar o clima da Copa.",
              ],
              [
                "Como recebo o acesso?",
                "Depois da confirmacao do pagamento, voce recebe o acesso conforme o fluxo da plataforma de checkout.",
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-2xl border border-red-100 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-950">
                  <span>{question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 leading-relaxed text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-slate-950 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white">
            <Medal className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Volte a jogar os classicos hoje
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Reviva sua infancia, jogue com seus pequenos e aproveite uma biblioteca
            retro sem colocar outro aparelho na lista de compras.
          </p>
          <Link
            href="#ofertas"
            className="shine-button mt-9 inline-flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:scale-105 hover:bg-red-700"
          >
            Ver ofertas
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-400">
            <ShieldCheck className="h-5 w-5 text-red-300" />
            Compra segura e acesso imediato
          </div>
        </div>
      </Section>

      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-t-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:rounded-[32px]">
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-red-600 px-5 py-4 text-center sm:px-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/90 sm:text-xs">
                Espera: upgrade liberado
              </p>
            </div>

            <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
              <div className="text-center">
                <Gift className="mx-auto h-12 w-12 text-red-600" />
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                  Leve tudo da oferta de R$ 27 por apenas{" "}
                  <span className="text-red-600">R$ 17</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Por pouca diferenca voce desbloqueia a experiencia completa,
                  com mais jogos, mais categorias e mais nostalgia.
                </p>
              </div>

              <div className="mt-6 rounded-[24px] border border-red-100 bg-red-50 p-5 sm:p-6">
                <div className="flex items-center justify-center gap-2 text-red-700">
                  <BadgePercent className="h-5 w-5" />
                  <p className="text-xs font-black uppercase tracking-[0.16em]">
                    Oferta especial de upgrade
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  <Bullet>Leva tudo que tem na oferta completa de R$ 27</Bullet>
                  <Bullet>Mais jogos retro para explorar no celular</Bullet>
                  <Bullet>Inclui categorias como futebol, aventura e arcade</Bullet>
                  <Bullet>Melhor custo-beneficio antes de finalizar</Bullet>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => goToCheckout(CHECKOUT_UPGRADE)}
                  className="shine-button inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(220,38,38,0.28)] transition hover:scale-[1.01] hover:bg-red-700"
                >
                  Quero o upgrade de R$ 17
                  <Zap className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => goToCheckout(CHECKOUT_BASICO)}
                  className="inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-slate-700 transition hover:bg-slate-50"
                >
                  Continuar com a oferta de R$ 10
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
