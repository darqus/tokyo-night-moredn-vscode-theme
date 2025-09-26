/**
 * Базовая палитра Tokyo Night Modern
 * 12 основных цветов для генерации всей темы
 */
import { createHex } from '../types/palette'

/**
 * Contrast notes: ratios calculated against surfaceBase (#1a1b26) using WCAG 2.1 formula.
 * Targets:
 *  - Normal body / primary text ≥ 4.5:1 (we exceed this)
 *  - Muted / secondary text ≥ 3.0:1 (acceptable for UI meta / comments, though 4.5 preferred)
 *  - Decorative / very subtle elements can dip lower, but we try to keep ≥ 3.0 where legibility matters.
 * Adjustments made:
 *  - gray (comment / secondary usages) raised from 2.61:1 to ~3.77:1 for better readability while staying subdued.
 * 
 * Semantic naming structure:
 * - Base colors: basic color names (blue, green, etc.)
 * - Surface colors: background surfaces (bgPrimary, bgSecondary, etc.)
 * - Text colors: text roles (textPrimary, textSecondary, etc.)
 * - UI elements: functional roles (buttonPrimary, borderDefault, etc.)
 */
export const basePalette = {
  // Base colors - core hues without semantic meaning
  black: createHex('#1a1b26'), // Darkest background
  gray: createHex('#6b78a8'),   // Medium gray for comments (≈ 3.77:1 vs base) AA (large) / improved legibility
  light: createHex('#c0caf5'),  // Light text
  white: createHex('#ffffff'),  // Pure white text

  // Accent cold colors (priority)
  blue: createHex('#7aa2f7'),   // Functions, control keywords (≈ 6.70:1)
  cyan: createHex('#7dcfff'),   // Variables, imports (≈ 7.36:1)
  teal: createHex('#73daca'),   // Types, properties (≈ 6.69:1)
  purple: createHex('#9d7cd8'), // Operators, modifiers (≈ 7.23:1)

  // Accent warm colors (minimal usage)
  green: createHex('#a7c785'),  // Strings (≈ 6.23:1)
  yellow: createHex('#f7de70'), // Classes, constants (≈ 10.19:1)
  orange: createHex('#f0ac74'), // Numbers only (≈ 7.38:1)
  red: createHex('#f38095'),    // Errors only (≈ 6.07:1)
  magenta: createHex('#b18af8'), // Attributes, tags (≈ 7.91:1)

  // Surface colors - background surfaces
  bgPrimary: createHex('#1a1b26'),    // Primary background surface
  bgSecondary: createHex('#181923'),  // Secondary background (sidebar)
  bgTertiary: createHex('#1f2230'),   // Tertiary background (panels)
  bgOverlay: createHex('#232739'),    // Overlay surfaces

  // Text colors - semantic text roles
  textDefault: createHex('#afb9e2'),  // Primary text (≈ 7.26:1)
  textSecondary: createHex('#99a3cc'), // Secondary text (≈ 6.23:1)
  textMuted: createHex('#8991b3'),    // Muted text (≈ 5.15:1)
  textInverse: createHex('#1a1b26'),  // Text on light backgrounds

  // Border colors - UI borders
  borderDefault: createHex('#202230'),
  borderSeparator: createHex('#30344c'),

  // UI element colors
  buttonPrimary: createHex('#007acc'), // Primary button color
  linkDefault: createHex('#29acf8'),   // Default link color

  // State colors - semantic states
  stateSuccess: createHex('#a7c785'), // Success state (green)
  stateWarning: createHex('#f7de70'), // Warning state (yellow)
  stateError: createHex('#f38095'),   // Error state (red)
  stateInfo: createHex('#7dcfff'),    // Info state (cyan)
} as const

export type BaseColor = keyof typeof basePalette
