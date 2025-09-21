import { generateTheme } from '../../src/generators/theme'
import { basePalette } from '../../src/core/palette'
import { withAlpha } from '../../src/core/utils'
import { interfacePalette } from '../../src/core/interface'

describe('Search highlight colors', () => {
  it('editor find highlight should use warm yellow scheme', () => {
    const theme = generateTheme()
    const c = theme.colors

    const current = withAlpha(basePalette.yellow, 0.22)
    const border = withAlpha(basePalette.yellow, 0.6)
    const other = withAlpha(basePalette.yellow, 0.16)

    expect(c['editor.findMatchBackground']).toBe(current)
    expect(c['editor.findMatchBorder']).toBe(border)
    expect(c['editor.findMatchHighlightBackground']).toBe(other)
    expect(c['editor.findMatchForeground']).toBe(interfacePalette.text.primary)
    expect(c['editor.findMatchHighlightForeground']).toBe(
      interfacePalette.text.primary
    )
  })

  it('terminal find highlight should mirror editor scheme', () => {
    const theme = generateTheme()
    const c = theme.colors

    const current = withAlpha(basePalette.yellow, 0.22)
    const border = withAlpha(basePalette.yellow, 0.6)
    const other = withAlpha(basePalette.yellow, 0.16)

    expect(c['terminal.findMatchBackground']).toBe(current)
    expect(c['terminal.findMatchBorder']).toBe(border)
    expect(c['terminal.findMatchHighlightBackground']).toBe(other)
  })

  it('list filter matches should align with scheme', () => {
    const theme = generateTheme()
    const c = theme.colors

    const border = withAlpha(basePalette.yellow, 0.6)
    const other = withAlpha(basePalette.yellow, 0.16)

    expect(c['list.filterMatchBackground']).toBe(other)
    expect(c['list.filterMatchBorder']).toBe(border)
  })

  it('search editor matches should align with scheme', () => {
    const theme = generateTheme()
    const c = theme.colors

    const border = withAlpha(basePalette.yellow, 0.6)
    const other = withAlpha(basePalette.yellow, 0.16)

    expect(c['searchEditor.findMatchBackground']).toBe(other)
    expect(c['searchEditor.findMatchBorder']).toBe(border)
  })
})
