import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { photographFilm } from "../data/media2026";

/* ─────────────────────────────────────────────────────────────
   Boas-vindas reais: ao entrar numa área, um pergaminho de
   vidro apresenta o universo, explica a navegação e recomenda
   o Photograph 2026 + a instalação como aplicativo.
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
  const [installEvt, setInstallEvt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(storageKey)) {
        const t = setTimeout(() => setOpen(true), 1300);
        return () => clearTimeout(t);
      }
    } catch {
      /* sem storage */
    }
  }, [storageKey]);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* ignora */
    }
    setOpen(false);
  };

  const install = async () => {
    if (!installEvt) return;
    installEvt.prompt();
    try {
      await installEvt.userChoice;
    } catch {
      /* fechado */
    }
    setInstallEvt(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-[#02080f]/85 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong royal-frame relative max-h-full w-full max-w-xl overflow-y-auto rounded-3xl px-6 py-8 text-center sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-xl text-shell-sky">
              ❈
            </span>
            <h2 className="glow-shell mt-4 font-display text-2xl font-semibold sm:text-3xl">{title}</h2>

            {/* Apresentação */}
            <div className="mt-5 space-y-3 text-left">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  className="text-[13px] leading-relaxed text-[#cfe6f5]/85"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Photograph 2026 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + paragraphs.length * 0.12 }}
              className="mt-5 rounded-2xl border border-shell-sky/30 bg-shell-sky/10 px-4 py-4"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-shell-sky">O melhor vídeo desta aplicação</p>
              <p className="mt-1 font-display text-xl font-semibold text-white">Photograph 2026</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-[#cfe6f5]/60">
                Recomendamos descarregá-lo para a melhor experiência — com a qualidade 1080p, ele é pesado para
                assistir diretamente no site.
              </p>
              <a
                href={photographFilm.url}
                download
                target="_blank"
                rel="noreferrer"
                className="btn-royal mt-3 inline-block rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                ⬇ Baixar Photograph 2026
              </a>
            </motion.div>

            {/* Navegação */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + paragraphs.length * 0.12 }}
              className="mt-5 space-y-2 text-left"
            >
              {navigation.map((n, i) => (
                <p key={i} className="flex gap-2.5 text-[12px] leading-relaxed text-[#b9d9ec]/70">
                  <span className="mt-0.5 shrink-0 text-[9px] text-shell-sky">✦</span>
                  {n}
                </p>
              ))}
            </motion.div>

            {/* Instalar como aplicativo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + paragraphs.length * 0.12 }}
              className="mt-5 rounded-2xl border border-shell-lavender/25 bg-shell-lavender/[0.07] px-4 py-3"
            >
              <p className="text-[12px] leading-relaxed text-[#d9c9ec]/85">
                📱 Instala o <span className="font-semibold text-white">Shell 2026</span> como aplicativo para a
                melhor experiência —{" "}
                {isIos
                  ? "toca em Partilhar e escolhe “Adicionar ao ecrã principal”."
                  : "abre sempre em tela cheia e carrega muito mais rápido."}
              </p>
              {installEvt && (
                <button
                  onClick={install}
                  className="mt-2.5 rounded-full border border-shell-lavender/50 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-shell-lavender transition hover:bg-shell-lavender/15"
                >
                  Instalar agora ✦
                </button>
              )}
            </motion.div>

            <button onClick={close} className="btn-royal mt-6 rounded-full px-10 py-3 text-xs font-bold uppercase tracking-[0.2em]">
              Entrar ✦
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
