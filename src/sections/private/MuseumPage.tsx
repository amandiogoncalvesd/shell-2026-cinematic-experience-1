import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   O MUSEU — três épocas do universo da Shelcia, preservadas
   exatamente como foram criadas:
   · 2024 · Projeto Shell — o primeiro site (16 anos)
   · Shel 2026 — a geração do liquid chrome e da navbar celestial
   · Memory Lane Cinema — a geração da Luz e das letras de música
───────────────────────────────────────────────────────────── */
const WINGS = [
  {
    id: "shell2024",
    emblem: "🏛️",
    title: "Projeto Shell · 2024",
    sub: "O primeiro site — os 16 anos",
    src: "/arquivos/shell2024/index.html",
  },
  {
    id: "shel2026",
    emblem: "🌌",
    title: "Shel 2026",
    sub: "Liquid chrome & navbar celestial",
    src: "/arquivos/shel2026/index.html",
  },
  {
    id: "memory-lane",
    emblem: "🎬",
    title: "Memory Lane Cinema",
    sub: "A geração da Luz & das letras",
    src: "/arquivos/memory-lane/index.html",
  },
];

export default function MuseumPage() {
  const [wing, setWing] = useState(WINGS[0].id);
  const active = WINGS.find((w) => w.id === wing) ?? WINGS[0];

  return (
    <div className="relative min-h-screen bg-[#03101f]">
      <section className="relative pb-5 pt-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="glow-shell font-display text-3xl font-semibold sm:text-4xl">O Museu ✦</h1>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-shell-sky/55">
            três épocas do teu universo · preservadas como nasceram
          </p>
        </div>

        {/* Seletor de alas */}
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-2.5 px-5 sm:grid-cols-3">
          {WINGS.map((w) => (
            <button
              key={w.id}
              onClick={() => setWing(w.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                wing === w.id
                  ? "glass-strong border-shell-sky/60 shadow-[0_0_24px_rgba(135,195,227,0.2)]"
                  : "border-white/10 bg-white/[0.03] opacity-75 hover:opacity-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{w.emblem}</span>
                <span className={`text-xs font-semibold ${wing === w.id ? "text-white" : "text-[#dceefb]/85"}`}>
                  {w.title}
                </span>
                {wing === w.id && <span className="ml-auto text-[9px] text-shell-sky">✦</span>}
              </span>
              <span className="mt-1 block text-[10px] text-[#b9d9ec]/55">{w.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* A ala escolhida */}
      <AnimatePresence mode="wait">
        <motion.section
          key={active.id}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-[92rem] px-3 pb-14 sm:px-5"
        >
          <div className="royal-frame overflow-hidden rounded-3xl p-2">
            <iframe
              src={active.src}
              title={`${active.title} — Museu Shell 2026`}
              className="h-[80vh] w-full rounded-2xl border-0 bg-white"
              allow="fullscreen; autoplay"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-center">
            <a
              href={active.src}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.25em] text-shell-sky/50 underline-offset-4 transition hover:text-shell-sky hover:underline"
            >
              Abrir ala em página completa ↗
            </a>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
