import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  CanvasParticles,
  Countdown,
  CursorGlow,
  FilmGrain,
  LiquidBlobs,
  Reveal,
  ScrollProgress,
  SectionDock,
  VideoText,
} from "../components/effects";
import { Framemation, ScrollCinema } from "../components/cinema";
import FloatingMusic from "../components/FloatingMusic";
import WelcomeModal from "../components/WelcomeModal";
import { LightboxHost, MediaCarousel, PhotoStage, VideoCard, openLightbox } from "../components/media";
import { SectionHeading, GlassButton, Kicker } from "../components/ui";
import { useMusic } from "../audio/MusicProvider";
import { featured, familyFriends2026, ruthCeremony, ruthMoments, familyFriendsAlbum, memories } from "../data/photos";
import {
  destaque18Photos,
  destaque18Videos,
  txtDestaqueVideos,
  naturezaBosquesPhotos,
  naturezaFloresPhotos,
  naturezaPaisagensPhotos,
  aventurasAmigosVideos,
  capitulos2023Videos,
  bastidoresTopVideos,
} from "../data/media2026";
import { guestVideos } from "../data/videos";
import { natureText } from "../data/content";

const SECTIONS = [
  { id: "g-hero", label: "Início" },
  { id: "g-destaques", label: "Destaques" },
  { id: "g-momentos", label: "Momentos" },
  { id: "g-familia", label: "Família" },
  { id: "g-natureza", label: "Natureza" },
  { id: "g-videos", label: "Cinema" },
  { id: "g-shelcia", label: "Shelcia" },
];

