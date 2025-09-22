/**
 * Тесты для кэширования цветовых операций
 */

import {
  mixSrgb,
  mixPerceptual,
  lightenSrgb,
  darkenSrgb,
  lightenPerceptual,
  darkenPerceptual,
  withAlphaCached,
  warmupColorCache,
} from '../../src/core/colorEngine'
import { getCacheStats, clearColorCache } from '../../src/core/cache'

describe('Color Engine Caching', () => {
  beforeEach(() => {
    clearColorCache()
  })

  test('should cache sRGB mix operations', () => {
    const color1 = '#ff0000' as const
    const color2 = '#0000ff' as const
    const t = 0.5

    const result1 = mixSrgb(color1, color2, t)
    const result2 = mixSrgb(color1, color2, t)

    expect(result1).toBe(result2)
    expect(result1).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should cache OKLCH mix operations', () => {
    const color1 = '#ff0000' as const
    const color2 = '#0000ff' as const
    const t = 0.5

    const result1 = mixPerceptual(color1, color2, t)
    const result2 = mixPerceptual(color1, color2, t)

    expect(result1).toBe(result2)
    expect(result1).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should cache lighten operations', () => {
    const color = '#808080' as const
    const amount = 0.2

    const srgbResult1 = lightenSrgb(color, amount)
    const srgbResult2 = lightenSrgb(color, amount)

    const oklchResult1 = lightenPerceptual(color, amount)
    const oklchResult2 = lightenPerceptual(color, amount)

    expect(srgbResult1).toBe(srgbResult2)
    expect(oklchResult1).toBe(oklchResult2)
    expect(srgbResult1).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(oklchResult1).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should cache darken operations', () => {
    const color = '#808080' as const
    const amount = 0.2

    const srgbResult1 = darkenSrgb(color, amount)
    const srgbResult2 = darkenSrgb(color, amount)

    const oklchResult1 = darkenPerceptual(color, amount)
    const oklchResult2 = darkenPerceptual(color, amount)

    expect(srgbResult1).toBe(srgbResult2)
    expect(oklchResult1).toBe(oklchResult2)
    expect(srgbResult1).toMatch(/^#[0-9a-fA-F]{6}$/)
    expect(oklchResult1).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  test('should cache alpha operations', () => {
    const color = '#ff0000' as const
    const alpha = 0.5

    const result1 = withAlphaCached(color, alpha)
    const result2 = withAlphaCached(color, alpha)

    expect(result1).toBe(result2)
    expect(result1).toMatch(/^#[0-9a-fA-F]{8}$/)
  })

  test('should warm up cache efficiently', () => {
    const baseColors = ['#ff0000', '#00ff00', '#0000ff'] as any[]

    const statsBefore = getCacheStats()
    warmupColorCache(baseColors)
    const statsAfter = getCacheStats()

    expect(statsAfter.size).toBeGreaterThan(statsBefore.size)
  })

  test('should handle cache operations correctly', () => {
    // Выполним несколько операций
    mixSrgb('#ff0000', '#00ff00', 0.5)
    lightenSrgb('#808080', 0.1)
    withAlphaCached('#ff0000', 0.7)

    const stats = getCacheStats()
    expect(stats.size).toBeGreaterThan(0)

    // Очистим кэш
    clearColorCache()
    const statsAfterClear = getCacheStats()
    expect(statsAfterClear.size).toBe(0)
  })

  test('should provide different results for different operations', () => {
    const color = '#808080' as const

    const srgbLighten = lightenSrgb(color, 0.2)
    const oklchLighten = lightenPerceptual(color, 0.2)

    // OKLCH и sRGB должны давать разные результаты
    expect(srgbLighten).not.toBe(oklchLighten)
  })

  test('should cache with proper precision', () => {
    const color1 = '#ff0000' as const
    const color2 = '#00ff00' as const

    // Операции с одинаковыми параметрами должны кэшироваться
    const result1 = mixSrgb(color1, color2, 0.5)
    const result2 = mixSrgb(color1, color2, 0.5)
    expect(result1).toBe(result2)

    // Операции с разными параметрами должны различаться
    const result3 = mixSrgb(color1, color2, 0.6)
    expect(result1).not.toBe(result3)
  })
})
