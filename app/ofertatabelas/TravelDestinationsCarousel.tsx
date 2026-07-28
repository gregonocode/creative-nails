import Image from "next/image";
import { MapPin } from "lucide-react";

const destinations = [
  { name: "Fernando de Noronha", location: "Pernambuco, Brasil", image: "/viagem/fernando_noronha.webp" },
  { name: "Lençóis Maranhenses", location: "Maranhão, Brasil", image: "/viagem/lencoes_maranhences.webp" },
  { name: "Santiago e Atacama", location: "Chile", image: "/viagem/chile_santiago.webp" },
  { name: "Buenos Aires", location: "Argentina", image: "/viagem/boenos_aires.webp" },
  { name: "Gramado", location: "Rio Grande do Sul, Brasil", image: "/viagem/gramado.webp" },
  { name: "Porto de Galinhas", location: "Pernambuco, Brasil", image: "/viagem/porto_de_galinhas.webp" },
  { name: "Rio de Janeiro", location: "Rio de Janeiro, Brasil", image: "/viagem/rio_janeiro.webp" },
  { name: "Jalapão", location: "Tocantins, Brasil", image: "/viagem/jalapão.webp" },
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
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              sizes="(max-width: 639px) 180px, (max-width: 767px) 220px, 250px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

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
