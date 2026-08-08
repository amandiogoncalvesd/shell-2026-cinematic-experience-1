import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [active, setActive] = useState(sections[0]?.id);
  const { isPlaying, toggle, currentTrack } = useMusic();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Deteta o capítulo visível para iluminar o elo certo da navegação.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: "-38% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

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

        <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className={`relative pb-1 text-xs font-medium uppercase tracking-[0.2em] transition ${
                active === s.id ? "text-white" : "text-ocean-100/70 hover:text-white"
              }`}
            >
              {s.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-ocean-300 to-transparent transition-opacity duration-500 ${
                  active === s.id ? "opacity-100" : "opacity-0"
                }`}
              />
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
          <button
            className="grid h-9 w-9 place-items-center rounded-full glass text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong mx-4 mt-2 flex flex-col gap-1 overflow-hidden rounded-2xl p-4 lg:hidden"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`rounded-lg px-3 py-2 text-left text-sm uppercase tracking-widest transition ${
                  active === s.id ? "bg-white/10 text-white" : "text-ocean-100/80 hover:bg-white/10"
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
