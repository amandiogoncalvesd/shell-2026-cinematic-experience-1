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
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
      >
        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-5 py-3 transition-all duration-500 sm:px-6 ${
            scrolled ? "glass-strong mx-4" : "bg-[#03101f]/0"
          }`}
        >
          {/* Marca real */}
          <button onClick={() => go(sections[0]?.id)} className="group flex shrink-0 items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-sm text-shell-sky transition group-hover:bg-shell-sky/25">
              ❈
              <span className="animate-sparkle absolute -right-1.5 -top-1.5 text-[9px] text-shell-lavender">✦</span>
            </span>
            <span className="font-display text-base font-semibold tracking-wide text-white sm:text-lg">
              {brand}
            </span>
          </button>

          {/* Elos da navegação */}
          <nav className="no-scrollbar hidden items-center gap-4 overflow-x-auto lg:flex xl:gap-5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`relative shrink-0 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition xl:text-[11px] ${
                  active === s.id ? "text-shell-sky" : "text-[#b9d9ec]/65 hover:text-white"
                }`}
              >
                {s.label}
                <AnimatePresence>
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-spark-line"
                      className="absolute inset-x-0 -bottom-0.5 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="h-px w-3/4 bg-gradient-to-r from-transparent via-shell-sky to-transparent" />
                      <span className="absolute -top-[3px] text-[7px] text-shell-sky">✦</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </nav>

          {/* Música + saída + menu */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {currentTrack && (
              <button
                onClick={toggle}
                className="hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] text-ocean-100 transition hover:bg-white/10 sm:flex"
                title={currentTrack.title}
              >
                <span className={`flex gap-[2px] ${isPlaying ? "" : "opacity-40"}`}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-shell-sky"
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
              className="hidden rounded-full border border-shell-sky/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-shell-sky transition hover:bg-shell-sky/15 sm:block"
            >
              {exitLabel}
            </button>
            <button
              className="grid h-10 w-10 place-items-center rounded-full glass text-lg text-shell-sky transition hover:bg-white/10 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu móvel — cortina de vidro em ecrã inteiro */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#03101f]/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-1 overflow-y-auto px-8 pb-10 pt-24">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(s.id)}
                  className={`flex items-center gap-3 rounded-full px-6 py-2.5 font-display text-xl transition ${
                    active === s.id ? "text-shell-sky" : "text-[#b9d9ec]/75 hover:text-white"
                  }`}
                >
                  {active === s.id && <span className="text-xs">✦</span>}
                  {s.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                {currentTrack && (
                  <button
                    onClick={toggle}
                    className="rounded-full glass px-6 py-2.5 text-xs uppercase tracking-widest text-ocean-100"
                  >
                    {isPlaying ? "❚❚ Pausar música" : "▶ Tocar música"}
                  </button>
                )}
                <button
                  onClick={onExit}
                  className="rounded-full border border-shell-sky/40 px-6 py-2.5 text-xs uppercase tracking-widest text-shell-sky"
                >
                  {exitLabel}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
