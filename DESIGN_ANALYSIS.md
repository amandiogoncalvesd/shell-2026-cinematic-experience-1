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

---

## FASE 11 — Onda 6: cinema absoluto, tela cheia persistente e PWA

1. **Cinema Lock (`cinemaLock.ts`):** quando um vídeo é aberto, ele torna-se a ÚNICA
   coisa viva no sistema — os outros vídeos pausam, carrosséis e fotos congelam,
   partículas e grão descansam, o cursor luminoso desaparece e a música pausa
   (regressa ao fechar, exatamente como estava).
2. **Tela cheia persistente:** a aplicação pede fullscreen ao primeiro gesto do
   utilizador e em cada entrada (Convidados/Shelcia/Puzzle); navegar nunca o quebra
   e nada força reentrada após o utilizador sair. O Neural Puzzle abre em tela cheia
   por padrão, com botão “✕ Fechar tela cheia”.
3. **PWA instalável:** manifest + ícones + service worker (`public/sw.js`):
   guarda a aplicação inteira, fontes e até 400 mídias já vistas no dispositivo —
   nas visitas seguintes carrega muito mais depressa e o que já foi visto abre
   mesmo sem internet. Antes de entrar, aparece o convite real de instalação
   (`InstallBanner`, com instruções próprias para iPhone).

---

## FASE 12 — Onda 7: estilo Disney+ (as imagens falam por si)

1. **O Shell 2026 é uma galeria, não uma carta.** Todas as declarações
   (“construí para ti”, “escolhi a pensar em ti”, assinaturas) foram removidas.
   Ficam apenas rótulos curtos e descritivos dos elementos — como faz a Disney+.
2. **A única frase poética do universo:** “A fotografia é a história que não consigo
   contar com palavras.” — Destin Sparks (Galeria Imersiva + rodapé privado).
3. **Conteúdo 100% real:** só existem três palavras guardadas — a carta original da Ruth,
   a carta original da mãe e o versículo da própria Shelcia. Tudo o que era inventado
   foi apagado.
4. **Destaque principal:** o arquivo “Destaque dos seus 18 anos” (56 fotos + 36 vídeos)
   é a face da aplicação — heróis, galeria e Capítulo I.

---

## FASE 13 — ONDA OMEGA (classificação premium)

1. **Photograph 2026** (o filme do Amândio, 404 MB, GitHub Releases) é o destaque
   principal do Cinema: herói real com ▶ Assistir + ⬇ Baixar; mencionado também
   no modal de boas-vindas das duas áreas.
2. **Página da Shelcia = segunda pessoa.** Nada de “dela/ela” na área privada:
   títulos como “A Tua Playlist”, “Princesinha Shell ✦”. Ela vê o universo como
   criado para ela — porque foi.
3. **Carta do Amândio:** adaptada das mais belas declarações de 18 anos da web,
   juntou-se às cartas reais (mãe, Ruth, versículo). É a única declaração
   permitida — porque pedida.
4. **Música 100% manual:** nada toca sozinho; o utilizador dá play no botão
   flutuante, na navbar ou na secção Música.
5. **Boas-vindas:** modal único por sessão explica cada área (convidados e privada).
6. **Texto mínimo:** só títulos que condizem com as imagens; descrições cliché
   eliminadas (capítulos sem parágrafos, playlist sem notas, módulos sem legendas).
7. **Neural Puzzle:** arranque robusto (não depende de um só evento do browser),
   carregamento com 6 tentativas + timeout de 12 s + ecrã de retry; interface da
   página limpa (sem botões desnecessários).
8. **Rodapé oficial:** “Designer by Amândio Gonçalves”.

---

## FASE 14 — A despedida

1. **A carta original do Amândio** substituiu a adaptação: vive num livro
   encantado (`RoyalLetter`) que se abre e escreve sozinho, palavra por palavra —
   tipografia Great Vibes + Cormorant Garamond, tinta azul-céu sobre vidro noite.
2. **Palavra-passe secreta:** a única chave é `Cinderella` (ou `Cinderella2026`),
   sem distinção de maiúsculas — sem dicas, porque segredos não se sugerem.
3. **Apresentações oficiais:** modais de boas-vindas com a navegação explicada,
   o Photograph 2026 recomendado para download (1080p é pesado para streaming)
   e o convite para instalar como aplicativo.
4. **Neural Puzzle à prova de falha:** 8 tentativas, timeout de 20 s, ecrã de
   retry, cache-busting e service worker renovado (v2).
5. **PWA:** `id` + `scope` no manifest — com o app instalado, os links abrem
   sempre dentro dele.

---

