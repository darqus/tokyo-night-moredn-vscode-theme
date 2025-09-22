/**
 * Тесты для унифицированной системы поверхностей
 */

import {
  resolveSurface,
  getSurfaceRoles,
  supportsTransparency,
  getContrastThresholds,
  SEMANTIC_TO_BASE_MAPPING,
  DEFAULT_CONTRAST_THRESHOLDS,
} from '../../src/core/surfaces'

describe('Surface System', () => {
  test('should resolve semantic surfaces to base surfaces', () => {
    expect(resolveSurface('editor')).toBe('base')
    expect(resolveSurface('panel')).toBe('elevated')
    expect(resolveSurface('quickInput')).toBe('overlay')
    expect(resolveSurface('menu')).toBe('elevated')
  })

  test('should handle base surfaces directly', () => {
    expect(resolveSurface('base')).toBe('base')
    expect(resolveSurface('elevated')).toBe('elevated')
    expect(resolveSurface('overlay')).toBe('overlay')
  })

  test('should handle interactive surfaces with fallback', () => {
    expect(resolveSurface('hover')).toBe('base')
    expect(resolveSurface('selection')).toBe('base')
    expect(resolveSurface('focus')).toBe('base')
  })

  test('should have complete semantic to base mapping', () => {
    expect(SEMANTIC_TO_BASE_MAPPING.editor).toBe('base')
    expect(SEMANTIC_TO_BASE_MAPPING.terminal).toBe('base')
    expect(SEMANTIC_TO_BASE_MAPPING.panel).toBe('elevated')
    expect(SEMANTIC_TO_BASE_MAPPING.menu).toBe('elevated')
    expect(SEMANTIC_TO_BASE_MAPPING.quickInput).toBe('overlay')
    expect(SEMANTIC_TO_BASE_MAPPING.notification).toBe('overlay')
  })

  test('should provide default contrast thresholds', () => {
    expect(DEFAULT_CONTRAST_THRESHOLDS.primaryMin).toBe(4.5)
    expect(DEFAULT_CONTRAST_THRESHOLDS.mutedMin).toBe(3.0)
    expect(DEFAULT_CONTRAST_THRESHOLDS.subtleMin).toBe(2.5)
    expect(DEFAULT_CONTRAST_THRESHOLDS.inactiveMin).toBe(2.0)
  })

  test('should validate surface resolution for all semantic surfaces', () => {
    const semanticSurfaces = Object.keys(SEMANTIC_TO_BASE_MAPPING)

    for (const surface of semanticSurfaces) {
      const resolved = resolveSurface(surface as any)
      expect(['base', 'elevated', 'overlay']).toContain(resolved)
    }
  })
})
