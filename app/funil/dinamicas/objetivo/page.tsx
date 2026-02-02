"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FunnelShell from "@/app/funil/FunnelShell";
import { readFunil, writeFunil, type ObjetivoOption } from "@/app/lib/funil/state";

const OBJETIVOS: Array<{ label: ObjetivoOption; emoji: string; desc: string }> =
  [
    {
      label: "Deixar o culto mais divertido",
      emoji: "😄",
      desc: "Mais leve, participativo e animado.",
    },
    {
      label: "Trazer jovens para a igreja",
      emoji: "🎉",
      desc: "Conecta melhor com a galera jovem.",
    },
    {
      label: "Unir mais a igreja",
      emoji: "🤝",
      desc: "Fortalece comunhão e relacionamento.",
    },
    {
      label: "Quebrar o gelo em grupos/células",
      emoji: "🧊",
      desc: "Ideal para grupos pequenos e visitantes.",
    },
    {
      label: "Ajudar a memorizar a Bíblia",
      emoji: "📖",
      desc: "Aprendizado com perguntas e respostas.",
    },
    {
      label: "Integrar visitantes",
      emoji: "👋",
      desc: "Cria conexão logo nos primeiros minutos.",
    },
    {
      label: "Fortalecer comunhão entre equipes",
      emoji: "🙌",
      desc: "Perfeito para ministérios e voluntários.",
    },
  ];

export default function Page() {
  const router = useRouter();

  const [selected, setSelected] = useState<ObjetivoOption | null>(null);
  const [isGoingNext, setIsGoingNext] = useState(false);

  // evita múltiplos pushes se clicar rápido
  const lockRef = useRef(false);

  useEffect(() => {
    const data = readFunil();

    // proteção de etapa
    if (!data.igreja) {
      router.replace("/funil/dinamicas/igreja");
      return;
    }

    if (data.objetivo) setSelected(data.objetivo);
  }, [router]);

  function handlePick(opt: ObjetivoOption) {
    if (lockRef.current) return;

    setSelected(opt);
    writeFunil({ objetivo: opt });

    lockRef.current = true;
    setIsGoingNext(true);

    window.setTimeout(() => {
      router.push("/funil/dinamicas/nome");
    }, 300);
  }

  return (
    <FunnelShell
      progress={45}
      title="Qual é o seu objetivo?"
      subtitle="Clique em 1 opção para continuar"
    >
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-2">
          {OBJETIVOS.map((opt) => {
            const active = selected === opt.label;

            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => handlePick(opt.label)}
                disabled={isGoingNext}
                className={[
                  "rounded-xl border p-3 text-left text-sm transition",
                  isGoingNext ? "opacity-80" : "",
                  active
                    ? "border-[#7C3AED] bg-[#7C3AED]/10"
                    : "border-black/10 bg-white hover:bg-black/[0.03]",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <div className="text-lg leading-none">{opt.emoji}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{opt.label}</div>
                    <div className="mt-1 text-xs text-black/55">{opt.desc}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {isGoingNext ? (
          <div className="pt-2 text-center text-xs text-black/50">
            Indo para o próximo passo…
          </div>
        ) : (
          <div className="pt-2 text-center text-xs text-black/45">
            Dica: escolhas rápidas aumentam a conclusão do funil.
          </div>
        )}
      </div>
    </FunnelShell>
  );
}