## FASE 15 — A carta no seu lugar

1. **A Carta vive numa página própria** (🌹 no menu), aberta pelo botão
   “Abrir a carta ✦” na secção Cartas — nada quebra o desenho da aplicação.
2. A experiência é **fielmente a do HTML original** (`public/a-carta.html`):
   o mesmo livro, as mesmas estrelas e pétalas, a mesma máquina de escrever
   ao mesmo ritmo — apenas a paleta foi adaptada ao universo (azul claro,
   lavanda, rosa pétala).
3. O livro-inline (RoyalLetter) foi removido: era lento e cobria os outros
   textos. As cartas da mãe e da Ruth mantêm-se como cartões, ao lado do
   convite para a carta especial.

---

## FASE 17 — Liquid Chrome, Vercel e Relíquias

1. **LiquidChrome (React Bits/ogl)** chegou: fundo WebGL de crómio líquido no
   Portal (base azul-oceano `[0.02,0.09,0.17]`, interativo), com pausa em modo
   cinema e quadro único em `prefers-reduced-motion`.
2. **Repositórios irmãos no Vercel** — links oficiais no portal:
   🎬 Shell Memory Lane (`shell-memory-lane-cinema.vercel.app`) ·
   🏛️ Projeto Shell 2024 (`projeto-shell-2024.vercel.app`).
   O Museu embutido foi removido (só ficou o necessário para as Relíquias).
3. **Relíquias de 2024** (página privada): O Cartão e A Explosão, fiéis ao
   original em `public/arquivos/shell2024/`.
4. O Projeto Shel 2026 não será migrado inteiro — apenas os seus melhores
   componentes serão extraídos para cá (LiquidChrome foi o primeiro).

## A VOZ DO AMÂNDIO (guia de escrita oficial)

Modelo: a secção “4 frases lindas para 4 fotos lindas de uma Garota Linda”
(Projeto Shell 2024, homepage_1). É assim que os textos devem ser escritos:

- “Você é bonita de um jeito que ilumina tudo ao seu redor”
- “Sua estranheza é o que te torna única e encantadora”
- “Admiro sua mente inteligente e brilhante”
- “Estaria mentindo se eu dissesse que não me apeguei, de tanto tempo que
  fiquei olhando sua foto. Você ilumina todo mundo com sua beleza e seu sorriso.”

**Regras da voz:** direta (você/te), uma qualidade por frase, curta e quente,
com imagens concretas (“ilumina tudo ao seu redor”) — zero burocracia, zero
clichés genéricos. Cada palavra é dita por ele, para ela.

---

## FASE 18 — Linha do Tempo em casa & músicas por secção

1. **Linha do Tempo** (⏳, 6ª página): a mesma linha criada no Shell Memory
   Lane, agora nativa — quatro eras (O Começo · 2023 · 2024–2025 · 2026),
   itens alternados em molduras reais, vídeos abrem no cinema com som.
2. **Músicas por secção** (`audio/sectionTracks.ts`): quando a utilizadora já
   deu play, navegar entre secções troca suavemente de faixa (Experience no
   Home, Photograph nas Memórias, Perfect nos Amigos, Golden Hour na Natureza,
   Wicked Game no Céu/Cartas, Interstellar no Cinema/Sonhos, Solas na Arte).
   Sem play manual, nada toca — a regra de ouro mantém-se.
3. As fotografias já trocam ao ritmo da energia da música (`energy` acelera
   PhotoStage/Framemation/ScrollCinema).

---

## FASE 19 — Electric Border, portal Disney+ e voz quente

1. **ElectricBorder** (migrado do Shel 2026, otimizado: 6 octaves, DPR ≤ 1.5,
   pausa fora do ecrã e em modo cinema): cartão de assinatura no rodapé,
   cartões de entrada do portal e destaque Photograph 2026.
2. **Portal Disney+ liquid glass:** abertura com emblema e anel pulsante,
   cartões de entrada em vidro líquido premium com borda elétrica, varrido de
   luz no hover e saída em wipe circular.
3. **Rodapé premium** (`AppFooter`): emblema, frase do universo, chips das
   páginas e assinatura “Designer by Amândio Gonçalves” em destaque sólido,
   cercada por ElectricBorder.
4. **Erros de texto↔imagem corrigidos:** “Escola” virou “Capítulos de 2023”
   (mostra só os capítulos); “Bestas para sempre” mostra somente fotos da
   Shelcia com a Ruth (ruthCeremony); “O jardim dela” removido.
5. **Subtítulos de volta na voz quente do Amândio** (“cada foto aqui é um
   pedaço de você”, “este cantinho é todo seu”, “este é só o começo”).

