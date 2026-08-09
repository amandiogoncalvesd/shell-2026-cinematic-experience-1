import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PhotoStage, SmartImg, openLightbox } from "./media";
import { Reveal } from "./effects";
import { thumb } from "../utils/cloudinary";

/* ---------------------------------------------------------
   Framemation — framemations: molduras reais (estilo
   Cinderela) onde as fotografias nunca ficam paradas:
   cada moldura balança suavemente e as fotos dentro dela
   trocam sozinhas num crossfade limpo, sem distrações.
--------------------------------------------------------- */
export function Framemation({
  photos,
  frames = 8,
  energy = 0,
  className = "",
  aspect = "aspect-[3/4]",
}: {
  photos: string[];
  frames?: number;
  energy?: number;
  className?: string;
  aspect?: string;
}) {
  const count = Math.max(1, Math.min(frames, photos.length));

  const buckets = useMemo(() => {
    const arr: string[][] = Array.from({ length: count }, () => []);
    photos.forEach((p, i) => arr[i % count].push(p));
    return arr;
  }, [photos, count]);

  return (
    <div className={`grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 ${className}`}>
      {buckets.map((set, i) => (
        <Reveal key={i} delay={(i % 4) * 0.08}>
          <motion.div
            className="animate-sway"
            style={{ animationDelay: `${(i % 5) * -1.8}s` }}
            whileHover={{ scale: 1.035, y: -6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="royal-frame rounded-2xl p-2">
              <PhotoStage
                photos={set}
                interval={3000 + (i % 4) * 600}
                energy={energy}
                kenBurns={false}
                className={`${aspect} w-full rounded-xl`}
              />
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   ScrollCinema — galeria imersiva conduzida pelo scroll:
   enquanto o utilizador desce a página, filas de fotografias
   deslizam horizontalmente em velocidades diferentes
   (parallax real). Cada foto respira lentamente — nada parado.
--------------------------------------------------------- */
export function ScrollCinema({
  rows,
  height = "240vh",
}: {
  rows: { photos: string[]; reverse?: boolean; speed?: number; heightClass?: string; label?: string }[];
  height?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-5 overflow-hidden py-10">
        {rows.map((row, ri) => (
          <CinemaRow
            key={ri}
            photos={row.photos}
            progress={scrollYProgress}
            reverse={row.reverse}
            speed={row.speed ?? 0.5}
            heightClass={row.heightClass ?? "h-52 sm:h-64"}
            label={row.label}
          />
        ))}
      </div>
    </div>
  );
}

function CinemaRow({
  photos,
  progress,
  reverse = false,
  speed = 0.5,
  heightClass = "h-56",
  label,
}: {
  photos: string[];
  progress: MotionValue<number>;
  reverse?: boolean;
  speed?: number;
  heightClass?: string;
  label?: string;
}) {
  const doubled = useMemo(() => [...photos, ...photos], [photos]);
  const range = 42 * speed;
  const x = useTransform(progress, [0, 1], reverse ? [`${-range}%`, "2%"] : ["2%", `${-range}%`]);

  return (
    <div className="relative">
      {label && (
        <span className="absolute -top-7 left-8 z-10 text-[10px] uppercase tracking-[0.4em] text-shell-sky/80">
          ✦ {label}
        </span>
      )}
      <motion.div className={`flex gap-4 sm:gap-5 ${heightClass}`} style={{ x }}>
        {doubled.map((src, i) => (
          <div
            key={i}
            className="royal-frame group relative aspect-[3/4] h-full shrink-0 cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => openLightbox(photos.map((s) => ({ type: "photo" as const, src: s })), i % photos.length)}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[14px]">
              <SmartImg
                src={thumb(src, 800)}
                className="animate-breathe h-full w-full object-cover transition duration-700 group-hover:brightness-110"
                style={{ animationDelay: `${(i % 7) * -2.3}s` }}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-t from-[#03101f]/45 via-transparent to-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------
   DriftGallery — fotografias que flutuam como pétalas,
   cada uma com o seu ritmo, reveladas pelo scroll.
--------------------------------------------------------- */
export function DriftGallery({
  photos,
  className = "",
}: {
  photos: string[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 ${className}`}>
      {photos.map((src, i) => (
        <motion.div
          key={src + i}
          className="animate-floaty cursor-pointer"
          style={{ animationDelay: `${(i % 6) * -1.4}s`, animationDuration: `${6 + (i % 4)}s` }}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.07, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
          transition={{ duration: 0.7, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => openLightbox(photos.map((s) => ({ type: "photo" as const, src: s })), i)}
        >
          <div className="royal-frame overflow-hidden rounded-xl p-1">
            <div className="overflow-hidden rounded-lg">
              <SmartImg src={thumb(src, 600)} className="animate-breathe aspect-square h-full w-full object-cover" style={{ animationDelay: `${(i % 5) * -3}s` }} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
