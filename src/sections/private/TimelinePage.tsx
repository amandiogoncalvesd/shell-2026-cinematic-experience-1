import { motion } from "framer-motion";
import { Reveal } from "../../components/effects";
import { openLightbox } from "../../components/media";
import { videoPoster, videoMemories, videoFamilyFriends, videoBackstageClassic } from "../../data/videos";
import { infanciaVideos, capitulos2023Videos, destaque18Videos, bastidoresTopVideos } from "../../data/media2026";

/* ─────────────────────────────────────────────────────────────
   LINHA DO TEMPO — quatro eras de uma vida, do começo aos 18.
   (A mesma linha criada no Shell Memory Lane, agora em casa.)
───────────────────────────────────────────────────────────── */

type EraItem = { url: string; title: string };
type Era = { range: string; title: string; line: string; items: EraItem[] };

const ERAS: Era[] = [
  {
    range: "O Começo",
    title: "A menina dos olhos grandes",
    line: "Antes das câmaras e das cerimónias, havia uma menina a descobrir o mundo — e já cheia de ideias para defender.",
    items: [
      { url: infanciaVideos[0], title: "A menina que defendia as suas ideias" },
      { url: infanciaVideos[1], title: "Os primeiros dias de escola" },
    ],
  },
  {
    range: "2023",
    title: "O primeiro grande capítulo",
    line: "Quinze anos: a festa, os capítulos, os risos que ainda ecoam.",
    items: capitulos2023Videos.map((url, i) => ({
      url,
      title: `Capítulo ${String(i + 1).padStart(2, "0")} · 15 anos`,
    })),
  },
  {
    range: "2024 — 2025",
    title: "Os dias que valem a pena guardar",
    line: "Você vive tudo intensamente — e cada bastidor vira memória.",
    items: [
      ...videoMemories.slice(0, 4).map((url, i) => ({ url, title: `Memória ${String(i + 1).padStart(2, "0")}` })),
      ...videoFamilyFriends.slice(0, 5).map((url, i) => ({ url, title: `Família & amigos ${String(i + 1).padStart(2, "0")}` })),
      ...videoBackstageClassic.slice(0, 5).map((url, i) => ({ url, title: `Bastidor ${String(i + 1).padStart(2, "0")}` })),
    ],
  },
  {
    range: "2026",
    title: "A Cinderela cresceu",
    line: "Dez de agosto: o começo do capítulo mais bonito de todos.",
    items: [
      ...destaque18Videos.slice(0, 8).map((url, i) => ({ url, title: `Os 18 anos · momento ${String(i + 1).padStart(2, "0")}` })),
      ...bastidoresTopVideos.slice(0, 4).map((url, i) => ({ url, title: `Bastidores ${String(i + 1).padStart(2, "0")}` })),
    ],
  },
];

export default function TimelinePage() {
  return (
    <div className="relative min-h-screen bg-[#03101f]">
      {/* Abertura */}
      <section className="relative pb-8 pt-28 text-center">
        <Reveal className="mx-auto max-w-2xl px-6">
          <p className="text-[10px] uppercase tracking-[0.45em] text-shell-sky/80">Quatro eras · uma vida</p>
          <h1 className="glow-shell mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Do começo <span className="italic text-shell-sky">aos dezoito</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#b9d9ec]/65 sm:text-base">
            Cada momento aqui é real — da menina que defendia as suas ideias à mulher que hoje
            ilumina tudo ao seu redor.
          </p>
        </Reveal>
      </section>

      {/* Eras */}
      <div className="mx-auto max-w-4xl px-4 pb-24">
        {ERAS.map((era) => (
          <section key={era.range} className="mt-14 first:mt-4">
            {/* Cabeçalho da era */}
            <Reveal className="mb-10 text-center">
              <span className="inline-flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-shell-sky/60 sm:w-16" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-shell-sky">{era.range}</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-shell-sky/60 sm:w-16" />
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">{era.title}</h2>
              <p className="mt-2 text-sm italic text-[#b9d9ec]/55">{era.line}</p>
            </Reveal>

            {/* Itens alternados */}
            <div className="space-y-10">
              {era.items.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.url}
                    className={`flex items-start gap-4 sm:gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() =>
                        openLightbox(
                          era.items.map((s) => ({ type: "video" as const, src: s.url })),
                          i
                        )
                      }
                      className={`group w-[45%] text-left sm:w-[42%] ${isLeft ? "sm:text-right" : ""}`}
                    >
                      <div className="royal-frame relative aspect-video overflow-hidden rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_12px_40px_rgba(135,195,227,0.25)]">
                        <img
                          src={videoPoster(item.url)}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="glass grid h-10 w-10 place-items-center rounded-full text-sm text-white opacity-0 transition group-hover:opacity-100">
                            ▶
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-2.5 font-display text-base font-medium text-white transition-colors group-hover:text-shell-sky">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs tracking-wide text-[#b9d9ec]/45">{era.range}</p>
                    </button>

                    {/* Ponto central */}
                    <div className="mt-4 flex flex-shrink-0 flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-shell-sky shadow-[0_0_12px_rgba(135,195,227,0.8)] ring-4 ring-[#03101f]" />
                    </div>

                    <div className="w-[45%] sm:w-[42%]" />
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Fecho */}
        <Reveal className="mt-20 text-center">
          <p className="font-display text-lg italic text-[#b9d9ec]/60">
            “Você ilumina todo mundo com a sua beleza e o seu sorriso.”
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-shell-sky/70">
            …e o próximo capítulo começa agora ✦
          </p>
        </Reveal>
      </div>
    </div>
  );
}