---

## FASE 20 — Boas-vindas do Memory Lane & Posters Voadores

1. **Cartão de boas-vindas:** o design elegante do Shell Memory Lane foi
   exportado e adaptado (vidro de cristal, entrada com desfoque, lista
   “Como navegar” com ícones, botão “Entrar na experiência ✦”) — com o
   download do Photograph 2026 integrado. Sem dependências novas.
2. **FlyingPosters (React Bits/ogl):** terceiro módulo da Galeria Imersiva —
   posters 3D que voam com scroll/arrasto (destaques + flores).
3. Regra de leveza: glifos nativos (✦ ❈ ♪ ▶ ⬇) em vez de bibliotecas de ícones.

---

## FASE 21 — SwarmCursor

**Regra de colocação:** os componentes React Bits enviados pelo Amândio vivem
na **página principal da Shelcia** e, se necessário, na **página dos
convidados** — nunca no portal.

1. **SwarmCursor (React Bits/ogl)** em modo `overlay`: camada fixa que segue o
   cursor pela página inteira sem bloquear cliques — enxame azul-céu com acento
   lavanda que orbita, funde-se como gosma luminosa e dispersa a cada clique.
2. Presente na página principal da Shelcia (9 partículas) e na página dos
   convidados (8). Descansa em modo cinema e respeita `prefers-reduced-motion`.
3. **Atualização:** removido da página da Shelcia por pedido do Amândio (não
   estava a fazer efeito). O código fica guardado no componente; mantém-se na
   página dos convidados.

---

## FASE 22 — Correções finas

1. Convidados: “Shelcia e Ruth” → **“Shelcia, Ruth e os amigos — para sempre.”**
2. **Posters Voadores:** começam sempre com a fotografia de destaque no centro;
   título “Desliza para ver a magia acontecer ✦” em destaque com brilho pulsante;
   ciclo infinito com uma amostra de todas as categorias (~171 fotos, w_500).
3. **Neural Puzzle:** voltou ao pool de **162 WebP originais** do puzzle
   funcional (Toque de Magia excluída); cache-buster `?v=2` e service worker v5
   para limpar caches antigas.

---

## FASE 23 — Puzzle original, arcade público e serpentes domadas

1. **Neural Puzzle reconstruído a partir do código original confirmado
   funcional**: tecnologia e sistema de jogo intactos (pool agora embutido no
   próprio HTML — sem dependências externas); só a interface foi repintada
   para a paleta do universo. **Uma única função nova:** botão “📷 NOVA FOTO”
   troca a fotografia em tempo real mantendo o nível atual.
2. **Arcade público:** página dedicada do Neural Puzzle + página dos Posters
   Voadores, acessíveis **a qualquer pessoa diretamente do portal** — dois
   botões elegantes lado a lado por cima dos cartões de entrada. A página
   privada usa a mesma página única do puzzle.
3. **Posters Voadores corrigidos:** pool partilhado (`data/flyingPool.ts`)
   com ~30 fotos de todas as categorias (w_400) — carregam em segundos;
   a foto de destaque começa sempre no centro; voo infinito por ciclo.
4. **Serpentes de volta à página da Shelcia** com fronteiras suaves:
   explosão limitada (240+speed·50), repulsão de burst reduzida (2.2×) e
   clamp de posição (margem 140px) — afastam-se, mas voltam sempre depressa.

---

## FASE 24 — Progresso real, pré-carga total e Safari/iPhone

1. **Neural Puzzle:** botão “📷 NOVA FOTO” destacado (fundo azul-céu, visível
   e com wrap em telemóvel) — troca a foto em tempo real mantendo o nível;
   ecrã de carregamento agora tem **barra de progresso real com percentagem**
   (fetch streaming com content-length; fallbacks em cascata se falhar).
2. **Pré-carregamento total:** o PreloadGate carrega também os **módulos da
   aplicação** — o pack completo dos posters voadores e o documento do puzzle —
   além das mídias. Contagem passa a “módulos e memórias”.
3. **Entrar sem carregar = aviso:** se o utilizador toca em “Entrar sem esperar”
   antes dos 100%, aparece um aviso elegante (“a experiência pode não funcionar
   corretamente — queres continuar mesmo assim?”) com as duas opções.
4. **Compatibilidade Safari/iPhone (iOS 26):** alturas `100svh` para
   min-h-screen/h-screen (elimina cortes/distorções da barra dinâmica),
   `touch-action: manipulation` (sem zoom de duplo toque), fallbacks estáticos
   para as cores `oklch` do ElectricBorder, `-webkit-text-size-adjust`.
