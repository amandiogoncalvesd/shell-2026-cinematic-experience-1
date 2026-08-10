import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   RELÍQUIAS DE 2024 — duas páginas históricas do Projeto Shell,
   preservadas exatamente como nasceram:
   · O Cartão — a birthday card que se abre com um clique
   · A Explosão — “FELIZ ANIVERSÁRIO! Shelcia” em partículas
───────────────────────────────────────────────────────────── */
const RELICS = [
  {
    id: "cartao",
    emblem: "💌",
    title: "O Cartão",
    sub: "“Click para abrir” — 2024",
    src: "/arquivos/shell2024/homepage_2.html",
  },
  {
    id: "explosao",
    emblem: "🎇",
    title: "A Explosão",
    sub: "FELIZ ANIVERSÁRIO! Shelcia",
    src: "/arquivos/shell2024/homepage_3.html",
  },
];

export default function ReliquiasPage() {
  const [relic, setRelic] = useState(RELICS[0].id);
  const active = RELICS.find((r) => r.id === relic) ?? RELICS[0];

  return (
    <div className="relative min-h-screen bg-[#03101f]">
      <section className="relative pb-5 pt-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="glow-shell font-display text-3xl font-semibold sm:text-4xl">Relíquias de 2024 ✦</h1>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-shell-sky/55">
            o começo de tudo · preservado como nasceu
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-2.5 px-5">
          {RELICS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRelic(r.id)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                relic === r.id
                  ? "glass-strong border-shell-sky/60 shadow-[0_0_24px_rgba(135,195,227,0.2)]"
                  : "border-white/10 bg-white/[0.03] opacity-75 hover:opacity-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{r.emblem}</span>
                <span className={`text-xs font-semibold ${relic === r.id ? "text-white" : "text-[#dceefb]/85"}`}>
                  {r.title}
                </span>
                {relic === r.id && <span className="ml-auto text-[9px] text-shell-sky">✦</span>}
              </span>
              <span className="mt-1 block text-[10px] text-[#b9d9ec]/55">{r.sub}</span>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={active.id}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-6xl px-3 pb-14 sm:px-5"
        >
          <div className="royal-frame overflow-hidden rounded-3xl p-2">
            <iframe
              src={active.src}
              title={`${active.title} — Relíquias de 2024`}
              className="h-[78vh] w-full rounded-2xl border-0 bg-white"
              allow="fullscreen"
            />
          </div>
          <div className="mt-3 text-center">
            <a
              href={active.src}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.25em] text-shell-sky/50 underline-offset-4 transition hover:text-shell-sky hover:underline"
            >
              Abrir em página completa ↗
            </a>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
