import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CanvasParticles, LiquidBlobs } from "../../components/effects";
import { Kicker } from "../../components/ui";

export default function NeuralPuzzlePage() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await wrapRef.current?.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      /* navegador não permitiu */
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03101f]">
      <LiquidBlobs className="opacity-50" />
      <CanvasParticles density={40} />

      <section className="relative pb-8 pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Kicker>Um desafio construído para ti</Kicker>
          <h1 className="glow-shell mt-4 font-display text-4xl font-semibold sm:text-5xl">Neural Puzzle ✦</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#b9d9ec]/70">
            Preparei este puzzle com as tuas fotografias — cada nível usa uma imagem diferente,
            escolhida ao acaso entre centenas de memórias. O teu progresso fica guardado
            automaticamente, para continuares sempre de onde paraste.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] text-shell-sky/60">
            <span className="glass rounded-full px-4 py-1.5">11 níveis · do 2×2 ao 12×12</span>
            <span className="glass rounded-full px-4 py-1.5">594 imagens aleatórias</span>
            <span className="glass rounded-full px-4 py-1.5">progresso guardado ✦</span>
          </div>
        </div>
      </section>

      {/* O jogo */}
      <motion.section
        ref={wrapRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 mx-auto mb-20 max-w-7xl px-4 sm:px-6 ${fullscreen ? "bg-[#03101f]" : ""}`}
      >
        <div className="royal-frame overflow-hidden rounded-3xl p-2">
          <div className="relative overflow-hidden rounded-2xl">
            <iframe
              src="/neural-puzzle.html"
              title="Neural Puzzle — Shell 2026"
              className="h-[78vh] w-full border-0"
              allow="fullscreen"
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-4">
          <button
            onClick={toggleFullscreen}
            className="rounded-full border border-shell-sky/40 px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-shell-sky transition hover:bg-shell-sky/15"
          >
            {fullscreen ? "Sair de ecrã inteiro" : "⛶ Ecrã inteiro"}
          </button>
          <a
            href="/neural-puzzle.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-full glass px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-ocean-100 transition hover:bg-white/10"
          >
            Abrir noutra janela ✦
          </a>
        </div>
      </motion.section>
    </div>
  );
}
