"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { flowerVideos, type FlowerVideo } from "./videos";

const VIDEOS_PER_PAGE = 10;

function VideoCover({ video }: { video: FlowerVideo }) {
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(video.videoUrl)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { thumbnail_url?: string } | null) => {
        if (mounted && data?.thumbnail_url) setCover(data.thumbnail_url);
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, [video.videoUrl]);

  return (
    <div
      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
      style={cover ? { backgroundImage: `url(${cover})` } : undefined}
      aria-hidden="true"
    />
  );
}

export default function FlowerAppClient() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(flowerVideos.length / VIDEOS_PER_PAGE));
  const videos = flowerVideos.slice((page - 1) * VIDEOS_PER_PAGE, page * VIDEOS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[#fffafb] text-zinc-900">
      <div className="mx-auto min-h-screen max-w-2xl bg-white shadow-[0_0_60px_rgba(233,30,99,0.08)]">
        <header className="sticky top-0 z-10 border-b border-pink-100/80 bg-white/95 px-5 pb-4 pt-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-pink-50 ring-1 ring-pink-100">
              <Image src="/icon-flower/icon-flower.png" alt="Flower App" width={44} height={44} className="h-full w-full object-cover" priority />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Flower App</p>
              <p className="text-xs font-medium text-zinc-500">Inspirações para criar com amor</p>
            </div>
            <Heart className="ml-auto h-5 w-5 fill-[#E91E63] text-[#E91E63]" />
          </div>
        </header>

        <section className="px-5 pb-3 pt-6">
          <div className="rounded-[28px] bg-gradient-to-br from-[#fff0f6] via-[#fff7fa] to-white p-5 ring-1 ring-pink-100">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E91E63] text-white shadow-lg shadow-pink-200">
              <Sparkles className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Ideias que florescem</h1>
            <p className="mt-1 text-sm leading-6 text-zinc-600">Assista, salve suas favoritas e crie buquês inesquecíveis.</p>
          </div>
        </section>

        <section className="px-5 pb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold">Buquês</h2>
            <span className="text-xs font-medium text-zinc-400">{flowerVideos.length} vídeos</span>
          </div>

          {videos.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {videos.map((video) => (
                <Link key={video.id} href={`/flower-app/${video.id}`} className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-100">
                  <div className="relative aspect-[9/12] overflow-hidden" style={{ backgroundColor: video.accent }}>
                    <VideoCover video={video} />
                    <div className="absolute inset-0 bg-zinc-950/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,white,transparent_32%),linear-gradient(145deg,transparent_35%,rgba(233,30,99,.12))]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#E91E63] shadow-xl transition group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-3 rounded-full bg-zinc-950/70 px-2.5 py-1 text-[11px] font-semibold text-white">Vídeo</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{video.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-5 text-zinc-500">{video.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-pink-200 bg-pink-50/40 px-5 py-12 text-center">
              <p className="font-semibold">Em breve, novos buquês por aqui.</p>
              <p className="mt-1 text-sm text-zinc-500">Volte em breve para conferir as inspirações.</p>
            </div>
          )}

          <nav aria-label="Paginação dos vídeos" className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              aria-label="Página anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 text-[#E91E63] transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-24 text-center text-sm font-semibold text-zinc-600">Página {page} de {totalPages}</span>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              aria-label="Próxima página"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 text-[#E91E63] transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </section>
      </div>
    </main>
  );
}
