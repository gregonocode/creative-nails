"use client";

import { useEffect } from "react";

const META_PIXEL_ID = "1584821460029460";

type PixelQueue = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __prosperidadePixelInitialized?: boolean;
    __prosperidadePixelLastPageView?: string;
  }
}

function initializePixelAndTrackPage() {
  if (!window.fbq) {
    const pixel = ((...args: unknown[]) => {
      if (pixel.callMethod) {
        pixel.callMethod(...args);
      } else {
        pixel.queue.push(args);
      }
    }) as PixelQueue;

    pixel.queue = [];
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = "2.0";
    window.fbq = pixel;
    (window as Window & { _fbq?: PixelQueue })._fbq = pixel;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  const fbq = window.fbq;
  if (!fbq) return;

  if (!window.__prosperidadePixelInitialized) {
    fbq("init", META_PIXEL_ID);
    window.__prosperidadePixelInitialized = true;
  }

  const page = `${window.location.pathname}${window.location.search}`;
  if (window.__prosperidadePixelLastPageView !== page) {
    window.__prosperidadePixelLastPageView = page;
    fbq("track", "PageView");
  }
}

export default function ProsperidadeMetaPixel() {
  useEffect(() => {
    initializePixelAndTrackPage();
  }, []);

  return null;
}
