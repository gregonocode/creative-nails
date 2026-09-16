import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Play } from "lucide-react";
import { notFound } from "next/navigation";
import { getFlowerVideo } from "../videos";

export default async function FlowerVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = getFlowerVideo(id);

  if (!video) notFound();

  return (
    <main className="min-h-screen bg-[#fffafb] text-zinc-900">
      <div className="mx-auto min-h-screen max-w-2xl bg-white shadow-[0_0_60px_rgba(233,30,99,0.08)]">
        <header className="flex items-center gap-3 border-b border-pink-100 px-5 py-4">
          <Link href="/flower-app" aria-label="Voltar para os vídeos" className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-[#E91E63] transition hover:bg-pink-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex h-9 w-9 overflow-hidden rounded-xl bg-pink-50">
            <Image src="/icon-flower/icon-flower.png" alt="Flower App" width={36} height={36} className="object-cover" />
          </div>
          <p className="font-bold">Flower App</p>
          <Heart className="ml-auto h-5 w-5 fill-[#E91E63] text-[#E91E63]" />
        </header>

        <article className="px-5 py-6">
          <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#E91E63]"><Play className="h-3.5 w-3.5 fill-current" /> Vídeo</div>
          <h1 className="text-2xl font-bold tracking-tight">{video.title}</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{video.description}</p>

          <div className="mt-6 aspect-[9/16] w-full overflow-hidden rounded-[28px] bg-zinc-950 shadow-xl shadow-pink-100">
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="h-full w-full border-0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </article>
      </div>
    </main>
  );
}
