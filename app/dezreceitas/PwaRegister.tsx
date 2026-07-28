"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/dezreceitas",
          updateViaCache: "none",
        });
      } catch (error) {
        console.error("Não foi possível registrar o service worker:", error);
      }
    };

    void registerServiceWorker();
  }, []);

  return null;
}
