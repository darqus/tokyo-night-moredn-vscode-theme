import { buildColors } from '../build'
import { tokenColors } from '../tokenColors'
import { semanticTokenColors } from '../semanticTokenColors'

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  name: string
  displayName: string
  type: 'dark'
  description?: string
}

/**
 * Complete theme object type
 */
export interface ThemeObject {
  name: string
  displayName: string
  author: string
  maintainers: string[]
  type: 'dark'
  semanticClass: string
  semanticTokenColors: typeof semanticTokenColors
  colors: ReturnType<typeof buildColors>
  tokenColors: typeof tokenColors
}

/**
 * Tokyo Night Lod theme builder
 */
export class ThemeBuilder {
  /**
   * Create standard theme
   */
  static buildStandard(): ThemeObject {
    return {
      name: 'Tokyo Night Lod',
      displayName: 'Tokyo Night Lod',
      author: 'lod',
      maintainers: ['lod'],
      type: 'dark',
      semanticClass: 'tokyo-night',
      semanticTokenColors: semanticTokenColors,
      colors: buildColors(),
      tokenColors: tokenColors,
    }
  }
}
