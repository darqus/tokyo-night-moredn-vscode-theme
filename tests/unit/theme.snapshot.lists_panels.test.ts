import { generateTheme, loadEnvVars } from '../../src/generators/theme'

/**
 * Partial snapshot: Lists / Trees / Panels / Menus / Inputs / Buttons / Badges / Dropdowns / Toolbar
 * Focuses on interactive and container components distinct from core surfaces.
 */

describe('Theme partial snapshot: lists & panels', () => {
  it('should match lists/panels snapshot', () => {
    const theme = generateTheme(loadEnvVars())
    const prefixes = [
      'panel',
      'list.',
      'tree.',
      'menu',
      'menubar',
      'editorStickyScroll', // keep separate in core? included here for now
      'input',
      'badge',
      'button',
      'dropdown',
      'toolbar',
      'breadcrumb',
      'quickInput',
      'pickerGroup',
      'progressBar',
    ]
    const subset: Record<string, string> = {}
    for (const [k, v] of Object.entries(theme.colors)) {
      if (prefixes.some((p) => k.startsWith(p))) subset[k] = v
    }
    expect(subset).toMatchSnapshot()
  })
})
