import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasParticles, Countdown, FilmGrain, LiquidBlobs } from "../components/effects";
import LiquidChrome from "../components/LiquidChrome";
import ElectricBorder from "../components/ElectricBorder";
import InstallBanner from "../components/InstallBanner";
import { requestImmersiveFullscreen } from "../utils/fullscreen";
import { universeQuote } from "../data/media2026";
import { identity } from "../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

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
      {/* Fundo — crómio líquido + atmosfera */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-60">
          <LiquidChrome baseColor={[0.02, 0.09, 0.17]} speed={0.55} amplitude={0.45} frequencyX={2.2} frequencyY={1.6} interactive />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/45 via-[#03101f]/70 to-[#03101f]" />
      </div>
      <LiquidBlobs />
      <CanvasParticles density={90} />

<AnimatePresence mode="wait">
        {/* ══════════ FASE 1 · ABERTURA ══════════ */}
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative grid h-20 w-20 place-items-center rounded-full border border-shell-sky/40 bg-shell-sky/10 text-3xl text-shell-sky"
            >
              ❈
              <span className="animate-ping-slow absolute inset-0 rounded-full border border-shell-sky/40" />
              <span className="animate-sparkle absolute -right-1 -top-1 text-xs text-shell-lavender">✦</span>
            </motion.div>

            <motion.p
              className="text-[11px] uppercase tracking-[0.6em] text-shell-sky/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Projeto
            </motion.p>
            <motion.h1
              className="glow-shell font-display text-6xl font-bold sm:text-8xl"
              initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(6px)" }}
              animate={{ opacity: 1, letterSpacing: "0.05em", filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              SHELL 2026
            </motion.h1>
            <div className="h-px w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-shell-lavender via-shell-sky to-shell-serenity"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.4em] text-shell-sky/60">a abrir o portal de cristal…</p>
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

        {/* ══════════ FASE 2 · O PORTAL ══════════ */}
        {phase === "portal" && (
          <motion.div
            key="portal"
            className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-16 text-center"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}
          >
            {/* Título */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
              transition={{ duration: 1, ease: EASE }}
            >
              <p className="text-[11px] uppercase tracking-[0.55em] text-shell-sky/80">Um universo digital para</p>
              <h1 className="glow-shell mt-3 font-display text-5xl font-bold sm:text-7xl">Shelcia Fernanda</h1>
              <div className="mx-auto mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-shell-sky/60" />
                <p className="text-sm uppercase tracking-[0.35em] text-[#b9d9ec]/70">10 de Agosto · A Cinderela cresceu</p>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-shell-sky/60" />
              </div>
            </motion.div>

            {/* Cartões de entrada — liquid glass premium com borda elétrica */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 1, ease: EASE }}
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

            {/* Contagem */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>
              <Countdown compact />
            </motion.div>

            {/* Links dos repositórios irmãos */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
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

            {/* A frase do universo + o provérbio */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mx-auto max-w-md"
            >
              <p className="font-display text-sm italic leading-relaxed text-shell-lavender/90">
                “{universeQuote.text}”
              </p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-ocean-200/50">— {universeQuote.author}</p>
              <div className="crystal-divider mx-auto my-4 w-40" />
              <p className="text-xs leading-relaxed text-ocean-200/50">
                "{identity.verse.text}" — {identity.verse.ref}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FilmGrain />

      {/* Convite de instalação */}
      {phase === "portal" && <InstallBanner />}

      {/* ══════════ FASE 3 · SAÍDA ══════════ */}
      <AnimatePresence>
        {phase === "leaving" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#03101f]"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-xl text-shell-sky">
                {leavingTo === "shelcia" ? "❈" : "✦"}
              </span>
              <p className="font-display text-2xl tracking-[0.2em] text-ocean-100">
                {leavingTo === "shelcia" ? "A abrir o teu universo…" : "A entrar na celebração…"}
              </p>
            </motion.div>
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
      transition={{ duration: 0.5, ease: EASE }}
      className="group text-left"
    >
      <ElectricBorder color="#87C3E3" speed={0.7} chaos={0.09} borderRadius={28} className="transition group-hover:[--electric-border-color:#bfe4f7]">
        <div className="glass-strong relative overflow-hidden rounded-[28px] px-8 py-12">
          {/* Brilho que respira */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-shell-sky/20 blur-3xl transition duration-700 group-hover:bg-shell-sky/45" />
          {/* Varrido de luz no hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          <div className="relative z-10">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-2xl text-shell-sky shadow-[0_0_24px_rgba(135,195,227,0.3)] transition duration-500 group-hover:rotate-12 group-hover:bg-shell-sky/25">
              {emblem}
            </div>
            <h3 className="font-display text-3xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-[#b9d9ec]/60">{subtitle}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-shell-sky/80 transition group-hover:text-white">
              Entrar <span className="transition group-hover:translate-x-1.5">→</span>
            </div>
          </div>
        </div>
      </ElectricBorder>
    </motion.button>
  );
}
