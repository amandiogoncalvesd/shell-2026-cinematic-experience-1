import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasParticles, Countdown, FilmGrain, LiquidBlobs } from "../components/effects";
import LiquidChrome from "../components/LiquidChrome";
import InstallBanner from "../components/InstallBanner";
import { requestImmersiveFullscreen } from "../utils/fullscreen";
import { universeQuote } from "../data/media2026";
import { identity } from "../data/content";

export default function Portal({ onEnter }: { onEnter: (role: "guests" | "shelcia") => void }) {
  const [phase, setPhase] = useState<"loading" | "portal" | "leaving">("loading");
  const [leavingTo, setLeavingTo] = useState<"guests" | "shelcia" | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setPhase("portal"), 400);
          return 100;
        }
        return p + Math.random() * 14 + 6;
      });
    }, 180);
    return () => clearInterval(id);
  }, []);

  const skipIntro = () => {
    setProgress(100);
    setPhase("portal");
  };

  const choose = (role: "guests" | "shelcia") => {
    // O portal abre em tela cheia — sem barras nem distrações.
    requestImmersiveFullscreen();
    setLeavingTo(role);
    setPhase("leaving");
    setTimeout(() => onEnter(role), 1400);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#03101f]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-60">
          <LiquidChrome
            baseColor={[0.02, 0.09, 0.17]}
            speed={0.55}
            amplitude={0.45}
            frequencyX={2.2}
            frequencyY={1.6}
            interactive
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/45 via-[#03101f]/70 to-[#03101f]" />
      </div>
      <LiquidBlobs />
      <CanvasParticles density={90} />

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-[11px] uppercase tracking-[0.6em] text-ocean-200/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Projeto
            </motion.p>
            <motion.h1
              className="font-display text-6xl font-bold tracking-wide text-gradient-ocean sm:text-8xl"
              initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(6px)" }}
              animate={{ opacity: 1, letterSpacing: "0.05em", filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              SHELL 2026
            </motion.h1>
            <div className="h-px w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-ocean-200 to-ocean-500"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] text-ocean-300/60">a abrir o portal de cristal…</p>
            <motion.button
              onClick={skipIntro}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-2 text-[10px] uppercase tracking-[0.3em] text-ocean-200/40 transition hover:text-white"
            >
              Pular introdução →
            </motion.button>
          </motion.div>
        )}

        {phase === "portal" && (
          <motion.div
            key="portal"
            className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-14 px-6 text-center"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] uppercase tracking-[0.55em] text-ocean-200/70">Um universo digital para</p>
              <h1 className="mt-3 font-display text-5xl font-bold text-gradient-ocean sm:text-7xl">
                Shelcia Fernanda
              </h1>
              <p className="mt-4 text-sm uppercase tracking-[0.35em] text-ocean-300/60">
                10 de Agosto · A Cinderela cresceu
              </p>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <PortalCard
                title="Convidados"
                subtitle="Entrar na galeria pública de celebração"
                emblem="✦"
                onClick={() => choose("guests")}
              />
              <PortalCard
                title="Shelcia"
                subtitle="Entrada privada — o universo pessoal"
                emblem="❈"
                onClick={() => choose("shelcia")}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <Countdown compact />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="https://shell-memory-lane-cinema.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="glass rounded-full px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] text-ocean-100/80 transition hover:bg-white/10 hover:text-white"
              >
                🎬 Visitar o Shell Memory Lane
              </a>
              <a
                href="https://projeto-shell-2024.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="glass rounded-full px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] text-ocean-100/80 transition hover:bg-white/10 hover:text-white"
              >
                🏛️ Visitar o Projeto Shell 2024
              </a>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="mx-auto max-w-md"
            >
              <p className="font-display text-sm italic leading-relaxed text-shell-lavender/90">
                “{universeQuote.text}”
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-ocean-200/50">
                — {universeQuote.author}
              </p>
              <div className="crystal-divider mx-auto my-4 w-40" />
              <p className="text-xs leading-relaxed text-ocean-200/50">
                "{identity.verse.text}" — {identity.verse.ref}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FilmGrain />

      {/* Convite para instalar como aplicação — antes de entrar em qualquer página */}
      {phase === "portal" && <InstallBanner />}

      <AnimatePresence>
        {phase === "leaving" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#03101f]"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.p
              className="font-display text-2xl tracking-[0.3em] text-ocean-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {leavingTo === "shelcia" ? "A abrir o universo de Shelcia…" : "A entrar na celebração…"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PortalCard({
  title,
  subtitle,
  emblem,
  onClick,
}: {
  title: string;
  subtitle: string;
  emblem: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass shimmer-border group relative overflow-hidden rounded-3xl px-8 py-12 text-left transition"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ocean-300/20 blur-3xl transition group-hover:bg-ocean-300/40" />
      <div className="relative z-10">
        <div className="mb-6 grid h-14 w-14 place-items-center rounded-full border border-ocean-200/30 text-2xl text-ocean-200">
          {emblem}
        </div>
        <h3 className="font-display text-3xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-ocean-100/60">{subtitle}</p>
        <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ocean-200/70 transition group-hover:text-white">
          Entrar <span className="transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.button>
  );
}
