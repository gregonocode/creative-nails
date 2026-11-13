'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import ProsperidadeMetaPixel from '@/app/components/quiz/funil/ProsperidadeMetaPixel';

type Goal = 'casa' | 'viagem' | 'carro' | 'tranquilidade' | 'outro';
type Amount = 10000 | 20000 | 40000 | 100000;

type StoredPayload = {
  goal: Goal | null;
  amount: Amount | null;
  name: string;
  savedAt?: string;
};

const STORAGE_KEY = 'prosperidade_funnel_v1';

// ✅ Exit intent / back intercept (mostra só 1x por sessão)
const EXIT_UPSELL_SHOWN_KEY = 'prosperidade_exit_upsell_shown_v1';

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

function formatBRL(n: number): string {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function safeFirstName(fullName: string): string {
  const cleaned = fullName.trim().replace(/\s+/g, ' ');
  if (!cleaned) return 'Maria';
  const first = cleaned.split(' ')[0];
  return first && first.length > 0 ? first : 'Maria';
}

function goalLabel(goal: Goal | null): string {
  switch (goal) {
    case 'casa':
      return 'dar entrada na casa';
    case 'viagem':
      return 'fazer uma viagem';
    case 'carro':
      return 'comprar ou trocar de carro';
    case 'tranquilidade':
      return 'garantir tranquilidade';
    case 'outro':
      return 'alcançar seu objetivo';
    default:
      return 'alcançar seu objetivo';
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
        aria-label="Fechar"
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

export default function OfertaPage() {
  const [payload, setPayload] = useState<StoredPayload | null>(null);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [trackingQuery, setTrackingQuery] = useState('');

  const withTracking = (url: string) => {
    if (!trackingQuery) return url;
    return `${url}${url.includes('?') ? '&' : '?'}${trackingQuery}`;
  };

  useEffect(() => {
    setPayload(readPayload());
  }, []);

  useEffect(() => {
    setTrackingQuery(window.location.search.replace(/^\?/, ''));
  }, []);

  const firstName = useMemo(() => safeFirstName(payload?.name ?? ''), [payload?.name]);
  const objective = useMemo(() => goalLabel(payload?.goal ?? null), [payload?.goal]);
  const amountText = useMemo(() => {
    if (!payload?.amount) return null;
    return formatBRL(payload.amount);
  }, [payload?.amount]);

  const congratsName = useMemo(() => safeFirstName(payload?.name ?? ''), [payload?.name]);

  // ✅ Troque pelos seus links reais:
  const checkoutIndividual = 'https://pay.sereja.com.br/checkout/xFZ4qhce';
  const checkoutFamilia = 'https://pay.sereja.com.br/checkout/99lZVGTF';
  const checkoutOferta1990 = 'https://pay.sereja.com.br/checkout/99lZVGTF?p=promo19';

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
    // 1) Exit intent: mouse indo pro topo (muito comum quando vai fechar/ir embora)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) openUpsellOnce();
    };

    // 2) Intercepta "voltar" (popstate). Empurra estado fake pra capturar o primeiro back.
    try {
      window.history.pushState({ __exit_upsell: true }, '', window.location.href);
    } catch {}

    const onPopState = () => {
      openUpsellOnce();

      // Mantém o usuário na página depois do back (pra não sair)
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
      <ProsperidadeMetaPixel />
      <div className="mx-auto max-w-xl px-4 py-6">
        {/* Header igual funil */}
        <div className="mb-4 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
              <Image src="/tabelas/perfil horta.webp" alt="Perfil" fill className="object-cover" priority />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold">Tabela da Prosperidade</div>
              <div className="text-xs text-black/50">2027 • versão personalizada</div>
            </div>
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
          {/* Aviso “instantâneo” no topo */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70">
              ✅ Acesso instantâneo
            </div>
            <div className="text-xs text-black/55">Você recebe no e-mail logo após o pagamento.</div>
          </div>

          <div className="max-w-[92%] rounded-2xl bg-black/5 px-4 py-3">
            <div className="text-sm font-semibold">
              {firstName}, sua Tabela da Prosperidade 2027 está pronta ✅
            </div>

            <div className="mt-1 text-sm text-black/60">
              Personalizada para{' '}
              <span className="font-semibold text-[#111b21]">{objective}</span>
              {amountText ? (
                <>
                  {' '}
                  com meta de <span className="font-semibold text-[#111b21]">{amountText}</span>.
                </>
              ) : (
                '.'
              )}
            </div>
          </div>

          <div className="mt-3 ml-auto max-w-[92%] rounded-2xl bg-[#D3FCAE] px-4 py-3 text-[#062b16] shadow-sm">
            <div className="text-sm">
              Método simples: depositou → marcou na tabela. Em 2027 você enxerga o progresso.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-semibold">Como funciona</div>
            <ul className="mt-2 space-y-2 text-sm text-black/60">
              <li>✅ Escolha um número/valor e guarde quando puder</li>
              <li>✅ Marque na tabela (visual e motivador)</li>
              <li>✅ Siga até bater sua meta</li>
            </ul>
          </div>

          {/* Imagem abaixo do Como funciona */}
          <div className="mt-4 -mx-4">
            <Image
              src="/tabelas/desafio.webp"
              alt="Mockup da Tabela da Prosperidade"
              width={1200}
              height={1200}
              className="w-full"
              priority
            />
          </div>
        </div>

        {/* Ofertas */}
        <div className="mt-4 grid gap-3">
          {/* NOVO CARD 1 — Opcional */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/70">
                Opcional
              </div>
            </div>

            <div className="flex items-start gap-4">
  <div className="relative h-20 w-20 flex-none overflow-hidden rounded-2xl ring-1 ring-black/10 bg-white">
   
  </div>

  <div className="flex-1">
    <p className="text-sm text-black/65">
      Acelere suas metas aprendendo a anunciar e vender itens que você não usa mais pelo{' '}
      <span className="font-semibold text-[#111b21]">Marketplace do Facebook</span>. Use o dinheiro das vendas para completar suas tabelas.
    </p>

    <ul className="mt-3 space-y-2 text-sm text-black/70">
      <li className="flex items-start gap-2">
        <span className="mt-[2px]">✅</span>
        <span>Anuncie itens que você já tem em casa e não usa mais</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-[2px]">✅</span>
        <span>Publique no Marketplace e converse com interessados pelo celular</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-[2px]">✅</span>
        <span>Você não precisa comprar produtos para começar</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-[2px]">✅</span>
        <span>Use o dinheiro das vendas para avançar na sua meta</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-[2px]">✅</span>
        <span>Comece escolhendo um item e criando seu anúncio</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-[2px]">✅</span>
        <span>Aprenda a apresentar seus itens para quem compra na sua região</span>
      </li>
    </ul>
  </div>
</div>

          </div>

          {/* NOVO CARD 2 — Parabéns + bônus 15 min */}
          <div className="relative overflow-hidden rounded-3xl border border-[#0FDB6B]/35 bg-white p-5 shadow-sm">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0FDB6B]/15 blur-2xl" />

            <div className="text-sm font-extrabold text-[#111b21]">
              {congratsName} parabéns por ter chegado até aqui 🎉
            </div>

            <div className="mt-2 text-sm text-black/65">
              Se você levar nos próximos{' '}
              <span className="font-semibold text-[#111b21]">15 minutos</span>, você vai receber
              totalmente <span className="font-semibold text-[#111b21]">GRÁTIS</span> a dica de como
              concluir em até 10x mais rapido <strong>( NÃO E BRINCADEIRA").</strong>
            </div>
          </div>

          {/* Destaque 27 */}
          <div className="relative overflow-hidden rounded-3xl border border-[#0FDB6B]/45 bg-white p-5 shadow-sm">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0FDB6B]/20 blur-2xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[#0FDB6B]/10 blur-2xl" />

            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0FDB6B]/30 bg-[#0FDB6B]/10 px-3 py-1 text-xs font-semibold text-[#0a7f3f]">
                Melhor escolha
              </div>

              <div className="mt-3 text-lg font-extrabold">Pacote Completo (2027)</div>

              <div className="mt-2 text-sm text-black/60">
                Ideal pra casal e família — várias metas prontas.
              </div>

              <div className="mt-4 text-5xl font-extrabold text-[#111b21]">R$ 27</div>
              <div className="mt-1 text-xs text-black/50">pagamento único</div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-black/70">
              <li>✅ 7 tabelas: 10k, 20k, 40k e 100k e +</li>
              <li>✅ Tabelas para você dar de presente </li>
              <li>✅ Aprenda a vender itens de casa pelo Marketplace do Facebook</li>
              <li>✅ Você pode imprimir quantas quiser</li>
              <li>✅ Perfeito para objetivos diferentes</li>
              <li>✅ Mesma meta dividido para casal ou familia</li>
              <li>✅ Bônus: transforme itens parados em dinheiro para sua meta</li>
            </ul>

            <Link
              href={withTracking(checkoutFamilia)}
              className="shine-button mt-5 block w-full rounded-2xl bg-[#0FDB6B] py-3 text-center font-semibold text-[#062b16]"
            >
              Quero o Pacote Completo
            </Link>

            <div className="mt-2 text-center text-xs text-black/50">
              ✅ Você recebe no e-mail logo após o pagamento.
            </div>
          </div>

          {/* Individual 10 */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="text-center">
              <div className="text-lg font-extrabold">Individual (2027)</div>
              <div className="mt-2 text-sm text-black/60">
                Uma tabela para 1 pessoa (meta escolhida).
              </div>

              <div className="mt-4 text-5xl font-extrabold text-[#111b21]">R$ 12</div>
              <div className="mt-1 text-xs text-black/50">pagamento único</div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-black/70">
              <li>✅ 1 tabela (com sua meta)</li>
              <li>✅ Ideal pra usar sozinho</li>
              <li>✅ Simples e direto</li>
            </ul>

            {/* Em vez de Link direto: abre popup */}
            <button
              type="button"
              onClick={() => setUpsellOpen(true)}
              className="mt-5 block w-full rounded-2xl bg-[#D3FCAE] py-3 text-center font-semibold text-[#062b16] hover:bg-[#c7f59b]"
            >
              Quero a Individual (R$ 12)
            </button>

            <div className="mt-2 text-center text-xs text-black/50">
              ✅ Você recebe no e-mail logo após o pagamento.
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">FAQ</div>

          <div className="mt-3 space-y-3">
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-semibold text-[#111b21]">E se eu não gostar?</div>
              <div className="mt-1 text-sm text-black/60">
                Você pode pedir reembolso. Você tem prazo de{' '}
                <span className="font-semibold">7 dias</span>.
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-semibold text-[#111b21]">Quando recebo?</div>
              <div className="mt-1 text-sm text-black/60">
                Você recebe de forma <span className="font-semibold">instantânea no e-mail</span>{' '}
                logo após o pagamento.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pb-8 text-center text-xs text-black/40">
          © 2027 • Tabela da Prosperidade
        </div>
      </div>

      {/* POPUP UPSELL */}
      <Modal open={upsellOpen} title="OFERTA IMPERDÍVEL!!!" onClose={() => setUpsellOpen(false)}>
        <div className="text-center text-sm text-black/70">
          Leve <span className="font-semibold text-[#111b21]">tudo que tem no de R$27</span> por
          apenas:
        </div>

        <div className="mt-3 text-center text-5xl font-extrabold text-[#111b21]">R$ 19,90</div>

        <div className="mt-2 text-center text-xs text-black/50">
          pagamento único • acesso instantâneo no e-mail
        </div>

        <div className="mt-4 space-y-2 text-sm text-black/70">
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ 4 tabelas: 10k, 20k, 40k e 100k
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Pode imprimir quantas quiser
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Ideal para casal e família
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Venda itens que não usa mais pelo Marketplace do Facebook
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          <Link
            href={withTracking(checkoutOferta1990)}
            className="shine-button block w-full rounded-2xl bg-[#0FDB6B] py-3 text-center font-semibold text-[#062b16]"
          >
            Quero essa oferta
          </Link>

          <Link
            href={withTracking(checkoutIndividual)}
            className="block w-full rounded-2xl border border-black/10 bg-white py-3 text-center font-semibold text-black/70 hover:bg-black/5"
          >
            Quero o de 12 mesmo
          </Link>

          <button
            type="button"
            onClick={() => setUpsellOpen(false)}
            className="mt-1 text-xs text-black/45 hover:text-black/70"
          >
            Voltar
          </button>
        </div>
      </Modal>
    </div>
  );
}
