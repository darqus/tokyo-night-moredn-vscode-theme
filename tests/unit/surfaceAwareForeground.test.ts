import { generateTheme, loadEnvVars } from '../../src/generators/theme'

describe('Surface-aware foreground mapping', () => {
  it('should use textOn.base/elevated/overlay for respective surfaces', () => {
    const theme = generateTheme(loadEnvVars())
    const c = theme.colors
    // base surface
    expect(c['titleBar.activeForeground']).toBeDefined()
    // elevated surfaces
    expect(c['menu.foreground']).toBeDefined()
    expect(c['notifications.foreground']).toBeDefined()
    // overlay
    expect(c['editorSuggestWidget.foreground']).toBeDefined()
  })
})
