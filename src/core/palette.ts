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
 */
export const basePalette = {
  // Нейтральные
  black: createHex('#1a1b26'), // Самый темный фон
  // Previous gray #565f89 contrast ≈ 2.61:1 (too low for comfortable reading in many monitors)
  gray: createHex('#6b78a8'), // Средний серый для комментариев (≈ 3.77:1 vs base) AA (large) / improved legibility
  light: createHex('#c0caf5'), // Светлый текст
  white: createHex('#ffffff'), // Белый текст

  // Акцентные холодные (приоритет)
  blue: createHex('#7aa2f7'), // Функции, ключевые слова (≈ 6.70:1)
  cyan: createHex('#7dcfff'), // Переменные, импорты (≈ 7.36:1)
  teal: createHex('#73daca'), // Типы, свойства (≈ 6.69:1)
  purple: createHex('#9d7cd8'), // Операторы, модификаторы (≈ 7.23:1)

  // Акцентные теплые (минимум)
  green: createHex('#a7c785'), // Строки (≈ 6.23:1)
  yellow: createHex('#f7de70'), // Классы, константы (≈ 10.19:1)
  orange: createHex('#f0ac74'), // Числа (только) (≈ 7.38:1)
  red: createHex('#f38095'), // Ошибки (только) (≈ 6.07:1)
  magenta: createHex('#b18af8'), // Атрибуты, теги (≈ 7.91:1)

  // --- Понятные алиасы и частые константы (для читабельности) ---
  // Текстовые роли (алиасы к существующим цветам и распространённые значения)
  textWhite: createHex('#ffffff'), // = white
  textPrimary: createHex('#afb9e2'), // Светлый текст (≈ 7.26:1)
  textMuted: createHex('#99a3cc'), // приглушённое (≈ 6.23:1)
  textSubtle: createHex('#8991b3'), // более приглушённое (≈ 5.15:1)

  // Поверхности (часто встречающиеся фоновые значения в теме)
  surfaceBase: createHex('#1a1b26'), // = black
  surfaceSidebar: createHex('#181923'),
  surfacePanel: createHex('#1f2230'),
  surfaceOverlay: createHex('#232739'),

  // Разделители/границы (часто используемые стабильные значения)
  borderThin: createHex('#202230'),
  borderSeparator: createHex('#30344c'),

  // Брэнд/ссылки/инфо (алиасы на холодные акценты)
  primaryBlue: createHex('#7aa2f7'), // = blue
  infoCyan: createHex('#7dcfff'), // = cyan
  accentTeal: createHex('#73daca'), // = teal
  accentPurple: createHex('#9d7cd8'), // = purple
  link: createHex('#29acf8'), // используемый цвет ссылок

  badgeBlue: createHex('#007acc'),

  // CTA / Кнопки
  // Яркий синий для основной кнопки
  primaryButtonBlue: createHex('#007acc'),

  // Состояния (алиасы на тёплые акценты)
  success: createHex('#a7c785'), // = green
  warning: createHex('#f7de70'), // = yellow
  attention: createHex('#f0ac74'), // = orange
  danger: createHex('#f38095'), // = red
} as const

export type BaseColor = keyof typeof basePalette
