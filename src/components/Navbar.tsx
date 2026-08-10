import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMusic } from "../audio/MusicProvider";
import { audioTracks } from "../data/videos";

export interface NavSection {
  id: string;
  label: string;
}

export interface NavPage {
  id: string;
  label: string;
  emblem: string;
  desc?: string;
}

/* ─────────────────────────────────────────────────────────────
   A barra de navegação real — fina como uma tiara de cristal.
   Módulo 1: capítulos da mesma página (fita discreta ao centro).
   Módulo 2: páginas diferentes (espelho mágico, à direita).
───────────────────────────────────────────────────────────── */
export default function Navbar({
  sections,
  pages,
  activePage,
  onPage,
  onAnchor,
  brand,
  onExit,
  exitLabel = "Portal",
}: {
  sections: NavSection[];
  pages?: NavPage[];
  activePage?: string;
  onPage?: (id: string) => void;
  onAnchor?: (id: string) => void;
  brand: string;
  onExit: () => void;
  exitLabel?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [active, setActive] = useState(sections[0]?.id);
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const { isPlaying, toggle, play, currentTrack } = useMusic();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o espelho de páginas ao clicar fora dele.
  useEffect(() => {
    if (!pagesOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (pagesRef.current && !pagesRef.current.contains(e.target as Node)) setPagesOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [pagesOpen]);

  // Deteta o capítulo visível para iluminar o elo certo.
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

  const goAnchor = (id: string) => {
    setOpen(false);
    if (onAnchor) onAnchor(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const goPage = (id: string) => {
    setPagesOpen(false);
    setOpen(false);
    onPage?.(id);
  };

  const currentPage = pages?.find((p) => p.id === activePage);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-1.5" : "py-3"}`}
      >
        <div
          className={`mx-auto flex h-11 max-w-[92rem] items-center gap-3 rounded-full px-3 transition-all duration-500 sm:h-12 sm:px-4 ${
            scrolled ? "glass-strong mx-3 sm:mx-6" : "mx-3 bg-[#03101f]/30 backdrop-blur-md sm:mx-6"
          }`}
        >
          {/* ── Marca real ── */}
          <button onClick={() => goAnchor(sections[0]?.id)} className="group flex shrink-0 items-center gap-2" aria-label="Início">
            <span className="relative grid h-7 w-7 place-items-center rounded-full border border-shell-sky/60 bg-shell-sky/10 text-[11px] text-shell-sky transition duration-500 group-hover:rotate-45 group-hover:bg-shell-sky/25">
              ❈
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-wide text-white md:block">
              {brand}
            </span>
          </button>

          <span className="h-5 w-px bg-white/10" />

          {/* ── MÓDULO 1 · fita de capítulos (mesma página) ── */}
          <nav className="no-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto" aria-label="Capítulos">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => goAnchor(s.id)}
                className={`relative shrink-0 rounded-full px-2 py-1 text-[9px] font-medium uppercase tracking-[0.14em] transition-all duration-400 sm:px-2.5 sm:text-[10px] ${
                  active === s.id
                    ? "bg-shell-sky/15 text-shell-sky"
                    : "text-[#b9d9ec]/45 hover:bg-white/5 hover:text-[#dceefb]"
                }`}
              >
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="chapter-spark"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[6px] text-shell-lavender"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    ✦
                  </motion.span>
                )}
              </button>
            ))}
          </nav>

          {/* ── MÓDULO 2 · espelho mágico de páginas ── */}
          {pages && pages.length > 0 && (
            <div ref={pagesRef} className="relative hidden shrink-0 items-center lg:flex">
              <span className="mx-1 h-5 w-px bg-gradient-to-b from-transparent via-shell-sky/40 to-transparent" />
              <button
                onClick={() => setPagesOpen((o) => !o)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                  pagesOpen
                    ? "border-shell-sky/70 bg-shell-sky/20 text-white"
                    : "border-shell-sky/30 text-shell-sky hover:border-shell-sky/60 hover:bg-shell-sky/10"
                }`}
                aria-expanded={pagesOpen}
              >
                <span>{currentPage?.emblem ?? "✦"}</span>
                {currentPage?.label ?? "Páginas"}
                <span className={`text-[7px] transition-transform duration-300 ${pagesOpen ? "rotate-180" : ""}`}>▼</span>
              </button>

              <AnimatePresence>
                {pagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-strong absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl p-1.5"
                  >
                    <p className="px-3 pb-1 pt-2 text-[8px] uppercase tracking-[0.35em] text-shell-sky/50">
                      Viajar entre páginas ✦
                    </p>
                    {pages.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => goPage(p.id)}
                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                          activePage === p.id ? "bg-shell-sky/15" : "hover:bg-white/5"
                        }`}
                      >
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm transition ${
                            activePage === p.id
                              ? "border-shell-sky bg-shell-sky/20 text-shell-sky"
                              : "border-shell-sky/30 text-shell-sky/60 group-hover:text-shell-sky"
                          }`}
                        >
                          {p.emblem}
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-xs font-semibold ${activePage === p.id ? "text-white" : "text-[#dceefb]/85"}`}>
                            {p.label}
                          </span>
                          {p.desc && (
                            <span className="block truncate text-[9px] text-[#b9d9ec]/45">{p.desc}</span>
                          )}
                        </span>
                        {activePage === p.id && <span className="ml-auto text-[9px] text-shell-sky">✦</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ── Controlo de música (o utilizador decide quando toca) ── */}
          <button
            onClick={() => (currentTrack ? toggle() : play(audioTracks[0]))}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 transition hover:border-shell-sky/50 hover:bg-shell-sky/10"
            title={currentTrack?.title ?? "Tocar música"}
            aria-label={isPlaying ? "Pausar música" : "Tocar música"}
          >
            {isPlaying ? (
              <span className="flex items-end gap-[2px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[2.5px] rounded-full bg-shell-sky"
                    style={{ height: 9, animation: `pulse-glow ${0.6 + i * 0.2}s ease-in-out infinite` }}
                  />
                ))}
              </span>
            ) : (
              <span className="text-[10px] text-shell-sky/70">♪</span>
            )}
          </button>

          {/* ── Sair ── */}
          <button
            onClick={onExit}
            className="hidden shrink-0 items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b9d9ec]/60 transition hover:border-shell-sky/50 hover:text-shell-sky sm:flex"
          >
            ← {exitLabel}
          </button>

          {/* ── Menu móvel ── */}
          <button
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-sm text-shell-sky transition hover:bg-shell-sky/10 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.header>

      {/* ── Menu móvel — salão real, organizado em blocos ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#03101f]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-md flex-col justify-center gap-8 px-6 pb-12 pt-24">
              {/* Páginas — cartões reais */}
              {pages && pages.length > 0 && (
                <div>
                  <p className="mb-3 text-center text-[9px] uppercase tracking-[0.4em] text-shell-sky/50">
                    ✦ Viajar entre páginas ✦
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {pages.map((p, i) => (
                      <motion.button
                        key={p.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => goPage(p.id)}
                        className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 transition ${
                          activePage === p.id
                            ? "border-shell-sky/70 bg-shell-sky/15 shadow-[0_0_24px_rgba(135,195,227,0.2)]"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <span className={`text-xl ${activePage === p.id ? "text-shell-sky" : "text-shell-sky/60"}`}>
                          {p.emblem}
                        </span>
                        <span className={`text-center text-[10px] font-semibold uppercase tracking-[0.1em] ${activePage === p.id ? "text-white" : "text-[#b9d9ec]/70"}`}>
                          {p.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <div className="crystal-divider mt-6" />
                </div>
              )}

              {/* Capítulos — grelha de constelações */}
              <div>
                <p className="mb-3 text-center text-[9px] uppercase tracking-[0.4em] text-shell-sky/50">
                  ✦ Nesta página ✦
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {sections.map((s, i) => (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i + 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => goAnchor(s.id)}
                      className={`rounded-full border px-2 py-2 text-[9px] font-medium uppercase tracking-[0.12em] transition ${
                        active === s.id
                          ? "border-shell-sky/70 bg-shell-sky/15 text-shell-sky"
                          : "border-white/10 text-[#b9d9ec]/55"
                      }`}
                    >
                      {s.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Controlo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-3"
              >
                <button
                  onClick={() => (currentTrack ? toggle() : play(audioTracks[0]))}
                  className="rounded-full glass px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-ocean-100"
                >
                  {isPlaying ? "❚❚ Música" : "♪ Música"}
                </button>
                <button
                  onClick={onExit}
                  className="rounded-full border border-shell-sky/40 px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-shell-sky"
                >
                  ← {exitLabel}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
