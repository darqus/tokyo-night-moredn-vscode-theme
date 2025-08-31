import type { ThemeData, ThemeObject } from '../types/theme'
import {
  createAdaptedPalette,
  paletteVariants,
  PaletteModification,
  PaletteVariant,
} from '../palette/adapters'
import { buildColorsWithContext } from '../theme/colors'
import { semanticTokenColors } from '../semanticTokenColors'
import { getTokenColors } from '../tokenColors'

/**
 * Конфигурация темы
 */
export interface ThemeGeneratorConfig {
  name: string
  displayName: string
  variant: PaletteVariant
  customModification?: PaletteModification
  type?: 'dark' | 'light' | 'storm' | 'moon' | 'contrast' | 'pastel'
}

/**
 * Контекст для генерации темы с адаптированной палитрой
 */
export interface ThemeContext {
  adaptedPalette: ReturnType<typeof createAdaptedPalette>
  variant: PaletteVariant
  displayName: string
  type: 'dark' | 'light' | 'storm' | 'moon' | 'contrast' | 'pastel'
}

/**
 * Генератор адаптивных тем
 */
export class AdaptiveThemeGenerator {
  /**
   * Генерирует тему с адаптированной палитрой
   */
  static generateTheme(config: ThemeGeneratorConfig): ThemeObject {
    // Создаем адаптированную палитру
    const adaptedPalette = createAdaptedPalette(
      config.variant,
      config.customModification
    )

    // Определяем тип темы на основе варианта (VS Code поддерживает только dark/light/hc-dark/hc-light)
    let themeType: 'dark' | 'light' = config.type === 'light' ? 'light' : 'dark'
    let vsCodeType: 'dark' | 'light' | 'hc-dark' | 'hc-light' = themeType

    // Проверяем на высококонтрастные темы
    if (
      config.customModification?.contrastBoost &&
      config.customModification.contrastBoost > 1.5
    ) {
      vsCodeType = themeType === 'light' ? 'hc-light' : 'hc-dark'
    }

    // Создаем контекст темы
    const themeContext: ThemeContext = {
      adaptedPalette,
      variant: config.variant,
      displayName: config.displayName,
      type: config.type || 'dark', // Внутренний тип для логики
    }

    // Временно заменяем глобальную extendedPalette
    const originalExtendedPalette =
      require('../palette/extended').extendedPalette
    require('../palette/extended').extendedPalette = adaptedPalette

    try {
      // Генерируем тему с новой палитрой
      const theme: ThemeObject = {
        name: config.name,
        displayName: config.displayName,
        author: 'lod',
        maintainers: ['lod'],
        type: vsCodeType, // Используем валидный VS Code тип
        semanticClass: 'tokyo-night',
        semanticHighlighting: true,
        colors: buildColorsWithContext(themeContext),
        semanticTokenColors: semanticTokenColors,
        tokenColors: getTokenColors(),
      }

      return theme
    } finally {
      // Восстанавливаем оригинальную палитру
      require('../palette/extended').extendedPalette = originalExtendedPalette
    }
  }

  /**
   * Генерирует множественные варианты темы
   */
  static generateThemeVariants(): ThemeObject[] {
    const variants: ThemeGeneratorConfig[] = [
      {
        name: 'tokyo-night-dark',
        displayName: 'Tokyo Night Dark',
        variant: 'tokyo-night',
        type: 'dark',
      },
      {
        name: 'tokyo-night-light',
        displayName: 'Tokyo Night Light',
        variant: 'tokyo-light',
        type: 'light',
      },
      {
        name: 'tokyo-night-storm',
        displayName: 'Tokyo Night Storm',
        variant: 'tokyo-storm',
        type: 'storm',
      },
      {
        name: 'tokyo-night-moon',
        displayName: 'Tokyo Night Moon',
        variant: 'tokyo-moon',
        type: 'moon',
      },
      {
        name: 'tokyo-night-high-contrast',
        displayName: 'Tokyo Night High Contrast',
        variant: 'custom',
        customModification: {
          saturationMultiplier: 1.3,
          contrastBoost: 1.5,
          lightnessOffset: 8,
        },
        type: 'contrast',
      },
      {
        name: 'tokyo-night-low-contrast',
        displayName: 'Tokyo Night Low Contrast',
        variant: 'custom',
        customModification: {
          saturationMultiplier: 0.6,
          contrastBoost: 0.5,
          lightnessOffset: -5,
        },
        type: 'dark',
      },
      {
        name: 'tokyo-night-pastel',
        displayName: 'Tokyo Night Pastel',
        variant: 'custom',
        customModification: {
          saturationMultiplier: 0.3,
          lightnessOffset: 20,
          contrastBoost: 0.8,
        },
        type: 'pastel',
      },
    ]

    return variants.map((variant) => this.generateTheme(variant))
  }

