import { generateTheme, loadEnvVars } from '../../src/generators/theme'

/**
 * Partial snapshot: Terminal / Debug / PeekView / Inline Chat / Notifications / Scrollbars / Misc widgets
 * Captures peripheral and productivity/tooling UI components.
 */

describe('Theme partial snapshot: terminal & widgets', () => {
  it('should match terminal/widgets snapshot', () => {
    const theme = generateTheme(loadEnvVars())
    const prefixes = [
      'terminal.',
      'debug',
      'debugConsole',
      'peekView',
      'inlineChat',
      'notification',
      'editorHoverWidget',
      'editorSuggestWidget',
      'editorGhostText',
      'editorWidget',
      'scrollbar',
      'activityBarBadge', // although badge included earlier, widget context
      'gitDecoration',
      'minimap',
      'charts',
      'symbolIcon',
      'walkThrough',
      'welcomePage',
      'ports.',
      'extensionButton',
      'settings',
      'keybindingLabel',
      'keybindingTable',
      'notebook',
      'problems',
      'testing',
      'comment',
      'editorOverviewRuler',
      'editorBracketMatch',
      'editorInlayHint',
      'editorGutter',
    ]
    const subset: Record<string, string> = {}
    for (const [k, v] of Object.entries(theme.colors)) {
      if (prefixes.some((p) => k.startsWith(p))) subset[k] = v
    }
    expect(subset).toMatchSnapshot()
  })
})
