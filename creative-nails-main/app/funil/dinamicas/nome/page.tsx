"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FunnelShell from "@/app/funil/FunnelShell";
import { readFunil, writeFunil } from "@/app/lib/funil/state";


export default function Page() {
  const router = useRouter();
  const [nome, setNome] = useState("");

  useEffect(() => {
    const data = readFunil();
    if (!data.igreja) {
      router.replace("/funil/dinamicas/igreja");
      return;
    }
    if (!data.objetivo) {
      router.replace("/funil/dinamicas/objetivo");
      return;
    }
    if (data.nome) setNome(data.nome);
  }, [router]);

  const canContinue = useMemo(() => nome.trim().length >= 2, [nome]);

  function handleNext() {
    const n = nome.trim();
    if (n.length < 2) return;
    writeFunil({ nome: n });
    router.push("/funil/dinamicas/gerando");
  }

  return (
    <FunnelShell
      progress={70}
      title="Só mais uma coisinha"
      subtitle="Como posso te chamar?"
    >
      <div className="space-y-3">
        <label className="block text-sm font-semibold">Seu nome:</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Maria"
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-[#7C3AED]"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-1/3 rounded-xl border border-black/10 bg-white py-3 text-sm font-semibold hover:bg-black/[0.03]"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canContinue}
            className={[
              "w-2/3 rounded-xl py-3 text-sm font-bold text-white transition",
              canContinue ? "bg-[#7C3AED] hover:brightness-95" : "bg-black/20",
            ].join(" ")}
          >
            Gerar minhas dinâmicas
          </button>
        </div>
      </div>
    </FunnelShell>
  );
}
