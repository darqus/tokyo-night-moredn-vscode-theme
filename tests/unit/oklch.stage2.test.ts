import { generateTheme, loadEnvVars } from '../../src/generators/theme'

const generateTestTheme = () => generateTheme(loadEnvVars())
import { interfacePalette } from '../../src/core/interface'

describe('OKLCH Stage 2 targeted checks', () => {
  it('rangeHighlight should use hover tone (OKLCH-based) with transparency', () => {
    const c = generateTheme(loadEnvVars()).colors
    // В текущей палитре rangeHighlight равен bg.hover (уже OKLCH для core hover)
    expect(c['editor.rangeHighlightBackground']).toBe(interfacePalette.bg.hover)
  })

  it('scrollbarSlider family should derive from hover/active/selection accordingly', () => {
    const c = generateTheme(loadEnvVars()).colors
    expect(c['scrollbarSlider.background']).toBe(interfacePalette.bg.hover)
    expect(c['scrollbarSlider.hoverBackground']).toBe(
      interfacePalette.bg.active
    )
    expect(c['scrollbarSlider.activeBackground']).toBe(
      interfacePalette.bg.selection
    )
  })
})
