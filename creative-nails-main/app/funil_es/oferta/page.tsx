'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

type Goal = 'casa' | 'viagem' | 'carro' | 'tranquilidade' | 'outro';
type Amount = 10000 | 20000 | 40000 | 100000;

type StoredPayload = {
  goal: Goal | null;
  amount: Amount | null;
  name: string;
  savedAt?: string;
};

const STORAGE_KEY = 'prosperidad_funnel_v1';

// ✅ Exit intent / back intercept (muestra solo 1x por sesión)
const EXIT_UPSELL_SHOWN_KEY = 'prosperidad_exit_upsell_shown_v1';

function hasShownExitUpsell(): boolean {
  try {
    return sessionStorage.getItem(EXIT_UPSELL_SHOWN_KEY) === '1';
  } catch {
    return false;
  }
}

function markExitUpsellShown() {
  try {
    sessionStorage.setItem(EXIT_UPSELL_SHOWN_KEY, '1');
  } catch {}
}

function safeFirstName(fullName: string): string {
  const cleaned = fullName.trim().replace(/\s+/g, ' ');
  if (!cleaned) return 'María';
  const first = cleaned.split(' ')[0];
  return first && first.length > 0 ? first : 'María';
}

function goalLabel(goal: Goal | null): string {
  switch (goal) {
    case 'casa':
      return 'dar el enganche de una casa';
    case 'viagem':
      return 'hacer un viaje';
    case 'carro':
      return 'comprar o cambiar de coche';
    case 'tranquilidade':
      return 'tener tranquilidad';
    case 'outro':
      return 'alcanzar tu objetivo';
    default:
      return 'alcanzar tu objetivo';
  }
}

function readPayload(): StoredPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredPayload;

    const goalOk =
      parsed.goal === null ||
      parsed.goal === 'casa' ||
      parsed.goal === 'viagem' ||
      parsed.goal === 'carro' ||
      parsed.goal === 'tranquilidade' ||
      parsed.goal === 'outro';

    const amountOk =
      parsed.amount === null ||
      parsed.amount === 10000 ||
      parsed.amount === 20000 ||
      parsed.amount === 40000 ||
      parsed.amount === 100000;

    const nameOk = typeof parsed.name === 'string';

    if (!goalOk || !amountOk || !nameOk) return null;
    return parsed;
  } catch {
    return null;
  }
}

