import { Reveal } from "../../components/effects";
import { MediaCarousel, VideoCard } from "../../components/media";
import { SectionHeading } from "../../components/ui";
import { friends, guestMessages, identity } from "../../data/content";
import { ruthCeremony, ruthBackstage, ruthMoments } from "../../data/photos";
import { videoRuthCeremony, videoRuthMoments } from "../../data/videos";

export function FriendsSection() {
  const ruth = friends[0];
  return (
    <section id="p-amigos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Amigos" title="Ruth — A Melhor Amiga" subtitle={ruth.since} />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="glass shimmer-border rounded-3xl p-8">
              <p className="text-sm leading-relaxed text-ocean-50/80">{ruth.story}</p>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-ocean-300/70">
                <span className="h-px w-8 bg-ocean-300/60" /> Agosto de 2024 · Festa do Pijama
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3">
              {[videoRuthCeremony[0], videoRuthMoments[3]].map((src, i) => (
                <VideoCard key={src} src={src} playlist={videoRuthMoments} index={i} className="aspect-[3/4]" />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 space-y-5">
          <MediaCarousel photos={ruthCeremony} height="h-64" />
          <MediaCarousel photos={ruthBackstage} height="h-56" />
          <MediaCarousel photos={ruthMoments} height="h-64" />
        </div>
      </div>
    </section>
  );
}

export function LettersSection() {
  const ruth = friends[0];
  return (
    <section id="p-cartas" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading kicker="Cartas" title="Words I Carry" align="center" subtitle="Palavras guardadas — de Deus, de amigos, e para o futuro." />

        <div className="mt-14 space-y-6">
          <LetterCard title="Ruth António Bongue Pereira" text={ruth.letter} />
          <LetterCard
            title="Uma frase que carrego"
            text={`"${identity.verse.text}" — ${identity.verse.ref}`}
            highlight
          />
          {guestMessages.map((m) => (
            <LetterCard key={m.name} title={m.name} text={m.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LetterCard({ title, text, highlight }: { title: string; text: string; highlight?: boolean }) {
  return (
    <Reveal>
      <div
        className={`relative overflow-hidden rounded-2xl p-8 ${
          highlight ? "glass-strong shimmer-border" : "glass"
        }`}
      >
        <span className="pointer-events-none absolute -right-6 -top-8 font-display text-8xl text-ocean-300/10">
          “
        </span>
        <p className="relative text-sm italic leading-relaxed text-ocean-50/85 sm:text-base">{text}</p>
        <p className="relative mt-6 text-xs uppercase tracking-[0.3em] text-ocean-300">— {title}</p>
      </div>
    </Reveal>
  );
}
