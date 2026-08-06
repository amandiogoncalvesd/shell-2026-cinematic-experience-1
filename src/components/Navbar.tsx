import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMusic } from "../audio/MusicProvider";

export interface NavSection {
  id: string;
  label: string;
}

export default function Navbar({
  sections,
  brand,
  onExit,
  exitLabel = "Portal",
}: {
  sections: NavSection[];
  brand: string;
  onExit: () => void;
  exitLabel?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isPlaying, toggle, currentTrack } = useMusic();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 sm:px-8 ${
          scrolled ? "glass-strong mx-4" : "bg-transparent"
        }`}
      >
        <button onClick={() => go(sections[0]?.id)} className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-ocean-200/40 text-xs text-ocean-200">
            ❈
          </span>
          <span className="font-display text-lg font-semibold tracking-wide text-white">{brand}</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="text-xs font-medium uppercase tracking-[0.2em] text-ocean-100/70 transition hover:text-white"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {currentTrack && (
            <button
              onClick={toggle}
              className="hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] text-ocean-100 sm:flex"
              title={currentTrack.title}
            >
              <span className={`flex gap-[2px] ${isPlaying ? "" : "opacity-40"}`}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-ocean-300"
                    style={{
                      height: 10,
                      animation: isPlaying ? `pulse-glow ${0.6 + i * 0.2}s ease-in-out infinite` : "none",
                    }}
                  />
                ))}
              </span>
              {isPlaying ? "Pausar" : "Tocar"}
            </button>
          )}
          <button
            onClick={onExit}
            className="rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-ocean-100 transition hover:bg-white/10"
          >
            {exitLabel}
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-full glass text-white lg:hidden" onClick={() => setOpen((o) => !o)}>
            ☰
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-strong mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 lg:hidden"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="rounded-lg px-3 py-2 text-left text-sm uppercase tracking-widest text-ocean-100/80 hover:bg-white/10"
            >
              {s.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
