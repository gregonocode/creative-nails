import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChefHat, Clock3, Sparkles } from "lucide-react";
import PwaInstallPrompt from "../components/pwa/PwaInstallPrompt";
import { recipes } from "./recipes";

export const metadata: Metadata = {
  title: "10 receitas para vender",
  description: "Receitas doces explicadas passo a passo para você preparar e vender.",
};

export default function TenRecipesPage() {
  return (
    <main className="min-h-screen bg-[#fff9f5] pb-28 text-[#2d211d]">
      <header className="sticky top-0 z-40 border-b border-orange-100/80 bg-[#fff9f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#ff6b45] text-white shadow-[0_8px_24px_rgba(255,107,69,.25)]">
              <ChefHat className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#cf5a3b]">Meu caderno</p>
              <p className="text-sm font-black tracking-[-.02em]">Receitas que vendem</p>
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#cf5a3b] shadow-sm">
            10 receitas
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4">
        <section className="relative mt-5 overflow-hidden rounded-[30px] bg-[#3b211a] p-6 text-white shadow-[0_24px_70px_rgba(82,45,32,.18)] sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#ff8d68]/25 blur-3xl" />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-orange-100">
            <Sparkles className="h-3.5 w-3.5" /> Faça, venda e conquiste
          </span>
          <h1 className="relative mt-5 max-w-md text-3xl font-black leading-[1.05] tracking-[-.05em] sm:text-5xl">
            Doces irresistíveis, explicados sem complicação.
          </h1>
          <p className="relative mt-4 max-w-lg text-sm font-medium leading-6 text-orange-50/75 sm:text-base">
            Escolha uma receita e acompanhe ingredientes, preparo, rendimento e dicas para começar a produzir.
          </p>
          <div className="relative mt-6 flex gap-3">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-xs font-bold">
              <BookOpen className="h-4 w-4 text-[#ff9b7a]" /> Passo a passo
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-xs font-bold">
              <Clock3 className="h-4 w-4 text-[#ff9b7a]" /> Tempo e rendimento
            </span>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="recipe-list-title">
          <div className="flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d36345]">Seu cardápio</p>
              <h2 id="recipe-list-title" className="mt-1 text-2xl font-black tracking-[-.04em]">
                Escolha uma receita
              </h2>
            </div>
            <p className="text-xs font-bold text-stone-400">Toque para abrir</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {recipes.map((recipe, index) => (
              <Link
                key={recipe.slug}
                href={`/dezreceitas/${recipe.slug}`}
                className="group flex min-h-[118px] overflow-hidden rounded-[24px] border border-orange-100 bg-white p-2 shadow-[0_12px_35px_rgba(91,55,38,.06)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_45px_rgba(91,55,38,.10)]"
              >
                <div className="relative w-[104px] shrink-0 overflow-hidden rounded-[18px]">
                  <Image
                    src={recipe.image}
                    alt=""
                    fill
                    sizes="104px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 grid h-7 min-w-7 place-items-center rounded-full bg-white/90 px-1.5 text-[10px] font-black text-[#d55c3c] backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col px-3 py-2">
                  <span className="text-[9px] font-black uppercase tracking-[.16em] text-[#e06d4d]">{recipe.category}</span>
                  <h3 className="mt-1 text-base font-black leading-5 tracking-[-.025em]">{recipe.shortName}</h3>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-400">
                      <Clock3 className="h-3 w-3" /> {recipe.time}
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-50 text-[#e06040] transition group-hover:bg-[#ff6b45] group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl" aria-label="Navegação principal">
        <div className="mx-auto flex min-h-16 max-w-2xl items-center justify-around px-5">
          <span className="flex flex-col items-center gap-1 text-[#e06040]">
            <BookOpen className="h-5 w-5" />
            <span className="text-[10px] font-black">Receitas</span>
          </span>
          <span className="flex flex-col items-center gap-1 text-stone-300">
            <ChefHat className="h-5 w-5" />
            <span className="text-[10px] font-bold">Cozinhar</span>
          </span>
          <span className="flex flex-col items-center gap-1 text-stone-300">
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-bold">Dicas</span>
          </span>
        </div>
      </nav>

      <PwaInstallPrompt />
    </main>
  );
}
