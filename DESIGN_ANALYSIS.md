# SHELL 2026 — Análise do Design (Normas Aprendidas)

> Documento de referência do desenvolvedor. Toda e qualquer alteração futura
> **deve respeitar estas normas** — o objetivo é evoluir a experiência sem nunca
> quebrar a linguagem visual criada pelo designer.

---

## FASE 1 — Identidade & Paleta

- **Conceito central:** “universo digital cinematográfico” — o site não é uma página,
  é um *filme* sobre Shelcia Fernanda (18 anos, 10 de Agosto).
- **Paleta única — “Ocean”:** azul profundo quase-preto como base (`#03101f`, `#061527`)
  com escala `ocean-50 → ocean-950` (`#f2fbff → #081b34`). Nenhuma cor fora da escala
  ocean é usada em UI (apenas branco translúcido e, pontualmente, rose para erro).
- **Gradiente assinatura de texto:** `#eaf8ff → #9adcff → #3fa9f5` (`.text-gradient-ocean`),
  sempre em títulos principais.
- **Regra:** fundos escuros profundos + luz azul suave = sensação de céu noturno/cristal.

## FASE 2 — Tipografia

- **Display:** *Playfair Display* (serif, peso 600–800) — títulos, nomes, números de capítulo.
- **Corpo:** *Inter* (300–700) — textos corridos, UI.
- **Kickers:** rótulos em caixa alta, `11px`, `letter-spacing 0.35em`, cor `ocean-300`,
  sempre precedidos por um traço horizontal de 24px. É a “assinatura” de abertura de cada secção.
- **Hierarquia típica:** `Kicker → H2 (4xl/5xl, gradiente) → subtítulo (ocean-100/70)`.

## FASE 3 — Materiais (Liquid Glass)

- `.glass`: blur 22px + saturação 160%, borda `rgba(200,235,255,.25)`, highlight interno branco.
- `.glass-strong`: versão mais intensa (blur 30px) para superfícies de destaque (formulários, navbar ao rolar).
- `.shimmer-border`: borda de luz animada (4.5s) via mask-composite — usada em cartões emocionais.
- **Regra:** tudo é translúcido e luminoso; nunca superfícies opacas planas.

## FASE 4 — Sistema de Movimento

- **Easing assinatura:** `[0.22, 1, 0.36, 1]` (cinematográfico) em reveals;
  `[0.76, 0, 0.24, 1]` para transições dramáticas (wipe circular do portal).
- **Reveal on-scroll:** fade + subida de 40px, duração 1s, `once: true`, `amount: 0.25`.
- **Ken Burns:** fotos em crossfade com scale `1.08 → 1.0` (PhotoStage).
- **Stagger:** filhos entram em cascata (0.18s no portal, 0.06–0.15 em grelhas).
- **Intro do portal:** letter-spacing `0.6em → 0.05em` + desfoque que se dissipa — a marca registada.
- **Parallax:** camadas de fundo com `useScroll/useTransform` (velocidades 0.15–0.2).
- **Regra:** movimento é sempre *lento, suave e com propósito*; nada de saltos bruscos.

## FASE 5 — Média Viva

- Nada fica parado: **PhotoStage** (crossfade automático), **AutoMosaic** (muro vivo),
  **MediaCarousel** (deslize contínuo, pausa no hover), **VideoCard** (autoplay ao entrar em foco).
- **VideoText:** vídeo mascarado dentro do texto SVG — peça central dos heróis.
- **Áudio como motor:** `MusicProvider` expõe `energy` (0–1) do analisador WebAudio;
  a energia acelera slides, satura fotos e move o equalizador. A música “Princesinha Shell”
  toca automaticamente por área (faixa 0 nos convidados, faixa 10 no privado).

## FASE 6 — Arquitetura Narrativa

- Máquina de estados de 4 vistas: `portal → guests | auth → private`.
- **Portal:** ecrã de carregamento (“a abrir o portal de cristal…”) + escolha Convidados/Shelcia.
- **GuestArea:** capítulos I–V (Momentos, Família, Mosaico, Vídeos, Mensagens) + CTA privado.
- **AuthGate:** chave secreta (dica: data de aniversário), erro com shake.
- **PrivateArea:** 11 secções — Home, Memórias, Histórias, Amigos, Cartas, Livros,
  Arte, Vídeos, Sonhos, Céu, Música.
- Conteúdo emocional centralizado em `src/data/content.ts` (identidade, capítulos, sonhos, playlist).

## FASE 7 — Atmosfera & Detalhes

- **CanvasParticles:** bokeh cristalino a subir (densidade 60–90 por ecrã).
- **LiquidBlobs:** 3 manchas de luz com drift de 18s e delays escalonados.
- Scrollbar personalizada com gradiente ocean; divisores `.crystal-divider`;
  mascaras `.mask-fade-x` nos carrosséis; overlays de gradiente escuro sobre todas as fotos.
- Rodapés minimalistas: `text-xs uppercase tracking-[0.3em] text-ocean-300/40`.
- Versículo âncora: *Provérbios 10:12* — aparece no portal e nas cartas.

## Checklist de conformidade (para cada mudança)

1. Usa apenas a paleta ocean/shell + branco translúcido?
2. Tipografia: Playfair para display, Inter para corpo, kicker em uppercase espaçado?
3. Superfícies em glass/glass-strong + shimmer onde houver destaque emocional?
4. Animações com os easings assinatura e ritmo lento?
5. Preserva o tom narrativo (“capítulos”, “universo”, “portal”)?

---

