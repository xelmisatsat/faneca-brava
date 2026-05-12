# Dirección Artística — FANECA BRAVA

## Filosofía Elixida: "ARQUIVO ATLÁNTICO VIVO"

### Design Movement
**Neo-Noir Atlántico** — fusión entre o cinema de autor europeo (Bergman, Saura), o minimalismo editorial de Obys Agency e o glassmorphism líquido de Apple visionOS. Non é un deseño de libro. É unha autopsia emocional dunha estirpe.

### Core Principles
1. **Silencio como deseño** — O espazo negativo é narrativa. Cada elemento respira.
2. **Cristal sobre memoria** — Os paneis Liquid Glass flotan sobre fotografías da época como lentes de investigador.
3. **Scroll = tempo** — Cada pixel de scroll é un paso cara ao pasado. O visitante non navega, investiga.
4. **Textura analóxica dixital** — Grain cinematográfico, ruído de película, imperfeccións que fan sentir o arquivo real.

### Color Philosophy
- `#0A0A0F` — Negro profundo atlántico (fondo principal)
- `#0D1B2A` — Azul mariño escuro (fondos secundarios)
- `#1A2744` — Azul pizarra (glassmorphism base)
- `#C8A96E` — Âmbar salgado (acento principal — luz de porto)
- `#8B9BB4` — Prata néboa (texto secundario)
- `#E8E0D0` — Marfil antigo (texto principal)
- `rgba(255,255,255,0.08)` — Cristal Liquid Glass

### Layout Paradigm
**Asimétrico vertical con scroll horizontal en galerías**
- Hero: pantalla completa con vídeo, texto xigante á esquerda
- Seccións: alternancia dereita/esquerda con espazo negativo masivo
- Galería Corsaria: scroll horizontal puro con cursor cámara
- Personaxes: cards verticais con Liquid Glass flotante
- Timeline: liña horizontal con nodos interactivos

### Signature Elements
1. **Liquid Glass Panels** — backdrop-filter: blur(40px), bordes con gradiente de luz, refracción interna
2. **Grain Overlay** — SVG noise texture en pseudo-element, opacity 0.04, sempre presente
3. **Cursor Cámara** — Visor circular de reflex cando está sobre a galería

### Typography System
- **Display**: `Cormorant Garamond` — serif elegante, peso 300-700, para títulos xigantes
- **Body**: `DM Sans` — sans-serif limpa, peso 300-400, para texto narrativo
- **Accent**: `Playfair Display Italic` — para citas e frases do libro
- Tamaños: 8vw (hero), 4vw (seccións), 1.1rem (corpo)

### Interaction Philosophy
- Hover: revelación lenta (opacity 0→1 en 600ms)
- Click: transición de páxina con fade negro
- Scroll: GSAP ScrollTrigger con Lenis smooth
- Mouse: parallax sutil en capas de profundidade

### Animation
- Entrada de texto: caractere por caractere, 40ms delay entre letras
- Imaxes: scale 1.05→1 ao entrar no viewport
- Liquid Glass: border-gradient anima coa posición do rato
- Partículas: Three.js, 2000 puntos brancos, movemento orgánico lento
