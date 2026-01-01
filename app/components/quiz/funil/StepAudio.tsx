'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

type StepAudioProps = {
  src: string;
  onNext: () => void;
};

const MIN_SECONDS = 75; // 1 min e 15s

export default function StepAudio({ src, onNext }: StepAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [canContinue, setCanContinue] = useState(false);

  const timeLeft = useMemo(() => {
    const remaining = Math.ceil(MIN_SECONDS - current);
    return Math.max(0, remaining);
  }, [current]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onLoaded = () => {
      const d = Number.isFinite(el.duration) ? el.duration : 0;
      setDuration(d);
      setReady(true);
      setErrorMsg(null);
      setCanContinue(false);
    };

    const onTime = () => {
      const t = el.currentTime || 0;
      setCurrent(t);

      setCanContinue((prev) => {
        if (prev) return true;
        if (t >= MIN_SECONDS) return true;
        if (duration > 0 && t >= duration) return true; // se o áudio acabar antes
        return false;
      });
    };

    const onEnded = () => setCanContinue(true);

    const onError = () => {
      setReady(false);
      setErrorMsg('Não consegui carregar o áudio. Verifique se /intro.mp3 abre no navegador.');
    };

    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);

    return () => {
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
    };
  }, [duration]);

  return (
    <div className="space-y-4">
      <div className="ml-auto max-w-[92%] rounded-2xl bg-[#D3FCAE] px-4 py-3 text-[#062b16] shadow-sm">
        <div className="text-sm font-semibold">Antes de começar…</div>
        <div className="text-sm opacity-90">
          Ouça esse áudio rapidinho. Ele vai deixar sua tabela mais certeira 😉
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-4">
        {errorMsg && (
          <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Player nativo */}
<div className="rounded-2xl border border-black/10 bg-black/5 p-3">
  <div className="audio-native">
    <audio
      ref={audioRef}
      src={src}
      controls
      preload="metadata"
      className="w-full"
    />
  </div>
</div>

        <div className="mt-3 text-xs text-black/45">
          {!ready ? (
            'Carregando áudio…'
          ) : (
            <>
              Progresso: <span className="font-semibold">{formatTime(current)}</span> de{' '}
              <span className="font-semibold">{formatTime(duration)}</span>.
            </>
          )}

          {!canContinue && (
            <>
              {' '}
              <span className="font-semibold">Liberando em {formatTime(timeLeft)}…</span>
            </>
          )}
        </div>

        
      </div>

      {canContinue ? (
        <button
          type="button"
          onClick={onNext}
          className="shine-button w-full rounded-2xl bg-[#0FDB6B] py-3 font-semibold text-[#062b16]"
        >
          Continuar
        </button>
      ) : (
        <div className="text-center text-xs text-black/50">
          O botão <span className="font-semibold">Continuar</span> aparece após{' '}
          <span className="font-semibold">ouvir</span> áudio.
        </div>
      )}
    </div>
  );
}
