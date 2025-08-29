import { palette, core } from '../../src/palette'
import { basePalette } from '../../src/palette/base'

describe('Palette System', () => {
  describe('Base Palette', () => {
    it('should have all required base colors', () => {
      expect(basePalette).toHaveProperty('black')
      expect(basePalette).toHaveProperty('white')
      expect(basePalette).toHaveProperty('blue')
      expect(basePalette).toHaveProperty('cyan')
      expect(basePalette).toHaveProperty('teal')
      expect(basePalette).toHaveProperty('purple')
      expect(basePalette).toHaveProperty('magenta')
      expect(basePalette).toHaveProperty('red')
      expect(basePalette).toHaveProperty('green')
      expect(basePalette).toHaveProperty('yellow')
      expect(basePalette).toHaveProperty('orange')
    })

    it('should have valid hex colors', () => {
      Object.values(basePalette).forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })
  })

  describe('Core Palette', () => {
    it('should have required color categories', () => {
      expect(core).toHaveProperty('bg')
      expect(core).toHaveProperty('border')
      expect(core).toHaveProperty('text')
      expect(core).toHaveProperty('accent')
      expect(core).toHaveProperty('brand')
      expect(core).toHaveProperty('ui')
    })
  })

  describe('Full Palette', () => {
    it('should have all required top-level categories', () => {
      expect(palette).toHaveProperty('bg')
      expect(palette).toHaveProperty('line')
      expect(palette).toHaveProperty('fg')
      expect(palette).toHaveProperty('brand')
      expect(palette).toHaveProperty('accent')
      expect(palette).toHaveProperty('token')
      expect(palette).toHaveProperty('ansi')
      expect(palette).toHaveProperty('ui')
      expect(palette).toHaveProperty('brackets')
      expect(palette).toHaveProperty('punctuation')
    })

    it('should have valid hex colors in token category', () => {
      Object.values(palette.token).forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })
  })
})
