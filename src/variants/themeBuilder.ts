import { buildColors } from '../theme'
import { getTokenColors } from '../tokenColors'
import { semanticTokenColors } from '../semanticTokenColors'
import type { ThemeObject } from '../types/theme'

/* Types centralized in ../types/theme */

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
