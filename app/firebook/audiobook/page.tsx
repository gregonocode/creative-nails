"use client";

import Link from "next/link";
import Image from "next/image";
import AutoBookCarousel from "./_components/AutoBookCarousel";
import SocialProofToast from "@/app/components/SocialProofToast";
import {
  ArrowRight,
  Headphones,
  Clock3,
  Heart,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  MoonStar,
  Briefcase,
  Home,
  BookOpen,
  PlayCircle,
  HelpCircle,
  ChevronDown,
  BadgeCheck,
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
    <section id={id} className={`w-full ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-base">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E40627]" />
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
    <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1F4] text-[#960016]">
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

function UseCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF3F5] text-[#E40627]">
        {icon}
      </div>
      <h3 className="text-lg font-black tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}
const bookImages = [
  "/firebook/livro1.jpg",
  "/firebook/livro2.jpg",
  "/firebook/livro3.jpg",
  "/firebook/livro4.jpg",
  "/firebook/livro5.jpg",
  "/firebook/livro6.jpg",
  "/firebook/livro7.jpg",
  "/firebook/livro8.jpg",
];

const CHECKOUT_PREMIUM = "https://pay.sereja.com.br/checkout/x9SRX7Ff";
const CHECKOUT_ESSENCIAL = "https://pay.sereja.com.br/checkout/x9SRX7Ff?p=oferta10";

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
  return (
    <div
      className={[
        "relative flex flex-col rounded-[32px] border bg-white p-8 transition-all hover:shadow-xl",
        highlight
          ? "border-[#E40627] shadow-[0_18px_50px_rgba(228,6,39,0.12)] ring-4 ring-rose-50"
          : "border-rose-100 shadow-sm",
      ].join(" ")}
    >
      <div
        className={[
          "mb-4 self-start rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]",
          highlight
            ? "bg-[#FFE6EB] text-[#960016]"
            : "border border-rose-100 bg-rose-50 text-[#960016]",
        ].join(" ")}
      >
        {badge}
      </div>

      <h3 className="text-3xl font-black tracking-tight text-slate-900">
        {title}
      </h3>

      <p className="mt-3 min-h-[52px] text-sm leading-relaxed text-slate-600">
        {subtitle}
      </p>

      <div className="mt-6 rounded-3xl border border-rose-100 bg-gradient-to-br from-[#FFF8F9] to-white p-6 text-center">
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

        <p className="mt-3 inline-block rounded-full bg-[#FFECEF] px-4 py-1 text-sm font-bold text-[#960016]">
          Pagamento único • sem mensalidade
        </p>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {items.map((item) => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </ul>

      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={[
            "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-5 text-center text-[15px] font-black uppercase tracking-[0.08em] transition-all hover:scale-[1.02] active:scale-[0.98]",
            highlight
              ? "bg-[#E40627] text-white shadow-[0_14px_34px_rgba(228,6,39,0.28)] hover:bg-[#c90420]"
              : "bg-slate-900 text-white hover:bg-slate-800",
          ].join(" ")}
        >
          {cta}
          <ArrowRight className="h-5 w-5" />
        </button>
      ) : (
        <Link
          href={href ?? "#"}
          className={[
            "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-5 text-center text-[15px] font-black uppercase tracking-[0.08em] transition-all hover:scale-[1.02] active:scale-[0.98]",
            highlight
              ? "bg-[#E40627] text-white shadow-[0_14px_34px_rgba(228,6,39,0.28)] hover:bg-[#c90420]"
              : "bg-slate-900 text-white hover:bg-slate-800",
          ].join(" ")}
        >
          {cta}
          <ArrowRight className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
}


export default function FirebookAudiobookPage() {
  return (
    <>
    <SocialProofToast everyMs={25_000} durationMs={3_000} />
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#E40627] selection:text-white">
      {/* Barra topo */}
      <div className="w-full bg-[#960016]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white sm:text-xs">
          <Sparkles className="mr-2 h-4 w-4" />
          Ouça onde quiser • aprenda sem parar sua rotina • sem mensalidade
        </div>
      </div>

      {/* Hero */}
      <Section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(228,6,39,0.08),transparent_35%),linear-gradient(to_bottom,#ffffff,#fff7f8)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#960016] shadow-sm">
              <Heart className="h-4 w-4 fill-[#960016]" />
              Firebook Audiobooks
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Ouça livros e{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#960016] to-[#E40627]">
                aprenda mais
              </span>{" "}
              sem precisar parar o que você está fazendo
            </h1>
            <div className="mt-8 overflow-hidden rounded-[32px] border border-rose-100  ">
            <Image
            src="/firebook/firebookmulher.webp"
            alt="Mulher ouvindo audiobook no Firebook"
            width={1135}
            height={872}
            className="h-auto w-full object-cover"
            priority
            />
           </div>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              O Firebook foi pensado para mulheres que querem evoluir, aprender e
              aproveitar melhor o dia. Escute seus audiobooks enquanto cuida da
              casa, vai ao trabalho, organiza a rotina ou relaxa antes de dormir.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <Bullet>Aprenda enquanto faz seus afazeres do dia</Bullet>
              <Bullet>Ouça no caminho para o trabalho ou faculdade</Bullet>
              <Bullet>Perfeito para a noite e momentos de descanso</Bullet>
              <Bullet>Pagamento único, sem mensalidade recorrente</Bullet>
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#planos"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E40627] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(228,6,39,0.28)] transition hover:scale-105 hover:bg-[#c90420]"
              >
                Eu quero começar agora
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <BadgeCheck className="h-5 w-5 text-[#960016]" />
                Acesso simples, direto e sem cobrança mensal
              </div>
            </div>
            
          </div>
          <Section className="bg-[#960016] overflow-hidden">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
        Firebook
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
        Livros famosos
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
        Descubra títulos envolventes para ouvir no seu tempo, com praticidade e sem precisar parar sua rotina.
      </p>
    </div>

    <div className="mt-10">
      <AutoBookCarousel images={bookImages} speedSeconds={24} />
    </div>
  </div>
</Section>
          
          {/* Mockup visual */}
<div className="relative mx-auto w-full max-w-md lg:max-w-none">
  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#960016] to-[#E40627] opacity-10 blur-2xl" />
  <div className="relative overflow-hidden rounded-[32px] border border-rose-100 bg-white shadow-[0_20px_60px_rgba(150,0,22,0.12)]">
    <div className="bg-[#960016] px-6 py-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/80">
        Seu app de audiobooks
      </p>
      <h3 className="mt-2 text-2xl font-black">Firebook</h3>
      <p className="mt-2 text-sm text-white/80">
        Histórias, aprendizado e praticidade no seu ritmo
      </p>
    </div>

    <div className="p-6 mb-0">
      <Image
        src="/firebook/play.png"
        alt="Tela do app Firebook"
        width={768}
        height={1024}
      />

      <div className="mt-0 mb-2 rounded-2xl border border-[#FFD7DE] bg-[#FFF1F4] p-4 text-sm font-bold text-[#960016]">
        Sem mensalidade. Você paga uma vez e aproveita.
      </div>
    </div>
  </div>
</div>
           
        </div>
      </Section>
      <Section className="bg-slate-950">
  <div className="mx-auto max-w-5xl">
    <div className="text-center">
      <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/80">
        Avisos do Firebook
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
        Receba notificações sempre que entrarem{" "}
        <span className="text-[#ff2b4d]">Novos audiobooks</span>
      </h2>
        <div className="mt-10 flex justify-center">
      <Image
        src="/firebook/notificação.png"
        alt="Notificação de novos audiobooks no Firebook"
        width={520}
        height={172}
      />
    </div>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
        No Firebook você também pode ser avisada quando chegarem novos conteúdos
        na plataforma, para não perder nenhuma novidade.
      </p>
    </div>
    <div className="mx-auto mt-10 max-w-3xl text-center">
      <p className="mt-5 text-lg font-bold leading-relaxed text-white sm:text-xl">
        E o melhor: receber alertas de{" "}
        <span className="text-[#ff2b4d]">novos audiobooks</span> não gera{" "}
        <span className="text-[#ff2b4d]">custo extra</span>.
      </p>

      
    </div>
  </div>
</Section>

      {/* Dor + promessa */}
      <Section className="bg-white border-t border-rose-50">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#960016]">
            Feito para a rotina real
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Nem sempre dá tempo de sentar e ler. Mas dá para ouvir e evoluir.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Muitas mulheres querem aprender mais, mas o dia é corrido. O Firebook
            entra justamente aí: você continua sua rotina e ainda aproveita esse
            tempo para ouvir conteúdos que inspiram, ensinam e fazem companhia.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Clock3 className="h-8 w-8" />}
            title="Aproveite melhor o seu tempo"
            text="Transforme momentos comuns do dia em momentos de aprendizado e leveza."
          />
          <FeatureCard
            icon={<Headphones className="h-8 w-8" />}
            title="Escute sem interromper a rotina"
            text="Enquanto arruma a casa, trabalha, organiza tudo ou descansa, o conteúdo continua com você."
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8" />}
            title="Mais leve, mais prático"
            text="Uma forma confortável de consumir livros e conteúdos sem depender de sentar e parar tudo."
          />
        </div>
      </Section>

      {/* Situações de uso */}
      <Section className="bg-[#960016]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
              Onde o Firebook entra no seu dia
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Um app para te acompanhar em vários momentos
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
              Não é só sobre ouvir livros. É sobre transformar tempos soltos da
              rotina em momentos mais inteligentes, leves e inspiradores.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <UseCard
              icon={<Home className="h-6 w-6" />}
              title="Enquanto cuida da casa"
              text="Você organiza tudo e, ao mesmo tempo, ouve conteúdos que agregam ao seu dia."
            />
            <UseCard
              icon={<Briefcase className="h-6 w-6" />}
              title="Indo ao trabalho"
              text="No caminho, o tempo deixa de ser perdido e passa a ser bem aproveitado."
            />
            <UseCard
              icon={<MoonStar className="h-6 w-6" />}
              title="Antes de dormir"
              text="Uma forma mais tranquila de desacelerar e ainda absorver algo bom."
            />
            <UseCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Quando quiser aprender mais"
              text="Sem pressão, sem correria, no seu tempo e do seu jeito."
            />
             <Link
                href="#planos"
                className="mt-4 mb-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E40627] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(228,6,39,0.28)] transition hover:scale-105 hover:bg-[#c90420]"
              >
                Eu quero começar agora
                <ArrowRight className="h-5 w-5" />
              </Link>
          </div>
         
        </div>
      </Section>

      {/* Sem mensalidade */}
      <Section className="bg-white">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          

          <div className="rounded-[32px] border border-rose-100 bg-gradient-to-br from-[#FFF4F6] to-white p-8 shadow-sm">
            <div className="rounded-[28px] border border-[#FFD7DE] bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#960016]">
                Firebook
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                Sem Assinatura
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Você entra sabendo exatamente o que está comprando.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFECEF] px-4 py-2 text-sm font-bold text-[#960016]">
                <ShieldCheck className="h-4 w-4" />
                Pagamento único e acesso simplificado
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-[#960016]">
  <div className="mx-auto max-w-5xl">
    <div className="text-center">
      <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
        Oferta por tempo limitado
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
        Se adquirir nos próximos{" "}
        <span className="text-[#ff4d6d]">10 minutos</span>, ganhe totalmente{" "}
        <span className="text-[#ff4d6d]">grátis</span> um combo de audiobook de{" "}
        <span className="text-[#ff4d6d]">Sucesso Financeiro</span>
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/80">
        Além do acesso ao Firebook, você ainda libera um combo especial com
        conteúdos voltados para mentalidade, organização e crescimento
        financeiro.
      </p>
    </div>

    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Image
          src="/firebook/livro1.jpg"
          alt="Audiobook de sucesso financeiro 1"
          width={300}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Image
          src="/firebook/livro2.jpg"
          alt="Audiobook de sucesso financeiro 2"
          width={300}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Image
          src="/firebook/livro3.jpg"
          alt="Audiobook de sucesso financeiro 3"
          width={300}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Image
          src="/firebook/livro4.jpg"
          alt="Audiobook de sucesso financeiro 4"
          width={300}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>
    </div>

    <div className="mt-10 flex justify-center">
      <Link
        href="#planos"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E40627] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_34px_rgba(228,6,39,0.28)] transition hover:scale-105 hover:bg-[#c90420]"
      >
        Quero garantir o bônus
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  </div>
</Section>

      {/* Planos */}
      <Section
        id="planos"
        className="bg-gradient-to-b from-[#fff8f9] to-white border-t border-rose-50"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#960016]">
            Escolha seu acesso
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Entre no Firebook do jeito certo para você
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Você pode começar com uma opção mais simples ou já garantir a
            experiência mais completa.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center max-w-5xl mx-auto">
         <PlanCard
  badge="Mais escolhido"
  title="Acesso Completo"
  subtitle="Para quem quer aproveitar melhor a experiência Firebook com mais praticidade e liberdade."
  price="19,90"
  oldPrice="R$ 49,90"
  highlight
  items={[
    "Acesso ao app Firebook",
    "Audiobooks para ouvir na rotina",
    "Uso prático no dia a dia",
    "Pagamento único sem mensalidade",
    "Experiência mais completa",
  ]}
  cta="Quero o acesso completo"
  onClick={() => {
    window.location.href = withCurrentParams(CHECKOUT_PREMIUM);
  }}
/>

<PlanCard
  badge="Entrada"
  title="Acesso Essencial"
  subtitle="Uma opção para quem quer começar agora com uma entrada mais leve."
  price="10"
  items={[
    "Entrada no universo Firebook",
    "Conteúdo em formato prático",
    "Ideal para começar",
    "Pagamento único",
    "Sem assinatura mensal",
  ]}
  cta="Quero começar agora"
  onClick={() => {
    window.location.href = withCurrentParams(CHECKOUT_ESSENCIAL);
  }}
/>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <HelpCircle className="mx-auto mb-4 h-12 w-12 text-[#E40627]" />
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Dúvidas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group rounded-2xl border border-rose-100 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                <span>Preciso parar tudo para usar o Firebook?</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Não. Essa é justamente a proposta. Você pode ouvir enquanto faz
                outras atividades do seu dia, como afazeres de casa, deslocamentos
                ou momentos de descanso.
              </p>
            </details>

            <details className="group rounded-2xl border border-rose-100 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                <span>Tem mensalidade?</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Não. O Firebook foi pensado com proposta de pagamento único, sem
                cobrança mensal recorrente.
              </p>
            </details>

            <details className="group rounded-2xl border border-rose-100 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                <span>Posso ouvir antes de dormir?</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Sim. O Firebook também é ótimo para esse momento, porque você pode
                relaxar e ouvir algo leve, inspirador ou útil antes de dormir.
              </p>
            </details>

            <details className="group rounded-2xl border border-rose-100 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                <span>O acesso é simples?</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                Sim. A ideia é ser uma experiência prática, fácil de entender e
                confortável para usar no dia a dia.
              </p>
            </details>
          </div>
        </div>
      </Section>

      {/* CTA final */}
      <Section className="bg-[#960016] pb-24">
        <div className="relative mx-auto max-w-4xl">
          <div className="relative rounded-[32px] border border-white/10 bg-white p-10 text-center shadow-xl sm:p-14">
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Aproveite seu tempo de um jeito mais leve e inteligente
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Entre no Firebook e descubra como ouvir audiobooks pode encaixar
              perfeitamente na sua rotina sem mensalidade e sem complicação.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#planos"
                className="inline-flex h-16 items-center justify-center gap-2 rounded-2xl bg-[#E40627] px-8 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-xl transition-all hover:scale-105 hover:bg-[#c90420]"
              >
                Quero começar agora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
              <ShieldCheck className="h-5 w-5 text-[#960016]" />
              Pagamento único • sem mensalidade
            </div>
          </div>
        </div>
      </Section>
      
    </main>
    </>
  )
}