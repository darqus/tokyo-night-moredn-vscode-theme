import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import { basePalette } from '../../src/core/palette'
import { lighten, mix, withAlpha } from '../../src/core/utils'

describe('Link colors and terminal hover', () => {
  it('should use unified link color from palette', () => {
    const c = generateTheme(loadEnvVars()).colors
    const link = basePalette.linkDefault
    expect(c['textLink.foreground']).toBe(link)
    expect(c['textLink.activeForeground']).toBe(link)
    expect(c['editorLink.activeForeground']).toBe(link)
  })

  it('should have stronger terminal link hover background', () => {
    const c = generateTheme(loadEnvVars()).colors
    // Cooler cyan→blue mix with a bit more alpha for visibility
    const expected = withAlpha(
      mix(basePalette.cyan, basePalette.blue, 0.35),
      0.24
    )
    expect(c['terminal.hoverHighlightBackground']).toBe(expected)
  })

  it('should align terminal ANSI blue/cyan with link color', () => {
    const c = generateTheme(loadEnvVars()).colors
    const link = basePalette.linkDefault
    expect(c['terminal.ansiCyan']).toBe(link)
    expect(c['terminal.ansiBrightCyan']).toBe(link)
    expect(c['terminal.ansiBlue']).toBe(link)
    expect(c['terminal.ansiBrightBlue']).toBe(link)
  })
})
