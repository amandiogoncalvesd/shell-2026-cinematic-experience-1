import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   Pré-carrega uma lista de imagens e reporta o progresso real.
   Os Posters Voadores só começam quando (pelo menos o mínimo)
   está pronto — garantia de que as fotos aparecem.
───────────────────────────────────────────────────────────── */
export function useImagePreload(urls: string[], minReady = 6) {
  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!urls.length) {
      setReady(true);
      return;
    }
    let count = 0;
    let fails = 0;
    let cancelled = false;

    const tick = (ok: boolean) => {
      if (cancelled) return;
      count += 1;
      if (!ok) fails += 1;
      setLoaded(count);
      setFailed(fails);
      if (count >= Math.min(minReady, urls.length) || count >= urls.length) {
        setReady(true);
      }
    };

    urls.forEach((src) => {
      const img = new Image();
      img.onload = () => tick(true);
      img.onerror = () => tick(false);
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [urls, minReady]);

  const total = urls.length;
  const percent = total ? Math.min(100, Math.round((loaded / total) * 100)) : 100;
  return { loaded, total, failed, percent, ready };
}
