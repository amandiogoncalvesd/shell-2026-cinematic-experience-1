import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photographFilm } from "../data/media2026";

/* ─────────────────────────────────────────────────────────────
   Cartão de boas-vindas — design exportado do Shell Memory Lane
   (vidro de cristal, entrada com desfoque, lista "Como navegar"),
   adaptado ao universo Shell 2026 com o download do Photograph.
   Aparece uma vez por sessão.
───────────────────────────────────────────────────────────── */
export default function WelcomeModal({
  storageKey,
  title,
  paragraphs,
  navigation,
}: {
  storageKey: string;
  title: string;
  paragraphs: string[];
  navigation: string[];
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (!sessionStorage.getItem(storageKey)) {
        const t = setTimeout(() => setOpen(true), 1300);
        return () => clearTimeout(t);
      }
    } catch {
      /* sem storage */
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

  if (!mounted) return null;

  const icons = ["▶", "❈", "♪", "✦", "⬇", "❈"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={close} />

          <motion.div
            className="glass-strong royal-frame relative w-full max-w-lg select-none overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="max-h-[88vh] overflow-y-auto p-7 sm:p-9">
              <button
                onClick={close}
                aria-label="Fechar"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>

              {/* Cabeçalho */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm text-shell-lavender">✦</span>
                <p className="text-[10px] uppercase tracking-[0.35em] text-shell-sky/80 sm:text-xs">
                  {title}
                </p>
              </div>

              <h2 className="font-display text-3xl font-light leading-tight text-white sm:text-4xl">
                Shell <span className="italic">2026</span> <span className="glow-shell font-semibold">✦</span>
              </h2>

              {/* Apresentação */}
              <div className="mt-3 space-y-2.5">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-[#dceefb]/85 sm:text-[15px]">
                    {p}
                  </p>
                ))}
              </div>

              {/* Photograph 2026 */}
              <div className="mt-6 rounded-2xl border border-shell-sky/30 bg-shell-sky/10 px-5 py-4 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-shell-sky">
                  O melhor vídeo desta aplicação
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-white">Photograph 2026</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#dceefb]/60">
                  Recomendamos descarregá-lo para a melhor experiência — qualidade 1080p.
                </p>
                <a
                  href={photographFilm.url}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="btn-royal mt-3 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  ⬇ Baixar o filme
                </a>
              </div>

              {/* Como navegar */}
              <div className="mt-6 space-y-3">
                <p className="text-[11px] uppercase tracking-[0.25em] text-shell-sky/70">Como navegar</p>
                <ul className="space-y-2.5 text-sm text-[#dceefb]/90">
                  {navigation.map((n, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-xs text-shell-sky">{icons[i % icons.length]}</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instalar */}
              <p className="mt-5 text-center text-[11px] leading-relaxed text-shell-lavender/80">
                📱 Instala o Shell 2026 como aplicativo — abre em tela cheia e carrega muito mais rápido.
              </p>

              <button
                onClick={close}
                className="btn-royal group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide"
              >
                Entrar na experiência
                <span className="text-xs transition-transform duration-500 group-hover:rotate-12">✦</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
