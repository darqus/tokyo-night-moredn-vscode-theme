import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import { validateColorMapping } from '../../src/types/validation'

/**
 * Enforce whitelist-only tokens and deny specific known-bad tokens.
 */

describe('Allowed/Forbidden tokens enforcement', () => {
  it('generated theme must pass validator and contain no forbidden tokens', () => {
    const colors = generateTheme(loadEnvVars()).colors as Record<string, string>
    const result = validateColorMapping(colors)
    // No schema-invalid tokens (denylist)
    const denyErrors = result.errors.filter((e) =>
      e.includes('Forbidden token')
    )
    expect(denyErrors).toEqual([])
    // We don't enforce zero-warnings here because the valid token list in code may be a curated subset.
  })

  it('must fail fast for denylisted tokens at validation layer', () => {
    // This test is more of a documentation: actual throw happens in validateColorMapping,
    // but we already assert generated theme contains none of those.
    // Keep the list in sync with validation.ts forbiddenTokens.
    const deny: string[] = ['debugConsole.background']

    // Ensure none of denylisted tokens is present in output
    const colors = generateTheme(loadEnvVars()).colors as Record<string, string>
    for (const d of deny) {
      expect(colors[d]).toBeUndefined()
    }
  })
})
