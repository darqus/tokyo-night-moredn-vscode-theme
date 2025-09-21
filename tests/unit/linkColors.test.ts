import { generateTheme } from '../../src/generators/theme'
import { basePalette } from '../../src/core/palette'
import { lighten, mix, withAlpha } from '../../src/core/utils'

describe('Link colors and terminal hover', () => {
  it('should use unified and brighter textLink colors', () => {
    const c = generateTheme().colors
    const bright = lighten(basePalette.cyan, 0.22)
    expect(c['textLink.foreground']).toBe(bright)
    expect(c['textLink.activeForeground']).toBe(bright)
    expect(c['editorLink.activeForeground']).toBe(bright)
  })

  it('should have stronger terminal link hover background', () => {
    const c = generateTheme().colors
    // Cooler cyan→blue mix with a bit more alpha for visibility
    const expected = withAlpha(
      mix(basePalette.cyan, basePalette.blue, 0.35),
      0.24
    )
    expect(c['terminal.hoverHighlightBackground']).toBe(expected)
  })

  it('should align terminal ANSI blue/cyan with link color', () => {
    const c = generateTheme().colors
    const bright = lighten(basePalette.cyan, 0.22)
    expect(c['terminal.ansiCyan']).toBe(bright)
    expect(c['terminal.ansiBrightCyan']).toBe(bright)
    expect(c['terminal.ansiBlue']).toBe(bright)
    expect(c['terminal.ansiBrightBlue']).toBe(bright)
  })
})
