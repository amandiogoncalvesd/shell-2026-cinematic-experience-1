# Análise Faseada dos Três Repositórios

> Documento de trabalho da unificação Shell 2026. Cada repositório foi clonado,
> lido ficheiro a ficheiro e analisado por fases. Nada neles foi modificado —
> os clones permanecem intactos; as cópias vivem em `public/arquivos/` (O Museu).

---

## REPOSITÓRIO 1 — `memory-lane-cinema` (a geração Lovable)

**Stack:** React 19 + Vite + TypeScript · shadcn/ui (Radix) · Tailwind · React Router ·
TanStack Query · Supabase · framer-motion · vitest.

### Fase 1 — Arquitetura
- Rotas reais: `/`, `/timeline`, `/story`, `/gallery`, `/music`, `/shelcia` (privada), 404.
- Providers: QueryClient → PreferencesProvider → TooltipProvider; `CosmicBackground` global;
  `PageTransition` (framer-motion) entre rotas.

### Fase 2 — Componentes únicos (os tesouros)
| Componente | Linhas | O que tem de especial |
|---|---|---|
| **LuzAssistant** | 301 | A assistente de IA **Luz** ✨ — chat com streaming via Supabase Edge Function, markdown, saudação por hora do dia, histórico em localStorage (`luz-messages-v2`) |
| **MusicPlayer** | 449 | Leitor completo: **letras sincronizadas por timestamp** (karaoke), fila, repeat/shuffle, volume, vista player/letras/fila |
| **NeuralPuzzle** | 824 | O puzzle em versão React/canvas (6×6 jigsaw com abas reais) |
| **ShelciaPrivate** | 1052 | Página privada com puzzle deslizante legado, MagicMessagesSection (mensagens que se desbloqueiam), Galaxy |
| **CinematicIntro / CosmicBackground / ParticleBackground** | — | Abertura e atmosfera cósmica |
| **VisualControlCenter** | 135 | Centro de controlo visual da experiência |
| **CategoryRow / VideoCard / VideoModal** | — | Filas estilo Netflix para vídeos |

### Fase 3 — Dados & design
- `data/metadata.ts` (571 linhas): fotos/vídeos Cloudinary com categoria, ano, data,
  descrição + helper `videoThumb` (cartaz automático `so_1,w_600`).
- `data/music.ts`: *Princesinha Shell* com **letra tempo-a-tempo** (`LyricLine {time, text}`).
- Design tokens HSL “Shelcia Cosmos”: primary `#8ECFFF`, aurora (azul/dourado/rosa),
  sombras `--shadow-glass`/`--shadow-crystal`, fontes Cormorant Garamond + DM Sans, tema dark/light.

---

## REPOSITÓRIO 2 — `Projeto-Shel-2026` (a geração AI Studio/Gemini)

**Stack:** React 19 + Vite + TypeScript · Tailwind v4 · motion · **ogl (WebGL)** ·
Express + `@google/genai` (servidor para a Luz) · PWA própria.

### Fase 1 — Arquitetura
- Single-page com rotas por **hash** (`#galeria-expo` = Galeria VIP ✨) — navegação instantânea.
- Sistema de definições em localStorage (`settings_immersive`, `settings_super_light`,
  `settings_blur`, `settings_animations`) com evento global `shell-settings-updated`.
- `LoadingScreen` (848 linhas) antes de tudo.

### Fase 2 — Componentes únicos (os tesouros)
| Componente | Linhas | O que tem de especial |
|---|---|---|
| **LiquidChrome** | — | ⭐ **O fundo WebGL de crómio líquido** (shader ogl) — o fundo planeado para o Shell 2026 final |
| **CelestialNavbar** | 1042 | Navbar-cápsula celestial com painel de definições: música, pétalas, névoa, transições, modo super-leve, electric border, blur |
| **CinematicPlayer** | 788 | Reprodutor de cinema avançado |
| **ImmersiveGallery** | 690 | A Galeria VIP (página hash própria) |
| **ToqueDeMagia** | 919 | Secção de arte dedicada |
| **RosePetals** | 69 | Cascata de pétalas de rosa 🌹 |
| **ElectricBorder** | — | Bordas elétricas animadas |
| **LuzAIWidget** | 198 | Widget da Luz via Gemini (server.ts) |
| **InstallPrompt / GuestbookSection / TimelineSection** | — | PWA, livro de visitas, linha do tempo |

### Fase 3 — Design
- Tokens: `shell-blue #8ECFFF`, `deep-azure #5FA9FF`, `warm-gold #FFD36B`,
  `petal-rose #F8D8E8`, `void #040B16`; `.glass-premium` (“Apple VisionOS / Disney+ look”).
- Fontes: Cormorant Garamond, EB Garamond, DM Sans, JetBrains Mono.

---

## REPOSITÓRIO 3 — `Projeto_Shell` (2024 — a origem)

**Stack:** HTML/CSS/JS puro · Bootstrap + jQuery · template **DigiMedia**
(o template de lavanderia citado na carta do Amândio).

### Fase 1 — Estrutura
- `index.html` + `homepage_1/2/3.html`: site dos **16 anos** (preloader, intro banner,
  owl carousel, isotope, tabs).
- **GaleriaShell** (5 imagens) · **GaleriaShell2** (9 imagens, galeria de zoom por
  checkboxes em CSS puro) · **GaleriaShell3** (8 imagens) · **Shelcia/selfie.html** (8 selfies).
- `assets/` (css/js/fonts) + `vendor/` (bootstrap/jquery).

### Fase 2 — Valor histórico
- É o primeiro site que o Amândio fez para a Shelcia — o embrião de tudo.
- A galeria de zoom em CSS puro (GaleriaShell2) é uma técnica elegante sem JavaScript.

---

## A APP ATUAL — `shell-2026-cinematic-experience-1`

A mais polida: paleta ocean/azul claro, componentes cinematográficos (PhotoStage,
Framemation, ScrollCinema, cinema lock), PWA com cache, carta-livro, Neural Puzzle
com progresso, Photograph 2026 como destaque do cinema. É a base onde os melhores
módulos dos três repositórios serão unidos.
