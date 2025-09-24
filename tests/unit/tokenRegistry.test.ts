import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import {
  TOKEN_REGISTRY,
  validateTokenAlpha,
  hasToken,
  isTransparentHex,
} from '../../src/core/tokenRegistry'
import { interfacePalette } from '../../src/core/interface'
import { getContrastRatio } from '../../src/core/contrast'

const generateTestTheme = () => generateTheme(loadEnvVars())

describe('Token Registry validation', () => {
  it('should respect alpha policies for registered tokens', () => {
    const theme = generateTestTheme()
    const colors = theme.colors
    for (const meta of TOKEN_REGISTRY) {
      const value = colors[meta.key]
      if (!value) continue // not all tokens must be present in theme
      if (meta.alpha) {
        const ok = validateTokenAlpha(meta.key, value, meta.alpha)
        if (!ok) {
          console.log(`Token validation failed for key: ${meta.key}, value: ${value}, policy: ${meta.alpha}`);
        }
        expect(ok).toBe(true)
      }
    }
  })

  it('should include key overlay/quick input backgrounds (coverage)', () => {
    const { colors } = generateTestTheme()
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

  it('should satisfy contrastHints where provided (advisory)', () => {
    const { colors } = generateTestTheme()
    for (const meta of TOKEN_REGISTRY) {
      if (!meta.contrastHints || !meta.bgKey) continue
      const fg = colors[meta.key]
      const bg = colors[meta.bgKey]
      if (!fg || !bg) continue
      // используем только шестнадцатеричные без альфы
      if (!fg.startsWith('#') || !bg.startsWith('#')) continue
      if (fg.length !== 7 || bg.length !== 7) continue
      const ratio = getContrastRatio(fg as `#${string}`, bg as `#${string}`)
      const min = Math.max(
        meta.contrastHints.primaryMin ?? 0,
        meta.contrastHints.mutedMin ?? 0,
        meta.contrastHints.subtleMin ?? 0
      )
      if (min > 0) {
        expect(ratio).toBeGreaterThanOrEqual(min)
      }
    }
  })

  it('should enforce transparency for selection/slider families where required', () => {
    const { colors: bg } = generateTestTheme()
    const keys = [
      'editor.selectionBackground',
      'editor.inactiveSelectionBackground',
      'list.activeSelectionBackground',
      'list.inactiveSelectionBackground',
      'menubar.selectionBackground',
      'menu.selectionBackground',
      'scrollbarSlider.background',
      'scrollbarSlider.hoverBackground',
      'scrollbarSlider.activeBackground',
      'minimapSlider.background',
      'minimapSlider.hoverBackground',
      'minimapSlider.activeBackground',
    ]
    keys.forEach((k) => {
      if (hasToken(bg, k)) {
        expect(isTransparentHex(bg[k])).toBeTruthy()
      }
    })
  })
})
