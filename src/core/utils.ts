/**
 * Цветовые утилиты для генерации производных цветов
 */

type Hex = `#${string}`

/**
 * Валидация hex цвета
 */
const validateHex = (hex: string): boolean => {
  return /^#[0-9a-f]{6}$/i.test(hex)
}

/**
 * Ограничение значения в диапазоне
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}

/**
 * Парсинг hex цвета в RGB
 */
const parseHex = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) throw new Error(`Invalid hex color: ${hex}`)
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Конвертация RGB в hex
 */
const rgbToHex = (r: number, g: number, b: number): Hex => {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}` as Hex
}

// Test-only export to validate clamping behavior
export const __rgbToHexForTests = rgbToHex

/**
 * Смешивание двух цветов (с кэшированием)
 */
import { getCachedColor } from './cache'

/**
 * Перцептуальные (OKLCH) операции.
 * Лёгкая реализация без внешних зависимостей: приближённая конверсия sRGB -> OKLab -> OKLCH и обратно.
 * Цель: лучше сохранять chroma при осветлении/затемнении синевато-циановых оттенков.
 * Если что-то идёт не так (NaN / вне диапазона) — graceful fallback на sRGB mix.
 */

interface Oklch {
  l: number
  c: number
  h: number
}

// Вспомогательные матрицы / функции (упрощённые, достаточно для относительных сдвигов)
const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

const rgbToOklab = (r: number, g: number, b: number) => {
  // linear
  const lr = srgbToLinear(r / 255)
  const lg = srgbToLinear(g / 255)
  const lb = srgbToLinear(b / 255)
  // LMS (approx)
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb)
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb)
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const b2 = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return { L, a, b: b2 }
}

const oklabToOklch = (L: number, a: number, b: number): Oklch => {
  const c = Math.sqrt(a * a + b * b)
  let h = Math.atan2(b, a)
  if (h < 0) h += Math.PI * 2
  return { l: L, c, h }
}

const oklchToOklab = (l: number, c: number, h: number) => {
  const a = c * Math.cos(h)
  const b = c * Math.sin(h)
  return { L: l, a, b }
}

const oklabToRgb = (L: number, a: number, b: number) => {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  r = clamp01(linearToSrgb(r)) * 255
  g = clamp01(linearToSrgb(g)) * 255
  b2 = clamp01(linearToSrgb(b2)) * 255
  return { r, g, b: b2 }
}

const hexToOklch = (hex: string): Oklch => {
  const { r, g, b } = parseHex(hex)
  const { L, a, b: bb } = rgbToOklab(r, g, b)
  return oklabToOklch(L, a, bb)
}

const oklchToHex = ({ l, c, h }: Oklch): Hex => {
  const { L, a, b } = oklchToOklab(l, clamp(c, 0, 0.5), h) // ограничим chroma чтобы не вылетело
  const { r, g, b: bb } = oklabToRgb(L, a, b)
  return rgbToHex(r, g, bb)
}

function safePerceptual(
  fn: () => string,
  fallback: () => string,
  cacheKey: string
): Hex {
  try {
    return getCachedColor(cacheKey, () => fn()) as Hex
  } catch {
    return fallback() as Hex
  }
}

export const mixPerceptual = (
  color1: string,
  color2: string,
  ratio: number
): Hex => {
  const r = clamp(ratio, 0, 1)
  return safePerceptual(
    () => {
      if (!validateHex(color1) || !validateHex(color2))
        throw new Error('invalid')
      const o1 = hexToOklch(color1)
      const o2 = hexToOklch(color2)
      const blended: Oklch = {
        l: o1.l * (1 - r) + o2.l * r,
        c: o1.c * (1 - r) + o2.c * r,
        h: o1.h * (1 - r) + o2.h * r,
      }
      return oklchToHex(blended)
    },
    () => mix(color1, color2, r),
    `mixP-${color1}-${color2}-${r}`
  )
}

export const lightenPerceptual = (color: string, amount: number): Hex => {
  return safePerceptual(
    () => {
      if (!validateHex(color)) throw new Error('invalid')
      const o = hexToOklch(color)
      const l = clamp(o.l + amount * 0.4, 0, 1)
      return oklchToHex({ l, c: o.c, h: o.h })
    },
    () => lighten(color, amount),
    `lightenP-${color}-${amount}`
  )
}

export const darkenPerceptual = (color: string, amount: number): Hex => {
  return safePerceptual(
    () => {
      if (!validateHex(color)) throw new Error('invalid')
      const o = hexToOklch(color)
      const l = clamp(o.l - amount * 0.5, 0, 1)
      return oklchToHex({ l, c: o.c, h: o.h })
    },
    () => darken(color, amount),
    `darkenP-${color}-${amount}`
  )
}

// Флаг (через env) для переключения глобально на perceptual операции при генерации
const USE_PERCEPTUAL = process.env.USE_PERCEPTUAL === '1'

const mixColors = (color1: string, color2: string, ratio: number): Hex => {
  if (!validateHex(color1)) throw new Error(`Invalid hex color: ${color1}`)
  if (!validateHex(color2)) throw new Error(`Invalid hex color: ${color2}`)

  const clampedRatio = clamp(ratio, 0, 1)
  const c1 = parseHex(color1)
  const c2 = parseHex(color2)
  const r = c1.r * (1 - clampedRatio) + c2.r * clampedRatio
  const g = c1.g * (1 - clampedRatio) + c2.g * clampedRatio
  const b = c1.b * (1 - clampedRatio) + c2.b * clampedRatio
  return rgbToHex(r, g, b)
}

export const mix = (color1: string, color2: string, ratio: number): Hex => {
  if (USE_PERCEPTUAL) return mixPerceptual(color1, color2, ratio)
  const key = `mix-${color1}-${color2}-${ratio}`
  return getCachedColor(key, mixColors, color1, color2, ratio) as Hex
}

/**
 * Добавление прозрачности к цвету
 */
export const withAlpha = (color: string, alpha: number): Hex => {
  if (!validateHex(color)) throw new Error(`Invalid hex color: ${color}`)

  const clampedAlpha = clamp(alpha, 0, 1)
  const alphaHex = Math.round(clampedAlpha * 255)
    .toString(16)
    .padStart(2, '0')
  return `${color}${alphaHex}` as Hex
}

/**
 * Осветление цвета
 */
export const lighten = (color: string, amount: number): Hex => {
  if (USE_PERCEPTUAL) return lightenPerceptual(color, amount)
  return mix(color, '#ffffff', amount)
}

/**
 * Затемнение цвета
 */
export const darken = (color: string, amount: number): Hex => {
  if (USE_PERCEPTUAL) return darkenPerceptual(color, amount)
  return mix(color, '#000000', amount)
}

// Test-only export to cover parse error and success branches
export const __parseHexForTests = parseHex
