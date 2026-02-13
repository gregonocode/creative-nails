// app/mx/ingles-para-la-copa/quiz/[step]/page.tsx
"use client";

import { useMemo, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FUNNEL_TOTAL_STEPS,
  getStepByIndex,
  type FunnelStep,
  type Option,
} from "../../lib/steps";

type FunnelAnswers = {
  nivel?: string;
  dificuldade?: string;
  objetivo?: string;
  nome?: string;
};

const STORAGE_KEY = "mx_ingles_copa_answers_v1";

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

function writeAnswers(next: FunnelAnswers) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function setAnswer(key: keyof FunnelAnswers, value: string) {
  const current = readAnswers();
  writeAnswers({ ...current, [key]: value });
}

function ProgressBar({ current }: { current: number }) {
  const pct = Math.max(
    0,
    Math.min(100, Math.round((current / FUNNEL_TOTAL_STEPS) * 100))
  );
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-black/60">
          Paso {current} de {FUNNEL_TOTAL_STEPS}
        </div>
        <div className="text-xs font-medium text-black/50">{pct}%</div>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/10">
        <div className="h-full rounded-full bg-[#0B7A3B]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}

export default function QuizStepPage() {
  const params = useParams<{ step?: string }>();
  const router = useRouter();

  const stepNumber = useMemo(() => {
    const raw = Array.isArray(params?.step) ? params.step[0] : params?.step;
    const n = Number(raw);
    return Number.isFinite(n) ? n : NaN;
  }, [params]);

  const stepData: FunnelStep | null = useMemo(() => {
    if (!Number.isFinite(stepNumber)) return null;
    return getStepByIndex(stepNumber);
  }, [stepNumber]);

  const [name, setName] = useState("");

  // Redirect se step inválido
  useEffect(() => {
    if (!Number.isFinite(stepNumber) || !stepData) {
      router.replace("/mx/ingles-para-la-copa/quiz/1");
    }
  }, [stepNumber, stepData, router]);

  // Se for etapa de nome, tenta pré-carregar nome salvo
  useEffect(() => {
    if (stepData?.kind === "name") {
      const a = readAnswers();
      setName(a.nome ?? "");
    }
  }, [stepData?.kind]);

  const goNext = () => {
    const nextStep = stepNumber + 1;
    if (nextStep <= FUNNEL_TOTAL_STEPS) {
      router.push(`/mx/ingles-para-la-copa/quiz/${nextStep}`);
    } else {
      router.push("/mx/ingles-para-la-copa/loading");
    }
  };

  const goLoading = () => {
    router.push("/mx/ingles-para-la-copa/loading");
  };

  if (!stepData) return null;

  return (
    <div>
      <ProgressBar current={Math.min(Math.max(stepNumber, 1), FUNNEL_TOTAL_STEPS)} />

      {/* QUESTION */}
      {stepData.kind === "question" && (
        <Card>
          <h1 className="text-xl font-semibold tracking-tight">{stepData.title}</h1>
          {stepData.subtitle ? (
            <p className="mt-1 text-sm text-black/60">{stepData.subtitle}</p>
          ) : null}

          <div className="mt-4 grid gap-3">
            {stepData.options.map((opt: Option) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswer(stepData.storageKey, opt.value);
                  goNext(); // selecionou -> próxima
                }}
                className="group w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#0B7A3B]/40 hover:bg-[#0B7A3B]/[0.04] focus:outline-none focus:ring-2 focus:ring-[#0B7A3B]/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[15px] font-medium">{opt.label}</div>
                  <div className="h-8 w-8 rounded-full border border-black/10 bg-white/70 transition group-hover:border-[#0B7A3B]/30 group-hover:bg-[#0B7A3B]/[0.06]" />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-black/45">
            Al seleccionar una opción, avanzas automáticamente.
          </p>
        </Card>
      )}

      {/* INFO */}
      {stepData.kind === "info" && (
        <Card>
          <h1 className="text-xl font-semibold tracking-tight">{stepData.title}</h1>
          {stepData.subtitle ? (
            <p className="mt-1 text-sm text-black/60">{stepData.subtitle}</p>
          ) : null}

          {stepData.images?.length ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {stepData.images.slice(0, 4).map(
                (img: { src: string; alt: string }) => (
                  <div
                    key={img.src}
                    className="aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]"
                    title={img.alt}
                  >
                    {/* placeholder: troque por next/image depois */}
                    <div className="flex h-full w-full items-center justify-center text-xs text-black/40">
                      {img.alt}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : null}

          {stepData.bullets?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              {stepData.bullets.map((b: string, i: number) => (
                <li key={`${i}-${b}`} className="flex gap-2">
                  <span className="mt-[6px] inline-block h-2 w-2 flex-none rounded-full bg-[#0B7A3B]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <button
            type="button"
            onClick={goNext}
            className="mt-5 w-full rounded-2xl bg-[#0B7A3B] px-4 py-4 text-[15px] font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#0B7A3B]/40"
          >
            {stepData.ctaLabel ?? "Continuar"}
          </button>
        </Card>
      )}

      {/* NAME */}
      {stepData.kind === "name" && (
        <Card>
          <h1 className="text-xl font-semibold tracking-tight">{stepData.title}</h1>
          {stepData.subtitle ? (
            <p className="mt-1 text-sm text-black/60">{stepData.subtitle}</p>
          ) : null}

          <div className="mt-4">
            <label className="block text-xs font-medium text-black/60">Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={stepData.placeholder ?? "Tu nombre"}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-[15px] shadow-sm outline-none transition focus:border-[#0B7A3B]/40 focus:ring-2 focus:ring-[#0B7A3B]/25"
              maxLength={40}
              inputMode="text"
            />
            <p className="mt-2 text-xs text-black/45">
              Lo usaremos para personalizar tu resultado.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const trimmed = name.trim();
              if (!trimmed) return;
              setAnswer("nome", trimmed);
              goLoading();
            }}
            disabled={!name.trim()}
            className="mt-5 w-full rounded-2xl bg-[#0B7A3B] px-4 py-4 text-[15px] font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#0B7A3B]/40"
          >
            {stepData.ctaLabel ?? "Generar mi plan"}
          </button>
        </Card>
      )}

      <div className="mt-4 text-center text-[11px] text-black/40">Tema México • Verde principal</div>
    </div>
  );
}
