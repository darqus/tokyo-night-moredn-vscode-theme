# 🎨 Tokyo Night Modern Color Palette

## Base Colors

| Name | Hex | Preview | Usage |
|------|-----|---------|-------|
| **black** | `#1a1b26` | ![#1a1b26](https://via.placeholder.com/20/1a1b26/1a1b26) | Editor / panel background |
| **gray** | `#565f89` | ![#565f89](https://via.placeholder.com/20/565f89/565f89) | Comments, inactive UI |
| **light** | `#c0caf5` | ![#c0caf5](https://via.placeholder.com/20/c0caf5/c0caf5) | Light text tier / punctuation |
| **white** | `#ffffff` | ![#ffffff](https://via.placeholder.com/20/ffffff/ffffff) | Pure white (max contrast accents) |
| **blue** | `#7aa2f7` | ![#7aa2f7](https://via.placeholder.com/20/7aa2f7/7aa2f7) | Functions, calls, keywords |
| **cyan** | `#7dcfff` | ![#7dcfff](https://via.placeholder.com/20/7dcfff/7dcfff) | Variables, imports, data |
| **teal** | `#73daca` | ![#73daca](https://via.placeholder.com/20/73daca/73daca) | Types, interfaces, props |
| **purple** | `#9d7cd8` | ![#9d7cd8](https://via.placeholder.com/20/9d7cd8/9d7cd8) | Operators, modifiers |
| **green** | `#9ece6a` | ![#9ece6a](https://via.placeholder.com/20/9ece6a/9ece6a) | Strings, content |
| **yellow** | `#e0af68` | ![#e0af68](https://via.placeholder.com/20/e0af68/e0af68) | Classes, important constructs |
| **orange** | `#ff9e64` | ![#ff9e64](https://via.placeholder.com/20/ff9e64/ff9e64) | Numbers, numeric literals |
| **red** | `#f7768e` | ![#f7768e](https://via.placeholder.com/20/f7768e/f7768e) | Errors, removals, danger |
| **magenta** | `#bb9af7` | ![#bb9af7](https://via.placeholder.com/20/bb9af7/bb9af7) | Attributes, meta tags |

## Color Groups

### Neutrals

- **black** — foundational editor background
- **gray** — comments & inactive states
- **light** — primary light text baseline
- **white** — pure white for max contrast elements (buttons, badges, dropdown, inline chat)

### Cool Accents

- **blue** — functions & method calls
- **cyan** — variables & imports
- **teal** — types & interfaces
- **purple** — operators & modifiers

### Warm Accents

- **green** — strings & textual content
- **yellow** — classes & constants
- **orange** — numeric values
- **red** — errors & critical signals
- **magenta** — attributes & tags

## Palette Aliases & Usage Rules

Readable intent aliases improve semantic clarity without introducing new raw colors.

### Text Aliases

- `textPrimary` — default foreground for most UI
- `textWhite` — pure white for maximum contrast (buttons, badges, dropdown, inline chat)
- `textMuted` — reduced emphasis
- `textSubtle` — further de‑emphasized

Selection guidance:

- Prefer `textPrimary` by default
- Use `textWhite` on saturated / accent backgrounds (buttons, badges, colored status segments)

### Surfaces (Background Roles)

- `surfaceBase` — application base background
- `surfaceSidebar` — sidebar / terminal background
- `surfacePanel` — panel & auxiliary region background
- `surfaceOverlay` — transient overlay/widget background

In code mapping examples:

- `bg.darkenBase = surfaceSidebar`
- `bg.elevated = surfacePanel`
- `bg.overlay = surfaceOverlay`
- `dropdown.background = surfacePanel`
- `derived.overlays.dropBackground = surfaceOverlay` (with alpha)
- `blockquote.background = surfaceOverlay`

### Borders & Links

- `borderThin` — neutral fine line / separators
- `borderSeparator` — widget & structural separators
- `link` — link text + terminal ANSI blue/cyan accent

### CTA & Accent Elements

- `primaryButtonBlue` — vivid action blue background (`#2b5ff6`)
  - Hover: perceptual lighten ~8% (OKLCH path)
  - Text: `textWhite`
- `badgeBlue` — saturated blue badge (`#007acc`) with `textWhite`

### When Not to Alias

Interactive semi‑transparent tones (`hover`, `active`, `selection`) are perceptually tuned (OKLCH + controlled blends). Keep explicit definitions to preserve intended luminance and chroma balance.
