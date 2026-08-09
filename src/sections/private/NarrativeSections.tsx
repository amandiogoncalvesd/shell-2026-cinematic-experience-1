import { motion } from "framer-motion";
import { CanvasParticles, LiquidBlobs, Parallax, Reveal, VideoText } from "../../components/effects";
import { AutoMosaic, MediaCarousel, PhotoStage } from "../../components/media";
import { SectionHeading, Kicker } from "../../components/ui";
import { identity, chapters, essenceWords } from "../../data/content";
import {
  featured,
  childhoodPublic,
  childhoodPrivate,
  backstage2026,
  generic2026,
  ruthCeremony,
  ruthMoments,
  familyFriends2026,
  familyFriendsAlbum,
  chapters2023,
  artMagic,
} from "../../data/photos";
import { destaquePhotos, txtFraseVideo } from "../../data/media2026";

export function HomeSection({ energy }: { energy: number }) {
  return (
    <section id="p-home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <PhotoStage photos={[...destaquePhotos.slice(0, 12), ...backstage2026.slice(0, 8)]} interval={4000} energy={energy} className="h-full w-full" onClickOpen={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101f]/70 via-[#03101f]/55 to-[#03101f]" />
      </div>
      <LiquidBlobs />
      <CanvasParticles density={80} />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <Kicker>O Teu Universo</Kicker>
        <VideoText id="private-home" text="SHELCIA" videoSrc={txtFraseVideo} className="w-[92vw] max-w-3xl" fontSize={120} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}>
          <p className="text-sm uppercase tracking-[0.4em] text-ocean-200/70">{identity.fullName}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-ocean-300/50">{identity.birthday} · 18 anos</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          {identity.words.map((w) => (
            <span key={w} className="glass rounded-full px-5 py-2 text-xs uppercase tracking-widest text-ocean-100">
              {w}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="max-w-lg text-sm italic leading-relaxed text-ocean-100/60"
        >
          "{identity.verse.text}" — {identity.verse.ref}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="text-[11px] uppercase tracking-[0.35em] text-shell-sky/70"
        >
          ✦ Construí este universo só para ti — Amândio ✦
        </motion.p>
      </div>
    </section>
  );
}

export function MemoriesSection({ energy }: { energy: number }) {
  return (
    <section id="p-memorias" className="relative overflow-hidden py-28">
      <Parallax speed={0.18} className="absolute inset-0 -z-10 opacity-25">
        <img src={childhoodPublic[2]} className="h-full w-full object-cover blur-sm" alt="" />
      </Parallax>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Memórias" title="As Tuas Fotos Que Eu Guardei" align="center"
          subtitle="Estas foram as fotos tuas que achei mais interessantes — da infância aos teus 18 anos. Guardei cada uma com cuidado, e deixo-as trocar sozinhas, como memórias vivas." />
        <div className="mt-14">
          <AutoMosaic photos={[...childhoodPublic, ...childhoodPrivate, ...generic2026]} tiles={20} energy={energy} />
        </div>
      </div>
    </section>
  );
}

export function StoriesSection() {
  return (
    <section id="p-historias" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Histórias" title="Capítulos da Tua Vida" subtitle="Escrevi cada capítulo a pensar em ti, Shelcia. Cada fotografia é uma frase da tua história — contada por mim, para ti." />
      </div>
      <div className="mt-14 space-y-5 px-4 sm:px-6">
        {chapters.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.08}>
            <ChapterRow chapter={c} reverse={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
      <div className="mx-auto mt-20 max-w-4xl px-6 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          {essenceWords.map((w) => (
            <span key={w} className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ocean-200/60">
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterRow({ chapter, reverse }: { chapter: (typeof chapters)[number]; reverse?: boolean }) {
  // Cada capítulo mostra exatamente as imagens que o texto descreve.
  const photosByChapter: Record<string, string[]> = {
    infancia: [...childhoodPublic, ...childhoodPrivate],
    amizade: [...ruthCeremony.slice(0, 12), ...ruthMoments.slice(0, 12)],
    familia: [...familyFriends2026, ...familyFriendsAlbum.slice(0, 10)],
    escola: [...chapters2023, ...backstage2026.slice(0, 8)],
    magia: artMagic,
    celebracao: [...destaquePhotos.slice(0, 10), ...featured],
  };
  const photos = photosByChapter[chapter.id] ?? featured;
  return (
    <div className={`mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row ${reverse ? "md:flex-row-reverse" : ""}`}>
      <div className="relative h-72 w-full overflow-hidden rounded-3xl shimmer-border md:w-1/2">
        <MediaCarousel photos={photos} height="h-72" />
      </div>
      <div className="w-full md:w-1/2">
        <Kicker>{chapter.subtitle}</Kicker>
        <h3 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">{chapter.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-ocean-100/65">{chapter.text}</p>
      </div>
    </div>
  );
}
