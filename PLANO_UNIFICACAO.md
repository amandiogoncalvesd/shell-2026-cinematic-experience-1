# Plano de Unificação — Três Repositórios, Uma Experiência

> Objetivo: unir o que cada repositório tem de melhor numa única app,
> com um único designer e uma experiência imersiva — sem perder nada do que já existe.

## ESTADO ATUAL (Fase 1 — concluída)
✅ Os três repositórios estão no **Museu** (`public/arquivos/`), exatamente como nasceram:
- 🏛️ Projeto Shell 2024 (estático, fiel)
- 🌌 Shel 2026 (build fiel; rotas por hash funcionam dentro da ala)
- 🎬 Memory Lane Cinema (build fiel; navegação interna por hash)

## FASE 2 — O fundo prometido: Liquid Chrome
**Origem:** `Projeto-Shel-2026 → backgrounds/LiquidChrome.tsx` (WebGL/ogl).
1. Adicionar a dependência `ogl` à app atual.
2. Portar `LiquidChrome` + `LiquidChromeBackground` como fundo opcional do Universo,
   com a paleta azul-claro (baseColor ajustada) e opacidade discreta sob as secções.
3. Ligar ao padrão de performance já existente: desligado em `prefers-reduced-motion`
   e em dispositivos fracos; interruptor nas futuras Definições (Fase 3).

## FASE 3 — Centro de Definições Celestial
**Origem:** `CelestialNavbar` (painel de definições) + sistema de definições do App.
Portar para a navbar atual um painel ✦ com interruptores:
- Liquid chrome (ligado/desligado)
- Pétalas de rosa (`RosePetals` — portar junto)
- Grão de película / partículas
- Modo super-leve (desliga blur + animações pesadas — para telemóveis)
Persistência em localStorage + evento global (como no original).

## FASE 4 — Música com letras sincronizadas
**Origem:** `memory-lane-cinema → MusicPlayer` + `data/music.ts`.
- Unir o leitor atual (playlist Photograph/Einaudi/…) com a vista de **letras
  sincronizadas por timestamp** e a fila/repeat/shuffle.
- Manter a regra de ouro: a música só toca quando a utilizadora quiser.

## FASE 5 — A Luz ✨ (assistente)
**Origem:** `LuzAssistant` (Supabase) / `LuzAIWidget` (Gemini).
- Portar o widget flutuante com a personalidade da Luz.
- Requer decisão do Amândio: chave Supabase ou Gemini (sem chave, o widget
  aparece adormecido com um aviso elegante).

## FASE 6 — Módulos de valor pontual
- **CategoryRow** (filas Netflix) → enriquecer a Galeria Imersiva.
- **ElectricBorder** → molduras de destaque (Photograph 2026).
- **GuestbookSection** → livro de visitas real para convidados (fase futura, com moderação).
- **GaleriaShell2 (zoom CSS puro)** → uma ala nostálgica dentro do Museu ou nas Memórias.
- **TimelineSection** → linha do tempo 2008→2026 no Universo.
- **CinematicPlayer** → avaliar atalhos de teclado e velocidade para o cinema.

## REGRAS DE DESIGN DA UNIFICAÇÃO
1. Uma só paleta: ocean/azul-claro da Shelcia (`shell-sky #87C3E3` à frente).
2. Uma só voz tipográfica: Playfair Display (títulos) + Inter (corpo);
   Cormorant Garamond reservado à carta e momentos de livro.
3. Movimento com os easings assinatura `[0.22,1,0.36,1]`; nada brusco.
4. Toda a nova secção respeita o cinema lock (pausa quando um vídeo abre).
5. As imagens falam por si — títulos curtos, zero clichés.
