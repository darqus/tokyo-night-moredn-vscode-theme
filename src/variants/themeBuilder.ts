import { buildColors } from '../theme/colors'
import { getTokenColors } from '../tokenColors'
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
  semanticHighlighting: boolean
  semanticTokenColors: typeof semanticTokenColors
  colors: ReturnType<typeof buildColors>
  tokenColors: ReturnType<typeof getTokenColors>
}

/**
 * Tokyo Night Lod theme builder (single dark theme)
 */
export class ThemeBuilder {
  /**
   * Create standard theme (dark)
   */
  static buildStandard(): ThemeObject {
    return {
      name: 'Tokyo Night Lod',
      displayName: 'Tokyo Night Lod',
      author: 'lod',
      maintainers: ['lod'],
      type: 'dark',
      semanticClass: 'tokyo-night',
      semanticHighlighting: true,
      semanticTokenColors: semanticTokenColors,
      colors: buildColors(),
      tokenColors: getTokenColors(),
    }
  }
}
