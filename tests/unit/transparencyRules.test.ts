import { generateTheme, loadEnvVars } from '../../src/generators/theme'

const generateTestTheme = () => generateTheme(loadEnvVars())

const alphaOf = (hex: string): number => {
  // Accept #RRGGBB or #RRGGBBAA
  const m = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/.exec(hex)
  if (!m) throw new Error(`Invalid hex: ${hex}`)
  const aa = m[2] ? parseInt(m[2], 16) : 255
  return aa / 255
}

describe('Transparency rules and schema safety', () => {
  it('dropBackground-like tokens must be transparent', () => {
    const c = generateTestTheme().colors
    const keys = [
      'editorGroup.dropBackground',
      'list.dropBackground',
      'panelSection.dropBackground',
      'terminal.dropBackground',
    ] as const

    for (const k of keys) {
      expect(c[k]).toBeDefined()
      expect(alphaOf(c[k])).toBeLessThan(1)
    }
  })

  it('find match backgrounds must not be opaque', () => {
    const c = generateTheme(loadEnvVars()).colors
    const keys = [
      'editor.findMatchBackground',
      'editor.findMatchHighlightBackground',
      'editor.wordHighlightBackground',
      'editor.wordHighlightStrongBackground',
      'editor.hoverHighlightBackground',
      'editor.rangeHighlightBackground',
      'terminal.findMatchBackground',
      'terminal.findMatchHighlightBackground',
      'searchEditor.findMatchBackground',
      'list.filterMatchBackground',
    ] as const

    for (const k of keys) {
      expect(c[k]).toBeDefined()
      expect(alphaOf(c[k])).toBeLessThan(1)
    }
  })

  it('must not emit terminal.selectionForeground (let VS Code auto-contrast)', () => {
    const c = generateTheme(loadEnvVars()).colors as Record<string, string>
    expect('terminal.selectionForeground' in c).toBe(false)
  })
})
