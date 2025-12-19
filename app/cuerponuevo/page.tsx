// pagina app/secanatal/page.tsx
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
  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).googlePixelId = "6934df829f45845fcb041a76";

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel-google.js";

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Oferta relámpago de 10 minutos (persistente en el navegador)
  const OFFER_SECONDS = 20 * 60;
  const STORAGE_KEY = "cierreligero_offer_started_at_v1";

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
    // Cambia por el link de tu checkout (Cakto/Stripe/etc.)
    return "https://pay.kiwify.com/BTH52HU";
  }, []);

  const faqs: FaqItem[] = [
    {
      q: "¿Cómo recibo el material?",
      a: "Después del pago, recibes acceso instantáneo al área de miembros para descargar el e-book y los bonos.",
    },
    {
      q: "¿Funciona incluso si no quiero renunciar a las cenas de fin de año?",
      a: "Sí. El método se basa en estrategia: preparación antes, elecciones inteligentes durante y recuperación después, sin restricciones extremas.",
    },
    {
      q: "¿Por cuánto tiempo tendré acceso?",
      a: "Acceso inmediato para descargar los materiales y consultarlos siempre que quieras (según tu área de miembros).",
    },
    {
      q: "¿Y si no me gusta?",
      a: "Tienes 7 días de garantía. Si no sientes que valió mucho más que US$5, te devolvemos el 100%.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF7F2] text-[#1B1B1F]">
      {/* Background decor (clean salmon + subtle pattern) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.03),transparent_62%)] blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(1,169,32,0.06),transparent_62%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(0,0,0,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2"></div>

          {/* Mini timer */}
          <div className="hidden items-center gap-3 rounded-3xl border border-black/10 bg-white/70 px-4 py-2 shadow-sm md:flex">
            <span className="text-xs text-black/60">Oferta relámpago:</span>
            <span
              className={[
                "rounded-full px-3 py-1 text-sm font-extrabold tabular-nums",
                isOfferLive
                  ? "bg-red-500/15 text-red-700 ring-1 ring-red-500/25"
                  : "bg-black/5 text-black/50 ring-1 ring-black/10",
              ].join(" ")}
            >
              {isOfferLive ? formatMMSS(remaining) : "finalizada"}
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
              Plan basado en ciencia • Navidad, fin de año y Año Nuevo
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              TODOS LOS FINES DE AÑO SON IGUALES.
            </h1>

            <p className="mt-4 text-lg text-black/75 md:text-xl">
              Te pasas el año entero en la lucha… para ver{" "}
              <span className="font-extrabold text-black">
                TODO TU ESFUERZO
              </span>{" "}
              desaparecer en pocos días de celebración.
              <br />
              <span className="text-black/65">
                La ropa aprieta, vuelve la frustración. Es un ciclo sin fin.
              </span>
            </p>
            <p className="text-[#039c03] font-semibold">
              Con la estrategia correcta puedes celebrar, comer bien y empezar el
              año más ligero.
            </p>

            {/* Image moved here (below the block you asked) */}
            <div className="mt-6 overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="relative aspect-[16/11] w-full">
                {/* IMAGEN: Dra. Alicia sosteniendo el ebook sonriendo */}
                <Image
                  src="/secanatal/hero-dra-alicia.webp"
                  alt="Dra. Jessica Oliveira sonriendo y sosteniendo el e-book"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-black/10 bg-white/70 p-4">
                  <p className="text-sm font-extrabold">Sin culpa</p>
                  <p className="mt-1 text-xs text-black/60">
                    Estrategia inteligente para disfrutar sin exagerar.
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/70 p-4">
                  <p className="text-sm font-extrabold">Paso a paso</p>
                  <p className="mt-1 text-xs text-black/60">
                    Antes, durante y después de las fiestas.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[32px] border border-red-500/20 bg-white/70 p-5 shadow-sm">
              <p className="text-black/85">
                Pero este año…{" "}
                <span className="font-extrabold text-black">
                  ESTE AÑO, TIENES LA CIENCIA DE TU LADO.
                </span>
              </p>
              <p className="mt-3 text-black/70">
                Yo,{" "}
                <span className="font-extrabold">Dra. Jessica Oliveira</span>,{" "}
                especialista en Nutrición, voy a demostrarte que es posible{" "}
                <span className="font-extrabold">
                  TERMINAR EL AÑO MÁS LIGERO Y EMPEZAR EL NUEVO CON CONFIANZA
                </span>
                , sin renunciar a una mesa deliciosa.
              </p>
            </div>

            <div className="mt-6 rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm">
              <p className="text-sm font-extrabold uppercase tracking-wider text-red-700">
                ATENCIÓN
              </p>
              <p className="mt-2 text-black/75">
                “Estas son las{" "}
                <span className="font-extrabold">
                  mismas estrategias y recetas
                </span>{" "}
                que recomiendo a mis pacientes en consultas por valores mucho más
                altos. Hoy tendrás acceso al método completo por un{" "}
                <span className="font-extrabold">precio simbólico</span>.”
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                id="shine-button"
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
              >
                QUIERO EL MÉTODO + BONOS
              </a>
              <a
                href="#conteudo"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 text-base font-extrabold text-black/85 shadow-sm transition hover:bg-white"
              >
                Ver lo que incluye ↓
              </a>
            </div>

            <p className="mt-4 text-xs text-black/55">
              Acceso instantáneo después del pago • Garantía de 7 días • Oferta
              por tiempo limitado
            </p>
          </div>

          {/* Right column (product cover + objective) */}
          <div className="relative">
            <div className="rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
              <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,rgba(239,68,68,0.10),rgba(1,169,32,0.08))]">
                {/* IMAGEN: portada del ebook */}
                <Image
                  src="/secanatal/capa-ebook.webp"
                  alt="Portada del e-book Cierre Ligero"
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="mt-5 rounded-[26px] border border-[#01A920]/20 bg-[#01A920]/10 p-4">
                <p className="text-sm font-extrabold text-[#0B6E1F]">
                  Objetivo práctico
                </p>
                <p className="mt-1 text-sm text-black/70">
                  Sabrás exactamente qué hacer{" "}
                  <span className="font-extrabold">antes</span>,{" "}
                  <span className="font-extrabold">durante</span> y{" "}
                  <span className="font-extrabold">después</span> de las fiestas.
                </p>
              </div>

              <div className="mt-4 rounded-[26px] border border-black/10 bg-white/70 p-4">
                <p className="text-sm font-extrabold">No son solo recetas</p>
                <p className="mt-1 text-sm text-black/65">
                  Es un plan basado en ciencia para que disfrutes y aun así
                  termines el año más ligero y empieces el nuevo con energía.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN (top): videos + ejemplos + banners */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 pb-4 md:pb-8">
          <div className="rounded-[36px] border border-black/10 bg-white/70 p-6 shadow-sm md:p-10">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Recetas en video:{" "}
              <span className="text-black/65">
                para copiar y preparar sin error
              </span>
            </h2>
            <p className="mt-4 text-black/70">
              No te quedas solo con la teoría. Dentro del método, tienes{" "}
              <span className="font-extrabold">recetas en video</span> con ideas
              prácticas para una mesa{" "}
              <span className="font-extrabold">
                rica, bonita y más ligera
              </span>
              .
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Banner: recetasfitnatal */}
              <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-sm">
                <div className="relative aspect-[1100/440] w-full">
                  <Image
                    src="/secanatal/receitasfitnatal.webp"
                    alt="Recetas saludables en video"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-extrabold">
                    Recetas saludables en video
                  </p>
                  <p className="mt-2 text-sm text-black/70">
                    Por ejemplo: una ensalada cremosa estilo fiesta,{" "}
                    <span className="font-extrabold">
                      deliciosa y con menos calorías
                    </span>
                    , para comer sin miedo.
                  </p>
                  <div className="mt-4 rounded-[24px] border border-black/10 bg-white/70 p-4">
                    <p className="text-xs text-black/65">
                      Idea: versiones inteligentes de los platos “peligrosos” con
                      cambios simples de ingredientes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Banner: decoracaoceia */}
              <div className="overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-sm">
                <div className="relative aspect-[1100/440] w-full">
                  <Image
                    src="/secanatal/decoracaoceia.webp"
                    alt="Decoración de mesa con frutas"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm font-extrabold">
                    Deja la mesa más bonita (y más ligera)
                  </p>
                  <p className="mt-2 text-sm text-black/70">
                    Ideas de{" "}
                    <span className="font-extrabold">
                      decoración con frutas
                    </span>
                    : tablas festivas, “árbol” con frutas y arreglos que se ven
                    increíbles sin caer en excesos.
                  </p>
                  <div className="mt-4 rounded-[24px] border border-black/10 bg-white/70 p-4">
                    <p className="text-xs text-black/65">
                      Una mesa hermosa y más opciones ligeras a tu alcance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                id="shine-button"
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
              >
                QUIERO VER LAS RECETAS EN VIDEO
              </a>
              <a
                href="#conteudo"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 text-base font-extrabold text-black/85 shadow-sm transition hover:bg-white"
              >
                Ver lo que incluye ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product content */}
      <section id="conteudo" className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="rounded-[36px] border border-black/10 bg-white/70 p-6 shadow-sm md:p-10">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              CIERRE LIGERO:{" "}
              <span className="text-black/65">
                el método de la nutri para celebrar sin culpa
              </span>
            </h2>
            <p className="mt-4 text-black/70">
              En <span className="font-extrabold">“CIERRE LIGERO”</span> vas a
              aprender:
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "✅ Estrategia Pre-Fiesta: cómo prepararte en los días previos para “ganar” margen sin sufrir.",
                "✅ Modo Celebración: cómo armar tu plato de forma inteligente para disfrutar de todo, sin exagerar.",
                "✅ Recetas Clave: sustituciones simples en los platos más “peligrosos” que recortan muchas calorías.",
                "✅ Plan de Recuperación: qué hacer en los días siguientes para resetear el cuerpo y seguir avanzando.",
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
                  OFERTA RELÁMPAGO • 10 MIN
                </span>
                <span className="text-sm text-black/60">
                  {isOfferLive
                    ? "Bono disponible ahora"
                    : "Tiempo agotado (bono finalizado)"}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-extrabold md:text-3xl">
                🎁 “Postres de la Nutri”
              </h3>

              <p className="mt-3 text-black/70">
                Un bono especial con{" "}
                <span className="font-extrabold">recetas en video</span> de
                postres para{" "}
                <span className="font-extrabold">disfrutar sin miedo</span> y
                evitar el típico “ya fue”.
              </p>

              <div className="mt-6 flex items-center gap-4 rounded-[28px] border border-black/10 bg-white/70 p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5">
                  ⏳
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold">Cuenta regresiva</p>
                  <p className="text-xs text-black/60">
                    Cuando termine el tiempo, esta oferta desaparece.
                  </p>
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

              {/* NUEVA IMAGEN (sobremesasnatal) arriba del reloj */}
              <div className="mt-6 overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-sm">
                <div className="relative aspect-[1100/440] w-full">
                  <Image
                    src="/secanatal/sobremesasnatal.webp"
                    alt="Postres en video"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* IMAGEN: reloj / cuenta regresiva */}
              <div className="mt-4 overflow-hidden rounded-[32px] border border-black/10 bg-white/70 shadow-sm">
                <div className="relative aspect-[16/11] w-full">
                  <Image
                    src="/secanatal/relogio-10min.webp"
                    alt="Reloj con cuenta regresiva de 10 minutos"
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
                  QUIERO EL MÉTODO {isOfferLive ? "+ POSTRES" : "AHORA"}
                </a>
                <a
                  href="#valor"
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 text-base font-extrabold text-black/85 shadow-sm transition hover:bg-white"
                >
                  Ver el precio ↓
                </a>
              </div>
            </div>

            {/* What you get + pricing */}
            <div
              id="valor"
              className="rounded-[36px] border border-black/10 bg-white/70 p-6 shadow-sm md:p-10"
            >
              <h3 className="text-2xl font-extrabold md:text-3xl">
                Mira lo que te llevas HOY
              </h3>
              <p className="mt-2 text-black/60">
                Por una inversión menor que una comida fuera:
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { name: 'E-book principal "Cierre Ligero"', val: "US$ 39" },
                  { name: 'Bono inmediato: "Postres de la Nutri"', val: "US$ 19" },
                  { name: "Acceso al Protocolo Post-Fiestas", val: "US$ 15" },
                ].map((i) => (
                  <div
                    key={i.name}
                    className="flex items-center justify-between gap-4 rounded-[28px] border border-black/10 bg-white/70 px-5 py-4"
                  >
                    <p className="text-black/80">{i.name}</p>
                    <p className="text-sm font-extrabold text-black/60">
                      {i.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-black/60">Valor total</p>
                  <p className="text-sm font-extrabold text-black/60">
                    ̶U̶S̶$̶ ̶7̶3̶
                  </p>
                </div>

                <div className="mt-4 rounded-[32px] border border-red-500/20 bg-red-500/10 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-wider text-red-700">
                    SOLO HOY {isOfferLive ? "CON OFERTA RELÁMPAGO" : ""}
                  </p>

                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-5xl font-extrabold tracking-tight md:text-6xl">
                      US$ 5
                    </p>
                  </div>

                  <p className="mt-2 text-xs text-black/55">
                    *El valor está en dólares (USD) y se convertirá
                    automáticamente a la moneda local de tu país.
                  </p>

                  <a
                    href={ctaHref}
                    className="shine-button mt-5 inline-flex w-full items-center justify-center rounded-full bg-red-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
                  >
                    SÍ, LO QUIERO
                  </a>

                  <p className="mt-3 text-xs text-black/55">
                    Después del pago, recibirás acceso instantáneo por email.
                    <strong> Oferta por tiempo limitado.</strong>
                  </p>
                </div>

                <div className="mt-5 rounded-[28px] border border-[#01A920]/20 bg-[#01A920]/10 p-5">
                  <p className="text-sm font-extrabold tracking-wide text-[#0B6E1F]">
                    GARANTÍA DE 7 DÍAS
                  </p>
                  <p className="mt-2 text-black/70">
                    Compra y aplica. Si en una semana sientes que no valió
                    MUCHO MÁS que estos US$5, te devolvemos el 100%.
                    <span className="font-extrabold"> Riesgo cero.</span>
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
            <h3 className="text-2xl font-extrabold md:text-3xl">
              Este es el empujón que faltaba.
            </h3>
            <p className="mt-3 text-black/70">
              Deja de creer que tienes que pasarla mal. La nutrición inteligente
              existe, y cabe en{" "}
              <span className="font-extrabold">US$ 5</span> y en tu celebración.
            </p>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm md:flex-row md:items-center">
              <div>
                <p className="text-sm font-extrabold">Oferta relámpago</p>
                <p className="text-xs text-black/60">
                  El tiempo para asegurar “Postres de la Nutri” se está acabando.
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
                  ASEGURAR AHORA
                </a>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="text-xl font-extrabold">Dudas rápidas</h4>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-[32px] border border-black/10 bg-white/70 p-5 shadow-sm"
                  >
                    <summary className="cursor-pointer list-none font-extrabold text-black/85">
                      {f.q}
                      <span className="float-right text-black/40 transition group-open:rotate-45">
                        +
                      </span>
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
                QUIERO CIERRE LIGERO POR US$5
              </a>
              <a
                href="#conteudo"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/70 px-7 py-4 text-base font-extrabold text-black/85 shadow-sm transition hover:bg-white"
              >
                Volver arriba ↑
              </a>
            </div>

            <p className="mt-5 text-xs text-black/45">
              Aviso: este material tiene carácter educativo y no sustituye el
              acompañamiento profesional individual.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-extrabold">
              Cierre Ligero por{" "}
              <span className="text-red-700">US$5</span>{" "}
              {isOfferLive ? (
                <span className="text-black/60">
                  + bono por tiempo limitado
                </span>
              ) : null}
            </p>
            <p className="text-xs text-black/55">
              {isOfferLive
                ? `La oferta relámpago termina en ${formatMMSS(remaining)}`
                : "Bono finalizado • oferta principal activa"}
              {" • "}
              <span className="text-black/55">
                USD se convierte automáticamente a tu moneda local
              </span>
            </p>
          </div>

          <a
            href={ctaHref}
            id="shine-button"
            className="inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_50px_rgba(239,68,68,0.30)] transition hover:bg-red-400"
          >
            ASEGURAR AHORA
          </a>
        </div>
      </div>
    </div>
  );
}
