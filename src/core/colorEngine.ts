/**
 * Централизованный фасад цветовых операций с кэшированием.
 * Оборачивает sRGB-утилиты и OKLCH-утилиты и фиксирует правила их применения.
 */
import type { Hex } from '../types/theme'
import {
  mix,
  withAlpha,
  lighten as lightenSrgbCore,
  darken as darkenSrgbCore,
} from './utils'
import { oklchLighten, oklchDarken, oklchMix } from './oklch'
import { getCachedColor } from './cache'

// Кэшированные sRGB операции (для нейтральных тонов, бордеров, чёрно-белых миксов)
export const mixSrgb = (c1: Hex, c2: Hex, t: number): Hex => {
  const key = `srgb-mix:${c1}:${c2}:${t.toFixed(3)}`
  return getCachedColor(key, mix, c1, c2, t) as Hex
}

export const lightenSrgb = (color: Hex, amount: number): Hex => {
  const key = `srgb-lighten:${color}:${amount.toFixed(3)}`
  return getCachedColor(key, lightenSrgbCore, color, amount) as Hex
}

export const darkenSrgb = (color: Hex, amount: number): Hex => {
  const key = `srgb-darken:${color}:${amount.toFixed(3)}`
  return getCachedColor(key, darkenSrgbCore, color, amount) as Hex
}

export const withAlphaCached = (color: Hex, alpha: number): string => {
  const key = `alpha:${color}:${alpha.toFixed(3)}`
  return getCachedColor(key, withAlpha, color, alpha)
}

// Кэшированные перцептуальные операции (OKLCH) — для hover/selection/shadows/highlights
export const mixPerceptual = (c1: Hex, c2: Hex, t: number): Hex => {
  const key = `oklch-mix:${c1}:${c2}:${t.toFixed(3)}`
  return getCachedColor(key, oklchMix, c1, c2, t) as Hex
}

export const lightenPerceptual = (c: Hex, amount: number): Hex => {
  const key = `oklch-lighten:${c}:${amount.toFixed(3)}`
  return getCachedColor(key, oklchLighten, c, amount) as Hex
}

export const darkenPerceptual = (c: Hex, amount: number): Hex => {
  const key = `oklch-darken:${c}:${amount.toFixed(3)}`
  return getCachedColor(key, oklchDarken, c, amount) as Hex
}

// Обратная совместимость - экспорт оригинальных функций без кэширования
export { withAlpha }

// Руководство по применению (док-строка, не код):
// - selection/hover/shadows/findMatch/peekView → OKLCH (перцептуально стабильные)
// - нейтральные бордеры/серые/простые затемнения/осветления → sRGB
// - альфа всегда через withAlpha/withAlphaCached

/**
 * Прогрев кэша для базовых цветов темы
 */
export const warmupColorCache = (baseColors: Hex[]): void => {
  const amounts = [0.1, 0.2, 0.3, 0.5, 0.7]
  const tValues = [0.1, 0.2, 0.3, 0.5, 0.7]
  const alphaValues = [0.1, 0.2, 0.3, 0.5, 0.7, 0.8, 0.9]

  // Прогрев операций осветления/затемнения
  baseColors.forEach((color) => {
    amounts.forEach((amount) => {
      lightenSrgb(color, amount)
      darkenSrgb(color, amount)
      lightenPerceptual(color, amount)
      darkenPerceptual(color, amount)
    })

    alphaValues.forEach((alpha) => {
      withAlphaCached(color, alpha)
    })
  })

  // Прогрев миксов между базовыми цветами
  for (let i = 0; i < baseColors.length; i++) {
    for (let j = i + 1; j < baseColors.length; j++) {
      tValues.forEach((t) => {
        mixSrgb(baseColors[i], baseColors[j], t)
        mixPerceptual(baseColors[i], baseColors[j], t)
      })
    }
  }
}
