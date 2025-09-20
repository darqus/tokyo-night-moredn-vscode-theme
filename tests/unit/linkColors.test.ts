import { generateTheme } from '../../src/generators/theme'
import { basePalette } from '../../src/core/palette'
import { lighten } from '../../src/core/utils'

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
    // rgba hex with alpha expected from withAlpha(basePalette.cyan, 0.22)
    expect(c['terminal.hoverHighlightBackground']).toBe('#7dcfff38')
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
