import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasParticles, LiquidBlobs, Reveal } from "../../components/effects";
import { Framemation } from "../../components/cinema";
import { LightboxHost, MediaCarousel, PhotoStage, VideoCard, openLightbox } from "../../components/media";
import { GlassButton, Kicker, Chip } from "../../components/ui";
import { useMusic } from "../../audio/MusicProvider";
import {
  destaque18Photos,
  destaque18Videos,
  arquiteturaSonhoPhotos,
  naturezaBosquesPhotos,
  naturezaFloresPhotos,
  naturezaPaisagensPhotos,
  artTxtPhotos,
  frasesSeriePhotos,
  destaqueVideos,
  irmaosVideos,
  infanciaVideos,
  capitulos2023Videos,
  bastidoresTopVideos,
  aventurasAmigosVideos,
  universeQuote,
} from "../../data/media2026";
import {
  familyFriends2026,
  familyFriendsAlbum,
  ruthCeremony,
  ruthMoments,
  ruthBackstage,
  childhoodPublic,
  childhoodPrivate,
  generic2026,
  backstage2026,
} from "../../data/photos";
import { videoRuthMoments, videoRuthCeremony, privateVideos } from "../../data/videos";

type Module = "fotos" | "videos";

const PHOTO_CATS: { id: string; label: string; photos: string[] }[] = [
  { id: "destaques", label: "Destaques · 18 anos", photos: destaque18Photos },
  { id: "bosques", label: "Bosques & Pôr do Sol", photos: naturezaBosquesPhotos },
  { id: "flores", label: "Flores", photos: naturezaFloresPhotos },
  { id: "paisagens", label: "Paisagens", photos: naturezaPaisagensPhotos },
  { id: "arquitetura", label: "Arquitetura", photos: arquiteturaSonhoPhotos },
  { id: "arttxt", label: "Arte & Texto", photos: artTxtPhotos },
  { id: "bridgerton", label: "Bridgerton", photos: frasesSeriePhotos },
  { id: "familia", label: "Família", photos: [...familyFriends2026, ...familyFriendsAlbum] },
  { id: "ruth", label: "Ruth", photos: [...ruthCeremony.slice(0, 20), ...ruthMoments.slice(0, 20), ...ruthBackstage.slice(0, 10)] },
  { id: "infancia", label: "Infância", photos: [...childhoodPublic, ...childhoodPrivate] },
  { id: "2026", label: "2026", photos: [...generic2026.slice(0, 25), ...backstage2026.slice(0, 15)] },
];

const VIDEO_CATS: { id: string; label: string; videos: string[] }[] = [
  { id: "destaques", label: "Destaques · 18 anos", videos: destaque18Videos },
  { id: "style", label: "Style", videos: destaqueVideos },
  { id: "irmaos", label: "Com os Irmãos", videos: irmaosVideos },
  { id: "infancia", label: "Infância", videos: infanciaVideos },
  { id: "capitulos", label: "Capítulos 2023 · 15 anos", videos: capitulos2023Videos },
  { id: "bastidores", label: "Bastidores Top", videos: bastidoresTopVideos },
  { id: "aventuras", label: "Aventuras com Amigos", videos: aventurasAmigosVideos },
  { id: "ruth", label: "Ruth", videos: [...videoRuthMoments.slice(0, 16), ...videoRuthCeremony.slice(0, 8)] },
  { id: "arquivo", label: "Arquivo Completo", videos: privateVideos.slice(0, 18) },
];