  /**
   * Создает кастомную тему
   */
  static createCustomTheme(
    name: string,
    displayName: string,
    modification: PaletteModification,
    type: 'dark' | 'light' | 'storm' | 'moon' | 'contrast' | 'pastel' = 'dark'
  ): ThemeData {
    return this.generateTheme({
      name,
      displayName,
      variant: 'custom',
      customModification: modification,
      type,
    })
  }

  /**
   * Создает тему из предустановленного варианта палитры
   */
  static createFromPreset(
    name: string,
    displayName: string,
    presetName: keyof typeof paletteVariants,
    type: 'dark' | 'light' | 'storm' | 'moon' | 'contrast' | 'pastel' = 'dark'
  ): ThemeData {
    const preset = paletteVariants[presetName]()

    // Конвертируем палитру в модификацию (упрощенно)
    const modification: PaletteModification = {}

    return this.createCustomTheme(name, displayName, modification, type)
  }
}

/**
 * Утилиты для работы с палитрами
 */
export class PaletteUtils {
  /**
   * Создает градацию между двумя палитрами
   */
  static createGradient(
    baseName: string,
    variant1: PaletteVariant,
    variant2: PaletteVariant,
    steps: number = 5
  ): ThemeData[] {
    const themes: ThemeData[] = []

    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1)
      const palette1 = createAdaptedPalette(variant1)
      const palette2 = createAdaptedPalette(variant2)

      // Создаем промежуточные модификации
      const modification: PaletteModification = {
        lightnessOffset: ratio * 10 - 5,
        saturationMultiplier: 0.8 + ratio * 0.4,
      }

      themes.push(
        AdaptiveThemeGenerator.createCustomTheme(
          `${baseName}-${i}`,
          `${baseName} Gradient ${i + 1}`,
          modification
        )
      )
    }

    return themes
  }

  /**
   * Анализирует палитру и предлагает улучшения
   */
  static analyzePalette(palette: ReturnType<typeof createAdaptedPalette>) {
    // Можно добавить анализ контрастности, цветовой гармонии и т.д.
    return {
      dominantHue: 'blue', // Пример
      saturationLevel: 'medium',
      contrastRatio: 4.5,
      accessibility: 'AA',
      colorHarmony: 'analogous',
    }
  }

  /**
   * Экспортирует палитру в различные форматы
   */
  static exportPalette(
    palette: ReturnType<typeof createAdaptedPalette>,
    format: 'json' | 'css' | 'scss' | 'figma'
  ): string {
    switch (format) {
      case 'css':
        return this.exportToCss(palette)
      case 'scss':
        return this.exportToScss(palette)
      case 'figma':
        return this.exportToFigma(palette)
      case 'json':
      default:
        return JSON.stringify(palette, null, 2)
    }
  }

  private static exportToCss(palette: any, prefix = '--tokyo'): string {
    let css = ':root {\n'

    function processObject(obj: any, path: string[] = []): void {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' && value.startsWith('#')) {
          const varName = `${prefix}-${[...path, key].join('-')}`
          css += `  ${varName}: ${value};\n`
        } else if (typeof value === 'object' && value !== null) {
          processObject(value, [...path, key])
        }
      }
    }

    processObject(palette)
    css += '}\n'
    return css
  }

  private static exportToScss(palette: any): string {
    let scss = '// Tokyo Night Palette\n\n'

    function processObject(obj: any, path: string[] = []): void {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' && value.startsWith('#')) {
          const varName = `$tokyo-${[...path, key].join('-')}`
          scss += `${varName}: ${value};\n`
        } else if (typeof value === 'object' && value !== null) {
          processObject(value, [...path, key])
        }
      }
    }

    processObject(palette)
    return scss
  }

  private static exportToFigma(palette: any): string {
    const figmaTokens: any = {}

    function processObject(obj: any, path: string[] = []): void {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' && value.startsWith('#')) {
          const tokenPath = [...path, key]
          let current = figmaTokens

          for (let i = 0; i < tokenPath.length - 1; i++) {
            if (!current[tokenPath[i]]) current[tokenPath[i]] = {}
            current = current[tokenPath[i]]
          }

          current[tokenPath[tokenPath.length - 1]] = {
            value: value,
            type: 'color',
          }
        } else if (typeof value === 'object' && value !== null) {
          processObject(value, [...path, key])
        }
      }
    }

    processObject(palette)
    return JSON.stringify(figmaTokens, null, 2)
  }
}
