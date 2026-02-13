// app/mx/ingles-para-la-copa/loading/page.tsx
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

function prettyNivel(v?: string) {
  switch (v) {
    case "muy_poco":
      return "nivel inicial";
    case "entiendo_algunas":
      return "nivel básico";
    case "intermedio":
      return "nivel intermedio";
    case "avanzado":
      return "nivel avanzado";
    default:
      return "tu nivel";
  }
}

function prettyObjetivo(v?: string) {
  switch (v) {
    case "turistas":
      return "interactuar con turistas";
    case "ventas":
      return "vender más";
    case "viajar":
      return "viajar con confianza";
    case "entretenimiento":
      return "entender películas/música";
    case "todas":
      return "todo lo anterior";
    default:
      return "tu objetivo";
  }
}

export default function LoadingPage() {
  const router = useRouter();

  const answers = useMemo(() => readAnswers(), []);
  const nome = (answers.nome ?? "").trim();

  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState("Analizando tus respuestas…");

  useEffect(() => {
    // timeline de mensagens (efeito wow)
    const t1 = window.setTimeout(() => setLabel("Armando tu plan en base a tu nivel…"), 600);
    const t2 = window.setTimeout(
      () => setLabel("Seleccionando las palabras más útiles para tu día a día…"),
      1400
    );
    const t3 = window.setTimeout(
      () => setLabel("Preparando tu checklist + audios + contexto…"),
      2300
    );

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    // progresso suave até 100%
    const start = Date.now();
    const duration = 3600; // ms
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setPct(next);

      if (next >= 100) {
        window.clearInterval(tick);
        // pequeno delay e vai pra oferta
        window.setTimeout(() => {
          router.replace("/mx/ingles-para-la-copa/oferta");
        }, 500);
      }
    }, 60);

    return () => window.clearInterval(tick);
  }, [router]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-10 w-10 rounded-2xl bg-[#0B7A3B]/10 ring-1 ring-[#0B7A3B]/15">
          <div className="flex h-full w-full items-center justify-center text-lg">✅</div>
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight">
            {nome ? `Listo, ${nome}.` : "Listo."} Estamos personalizando tu resultado…
          </h1>
          <p className="mt-1 text-sm text-black/60">
            Basado en {prettyNivel(answers.nivel)} y tu objetivo de{" "}
            <span className="font-medium text-black/70">{prettyObjetivo(answers.objetivo)}</span>.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-black/60">{label}</div>
          <div className="text-xs font-semibold text-black/55">{pct}%</div>
        </div>

        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full bg-[#0B7A3B] transition-[width] duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-4 grid gap-3">
          <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#0B7A3B]" />
            Checklist imprimible (200 palabras clave)
          </div>
          <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#0B7A3B]" />
            Pronunciación en audio (rápido de practicar)
          </div>
          <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#0B7A3B]" />
            Contexto real (escenas / frases para memorizar)
          </div>
        </div>

        <p className="mt-4 text-xs text-black/45">
          No cierres esta página — falta muy poco.
        </p>
      </div>
    </div>
  );
}
