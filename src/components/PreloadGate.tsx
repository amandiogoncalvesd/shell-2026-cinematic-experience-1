import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasParticles, FilmGrain, LiquidBlobs } from "./effects";
import { preloadImages, preloadDocs } from "../data/preload";

const MESSAGES = [
  "A abrir o portal de cristal…",
  "A polir cada memória com luz…",
  "A guardar as tuas fotos num cofre de estrelas…",
  "A preparar os posters voadores…",
  "A Cinderela merece perfeição — quase lá…",
];

export default function PreloadGate({ onDone }: { onDone: () => void }) {
  const total = useMemo(() => preloadImages.length + preloadDocs.length, []);
  const [done, setDone] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [warnSkip, setWarnSkip] = useState(false);
  const finishedRef = useRef(false);
  const doneRef = useRef(0);

  useEffect(() => {
    doneRef.current = 0;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setTimeout(() => setLeaving(true), 500);
    };

    const tick = () => {
      doneRef.current += 1;
      setDone(doneRef.current);
      if (doneRef.current >= total) finish();
    };

    // Imagens.
    let cursor = 0;
    const step = () => {
      if (cursor >= preloadImages.length) return;
      const src = preloadImages[cursor++];
      const img = new Image();
      const next = () => {
        tick();
        step();
      };
      img.onload = next;
      img.onerror = next;
      img.src = src;
    };
    // Oito descargas em paralelo — rápido sem sufocar a rede.
    for (let i = 0; i < 8; i++) step();

    // Documentos dos módulos (puzzle, etc.) — ficam na cache.
    preloadDocs.forEach((doc) => {
      fetch(doc, { cache: "force-cache" })
        .then(() => tick())
        .catch(() => tick());
    });

    const msgTimer = setInterval(() => setMsgIndex((m) => (m + 1) % MESSAGES.length), 2600);
    const skipTimer = setTimeout(() => setCanSkip(true), 9000);
    return () => {
      clearInterval(msgTimer);
      clearTimeout(skipTimer);
    };
  }, [total]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  const percent = Math.min(100, Math.round((done / total) * 100));

  const trySkip = () => {
    if (percent >= 100) {
      finishedRef.current = true;
      setLeaving(true);
    } else {
      setWarnSkip(true);
    }
  };

  return (
    <motion.div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03101f]"
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0">
        <img src="/images/portal-bg.jpg" alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/50 via-[#03101f]/70 to-[#03101f]" />
      </div>
      <LiquidBlobs />
      <CanvasParticles density={70} />
      <FilmGrain />

      <div className="relative z-10 flex flex-col items-center gap-7 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-16 w-16 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-2xl text-shell-sky"
        >
          ❈
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[11px] uppercase tracking-[0.6em] text-shell-sky/80"
        >
          Shell 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glow-shell font-display text-7xl font-bold tabular-nums sm:text-8xl"
        >
          {percent}%
        </motion.h1>

        <div className="h-px w-64 overflow-hidden rounded-full bg-white/10 sm:w-80">
          <motion.div
            className="h-full bg-shell-sky"
            animate={{ width: `${percent}%` }}
            transition={{ ease: "easeOut", duration: 0.4 }}
          />
        </div>

        <p className="text-[11px] uppercase tracking-[0.35em] text-ocean-200/60">
          {done} de {total} módulos e memórias carregados
        </p>

        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-sm italic text-shell-lavender/90"
            >
              {MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {canSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={trySkip}
            className="text-[10px] uppercase tracking-[0.3em] text-ocean-200/40 transition hover:text-white"
          >
            Entrar sem esperar ✦
          </motion.button>
        )}
      </div>

      {/* Aviso ao entrar sem carregar tudo */}
      <AnimatePresence>
        {warnSkip && (
          <motion.div
            className="fixed inset-0 z-[160] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong royal-frame w-full max-w-md rounded-3xl px-7 py-8 text-center"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-shell-lavender/50 bg-shell-lavender/10 text-xl">
                ⚠️
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">Espera um instante ✦</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#dceefb]/80">
                Ainda faltam <span className="font-semibold text-shell-sky">{100 - percent}%</span> das mídias e dos
                módulos da aplicação. Se continuares agora, a experiência pode não funcionar corretamente — fotos em
                falta e galerias incompletas.
              </p>
              <p className="mt-2 font-display text-sm italic text-shell-lavender/80">
                Queres continuar mesmo assim?
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setWarnSkip(false)}
                  className="btn-royal rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em]"
                >
                  Aguardar carregamento
                </button>
                <button
                  onClick={() => {
                    setWarnSkip(false);
                    finishedRef.current = true;
                    setLeaving(true);
                  }}
                  className="rounded-full border border-white/15 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#dceefb]/70 transition hover:border-shell-rose/50 hover:text-white"
                >
                  Continuar mesmo assim
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
