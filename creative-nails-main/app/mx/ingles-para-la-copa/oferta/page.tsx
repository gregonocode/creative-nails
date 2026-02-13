// app/mx/ingles-para-la-copa/oferta/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "mx_ingles_copa_answers_v1";

type FunnelAnswers = {
  nivel?: string;
  dificuldade?: string;
  objetivo?: string;
  nome?: string;
};

function readAnswers(): FunnelAnswers {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as FunnelAnswers;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function capFirst(input: string) {
  const s = input.trim();
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

type OfferId = "basico_5" | "completo_10" | "upgrade_7";

function OfferCard({
  title,
  price,
  badge,
  items,
  highlight,
  onSelect,
  subtext,
}: {
  title: string;
  price: string;
  badge?: string;
  items: string[];
  highlight?: boolean;
  subtext?: string;
  onSelect: () => void;
}) {
  return (
    <div
      className={[
        "rounded-2xl border bg-white p-5 shadow-sm",
        highlight ? "border-[#0B7A3B]/35 ring-1 ring-[#0B7A3B]/20" : "border-black/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{title}</div>
          {subtext ? <div className="mt-1 text-xs text-black/55">{subtext}</div> : null}
        </div>

        {badge ? (
          <span className="inline-flex items-center rounded-full bg-[#0B7A3B]/10 px-2 py-1 text-[11px] font-semibold text-[#0B7A3B] ring-1 ring-[#0B7A3B]/15">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="text-3xl font-extrabold tracking-tight">{price}</div>
        <div className="text-xs text-black/45">Pago único</div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-black/75">
        {items.map((it: string, idx: number) => (
          <li key={`${idx}-${it}`} className="flex gap-2">
            <span className="mt-[7px] inline-block h-2 w-2 flex-none rounded-full bg-[#0B7A3B]" />
            <span>{it}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className={[
          "mt-5 w-full rounded-2xl px-4 py-4 text-[15px] font-semibold shadow-sm transition focus:outline-none focus:ring-2",
          highlight
            ? "bg-[#0B7A3B] text-white hover:brightness-110 focus:ring-[#0B7A3B]/40"
            : "bg-white text-[#0B7A3B] ring-1 ring-[#0B7A3B]/20 hover:bg-[#0B7A3B]/[0.05] focus:ring-[#0B7A3B]/25",
        ].join(" ")}
      >
        Elegir este paquete
      </button>

      <p className="mt-3 text-center text-[11px] text-black/45">
        Se convierte a MXN automáticamente en el pago.
      </p>
    </div>
  );
}

function UpgradeModal({
  open,
  onClose,
  onAccept,
  onKeepBasic,
}: {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  onKeepBasic: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0B7A3B]/10 px-3 py-1 text-[11px] font-semibold text-[#0B7A3B] ring-1 ring-[#0B7A3B]/15">
              Oferta especial
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0B7A3B]" />
              Upgrade
            </div>
            <h3 className="mt-3 text-lg font-bold tracking-tight">
              Llévate el Pack Completo por <span className="text-[#0B7A3B]">$7</span>
            </h3>
            <p className="mt-1 text-sm text-black/60">
              Ya que elegiste el básico, te damos esta oportunidad única para desbloquear audios,
              contexto real y extras.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black/60 hover:bg-black/[0.03]"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
          <ul className="space-y-2 text-sm text-black/75">
            {[
              "Pronunciación en audio para cada palabra",
              "Aprende con frases y contexto real",
              "Ritmo flexible (5, 10 o 20 palabras/día)",
              "Checklist imprimible (incluida)",
            ].map((it: string, idx: number) => (
              <li key={`${idx}-${it}`} className="flex gap-2">
                <span className="mt-[7px] inline-block h-2 w-2 flex-none rounded-full bg-[#0B7A3B]" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-[11px] text-black/45">
            Se convierte a MXN automáticamente en el pago.
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="w-full rounded-2xl bg-[#0B7A3B] px-4 py-4 text-[15px] font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#0B7A3B]/40"
          >
            Sí, quiero el Pack Completo ($7)
          </button>

          <button
            type="button"
            onClick={onKeepBasic}
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-[15px] font-semibold text-black/70 shadow-sm transition hover:bg-black/[0.03] focus:outline-none focus:ring-2 focus:ring-[#0B7A3B]/20"
          >
            No, quiero el básico de $5
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OfertaPage() {
  const router = useRouter();

  const answers = useMemo(() => readAnswers(), []);
  const nome = capFirst(answers.nome ?? "");

  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [selected, setSelected] = useState<OfferId | null>(null);

  // Se alguém cair aqui sem nome/respostas, ok — mas podemos manter clean.
  useEffect(() => {
    // nada obrigatório por enquanto
  }, []);

  const goCheckout = (offer: OfferId) => {
    // Aqui depois você pluga seu checkout Stripe / link
    // Por enquanto só simulamos uma navegação/placeholder:
    setSelected(offer);
    // Exemplo futuro:
    // router.push(`/mx/ingles-para-la-copa/checkout?offer=${offer}`);
    // Agora: só alert (ou remove)
    window.alert(`Selecionado: ${offer}. Próximo passo: conectar checkout.`);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#0B7A3B]/10 px-3 py-1 text-[11px] font-semibold text-[#0B7A3B] ring-1 ring-[#0B7A3B]/15">
          Resultado personalizado
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0B7A3B]" />
          México
        </div>

        <h1 className="mt-3 text-2xl font-extrabold tracking-tight">
          {nome ? `${nome},` : ""} este es tu plan para aprender rápido 🇲🇽
        </h1>

        <p className="mt-2 text-sm text-black/60">
          Basado en tus respuestas, recomendamos empezar hoy con las 200 palabras más usadas
          (y enfocadas en situaciones reales).
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { t: "5–10 min/día", s: "Ritmo fácil" },
            { t: "200 palabras", s: "Lo esencial" },
            { t: "Práctico", s: "Uso real" },
          ].map((x: { t: string; s: string }, idx: number) => (
            <div
              key={`${idx}-${x.t}`}
              className="rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm"
            >
              <div className="text-lg font-bold text-[#0B7A3B]">{x.t}</div>
              <div className="mt-1 text-xs text-black/55">{x.s}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <OfferCard
          title="Paquete Básico"
          price="$5"
          subtext="Checklist imprimible (200 palabras)"
          items={[
            "Checklist imprimible (A4) con 200 palabras clave",
            "Estructura simple para marcar tu progreso",
            "Ideal para empezar hoy sin complicación",
          ]}
          onSelect={() => {
            // Ao clicar no básico: abre o popup de upgrade
            setSelected("basico_5");
            setUpgradeOpen(true);
          }}
        />

        <OfferCard
          title="Pack Completo"
          price="$10"
          badge="Recomendado"
          subtext="Checklist + audios + contexto real"
          items={[
            "Checklist imprimible (200 palabras) ✅",
            "Pronunciación en audio",
            "Contexto real (frases / escenas)",
            "Ritmo flexible (5, 10 o 20 palabras/día)",
          ]}
          highlight
          onSelect={() => {
            setSelected("completo_10");
            goCheckout("completo_10");
          }}
        />
      </div>

      {/* FAQ/nota pequena */}
      <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-black/65 shadow-sm">
        <div className="font-semibold text-black/75">Nota</div>
        <p className="mt-1">
          El precio se muestra en USD, pero <span className="font-semibold">se convierte a MXN automáticamente</span>{" "}
          al momento del pago.
        </p>
      </div>

      <UpgradeModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        onAccept={() => {
          setUpgradeOpen(false);
          setSelected("upgrade_7");
          goCheckout("upgrade_7");
        }}
        onKeepBasic={() => {
          setUpgradeOpen(false);
          goCheckout("basico_5");
        }}
      />

      {/* debug opcional */}
      {selected ? (
        <div className="text-center text-[11px] text-black/40">
          Selección actual: <span className="font-semibold">{selected}</span>
        </div>
      ) : null}
    </div>
  );
}