function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="p-5">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0FDB6B]/30 bg-[#0FDB6B]/10 px-3 py-1 text-xs font-semibold text-[#0a7f3f]">
              Oferta
            </div>
            <h3 className="mt-3 text-xl font-extrabold text-[#111b21]">{title}</h3>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function OfertaEsPage() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);
  const [upsellOpen, setUpsellOpen] = useState(false);

  useEffect(() => {
    setPayload(readPayload());
  }, []);

  const firstName = useMemo(() => safeFirstName(payload?.name ?? ''), [payload?.name]);
  const objective = useMemo(() => goalLabel(payload?.goal ?? null), [payload?.goal]);

  const congratsName = useMemo(() => safeFirstName(payload?.name ?? ''), [payload?.name]);

  // ✅ Avisa sobre conversão:
  const conversionNote = 'Se convertirá automáticamente a MXN al pagar.';

  // ✅ IMPORTANTE: Troque pelos seus links reais do checkout MÉXICO (USD)
  // - Paquete Completo: $10
  const checkoutCompletoUSD = 'https://pay.sereja.com.br/checkout/global/9ypdjlV3';

  // - Individual: $5
  const checkoutIndividualUSD = 'https://pay.sereja.com.br/checkout/global/Mh1xBCOW';

  // - Oferta promocional popup: $7
  const checkoutPromoUSD = 'https://pay.sereja.com.br/checkout/global/Ck7omheg';

  // ✅ Abre o upsell só 1x por sessão
  const openUpsellOnce = useCallback(() => {
    if (hasShownExitUpsell()) return;

    setUpsellOpen((prev) => {
      if (prev) return prev;
      markExitUpsellShown();
      return true;
    });
  }, []);

  // ✅ Exit intent (desktop) + intercept back (mobile/desktop)
  useEffect(() => {
    // 1) Exit intent: mouse indo pro topo
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) openUpsellOnce();
    };

    // 2) Intercepta "voltar" (popstate)
    try {
      window.history.pushState({ __exit_upsell: true }, '', window.location.href);
    } catch {}

    const onPopState = () => {
      openUpsellOnce();

      try {
        window.history.pushState({ __exit_upsell: true }, '', window.location.href);
      } catch {}
    };

    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('popstate', onPopState);
    };
  }, [openUpsellOnce]);

  return (
    <div className="min-h-screen bg-[#efeae2] text-[#111b21]">
      <div className="mx-auto max-w-xl px-4 py-6">
        {/* Header igual funil */}
        <div className="mb-4 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
              <Image src="/perfil horta.webp" alt="Perfil" fill className="object-cover" priority />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold">Tabla de Prosperidad</div>
              <div className="text-xs text-black/50">2026 • versión personalizada</div>
            </div>
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
          {/* Aviso “instantâneo” no topo */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70">
              ✅ Acceso inmediato
            </div>
            <div className="text-xs text-black/55">
              Lo recibes por email justo después del pago.
            </div>
          </div>

          <div className="max-w-[92%] rounded-2xl bg-black/5 px-4 py-3">
            <div className="text-sm font-semibold">
              {firstName}, tu Tabla de Prosperidad 2026 está lista ✅
            </div>

            <div className="mt-1 text-sm text-black/60">
              Personalizada para{' '}
              <span className="font-semibold text-[#111b21]">{objective}</span>.
            </div>
          </div>

          <div className="mt-3 ml-auto max-w-[92%] rounded-2xl bg-[#D3FCAE] px-4 py-3 text-[#062b16] shadow-sm">
            <div className="text-sm">
              Método simple: ahorraste → marcas en la tabla. En 2026 verás tu progreso.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-semibold">Cómo funciona</div>
            <ul className="mt-2 space-y-2 text-sm text-black/60">
              <li>✅ Elige un número/valor y ahorra cuando puedas</li>
              <li>✅ Márcalo en la tabla (visual y motivador)</li>
              <li>✅ Sigue hasta llegar a tu meta</li>
            </ul>
          </div>

          {/* Imagem abaixo do Como funciona */}
          <div className="mt-4 -mx-4">
            <Image
              src="/desafio.webp"
              alt="Mockup de la Tabla de Prosperidad"
              width={1200}
              height={1200}
              className="w-full"
              priority
            />
          </div>
        </div>

        {/* Ofertas */}
        <div className="mt-4 grid gap-3">
          {/* CARD Opcional */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                Opcional
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-2xl ring-1 ring-black/10">
                <Image src="/frango.png" alt="Bono" fill className="object-cover" />
              </div>

              <p className="text-sm text-black/65">
                ¿Quieres <span className="font-semibold text-[#111b21]">acelerar</span> y marcar tu
                tabla más rápido? Llévate el paquete con este{' '}
                <span className="font-semibold text-[#111b21]">bonus</span> para ayudarte a avanzar
                con más constancia.
              </p>
            </div>
          </div>

          {/* Parabéns + bônus 15 min */}
          <div className="relative overflow-hidden rounded-3xl border border-[#0FDB6B]/35 bg-white p-5 shadow-sm">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0FDB6B]/15 blur-2xl" />

            <div className="text-sm font-extrabold text-[#111b21]">
              {congratsName}, felicidades por llegar hasta aquí 🎉
            </div>

            <div className="mt-2 text-sm text-black/65">
              Si lo compras en los próximos{' '}
              <span className="font-semibold text-[#111b21]">15 minutos</span>, recibirás{' '}
              <span className="font-semibold text-[#111b21]">GRATIS</span> un tip para avanzar hasta
              10x más rápido <strong>(de verdad).</strong>
            </div>
          </div>

          {/* Melhor escolha — Completo */}
          <div className="relative overflow-hidden rounded-3xl border border-[#0FDB6B]/45 bg-white p-5 shadow-sm">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0FDB6B]/20 blur-2xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[#0FDB6B]/10 blur-2xl" />

            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0FDB6B]/30 bg-[#0FDB6B]/10 px-3 py-1 text-xs font-semibold text-[#0a7f3f]">
                Mejor opción
              </div>

              <div className="mt-3 text-lg font-extrabold">Paquete Completo (2026)</div>

              <div className="mt-2 text-sm text-black/60">
                Ideal para pareja y familia — varias metas listas.
              </div>

              <div className="mt-4 text-5xl font-extrabold text-[#111b21]">$10</div>
              <div className="mt-1 text-xs text-black/50">pago único</div>
              <div className="mt-1 text-[11px] text-black/45">{conversionNote}</div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-black/70">
              <li>✅ 7 tablas: 10k, 20k, 40k, 100k y más</li>
              <li>✅ Tablas para regalar</li>
              <li>✅ Puedes imprimir las que quieras</li>
              <li>✅ Perfecto para distintos objetivos</li>
              <li>✅ Misma meta dividida para pareja o familia</li>
              <li>✅ Bonus incluido</li>
            </ul>

            <Link
              href={checkoutCompletoUSD}
              className="shine-button mt-5 block w-full rounded-2xl bg-[#0FDB6B] py-3 text-center font-semibold text-[#062b16]"
            >
              Quiero el Paquete Completo
            </Link>

            <div className="mt-2 text-center text-xs text-black/50">
              ✅ Lo recibes por email justo después del pago.
            </div>
          </div>

          {/* Individual */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="text-center">
              <div className="text-lg font-extrabold">Individual (2026)</div>
              <div className="mt-2 text-sm text-black/60">
                Una tabla para 1 persona (meta elegida).
              </div>

              <div className="mt-4 text-5xl font-extrabold text-[#111b21]">$5</div>
              <div className="mt-1 text-xs text-black/50">pago único</div>
              <div className="mt-1 text-[11px] text-black/45">{conversionNote}</div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-black/70">
              <li>✅ 1 tabla (con tu meta)</li>
              <li>✅ Ideal para usar solo</li>
              <li>✅ Simple y directo</li>
            </ul>

            {/* Em vez de Link direto: abre popup */}
            <button
              type="button"
              onClick={() => setUpsellOpen(true)}
              className="mt-5 block w-full rounded-2xl bg-[#D3FCAE] py-3 text-center font-semibold text-[#062b16] hover:bg-[#c7f59b]"
            >
              Quiero la Individual ($5)
            </button>

            <div className="mt-2 text-center text-xs text-black/50">
              ✅ Lo recibes por email justo después del pago.
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">FAQ</div>

          <div className="mt-3 space-y-3">
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-semibold text-[#111b21]">¿Y si no me gusta?</div>
              <div className="mt-1 text-sm text-black/60">
                Puedes pedir reembolso. Tienes{' '}
                <span className="font-semibold">7 días</span>.
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-semibold text-[#111b21]">¿Cuándo lo recibo?</div>
              <div className="mt-1 text-sm text-black/60">
                Lo recibes de forma <span className="font-semibold">instantánea por email</span>{' '}
                justo después del pago.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pb-8 text-center text-xs text-black/40">
          © 2026 • Tabla de Prosperidad
        </div>
      </div>

      {/* POPUP UPSELL */}
      <Modal open={upsellOpen} title="¡¡OFERTA IMPERDIBLE!!" onClose={() => setUpsellOpen(false)}>
        <div className="text-center text-sm text-black/70">
          Llévate <span className="font-semibold text-[#111b21]">todo el Paquete Completo</span> por
          solo:
        </div>

        <div className="mt-3 text-center text-5xl font-extrabold text-[#111b21]">$7</div>

        <div className="mt-1 text-center text-[11px] text-black/45">{conversionNote}</div>

        <div className="mt-2 text-center text-xs text-black/50">
          pago único • acceso instantáneo por email
        </div>

        <div className="mt-4 space-y-2 text-sm text-black/70">
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ 4 tablas: 10k, 20k, 40k y 100k
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Puedes imprimir las que quieras
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Ideal para pareja y familia
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Bonus incluido
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          <Link
            href={checkoutPromoUSD}
            className="shine-button block w-full rounded-2xl bg-[#0FDB6B] py-3 text-center font-semibold text-[#062b16]"
          >
            Quiero esta oferta
          </Link>

          <Link
            href={checkoutIndividualUSD}
            className="block w-full rounded-2xl border border-black/10 bg-white py-3 text-center font-semibold text-black/70 hover:bg-black/5"
          >
            Prefiero la Individual ($5)
          </Link>

          <button
            type="button"
            onClick={() => setUpsellOpen(false)}
            className="mt-1 text-xs text-black/45 hover:text-black/70"
          >
            Volver
          </button>
        </div>
      </Modal>
    </div>
  );
}
