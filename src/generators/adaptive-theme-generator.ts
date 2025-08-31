import type { ThemeObject } from '../types/theme';
import { getAdaptedPalette, PaletteVariant } from '../palette/adapters';
import { buildColorsWithContext } from '../theme/colors';
import { semanticTokenColors } from '../semanticTokenColors';
import { getTokenColors } from '../tokenColors';

/**
 * Theme configuration
 */
export interface ThemeGeneratorConfig {
  name: string;
  displayName: string;
  variant: PaletteVariant;
  type?: 'dark' | 'light';
}

/**
 * Context for generating a theme with an adapted palette
 */
export interface ThemeContext {
  adaptedPalette: ReturnType<typeof getAdaptedPalette>;
  variant: PaletteVariant;
  displayName: string;
  type: 'dark' | 'light';
}

/**
 * Adaptive theme generator
 */
export class AdaptiveThemeGenerator {
  /**
   * Generates a theme with an adapted palette
   */
  static generateTheme(config: ThemeGeneratorConfig): ThemeObject {
    const adaptedPalette = getAdaptedPalette(config.variant);

    let themeType: 'dark' | 'light' = config.type === 'light' ? 'light' : 'dark';

    const themeContext: ThemeContext = {
      adaptedPalette,
      variant: config.variant,
      displayName: config.displayName,
      type: config.type || 'dark',
    };

    const originalExtendedPalette =
      require('../palette/extended').extendedPalette;
    require('../palette/extended').extendedPalette = adaptedPalette;

    try {
      const theme: ThemeObject = {
        name: config.name,
        displayName: config.displayName,
        author: 'lod',
        maintainers: ['lod'],
        type: themeType,
        semanticClass: 'tokyo-night',
        semanticHighlighting: true,
        colors: buildColorsWithContext(themeContext),
        semanticTokenColors: semanticTokenColors,
        tokenColors: getTokenColors(),
      };

      return theme;
    } finally {
      require('../palette/extended').extendedPalette = originalExtendedPalette;
    }
  }
}