/**
 * Централизованный фасад цветовых операций.
 * Оборачивает sRGB-утилиты и OKLCH-утилиты и фиксирует правила их применения.
 */
import type { Hex } from '../types/theme'
import {
  mix,
  withAlpha,
  lighten as lightenSrgb,
  darken as darkenSrgb,
} from './utils'
import { oklchLighten, oklchDarken, oklchMix } from './oklch'

// sRGB операции (для нейтральных тонов, бордеров, чёрно-белых миксов)
export const mixSrgb = (c1: Hex, c2: Hex, t: number): Hex => mix(c1, c2, t)
export { withAlpha }
export { lightenSrgb, darkenSrgb }

// Перцептуальные операции (OKLCH) — для hover/selection/shadows/highlights
export const mixPerceptual = (c1: Hex, c2: Hex, t: number): Hex =>
  oklchMix(c1, c2, t)
export const lightenPerceptual = (c: Hex, amount: number): Hex =>
  oklchLighten(c, amount)
export const darkenPerceptual = (c: Hex, amount: number): Hex =>
  oklchDarken(c, amount)

// Руководство по применению (док-строка, не код):
// - selection/hover/shadows/findMatch/peekView → OKLCH (перцептуально стабильные)
// - нейтральные бордеры/серые/простые затемнения/осветления → sRGB
// - альфа всегда через withAlpha
