import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

/* ---------------------------------------------------------
   Lightbox context (very small, global overlay)
--------------------------------------------------------- */
type LightboxItem = { type: "photo" | "video"; src: string; caption?: string };
interface LightboxState {
  items: LightboxItem[];
  index: number;
}
let externalSetLightbox: ((s: LightboxState | null) => void) | null = null;

export function openLightbox(items: LightboxItem[], index = 0) {
  externalSetLightbox?.({ items, index });
}

export function LightboxHost() {
  const [state, setState] = useState<LightboxState | null>(null);
  useEffect(() => {
    externalSetLightbox = setState;
    return () => {
      externalSetLightbox = null;
    };
  }, []);

  const close = useCallback(() => setState(null), []);
  const next = useCallback(
    () => setState((s) => (s ? { ...s, index: (s.index + 1) % s.items.length } : s)),
    []
  );
  const prev = useCallback(
    () => setState((s) => (s ? { ...s, index: (s.index - 1 + s.items.length) % s.items.length } : s)),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!state) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, close, next, prev]);

  if (!state) return null;
  const current = state.items[state.index];

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-[#040f1e]/92 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
      >
        <button
          className="absolute right-6 top-6 z-10 grid h-11 w-11 place-items-center rounded-full glass text-ocean-100 transition hover:scale-110"
          onClick={close}
          aria-label="Fechar"
        >
          ✕
        </button>
        {state.items.length > 1 && (
          <>
            <button
              className="absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full glass text-2xl text-ocean-100 transition hover:scale-110 md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full glass text-2xl text-ocean-100 transition hover:scale-110 md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              ›
            </button>
          </>
        )}
        <motion.div
          key={state.index}
          className="relative mx-6 max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl shimmer-border"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {current.type === "photo" ? (
            <img src={current.src} alt="" className="max-h-[85vh] w-auto object-contain" />
          ) : (
            <video
              src={current.src}
              className="max-h-[85vh] w-auto"
              controls
              autoPlay
              playsInline
              loop
            />
          )}
          {current.caption && (
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-ocean-100">
              {current.caption}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ---------------------------------------------------------
   PhotoStage — the single, unified crossfade transition
   used everywhere a photo changes automatically.
--------------------------------------------------------- */
export function PhotoStage({
  photos,
  interval = 3200,
  energy = 0,
  className = "",
  imgClassName = "",
  kenBurns = true,
  onClickOpen = true,
}: {
  photos: string[];
  interval?: number;
  energy?: number;
  className?: string;
  imgClassName?: string;
  kenBurns?: boolean;
  onClickOpen?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const list = useMemo(() => photos.filter(Boolean), [photos]);

  useEffect(() => {
    if (list.length < 2) return;
    const speedFactor = 1 / (1 + energy * 2.2);
    const id = setTimeout(() => setIndex((i) => (i + 1) % list.length), interval * speedFactor);
    return () => clearTimeout(id);
  }, [index, list.length, interval, energy]);

  if (!list.length) return null;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={() =>
        onClickOpen &&
        openLightbox(
          list.map((s) => ({ type: "photo", src: s })),
          index
        )
      }
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={list[index]}
          src={list[index]}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          initial={{ opacity: 0, scale: kenBurns ? 1.08 : 1 }}
          animate={{ opacity: 1, scale: kenBurns ? 1.0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: interval / 1000 + 1, ease: "linear" } }}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
    </div>
  );
}

/* ---------------------------------------------------------
   AutoMosaic — a living wall of many photos, tiles
   independently crossfading to keep everything in motion.
--------------------------------------------------------- */
export function AutoMosaic({
  photos,
  tiles = 12,
  className = "",
  energy = 0,
}: {
  photos: string[];
  tiles?: number;
  className?: string;
  energy?: number;
}) {
  const buckets = useMemo(() => {
    const arr: string[][] = Array.from({ length: tiles }, () => []);
    photos.forEach((p, i) => arr[i % tiles].push(p));
    return arr;
  }, [photos, tiles]);

  const sizes = useMemo(
    () =>
      Array.from({ length: tiles }, (_, i) =>
        i % 7 === 0 ? "row-span-2 col-span-2" : i % 5 === 0 ? "col-span-2" : ""
      ),
    [tiles]
  );

  return (
    <div className={`grid auto-rows-[110px] grid-cols-4 gap-2 sm:auto-rows-[140px] sm:grid-cols-6 md:gap-3 ${className}`}>
      {buckets.map((set, i) => (
        <div key={i} className={`relative overflow-hidden rounded-xl ${sizes[i]}`}>
          <PhotoStage
            photos={set}
            interval={2600 + (i % 5) * 500}
            energy={energy}
            className="h-full w-full"
            onClickOpen={false}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   MediaCarousel — fluid horizontal row (Netflix-style),
   drifting slowly, pause on hover, click to open lightbox.
--------------------------------------------------------- */
export function MediaCarousel({
  photos,
  height = "h-64",
  auto = true,
}: {
  photos: string[];
  height?: string;
  auto?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const doubled = useMemo(() => [...photos, ...photos], [photos]);

  useEffect(() => {
    if (!auto) return;
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    const step = () => {
      if (!paused) {
        track.scrollLeft += 0.6;
        if (track.scrollLeft >= track.scrollWidth / 2) track.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused, auto]);

  return (
    <div
      ref={trackRef}
      className={`no-scrollbar mask-fade-x flex gap-4 overflow-x-auto ${height}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {doubled.map((src, i) => (
        <motion.div
          key={i}
          className="group relative aspect-[3/4] h-full shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-lg shadow-black/40"
          whileHover={{ scale: 1.045, zIndex: 5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() =>
            openLightbox(
              photos.map((s) => ({ type: "photo", src: s })),
              i % photos.length
            )
          }
        >
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:brightness-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute inset-0 opacity-0 shimmer-border rounded-2xl transition group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   VideoCard — autoplay-when-in-view video preview
--------------------------------------------------------- */
export function VideoCard({
  src,
  poster,
  playlist,
  index = 0,
  className = "aspect-video",
}: {
  src: string;
  poster?: string;
  playlist?: string[];
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.6),
      { threshold: [0, 0.6, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={wrapRef}
      className={`group relative shrink-0 overflow-hidden rounded-2xl bg-ocean-950 shadow-xl shadow-black/50 ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() =>
        openLightbox(
          (playlist ?? [src]).map((s) => ({ type: "video" as const, src: s })),
          index
        )
      }
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full cursor-pointer object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
        <div className="grid h-14 w-14 place-items-center rounded-full glass-strong text-2xl text-white">▶</div>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-1 text-[10px] uppercase tracking-widest text-ocean-100 backdrop-blur">
        {inView ? "● reproduzindo" : "vídeo"}
      </span>
    </motion.div>
  );
}
