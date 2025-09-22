/**
 * Targeted tests for pickReadable utilities to improve coverage
 */

import { interfacePalette } from '../../src/core/interface'
import {
  pickReadableAdvanced,
  pickReadable,
  pickAccessibleText,
  getTextRolesWithContrast,
} from '../../src/generators/pickReadable'
import { getContrastRatioAware } from '../../src/core/contrast'

describe('pickReadable utilities', () => {
  test('pickReadableAdvanced prefers subtle when thresholds allow', () => {
    const color = pickReadableAdvanced(interfacePalette, 'base', 'subtle', {
      subtleMin: 0,
      mutedMin: 3.0,
      primaryMin: 4.5,
      inactiveMin: 2.0,
    })
    expect(color).toBe(interfacePalette.textOn.base.subtle)
  })

  test('pickReadableAdvanced falls back to muted then primary when thresholds are strict', () => {
    // Force subtle to fail, allow muted to pass
    const mutedOk = pickReadableAdvanced(
      interfacePalette,
      'elevated',
      'subtle',
      {
        subtleMin: 100, // impossible
        mutedMin: 0, // guaranteed
      }
    )
    expect(mutedOk).toBe(interfacePalette.textOn.elevated.muted)

    // Now force both subtle and muted to fail -> primary
    const primaryFallback = pickReadableAdvanced(
      interfacePalette,
      'overlay',
      'subtle',
      {
        subtleMin: 100,
        mutedMin: 100,
      }
    )
    expect(primaryFallback).toBe(interfacePalette.textOn.overlay.primary)
  })

  test('pickReadable (deprecated) respects preferred and thresholds', () => {
    // Prefer muted and allow it
    const muted = pickReadable(interfacePalette, 'base', 'muted', {
      mutedMin: 0,
    })
    expect(muted).toBe(interfacePalette.textOn.base.muted)

    // Prefer subtle but force fallback to primary
    const primary = pickReadable(interfacePalette, 'base', 'subtle', {
      subtleMin: 100,
      mutedMin: 100,
    })
    expect(primary).toBe(interfacePalette.textOn.base.primary)
  })

  test('pickAccessibleText meets AA and AAA targets when possible', () => {
    const aa = pickAccessibleText(interfacePalette, 'base', 'AA')
    const aaContrast = getContrastRatioAware(
      aa as any,
      interfacePalette.bg.base as any
    )
    expect(aaContrast).toBeGreaterThanOrEqual(4.5)

    const aaa = pickAccessibleText(interfacePalette, 'base', 'AAA')
    const aaaContrast = getContrastRatioAware(
      aaa as any,
      interfacePalette.bg.base as any
    )
    // Base surface primary on black should comfortably meet AAA in our palette
    expect(aaaContrast).toBeGreaterThanOrEqual(7.0)
  })

  test('getTextRolesWithContrast returns contrasts for all roles', () => {
    const result = getTextRolesWithContrast(interfacePalette, 'overlay')
    expect(result).toHaveLength(4)

    const bg = interfacePalette.bg.overlay
    const roles = interfacePalette.textOn.overlay

    // Ensure roles are present with computed contrast values
    const primary = result.find((r) => r.role === 'primary')!
    expect(primary.color).toBe(roles.primary)
    expect(primary.contrast).toBeCloseTo(
      getContrastRatioAware(roles.primary as any, bg as any)
    )

    const muted = result.find((r) => r.role === 'muted')!
    expect(muted.color).toBe(roles.muted)
    expect(muted.contrast).toBeCloseTo(
      getContrastRatioAware(roles.muted as any, bg as any)
    )

    const subtle = result.find((r) => r.role === 'subtle')!
    expect(subtle.color).toBe(roles.subtle)
    expect(subtle.contrast).toBeCloseTo(
      getContrastRatioAware(roles.subtle as any, bg as any)
    )

    const inactive = result.find((r) => r.role === 'inactive')!
    expect(inactive.color).toBe(roles.inactive)
    expect(inactive.contrast).toBeCloseTo(
      getContrastRatioAware(roles.inactive as any, bg as any)
    )
  })
})
