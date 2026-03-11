"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../components/quiz/css/shine.css";
import BeforeAfterSlider from "./_components/BeforeAfterSlider";
import Image from "next/image";
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

  return (
    <main className="min-h-screen bg-[#f8fffd] text-slate-900 selection:bg-[#1ad7a6] selection:text-white">
      {/* Barra de Aviso Topo */}
      <div className="w-full bg-[#1ad7a6]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white sm:text-xs">
          <Sparkles className="mr-2 h-4 w-4" />
          Atenção: Método validado para criar um acabamento premium gastando muito menos
        </div>
      </div>

      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(26,215,166,0.12),transparent_40%),linear-gradient(to_bottom,#ffffff,#f6fffc)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c9f6ea] bg-[#effff9] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0f8f6d] shadow-sm">
              <Star className="h-4 w-4 fill-[#0f8f6d]" />
              Novo Guia Passo a Passo
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Aprenda a fazer um{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0fa37d] to-[#1ad7a6]">
                forro de baixo custo
              </span>{" "}
              com EPS (ISOPOR) que fica{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">idêntico ao gesso</span>
                <span className="absolute -bottom-2 left-0 -z-10 h-3 w-full bg-[#bdf3e5]"></span>
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Um acabamento moderno e elegante, podendo custar{" "}
              <strong className="font-extrabold text-slate-900 bg-[#e9fffa] px-2 py-0.5 rounded">
                até 10x menos
              </strong>{" "}
              do que as alternativas tradicionais. Tão simples que você mesmo pode executar sem precisar de mão de obra cara.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <Bullet>Método 100% focado em economia real</Bullet>
              <Bullet>Faça você mesmo (DIY) sem complicação</Bullet>
              <Bullet>Não exige ferramentas caras</Bullet>
              <Bullet>Garantia de um visual limpo e sofisticado</Bullet>
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#ofertas"
                className="shine-button inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1ad7a6] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(26,215,166,0.35)] transition hover:scale-105 hover:bg-[#15c596]"
              >
                Quero Ver as Ofertas
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
                5067 Pessoas já aprenderam
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
            A verdade que ninguém conta
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Ter um teto elegante não precisa esvaziar a sua carteira
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            A maioria desiste de renovar o ambiente quando vê os orçamentos de gesso acartonado (Drywall) ou sancas tradicionais. Nossa proposta é entregar o <strong>mesmo nível visual</strong> usando materiais alternativos e acessíveis.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<BadgePercent className="h-8 w-8" />}
            title="Economia Absurda"
            text="Esqueça orçamentos de milhares de reais. Transforme seu ambiente investindo uma fração do valor."
          />
          <FeatureCard
            icon={<Wand2 className="h-8 w-8" />}
            title="Visual Impecável"
            text="Quando finalizado com a massa correta e pintura, ninguém dirá que não é gesso."
          />
          <FeatureCard
            icon={<PackageCheck className="h-8 w-8" />}
            title="Execução Descomplicada"
            text="Passo a passo pensado para iniciantes. Se você sabe seguir instruções, você consegue fazer."
          />
        </div>
      </Section>
      {/* Comparação de Preço */}

{/* Comparação de Preço */}
<Section className="bg-white">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <div className="inline-flex rounded-full border border-[#d7f8ef] bg-[#effff9] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
        Comparação real de custo
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Gesso tradicional ou forro econômico com EPS?
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
        A grande diferença está no custo final e na facilidade de execução.
        Enquanto o <strong>forro de gesso</strong> normalmente exige{" "}
        <strong>mão de obra especializada</strong>, o{" "}
        <strong>forro com EPS (isopor)</strong> pode ser feito pela própria
        pessoa, justamente por ser mais simples de trabalhar.
      </p>
    </div>

    <div className="mt-14 grid gap-8 lg:grid-cols-2">
      {/* Card Gesso */}
      <div className="rounded-[32px] border border-rose-100 bg-gradient-to-b from-rose-50 to-white p-8 shadow-sm">
        <div className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-rose-700">
          Forro de Gesso
        </div>

        <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
          Mais caro e depende de profissional
        </h3>

        <div className="mt-6 rounded-3xl border border-rose-100 bg-white p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Ambiente de 10 m²
          </p>
          <p className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            R$ 750 a R$ 1.500
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Considerando material, acabamento e mão de obra especializada.
          </p>
        </div>

        <ul className="mt-8 space-y-4">
          <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
            <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
            <span>Normalmente exige instalador com experiência</span>
          </li>
          <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
            <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
            <span>Custo final sobe com mão de obra e acabamento</span>
          </li>
          <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
            <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
            <span>Mais sensível a água, não pode molhar</span>
          </li>
          <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
            <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
            <span>Execução menos acessível para quem quer fazer sozinho</span>
          </li>
        </ul>
      </div>

      {/* Card EPS */}
      <div className="rounded-[32px] border border-[#bff3e5] bg-gradient-to-b from-[#f3fffb] to-white p-8 shadow-[0_16px_50px_rgba(26,215,166,0.10)]">
        <div className="inline-flex rounded-full bg-[#dff8f1] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
          Forro Econômico com EPS
        </div>

        <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-900">
          Muito mais acessível e fácil de executar
        </h3>

        <div className="mt-6 rounded-3xl border border-[#dff8f1] bg-white p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Ambiente de 10 m²
          </p>
          <p className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            R$ 180 a R$ 200
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Em média no material, com execução feita pela própria pessoa.
          </p>
        </div>

        <ul className="mt-8 space-y-4">
          <Bullet>Você mesmo pode fazer, sem precisar contratar mão de obra cara</Bullet>
          <Bullet>Fácil de moldar com massa corrida e uma faquinha de serra</Bullet>
          <Bullet>Baixa absorção de umidade, sem o mesmo risco do gesso comum ao molhar</Bullet>
          <Bullet>Leve, prático e com menos sujeira na execução</Bullet>
          <Bullet>Depois de pronto, fica bonito e sofisticado da mesma forma</Bullet>
          <Bullet>Pode custar até 10x menos em comparação ao método tradicional</Bullet>
        </ul>
      </div>
    </div>

    <div className="mt-10 rounded-[28px] border border-[#dff8f1] bg-gradient-to-r from-[#effff9] to-white p-6 text-center shadow-sm sm:p-8">
      <p className="text-lg font-bold leading-relaxed text-slate-800 sm:text-xl">
        Ou seja: enquanto no gesso você paga caro também pela{" "}
        <span className="text-slate-900">mão de obra especializada</span>, no
        EPS a proposta é justamente permitir que{" "}
        <span className="text-[#0fa37d]">você mesmo execute</span> e economize
        pesado, sem abrir mão de um acabamento bonito.
      </p>
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
              Bônus Exclusivo de Ação Rápida
            </div>

           <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
  Finalize seu pedido agora e libere um pacote extra{" "}
  <span className="inline-block bg-[#1AD7A6] px-2 py-0.5 text-white">
  GRÁTIS!
</span>
</h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Para turbinar o visual da sua reforma sem estourar o orçamento, preparei um bônus especial focado em iluminação que vai transformar seu forro.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-4 text-slate-200 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="bg-[#1ad7a6]/20 p-2 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-[#1ad7a6]" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Guia de Iluminação em LED</h4>
                  <p className="text-sm mt-1 text-slate-400">Lista secreta de fornecedores com LED a partir de R$10 e tutorial de instalação embutida.</p>
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
                 Esta oferta com bônus expira em:
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
                Garantir Bônus Agora
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
            Selecione o plano que melhor se adapta à sua necessidade de aprendizado.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">

          <PlanCard
  badge="Recomendado"
  title="Pack Premium Completo"
  subtitle="A experiência completa. Veja a execução na prática em vídeo e tire o projeto do papel rápido."
  price="19,90"
  oldPrice="R$ 49,90"
  highlight
  items={[
    "🎥 Vídeo-aulas mostrando a execução na prática",
    "📚 Manual prático completo e atualizado",
    "💡 +35 modelos de forro exclusivos para inspiração",
    "🛠️ Dicas extras para evitar erros comuns de iniciantes",
    "✅ Acesso imediato à área de membros",
  ]}
  cta="Quero o Completo"
  onClick={() => {
    window.location.href = withCurrentParams(CHECKOUT_COMPLETO);
  }}
/>

          <PlanCard
  badge="Versão de Entrada"
  title="Guia Básico"
  subtitle="Para quem já tem alguma noção e quer apenas a receita do material e o método em texto."
  price="10"
  items={[
    "Manual passo a passo em texto/PDF",
    "Lista exata de materiais necessários",
    "+15 modelos de forro para se inspirar",
    "Acesso vitalício ao material escrito",
  ]}
  cta="Quero Esse"
  onClick={handleOpenBasicUpsell}
/>
          
          
        </div>
      </Section>

      

      {/* FAQ / Dúvidas Frequentes */}

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
          <span>Qualquer pessoa consegue fazer?</span>
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <p className="mt-4 leading-relaxed text-slate-600">
          Sim! O método foi desenvolvido justamente para pessoas comuns que não
          têm experiência prévia com construção ou reformas. O passo a passo é
          simples e direto.
        </p>
      </details>

      <details className="group rounded-2xl border border-[#dff8f1] bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
          <span>Como recebo o acesso ao guia?</span>
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <p className="mt-4 leading-relaxed text-slate-600">
          Assim que o pagamento for confirmado, você receberá um e-mail com os
          seus dados de acesso exclusivos para acessar a nossa plataforma de
          membros, onde todo o material estará disponível.
        </p>
      </details>

      <details className="group rounded-2xl border border-[#dff8f1] bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
          <span>É seguro comprar por aqui?</span>
          <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <p className="mt-4 leading-relaxed text-slate-600">
          Totalmente! Nosso pagamento é processado por uma das maiores
          plataformas de produtos digitais do Brasil. Seus dados estão 100%
          protegidos.
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
        Não perca mais tempo com orçamentos caros.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
        Transforme a cara da sua casa agora mesmo. Escolha seu acesso e comece
        hoje o seu projeto de forro econômico.
      </p>

      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="#ofertas"
          className="inline-flex h-16 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-xl transition-all hover:scale-105 hover:bg-slate-800"
        >
          Começar Meu Projeto Hoje
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
          Espere! Oferta especial antes de continuar
        </p>
      </div>

      <div className="px-5 pb-6 pt-6 sm:px-8 sm:pb-8">
        <div className="mx-auto text-center">
          
          <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Leve a oferta mais vantajosa por apenas{" "}
            <span className="text-[#0fa37d]">R$ 14,90</span>
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
           Leve tudo que tem no de 19,90 por apenas 14,90 
          </p>
        </div>

        <div className="mt-6 rounded-[28px] border border-[#c8f6ea] bg-gradient-to-br from-[#f7fffc] to-[#ebfffa] p-5 sm:p-6">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f8f6d]">
              Oferta especial de upgrade
            </p>

            <div className="mt-3 flex items-end justify-center gap-2">
              <span className="mb-2 text-sm font-bold text-slate-500">R$</span>
              <span className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
                14,90
              </span>
            </div>

            <p className="mt-3 inline-block rounded-full bg-[#d7f8ef] px-4 py-1 text-xs font-bold text-[#0f8f6d] sm:text-sm">
              Muito mais completo por pouca diferença
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            <Bullet>Vídeo passo a passo para facilitar a execução</Bullet>
            <Bullet>Manual prático mais completo</Bullet>
            <Bullet>Mais modelos de forro para se inspirar</Bullet>
            <Bullet>Dicas extras para evitar erros comuns</Bullet>
            <Bullet>Mais clareza para conseguir um resultado bonito</Bullet>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGoToUpsell1490}
            className="shine-button inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1ad7a6] to-[#0fa37d] px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(26,215,166,0.35)] transition hover:scale-[1.01]"
          >
            Quero essa oferta
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleGoToBasic}
            className="inline-flex min-h-[56px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-slate-700 transition hover:bg-slate-50"
          >
            Quero o de 10 mesmo
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </main>
  );
}