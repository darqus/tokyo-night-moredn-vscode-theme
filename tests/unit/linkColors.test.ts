import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('Link colors and terminal hover', () => {
  it('should use unified textLink colors (no multi-color pieces)', () => {
    const c = generateTheme().colors
    expect(c['textLink.foreground']).toBe(interfacePalette.state.info)
    expect(c['textLink.activeForeground']).toBe(interfacePalette.state.info)
  })

  it('should increase terminal link hover contrast', () => {
    const c = generateTheme().colors
    expect(c['terminal.hoverHighlightBackground']).toBe(
      interfacePalette.bg.selection
    )
  })
})
