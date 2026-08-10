
import { motion } from "framer-motion";
import { Parallax, Reveal } from "../../components/effects";
import { Framemation } from "../../components/cinema";
import ElectricBorder from "../../components/ElectricBorder";
import { PhotoStage, SmartImg, VideoCard, openLightbox } from "../../components/media";
import { SectionHeading, Kicker, GlassButton } from "../../components/ui";
import { dreamChapters, playlist, skyText } from "../../data/content";
import { generic2026, backstageClassic } from "../../data/photos";
import { arquiteturaSonhoPhotos, irmaosVideos, infanciaVideos, bastidoresTopVideos, destaque18Photos, photographFilm } from "../../data/media2026";
import { thumb } from "../../utils/cloudinary";
import { privateVideos, videoSpecial, audioTracks } from "../../data/videos";
import { useMusic } from "../../audio/MusicProvider";

export function CinemaSection() {
  return (
    <section id="p-videos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Cinema" title="Cinema" align="center" subtitle="Os seus momentos, em movimento." />

        {/* ═══ O DESTAQUE PRINCIPAL · PHOTOGRAPH 2026 ═══ */}
        <Reveal className="mt-14">
          <ElectricBorder color="#87C3E3" speed={0.6} chaos={0.08} borderRadius={32}>
            <div className="relative overflow-hidden rounded-[32px]">
              <div className="absolute inset-0">
                <PhotoStage photos={destaque18Photos.slice(0, 8)} interval={5200} className="h-full w-full opacity-35" onClickOpen={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03101f] via-[#03101f]/60 to-[#03101f]/30" />
              </div>
              <div className="relative z-10 flex flex-col items-center gap-5 px-6 py-20 text-center sm:py-28">
                <Kicker>O destaque do cinema</Kicker>
                <h3 className="glow-shell font-display text-4xl font-bold sm:text-6xl">Photograph 2026</h3>
                <p className="max-w-md text-xs uppercase tracking-[0.3em] text-[#b9d9ec]/60 sm:text-sm">
                  As melhores memórias · da infância aos 18 anos
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                  <GlassButton variant="solid" onClick={() => openLightbox([{ type: "video" as const, src: photographFilm.url }], 0)}>
                    ▶ Assistir
                  </GlassButton>
                  <a
                    href={photographFilm.url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-shell-sky/50 px-7 py-3 text-sm font-semibold tracking-wide text-shell-sky transition hover:bg-shell-sky/15"
                  >
                    ⬇ Baixar o filme
                  </a>
                </div>
              </div>
            </div>
          </ElectricBorder>
        </Reveal>

        {/* Emocional — com os irmãos */}
        <Reveal className="mt-14">
          <Kicker>Com os irmãos</Kicker>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {irmaosVideos.map((src, i) => (
            <VideoCard key={src} src={src} playlist={irmaosVideos} index={i} className="aspect-[3/4]" />
          ))}
        </div>

        {/* Infância em vídeo */}
        <Reveal className="mt-14">
          <Kicker>Infância</Kicker>
        </Reveal>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {infanciaVideos.map((src, i) => (
            <VideoCard key={src} src={src} playlist={infanciaVideos} index={i} />
          ))}
        </div>

        {/* Bastidores top */}
        <Reveal className="mt-14">
          <Kicker>Bastidores</Kicker>
        </Reveal>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bastidoresTopVideos.map((src, i) => (
            <VideoCard key={src} src={src} playlist={bastidoresTopVideos} index={i} className="aspect-[3/4]" />
          ))}
        </div>

        {/* Arquivo geral */}
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
            Ver todo o arquivo de vídeo ✦
          </GlassButton>
        </div>
      </div>
    </section>
  );
}

export function DreamsSection({ energy = 0 }: { energy?: number }) {
  return (
    <section id="p-sonhos" className="relative overflow-hidden py-28">
      <Parallax speed={0.2} className="absolute inset-0 -z-10">
        <img src="/images/architect-blueprint.jpg" className="h-full w-full object-cover opacity-25" alt="" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#03101f] via-[#03101f]/70 to-[#03101f]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Sonhos" title="The Architect" align="center" subtitle="Você vai construir coisas lindas — este é só o começo." />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {dreamChapters.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08}>
              <div className="glass shimmer-border flex h-full flex-col items-center gap-3 rounded-2xl px-5 py-9 text-center transition hover:-translate-y-1">
                <span className="font-display text-xs uppercase tracking-[0.3em] text-shell-sky">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-semibold text-white">{d.title}</h3>
                <p className="text-[11px] uppercase tracking-widest text-ocean-200/50">{d.pt}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* O sonho em imagens — molduras reais que respiram */}
        <Reveal className="mt-20 text-center">
          <Kicker>Arquitetura · o sonho em imagens</Kicker>
        </Reveal>
        <div className="mt-8">
          <Framemation photos={arquiteturaSonhoPhotos} frames={7} energy={energy} />
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
            <SmartImg src={thumb(src, 600)} className="h-full w-full object-cover" style={{ filter: `saturate(${1 + energy * 0.4})` }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function MusicSection() {
  const { play, currentTrack, isPlaying, toggle, next, energy, volume, setVolume } = useMusic();
  const track = audioTracks[0];
  return (
    <section id="p-musica" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading kicker="Música" title="A Sua Música" align="center" subtitle="As melodias que levam você para outro lugar." />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <Kicker>As Tuas Favoritas</Kicker>
            <ul className="mt-4 space-y-3">
              {playlist.map((p) => (
                <li key={p.title} className="flex items-center justify-between gap-3 border-b border-white/5 pb-2 text-sm">
                  <span className="text-ocean-50">{p.title}</span>
                  <span className="shrink-0 text-xs text-ocean-300/60">{p.artist}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass royal-frame rounded-2xl p-6">
            <Kicker>Princesinha Shell ✦</Kicker>
            <div className="mt-4 flex items-end gap-[3px]">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-shell-serenity to-shell-sky"
                  style={{
                    height: isPlaying ? `${10 + Math.abs(Math.sin(i + energy * 10)) * 40 + energy * 30}px` : "6px",
                    transition: "height 0.15s ease",
                  }}
                />
              ))}
            </div>

            <div className="mt-5 max-h-56 space-y-1 overflow-y-auto pr-2">
              {audioTracks.map((t) => {
                const isCurrent = currentTrack?.src === t.src;
                return (
                  <button
                    key={t.src}
                    onClick={() => (isCurrent ? toggle() : play(t))}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition ${
                      isCurrent
                        ? "border-shell-sky/60 bg-shell-sky/15"
                        : "border-transparent hover:border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] ${isCurrent ? "bg-shell-sky text-[#0a2540]" : "bg-white/5 text-shell-sky/70"}`}>
                      {isCurrent && isPlaying ? "❚❚" : "▶"}
                    </span>
                    <span className="min-w-0">
                      <span className={`block truncate text-xs font-medium ${isCurrent ? "text-white" : "text-[#dceefb]/75"}`}>
                        {t.title}
                      </span>
                      {t.note && (
                        <span className="block truncate text-[9px] italic text-shell-lavender/60">{t.note}</span>
                      )}
                    </span>
                    {isCurrent && <span className="ml-auto text-[9px] text-shell-sky">✦ a tocar</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex gap-3">
              <GlassButton
                className="flex-1"
                variant="solid"
                onClick={() => (currentTrack ? toggle() : play(track))}
              >
                {isPlaying ? "Pausar" : "Reproduzir"}
              </GlassButton>
              <GlassButton onClick={next}>Próxima ❯❯</GlassButton>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs text-ocean-300/70" aria-hidden>🔈</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full"
                aria-label="Volume da música"
              />
              <span className="w-9 text-right text-[10px] tabular-nums uppercase tracking-widest text-ocean-300/60">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
