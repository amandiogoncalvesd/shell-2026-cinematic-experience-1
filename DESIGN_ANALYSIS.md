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

1. Usa apenas a paleta ocean + branco translúcido?
2. Tipografia: Playfair para display, Inter para corpo, kicker em uppercase espaçado?
3. Superfícies em glass/glass-strong + shimmer onde houver destaque emocional?
4. Animações com os easings assinatura e ritmo lento?
5. Preserva o tom narrativo (“capítulos”, “universo”, “portal”)?
