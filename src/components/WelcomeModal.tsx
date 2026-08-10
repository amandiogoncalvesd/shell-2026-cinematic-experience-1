import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { photographFilm } from "../data/media2026";

/* ─────────────────────────────────────────────────────────────
   Boas-vindas reais: ao entrar numa área, um pergaminho de
   vidro explica como ela funciona. Aparece uma vez por sessão.
───────────────────────────────────────────────────────────── */
export default function WelcomeModal({
  storageKey,
  title,
  lines,
  mentionPhotograph = false,
}: {
  storageKey: string;
  title: string;
  lines: string[];
  mentionPhotograph?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(storageKey)) {
        const t = setTimeout(() => setOpen(true), 1400);
        return () => clearTimeout(t);
      }
    } catch {
      /* sem storage — não mostra */
    }
  }, [storageKey]);

  const close = () => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignora */
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-[#02080f]/80 px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong royal-frame relative w-full max-w-lg rounded-3xl px-7 py-9 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-xl text-shell-sky">
              ❈
            </span>
            <h2 className="glow-shell mt-4 font-display text-2xl font-semibold">{title}</h2>

            <div className="mt-5 space-y-3 text-left">
              {lines.map((l, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.15, duration: 0.5 }}
                  className="flex gap-2.5 text-[13px] leading-relaxed text-[#cfe6f5]/80"
                >
                  <span className="mt-0.5 shrink-0 text-[10px] text-shell-sky">✦</span>
                  {l}
                </motion.p>
              ))}
            </div>

            {mentionPhotograph && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + lines.length * 0.15 }}
                className="mt-5 rounded-2xl border border-shell-sky/30 bg-shell-sky/10 px-4 py-3"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-shell-sky">O destaque do cinema</p>
                <p className="mt-1 font-display text-lg font-semibold text-white">Photograph 2026</p>
                <a
                  href={photographFilm.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-[11px] uppercase tracking-widest text-shell-sky underline-offset-4 hover:underline"
                >
                  ⬇ Baixar o filme
                </a>
              </motion.div>
            )}

            <button onClick={close} className="btn-royal mt-7 rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.2em]">
              Entrar ✦
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
