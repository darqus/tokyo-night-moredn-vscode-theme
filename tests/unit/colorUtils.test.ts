import { withAlpha, mix, lightenToward, darkenToward } from '../../src/utils/color'
import { Hex } from '../../src/types/palette'

describe('Color Utilities', () => {
  describe('withAlpha', () => {
    it('should add alpha channel as number correctly', () => {
      const result = withAlpha('#ff0000' as Hex, 0.5)
      expect(result).toBe('#ff000080')
    })

    it('should add alpha channel as string correctly', () => {
      const result = withAlpha('#ff0000' as Hex, '80')
      expect(result).toBe('#ff000080')
    })

    it('should handle edge cases', () => {
      expect(withAlpha('#ffffff' as Hex, 0)).toBe('#ffffff00')
      expect(withAlpha('#000000' as Hex, 1)).toBe('#000000ff')
    })

    it('should throw error for invalid hex', () => {
      expect(() => withAlpha('invalid' as Hex, 0.5)).toThrow()
    })

    it('should throw error for invalid alpha', () => {
      expect(() => withAlpha('#ff0000' as Hex, 1.5)).toThrow()
      expect(() => withAlpha('#ff0000' as Hex, -0.5)).toThrow()
    })
  })

  describe('mix', () => {
    it('should mix two colors correctly', () => {
      const result = mix('#ff0000' as Hex, '#0000ff' as Hex, 0.5)
      expect(result).toBe('#800080')
    })

    it('should handle edge weights', () => {
      expect(mix('#ff0000' as Hex, '#0000ff' as Hex, 0)).toBe('#ff0000')
      expect(mix('#ff0000' as Hex, '#0000ff' as Hex, 1)).toBe('#0000ff')
    })

    it('should clamp weights', () => {
      expect(mix('#ff0000' as Hex, '#0000ff' as Hex, -0.5)).toBe('#ff0000')
      expect(mix('#ff0000' as Hex, '#0000ff' as Hex, 1.5)).toBe('#0000ff')
    })
  })

  describe('lightenToward', () => {
    it('should lighten color toward another color', () => {
      const result = lightenToward('#808080' as Hex, '#ffffff' as Hex, 0.5)
      expect(result).toBe('#c0c0c0')
    })
  })

  describe('darkenToward', () => {
    it('should darken color toward another color', () => {
      const result = darkenToward('#808080' as Hex, '#000000' as Hex, 0.5)
      expect(result).toBe('#404040')
    })
  })
})