"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Clipboard, Download, PlusSquare, Share2, Sparkles, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type Platform = {
  isAndroid: boolean;
  isIos: boolean;
  isMobile: boolean;
  isSafari: boolean;
};

const DISMISSED_KEY = "duts-pwa-prompt-dismissed";

function isStandaloneMode() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function getPlatform(): Platform {
  if (typeof window === "undefined") {
    return {
      isAndroid: false,
      isIos: false,
      isMobile: false,
      isSafari: false,
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIos =
    /iphone|ipad|ipod/.test(userAgent) ||
    (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  const isAndroid = /android/.test(userAgent);
  const isSafari =
    /safari/.test(userAgent) &&
    !/chrome|crios|fxios|edgios|opr\//.test(userAgent);

  return {
    isAndroid,
    isIos,
    isMobile: isAndroid || isIos,
    isSafari,
  };
}

export default function PwaInstallPrompt() {
  const [isStandalone, setIsStandalone] = useState(true);
  const [isDismissed, setIsDismissed] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [platform, setPlatform] = useState<Platform>(() => getPlatform());
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(display-mode: standalone)");
    const currentPlatform = getPlatform();
    const dismissedThisSession = sessionStorage.getItem(DISMISSED_KEY) === "true";

    setPlatform(currentPlatform);
    setIsStandalone(isStandaloneMode());
    setIsDismissed(dismissedThisSession);

    const timer = window.setTimeout(() => setIsReady(true), 900);

    function handleDisplayModeChange() {
      setIsStandalone(isStandaloneMode());
    }

    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setIsStandalone(true);
      setDeferredPrompt(null);
    }

    media.addEventListener?.("change", handleDisplayModeChange);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.clearTimeout(timer);
      media.removeEventListener?.("change", handleDisplayModeChange);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const showAndroidInstall = platform.isAndroid && !!deferredPrompt;
  const showIosGuide = platform.isIos;
  const isVisible =
    isReady &&
    !isStandalone &&
    !isDismissed &&
    platform.isMobile &&
    (showAndroidInstall || showIosGuide);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  function dismissPrompt() {
    sessionStorage.setItem(DISMISSED_KEY, "true");
    setIsDismissed(true);
  }

  async function handleInstallClick() {
    if (!deferredPrompt) return;

    try {
      setIsInstalling(true);
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setIsStandalone(true);
      } else {
        dismissPrompt();
      }

      setDeferredPrompt(null);
    } finally {
      setIsInstalling(false);
    }
  }

  async function handleCopyLink() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    } else {
      const input = document.createElement("textarea");
      input.value = window.location.href;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    setCopiedLink(true);
  }

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#2d1914]/65 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismissPrompt();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-install-title"
        aria-describedby="pwa-install-description"
        className="w-full max-w-md overflow-hidden rounded-[32px] border border-orange-100 bg-white shadow-[0_30px_100px_rgba(45,25,20,.32)]"
      >
        <div className="relative overflow-hidden bg-[#3b211a] px-5 py-5 text-white">
          <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-[#ff714b]/30 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/icon/icon-192.png"
                alt="Duts Receitas"
                width={58}
                height={58}
                className="h-[58px] w-[58px] rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,.22)]"
              />
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.18em] text-[#ff9b7a]">
                  <Sparkles className="h-3.5 w-3.5" /> Tenha sempre por perto
                </p>
                <h2 id="pwa-install-title" className="mt-1 text-xl font-black tracking-[-.035em]">
                  Instale o Duts Receitas
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={dismissPrompt}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/65 transition hover:bg-white/10 hover:text-white"
              aria-label="Fechar convite de instalação"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p id="pwa-install-description" className="text-sm font-semibold leading-6 text-stone-600">
            Adicione as receitas à tela inicial do celular para abrir mais rápido e continuar acessando conteúdos já visitados mesmo sem conexão.
          </p>

          {showAndroidInstall && (
            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={handleInstallClick}
                disabled={isInstalling}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ff6b45] px-5 text-sm font-black text-white shadow-[0_14px_35px_rgba(255,107,69,.28)] transition hover:-translate-y-0.5 hover:bg-[#f65e38] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Download className="h-5 w-5" />
                {isInstalling ? "ABRINDO INSTALAÇÃO..." : "INSTALAR APP GRÁTIS"}
              </button>
              <button
                type="button"
                onClick={dismissPrompt}
                className="min-h-11 w-full rounded-full text-xs font-bold text-stone-400 transition hover:text-stone-700"
              >
                Agora não
              </button>
            </div>
          )}

          {showIosGuide && (
            <>
              <div className="mt-5 rounded-[24px] bg-[#fff6f1] p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-[#e06040] shadow-sm">
                    <Share2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-[#3b211a]">1. Toque em Compartilhar</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">Use o botão de compartilhamento do Safari.</p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-[#e06040] shadow-sm">
                    <PlusSquare className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black text-[#3b211a]">2. Adicione à Tela de Início</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-stone-500">Depois, confirme tocando em Adicionar.</p>
                  </div>
                </div>
              </div>

              {!platform.isSafari && (
                <div className="mt-4 rounded-[18px] bg-amber-50 px-4 py-3 text-xs font-bold leading-5 text-amber-700">
                  No iPhone, abra esta página no Safari para instalar o aplicativo.
                </div>
              )}

              <div className="mt-5 grid gap-3">
                {!platform.isSafari && (
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#ff6b45] px-5 text-sm font-black text-white"
                  >
                    <Clipboard className="h-5 w-5" />
                    {copiedLink ? "LINK COPIADO" : "COPIAR LINK"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={dismissPrompt}
                  className="min-h-11 w-full rounded-full border border-orange-100 bg-white text-xs font-bold text-stone-500 transition hover:bg-orange-50"
                >
                  Entendi
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
