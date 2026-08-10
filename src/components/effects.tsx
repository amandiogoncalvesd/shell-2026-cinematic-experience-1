import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { isCinema, onCinema } from "./cinemaLock";

/* ---------------------------------------------------------
   CanvasParticles — crystalline sparkles / bokeh drifting up
--------------------------------------------------------- */
export function CanvasParticles({
  density = 70,
  className = "",
  color = "173, 224, 255",
}: {
  density?: number;
  className?: string;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);

    const particles = Array.from({ length: density }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 * devicePixelRatio + 0.4,
      vy: (Math.random() * 0.35 + 0.08) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.15 * devicePixelRatio,
      alpha: Math.random() * 0.6 + 0.15,
      tw: Math.random() * Math.PI * 2,
    }));

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    const render = () => {
      // Em modo cinema as partículas descansam — só o vídeo trabalha.
      if (isCinema()) {
        raf = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.tw) * 0.15;
        p.tw += 0.01;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        const flicker = (Math.sin(p.tw * 2) + 1) / 2;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${p.alpha * (0.4 + flicker * 0.6)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density, color, reduced]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

/* ---------------------------------------------------------
   LiquidBlobs — soft animated glass blobs (decorative)
--------------------------------------------------------- */
export function LiquidBlobs({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="animate-drift absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-ocean-300/30 via-ocean-500/10 to-transparent blur-3xl" />
      <div
        className="animate-drift absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-ocean-200/25 via-ocean-400/10 to-transparent blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-drift absolute bottom-[-10rem] left-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-white/10 via-ocean-300/15 to-transparent blur-3xl"
        style={{ animationDelay: "-11s" }}
      />
    </div>
  );
}

/* ---------------------------------------------------------
   VideoText — text filled with a playing video via SVG mask
--------------------------------------------------------- */
export function VideoText({
  text,
  videoSrc,
  className = "",
  fontSize = 100,
  id,
}: {
  text: string;
  videoSrc: string;
  className?: string;
  fontSize?: number;
  id: string;
}) {
  return (
    <svg viewBox="0 0 1000 240" className={className} preserveAspectRatio="xMidYMid meet">
      <defs>
        <mask id={`mask-${id}`}>
          <rect width="100%" height="100%" fill="black" />
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Playfair Display, serif"
            fontWeight={800}
            fontSize={fontSize}
            fill="white"
            letterSpacing="4"
          >
            {text}
          </text>
        </mask>
      </defs>
      <foreignObject width="100%" height="100%" mask={`url(#mask-${id})`}>
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </foreignObject>
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Playfair Display, serif"
        fontWeight={800}
        fontSize={fontSize}
        fill="none"
        stroke="rgba(180,225,255,0.35)"
        strokeWidth={1}
        letterSpacing="4"
      >
        {text}
      </text>
    </svg>
  );
}

/* ---------------------------------------------------------
   Reveal — scroll-triggered fade/rise, cinematic easing
--------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Parallax — translate a layer based on scroll progress
--------------------------------------------------------- */
export function Parallax({
  children,
  speed = 0.2,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function useSectionScroll(ref: React.RefObject<HTMLElement | null>) {
  return useScroll({ target: ref, offset: ["start end", "end start"] });
}

export function fadeScale(scrollYProgress: MotionValue<number>) {
  return {
    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]),
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]),
  };
}

/* ---------------------------------------------------------
   FilmGrain — textura de película, cinema em toda a tela.
   Desaparece em modo cinema para não roubar GPU ao vídeo.
--------------------------------------------------------- */
export function FilmGrain({ opacity = 0.045 }: { opacity?: number }) {
  const [cinema, setCinemaState] = useState(false);
  useEffect(() => onCinema(setCinemaState), []);
  return <div aria-hidden className="film-grain" style={{ opacity: cinema ? 0 : opacity, animationPlayState: cinema ? "paused" : "running" }} />;
}