export default function GuestArea({ onGoPrivate, onExitPortal }: { onGoPrivate: () => void; onExitPortal: () => void }) {
  const { energy } = useMusic();
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#03101f]">
      <LightboxHost />
      <WelcomeModal
        storageKey="shell2026-welcome-guest"
        title="Bem-vindos à celebração ✦"
        mentionPhotograph
        lines={[
          "Esta galeria celebra os 18 anos de Shelcia Fernanda — criada para a família e os amigos.",
          "As fotografias nunca ficam paradas e os vídeos reproduzem-se sozinhos quando chegam ao centro do ecrã.",
          "A música espera por vocês — toca no botão flutuante quando quiserem.",
        ]}
      />
      <ScrollProgress />
      <FilmGrain />
      <CursorGlow />
      <FloatingMusic />
      <SectionDock sections={SECTIONS} />
      <Navbar sections={SECTIONS} brand="Shell 2026 · Convidados" onExit={onExitPortal} exitLabel="← Portal" />

      {/* ═══════════ HERÓI — vídeo dentro das letras ═══════════ */}
      <section id="g-hero" ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <PhotoStage photos={destaque18Photos.slice(0, 10)} interval={4200} energy={energy} className="h-full w-full" onClickOpen={false} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/70 via-[#03101f]/55 to-[#03101f]" />
        </div>
        <LiquidBlobs />
        <CanvasParticles density={60} />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <Kicker>Celebração · 18 Anos · 10 de Agosto</Kicker>
          <VideoText
            id="guest-hero"
            text="SHELL 2026"
            videoSrc={txtDestaqueVideos[0]}
            className="w-[92vw] max-w-3xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-xl text-sm leading-relaxed text-[#b9d9ec]/75 sm:text-base"
          >
            Uma coleção viva de memórias de Shelcia Fernanda Neves Van-Dúnem.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
            <Countdown />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <GlassButton variant="solid" onClick={() => document.getElementById("g-destaques")?.scrollIntoView({ behavior: "smooth" })}>
              Explorar a Galeria ↓
            </GlassButton>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CAPÍTULO I — DESTAQUES DOS 18 ANOS ═══════════ */}
      <section id="g-destaques" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading kicker="Capítulo I" title="Destaques dos 18 Anos" />
          <div className="mt-14">
            <Framemation photos={destaque18Photos} frames={8} energy={energy} />
          </div>
          <Reveal className="mt-12">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {destaque18Videos.slice(0, 4).map((src, i) => (
                <VideoCard key={src} src={src} playlist={destaque18Videos} index={i} className="aspect-[3/4]" />
              ))}
            </div>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <GlassButton onClick={() => openLightbox(destaque18Videos.map((s) => ({ type: "video" as const, src: s })), 0)}>
              Os {destaque18Videos.length} vídeos dos 18 anos ✦
            </GlassButton>
          </div>
        </div>
      </section>

      {/* ═══════════ CAPÍTULO II — MELHORES MOMENTOS ═══════════ */}
      <section id="g-momentos" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            kicker="Capítulo II"
            title="Melhores Momentos de 2026"
            subtitle="Shelcia e Ruth — para sempre bestas."
          />
        </div>
        <div className="mt-12 space-y-6">
          <MediaCarousel photos={ruthMoments} height="h-72" />
          <MediaCarousel photos={ruthCeremony} height="h-56" />
        </div>
      </section>

      {/* ═══════════ CAPÍTULO III — FAMÍLIA, AMIGOS & AVENTURAS ═══════════ */}
      <section id="g-familia" className="relative overflow-hidden py-28">
        <div className="absolute inset-0 -z-10 opacity-[0.14]">
          <PhotoStage photos={familyFriendsAlbum.slice(0, 6)} interval={6000} className="h-full w-full blur-sm" onClickOpen={false} />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading kicker="Capítulo III" title="Família & Amigos" align="center" />
        </div>
        <div className="mt-12 space-y-6">
          <MediaCarousel photos={familyFriends2026} height="h-64" />
          <MediaCarousel photos={familyFriendsAlbum} height="h-64" />
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6">
          <Reveal>
            <Kicker>Aventuras com os amigos</Kicker>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {aventurasAmigosVideos.slice(0, 6).map((src, i) => (
              <VideoCard key={src} src={src} playlist={aventurasAmigosVideos} index={i} className="aspect-[3/4]" />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <GlassButton onClick={() => openLightbox(aventurasAmigosVideos.map((s) => ({ type: "video" as const, src: s })), 0)}>
              Ver as 11 aventuras completas ✦
            </GlassButton>
          </div>
        </div>
      </section>

      {/* ═══════════ CAPÍTULO IV — NATUREZA ENCANTADA (scroll-cinema) ═══════════ */}
      <section id="g-natureza" className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-28">
          <SectionHeading kicker={`Capítulo IV · ${natureText.subtitle}`} title={natureText.title} align="center" />
        </div>
        <ScrollCinema
          height="260vh"
          rows={[
            { photos: naturezaBosquesPhotos, speed: 0.55, heightClass: "h-52 sm:h-72", label: "Bosques & pôr do sol" },
            { photos: naturezaFloresPhotos, reverse: true, speed: 0.4, heightClass: "h-40 sm:h-56", label: "Flores — rosas, sempre rosas" },
            { photos: naturezaPaisagensPhotos, speed: 0.5, heightClass: "h-52 sm:h-72", label: "Paisagens que encantam" },
          ]}
        />
      </section>

      {/* ═══════════ CAPÍTULO V — CINEMA ═══════════ */}
      <section id="g-videos" className="relative py-28">
        <LiquidBlobs className="opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading kicker="Capítulo V" title="Cinema & Bastidores" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...capitulos2023Videos.slice(0, 3), ...bastidoresTopVideos.slice(0, 3), ...guestVideos.slice(0, 6)].map((src, i) => (
              <VideoCard key={src + i} src={src} playlist={guestVideos} index={i} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GlassButton onClick={() => openLightbox(capitulos2023Videos.map((s) => ({ type: "video" as const, src: s })), 0)}>
              Capítulos de 2023 · 15 anos ✦
            </GlassButton>
            <GlassButton onClick={() => openLightbox(bastidoresTopVideos.map((s) => ({ type: "video" as const, src: s })), 0)}>
              Bastidores top ✦
            </GlassButton>
            <GlassButton onClick={() => openLightbox(guestVideos.map((s) => ({ type: "video" as const, src: s })), 0)}>
              Todo o cinema ✦
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Memórias adicionais — carrossel vivo */}
      <section className="py-16">
        <MediaCarousel photos={memories} height="h-60" />
      </section>

      {/* ═══════════ CTA — ENTRADA PRIVADA ═══════════ */}
      <section id="g-shelcia" className="relative overflow-hidden py-32">
        <div className="absolute inset-0">
          <PhotoStage photos={featured} interval={5000} className="h-full w-full opacity-40" onClickOpen={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03101f] via-[#03101f]/70 to-[#03101f]" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <Kicker>Entrada privada</Kicker>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
            És a Shelcia? <span className="glow-shell">O teu universo espera.</span>
          </h2>
          <div className="mt-8">
            <GlassButton variant="solid" onClick={onGoPrivate}>
              Entrar no meu universo ✦
            </GlassButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-shell-sky/45">
          Shell 2026 · Shelcia Fernanda Neves Van-Dúnem
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-shell-sky/35">
          Designer by Amândio Gonçalves
        </p>
      </footer>
    </div>
  );
}
