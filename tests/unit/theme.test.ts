import { getBaseColors } from '../../src/theme/base'
import { getEditorColors } from '../../src/theme/editor'

describe('Theme Components', () => {
  describe('Base Colors', () => {
    it('should return a valid color object', () => {
      const colors = getBaseColors()
      expect(colors).toBeDefined()
      expect(Object.keys(colors).length).toBeGreaterThan(0)
    })

    it('should have valid hex colors', () => {
      const colors = getBaseColors()
      Object.values(colors).forEach(color => {
        // Colors can be strings or objects, we're checking the string values
        if (typeof color === 'string') {
          expect(color).toMatch(/^#([0-9a-f]{6}|[0-9a-f]{8})$/i)
        }
      })
    })
  })

  describe('Editor Colors', () => {
    it('should return a valid editor color object', () => {
      const colors = getEditorColors()
      expect(colors).toBeDefined()
      expect(Object.keys(colors).length).toBeGreaterThan(0)
    })

    it('should have valid color property names', () => {
      const colors = getEditorColors()
      Object.keys(colors).forEach(key => {
        expect(key).toMatch(/^[a-zA-Z0-9.]+$/)
      })
    })
  })
})