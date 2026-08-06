import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
  }, [density, color]);

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
