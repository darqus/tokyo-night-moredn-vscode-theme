import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'
import { isTransparentHex } from '../../src/core/tokenRegistry'

describe('OKLCH peekView highlight tones', () => {
  it('peekView match/selection should use OKLCH-based tones with transparency', () => {
    const c = generateTheme().colors

    const match = interfacePalette.derived.peekView.matchHighlightBackground
    const sel = interfacePalette.derived.peekView.selectionBackground

    expect(c['peekViewEditor.matchHighlightBackground']).toBe(match)
    expect(c['peekViewResult.matchHighlightBackground']).toBe(match)
    expect(c['peekViewResult.selectionBackground']).toBe(sel)

    // transparency checks
    expect(isTransparentHex(match)).toBe(true)
    expect(isTransparentHex(sel)).toBe(true)
  })
})
