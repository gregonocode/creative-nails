"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { readFunil } from "@/app/lib/funil/state";

function safeFirstName(fullName: string): string {
  const cleaned = fullName.trim().replace(/\s+/g, " ");
  if (!cleaned) return "Amigo(a)";
  const first = cleaned.split(" ")[0];
  return first && first.length > 0 ? first : "Amigo(a)";
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
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-3 py-1 text-xs font-semibold text-[#5b21b6]">
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

export default function OfertaDinamicasPage() {
  const router = useRouter();
  const [upsellOpen, setUpsellOpen] = useState(false);

  const data = useMemo(() => readFunil(), []);
  const firstName = useMemo(() => safeFirstName(data.nome ?? ""), [data.nome]);
  const objetivo = useMemo(() => data.objetivo ?? "fortalecer a igreja", [data.objetivo]);
  const igreja = useMemo(() => data.igreja ?? "sua igreja", [data.igreja]);

  // 🔗 Troque pelos seus links reais
  const checkoutBasico = "https://pay.sereja.com.br/checkout/33RkjhI2";
  const checkoutCompleto = "https://pay.sereja.com.br/checkout/DH_8om67";
  const checkoutOferta = "https://pay.sereja.com.br/checkout/vbC_sR3L";

  // opcional: um link específico pro completo dentro do popup (pode ser o mesmo do completo)
  const checkoutCompletoDoPopup = checkoutOferta;


  useEffect(() => {
    // proteção de etapas
    const d = readFunil();
    if (!d.igreja) return router.replace("/funil/dinamicas/igreja");
    if (!d.objetivo) return router.replace("/funil/dinamicas/objetivo");
    if (!d.nome) return router.replace("/funil/dinamicas/nome");
  }, [router]);

  const openUpsell = useCallback(() => {
    setUpsellOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#efeae2] text-[#111b21]">
      <div className="mx-auto max-w-xl px-4 py-6">
        {/* Header estilo “chat/funil” */}
        <div className="mb-4 rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10 bg-white">
              {/* Troque por sua imagem depois */}
              <Image
                src="/logosereja.webp"
                alt="Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            <div className="flex-1">
              <div className="text-sm font-semibold">Dinâmicas para Igrejas</div>
              <div className="text-xs text-black/50">versão personalizada • acesso imediato</div>
            </div>

            <div className="rounded-full bg-[#7C3AED]/10 px-3 py-1 text-xs font-bold text-[#5b21b6]">
              Oferta
            </div>
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/70">
              ✅ Acesso instantâneo
            </div>
            <div className="text-xs text-black/55">Você recebe tudo logo após o pagamento.</div>
          </div>

          <div className="max-w-[92%] rounded-2xl bg-[#D2FADD] px-4 py-3">
            <div className="text-sm font-semibold">
              {firstName}, suas Dinâmicas estão prontas 🎉
            </div>

            <div className="mt-1 text-sm text-black/60">
              Personalizadas para{" "}
              <span className="font-semibold text-[#111b21]">{objetivo}</span> na{" "}
              <span className="font-semibold text-[#111b21]">{igreja}</span>.
            </div>
          </div>

          <div className="mt-3 ml-auto max-w-[92%] rounded-2xl bg-[#EDE9FE] px-4 py-3 text-[#2e1065] shadow-sm">
            <div className="text-sm">
              Você vai ter dinâmicas no estilo{" "}
              <span className="font-semibold">quiz (perguntas + respostas)</span>, prontas para
              imprimir e aplicar.
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-semibold">O que você vai conseguir fazer</div>
            <ul className="mt-2 space-y-2 text-sm text-black/60">
              <li>✅ Deixar o momento mais participativo (sem bagunça)</li>
              <li>✅ Engajar jovens e visitantes rapidamente</li>
              <li>✅ Aplicar em culto, células, EBD e reuniões</li>
              <li>✅ Dinâmicas simples (não precisa “preparar muita coisa”)</li>
            </ul>
          </div>

          {/* Imagem (placeholder) */}
          <div className="mt-4 -mx-4">
            {/* Troque por mockup depois (ex: /dinamicas-mockup.webp) */}
            <div className="w-full bg-black/5 py-10 text-center text-sm text-black/50">
              (Aqui entra um mockup com imagens dos PDFs / dinâmicas)
            </div>
          </div>
        </div>

        {/* Ofertas */}
        <div className="mt-4 grid gap-3">
          {/* Melhor escolha */}
          <div className="relative overflow-hidden rounded-3xl border border-[#7C3AED]/35 bg-white p-5 shadow-sm">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#7C3AED]/15 blur-2xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[#7C3AED]/10 blur-2xl" />

            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-3 py-1 text-xs font-semibold text-[#5b21b6]">
                Melhor escolha
              </div>

              <div className="mt-3 text-lg font-extrabold">Plano Completo</div>

              <div className="mt-2 text-sm text-black/60">
                Para quem quer <b>dinâmicas + vídeos + brincadeiras</b> (balões, desafios e mais).
              </div>

              <div className="mt-4 text-5xl font-extrabold text-[#111b21]">R$ 19,90</div>
              <div className="mt-1 text-xs text-black/50">pagamento único • acesso imediato</div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-black/70">
              <li>✅ Dinâmicas personalizadas para seu objetivo</li>
              <li>✅ Quizzes bíblicos prontos (perguntas + respostas)</li>
              <li>✅ Brincadeiras evangélicas (variações prontas)</li>
              <li>✅ Dinâmicas em vídeo (balões, desafios, etc.)</li>
              <li>✅ Você pode imprimir quantas quiser</li>
            </ul>

            {/* Botão principal com animação */}
            <Link
              href={checkoutCompleto}
              className={[
                "shine-button mt-5 block w-full rounded-2xl bg-[#7C3AED] py-3 text-center font-semibold text-white",
                "transition hover:brightness-95",
              ].join(" ")}
            >
              Quero o Plano Completo
            </Link>

            <div className="mt-2 text-center text-xs text-black/50">
              ✅ Você recebe tudo logo após o pagamento.
            </div>
          </div>

          {/* Plano básico */}
          <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <div className="text-center">
              <div className="text-lg font-extrabold">Plano Básico</div>
              <div className="mt-2 text-sm text-black/60">
                Só as <b>dinâmicas personalizadas</b> (mais direto e simples).
              </div>

              <div className="mt-4 text-5xl font-extrabold text-[#111b21]">R$ 10,00</div>
              <div className="mt-1 text-xs text-black/50">pagamento único</div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-black/70">
              <li>✅ Dinâmicas personalizadas para seu objetivo</li>
              <li>✅ PDFs prontos para imprimir</li>
              <li>✅ Fácil de aplicar</li>
            </ul>

            {/* Em vez de Link direto: abre popup */}
            <button
              type="button"
              onClick={openUpsell}
              className="mt-5 block w-full rounded-2xl bg-[#D2FADD] py-3 text-center font-semibold text-[#2e1065] hover:bg-[#e6defe]"
            >
              Quero o Básico (R$ 10)
            </button>

            <div className="mt-2 text-center text-xs text-black/50">
              ✅ Você recebe tudo logo após o pagamento.
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="text-sm font-semibold">FAQ</div>

          <div className="mt-3 space-y-3">
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-semibold text-[#111b21]">Quando recebo?</div>
              <div className="mt-1 text-sm text-black/60">
                Acesso instantâneo logo após o pagamento.
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-semibold text-[#111b21]">Precisa de impressora?</div>
              <div className="mt-1 text-sm text-black/60">
                Não. Você pode usar no celular também, mas imprimir ajuda muito na dinâmica.
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/5 p-4">
              <div className="text-sm font-semibold text-[#111b21]">E se eu não gostar?</div>
              <div className="mt-1 text-sm text-black/60">
                Você pode solicitar reembolso dentro do prazo legal/da sua política.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pb-8 text-center text-xs text-black/40">
          © 2026 • Dinâmicas para Igrejas
        </div>
      </div>

      {/* POPUP (aparece quando escolhe o plano menor) */}
      <Modal open={upsellOpen} title="Espera! Libera o Completo com desconto 👀" onClose={() => setUpsellOpen(false)}>
        <div className="text-center text-sm text-black/70">
          {firstName}, por uma diferença pequena você libera:
          <div className="mt-2 font-semibold text-[#111b21]">
            ✅ vídeos + brincadeiras + variações de dinâmicas
          </div>
        </div>

        <div className="mt-3 text-center text-5xl font-extrabold text-[#111b21]">R$ 14,90</div>

        <div className="mt-2 text-center text-xs text-black/50">
          pagamento único • acesso imediato
        </div>

        <div className="mt-4 space-y-2 text-sm text-black/70">
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Dinâmicas personalizadas para: <b>{objetivo}</b>
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Quizzes prontos (perguntas + respostas) + PDFs imprimíveis
          </div>
          <div className="rounded-2xl border border-black/10 bg-black/5 p-3">
            ✅ Vídeos e brincadeiras (balões, desafios e mais)
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          <Link
            href={checkoutCompletoDoPopup}
            className="shine-button block w-full rounded-2xl bg-[#7C3AED] py-3 text-center font-semibold text-white"
          >
            Quero o Completo
          </Link>

          <Link
            href={checkoutBasico}
            className="block w-full rounded-2xl border border-black/10 bg-white py-3 text-center font-semibold text-black/70 hover:bg-black/5"
          >
            Quero o Básico mesmo (R$ 10)
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
