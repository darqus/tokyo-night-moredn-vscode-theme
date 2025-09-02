import { generateTheme } from '../../src/generators/theme'
import { interfacePalette } from '../../src/core/interface'

describe('Theme Components', () => {
  describe('Theme Generation', () => {
    it('should generate a valid theme', () => {
      const theme = generateTheme()
      expect(theme).toBeDefined()
      expect(theme.name).toBe('Tokyo Night Dark')
      expect(theme.type).toBe('dark')
      expect(theme.colors).toBeDefined()
      expect(theme.tokenColors).toBeDefined()
    })

    it('should have valid hex colors', () => {
      const theme = generateTheme()
      Object.values(theme.colors).forEach(color => {
        if (typeof color === 'string') {
          expect(color).toMatch(/^#([0-9a-f]{6}|[0-9a-f]{8})$/i)
        }
      })
    })
  })

  describe('Interface Palette', () => {
    it('should have valid interface colors', () => {
      expect(interfacePalette).toBeDefined()
      expect(interfacePalette.bg).toBeDefined()
      expect(interfacePalette.text).toBeDefined()
      expect(interfacePalette.border).toBeDefined()
      expect(interfacePalette.state).toBeDefined()
    })

    it('should have valid color property names', () => {
      const theme = generateTheme()
      Object.keys(theme.colors).forEach(key => {
        expect(key).toMatch(/^[a-zA-Z0-9.]+$/)
      })
    })
  })
})