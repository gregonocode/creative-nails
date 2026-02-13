"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FunnelShell from "@/app/funil/FunnelShell";
import { readFunil, writeFunil, type IgrejaOption } from "@/app/lib/funil/state";

const IGREJAS: IgrejaOption[] = [
  "Assembleia de Deus",
  "Congregação Cristã",
  "Igreja Universal",
  "Igreja do Evangelho Quadrangular",
  "Igreja Adventista",
  "Convenção Batista",
  "Outras",
];

export default function Page() {
  const router = useRouter();

  const [selected, setSelected] = useState<IgrejaOption | null>(null);
  const [isGoingNext, setIsGoingNext] = useState(false);

  // evita múltiplos pushes se clicar rápido
  const lockRef = useRef(false);

  useEffect(() => {
    const data = readFunil();
    if (data.igreja) setSelected(data.igreja);
  }, []);

  function handlePick(opt: IgrejaOption) {
    if (lockRef.current) return;

    setSelected(opt);
    writeFunil({ igreja: opt });

    lockRef.current = true;
    setIsGoingNext(true);

    // pequeno delay pra dar sensação de seleção
    window.setTimeout(() => {
      router.push("/funil/dinamicas/objetivo");
    }, 300);
  }

  return (
    <FunnelShell
      progress={20}
      title="Vamos personalizar suas dinâmicas"
      subtitle="Primeiro, qual é a sua igreja?"
    >
      <div className="space-y-3">
        <div className="text-sm font-semibold">Escolha uma opção: Qual e a sua Igreja ?</div>

        <div className="grid grid-cols-1 gap-2">
          {IGREJAS.map((opt) => {
            const active = selected === opt;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handlePick(opt)}
                disabled={isGoingNext}
                className={[
                  "rounded-xl border p-3 text-left text-sm transition",
                  isGoingNext ? "opacity-80" : "",
                  active
                    ? "border-[#7C3AED] bg-[#7C3AED]/10"
                    : "border-black/10 bg-white hover:bg-black/[0.03]",
                ].join(" ")}
              >
                <div className="font-semibold">{opt}</div>
                <div className="mt-1 text-xs text-black/55">
                  {opt === "Outras"
                    ? "Sem problema — funciona para qualquer igreja."
                    : "Personalização para linguagem e estilo do seu público."}
                </div>
              </button>
            );
          })}
        </div>

        {isGoingNext ? (
          <div className="pt-2 text-center text-xs text-black/50">
            Indo para o próximo passo…
          </div>
        ) : null}
      </div>
    </FunnelShell>
  );
}
