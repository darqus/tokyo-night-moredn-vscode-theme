# 🎨 Palette System

## Overview

Tokyo Night uses a centralized palette system with **zero hardcoded colors**. All 80+ semantic colors are generated programmatically from a core palette.

## Core Architecture

```typescript
// Base colors
const corePalette = {
  bg: { base: hsl(222, 15, 10) },
  text: { primary: hsl(225, 25, 85) },
  accent: { blue: hsl(217, 92, 76) }
}

// Extended semantic colors
const extendedPalette = {
  interface: { ... },
  syntax: { ... },
  git: { ... }
}
```

## Adaptive Variants

### HSL Transformations
```typescript
const springPalette = createAdaptedPalette('spring', {
  hueShift: 15,              // Shift hue by 15°
  saturationMultiplier: 1.2, // Increase saturation 20%
  lightnessOffset: 5         // Brighten by 5%
})
```

### Supported Adaptations
- **Seasonal**: Spring (+15° hue), Summer (+30°), Autumn (-30°), Winter (-15°)
- **Accessibility**: High contrast (2x), Low contrast (0.5x)
- **Color-blind**: Protanopia/Deuteranopia friendly
- **Creative**: Pastel (0.3x saturation), Retro (vintage hues)

## Color Categories

| Category | Purpose | Example |
|----------|---------|---------|
| `bg.*` | Backgrounds | `bg.base`, `bg.elevated` |
| `text.*` | Text colors | `text.primary`, `text.muted` |
| `border.*` | Borders | `border.default`, `border.focus` |
| `state.*` | Status colors | `state.error`, `state.success` |
| `syntax.*` | Code highlighting | `syntax.keyword`, `syntax.string` |

## Usage

```typescript
import { extendedPalette } from './src/palette/extended'

// Use semantic colors
const theme = {
  'editor.background': extendedPalette.bg.base,
  'editor.foreground': extendedPalette.text.primary
}
```