/* ---------------------------------------------------------
   CursorGlow — uma auréola de luz suave que segue o cursor
--------------------------------------------------------- */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [cinema, setCinemaState] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => onCinema(setCinemaState), []);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 55, damping: 18, mass: 0.6 });

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 210);
      y.set(e.clientY - 210);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled || reduced || cinema) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[45] h-[420px] w-[420px] rounded-full"
      style={{
        x: sx,
        y: sy,
        background: "radial-gradient(circle, rgba(108,198,255,0.09) 0%, rgba(108,198,255,0.035) 40%, transparent 65%)",
      }}
    />
  );
}

/* ---------------------------------------------------------
   ScrollProgress — fio de luz que mede a viagem pelo filme
--------------------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[85] h-[3px] origin-left bg-gradient-to-r from-ocean-200 via-ocean-400 to-ocean-600"
      style={{ scaleX }}
    />
  );
}

/* ---------------------------------------------------------
   SectionDock — bússola lateral de capítulos (desktop)
--------------------------------------------------------- */
export function SectionDock({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: "-42% 0px -52% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <motion.nav
      aria-label="Capítulos"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass fixed right-5 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full px-2.5 py-5 xl:flex"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => go(s.id)}
          title={s.label}
          aria-label={s.label}
          className="group relative flex items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-500 ${
              active === s.id
                ? "h-5 w-[5px] bg-gradient-to-b from-ocean-200 to-ocean-500 shadow-[0_0_12px_rgba(108,198,255,0.8)]"
                : "h-[5px] w-[5px] bg-ocean-200/40 group-hover:bg-ocean-200/80"
            }`}
          />
          <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ocean-100 opacity-0 transition duration-300 group-hover:opacity-100">
            {s.label}
          </span>
        </button>
      ))}
    </motion.nav>
  );
}

/* ---------------------------------------------------------
   Countdown — contagem decrescente para o dia 10 de Agosto
--------------------------------------------------------- */
const BIRTHDAY = new Date("2026-08-10T00:00:00");
const BIRTHDAY_END = new Date("2026-08-11T00:00:00");

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = BIRTHDAY.getTime() - now.getTime();

  if (now >= BIRTHDAY && now < BIRTHDAY_END) {
    return (
      <div className={`glass shimmer-border inline-flex items-center gap-3 rounded-full ${compact ? "px-5 py-2" : "px-7 py-3"}`}>
        <span className="animate-pulse-glow text-lg text-ocean-200">✦</span>
        <span className="font-display text-sm font-semibold tracking-wide text-white sm:text-base">
          Hoje é o dia — a Cinderela faz 18!
        </span>
        <span className="animate-pulse-glow text-lg text-ocean-200">✦</span>
      </div>
    );
  }

  if (now >= BIRTHDAY_END) {
    return (
      <div className={`glass inline-flex items-center gap-3 rounded-full ${compact ? "px-5 py-2" : "px-7 py-3"}`}>
        <span className="text-ocean-200">❈</span>
        <span className="text-xs uppercase tracking-[0.3em] text-ocean-100/80">O novo capítulo começou</span>
      </div>
    );
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const units = [
    { v: d, l: "dias" },
    { v: h, l: "horas" },
    { v: m, l: "min" },
    { v: s, l: "seg" },
  ];

  return (
    <div className="inline-flex flex-col items-center gap-2">
      {!compact && (
        <span className="text-[10px] uppercase tracking-[0.4em] text-ocean-300/60">Contagem para 10 de Agosto</span>
      )}
      <div className="glass flex items-center gap-2 rounded-full px-5 py-2.5 sm:gap-3 sm:px-6">
        {units.map((u, i) => (
          <span key={u.l} className="flex items-baseline gap-1.5">
            {i > 0 && <span className="mr-1.5 text-ocean-300/40 sm:mr-3">·</span>}
            <span className="font-display text-lg font-bold tabular-nums text-white sm:text-xl">
              {String(u.v).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-ocean-300/60">{u.l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
