import { generateTheme, loadEnvVars } from '../../src/generators/theme'

const generateTestTheme = () => generateTheme(loadEnvVars())
import { withAlpha } from '../../src/core/utils'
import { interfacePalette } from '../../src/core/interface'

describe('Search highlight colors', () => {
  it('editor find highlight should use cool blue scheme', () => {
    const theme = generateTheme(loadEnvVars())
    const c = theme.colors

    const current = interfacePalette.derived.findMatch.background
    const border = interfacePalette.derived.findMatch.border
    const other = interfacePalette.derived.findMatch.highlightBackground

    expect(c['editor.findMatchBackground']).toBe(current)
    expect(c['editor.findMatchBorder']).toBe(border)
    expect(c['editor.findMatchHighlightBackground']).toBe(other)
    expect(c['editor.findMatchForeground']).toBe(interfacePalette.text.primary)
    // Do not assert on editor.findMatchHighlightForeground: we omit it to avoid opaque overlay
  })

  it('terminal find highlight should mirror editor scheme', () => {
    const theme = generateTheme(loadEnvVars())
    const c = theme.colors

    const current = interfacePalette.derived.findMatch.background
    const border = interfacePalette.derived.findMatch.border
    const other = interfacePalette.derived.findMatch.highlightBackground

    expect(c['terminal.findMatchBackground']).toBe(current)
    expect(c['terminal.findMatchBorder']).toBe(border)
    expect(c['terminal.findMatchHighlightBackground']).toBe(other)
  })

  it('list filter matches should align with scheme', () => {
    const theme = generateTheme(loadEnvVars())
    const c = theme.colors

    const border = interfacePalette.derived.findMatch.border
    const other = interfacePalette.derived.findMatch.highlightBackground

    expect(c['list.filterMatchBackground']).toBe(other)
    expect(c['list.filterMatchBorder']).toBe(border)
  })

  it('search editor matches should align with scheme', () => {
    const theme = generateTheme(loadEnvVars())
    const c = theme.colors

    const border = interfacePalette.derived.findMatch.border
    const other = interfacePalette.derived.findMatch.highlightBackground

    expect(c['searchEditor.findMatchBackground']).toBe(other)
    expect(c['searchEditor.findMatchBorder']).toBe(border)
  })
})
