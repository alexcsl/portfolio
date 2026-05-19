# Brand — alexcsl portfolio

The brand is already established in [app/globals.css](app/globals.css) as a dual-theme system. Treat that file as the authoritative source of truth for color tokens.

## Concept

**Sea ↔ Earth** — dual modes that aren't just light/dark. They're two worlds.

- **Sea mode** (light, default): navy depths, cerulean, bright sky, water caustics
- **Earth mode** (dark): warm loam, amber, terracotta, bone

The metaphor is literal: the hero renders a 3D horizon mesh that morphs between rolling ocean (Sea) and dune field (Earth) on theme switch.

## Color tokens (CSS variables, space-separated RGB triplets)

### Sea (light)

| Token | Value | Use |
|---|---|---|
| `--bg` | `238 246 253` | page background |
| `--fg` | `8 26 55` | body text |
| `--fg-muted` | `71 102 137` | secondary text |
| `--accent` | `2 132 199` | sky-600, primary CTA / link |
| `--accent-soft` | `125 211 252` | highlights |
| `--accent-deep` | `12 74 110` | depth shadows |
| `--scene-top/mid/bottom` | sky → water | scene gradients |

### Earth (dark)

| Token | Value | Use |
|---|---|---|
| `--bg` | `20 16 12` | page background |
| `--fg` | `243 232 216` | body text |
| `--fg-muted` | `170 151 126` | secondary text |
| `--accent` | `217 119 6` | amber-600, primary |
| `--accent-soft` | `253 211 119` | warm wheat |
| `--accent-deep` | `120 53 15` | amber-900 |

Use as `rgb(var(--accent))` or `rgb(var(--accent) / 0.5)`.

## Typography

- **UI:** Inter (400, 500, 600, 700) via Google Fonts, declared in [app/layout.tsx](app/layout.tsx)
- **Code / numbers:** JetBrains Mono (400, 500, 600)
- **Display heading:** custom `.h-display` and `.h-section` classes in globals
- Font feature settings: `ss01`, `cv11`

## Voice

Confident, concise, technical without jargon. Active voice.

- ✓ "I build on-chain products, AI tools, and the quiet infrastructure that makes them ship."
- ✗ "I am a developer who builds various applications including blockchain products."

The signature: `I build [rotating word].` Short. Declarative. Personal.

## Component conventions

- Glass surfaces: `.glass` utility (semi-transparent with `backdrop-filter`)
- Gradients on copy: `.gradient-text`
- Section snapping: `.snap-section` with `scroll-snap-type: y proximity`
- Magnetic buttons: `MagneticButton` component with `strength` prop

## What "outside the box" means here

This brand pairs visual restraint (one focal element per section) with one or two technical "wow" beats (3D theme-morphing horizon, scroll-jacked project rail, theme view-transitions). Nothing decorative — every effect is part of the metaphor.