## FASE 8 — Onda 2: “Cinderela em Azul Claro” (normas novas, mandatórias)

Direção recebida do cliente — sobrepõe-se onde conflitar com as fases anteriores:

1. **Azul claro é a cor principal.** Paleta oficial enviada pela Shelcia:
   `#87C3E3` (céu claro, PRINCIPAL) · `#5A75C2` · `#3E4E90` · `#D9B8E3` · `#9F7CA9` · `#DA8BA0`.
   Tokens Tailwind: `shell-sky`, `shell-serenity`, `shell-night`, `shell-lavender`, `shell-violet`, `shell-rose`.
2. **Cores sólidas** em botões, bordas, kickers e títulos (`glow-shell`, `btn-royal`) — gradientes só em texto de herói/vídeo-texto.
3. **Estilo Disney/Cinderela + Liquid Glass:** molduras reais (`.royal-frame`) com faíscas ✦ nos cantos, ornamentos ❈✦, brilho suave.
4. **Nenhuma fotografia pode estar parada:** ou transiciona (crossfade limpo, SEM zoom/distorção entre fotos — zero distrações), ou respira (`animate-breathe`), ou flutua (`animate-sway`, `animate-floaty`), ou desliza com o scroll.
5. **Framemations:** todas as fotos agrupadas devem aparecer em molduras animadas (`Framemation`) que trocam de foto automaticamente em segundos.
6. **Imersão obrigatória:** parallax, scroll-motion (`ScrollCinema` — filas que deslizam conforme o scroll), carrosséis contínuos.
7. **Velocidade das transições acompanha a música:** prop `energy` do `MusicProvider` acelera todos os palcos de fotos. (Próxima fase: uma música por secção.)
8. **Vídeos:** cartaz automático; só o vídeo em foco reproduz; parar sobre um vídeo inicia o carregamento; ao abrir, reprodução automática.
9. **Vídeo-texto:** títulos principais podem conter vídeo dentro das letras (`VideoText`), com as frases em vídeo fornecidas (`txtDestaqueVideos`, `txtFraseVideo`).
10. **Futuro (aguardar):** fundo *liquid chrome* — preparar superfícies para o receber sem redesenhar.
11. **Voz narrativa (OBRIGATÓRIO na área privada):** todas as palavras são ditas em
    **primeira pessoa pelo Amândio Gonçalves, dirigidas à Shelcia (tu)**. A página é dela,
    só ela a vê — nada de terceira pessoa (“a Shelcia”, “ela”). Ex.: “Estas foram as fotos
    tuas que eu achei mais interessantes.” A área de convidados mantém a terceira pessoa.
12. **Performance:** ~55% das mídias são pré-carregadas antes da experiência abrir
    (`PreloadGate` + `data/preload.ts`, contador elegante); galerias densas usam
    `thumb()` (w_600/w_800) — heróis e molduras mantêm w_1200.
13. **Texto↔imagem:** os textos dos Capítulos descrevem exatamente as imagens que mostram.

---

## FASE 9 — Onda 4: multi-páginas, música única e Neural Puzzle

1. **A área da Shelcia deixou de ser página única.** Três páginas com transições próprias:
   ❈ *O Universo* (a página original, intacta) · ✦ *Galeria Imersiva* (módulos Fotografias/Vídeos) ·
   ⬡ *Neural Puzzle*.
2. **Navbar em dois módulos obrigatórios:** (a) agrupados, os links que navegam na mesma
   página (âncoras); (b) separados e agrupados entre si, os links para páginas diferentes.
   Um divisor de cristal marca a fronteira entre os módulos.
3. **Música:** todas as faixas antigas foram removidas. Só existe *Photograph — Ed Sheeran*,
   que toca automaticamente quando a Shelcia abre a página dela. Novas faixas serão
   adicionadas em `data/videos.ts → audioTracks`. Botão flutuante de música (jóia de vidro)
   em todas as áreas; controlo de volume persiste na secção Música.
4. **Neural Puzzle:** adaptado ao tema (azul claro, faíscas ✦, Playfair nos títulos),
   594 URLs carregadas aleatoriamente (excluindo sempre a sessão Toque de Magia),
   progresso guardado automaticamente (nível, concluídos, recordes, imagem atual)
   com retoma ao reabrir.

---

## FASE 10 — Onda 5: playlist, navbar real, fullscreen e vídeo fluido

1. **Playlist oficial** em `data/videos.ts → audioTracks`: Experience (Ludovico Einaudi) é a
   faixa principal — a melodia que ela mais ama — e toca automaticamente ao abrir; seguem-se
   Photograph, Perfect, Golden Hour, Wicked Game, Interstellar (piano) e Solas.
   Ao terminar uma faixa, a seguinte começa sozinha (`next()` no MusicProvider).
2. **Navbar real (estilo Disney):** barra fina de cristal; capítulos da mesma página numa
   fita discreta ao centro; páginas diferentes num “espelho mágico” (dropdown com emblema,
   nome e descrição). Elementos pequenos e elegantes — nunca listas verticais de links.
3. **Fullscreen imersivo:** entrar como convidado ou como Shelcia pede tela cheia
   (`utils/fullscreen.ts`, melhor esforço — falha em silêncio onde não é suportado).
4. **Reprodução de vídeo fluida e COM SOM:** o lightbox usa fundo sólido (sem
   backdrop-blur, que é o maior peso de GPU), moldura sem shimmer em vídeo,
   preload="auto" e play() explícito com som. As pré-visualizações em grelha
   continuam mudas (padrão de galeria; vários vídeos com som em simultâneo seria caos).
