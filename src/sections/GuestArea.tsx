import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { CanvasParticles, Countdown, CursorGlow, FilmGrain, LiquidBlobs, Parallax, Reveal, ScrollProgress, SectionDock, VideoText } from "../components/effects";
import { AutoMosaic, LightboxHost, MediaCarousel, PhotoStage, VideoCard, openLightbox } from "../components/media";
import { SectionHeading, GlassButton, Kicker } from "../components/ui";
import { useMusic } from "../audio/MusicProvider";
import {
  featured,
  familyFriends2026,
  ruthCeremony,
  ruthMoments,
  familyFriendsAlbum,
  memories,
  guestPhotos,
} from "../data/photos";
import { videoRuthMoments, videoTop, audioTracks, guestVideos } from "../data/videos";
import { guestMessages } from "../data/content";

const SECTIONS = [
  { id: "g-hero", label: "Início" },
  { id: "g-momentos", label: "Melhores Momentos" },
  { id: "g-familia", label: "Família & Amigos" },
  { id: "g-mosaico", label: "Mosaico" },
  { id: "g-videos", label: "Vídeos" },
  { id: "g-cartas", label: "Mensagens" },
  { id: "g-shelcia", label: "Shelcia" },
];

export default function GuestArea({ onGoPrivate, onExitPortal }: { onGoPrivate: () => void; onExitPortal: () => void }) {
  const { play, energy } = useMusic();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      play(audioTracks[0]);
    }
    window.scrollTo(0, 0);
  }, [play]);

  return (
    <div className="relative bg-[#03101f]">
      <LightboxHost />
      <ScrollProgress />
      <FilmGrain />
      <CursorGlow />
      <SectionDock sections={SECTIONS} />
      <Navbar sections={SECTIONS} brand="Shell 2026 · Convidados" onExit={onExitPortal} exitLabel="← Portal" />

      {/* HERO */}
      <section id="g-hero" ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <PhotoStage photos={featured} interval={4200} energy={energy} className="h-full w-full" onClickOpen={false} kenBurns />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/60 via-[#03101f]/50 to-[#03101f]" />
        </div>
        <LiquidBlobs />
        <CanvasParticles density={60} />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <Kicker>Celebração · 18 Anos</Kicker>
          <VideoText
            id="guest-hero"
            text="SHELL 2026"
            videoSrc={videoRuthMoments[0]}
            className="w-[92vw] max-w-3xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-xl text-sm leading-relaxed text-ocean-100/70 sm:text-base"
          >
            Bem-vindo à galeria de celebração de Shelcia Fernanda Neves Van-Dúnem. Uma coleção viva de
            memórias, amizades e momentos que mereciam ser eternizados.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
            <Countdown />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <GlassButton variant="solid" onClick={() => document.getElementById("g-momentos")?.scrollIntoView({ behavior: "smooth" })}>
              Explorar a Galeria ↓
            </GlassButton>
          </motion.div>
        </div>
      </section>

      {/* MELHORES MOMENTOS */}
      <section id="g-momentos" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            kicker="Capítulo I"
            title="Melhores Momentos de 2026"
            subtitle="Risadas, cerimónias e instantes que só acontecem uma vez — Shelcia e Ruth, para sempre bestas."
          />
        </div>
        <div className="mt-12 space-y-6">
          <MediaCarousel photos={ruthMoments} height="h-72" />
          <MediaCarousel photos={ruthCeremony} height="h-56" />
        </div>
      </section>

      {/* FAMÍLIA E AMIGOS com parallax */}
      <section id="g-familia" className="relative overflow-hidden py-28">
        <Parallax speed={0.15} className="absolute inset-0 -z-10 opacity-30">
          <img src={familyFriendsAlbum[3]} className="h-full w-full object-cover blur-sm" alt="" />
        </Parallax>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            kicker="Capítulo II"
            title="Família & Amigos"
            subtitle="As raízes e os laços que sustentam cada sorriso de Shelcia."
            align="center"
          />
        </div>
        <div className="mt-12 space-y-6">
          <MediaCarousel photos={familyFriends2026} height="h-64" />
          <MediaCarousel photos={familyFriendsAlbum} height="h-64" />
        </div>
      </section>

      {/* MOSAICO VIVO */}
      <section id="g-mosaico" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            kicker="Capítulo III"
            title="Um Mosaico Que Nunca Para"
            subtitle="Centenas de fragmentos de memória, sempre em movimento — nada aqui fica parado."
          />
          <div className="mt-12">
            <AutoMosaic photos={guestPhotos} tiles={18} energy={energy} />
          </div>
        </div>
      </section>

      {/* VÍDEOS */}
      <section id="g-videos" className="relative py-28">
        <LiquidBlobs className="opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading
            kicker="Capítulo IV"
            title="Cinema & Bastidores"
            subtitle="Vídeos que carregam e reproduzem automaticamente ao entrarem em foco — como pequenos filmes de uma vida."
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guestVideos.slice(0, 12).map((src, i) => (
              <VideoCard key={src} src={src} playlist={guestVideos} index={i} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <GlassButton onClick={() => openLightbox(videoTop.map((s) => ({ type: "video" as const, src: s })), 0)}>
              Ver mais vídeos em destaque
            </GlassButton>
          </div>
        </div>
      </section>

      {/* MEMÓRIAS ADICIONAIS */}
      <section className="py-16">
        <MediaCarousel photos={memories} height="h-60" />
      </section>

      {/* CARTAS DE CONVIDADOS */}
      <section id="g-cartas" className="relative py-28">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading kicker="Capítulo V" title="Mensagens Para Shelcia" align="center" />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {guestMessages.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.15}>
                <div className="glass shimmer-border relative h-full rounded-2xl p-7">
                  <span className="font-display text-4xl text-ocean-300/50">“</span>
                  <p className="mt-2 text-sm leading-relaxed text-ocean-50/85">{m.text}</p>
                  <p className="mt-6 text-xs uppercase tracking-widest text-ocean-300">— {m.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SHELCIA */}
      <section id="g-shelcia" className="relative overflow-hidden py-32">
        <div className="absolute inset-0">
          <PhotoStage photos={featured} interval={5000} className="h-full w-full opacity-40" onClickOpen={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03101f] via-[#03101f]/70 to-[#03101f]" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <Kicker>Entrada privada</Kicker>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
            És a Shelcia? <span className="text-gradient-ocean">O teu universo espera.</span>
          </h2>
          <p className="mt-4 text-sm text-ocean-100/60">
            Um espaço secreto, construído inteiramente para ti — memórias, histórias, sonhos e cartas guardadas.
          </p>
          <div className="mt-8">
            <GlassButton variant="solid" onClick={onGoPrivate}>
              Entrar no meu universo ✦
            </GlassButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center text-xs uppercase tracking-[0.3em] text-ocean-300/40">
        Shell 2026 · Shelcia Fernanda Neves Van-Dúnem · Feito com amor
      </footer>
    </div>
  );
}
