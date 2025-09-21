import { generateTheme } from '../../src/generators/theme'
import {
  TOKEN_REGISTRY,
  validateTokenAlpha,
} from '../../src/core/tokenRegistry'

describe('Token Registry validation', () => {
  it('should respect alpha policies for registered tokens', () => {
    const theme = generateTheme()
    const colors = theme.colors
    for (const meta of TOKEN_REGISTRY) {
      const value = colors[meta.key]
      if (!value) continue // not all tokens must be present in theme
      if (meta.alpha) {
        const ok = validateTokenAlpha(meta.key, value, meta.alpha)
        expect(ok).toBe(true)
      }
    }
  })
})
