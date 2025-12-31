'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

type RateOption = { label: string; value: number };

type StepAudioProps = {
  src: string;
  onNext: () => void;
};

const MIN_SECONDS = 75; // 1 min e 15s

export default function StepAudio({ src, onNext }: StepAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [canContinue, setCanContinue] = useState(false);

  const rates: RateOption[] = useMemo(
    () => [
      { label: '1x', value: 1 },
      { label: '1.15x', value: 1.15 },
      { label: '1.25x', value: 1.25 },
    ],
    []
  );

  const [rate, setRate] = useState<RateOption>(rates[1]);

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

      // se o áudio for menor que 75s, libera ao carregar (quando terminar)
      if (d > 0 && d <= MIN_SECONDS) {
        setCanContinue(false);
      }
    };

    const onCanPlay = () => setReady(true);

    const onTime = () => {
      const t = el.currentTime || 0;
      setCurrent(t);

      setCanContinue((prev) => {
        if (prev) return true;
        if (t >= MIN_SECONDS) return true;
        if (duration > 0 && t >= duration) return true; // caso o áudio termine antes
        return false;
      });
    };

    const onEnded = () => {
      setPlaying(false);
      setCanContinue(true); // se terminou, libera
    };

    const onError = () => {
      setReady(false);
      setPlaying(false);
      setErrorMsg('Não consegui carregar o áudio. Verifique se /intro.mp3 abre no navegador.');
    };

    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('canplay', onCanPlay);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);

    return () => {
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('canplay', onCanPlay);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
    };
  }, [duration]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = rate.value;
  }, [rate]);

  async function togglePlay(): Promise<void> {
    const el = audioRef.current;
    if (!el) return;

    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }

    try {
      await el.play();
      setPlaying(true);
      setErrorMsg(null);
    } catch {
      setErrorMsg('Seu navegador bloqueou a reprodução. Tente clicar novamente no play.');
    }
  }

  function seek(value: number): void {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = value;
    setCurrent(value);
  }

  function cycleRate(): void {
    const idx = rates.findIndex((r) => r.value === rate.value);
    const next = rates[(idx + 1) % rates.length];
    setRate(next);
  }

  return (
    <div className="space-y-4">
      <div className="ml-auto max-w-[92%] rounded-2xl bg-[#D3FCAE] px-4 py-3 text-[#062b16] shadow-sm">
        <div className="text-sm font-semibold">Antes de começar…</div>
        <div className="text-sm opacity-90">
          Ouça esse áudio rapidinho. Ele vai deixar sua tabela mais certeira 😉
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <audio ref={audioRef} src={src} preload="metadata" />

        {errorMsg && (
          <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void togglePlay()}
            className="h-12 w-12 rounded-full bg-[#0FDB6B] text-[#062b16] text-lg font-bold"
            aria-label={playing ? 'Pausar' : 'Reproduzir'}
          >
            {playing ? '❚❚' : '▶'}
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-black/60">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              type="range"
              min={0}
              max={Math.max(1, duration)}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              className="mt-2 w-full accent-[#0FDB6B]"
              aria-label="Progresso do áudio"
              disabled={!ready}
            />
          </div>

          <button
            type="button"
            onClick={cycleRate}
            className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-black/70 hover:bg-black/5"
            aria-label="Alterar velocidade"
          >
            {rate.label}
          </button>
        </div>

        <div className="mt-3 text-xs text-black/45">
          Ouve esse áudio rapidinho.
          {!canContinue && (
            <>
              {' '}
              <span className="font-semibold">
                Liberando em {formatTime(timeLeft)}…
              </span>
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
          <span className="font-semibold">1:15</span> do áudio.
        </div>
      )}
    </div>
  );
}
