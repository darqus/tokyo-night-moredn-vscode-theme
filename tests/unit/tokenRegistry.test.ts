import { generateTheme } from '../../src/generators/theme'
import {
  TOKEN_REGISTRY,
  validateTokenAlpha,
  hasToken,
} from '../../src/core/tokenRegistry'
import { interfacePalette } from '../../src/core/interface'
import { getContrastRatio } from '../../src/core/contrast'

describe('Token Registry validation', () => {
  it('should respect alpha policies for registered tokens', () => {
    const theme = generateTheme()
    const colors = theme.colors
    for (const meta of TOKEN_REGISTRY) {
      const value = colors[meta.key]
      if (!value) continue // not all tokens must be present in theme
      if (meta.alpha) {
        const ok = validateTokenAlpha(meta.key, value, meta.alpha)
        expect(ok).toBe(true)
      }
    }
  })

  it('should include key overlay/quick input backgrounds (coverage)', () => {
    const { colors } = generateTheme()
    expect(hasToken(colors, 'editorHoverWidget.background')).toBe(true)
    expect(hasToken(colors, 'editorSuggestWidget.background')).toBe(true)
    expect(hasToken(colors, 'quickInput.background')).toBe(true)
  })

  it('overlay surface contrast should meet basic thresholds', () => {
    const primary = getContrastRatio(
      interfacePalette.textOn.overlay.primary,
      interfacePalette.bg.overlay
    )
    const muted = getContrastRatio(
      interfacePalette.textOn.overlay.muted,
      interfacePalette.bg.overlay
    )
    expect(primary).toBeGreaterThanOrEqual(4.5)
    expect(muted).toBeGreaterThanOrEqual(3.0)
  })
})
