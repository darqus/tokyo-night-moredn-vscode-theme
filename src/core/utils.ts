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
  return mix(color, '#ffffff', amount)
}

/**
 * Затемнение цвета
 */
export const darken = (color: string, amount: number): Hex => {
  return mix(color, '#000000', amount)
}

// Test-only export to cover parse error and success branches
export const __parseHexForTests = parseHex
