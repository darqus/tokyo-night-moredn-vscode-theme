import {
  createTokens,
  EXPECTED_COLOR_TOKEN_COUNT,
} from '../../src/generators/modernInterfaceMapping'
import { interfacePalette } from '../../src/core/interface'

describe('Theme color token count', () => {
  it('should match the expected stable count', () => {
    const colors = createTokens(interfacePalette)
    const count = Object.keys(colors).length
    expect(count).toBe(EXPECTED_COLOR_TOKEN_COUNT)
  })
})
