'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const send = () => {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }
    };

    // tenta agora e tenta de novo logo em seguida (caso o script ainda esteja carregando)
    send();
    const t = window.setTimeout(send, 300);

    return () => window.clearTimeout(t);
  }, [pathname, searchParams]);

  return null;
}
