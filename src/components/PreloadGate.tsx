import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasParticles, FilmGrain, LiquidBlobs } from "./effects";
import { preloadImages } from "../data/preload";

const MESSAGES = [
  "A abrir o portal de cristal…",
  "A polir cada memória com luz…",
  "A guardar as tuas fotos num cofre de estrelas…",
  "A Cinderela merece perfeição — quase lá…",
];

export default function PreloadGate({ onDone }: { onDone: () => void }) {
  const total = preloadImages.length;
  const [done, setDone] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    let loaded = 0;
    let cursor = 0;

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setTimeout(() => setLeaving(true), 500);
    };

    const step = () => {
      if (cursor >= total) return;
      const src = preloadImages[cursor++];
      const img = new Image();
      const next = () => {
        loaded += 1;
        setDone(loaded);
        if (loaded >= total) finish();
        else step();
      };
      img.onload = next;
      img.onerror = next;
      img.src = src;
    };

    // Oito descargas em paralelo — rápido sem sufocar a rede.
    for (let i = 0; i < 8; i++) step();

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
          {done} de {total} memórias carregadas
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
            onClick={() => {
              finishedRef.current = true;
              setLeaving(true);
            }}
            className="text-[10px] uppercase tracking-[0.3em] text-ocean-200/40 transition hover:text-white"
          >
            Entrar sem esperar ✦
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
