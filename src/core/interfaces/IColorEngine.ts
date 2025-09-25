/**
 * Интерфейс для цветового движка
 */
import type { Hex } from '../../types/theme'

export interface IColorEngine {
  // sRGB операции для нейтральных тонов
  mixSrgb(c1: Hex, c2: Hex, t: number): Hex
  lightenSrgb(color: Hex, amount: number): Hex
  darkenSrgb(color: Hex, amount: number): Hex
  withAlphaCached(color: Hex, alpha: number): string

  // OKLCH операции для перцептуальных вычислений
  mixPerceptual(c1: Hex, c2: Hex, t: number): Hex
  lightenPerceptual(color: Hex, amount: number): Hex
  darkenPerceptual(color: Hex, amount: number): Hex

  // Утилиты
  warmupCache(baseColors: Hex[]): void
  getCacheStats(): { hits: number; misses: number; size: number }
}

export interface ColorEngineConfig {
  maxCacheSize?: number
  enableStats?: boolean
  enableWarmup?: boolean
}
