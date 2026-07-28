import { ChefHat, ImageIcon } from "lucide-react";

const recipes = [
  "Brownie recheado",
  "Bolo no pote",
  "Brigadeiro gourmet",
  "Trufas de chocolate",
  "Geladinho gourmet",
  "Pudim caseiro",
  "Palha italiana",
  "Cookies recheados",
  "Torta no pote",
  "Pão de mel",
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
            key={`${recipe}-${index}`}
            aria-hidden={index >= recipes.length}
            className="relative aspect-square w-[180px] shrink-0 overflow-hidden rounded-[24px] border border-emerald-100 bg-[#f4fff9] shadow-[0_18px_50px_rgba(8,80,55,.09)] sm:w-[220px] md:w-[240px]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-14 text-emerald-300">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-100 bg-white/80">
                <ImageIcon className="h-6 w-6" />
              </span>
              <span className="mt-3 text-[10px] font-black uppercase tracking-[.16em] text-emerald-500/60">Foto em breve</span>
            </div>

            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[18px] border border-white bg-white/95 p-3.5 shadow-lg backdrop-blur-sm">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <ChefHat className="h-4 w-4" />
              </span>
              <p className="text-sm font-black leading-5 tracking-[-.02em] text-slate-900">{recipe}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
