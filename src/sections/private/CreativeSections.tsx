import { Reveal } from "../../components/effects";
import { Framemation } from "../../components/cinema";
import { AutoMosaic, MediaCarousel, VideoCard } from "../../components/media";
import { SectionHeading, Kicker } from "../../components/ui";
import { identity, instruments, musicStyles } from "../../data/content";
import { artMagic } from "../../data/photos";
import { artTxtPhotos, frasesSeriePhotos } from "../../data/media2026";
import { videoArtMagic } from "../../data/videos";

const universeEmoji: Record<string, string> = {
  reader: "📖",
  poet: "🖋️",
  artist: "🎨",
  maker: "✂️",
  musician: "🎻",
  philosopher: "🦉",
  astronomer: "✦",
  mythologist: "🏛️",
};

export function LibrarySection() {
  return (
    <section id="p-livros" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          kicker="Biblioteca"
          title="Os Teus Pequenos Universos"
          subtitle="Sei que cada interesse teu é um mundo à parte, Shelcia — leitora, poetisa, filósofa, mitóloga. Por isso construí esta biblioteca com todos eles, um por um."
          align="center"
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {identity.universes.map((u, i) => (
            <Reveal key={u.id} delay={i * 0.06}>
              <div className="glass shimmer-border group flex h-full flex-col items-center gap-3 rounded-2xl px-4 py-8 text-center transition hover:-translate-y-1">
                <span className="text-3xl">{universeEmoji[u.id]}</span>
                <h3 className="font-display text-lg font-semibold text-white">{u.title}</h3>
                <p className="text-xs uppercase tracking-widest text-ocean-300/60">{u.subtitle}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <div className="glass rounded-2xl p-8">
                <Kicker>Os instrumentos que tu aprecias</Kicker>
              <div className="mt-4 flex flex-wrap gap-2">
                {instruments.map((i) => (
                  <span key={i} className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-ocean-100/80">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-8">
                <Kicker>Os estilos que tu ouves</Kicker>
              <div className="mt-4 flex flex-wrap gap-2">
                {musicStyles.map((i) => (
                  <span key={i} className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-ocean-100/80">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ArtSection({ energy }: { energy: number }) {
  return (
    <section id="p-arte" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Arte · Toque de Magia" title="Onde Dei Magia às Tuas Fotos" subtitle="Peguei nas tuas fotografias e transformei-as em pequenas obras — luz, cor e alma. Cada edição foi feita a pensar em ti." align="center" />
        <div className="mt-14">
          <AutoMosaic photos={artMagic} tiles={16} energy={energy} />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {videoArtMagic.slice(0, 4).map((src, i) => (
            <VideoCard key={src} src={src} playlist={videoArtMagic} index={i} className="aspect-[3/4]" />
          ))}
        </div>
        <div className="mt-10">
          <MediaCarousel photos={artMagic} height="h-72" />
        </div>

        {/* Arte & texto — palavras que ela transforma em imagem */}
        <Reveal className="mt-20 text-center">
          <Kicker>Arte & texto · as tuas palavras em imagem</Kicker>
        </Reveal>
        <div className="mt-8">
          <Framemation photos={artTxtPhotos} frames={7} energy={energy} aspect="aspect-square" />
        </div>

        {/* Frases da série que ela ama — Bridgerton */}
        <Reveal className="mt-20 text-center">
          <Kicker>As declarações da série que tu amas · Bridgerton</Kicker>
        </Reveal>
        <div className="mt-8">
          <MediaCarousel photos={frasesSeriePhotos} height="h-72" />
        </div>
      </div>
    </section>
  );
}
