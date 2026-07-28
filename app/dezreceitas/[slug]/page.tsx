import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Clock3,
  Lightbulb,
  PackageCheck,
  Refrigerator,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { getRecipe, recipes } from "../recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) return {};

  return {
    title: `${recipe.name} | 10 receitas para vender`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipe(slug);

  if (!recipe) notFound();

  const currentIndex = recipes.findIndex((item) => item.slug === recipe.slug);
  const nextRecipe = recipes[(currentIndex + 1) % recipes.length];

  return (
    <main className="min-h-screen bg-[#fff9f5] pb-12 text-[#2d211d]">
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
          <Link
            href="/dezreceitas"
            aria-label="Voltar para todas as receitas"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/90 text-[#3b211a] shadow-lg backdrop-blur transition hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="rounded-full border border-white/60 bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-[#d55c3c] shadow-lg backdrop-blur">
            Receita {String(currentIndex + 1).padStart(2, "0")} de 10
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl bg-[#fff9f5] sm:my-6 sm:overflow-hidden sm:rounded-[36px] sm:shadow-[0_30px_90px_rgba(82,45,32,.12)]">
        <section className="relative h-[390px] overflow-hidden sm:h-[460px]">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            priority
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c1914] via-[#2c1914]/10 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
            <span className="inline-flex rounded-full bg-[#ff714b] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] shadow-lg">
              {recipe.category}
            </span>
            <h1 className="mt-3 max-w-xl text-4xl font-black leading-[.98] tracking-[-.055em] sm:text-5xl">{recipe.name}</h1>
            <p className="mt-3 max-w-lg text-sm font-medium leading-6 text-white/75 sm:text-base">{recipe.description}</p>
          </div>
        </section>

        <div className="px-4 sm:px-8">
          <section className="relative z-10 -mt-1 grid grid-cols-3 gap-2 rounded-[24px] border border-orange-100 bg-white p-3 shadow-[0_15px_45px_rgba(91,55,38,.09)]">
            <RecipeStat icon={<Clock3 className="h-4 w-4" />} label="Tempo" value={recipe.time} />
            <RecipeStat icon={<UsersRound className="h-4 w-4" />} label="Rende" value={recipe.yield} />
            <RecipeStat icon={<ChefHat className="h-4 w-4" />} label="Nível" value={recipe.difficulty} />
          </section>

          <section className="pt-9" aria-labelledby="ingredients-title">
            <SectionEyebrow>Separe tudo</SectionEyebrow>
            <h2 id="ingredients-title" className="mt-1 text-2xl font-black tracking-[-.04em]">Ingredientes</h2>

            <div className="mt-5 space-y-5">
              {recipe.ingredients.map((group) => (
                <div key={group.title} className="rounded-[24px] border border-orange-100 bg-white p-5">
                  <h3 className="text-sm font-black text-[#d55c3c]">{group.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-stone-600">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff8a67]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-10" aria-labelledby="preparation-title">
            <SectionEyebrow>Agora é com você</SectionEyebrow>
            <h2 id="preparation-title" className="mt-1 text-2xl font-black tracking-[-.04em]">Modo de preparo</h2>

            <ol className="mt-6 space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={step} className="flex gap-4 rounded-[24px] border border-orange-100 bg-white p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#3b211a] text-xs font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-sm font-semibold leading-6 text-stone-600">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 space-y-3">
            <InfoCard
              icon={<Lightbulb className="h-5 w-5" />}
              title="Segredo da receita"
              text={recipe.chefTip}
              tone="orange"
            />
            <InfoCard
              icon={<PackageCheck className="h-5 w-5" />}
              title="Dica para vender"
              text={recipe.sellingTip}
              tone="green"
            />
            <InfoCard
              icon={<Refrigerator className="h-5 w-5" />}
              title="Conservação"
              text={recipe.storage}
              tone="stone"
            />
          </section>

          <section className="my-10 overflow-hidden rounded-[28px] bg-[#3b211a] p-6 text-white sm:p-7">
            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-[#ff9b7a]">
              <Sparkles className="h-4 w-4" /> Próxima receita
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-.04em]">{nextRecipe.name}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-orange-50/65">{nextRecipe.description}</p>
            <Link
              href={`/dezreceitas/${nextRecipe.slug}`}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ff714b] px-5 text-xs font-black transition hover:bg-[#ff835f]"
            >
              VER PRÓXIMA RECEITA <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

function RecipeStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 text-center">
      <span className="mx-auto grid h-8 w-8 place-items-center rounded-xl bg-orange-50 text-[#e06040]">{icon}</span>
      <p className="mt-2 text-[9px] font-black uppercase tracking-[.14em] text-stone-400">{label}</p>
      <p className="mt-1 truncate text-[11px] font-black text-[#3b211a] sm:text-xs">{value}</p>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#d55c3c]">{children}</p>;
}

function InfoCard({
  icon,
  title,
  text,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: "orange" | "green" | "stone";
}) {
  const styles = {
    orange: "border-orange-200 bg-orange-50 text-[#d55c3c]",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    stone: "border-stone-200 bg-stone-100 text-stone-600",
  };

  return (
    <div className={`rounded-[24px] border p-5 ${styles[tone]}`}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/80">{icon}</span>
        <h2 className="text-sm font-black">{title}</h2>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-current/80">{text}</p>
    </div>
  );
}
