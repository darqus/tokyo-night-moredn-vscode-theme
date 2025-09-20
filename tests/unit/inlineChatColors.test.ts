import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('Inline Chat and toolbar colors', () => {
  it('should set toolbar and inline chat colors for contrast', () => {
    const c = generateTheme().colors

    expect(c['toolbar.foreground']).toBe(interfacePalette.text.primary)

    expect(c['inlineChat.background']).toBe(interfacePalette.bg.elevated)
    expect(c['inlineChat.foreground']).toBe(interfacePalette.text.primary)
    expect(c['inlineChat.border']).toBe(interfacePalette.border.default)

    expect(c['inlineChat.toolbarForeground']).toBe(
      interfacePalette.text.primary
    )
    expect(c['inlineChat.toolbarHoverBackground']).toBe(
      interfacePalette.bg.hover
    )
    expect(c['inlineChat.toolbarBorder']).toBe(interfacePalette.border.default)
  })
})
