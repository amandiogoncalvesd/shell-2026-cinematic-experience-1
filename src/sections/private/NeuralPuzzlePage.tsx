import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CanvasParticles, LiquidBlobs } from "../../components/effects";
import { requestImmersiveFullscreen } from "../../utils/fullscreen";

export default function NeuralPuzzlePage() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // O Neural Puzzle abre, por padrão, em tela cheia — imersão total.
  useEffect(() => {
    requestImmersiveFullscreen();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#03101f]">
      <LiquidBlobs className="opacity-50" />
      <CanvasParticles density={40} />

      <section className="relative pb-5 pt-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="glow-shell font-display text-3xl font-semibold sm:text-4xl">Neural Puzzle ✦</h1>
          <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-shell-sky/55">
            11 níveis · 594 imagens · progresso guardado
          </p>
        </div>
      </section>

      {/* O jogo */}
      <motion.section
        ref={wrapRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto mb-16 max-w-[92rem] px-3 sm:px-5"
      >
        <div className="royal-frame overflow-hidden rounded-3xl p-2">
          <div className="relative overflow-hidden rounded-2xl">
            <iframe
              src="/neural-puzzle.html?v=omega"
              title="Neural Puzzle — Shell 2026"
              className="h-[82vh] w-full border-0"
              allow="fullscreen"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
