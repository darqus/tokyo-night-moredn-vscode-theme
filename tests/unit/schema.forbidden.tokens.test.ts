import { generateTheme, loadEnvVars } from '../../src/generators/theme'

/**
 * Guard against schema-invalid tokens creeping into the theme output.
 */

describe('Schema forbidden tokens', () => {
  it('must NOT emit debugConsole.background', () => {
    const colors = generateTheme(loadEnvVars()).colors as Record<string, string>
    expect(colors['debugConsole.background']).toBeUndefined()
  })
})
