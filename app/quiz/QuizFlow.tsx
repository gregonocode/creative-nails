// app/quiz/QuizFlow.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS, type QuizAnswer } from "./questions";

type Step = { type: "q"; index: number } | { type: "name" } | { type: "loading" };

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function buildOfferUrl(params: { name: string; answers: Partial<QuizAnswer> }) {
  const sp = new URLSearchParams();
  sp.set("nome", params.name.trim());
  if (params.answers.moneyIntent) sp.set("obj", params.answers.moneyIntent);
  if (params.answers.buildFor) sp.set("pra", params.answers.buildFor);
  if (params.answers.priority) sp.set("prio", params.answers.priority);
  return `/oferta?${sp.toString()}`;
}

export default function QuizFlow() {
  const router = useRouter();

  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [name, setName] = useState("");
  const [step, setStep] = useState<Step>({ type: "q", index: 0 });

  const currentQuestion = useMemo(() => {
    if (step.type !== "q") return null;
    return QUIZ_QUESTIONS[step.index] ?? null;
  }, [step]);

  function pickOption(value: string) {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    const nextIndex = (step.type === "q" ? step.index : 0) + 1;

    if (nextIndex < QUIZ_QUESTIONS.length) {
      setStep({ type: "q", index: nextIndex });
      return;
    }

    setStep({ type: "name" });
  }

  function goGenerate() {
    const trimmed = name.trim();
    if (trimmed.length < 2) return;

    setStep({ type: "loading" });

    const url = buildOfferUrl({ name: trimmed, answers });
    window.setTimeout(() => {
      router.push(url);
    }, 5000);
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <div className="mx-auto w-full max-w-[780px] px-4 py-10 sm:py-14">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
            <p className="text-sm font-medium text-slate-700">
              Quiz rápido • 20 segundos
            </p>
          </div>

          <p className="text-xs text-slate-500">
            {step.type === "q" ? `Pergunta ${step.index + 1}/${QUIZ_QUESTIONS.length}` : "Final"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-7">
          {step.type === "q" && currentQuestion && (
            <>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {currentQuestion.title}
              </h1>
              {currentQuestion.subtitle && (
                <p className="mt-2 text-sm text-slate-600">{currentQuestion.subtitle}</p>
              )}

              <div className="mt-5 grid gap-3">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => pickOption(opt.value)}
                    className={cn(
                      "group w-full rounded-2xl border px-4 py-3 text-left transition",
                      "border-slate-200 hover:border-sky-300 hover:bg-sky-50",
                      "focus:outline-none focus:ring-4 focus:ring-sky-100"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-slate-800 sm:text-base">
                        {opt.label}
                      </span>
                      <span className="text-sky-500 opacity-0 transition group-hover:opacity-100">
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step.type === "name" && (
            <>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Pra personalizar rapidinho…
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Qual seu nome? (Vou usar na próxima tela)
              </p>

              <div className="mt-5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Tiago"
                  className={cn(
                    "w-full rounded-2xl border px-4 py-3 text-slate-900",
                    "border-slate-200 focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100"
                  )}
                />

                <button
                  type="button"
                  onClick={goGenerate}
                  disabled={name.trim().length < 2}
                  className={cn(
                    "mt-4 w-full rounded-2xl px-4 py-3 font-semibold transition",
                    name.trim().length < 2
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  )}
                >
                  Gerar plantas
                </button>

                <p className="mt-3 text-xs text-slate-500">
                  Leva poucos segundos. Sem enrolação.
                </p>
              </div>
            </>
          )}

          {step.type === "loading" && (
  <>
    <div className="relative overflow-hidden rounded-3xl border border-sky-100 bg-white p-5 shadow-sm sm:p-7">
      {/* glow animado */}
      <div className="pointer-events-none absolute -inset-24 opacity-70">
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200 blur-3xl animate-[pulseSoft_2.2s_ease-in-out_infinite]" />
        <div className="absolute left-[30%] top-[35%] h-[220px] w-[220px] rounded-full bg-sky-100 blur-3xl animate-[float_3.5s_ease-in-out_infinite]" />
      </div>

      {/* header */}
      <h1 className="relative text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        Criando seu plano personalizado…
      </h1>
      <p className="relative mt-2 text-sm text-slate-600">
        Separando os modelos 3D mais alinhados com seu objetivo{name.trim() ? `, ${name.trim()}` : ""}.
      </p>

      {/* loader + progresso */}
      <div className="relative mt-6">
        <div className="flex items-center gap-3">
          {/* spinner */}
          <div className="h-10 w-10 rounded-2xl border border-sky-200 bg-sky-50 grid place-items-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-sky-300 border-t-sky-600" />
          </div>

          <div className="flex-1">
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full rounded-full bg-sky-500 animate-[progress_5s_linear_1]" />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="animate-[fadeIn_600ms_ease_1]">Gerando recomendações</span>
              <span className="tabular-nums">{/* só visual */}0 → 100%</span>
            </div>
          </div>
        </div>

        {/* passos com “typing shimmer” */}
        <div className="mt-5 grid gap-2">
          {[
            "Lendo seu objetivo e prioridade…",
            "Selecionando plantas 3D compatíveis…",
            "Montando um caminho simples pra você…",
          ].map((txt, i) => (
            <div
              key={txt}
              className="relative overflow-hidden rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-700"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <span className="relative z-10">✓ {txt}</span>
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shine_1.6s_ease-in-out_infinite]" />
            </div>
          ))}
        </div>

        {/* dots animados */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            Ajustando detalhes
            <span className="inline-flex w-10 justify-start">
              <span className="animate-[dot_1.2s_infinite]">.</span>
              <span className="animate-[dot_1.2s_infinite] [animation-delay:200ms]">.</span>
              <span className="animate-[dot_1.2s_infinite] [animation-delay:400ms]">.</span>
            </span>
          </span>
        </div>
      </div>
    </div>

    <style jsx global>{`
      @keyframes progress {
        from { transform: translateX(-100%); }
        to { transform: translateX(0%); }
      }
      @keyframes shine {
        0% { transform: translateX(-120%); }
        60% { transform: translateX(120%); }
        100% { transform: translateX(120%); }
      }
      @keyframes float {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(10px, -12px); }
      }
      @keyframes pulseSoft {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .65; }
        50% { transform: translate(-50%, -50%) scale(1.08); opacity: .9; }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes dot {
        0%, 20% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
    `}</style>
  </>
)}

        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Kitnetes de • baixo custo 
        </p>
      </div>
    </div>
  );
}
