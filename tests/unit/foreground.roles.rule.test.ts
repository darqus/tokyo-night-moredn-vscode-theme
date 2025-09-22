import { generateTheme, loadEnvVars } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'
import { SURFACE_FOREGROUND_MAP } from '../../src/generators/surfaceForeground'

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
    const theme = generateTheme(loadEnvVars())
    const colors = theme.colors

    const cases: Expectation[] = Object.keys(SURFACE_FOREGROUND_MAP).map(
      (token) => ({
        token,
        expected: SURFACE_FOREGROUND_MAP[token](interfacePalette),
      })
    )

    for (const c of cases) {
      expect(colors[c.token]).toBeDefined()
      if (colors[c.token] !== c.expected) {
        console.log(
          `❌ ${c.token}: expected ${c.expected}, got ${colors[c.token]}`
        )
      }
      expect(colors[c.token]).toBe(c.expected)
    }
  })
})
