import { useEffect, useMemo, useRef, useState } from "react";
import { amandioLetter } from "../../data/content";
import { requestImmersiveFullscreen } from "../../utils/fullscreen";

/* ─────────────────────────────────────────────────────────────
   A CARTA — experiência fiel ao livro original (estrelas,
   pétalas, livro 3D, máquina de escrever ao mesmo ritmo),
   com a paleta do universo e sem dependência de iframes.
───────────────────────────────────────────────────────────── */

const FULL_TEXT = amandioLetter.paragraphs.join("\n\n");
const STAR_COLORS = ["#fff", "#D9B8E3", "#9F7CA9", "#87C3E3", "#5A75C2"];
const PETAL_COLORS = ["#DA8BA0", "#9F7CA9", "#D9B8E3", "#87C3E3", "#5A75C2"];

type Particle = { size: number; tx: number; ty: number; dur: number; color: string; x: number; y: number };

export default function CartaPage() {
  const [opened, setOpened] = useState(false);
  const [typed, setTyped] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    requestImmersiveFullscreen();
    window.scrollTo(0, 0);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 120 }).map(() => ({
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        d: (Math.random() * 3 + 2).toFixed(1),
        delay: (Math.random() * 4).toFixed(1),
      })),
    []
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map(() => ({
        left: Math.random() * 100,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        w: Math.random() * 8 + 6,
        h: Math.random() * 12 + 8,
        dur: (Math.random() * 8 + 6).toFixed(1),
        delay: (Math.random() * 8).toFixed(1),
      })),
    []
  );

  // A máquina de escrever — ao mesmo ritmo do original (28ms por letra).
  useEffect(() => {
    if (!opened) return;
    const start = setTimeout(() => {
      let i = 0;
      timerRef.current = setInterval(() => {
        if (i < FULL_TEXT.length) {
          i++;
          setTyped(FULL_TEXT.slice(0, i));
          const el = pageRef.current;
          if (el) el.scrollTop = el.scrollHeight;
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
          setDoneTyping(true);
        }
      }, 28);
    }, 2000);
    return () => {
      clearTimeout(start);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [opened]);

  const openBook = () => {
    if (opened) return;
    setOpened(true);
    // Explosão de partículas, como no original.
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const burst: Particle[] = Array.from({ length: 60 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      return {
        size: Math.random() * 10 + 4,
        color: [...PETAL_COLORS, "#fff"][Math.floor(Math.random() * (PETAL_COLORS.length + 1))],
        x: cx,
        y: cy,
        tx: Math.cos(angle) * (Math.random() * 280 + 60),
        ty: Math.sin(angle) * (Math.random() * 280 + 60),
        dur: Math.random() * 0.8 + 0.8,
      };
    });
    setParticles(burst);
    setTimeout(() => setParticles([]), 2200);
  };

  // Tocar na página enquanto escreve revela tudo num instante.
  const completeNow = () => {
    if (!opened || doneTyping) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setTyped(FULL_TEXT);
    setDoneTyping(true);
    const el = pageRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  return (
    <div className="carta-root relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#03101f]">
      <style>{`
        .carta-root .star{position:absolute;border-radius:50%;opacity:0;animation:carta-twinkle var(--d,3s) var(--delay,0s) infinite ease-in-out;background:var(--c,#fff)}
        @keyframes carta-twinkle{0%,100%{opacity:0;transform:scale(.6)}50%{opacity:1;transform:scale(1)}}
        .carta-root .petal{position:absolute;width:10px;height:16px;border-radius:50% 0 50% 0;opacity:.7;animation:carta-fall linear infinite;pointer-events:none}
        @keyframes carta-fall{0%{transform:translateY(-20px) rotate(0deg);opacity:.7}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
        .carta-root .orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.12;pointer-events:none;animation:carta-drift var(--d) ease-in-out infinite alternate}
        @keyframes carta-drift{0%{transform:translate(0,0)}100%{transform:translate(var(--mx,30px),var(--my,20px))}}
        .carta-root .book{width:340px;height:460px;position:relative;transform-style:preserve-3d;user-select:none}
        @media(min-width:640px){.carta-root .book{width:380px;height:480px}}
        .carta-root .cover-front{position:absolute;inset:0;border-radius:4px 20px 20px 4px;
          background:linear-gradient(135deg,#3E4E90 0%,#5A75C2 50%,#87C3E3 100%);
          transform-origin:left center;transform-style:preserve-3d;
          transition:transform 1.4s cubic-bezier(.7,0,.3,1);
          box-shadow:8px 8px 40px rgba(0,0,0,.7),inset -4px 0 12px rgba(0,0,0,.3);
          z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
        .carta-root .cover-front::before{content:'';position:absolute;inset:12px;border:2px solid rgba(255,255,255,.25);border-radius:2px 14px 14px 2px;pointer-events:none}
        .carta-root .cover-front::after{content:'';position:absolute;left:0;top:0;bottom:0;width:24px;background:linear-gradient(to right,rgba(0,0,0,.4),rgba(0,0,0,.1));border-radius:4px 0 0 4px}
        .carta-root .book.open .cover-front{transform:rotateY(-162deg)}
        .carta-root .cover-ring{position:absolute;width:220px;height:220px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
        .carta-root .cover-ring::before{content:'';position:absolute;inset:16px;border-radius:50%;border:1px solid rgba(255,255,255,.12)}
        .carta-root .cover-deco{position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(circle at 20% 20%,rgba(217,184,227,.25) 0%,transparent 50%),radial-gradient(circle at 80% 80%,rgba(135,195,227,.2) 0%,transparent 50%)}
        .carta-root .cover-rose{font-size:3.5rem;margin-top:18px;animation:carta-float 3s ease-in-out infinite;filter:drop-shadow(0 4px 12px rgba(0,0,0,.3))}
        @keyframes carta-float{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
        .carta-root .pages-block{position:absolute;inset:0;border-radius:4px 20px 20px 4px;
          background:linear-gradient(to right,#e8e0d0 0%,#f5f0e8 4%,#FFF8EE 8%);
          box-shadow:4px 4px 30px rgba(0,0,0,.5);overflow:hidden}
        .carta-root .pages-block::before{content:'';position:absolute;top:0;bottom:0;right:0;left:30px;
          background:repeating-linear-gradient(to bottom,transparent 0px,transparent 27px,rgba(0,0,0,.04) 27px,rgba(0,0,0,.04) 28px)}
        .carta-root .page-inner{position:absolute;inset:0;padding:40px 36px 40px 48px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#87C3E3 transparent}
        .carta-root .page-inner::-webkit-scrollbar{width:4px}
        .carta-root .page-inner::-webkit-scrollbar-thumb{background:#87C3E3;border-radius:2px}
        .carta-root .page-header{text-align:center;margin-bottom:24px;opacity:0;transform:translateY(-10px);transition:opacity .6s,transform .6s}
        .carta-root .book.open .page-header{opacity:1;transform:translateY(0);transition-delay:1.2s}
        .carta-root .page-divider{display:flex;align-items:center;gap:8px;margin:8px 0 20px;justify-content:center;color:#87C3E3;font-size:1.1rem}
        .carta-root .page-divider::before,.carta-root .page-divider::after{content:'';flex:1;height:1px;background:linear-gradient(to right,transparent,#87C3E3,transparent);max-width:80px}
        .carta-root .tw-text{font-family:'Cormorant Garamond',serif;font-size:1.08rem;line-height:1.9;color:#2a1a10;white-space:pre-wrap;min-height:300px;opacity:0;transition:opacity .4s}
        .carta-root .book.open .tw-text{opacity:1;transition-delay:1.6s}
        .carta-root .cursor{display:inline-block;width:2px;height:1.1em;background:#5A75C2;margin-left:2px;vertical-align:text-bottom;animation:carta-blink .7s infinite}
        @keyframes carta-blink{0%,100%{opacity:1}50%{opacity:0}}
        .carta-root .corner{position:absolute;font-size:1.4rem;opacity:.5;pointer-events:none}
        .carta-root .bookmark{position:absolute;top:0;right:40px;width:24px;height:80px;background:linear-gradient(180deg,#DA8BA0,#5A75C2);clip-path:polygon(0 0,100% 0,100% 80%,50% 100%,0 80%);box-shadow:2px 2px 8px rgba(0,0,0,.3);z-index:4}
        .carta-root .particle{position:fixed;border-radius:50%;pointer-events:none;z-index:50;animation:carta-burst var(--dur,1.2s) ease-out forwards}
        @keyframes carta-burst{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0)}}
        .carta-root .hint{margin-top:34px;color:rgba(191,228,247,.6);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1rem;letter-spacing:.1em;animation:carta-pulse 2s ease-in-out infinite;text-align:center}
        @keyframes carta-pulse{0%,100%{opacity:.55}50%{opacity:1}}
        .carta-root .footer-msg{margin-top:14px;font-family:'Great Vibes',cursive;font-size:1.4rem;color:rgba(217,184,227,.65);opacity:0;transition:opacity 1s;white-space:nowrap}
        .carta-root .footer-msg.show{opacity:1;transition-delay:3s}
      `}</style>

      {/* Estrelas */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              width: s.size,
              height: s.size,
              top: `${s.top}%`,
              left: `${s.left}%`,
              ["--c" as any]: s.color,
              ["--d" as any]: `${s.d}s`,
              ["--delay" as any]: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Orbes de luz */}
      <div className="orb" style={{ width: 500, height: 500, background: "#9F7CA9", top: -100, left: -150, ["--d" as any]: "8s", ["--mx" as any]: "40px", ["--my" as any]: "30px" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "#DA8BA0", bottom: -80, right: -100, ["--d" as any]: "10s", ["--mx" as any]: "-30px", ["--my" as any]: "-40px" }} />
      <div className="orb" style={{ width: 300, height: 300, background: "#D9B8E3", top: "50%", left: "60%", ["--d" as any]: "7s", ["--mx" as any]: "20px", ["--my" as any]: "-20px" }} />

      {/* Pétalas */}
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.w,
            height: p.h,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* O livro */}
      <div style={{ perspective: "1400px" }} className="relative z-10 pt-20">
        <div className={`book ${opened ? "open" : ""}`} style={{ cursor: opened ? "default" : "pointer" }} onClick={opened ? completeNow : openBook}>
          <div className="pages-block">
            <div className="page-inner" ref={pageRef}>
              <div className="page-header">
                <h2
                  className="text-4xl"
                  style={{ fontFamily: "'Great Vibes', cursive", color: "#5A75C2", textShadow: "0 1px 8px rgba(90,117,194,.2)" }}
                >
                  Para Shelcia
                </h2>
                <div className="page-divider">
                  <span>✦</span>
                  <span>🌸</span>
                  <span>✦</span>
                </div>
              </div>
              <div className="tw-text">
                {typed}
                {opened && !doneTyping && <span className="cursor" />}
              </div>
            </div>
            <span className="corner" style={{ top: 14, left: 40 }}>🌸</span>
            <span className="corner" style={{ top: 14, right: 14 }}>✨</span>
            <span className="corner" style={{ bottom: 14, left: 40 }}>✨</span>
            <span className="corner" style={{ bottom: 14, right: 14 }}>🌸</span>
          </div>

          <div className="cover-front">
            <div className="cover-deco" />
            <div className="cover-ring" />
            <div style={{ textAlign: "center", zIndex: 1, padding: 20 }}>
              <h1
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "3.2rem",
                  color: "#fff",
                  textShadow: "0 2px 20px rgba(0,0,0,.4), 0 0 60px rgba(191,228,247,.5)",
                  lineHeight: 1.1,
                }}
              >
                Para
                <br />
                Shelcia
              </h1>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(255,255,255,.8)", fontSize: "1.05rem", marginTop: 10, letterSpacing: ".15em" }}>
                — uma carta especial —
              </p>
              <div className="cover-rose">🌹</div>
            </div>
          </div>

          <div className="bookmark" />
        </div>
      </div>

      {/* Indicação + fecho */}
      {!opened && <div className="hint relative z-10">✦ Clique no livro para abrir ✦</div>}
      {opened && !doneTyping && (
        <div className="hint relative z-10" style={{ fontSize: ".85rem" }}>
          toca na página para revelar tudo
        </div>
      )}
      <div className={`footer-msg relative z-10 ${opened ? "show" : ""}`}>Com amor, no seu dia especial 🎂</div>

      {/* Partículas */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: p.x,
            top: p.y,
            ["--tx" as any]: `${p.tx}px`,
            ["--ty" as any]: `${p.ty}px`,
            ["--dur" as any]: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
