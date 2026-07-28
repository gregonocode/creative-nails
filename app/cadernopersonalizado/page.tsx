import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import {
  ArrowRight,
  Blocks,
  Check,
  Download,
  Gamepad2,
  Gift,
  Heart,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import ThemeCarousel from "./ThemeCarousel";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const theme = {
  "--headline-gradient": "linear-gradient(100deg, #7c3aed 0%, #ec4899 54%, #f97316 100%)",
  "--accent": "#7c3aed",
  "--accent-soft": "#f5f3ff",
} as CSSProperties;

const benefits = [
  {
    icon: Heart,
    title: "O tema que ele ama de verdade",
    text: "Minecraft e Roblox saem da tela e vão direto para o material escolar com o nome do seu filho.",
  },
  {
    icon: Sparkles,
    title: "Feito para arrancar um sorrisão",
    text: "Aquele caderno que ele vai querer mostrar para os amiguinhos assim que chegar na escola.",
  },
  {
    icon: Download,
    title: "Receba e imprima sem complicação",
    text: "Arquivos digitais prontos para imprimir em casa ou na gráfica, sem mensalidade e sem esperar entrega.",
  },
];

const testimonials = [
  {
    text: "Meu filho escolheu o de Minecraft e ficou contando os dias para mostrar na escola. Quando coloquei o nome dele na capa, os olhinhos brilharam!",
    name: "Juliana, mãe do Pedro",
  },
  {
    text: "A minha filha ama Roblox. Imprimi a capa e os adesivos e ela já quis decorar tudo. As amigas ficaram perguntando onde ela conseguiu.",
    name: "Camila, mãe da Laura",
  },
  {
    text: "Foi rápido, fácil e ficou com cara de material caro. Meu menino começou a volta às aulas se sentindo o máximo.",
    name: "Renata, mãe do Davi",
  },
];

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--headline-gradient)" }}>
      {children}
    </span>
  );
}

