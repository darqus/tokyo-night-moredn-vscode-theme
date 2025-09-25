import { generateTheme, loadEnvVars } from '../../src/generators/theme'

/**
 * Partial snapshot: Core foundational UI (Base Colors, Editor, Sidebar, Activity Bar, Status Bar, Tabs, Title Bar, Editor Groups)
 * Purpose: Smaller diff surface when adjusting foundational surfaces without noise from peripheral features.
 */

describe('Theme partial snapshot: core surfaces', () => {
  it('should match core surface tokens snapshot', () => {
    const theme = generateTheme(loadEnvVars())
    const coreTokenPrefixes = [
      'foreground',
      'icon.',
      'descriptionForeground',
      'disabledForeground',
      'focusBorder',
      'errorForeground',
      'selection.background',
      'editor.',
      'sideBar',
      'activityBar',
      'statusBar',
      'statusBarItem.',
      'tab.',
      'titleBar',
      'editorGroup',
    ]

    const subset: Record<string, string> = {}
    for (const [k, v] of Object.entries(theme.colors)) {
      if (coreTokenPrefixes.some((p) => k.startsWith(p))) subset[k] = v
    }

    expect(subset).toMatchSnapshot()
  })
})
