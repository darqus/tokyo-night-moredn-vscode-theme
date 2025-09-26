/**
 * Упрощенный генератор тем - единая точка входа
 */
import type { VSCodeTheme } from '../../types/theme'
import { createTokens } from '../../generators/modernInterfaceMapping'
import { generateTokenColors } from '../../generators/tokens'
import { interfacePalette } from '../interface'

export interface SimpleThemeConfig {
  name: string
  displayName: string
  type: 'dark' | 'light'
  overrides?: Record<string, string>
}

export class ThemeGenerator {
  private static cache = new Map<string, VSCodeTheme>()

  static generate(config: SimpleThemeConfig): VSCodeTheme {
    const cacheKey = JSON.stringify(config)
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    const colors = createTokens(interfacePalette)
    const tokenColors = generateTokenColors()

    if (config.overrides) {
      Object.assign(colors, config.overrides)
    }

    const theme: VSCodeTheme = {
      name: config.displayName,
      type: config.type,
      colors,
      tokenColors
    }

    this.cache.set(cacheKey, theme)
    return theme
  }

  static clearCache(): void {
    this.cache.clear()
  }
}