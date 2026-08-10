import { CanvasParticles, Parallax, Reveal } from "../../components/effects";
import { DriftGallery } from "../../components/cinema";
import { MediaCarousel, PhotoStage } from "../../components/media";
import { SectionHeading, Kicker } from "../../components/ui";
import { natureText } from "../../data/content";
import {
  naturezaBosquesPhotos,
  naturezaFloresPhotos,
  naturezaPaisagensPhotos,
} from "../../data/media2026";

export function NaturezaSection({ energy }: { energy: number }) {
  return (
    <section id="p-natureza" className="relative overflow-hidden py-28">
      {/* Fundo vivo: paisagens a respirar atrás de tudo */}
      <div className="absolute inset-0 -z-10">
        <PhotoStage
          photos={naturezaPaisagensPhotos.slice(0, 10)}
          interval={7000}
          energy={energy}
          className="h-full w-full opacity-25"
          onClickOpen={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03101f] via-[#03101f]/60 to-[#03101f]" />
      </div>
      <CanvasParticles density={40} />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker={natureText.subtitle} title={natureText.title} align="center" subtitle={natureText.text} />

        {/* Flores que flutuam como pétalas */}
        <Reveal className="mt-14 text-center">
          <Kicker>As flores que você ama</Kicker>
        </Reveal>
        <div className="mt-8">
          <DriftGallery photos={naturezaFloresPhotos} />
        </div>

        {/* Bosques & pôr do sol em carrosséis vivos */}
        <Reveal className="mt-20 text-center">
          <Kicker>Bosques & pôr do sol</Kicker>
        </Reveal>
        <div className="mt-8 space-y-6">
          <MediaCarousel photos={naturezaBosquesPhotos} height="h-72" />
          <MediaCarousel photos={naturezaPaisagensPhotos} height="h-60" />
        </div>

        <Parallax speed={0.12} className="pointer-events-none absolute inset-x-0 top-0 -z-[5] opacity-20">
          <div className="h-64 w-full bg-gradient-to-b from-shell-serenity/30 to-transparent blur-3xl" />
        </Parallax>
      </div>
    </section>
  );
}
