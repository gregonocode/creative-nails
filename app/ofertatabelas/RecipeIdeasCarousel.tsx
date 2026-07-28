import Image from "next/image";
import { ChefHat } from "lucide-react";

const recipes = [
  { name: "Brownie recheado", image: "/receitas/brownie.webp" },
  { name: "Bolo no pote", image: "/receitas/bolo_no_pote.webp" },
  { name: "Brigadeiro gourmet", image: "/receitas/brigadeiro_gurmet.webp" },
  { name: "Trufas de chocolate", image: "/receitas/trufas.webp" },
  { name: "Geladinho gourmet", image: "/receitas/geladinho.webp" },
  { name: "Pudim caseiro", image: "/receitas/pudin.webp" },
  { name: "Palha italiana", image: "/receitas/palha_italiana.webp" },
  { name: "Cookies recheados", image: "/receitas/cookies.webp" },
  { name: "Torta no pote", image: "/receitas/torta_no_pote.webp" },
  { name: "Pão de mel", image: "/receitas/pao_de_mel.webp" },
];

export default function RecipeIdeasCarousel() {
  const carouselItems = [...recipes, ...recipes];

  return (
    <div className="relative mt-10 overflow-hidden" aria-label="Ideias de receitas para vender">
      <div
        className="flex w-max gap-4 animate-auto-carousel will-change-transform motion-reduce:[animation-play-state:paused]"
        style={{ animationDuration: "34s" }}
      >
        {carouselItems.map((recipe, index) => (
          <article
            key={`${recipe.name}-${index}`}
            aria-hidden={index >= recipes.length}
            className="group relative aspect-square w-[180px] shrink-0 overflow-hidden rounded-[24px] border border-emerald-100 bg-[#f4fff9] shadow-[0_18px_50px_rgba(8,80,55,.09)] sm:w-[220px] md:w-[240px]"
          >
            <Image
              src={recipe.image}
              alt={recipe.name}
              fill
              sizes="(max-width: 639px) 180px, (max-width: 767px) 220px, 240px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[18px] border border-white bg-white/95 p-3.5 shadow-lg backdrop-blur-sm">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <ChefHat className="h-4 w-4" />
              </span>
              <p className="text-sm font-black leading-5 tracking-[-.02em] text-slate-900">{recipe.name}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
