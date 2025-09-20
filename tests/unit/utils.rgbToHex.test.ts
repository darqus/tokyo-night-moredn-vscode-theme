import { __rgbToHexForTests as rgbToHex } from '../../src/core/utils'

describe('rgbToHex clamps and rounds channel values', () => {
  it('clamps below 0 and above 255', () => {
    expect(rgbToHex(-10, 0, 0)).toBe('#000000')
    expect(rgbToHex(0, 300, 0)).toBe('#00ff00')
    expect(rgbToHex(0, 0, 999)).toBe('#0000ff')
  })
  it('rounds fractional values correctly', () => {
    expect(rgbToHex(10.4, 10.5, 10.6)).toBe('#0a0b0b')
  })
})
