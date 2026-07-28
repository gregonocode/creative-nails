import { ImageIcon, MapPin } from "lucide-react";

const destinations = [
  { name: "Fernando de Noronha", location: "Pernambuco, Brasil" },
  { name: "Lençóis Maranhenses", location: "Maranhão, Brasil" },
  { name: "Santiago e Atacama", location: "Chile" },
  { name: "Buenos Aires", location: "Argentina" },
  { name: "Gramado", location: "Rio Grande do Sul, Brasil" },
  { name: "Porto de Galinhas", location: "Pernambuco, Brasil" },
  { name: "Rio de Janeiro", location: "Rio de Janeiro, Brasil" },
  { name: "Jalapão", location: "Tocantins, Brasil" },
];

export default function TravelDestinationsCarousel() {
  const carouselItems = [...destinations, ...destinations];

  return (
    <div className="relative mt-10 overflow-hidden" aria-label="Ideias de destinos para sua próxima viagem">
      <div
        className="flex w-max gap-4 animate-auto-carousel will-change-transform motion-reduce:[animation-play-state:paused]"
        style={{ animationDuration: "32s" }}
      >
        {carouselItems.map((destination, index) => (
          <article
            key={`${destination.name}-${index}`}
            aria-hidden={index >= destinations.length}
            className="group relative aspect-[4/5] w-[180px] shrink-0 overflow-hidden rounded-[24px] border border-emerald-100 bg-[#eefaf4] shadow-[0_18px_50px_rgba(8,80,55,.10)] sm:w-[220px] md:w-[250px]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-20 text-emerald-300">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-100 bg-white/80">
                <ImageIcon className="h-6 w-6" />
              </span>
              <span className="mt-3 text-[10px] font-black uppercase tracking-[.16em] text-emerald-500/60">Imagem em breve</span>
            </div>

            <div className="absolute inset-x-3 bottom-3 rounded-[18px] border border-white bg-white/95 p-4 shadow-lg backdrop-blur-sm">
              <p className="text-sm font-black leading-5 tracking-[-.02em] text-slate-900 sm:text-base">{destination.name}</p>
              <p className="mt-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.08em] text-slate-400">
                <MapPin className="h-3 w-3 text-emerald-500" /> {destination.location}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
