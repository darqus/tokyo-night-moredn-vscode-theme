import { darken, __parseHexForTests as parseHex } from '../../src/core/utils'

describe('utils more coverage', () => {
  it('darken mixes with black', () => {
    expect(darken('#ffffff', 0.3)).toBe('#b3b3b3')
  })
  it('parseHex parses valid and throws on invalid', () => {
    expect(parseHex('#112233')).toEqual({ r: 0x11, g: 0x22, b: 0x33 })
    expect(() => parseHex('112233')).toThrow('Invalid hex color')
  })
})
