"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import "../components/quiz/css/shine.css";
import BeforeAfterSlider from "./_components/BeforeAfterSlider";
import Image from "next/image";
import AutoImageCarousel from "./_components/AutoImageCarousel";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock3,
  BadgePercent,
  PackageCheck,
  Lightbulb,
  Wand2,
  Star,
  HelpCircle,
  Image as ImageIcon,
  ChevronDown,
  X,
  ClockAlert,
} from "lucide-react";

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
    <section
      id={id}
      className={`w-full border-b border-[#dff8f1] ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1ad7a6]" />
      <span>{children}</span>
    </li>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-3xl border border-[#dff8f1] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(26,215,166,0.12)]">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9fffa] text-[#0fa37d] transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
        {text}
      </p>
    </div>
  );
}

function PlanCard({
  badge,
  title,
  subtitle,
  price,
  oldPrice,
  highlight,
  items,
  cta,
  href,
  onClick,
}: {
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  oldPrice?: string;
  highlight?: boolean;
  items: string[];
  cta: string;
  href?: string;
  onClick?: () => void;
}) {
  const buttonClass = [
    "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-5 text-center text-[15px] font-black uppercase tracking-[0.08em] transition-all hover:scale-[1.02] active:scale-[0.98]",
    highlight
      ? "shine-button bg-gradient-to-r from-[#1ad7a6] to-[#0fa37d] text-white shadow-[0_14px_34px_rgba(26,215,166,0.35)]"
      : "bg-slate-900 text-white hover:bg-slate-800",
  ].join(" ");

  return (
    <div
      className={[
        "relative flex flex-col rounded-[32px] border bg-white p-8 transition-all hover:shadow-xl",
        highlight
          ? "shine-button border-[#1ad7a6] shadow-[0_16px_50px_rgba(26,215,166,0.15)] ring-4 ring-[#e9fffa]"
          : "border-[#dff8f1] shadow-sm",
      ].join(" ")}
    >
      <div className="mb-4 self-start rounded-full border border-[#c8f6ea] bg-[#effffb] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0f8f6d]">
        {badge}
      </div>

      <h3 className="text-3xl font-black tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-3 min-h-[48px] text-sm leading-relaxed text-slate-600">
        {subtitle}
      </p>

      <div className="mt-6 rounded-3xl border border-[#e2f9f1] bg-gradient-to-br from-[#f7fffc] to-[#ebfffa] p-6 text-center">
        {oldPrice && (
          <div className="mb-1 text-sm font-medium text-slate-400 line-through">
            De {oldPrice} por apenas:
          </div>
        )}
        <div className="flex items-center justify-center gap-1">
          <span className="mb-4 text-lg font-bold text-slate-500">R$</span>
          <span className="text-6xl font-black tracking-tighter text-slate-900">
            {price}
          </span>
        </div>
        <p className="mt-3 inline-block rounded-full bg-[#d7f8ef] px-4 py-1 text-sm font-bold text-[#0f8f6d]">
          Pagamento único e acesso imediato
        </p>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {items.map((item) => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </ul>

      {onClick ? (
        <button type="button" onClick={onClick} className={buttonClass}>
          {cta}
          <ArrowRight className="h-5 w-5" />
        </button>
      ) : (
        <Link href={href ?? "#"} className={buttonClass}>
          {cta}
          <ArrowRight className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}

export default function ForroEconomicoPage() {
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  const CHECKOUT_BASICO = "https://pay.sereja.com.br/checkout/d-Td6ESa?p=oferta10";
  const CHECKOUT_UPSELL_1490 = "https://pay.sereja.com.br/checkout/d-Td6ESa?p=promo";
  const CHECKOUT_COMPLETO = "https://pay.sereja.com.br/checkout/d-Td6ESa";

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

  function handleOpenBasicUpsell() {
    setShowUpsellModal(true);
  }

  function handleGoToBasic() {
    setShowUpsellModal(false);
    window.location.href = withCurrentParams(CHECKOUT_BASICO);
  }

  function handleGoToUpsell1490() {
    setShowUpsellModal(false);
    window.location.href = withCurrentParams(CHECKOUT_UPSELL_1490);
  }

  // Estado para o cronômetro (10 minutos em segundos)
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const carouselImages = [
    "/forro/modelo1.jpg",
    "/forro/modelo2.jpg",
    "/forro/modelo3.jpg",
    "/forro/modelo4.jpg",
    "/forro/modelo5.jpg",
    "/forro/modelo6.jpg",
  ];

  return (
    <main className="min-h-screen bg-[#f8fffd] text-slate-900 selection:bg-[#1ad7a6] selection:text-white">
      <Script id="meta-pixel-forro-baixo-custo" strategy="afterInteractive">
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

      {/* Barra de Aviso Topo */}
      <div className="w-full bg-[#1ad7a6]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white sm:text-xs">
          <Sparkles className="mr-2 h-4 w-4" />
          🚨 O segredo de mestre de obras para ter um teto de rico pagando preço de banana!
        </div>
      </div>

      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(26,215,166,0.12),transparent_40%),linear-gradient(to_bottom,#ffffff,#f6fffc)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c9f6ea] bg-[#effff9] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0f8f6d] shadow-sm">
              <Star className="h-4 w-4 fill-[#0f8f6d]" />
              Passo a Passo Simples
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Faça um forro de isopor (EPS) que fica{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0fa37d] to-[#1ad7a6]">
                IGUALZINHO ao gesso
              </span>{" "}
              e economize{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">até 90%!</span>
                <span className="absolute -bottom-2 left-0 -z-10 h-3 w-full bg-[#bdf3e5]"></span>
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Deixe a sua casa linda e fresquinha! Um método tão fácil que você mesmo faz num final de semana,{" "}
              <strong className="font-extrabold text-slate-900 bg-[#e9fffa] px-2 py-0.5 rounded">
                sem quebra-quebra e sem sujeira
              </strong>{" "}
               e o melhor: sem precisar pagar caro para gesseiro ou pedreiro.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <Bullet>Chega de gastar rios de dinheiro com teto</Bullet>
              <Bullet>Você mesmo faz (não precisa de experiência!)</Bullet>
              <Bullet>Usa materiais simples e baratos</Bullet>
              <Bullet>Resultado de luxo: teto lisinho e perfeito</Bullet>
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#ofertas"
                className="shine-button inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1ad7a6] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(26,215,166,0.35)] transition hover:scale-105 hover:bg-[#15c596]"
              >
                Quero Meu Teto Novo Agora
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="flex -space-x-3 sm:ml-4 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#effff9] text-xs font-bold text-[#0f8f6d]">
                  +5k
                </div>
              </div>
              <span className="text-sm font-medium text-slate-500 text-center sm:text-left">
                5.067 Pessoas já transformaram suas casas
              </span>
            </div>
          </div>

          {/* Placeholder de Vídeo/Imagem de Alta Conversão */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#1ad7a6] to-[#8ef0d5] opacity-20 blur-2xl" />
            <BeforeAfterSlider
              beforeSrc="/forro/antes.jpg"
              afterSrc="/forro/depois.jpg"
              beforeLabel="Antes"
              afterLabel="Depois"
            />
          </div>
        </div>
      </Section>

      {/* Dor / Promessa */}
      <Section className="bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-[#d7f8ef] bg-[#effff9] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
            A verdade que os gesseiros escondem
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Você não precisa ficar com a conta no vermelho pra ter uma casa bonita
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Muita gente desanima e desiste de reformar quando vê aqueles orçamentos absurdos de gesso acartonado (Drywall). Mas agora você tem uma saída! Nós revelamos como entregar o <strong>mesmo visual de luxo</strong> usando materiais que cabem no seu bolso.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<BadgePercent className="h-8 w-8" />}
            title="Economia de Verdade"
            text="Esqueça orçamentos de mais de mil reais. Deixe sua sala ou quarto chique investindo quase nada de material."
          />
          <FeatureCard
            icon={<Wand2 className="h-8 w-8" />}
            title="Fica Idêntico ao Gesso"
            text="Ninguém vai acreditar que é isopor! Depois de passar a massa e pintar, o acabamento fica liso, perfeito e moderno."
          />
          <FeatureCard
            icon={<PackageCheck className="h-8 w-8" />}
            title="Fácil e Sem Sujeira"
            text="Você não precisa ser pedreiro. O passo a passo é tão simples que é só seguir a receita e colar no teto."
          />
        </div>
      </Section>

      {/* Comparação de Preço */}
      <Section className="bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-[#d7f8ef] bg-[#effff9] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
              Veja a diferença no seu bolso
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Gesso Tradicional x Forro de Isopor (EPS)
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
              O gesso é caro, demora e faz uma sujeira danada na sua casa. Já o <strong>forro de Isopor</strong> você mesmo instala rapidinho, sem dor de cabeça e com uma economia surreal.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Card Gesso */}
            <div className="rounded-[32px] border border-rose-100 bg-gradient-to-b from-rose-50 to-white p-8 shadow-sm">
              <div className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-rose-700">
                Forro de Gesso
              </div>

              <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
                Caro, sujo e precisa de profissional
              </h3>

              <div className="mt-6 rounded-3xl border border-rose-100 bg-white p-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Um cômodo de 10 m² custa fácil:
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  R$ 750 a R$ 1.500
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Isso contando material e a mão de obra do gesseiro.
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>Você tem que pagar caro para alguém fazer</span>
                </li>
                <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>Faz uma poeira branca horrível na casa toda</span>
                </li>
                <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>Se der infiltração, o gesso derrete e mancha fácil</span>
                </li>
                <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>Quase impossível fazer sozinho sem ter experiência</span>
                </li>
              </ul>
            </div>

            {/* Card EPS */}
            <div className="rounded-[32px] border border-[#bff3e5] bg-gradient-to-b from-[#f3fffb] to-white p-8 shadow-[0_16px_50px_rgba(26,215,166,0.10)]">
              <div className="inline-flex rounded-full bg-[#dff8f1] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
                Forro Econômico de Isopor
              </div>

              <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
                Baratinho, rápido e você mesmo faz
              </h3>

              <div className="mt-6 rounded-3xl border border-[#dff8f1] bg-white p-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                  O MESMO cômodo de 10 m² custa só:
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  R$ 150 a R$ 200
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Você gasta só com o material básico na casa de tintas!
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                <Bullet>Não precisa pagar gesseiro! Você mesmo faz brincando</Bullet>
                <Bullet>Usa massa corrida e uma faquinha de serra pra cortar</Bullet>
                <Bullet>Aguenta muito mais a umidade (isopor não derrete com água)</Bullet>
                <Bullet>Deixa a casa mais fresca no calor (o isopor isola a temperatura)</Bullet>
                <Bullet>Praticamente ZERO sujeira comparado ao gesso</Bullet>
                <Bullet>Visual de rico pagando até 10x menos</Bullet>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-[#dff8f1] bg-gradient-to-r from-[#effff9] to-white p-6 text-center shadow-sm sm:p-8">
            <p className="text-lg font-bold leading-relaxed text-slate-800 sm:text-xl">
              Resumo da ópera: no gesso você paga uma fortuna de{" "}
              <span className="text-slate-900">mão de obra</span>. Com o nosso método,{" "}
              <span className="text-[#0fa37d]">você mesmo faz</span>, não faz sujeira, se diverte no fim de semana e ainda economiza um dinheirão!
            </p>
          </div>
        </div>
      </Section>

      {/* carrossel de imagens */}
      <Section className="bg-slate-950 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-[#1ad7a6]/20 bg-[#1ad7a6]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8ef0d5]">
              Olha como fica!
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Casas transformadas de um jeito fácil e barato
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
              É tão simples que você monta no mesmo dia, deixa o ambiente chique, diminui o calorão e ainda valoriza sua casa. E o melhor: gastando mixaria!
            </p>
          </div>

          <div className="mt-10">
            <AutoImageCarousel images={carouselImages} speedSeconds={24} />
          </div>
        </div>
      </Section>

      {/* Escassez / Bônus (Agora com Timer Dinâmico) */}
      <Section className="bg-slate-950 relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#1ad7a6] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1ad7a6]/10 border border-[#1ad7a6]/20 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8ef0d5]">
              <Clock3 className="h-4 w-4 items-center" /> 
              PRESENTE EXCLUSIVO
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Compre HOJE e ganhe um bônus especial totalmente{" "}
              <span className="inline-block bg-[#1AD7A6] px-2 py-0.5 text-white">
                DE GRAÇA!
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Sabe aquelas luzes chiques embutidas que deixam a casa parecendo de novela? Eu vou te dar o passo a passo completo para instalar sem gastar quase nada.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-4 text-slate-200 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="bg-[#1ad7a6]/20 p-2 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-[#1ad7a6]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Segredos da Iluminação em LED</h4>
                  <p className="text-sm mt-1 text-slate-400">Te entrego a lista dos fornecedores onde você compra spots de LED a partir de R$10 e te ensino a ligar tudo certinho.</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-xl">
              <Image
                src="/forro/forroluz.png"
                alt="Exemplo de iluminação em forro com LED"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>
          </div>
          
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-1">
            <div className="rounded-[30px] bg-slate-900 p-8 backdrop-blur-md text-center ">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8ef0d5] mb-4">
                <ClockAlert className="w-9 h-9 mb-2 mx-auto" />
                 Seu presente some em:
              </p>
              
              {/* Timer Dinâmico */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                    <span className="text-5xl font-black tracking-tight text-white tabular-nums">{minutes}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider">Minutos</span>
                </div>
                <div className="text-4xl font-black text-slate-600 self-start mt-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                    <span className="text-5xl font-black tracking-tight text-[#1ad7a6] tabular-nums">{seconds}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider">Segundos</span>
                </div>
              </div>

              <Link
                href="#ofertas"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1ad7a6] px-6 py-5 text-sm font-extrabold uppercase tracking-[0.08em] text-slate-900 transition-all hover:bg-[#15c596] hover:scale-[1.02]"
              >
                Garantir Meu Bônus Agora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Ofertas */}
      <Section id="ofertas" className="bg-gradient-to-b from-[#f4fdfa] to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1ad7a6] to-transparent opacity-30"></div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-[#d7f8ef] bg-[#effff9] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
            Escolha seu acesso
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Pronto para colocar a mão na massa?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Escolha abaixo se você quer a versão em texto ou o nosso pacote completo com vídeos que é o mais escolhido pela galera!
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">
          <PlanCard
            badge="O Mais Vendido 🔥"
            title="Pacote Completo"
            subtitle="Pra quem quer ver na prática! Vídeos mostrando tudo, desde a compra até o teto pronto."
            price="19,90"
            oldPrice="R$ 49,90"
            highlight
            items={[
              "🎥 AULAS EM VÍDEO mostrando como colar e dar acabamento",
              "📚 Guia completo escrito (Pra ler no celular)",
              "💡 O PRESENTE EXCLUSIVO: Guia de Iluminação",
              "🛠️ Truques secretos de pintor para não trincar a massa",
              "✅ Acesso liberado NA HORA",
            ]}
            cta="Quero o Completo com Vídeos"
            onClick={() => {
              window.location.href = withCurrentParams(CHECKOUT_COMPLETO);
            }}
          />

          <PlanCard
            badge="Versão de Entrada"
            title="Guia Básico"
            subtitle="Pra quem já tem as manhas de obra e só quer ler a 'receita do bolo'."
            price="10"
            items={[
              "Apenas o Manual Escrito (PDF/Texto)",
              "Lista exata de materiais para comprar",
              "15 fotos de forros para tirar ideia",
              "Acesso liberado NA HORA",
            ]}
            cta="Quero Apenas o Básico"
            onClick={handleOpenBasicUpsell}
          />
        </div>
      </Section>

      {/* FAQ / Dúvidas Frequentes */}
      <Section className="bg-[#f8fffd]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <HelpCircle className="mx-auto mb-4 h-12 w-12 text-[#1ad7a6]" />
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Ainda com dúvidas?
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group rounded-2xl border border-[#dff8f1] bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                <span>Nunca peguei numa ferramenta. Consigo fazer?</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Consegue sim! Esse método foi feito justamente para quem NÃO é pedreiro e nem gesseiro. Se você sabe passar massa no pão, você sabe passar massa na junta do isopor. É muito simples, sem força e sem complicação.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#dff8f1] bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                <span>Como eu recebo o acesso? Chega em casa?</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Não enviamos nada pelo correio, é tudo digital! Assim que você pagar (se for PIX ou Cartão libera na hora), você recebe um e-mail com a senha para acessar os vídeos e os guias no seu celular ou computador.
              </p>
            </details>

            <details className="group rounded-2xl border border-[#dff8f1] bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                <span>É seguro colocar meu cartão aí?</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                100% seguro! Nosso sistema de pagamento é de uma das maiores plataformas de produtos digitais do Brasil. Seu dinheiro e seus dados estão blindados e protegidos.
              </p>
            </details>
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section className="bg-gradient-to-b from-white to-[#e2fbf2] pb-24">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-[#1ad7a6] to-[#0fa37d] opacity-20 blur-lg" />
          <div className="relative rounded-[32px] border border-[#1ad7a6]/20 bg-white p-10 text-center shadow-xl sm:p-14">
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Pare de adiar a casa dos seus sonhos!
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Você já perdeu muito tempo namorando os forros caros das revistas. Tá na hora de colocar a mão na massa e deixar sua casa chique gastando pouco. 
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#ofertas"
                className="inline-flex h-16 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-xl transition-all hover:scale-105 hover:bg-slate-800"
              >
                Quero Escolher Meu Plano
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
              <ShieldCheck className="h-5 w-5 text-[#1ad7a6]" />
              Compra Segura e Acesso Imediato
            </div>
          </div>
        </div>
      </Section>

      {showUpsellModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="relative w-full max-w-lg overflow-hidden rounded-t-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:rounded-[32px]">
            <button
              type="button"
              onClick={() => setShowUpsellModal(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-r from-[#1ad7a6] to-[#0fa37d] px-5 py-4 text-center sm:px-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/90 sm:text-xs">
                🚨 Espera aí! Tenho uma proposta melhor pra você
              </p>
            </div>

            <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
              <div className="mx-auto text-center">
                
                <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  Que tal levar o Pacote Completo (com VÍDEOS) por apenas{" "}
                  <span className="text-[#0fa37d]">R$ 14,90?</span>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Isso mesmo! Eu te libero <strong>TODAS AS AULAS EM VÍDEO</strong> e os guias que custam R$ 19,90 por um valor especial agora. Vai ficar muito mais fácil de aprender!
                </p>
              </div>

              <div className="mt-6 rounded-[28px] border border-[#c8f6ea] bg-gradient-to-br from-[#f7fffc] to-[#ebfffa] p-5 sm:p-6">
                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
                    Única chance de levar os vídeos mais barato
                  </p>

                  <div className="mt-3 flex items-end justify-center gap-2">
                    <span className="mb-2 text-sm font-bold text-slate-500">R$</span>
                    <span className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
                      14,90
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={handleGoToUpsell1490}
                    className="shine-button flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1ad7a6] to-[#0fa37d] px-6 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    Sim! Quero Tudo por R$ 14,90
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleGoToBasic}
                    className="flex w-full items-center justify-center rounded-xl bg-slate-100 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                  >
                    Não, quero só o básico sem vídeos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}