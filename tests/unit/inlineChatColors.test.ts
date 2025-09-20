import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('Inline Chat and toolbar colors', () => {
  it('should set inline chat and toolbar hover colors using valid keys', () => {
    const c = generateTheme().colors as Record<string, string>

    // Toolbar: only documented hover/active keys
    expect(c['toolbar.hoverBackground']).toBe(interfacePalette.bg.hover)
    expect(c['toolbar.activeBackground']).toBe(interfacePalette.bg.selection)
    expect(c['toolbar.hoverOutline']).toBe(interfacePalette.border.focus)

    // Inline Chat: documented keys
    expect(c['inlineChat.background']).toBe(interfacePalette.bg.elevated)
    expect(c['inlineChat.foreground']).toBe(interfacePalette.text.primary)
    expect(c['inlineChat.border']).toBe(interfacePalette.border.default)

    // Ensure we do not emit undocumented keys
    expect('toolbar.foreground' in c).toBe(false)
    expect('inlineChat.toolbarForeground' in c).toBe(false)
    expect('inlineChat.toolbarHoverBackground' in c).toBe(false)
    expect('inlineChat.toolbarBorder' in c).toBe(false)
  })
})
