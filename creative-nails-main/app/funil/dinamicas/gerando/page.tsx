"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FunnelShell from "@/app/funil/FunnelShell";
import { readFunil } from "@/app/lib/funil/state";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Page() {
  const router = useRouter();

  const data = useMemo(() => readFunil(), []);
  const nome = data.nome ?? "você";
  const objetivo = data.objetivo ?? "fortalecer a igreja";

  const [progress, setProgress] = useState(10);

  const steps = useMemo(
    () => [
      `Entendendo seu objetivo: “${objetivo}”`,
      "Selecionando temas bíblicos ideais",
      "Montando perguntas e respostas",
      "Organizando em PDF (pronto para imprimir)",
      "Finalizando sua seleção personalizada",
    ],
    [objetivo]
  );

  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    // Proteção de etapas
    const d = readFunil();
    if (!d.igreja) return router.replace("/funil/dinamicas/igreja");
    if (!d.objetivo) return router.replace("/funil/dinamicas/objetivo");
    if (!d.nome) return router.replace("/funil/dinamicas/nome");

    // progresso animado (suave)
    const interval = window.setInterval(() => {
      setProgress((p) => {
        // acelera no começo e desacelera no fim
        const next = p + (p < 60 ? 6 : p < 85 ? 3 : 1);
        return clamp(next, 0, 96);
      });
    }, 220);

    // checklist animado
    const timeouts: number[] = [];
    steps.forEach((_, idx) => {
      timeouts.push(
        window.setTimeout(() => {
          setDoneCount((c) => Math.max(c, idx + 1));
        }, 550 + idx * 520)
      );
    });

    // terminar e ir pra oferta
    const go = window.setTimeout(() => {
      setProgress(100);
      router.push("/funil/dinamicas/oferta");
    }, 550 + steps.length * 520 + 650);

    return () => {
      clearInterval(interval);
      timeouts.forEach((t) => clearTimeout(t));
      clearTimeout(go);
    };
  }, [router, steps]);

  return (
    <FunnelShell
      progress={88}
      title={`Gerando suas dinâmicas, ${nome}…`}
      subtitle="Isso leva só alguns segundos"
    >
      <div className="space-y-4">
        {/* card principal */}
        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="flex items-center gap-3">
            {/* spinner */}
            <div className="h-8 w-8 rounded-full border-4 border-black/10 border-t-[#7C3AED] animate-spin" />
            <div className="flex-1">
              <div className="text-sm font-bold">Preparando sua seleção</div>
              <div className="mt-0.5 text-xs text-black/55">
                Personalizando para: <b>{objetivo}</b>
              </div>
            </div>
            <div className="text-xs font-bold text-black/60">{progress}%</div>
          </div>

          {/* barra */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-[#7C3AED] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* checklist */}
        <div className="rounded-2xl border border-black/10 bg-[#7C3AED]/5 p-4">
          <div className="text-sm font-semibold">O que estamos fazendo:</div>

          <div className="mt-3 space-y-2">
            {steps.map((label, idx) => {
              const done = idx < doneCount;
              return (
                <div
                  key={label}
                  className={[
                    "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
                    done
                      ? "border-[#7C3AED]/30 bg-white"
                      : "border-black/10 bg-white/60",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
                      done
                        ? "bg-[#7C3AED] text-white"
                        : "bg-black/10 text-black/40",
                    ].join(" ")}
                  >
                    {done ? "✓" : "…"}
                  </div>
                  <div className={done ? "text-black/80" : "text-black/55"}>
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* rodapé */}
        <div className="text-center text-xs text-black/45">
          Dica: dinâmicas prontas ajudam a manter a atenção e a participação do
          grupo.
        </div>
      </div>
    </FunnelShell>
  );
}
