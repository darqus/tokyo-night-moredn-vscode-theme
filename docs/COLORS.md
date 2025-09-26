# 🎨 Tokyo Night Modern Color Palette

## Base Colors

| Name | Hex | Preview | Usage |
|------|-----|---------|-------|
| **black** | `#1a1b26` | ![#1a1b26](https://via.placeholder.com/20/1a1b26/1a1b26) | Editor / panel background |
| **gray** | `#6b78a8` | ![#6b78a8](https://via.placeholder.com/20/6b78a8/6b78a8) | Comments, inactive UI |
| **light** | `#c0caf5` | ![#c0caf5](https://via.placeholder.com/20/c0caf5/c0caf5) | Light text tier / punctuation |
| **white** | `#ffffff` | ![#ffffff](https://via.placeholder.com/20/ffffff/ffffff) | Pure white (max contrast accents) |
| **blue** | `#7aa2f7` | ![#7aa2f7](https://via.placeholder.com/20/7aa2f7/7aa2f7) | Functions, calls, keywords |
| **cyan** | `#7dcfff` | ![#7dcfff](https://via.placeholder.com/20/7dcfff/7dcfff) | Variables, imports, data |
| **teal** | `#73daca` | ![#73daca](https://via.placeholder.com/20/73daca/73daca) | Types, interfaces, props |
| **purple** | `#9d7cd8` | ![#9d7cd8](https://via.placeholder.com/20/9d7cd8/9d7cd8) | Operators, modifiers |
| **green** | `#a7c785` | ![#a7c785](https://via.placeholder.com/20/a7c785/a7c785) | Strings, content |
| **yellow** | `#f7de70` | ![#f7de70](https://via.placeholder.com/20/f7de70/f7de70) | Classes, important constructs |
| **orange** | `#f0ac74` | ![#f0ac74](https://via.placeholder.com/20/f0ac74/f0ac74) | Numbers, numeric literals |
| **red** | `#f38095` | ![#f38095](https://via.placeholder.com/20/f38095/f38095) | Errors, removals, danger |
| **magenta** | `#b18af8` | ![#b18af8](https://via.placeholder.com/20/b18af8/b18af8) | Attributes, meta tags |

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

- `textDefault` — default foreground for most UI
- `textSecondary` — secondary text level
- `textMuted` — reduced emphasis
- `textSubtle` — further de‑emphasized

Selection guidance:

- Prefer `textDefault` by default
- Use `white` on saturated / accent backgrounds (buttons, badges, colored status segments)

### Surfaces (Background Roles)

- `bgPrimary` — application base background
- `bgSecondary` — secondary background (sidebar)
- `bgTertiary` — tertiary background (panels)
- `bgOverlay` — overlay surfaces

In code mapping examples:

- `bg.base = bgPrimary`
- `bg.elevated = bgTertiary`
- `bg.overlay = bgOverlay`
- `dropdown.background = bgTertiary`
- `derived.overlays.dropBackground = bgOverlay` (with alpha)
- `blockquote.background = bgOverlay`

### Borders & Links

- `borderDefault` — neutral fine line / separators
- `borderSeparator` — widget & structural separators
- `linkDefault` — link text + terminal ANSI blue/cyan accent

### States

- `stateSuccess` — success state (green - `#a7c785`)
- `stateWarning` — warning state (yellow - `#f7de70`)
- `stateError` — error state (red - `#f38095`)
- `stateInfo` — info state (cyan - `#7dcfff`)

### Other Elements

- `buttonPrimary` — primary button color (`#007acc`)
- `textInverse` — text on light backgrounds (`#1a1b26`)

### When Not to Alias

Interactive semi‑transparent tones (`hover`, `active`, `selection`) are perceptually tuned (OKLCH + controlled blends). Keep explicit definitions to preserve intended luminance and chroma balance.
