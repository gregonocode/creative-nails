// app/quizz/casobia/steps/CasoBiaStepOferta.tsx
"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Clock,
  Users,
  Gamepad2,
  BadgePercent,
} from "lucide-react";
import type { PerfilInvestigadorData } from "./CasoBiaStepPerfil";

type CasoBiaStepOfertaProps = {
  perfilInvestigador: PerfilInvestigadorData | null;
  bonusDesbloqueado: boolean;
  onClickCheckout: () => void;
};

export function CasoBiaStepOferta({
  perfilInvestigador,
  bonusDesbloqueado,
  onClickCheckout,
}: CasoBiaStepOfertaProps) {
  const estiloLabel = perfilInvestigador?.estilo.label;
  const abordagemLabel = perfilInvestigador?.abordagem.label;

  return (
    <div className="flex flex-col gap-6">
      {/* Topo: urgência + prova social */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-red-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
              Você tem 48 horas para resolver o caso
            </span>
          </div>

          {bonusDesbloqueado && (
            <span className="rounded-full bg-red-600/20 border border-red-500/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
              +9 arquivos extras
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[12px] text-gray-300">
          <Users className="h-4 w-4 text-red-300" />
          <p>
            <span className="font-semibold text-red-200">
              + de 2.135 pessoas
            </span>{" "}
            já jogaram e montaram sua própria teoria sobre o Caso Bia Andrade.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-50">
          Transforme sua próxima noite em uma investigação cinematográfica
        </h2>

        {perfilInvestigador ? (
          <p className="text-sm md:text-base text-gray-300">
            Pelo jeito, você investiga como alguém{" "}
            <span className="font-semibold text-red-300">
              {estiloLabel?.toLowerCase()}
            </span>{" "}
            e presta atenção principalmente em{" "}
            <span className="font-semibold text-red-300">
              {abordagemLabel?.toLowerCase()}
            </span>
            . O{" "}
            <span className="font-semibold text-gray-100">
              Dossiê do Caso Bia Andrade
            </span>{" "}
            foi montado exatamente pra esse tipo de mente curiosa.
          </p>
        ) : (
          <p className="text-sm md:text-base text-gray-300">
            Se você chegou até aqui, é porque não suporta deixar um mistério
            em aberto. O{" "}
            <span className="font-semibold text-gray-100">
              Dossiê do Caso Bia Andrade
            </span>{" "}
            foi montado pra pessoas como você, que gostam de conectar pistas e
            montar a própria teoria.
          </p>
        )}
      </div>

      {/* Imagem do kit */}
      <div className="relative w-full h-44 md:h-56 overflow-hidden rounded-xl border border-red-900/60 bg-black/40">
        <Image
          src="/casobia/mockup-kit.png"
          alt="Kit em PDF do Dossiê do Caso Bia Andrade"
          fill
          className="object-contain md:object-cover"
          priority
        />
      </div>

      {/* Bloco: o que vem no pack */}
      <div className="space-y-3 text-sm md:text-base text-gray-200">
        <h3 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-50">
          <CheckCircle2 className="h-5 w-5 text-red-300" />
          O que vem no seu pack de investigação
        </h3>

        <p>
          Você libera um{" "}
          <span className="font-semibold">kit com 24 arquivos em PDF</span>{" "}
          para imprimir e jogar, como se estivesse abrindo uma pasta de caso
          real:
        </p>

        <ul className="space-y-2 text-sm md:text-[15px]">
          <li className="flex gap-2">
            <CheckCircle2 className="mt-[1px] h-4 w-4 flex-shrink-0 text-red-400" />
            <span>
              <span className="font-semibold">Relatórios de perícia</span> e
              laudo preliminar da cena do crime.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-[1px] h-4 w-4 flex-shrink-0 text-red-400" />
            <span>
              <span className="font-semibold">Transcrição de ligação</span>{" "}
              crucial envolvendo o caso.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-[1px] h-4 w-4 flex-shrink-0 text-red-400" />
            <span>
              <span className="font-semibold">E-mails e mensagens de celular</span>{" "}
              que revelam segredos, ciúmes e possíveis traições.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-[1px] h-4 w-4 flex-shrink-0 text-red-400" />
            <span>
              <span className="font-semibold">Depoimentos oficiais</span> dos
              seis principais suspeitos do Caso Bia Andrade.
            </span>
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-[1px] h-4 w-4 flex-shrink-0 text-red-400" />
            <span>
              <span className="font-semibold">Bilhete ameaçador, agenda</span>,{" "}
              anotações misteriosas e relatório final inconclusivo da polícia.
            </span>
          </li>
        </ul>

        {bonusDesbloqueado && (
          <p className="text-sm text-red-300">
            Os <span className="font-semibold">9 arquivos extras</span> foram
            liberados porque você avançou até a pista secreta da raspadinha.
            Essa versão do dossiê é exclusiva pra quem desbloqueia o bônus.
          </p>
        )}
      </div>

      {/* Como funciona pra jogar */}
      <div className="space-y-3 text-sm md:text-base text-gray-200">
        <h3 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-50">
          <Gamepad2 className="h-5 w-5 text-red-300" />
          Como funciona na prática (modo gamer)
        </h3>

        <ol className="space-y-2 text-sm md:text-[15px] list-decimal list-inside">
          <li>
            <span className="font-semibold">Baixe os arquivos em PDF</span> e
            imprima os documentos principais.
          </li>
          <li>
            <span className="font-semibold">Espalhe as páginas na mesa</span>{" "}
            como se fosse uma sala de investigação: fichas, laudos, bilhetes,
            prints…
          </li>
          <li>
            <span className="font-semibold">
              Chame seu crush, amigos ou grupo
            </span>{" "}
            e deixem cada um criar sua teoria sobre quem matou Bia, o motivo e
            o que está sendo encoberto.
          </li>
          <li>
            No último arquivo tem um QR Code. Ao apontar a câmera, vocês vão
            descobrir quem é o{" "}
            <span className="font-semibold">verdadeiro culpado(a)</span>.
          </li>
        </ol>

        <p className="text-sm text-gray-300">
          É como jogar um{" "}
          <span className="font-semibold">true crime de mesa</span>: debate,
          teoria maluca, pista que todo mundo ignorou e aquela sensação de
          “vamos jogar de novo com outra galera”.
        </p>
      </div>

      {/* Bloco "Perfeito para" */}
      <div className="space-y-3 text-sm md:text-base text-gray-200">
        <h3 className="text-lg md:text-xl font-semibold text-gray-50">
          Perfeito para
        </h3>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-red-700/70 bg-red-900/40 px-3 py-1 text-xs font-medium text-red-100 flex items-center gap-1">
            
            Noites em casal
          </span>
          <span className="rounded-full border border-red-700/70 bg-red-900/40 px-3 py-1 text-xs font-medium text-red-100 flex items-center gap-1">
            
            Jogar com amigos
          </span>
          <span className="rounded-full border border-red-700/70 bg-red-900/40 px-3 py-1 text-xs font-medium text-red-100 flex items-center gap-1">
            
            Fãs de true crime
          </span>
          <span className="rounded-full border border-red-700/70 bg-red-900/40 px-3 py-1 text-xs font-medium text-red-100 flex items-center gap-1">
            
            Noites de jogos temáticas
          </span>
        </div>
      </div>

      {/* Bloco de preço + oferta Black Friday */}
      <div className="mt-2 space-y-4">
        {/* Imagem de oferta acima do botão */}
        <div className="relative w-full h-32 md:h-40 overflow-hidden rounded-xl border border-red-900/60 bg-black/40">
          <Image
            src="/casobia/ofertacasobia.webp"
            alt="Oferta especial do Caso Bia Andrade"
            fill
            className="object-contain md:object-cover"
          />
        </div>

        <div className="space-y-2 text-center text-sm md:text-base text-gray-200">
          <div className="flex items-center justify-center gap-2">
            <BadgePercent className="h-4 w-4 text-red-300" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
              Oferta da semana • Black Friday
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-gray-400 line-through">
              R$ 57,90
            </span>
            <span className="text-2xl font-extrabold text-red-300">
              R$ 19,90
            </span>
          </div>

          <p className="text-[12px] text-gray-400">
            Pagamento único, acesso imediato ao dossiê completo em PDF.
          </p>
        </div>

        {/* CTA principal */}
        <a
        href="https://pay.cakto.com.br/3322n5r_684356"
        target="_blank"
        rel="noopener noreferrer"
        className="shine-button w-full rounded-full border border-red-800/70 bg-red-600/90 px-4 py-3 text-sm md:text-base font-medium text-white transition hover:bg-red-500 hover:border-red-500 active:scale-[0.98] block text-center"
      >
        Quero Essa Oferta + Bônus extras
      </a>

        <p className="text-[11px] text-center text-gray-500">
          Este é um jogo narrativo de investigação em PDF, para impressão e
          uso doméstico. Todos os personagens e eventos são fictícios.
        </p>
      </div>
    </div>
  );
}
