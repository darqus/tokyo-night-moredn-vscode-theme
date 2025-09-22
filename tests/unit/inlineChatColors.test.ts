import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'
import { basePalette } from '../../src/core/palette'
import { lighten } from '../../src/core/utils'

describe('Inline Chat and toolbar colors', () => {
  it('should set inline chat and toolbar hover colors using valid keys', () => {
    const c = generateTheme(loadEnvVars()).colors as Record<string, string>

    // Toolbar: only documented hover/active keys
    expect(c['toolbar.hoverBackground']).toBe(interfacePalette.bg.hover)
    expect(c['toolbar.activeBackground']).toBe(interfacePalette.bg.selection)
    expect(c['toolbar.hoverOutline']).toBe(interfacePalette.border.focus)

    // Inline Chat: documented keys
    expect(c['inlineChat.background']).toBe(
      interfacePalette.derived.inlineChat.background
    )
    // Foreground is slightly brightened to improve contrast on elevated bg
    expect(c['inlineChat.foreground']).toBe(lighten(basePalette.white, 0.12))
    expect(c['inlineChat.border']).toBe(interfacePalette.border.default)

    // Ensure we do not emit undocumented keys
    expect('toolbar.foreground' in c).toBe(false)
    expect('inlineChat.toolbarForeground' in c).toBe(false)
    expect('inlineChat.toolbarHoverBackground' in c).toBe(false)
    expect('inlineChat.toolbarBorder' in c).toBe(false)
  })
})
