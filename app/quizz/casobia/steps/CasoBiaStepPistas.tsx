// app/quizz/casobia/steps/CasoBiaStepPistas.tsx
"use client";

import Image from "next/image";

type CasoBiaStepPistasProps = {
  onContinue: () => void;
};

export function CasoBiaStepPistas({ onContinue }: CasoBiaStepPistasProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[11px] tracking-[0.25em] uppercase text-red-400/80">
          O que você vai receber
        </span>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-50">
          Seu dossiê de investigação em PDF
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          Você vai receber um kit com{" "}
          <span className="font-semibold text-red-400">
            15 arquivos oficiais
          </span>{" "}
          do Caso Bia Andrade, prontos para imprimir, espalhar na mesa e
          investigar com amigos ou com seu crush.
        </p>
      </div>

      {/* Imagem do mockup / kit */}
      <div className="relative w-full h-44 md:h-52 overflow-hidden rounded-xl border border-red-900/60 bg-black/40">
        <Image
          src="/casobia/mockup-kit.png"
          alt="Prévia do dossiê de investigação do Caso Bia Andrade"
          fill
          className="object-contain md:object-cover"
          priority
        />
      </div>

      {/* Lista do que está incluído */}
      <div className="space-y-3 text-sm md:text-base text-gray-200">
        <p className="font-medium text-gray-100">
          Dentro desse dossiê você encontra, por exemplo:
        </p>

        <ul className="space-y-2 text-sm md:text-[15px]">
          <li className="flex gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>
              <span className="font-semibold">Relatórios oficiais</span> da
              perícia e laudo preliminar da cena do crime.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>
              <span className="font-semibold">Transcrição de ligações</span>{" "}
              importantes envolvendo a vítima.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>
              <span className="font-semibold">E-mails e mensagens de celular</span>{" "}
              que revelam segredos, ciúmes e possíveis traições.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>
              <span className="font-semibold">Depoimentos oficiais</span> dos
              seis principais suspeitos do caso.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>
              <span className="font-semibold">Bilhete ameaçador, agenda</span> da
              vítima e outros detalhes para montar sua própria teoria.
            </span>
          </li>
        </ul>

        <p className="text-sm text-gray-300">
          Tudo organizado como se fosse um{" "}
          <span className="font-semibold">dossiê real de investigação</span>,
          ideal para uma noite de mistério em casal ou em grupo.
        </p>
      </div>

      {/* Botões para continuar */}
      <div className="mt-2 flex flex-col gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="shine-button w-full rounded-full border border-red-800/70 bg-red-600/90 px-4 py-3 text-sm md:text-base font-medium text-white transition hover:bg-red-500 hover:border-red-500 active:scale-[0.98]"
        >
          Quero receber mais arquivos
        </button>

        <button
          type="button"
          onClick={onContinue}
          className=" w-full rounded-full border border-red-900/70 bg-black/60 px-4 py-3 text-sm md:text-base font-medium text-gray-100 transition hover:border-red-500 hover:bg-red-900/30 active:scale-[0.98]"
        >
          Estou pronto(a), me mande mais
        </button>
      </div>

      <p className="text-[11px] text-center text-gray-500">
        Na próxima etapa, você poderá desbloquear ainda mais documentos sobre o
        Caso Bia Andrade.
      </p>
    </div>
  );
}
