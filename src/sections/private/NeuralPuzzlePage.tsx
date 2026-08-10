import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CanvasParticles, LiquidBlobs } from "../../components/effects";
import { Kicker } from "../../components/ui";
import { exitImmersiveFullscreen, requestImmersiveFullscreen } from "../../utils/fullscreen";

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

      {/* Botão para fechar a tela cheia */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        onClick={exitImmersiveFullscreen}
        className="glass fixed right-4 top-16 z-[60] flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-shell-sky transition hover:bg-shell-sky/15 sm:right-6"
      >
        ✕ Fechar tela cheia
      </motion.button>

      <section className="relative pb-6 pt-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Kicker>Um desafio construído para ti</Kicker>
          <h1 className="glow-shell mt-3 font-display text-3xl font-semibold sm:text-4xl">Neural Puzzle ✦</h1>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#b9d9ec]/65 sm:text-sm">
            Preparei este puzzle com as tuas fotografias — cada nível usa uma imagem diferente,
            escolhida ao acaso entre centenas de memórias. O teu progresso fica guardado
            automaticamente, para continuares sempre de onde paraste.
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
              src="/neural-puzzle.html"
              title="Neural Puzzle — Shell 2026"
              className="h-[82vh] w-full border-0"
              allow="fullscreen"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-[9px] uppercase tracking-[0.25em] text-shell-sky/50">
          <span className="glass rounded-full px-4 py-1.5">11 níveis · do 2×2 ao 12×12</span>
          <span className="glass rounded-full px-4 py-1.5">594 imagens aleatórias</span>
          <span className="glass rounded-full px-4 py-1.5">progresso guardado ✦</span>
          <a
            href="/neural-puzzle.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-full glass px-4 py-1.5 text-ocean-100/70 transition hover:text-white"
          >
            Abrir noutra janela ✦
          </a>
        </div>
      </motion.section>
    </div>
  );
}
