import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMusic } from "../audio/MusicProvider";

/* Botão flutuante de música — jóia de vidro líquido que pulsa com a melodia. */
export default function FloatingMusic() {
  const { isPlaying, toggle, next, currentTrack } = useMusic();
  const [hover, setHover] = useState(false);

  if (!currentTrack) return null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-[75]"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        className="glass-strong shimmer-border flex h-14 items-center gap-3 overflow-hidden rounded-full pl-4 pr-4"
      >
        <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-shell-sky/15">
          {isPlaying ? (
            <span className="flex items-end gap-[2.5px]">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-shell-sky"
                  style={{ height: 14, animation: `pulse-glow ${0.5 + i * 0.18}s ease-in-out infinite` }}
                />
              ))}
            </span>
          ) : (
            <span className="text-sm text-shell-sky">❈</span>
          )}
          {isPlaying && (
            <span className="animate-ping-slow absolute inset-0 rounded-full border border-shell-sky/40" />
          )}
        </span>
        <AnimatePresence>
          {hover && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-nowrap text-left"
            >
              <span className="block max-w-[180px] truncate text-xs font-medium text-white">
                {currentTrack.title}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.25em] text-shell-sky/70">
                {isPlaying ? "Pausar ✦" : "Tocar ✦"}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
        {hover && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Próxima música"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                next();
              }
            }}
            className="shrink-0 rounded-full border border-shell-sky/30 px-2 py-1 text-[10px] text-shell-sky transition hover:bg-shell-sky/20"
          >
            ❯❯
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}
