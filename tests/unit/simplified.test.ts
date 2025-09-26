/**
 * Тесты для упрощенной архитектуры
 */
import { ThemeGenerator, ConfigManager, PluginSystem } from '../../src/core/simplified'
import type { VSCodeTheme } from '../../src/types/theme'

describe('Simplified Architecture', () => {
  beforeEach(() => {
    ThemeGenerator.clearCache()
    PluginSystem.clear()
  })

  describe('ThemeGenerator', () => {
    it('should generate valid theme', () => {
      const theme = ThemeGenerator.generate({
        name: 'test-theme',
        displayName: 'Test Theme',
        type: 'dark'
      })

      expect(theme.name).toBe('Test Theme')
      expect(theme.type).toBe('dark')
      expect(theme.colors).toBeDefined()
      expect(theme.tokenColors).toBeDefined()
      expect(Object.keys(theme.colors).length).toBeGreaterThan(0)
    })

    it('should cache generated themes', () => {
      const config = {
        name: 'test-theme',
        displayName: 'Test Theme',
        type: 'dark' as const
      }

      const theme1 = ThemeGenerator.generate(config)
      const theme2 = ThemeGenerator.generate(config)

      expect(theme1).toBe(theme2) // Same reference due to caching
    })

    it('should apply overrides', () => {
      const theme = ThemeGenerator.generate({
        name: 'test-theme',
        displayName: 'Test Theme',
        type: 'dark',
        overrides: {
          'editor.background': '#000000'
        }
      })

      expect(theme.colors['editor.background']).toBe('#000000')
    })
  })

  describe('ConfigManager', () => {
    it('should provide default config', () => {
      const config = ConfigManager.getDefault()

      expect(config.theme.name).toBe('tokyo-night-modern')
      expect(config.theme.type).toBe('dark')
      expect(config.palette).toBeDefined()
    })

    it('should register and retrieve configs', () => {
      const customConfig = {
        theme: {
          name: 'custom',
          displayName: 'Custom Theme',
          type: 'light' as const,
          version: '1.0.0'
        },
        palette: ConfigManager.getDefault().palette
      }

      ConfigManager.register('custom', customConfig)
      const retrieved = ConfigManager.get('custom')

      expect(retrieved).toEqual(customConfig)
    })
  })

  describe('PluginSystem', () => {
    it('should register and apply plugins', () => {
      const plugin = {
        name: 'test-plugin',
        transform: (theme: VSCodeTheme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            'test.color': '#ff0000'
          }
        })
      }

      PluginSystem.register(plugin)

      const originalTheme = ThemeGenerator.generate({
        name: 'test',
        displayName: 'Test',
        type: 'dark'
      })

      const modifiedTheme = PluginSystem.apply(originalTheme)

      expect(modifiedTheme.colors['test.color']).toBe('#ff0000')
    })

    it('should handle plugin errors gracefully', () => {
      const faultyPlugin = {
        name: 'faulty-plugin',
        transform: () => {
          throw new Error('Plugin error')
        }
      }

      PluginSystem.register(faultyPlugin)

      const theme = ThemeGenerator.generate({
        name: 'test',
        displayName: 'Test',
        type: 'dark'
      })

      // Should not throw, should return original theme
      expect(() => PluginSystem.apply(theme)).not.toThrow()
    })
  })
})