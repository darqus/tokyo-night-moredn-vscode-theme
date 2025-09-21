/**
 * Минимальные расчёты контраста (WCAG) в sRGB + альфа-композитинг.
 * Базовые функции не тянут внешних зависимостей.
 */
import type { Hex } from '../types/theme'

// --- Parsing helpers ---
const parseHex6 = (hex: string) => {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  if (!m) throw new Error(`Invalid hex6: ${hex}`)
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  }
}

const parseHex6Or8 = (hex: string) => {
  const m6 = /^#([0-9a-f]{6})$/i.exec(hex)
  if (m6) {
    const { r, g, b } = parseHex6(hex)
    return { r, g, b, a: 255 }
  }
  const m8 = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(
    hex
  )
  if (!m8) throw new Error(`Invalid hex (6 or 8): ${hex}`)
  return {
    r: parseInt(m8[1], 16),
    g: parseInt(m8[2], 16),
    b: parseInt(m8[3], 16),
    a: parseInt(m8[4], 16),
  }
}

const toHex2 = (n: number) =>
  Math.round(Math.max(0, Math.min(255, n)))
    .toString(16)
    .padStart(2, '0')

const rgbToHex6 = (r: number, g: number, b: number): Hex =>
  `#${toHex2(r)}${toHex2(g)}${toHex2(b)}` as Hex

// --- Luminance/contrast ---
const srgbToLinear = (c: number) =>
  c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

const relLuminance = (hex: Hex): number => {
  const { r, g, b } = parseHex6(hex)
  const R = srgbToLinear(r / 255)
  const G = srgbToLinear(g / 255)
  const B = srgbToLinear(b / 255)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export const getContrastRatio = (fg: Hex, bg: Hex): number => {
  const L1 = relLuminance(fg)
  const L2 = relLuminance(bg)
  const brighter = Math.max(L1, L2)
  const darker = Math.min(L1, L2)
  return (brighter + 0.05) / (darker + 0.05)
}

/**
 * Комбинирует (alpha composite) fg (6/8-hex) поверх bg (6-hex), возвращает 6-hex.
 * Простое поканальное смешивание в sRGB (для валидации достаточно).
 */
export const flattenOver = (fgHex: string, bgHex: Hex): Hex => {
  const fg = parseHex6Or8(fgHex)
  const bg = parseHex6(bgHex)
  const a = fg.a / 255
  const r = fg.r * a + bg.r * (1 - a)
  const g = fg.g * a + bg.g * (1 - a)
  const b = fg.b * a + bg.b * (1 - a)
  return rgbToHex6(r, g, b)
}

/**
 * Контраст с учётом альфы: если fg содержит альфу — сперва композитим на bg.
 */
export const getContrastRatioAware = (fgMaybeAlpha: string, bg: Hex) => {
  const isHex6 = /^#[0-9a-f]{6}$/i.test(fgMaybeAlpha)
  const isHex8 = /^#[0-9a-f]{8}$/i.test(fgMaybeAlpha)
  if (isHex8) {
    const flat = flattenOver(fgMaybeAlpha, bg)
    return getContrastRatio(flat, bg)
  }
  if (isHex6) {
    return getContrastRatio(fgMaybeAlpha as Hex, bg)
  }
  // Неподдерживаемый формат (например, rgba()) — вернуть NaN для репорта
  return Number.NaN
}

// Тестовые экспортируемые утилиты (для unit-тестов)
export const __parseHex6Or8ForTests = parseHex6Or8
export const __flattenOverForTests = flattenOver
