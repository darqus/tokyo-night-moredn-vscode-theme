import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('Button color tokens', () => {
  it('should map primary button colors from interface palette', () => {
    const theme = generateTheme()
    const c = theme.colors

    expect(c['button.background']).toBe(interfacePalette.button.default)
    expect(c['button.foreground']).toBe(interfacePalette.text.primary)
    expect(c['button.hoverBackground']).toBe(interfacePalette.button.hover)
    expect(c['button.border']).toBe(interfacePalette.border.default)
    expect(c['button.separator']).toBe(interfacePalette.border.default)
  })

  it('should map secondary button colors from interface palette', () => {
    const theme = generateTheme()
    const c = theme.colors

    expect(c['button.secondaryBackground']).toBe(interfacePalette.bg.overlay)
    expect(c['button.secondaryForeground']).toBe(interfacePalette.text.primary)
    expect(c['button.secondaryHoverBackground']).toBe(
      interfacePalette.bg.hover
    )
  })
})
