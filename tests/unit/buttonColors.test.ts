import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('Button color tokens', () => {
  it('should map primary button colors from interface palette', () => {
    const theme = generateTheme(loadEnvVars())
    const c = theme.colors

    expect(c['button.background']).toBe(
      interfacePalette.button.primary.background
    )
    expect(c['button.foreground']).toBe(
      interfacePalette.button.primary.foreground
    )
    expect(c['button.hoverBackground']).toBe(
      interfacePalette.button.primary.hoverBackground
    )
    expect(c['button.border']).toBe(interfacePalette.button.primary.border)
    expect(c['button.separator']).toBe(
      interfacePalette.button.primary.separator
    )
  })

  it('should map secondary button colors from interface palette', () => {
    const theme = generateTheme(loadEnvVars())
    const c = theme.colors

    expect(c['button.secondaryBackground']).toBe(
      interfacePalette.button.secondary.background
    )
    expect(c['button.secondaryForeground']).toBe(
      interfacePalette.button.secondary.foreground
    )
    expect(c['button.secondaryHoverBackground']).toBe(
      interfacePalette.button.secondary.hoverBackground
    )
  })
})
