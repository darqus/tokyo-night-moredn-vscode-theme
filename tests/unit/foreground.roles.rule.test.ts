import { generateTheme } from '../../src/generators/theme'
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
    const theme = generateTheme()
    const colors = theme.colors

    const cases: Expectation[] = Object.keys(SURFACE_FOREGROUND_MAP).map(
      (token) => ({
        token,
        expected: SURFACE_FOREGROUND_MAP[token](interfacePalette),
      })
    )

    for (const c of cases) {
      expect(colors[c.token]).toBeDefined()
      expect(colors[c.token]).toBe(c.expected)
    }
  })
})
