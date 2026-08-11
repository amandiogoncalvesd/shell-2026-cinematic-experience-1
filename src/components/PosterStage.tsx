import FlyingPosters from "./FlyingPosters";
import { useImagePreload } from "../hooks/useImagePreload";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   PosterStage — os Posters Voadores com garantia de carga:
   barra de progresso real enquanto as texturas chegam, e o voo
   só começa quando há posters prontos a voar.
───────────────────────────────────────────────────────────── */
export default function PosterStage({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const { loaded, total, percent, ready } = useImagePreload(items, 6);

  return (
    <div className={`relative ${className}`}>
      {/* O voo só monta quando há posters carregados */}
      {ready && <FlyingPosters items={items} planeWidth={300} planeHeight={400} distortion={3} />}

      {/* Barra de progresso enquanto carregam */}
      <AnimateLoading visible={!ready || loaded < total} percent={percent} loaded={loaded} total={total} />
    </div>
  );
}

function AnimateLoading({
  visible,
  percent,
  loaded,
  total,
}: {
  visible: boolean;
  percent: number;
  loaded: number;
  total: number;
}) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#040f1e]"
    >
      <span className="animate-sparkle text-2xl text-shell-sky">✦</span>
      <p className="text-[10px] uppercase tracking-[0.4em] text-shell-sky/70">
        {percent >= 100 ? "A preparar o voo…" : "A carregar os posters…"}
      </p>
      <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-shell-sky to-shell-lavender"
          animate={{ width: `${percent}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>
      <p className="font-mono text-xs tabular-nums tracking-[0.3em] text-shell-lavender/80">
        {loaded} / {total} · {percent}%
      </p>
    </motion.div>
  );
}
