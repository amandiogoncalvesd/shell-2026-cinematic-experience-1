import { useState } from "react";
import { motion } from "framer-motion";
import { Parallax, Reveal } from "../../components/effects";
import { VideoCard, openLightbox } from "../../components/media";
import { SectionHeading, Kicker, GlassButton } from "../../components/ui";
import { dreamChapters, playlist, skyText } from "../../data/content";
import { generic2026, backstageClassic } from "../../data/photos";
import { privateVideos, videoSpecial, audioTracks } from "../../data/videos";
import { useMusic } from "../../audio/MusicProvider";

export function CinemaSection() {
  return (
    <section id="p-videos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Cinema" title="Momentos em Movimento" subtitle="Vídeos que se revelam automaticamente ao entrarem em foco — pequenos filmes de uma grande vida." align="center" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videoSpecial.map((src, i) => (
            <VideoCard key={src} src={src} playlist={videoSpecial} index={i} className="aspect-video lg:col-span-1" />
          ))}
          {privateVideos.slice(0, 9).map((src, i) => (
            <VideoCard key={src} src={src} playlist={privateVideos} index={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <GlassButton onClick={() => openLightbox(privateVideos.map((s) => ({ type: "video" as const, src: s })), 0)}>
            Ver todo o arquivo de vídeo
          </GlassButton>
        </div>
      </div>
    </section>
  );
}

export function DreamsSection() {
  return (
    <section id="p-sonhos" className="relative overflow-hidden py-28">
      <Parallax speed={0.2} className="absolute inset-0 -z-10">
        <img src="/images/architect-blueprint.jpg" className="h-full w-full object-cover opacity-25" alt="" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#03101f] via-[#03101f]/70 to-[#03101f]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Sonhos" title="The Architect" subtitle="“Alguns sonhos começam como um desenho.” — tornar-se arquiteta e construir uma linda família." align="center" />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {dreamChapters.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08}>
              <div className="glass shimmer-border flex h-full flex-col items-center gap-3 rounded-2xl px-5 py-9 text-center">
                <span className="font-display text-xs uppercase tracking-[0.3em] text-ocean-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-semibold text-white">{d.title}</h3>
                <p className="text-[11px] uppercase tracking-widest text-ocean-200/50">{d.pt}</p>
                <p className="mt-2 text-xs leading-relaxed text-ocean-100/60">{d.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkySection({ energy }: { energy: number }) {
  const skyPhotos = [...generic2026.slice(0, 15), ...backstageClassic.slice(0, 10)];
  return (
    <section id="p-ceu" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <img src="/images/sky-emotional.jpg" className="h-full w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/40 via-[#03101f]/60 to-[#03101f]" />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Kicker>{skyText.subtitle}</Kicker>
        <h2 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">{skyText.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ocean-100/70">{skyText.text}</p>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-3 gap-3 px-6 sm:grid-cols-5">
        {skyPhotos.map((src, i) => (
          <motion.div
            key={src + i}
            className="aspect-square cursor-pointer overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 5) * 0.08, duration: 0.7 }}
            whileHover={{ scale: 1.06 }}
            onClick={() => openLightbox(skyPhotos.map((s) => ({ type: "photo" as const, src: s })), i)}
          >
            <img src={src} className="h-full w-full object-cover" style={{ filter: `saturate(${1 + energy * 0.4})` }} alt="" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function MusicSection() {
  const { play, currentTrack, isPlaying, toggle, energy } = useMusic();
  const [selected, setSelected] = useState(0);
  return (
    <section id="p-musica" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading kicker="Música" title="A Trilha Sonora de Shelcia" subtitle="Pop, gospel, clássica e instrumentais — sons que a transportam para outro lugar." align="center" />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <Kicker>Músicas favoritas</Kicker>
            <ul className="mt-4 space-y-3">
              {playlist.map((p) => (
                <li key={p.title} className="flex items-center justify-between border-b border-white/5 pb-2 text-sm">
                  <span className="text-ocean-50">{p.title}</span>
                  <span className="text-xs text-ocean-300/60">{p.artist}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <Kicker>Trilha ambiente — Princesinha Shell</Kicker>
            <div className="mt-4 flex items-end gap-[3px]">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-ocean-500 to-ocean-200"
                  style={{
                    height: isPlaying ? `${10 + Math.abs(Math.sin(i + energy * 10)) * 40 + energy * 30}px` : "6px",
                    transition: "height 0.15s ease",
                  }}
                />
              ))}
            </div>
            <div className="mt-6 max-h-40 space-y-1 overflow-y-auto pr-2 text-sm">
              {audioTracks.slice(0, 8).map((t, i) => (
                <button
                  key={t.src}
                  onClick={() => {
                    setSelected(i);
                    play(t);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-white/5 ${
                    currentTrack?.src === t.src ? "bg-white/10 text-white" : "text-ocean-100/70"
                  }`}
                >
                  {t.title}
                  {currentTrack?.src === t.src && <span className="text-ocean-300">{isPlaying ? "❚❚" : "▶"}</span>}
                </button>
              ))}
            </div>
            <GlassButton
              className="mt-4 w-full"
              variant="solid"
              onClick={() => (currentTrack ? toggle() : play(audioTracks[selected]))}
            >
              {isPlaying ? "Pausar" : "Reproduzir"}
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}
