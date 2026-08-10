import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Convite real de instalação — aparece antes de entrar em
   qualquer página, para instalar o Shell 2026 como aplicação.
   Instalado, tudo abre em tela cheia e carrega muito mais
   depressa (e o que já viu funciona mesmo sem internet).
───────────────────────────────────────────────────────────── */
export default function InstallBanner() {
  const [deferred, setDeferred] = useState<any>(null);
  const [iosHint, setIosHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Já instalada? Não incomodamos.
    if (window.matchMedia("(display-mode: fullscreen)").matches || (navigator as any).standalone) {
      setInstalled(true);
      return;
    }
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onIos = () => {
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      if (ios) setIosHint(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    onIos();
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (installed || dismissed) return null;
  if (!deferred && !iosHint) return null;

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* utilizador fechou */
    }
    setDeferred(null);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-5 z-[80] flex justify-center px-4"
      >
        <div className="glass-strong shimmer-border flex w-full max-w-md items-center gap-3 rounded-2xl px-4 py-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-lg text-shell-sky">
            ✦
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white">Instala o Shell 2026 ✦</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-[#b9d9ec]/60">
              {iosHint
                ? "Toca em Partilhar e escolhe “Adicionar ao ecrã principal” — abre em tela cheia e mais rápido."
                : "Como aplicação: tela cheia, muito mais rápido, e o que já viste abre até sem internet."}
            </p>
          </div>
          {deferred && (
            <button
              onClick={install}
              className="btn-royal shrink-0 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em]"
            >
              Instalar
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Agora não"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs text-ocean-200/50 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
