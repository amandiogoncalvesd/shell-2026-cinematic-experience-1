import { Reveal } from "../../components/effects";
import { MediaCarousel, SmartImg, VideoCard, openLightbox } from "../../components/media";
import { SectionHeading } from "../../components/ui";
import { closeFriends, friends, identity, momLetter } from "../../data/content";
import { ruthCeremony, ruthBackstage } from "../../data/photos";
import { fraseBiblicaPhoto, aniversarioMaePhoto } from "../../data/media2026";
import { videoRuthCeremony, videoRuthMoments } from "../../data/videos";

export function FriendsSection() {
  const ruth = friends[0];
  return (
    <section id="p-amigos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker="Amigos" title="Ruth — A Melhor Amiga" subtitle={`${ruth.since} · a amiga que você escolheu`} />


        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="glass royal-frame rounded-3xl p-8">
              <p className="text-sm leading-relaxed text-ocean-50/85">{ruth.story}</p>
              <p className="mt-4 text-xs italic leading-relaxed text-shell-lavender/80">
                “É a única que conhece, entende e apoia — a única em quem eu realmente confio e que nunca me decepcionou.” — De Shelcia para Ruth
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-shell-sky/70">
                <span className="h-px w-8 bg-shell-sky/60" /> Agosto de 2024 · Festa do Pijama
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

        {/* O círculo próximo */}
        <Reveal className="mt-14 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {closeFriends.map((n) => (
              <span key={n} className="glass rounded-full px-6 py-2.5 font-display text-base text-white">
                {n} <span className="text-xs text-shell-sky">✦</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* Somente fotografias da Shelcia com a Ruth */}
        <div className="mt-14 space-y-5">
          <MediaCarousel photos={ruthCeremony} height="h-64" />
          <MediaCarousel photos={ruthBackstage} height="h-56" />
        </div>
      </div>
    </section>
  );
}

export function LettersSection({ onOpenCarta }: { onOpenCarta?: () => void }) {
  const ruth = friends[0];
  return (
    <section id="p-cartas" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading kicker="Cartas" title="Cartas" align="center" subtitle="Palavras que são só suas." />

        {/* Há uma carta especial à espera — abre-se numa página só dela */}
        <Reveal className="mt-14">
          <div className="glass-strong royal-frame shimmer-border relative overflow-hidden rounded-3xl px-8 py-12 text-center">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-shell-rose/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-shell-sky/15 blur-3xl" />
            <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border border-shell-rose/50 bg-shell-rose/10 text-2xl">
              🌹
            </span>
            <h3 className="relative mt-5 font-display text-3xl font-semibold text-white">Uma carta especial</h3>
            <p className="relative mt-2 text-sm text-[#b9d9ec]/60">
              Escrita para ti, palavra por palavra — abre-a num lugar só teu.
            </p>
            {onOpenCarta && (
              <button
                onClick={onOpenCarta}
                className="btn-royal relative mt-7 rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.2em]"
              >
                Abrir a carta ✦
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-12 space-y-6">
          <LetterCard title={momLetter.from} text={momLetter.text} highlight />
          <LetterCard title="Ruth Antónia Bongue Pereira" text={ruth.letter} />
          <LetterCard
            title={`O versículo dela · ${identity.verse.ref}`}
            text={`"${identity.verse.text}"`}
          />

          {/* Peças visuais */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal>
              <figure
                className="royal-frame cursor-pointer overflow-hidden rounded-2xl p-2 transition hover:-translate-y-1"
                onClick={() => openLightbox([{ type: "photo" as const, src: fraseBiblicaPhoto }], 0)}
              >
                <SmartImg src={fraseBiblicaPhoto} className="w-full rounded-xl object-cover" />
                <figcaption className="px-2 py-3 text-center text-[10px] uppercase tracking-[0.3em] text-shell-sky/70">
                  ✦ Ele nos amou primeiro ✦
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1}>
              <figure
                className="royal-frame cursor-pointer overflow-hidden rounded-2xl p-2 transition hover:-translate-y-1"
                onClick={() => openLightbox([{ type: "photo" as const, src: aniversarioMaePhoto }], 0)}
              >
                <SmartImg src={aniversarioMaePhoto} className="w-full rounded-xl object-cover" />
                <figcaption className="px-2 py-3 text-center text-[10px] uppercase tracking-[0.3em] text-shell-rose/80">
                  Shelcia ✦
                </figcaption>
              </figure>
            </Reveal>
          </div>
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
          highlight ? "glass-strong royal-frame shimmer-border" : "glass"
        }`}
      >
        <span className="pointer-events-none absolute -right-6 -top-8 font-display text-8xl text-shell-sky/10">
          “
        </span>
        <p className="relative text-sm italic leading-relaxed text-ocean-50/85 sm:text-base">{text}</p>
        <p className="relative mt-6 text-xs uppercase tracking-[0.3em] text-shell-sky">— {title}</p>
      </div>
    </Reveal>
  );
}
