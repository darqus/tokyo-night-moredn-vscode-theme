import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

/**
 * Линтер-подобное правило: проверяем, что foreground-токены
 * берутся из surface-aware ролей interfacePalette.textOn.*
 */

type Expectation = {
  token: string
  expected: string
}

describe('Foreground tokens must use textOn.* roles', () => {
  it('should map known foreground tokens to textOn roles', () => {
    const theme = generateTheme()
    const colors = theme.colors

    const cases: Expectation[] = [
      // base surface
      {
        token: 'titleBar.activeForeground',
        expected: interfacePalette.textOn.base.primary,
      },
      {
        token: 'titleBar.inactiveForeground',
        expected: interfacePalette.textOn.base.muted,
      },
      {
        token: 'activityBar.foreground',
        expected: interfacePalette.textOn.base.muted,
      },
      {
        token: 'sideBar.foreground',
        expected: interfacePalette.textOn.base.primary,
      },
      {
        token: 'panelTitle.activeForeground',
        expected: interfacePalette.textOn.base.primary,
      },
      {
        token: 'panelTitle.inactiveForeground',
        expected: interfacePalette.textOn.base.muted,
      },
      // elevated surface
      {
        token: 'menu.foreground',
        expected: interfacePalette.textOn.elevated.primary,
      },
      {
        token: 'notifications.foreground',
        expected: interfacePalette.textOn.elevated.primary,
      },
      // overlay surface
      {
        token: 'editorSuggestWidget.foreground',
        expected: interfacePalette.textOn.overlay.primary,
      },
      {
        token: 'editorSuggestWidgetStatus.foreground',
        expected: interfacePalette.textOn.overlay.muted,
      },
    ]

    for (const c of cases) {
      expect(colors[c.token]).toBeDefined()
      expect(colors[c.token]).toBe(c.expected)
    }
  })
})