export default function ImmersiveGallery() {
  const { energy } = useMusic();
  const [module, setModule] = useState<Module>("fotos");
  const [photoCat, setPhotoCat] = useState(PHOTO_CATS[0].id);
  const [videoCat, setVideoCat] = useState(VIDEO_CATS[0].id);

  const activePhotos = PHOTO_CATS.find((c) => c.id === photoCat) ?? PHOTO_CATS[0];
  const activeVideos = VIDEO_CATS.find((c) => c.id === videoCat) ?? VIDEO_CATS[0];

  return (
    <div className="relative min-h-screen bg-[#03101f]">
      <LightboxHost />
      <LiquidBlobs className="opacity-60" />
      <CanvasParticles density={45} />

      {/* ══════════ INTRO ══════════ */}
      <section className="relative overflow-hidden pb-10 pt-36">
        <div className="absolute inset-0 -z-10">
          <PhotoStage
            photos={[...destaque18Photos.slice(0, 8), ...naturezaBosquesPhotos.slice(0, 6)]}
            interval={6000}
            energy={energy}
            className="h-full w-full opacity-20"
            onClickOpen={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/60 via-[#03101f]/80 to-[#03101f]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Kicker>Galeria Imersiva</Kicker>
          <h1 className="glow-shell mt-4 font-display text-4xl font-semibold sm:text-6xl">Fotografias & Vídeos</h1>
          <p className="mx-auto mt-5 max-w-xl text-sm italic leading-relaxed text-[#b9d9ec]/60 sm:text-base">
            “{universeQuote.text}” — {universeQuote.author}
          </p>

          {/* ══════════ SELETOR DE MÓDULOS ══════════ */}
          <div className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-4">
            {(
              [
                { id: "fotos", emblem: "✦", title: "Fotografias" },
                { id: "videos", emblem: "▶", title: "Vídeos" },
              ] as { id: Module; emblem: string; title: string }[]
            ).map((m) => (
              <motion.button
                key={m.id}
                onClick={() => setModule(m.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-2xl p-6 text-center transition ${
                  module === m.id ? "glass-strong royal-frame" : "glass opacity-70 hover:opacity-100"
                }`}
              >
                {module === m.id && (
                  <motion.div
                    layoutId="module-glow"
                    className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-shell-sky/25 blur-3xl"
                  />
                )}
                <span className="relative mx-auto grid h-10 w-10 place-items-center rounded-full border border-shell-sky/50 bg-shell-sky/10 text-shell-sky">
                  {m.emblem}
                </span>
                <h3 className="relative mt-3 font-display text-xl font-semibold text-white">{m.title}</h3>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTEÚDO DO MÓDULO ══════════ */}
      <AnimatePresence mode="wait">
        {module === "fotos" ? (
          <motion.div
            key="fotos"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 pb-28"
          >
            <div className="mx-auto max-w-7xl px-6">
              {/* Categorias */}
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
                {PHOTO_CATS.map((c) => (
                  <Chip key={c.id} active={photoCat === c.id} onClick={() => setPhotoCat(c.id)}>
                    {c.label}
                  </Chip>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhotos.id}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Palco principal */}
                  <div className="royal-frame mt-8 overflow-hidden rounded-3xl p-2">
                    <PhotoStage
                      photos={activePhotos.photos}
                      interval={3400}
                      energy={energy}
                      className="aspect-video w-full rounded-2xl"
                    />
                  </div>

                  {/* Molduras vivas */}
                  <Reveal className="mt-10">
                    <Kicker>{activePhotos.label} · molduras vivas</Kicker>
                  </Reveal>
                  <div className="mt-6">
                    <Framemation photos={activePhotos.photos} frames={8} energy={energy} />
                  </div>

                  {/* Carrossel contínuo */}
                  <div className="mt-12">
                    <MediaCarousel photos={activePhotos.photos} height="h-64" />
                  </div>

                  <div className="mt-10 flex justify-center">
                    <GlassButton
                      variant="solid"
                      onClick={() =>
                        openLightbox(activePhotos.photos.map((s) => ({ type: "photo" as const, src: s })), 0)
                      }
                    >
                      Ver {activePhotos.photos.length} fotografias em ecrã inteiro ✦
                    </GlassButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 pb-28"
          >
            <div className="mx-auto max-w-7xl px-6">
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
                {VIDEO_CATS.map((c) => (
                  <Chip key={c.id} active={videoCat === c.id} onClick={() => setVideoCat(c.id)}>
                    {c.label}
                  </Chip>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVideos.id}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mt-6 text-xs uppercase tracking-[0.3em] text-shell-sky/60">
                    ✦ {activeVideos.videos.length} vídeos · só o que está em foco reproduz
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {activeVideos.videos.map((src, i) => (
                      <VideoCard key={src + i} src={src} playlist={activeVideos.videos} index={i} />
                    ))}
                  </div>
                  <div className="mt-10 flex justify-center">
                    <GlassButton
                      variant="solid"
                      onClick={() =>
                        openLightbox(activeVideos.videos.map((s) => ({ type: "video" as const, src: s })), 0)
                      }
                    >
                      Abrir o cinema de {activeVideos.label} ✦
                    </GlassButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
