import { motion } from "framer-motion";
import FlyingPosters from "../components/FlyingPosters";
import { CanvasParticles } from "../components/effects";
import { FLYING_ITEMS } from "../data/flyingPool";

/* ─────────────────────────────────────────────────────────────
   Páginas públicas de arcade — acesso direto a partir do portal,
   sem chave: qualquer pessoa pode jogar e voar.
───────────────────────────────────────────────────────────── */

function ArcadeShell({
  title,
  hint,
  onExit,
  children,
}: {
  title: string;
  hint: string;
  onExit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#03101f]">
      <CanvasParticles density={40} />

      {/* Barra de saída */}
      <div className="fixed inset-x-0 top-0 z-50 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={onExit}
            className="glass rounded-full px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-shell-sky transition hover:bg-shell-sky/15"
          >
            ← Portal
          </button>
          <p className="hidden text-[10px] uppercase tracking-[0.35em] text-[#b9d9ec]/50 sm:block">
            Shell 2026 ✦
          </p>
        </div>
      </div>

      <section className="relative pb-6 pt-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glow-shell font-display text-3xl font-semibold sm:text-4xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="animate-pulse-glow mt-2 text-[11px] uppercase tracking-[0.35em] text-shell-sky/70"
        >
          {hint}
        </motion.p>
      </section>

      {children}
    </div>
  );
}

/* ═══════════ NEURAL PUZZLE — página pública ═══════════ */
export function PuzzleArcadePage({ onExit }: { onExit: () => void }) {
  return (
    <ArcadeShell title="Neural Puzzle ⬡" hint="qualquer pessoa pode jogar ✦" onExit={onExit}>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[92rem] px-3 pb-12 sm:px-5"
      >
        <div className="royal-frame overflow-hidden rounded-3xl p-2">
          <iframe
            src="/neural-puzzle.html?v=3"
            title="Neural Puzzle — Shell 2026"
            className="h-[82vh] w-full rounded-2xl border-0"
            allow="fullscreen"
          />
        </div>
      </motion.section>
    </ArcadeShell>
  );
}

/* ═══════════ POSTERS VOADORES — página pública ═══════════ */
export function PostersPage({ onExit }: { onExit: () => void }) {
  return (
    <ArcadeShell title="Posters Voadores 💫" hint="✦ desliza para ver a magia acontecer ✦" onExit={onExit}>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[92rem] px-3 pb-12 sm:px-5"
      >
        <div className="royal-frame overflow-hidden rounded-3xl p-2">
          <div className="relative h-[76vh] overflow-hidden rounded-2xl bg-[#040f1e]">
            <FlyingPosters items={FLYING_ITEMS} planeWidth={300} planeHeight={400} distortion={3} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#03101f] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#03101f] to-transparent" />
          </div>
        </div>
      </motion.section>
    </ArcadeShell>
  );
}