export default function CadernoPersonalizadoPage() {
  return (
    <main
      style={theme}
      className={`${montserrat.variable} min-h-screen overflow-hidden bg-white font-[family-name:var(--font-montserrat)] text-stone-950 selection:bg-violet-100 selection:text-violet-800`}
    >
      <Script id="meta-pixel-caderno-personalizado" strategy="afterInteractive">
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

      <section id="inicio" aria-labelledby="titulo-principal" className="relative border-b border-stone-100">
        <div className="pointer-events-none absolute -right-44 -top-32 h-[520px] w-[520px] rounded-full bg-fuchsia-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-9 sm:px-8 sm:pb-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-violet-700">
              <Sparkles className="h-4 w-4" /> Volta às aulas inesquecível
            </div>
            <h1 id="titulo-principal" className="mt-7 max-w-4xl text-4xl font-black leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Seu filho ama <GradientText>Minecraft e Roblox?</GradientText>
            </h1>
            <p className="mt-7 max-w-2xl text-base font-semibold leading-8 text-stone-600 sm:text-lg">
              Imagine a felicidade dele chegando na escola com um caderno personalizado, com o personagem que ama e <b>o próprio nome na capa</b>, pronto para mostrar para todos os amiguinhos.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#oferta" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black text-white shadow-[0_16px_40px_rgba(124,58,237,.28)] transition hover:-translate-y-1" style={{ backgroundImage: "var(--headline-gradient)" }}>
                QUERO SURPREENDER MEU FILHO <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-stone-500 sm:text-sm">
              {["Personalizado com o nome", "Pronto para imprimir", "Acesso imediato"].map((item) => (
                <span key={item} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-stone-950 text-white"><Check className="h-3 w-3" /></span>{item}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rotate-3 rounded-[40px] bg-gradient-to-br from-violet-200 to-orange-100" />
            <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[34px] border border-white/60 bg-gradient-to-br from-[#15291b] via-[#246b43] to-[#8fce3f] p-8 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:34px_34px]" />
              <div className="relative text-center">
                <div className="mx-auto flex w-fit gap-3"><Blocks className="h-12 w-12" /><Gamepad2 className="h-12 w-12" /></div>
                <p className="mt-8 text-xs font-black uppercase tracking-[.24em] text-lime-200">Imagem principal do produto</p>
                <p className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Caderno do<br />SEU FILHO</p>
                <p className="mx-auto mt-5 max-w-xs text-sm font-bold leading-6 text-white/75">Placeholder pronto para receber o mockup de Minecraft + Roblox</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modelos" aria-labelledby="titulo-modelos" className="border-b border-stone-100 bg-[#fbfafc] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Ele escolhe o favorito</p>
              <h2 id="titulo-modelos" className="mt-4 max-w-3xl text-3xl font-black tracking-[-.045em] sm:text-5xl">Dois mundos que toda criança reconhece de longe.</h2>
            </div>
            <p className="max-w-md text-sm font-semibold leading-7 text-stone-500 sm:text-base">Deixe seu filho participar da escolha. A expectativa já começa antes mesmo de imprimir.</p>
          </div>
          <ThemeCarousel variant="notebooks" />

          <div className="mt-16 grid gap-10 rounded-[36px] border border-stone-200 bg-white p-5 shadow-[0_24px_70px_rgba(28,25,23,.08)] sm:p-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:p-10">
            <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[28px] bg-stone-100">
              <Image
                src="/capa/mockup_caderno.png"
                alt="Exemplo de caderno personalizado com capa Roblox"
                width={1086}
                height={1450}
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="h-auto w-full"
              />
            </div>

            <div className="px-2 py-4 sm:px-4 lg:px-8">
              <p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">É muito simples</p>
              <h3 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-4xl">Do arquivo ao caderno em poucos passos.</h3>
              <div className="mt-9 space-y-5">
                {[
                  ["1", "Baixe sua capa", "Escolha o modelo que mais gostou e baixe o arquivo."],
                  ["2", "Imprima em uma papelaria", "Peça a impressão em papel fotográfico fosco para ter um acabamento bonito e resistente."],
                  ["3", "Coloque no caderno", "Recorte, aplique a capa no caderno e pronto: ele já pode usar e mostrar para os amigos."],
                ].map(([number, title, text]) => (
                  <div key={number} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-600 text-sm font-black text-white">{number}</span>
                    <div>
                      <h4 className="font-black text-stone-900">{title}</h4>
                      <p className="mt-1 text-sm font-semibold leading-6 text-stone-500">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vantagens" aria-labelledby="titulo-vantagens" className="border-b border-stone-100 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Mais que um caderno</p>
            <h2 id="titulo-vantagens" className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">É o orgulho de dizer: <GradientText>“esse aqui é o meu!”</GradientText></h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[28px] border border-stone-200 p-7 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-50 text-violet-600"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-7 text-xl font-black tracking-tight">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-stone-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="bonus" aria-labelledby="titulo-bonus" className="relative overflow-hidden bg-[#160b2d] py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-pink-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-4 text-sm font-bold leading-6 text-amber-100 sm:text-base">
              <Gift className="h-6 w-6 shrink-0 text-amber-300" />
              <p>Se você adquirir nos próximos 10 minutos, recebe também os adesivos personalizados de bônus.</p>
            </div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-amber-300"><Gift className="mr-2 inline h-4 w-4" />Presente especial de volta às aulas</p>
            <h2 id="titulo-bonus" className="mt-4 text-3xl font-black leading-tight tracking-[-.045em] sm:text-5xl">
              Garanta agora e receba <GradientText>adesivos personalizados</GradientText> para deixar tudo com a cara dele.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-8 text-violet-200/70 sm:text-lg">Além do caderno, ele vai poder decorar o material e mostrar aos amigos um kit que ninguém mais na turma tem.</p>
          </div>
          <ThemeCarousel variant="stickers" />
          <div className="mt-10 flex justify-center">
            <Link href="#oferta" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-white shadow-2xl transition hover:-translate-y-1" style={{ backgroundImage: "var(--headline-gradient)" }}>
              QUERO CADERNO + ADESIVOS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="oferta" aria-labelledby="titulo-oferta" className="scroll-mt-8 bg-[#fbfafc] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Oferta de volta às aulas</p>
            <h2 id="titulo-oferta" className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">Escolha o kit perfeito para o seu filho.</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm font-semibold leading-7 text-stone-500 sm:text-base">Pagamento único. Receba os arquivos digitais e prepare um material escolar inesquecível.</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2 lg:items-start">
            <article className="relative overflow-hidden rounded-[32px] border-2 border-violet-500 bg-white p-7 shadow-[0_24px_70px_rgba(124,58,237,.16)] sm:p-9">
              <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-2 text-[11px] font-black uppercase tracking-[.14em] text-white">Mais escolhido 🔥</div>
              <p className="text-sm font-black uppercase tracking-[.16em] text-violet-600">Kit Diversão Completo</p>
              <div className="mt-5 flex items-end gap-2"><span className="pb-2 text-lg font-black text-stone-500">R$</span><span className="text-6xl font-black tracking-[-.06em]">24,90</span><span className="pb-2 text-sm font-bold text-stone-400">uma vez</span></div>
              <div className="my-8 h-px bg-stone-100" />
              <ul className="space-y-4">
                {["Coleção de cadernos Minecraft", "Coleção de cadernos Roblox", "Personalização com o nome da criança", "Arquivos prontos para imprimir", "Acesso vitalício", "Bônus: adesivos personalizados na oferta", "Vídeo rápido ensinando a adesivar o caderno", "Atividades divertidas com temas do Minecraft", "Jogos da memória com tema de Minecraft"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-stone-700"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{item}</li>
                ))}
              </ul>
              <a href="https://pay.sereja.com.br/checkout/JZ_l_sEp" className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-black text-white shadow-[0_14px_34px_rgba(124,58,237,.25)] transition hover:-translate-y-1" style={{ backgroundImage: "var(--headline-gradient)" }}>QUERO O KIT COMPLETO <ArrowRight className="h-4 w-4" /></a>
              <p className="mt-4 text-center text-xs font-bold text-stone-400"><ShieldCheck className="mr-1 inline h-4 w-4" />Compra segura e acesso imediato</p>
            </article>

            <article className="rounded-[32px] border border-stone-200 bg-white p-7 sm:p-9 lg:mt-8">
              <p className="text-sm font-black uppercase tracking-[.16em] text-stone-500">Kit Essencial</p>
              <div className="mt-5 flex items-end gap-2"><span className="pb-2 text-lg font-black text-stone-500">R$</span><span className="text-6xl font-black tracking-[-.06em]">12</span><span className="pb-2 text-sm font-bold text-stone-400">uma vez</span></div>
              <div className="my-8 h-px bg-stone-100" />
              <ul className="space-y-4">
                {["1 tema à sua escolha", "Modelos essenciais de caderno", "Personalização com o nome", "Arquivos prontos para imprimir", "Acesso vitalício"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-bold leading-6 text-stone-700"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-700"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{item}</li>
                ))}
              </ul>
              <a href="https://pay.sereja.com.br/checkout/JZ_l_sEp?p=promo12" className="mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-7 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-stone-800">QUERO O KIT ESSENCIAL <ArrowRight className="h-4 w-4" /></a>
            </article>
          </div>
        </div>
      </section>

      <section id="depoimentos" aria-labelledby="titulo-depoimentos" className="border-y border-stone-100 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Mães que já surpreenderam</p>
            <h2 id="titulo-depoimentos" className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">Pequenos detalhes criam <GradientText>grandes memórias.</GradientText></h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map(({ text, name }) => (
              <article key={name} className="flex h-full flex-col rounded-[28px] border border-stone-200 bg-[#fbfafc] p-7 sm:p-8">
                <div className="flex gap-1 text-amber-400" aria-label="5 de 5 estrelas">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-6 flex-1 text-sm font-semibold leading-7 text-stone-600 sm:text-base">“{text}”</blockquote>
                <p className="mt-7 border-t border-stone-200 pt-5 text-sm font-black">{name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" aria-labelledby="titulo-como-funciona" className="bg-stone-950 py-24 text-white sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-violet-300">Simples e rápido</p>
            <h2 id="titulo-como-funciona" className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">Do celular para o caderno em 3 passos.</h2>
            <p className="mt-6 font-semibold leading-8 text-stone-400">Sem programa complicado. Você escolhe, personaliza e imprime.</p>
          </div>
          <div className="grid gap-4">
            {[
              ["01", "Escolha o kit", "Decida entre o Essencial ou o Completo e finalize a compra."],
              ["02", "Envie o nome", "Informe o nome da criança e o tema favorito: Minecraft ou Roblox."],
              ["03", "Imprima e surpreenda", "Receba o arquivo digital, imprima em casa ou na gráfica e veja a reação dele."],
            ].map(([number, title, text]) => (
              <article key={number} className="grid gap-5 rounded-[24px] border border-white/10 bg-white/[.04] p-6 sm:grid-cols-[64px_1fr] sm:p-7"><span className="text-3xl font-black text-stone-700">{number}</span><div><h3 className="text-lg font-black">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-stone-400">{text}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="titulo-faq" className="bg-[#fbfafc] py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-violet-600">Dúvidas frequentes</p><h2 id="titulo-faq" className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">Antes de garantir o seu</h2></div>
          <div className="mt-12 space-y-4">
            {[
              { q: "O produto é físico?", a: "Não. Você recebe arquivos digitais personalizados e prontos para imprimir em casa ou em uma gráfica de sua preferência." },
              { q: "Como envio o nome do meu filho?", a: "Depois da compra, você recebe as orientações para informar o nome e escolher entre os temas disponíveis." },
              { q: "Os adesivos estão incluídos?", a: "Sim, no Kit Completo eles entram como bônus para quem garantir dentro do período promocional mostrado nesta página." },
              { q: "Preciso pagar todo mês?", a: "Não. O pagamento é único, sem assinatura ou mensalidade." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-[24px] border border-stone-200 bg-white px-6 py-1 sm:px-8"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-black marker:content-none sm:text-lg">{q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-50 text-xl text-violet-600 transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-6 pr-12 text-sm font-semibold leading-7 text-stone-500 sm:text-base">{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-violet-50 px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-200/70 blur-3xl" /><div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-orange-200/70 blur-3xl" />
          <div className="relative mx-auto max-w-3xl"><Palette className="mx-auto h-10 w-10 text-violet-600" /><h2 className="mt-6 text-3xl font-black tracking-[-.05em] sm:text-5xl">A volta às aulas dele pode ser <GradientText>muito mais especial.</GradientText></h2><p className="mx-auto mt-5 max-w-xl text-sm font-semibold leading-7 text-stone-600 sm:text-base">Dê ao seu filho um caderno com a personalidade dele e um motivo a mais para chegar animado na escola.</p><Link href="#oferta" className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-black text-white shadow-lg transition hover:-translate-y-1" style={{ backgroundImage: "var(--headline-gradient)" }}>QUERO PERSONALIZAR AGORA <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <footer className="border-t border-stone-100 py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-xs font-bold text-stone-400 sm:px-8 md:flex-row"><p>© {new Date().getFullYear()} Cadernos Personalizados.</p><p>Volta às aulas com a cara do seu filho.</p></div></footer>
    </main>
  );
}

