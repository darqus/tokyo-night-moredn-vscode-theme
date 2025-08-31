import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import {
  AdaptiveThemeGenerator,
  PaletteUtils,
} from './adaptive-theme-generator'
import type { ThemeData } from '../types/theme'
import type { PaletteModification } from '../palette/adapters'

/**
 * Интеграционный модуль для генерации и экспорта тем
 */
export class ThemeGenerator {
  private outputDir: string

  constructor(outputDir: string = './themes') {
    this.outputDir = outputDir
    this.ensureOutputDir()
  }

  private ensureOutputDir(): void {
    try {
      mkdirSync(this.outputDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }
  }

  /**
   * Генерирует все предустановленные варианты тем
   */
  generateAllVariants(): void {
    const variants = AdaptiveThemeGenerator.generateThemeVariants()

    variants.forEach((theme) => {
      this.saveTheme(theme)
    })

    console.log(
      `✅ Сгенерировано ${variants.length} вариантов тем в ${this.outputDir}`
    )
  }

  /**
   * Генерирует кастомную тему
   */
  generateCustomTheme(
    name: string,
    displayName: string,
    modification: PaletteModification,
    type: 'dark' | 'light' = 'dark'
  ): ThemeData {
    const theme = AdaptiveThemeGenerator.createCustomTheme(
      name,
      displayName,
      modification,
      type
    )

    this.saveTheme(theme)
    console.log(`✅ Сгенерирована кастомная тема: ${displayName}`)

    return theme
  }

  /**
   * Генерирует сезонные варианты тем
   */
  generateSeasonalThemes(): void {
    const seasonalThemes = [
      {
        name: 'tokyo-night-spring',
        displayName: 'Tokyo Night Spring',
        modification: {
          hueShift: 15,
          saturationMultiplier: 1.1,
          lightnessOffset: 2,
        },
      },
      {
        name: 'tokyo-night-summer',
        displayName: 'Tokyo Night Summer',
        modification: {
          hueShift: 30,
          saturationMultiplier: 1.2,
          lightnessOffset: 5,
        },
      },
      {
        name: 'tokyo-night-autumn',
        displayName: 'Tokyo Night Autumn',
        modification: {
          hueShift: -20,
          saturationMultiplier: 0.9,
          lightnessOffset: -2,
        },
      },
      {
        name: 'tokyo-night-winter',
        displayName: 'Tokyo Night Winter',
        modification: {
          hueShift: -40,
          saturationMultiplier: 0.8,
          lightnessOffset: -5,
        },
      },
    ]

    seasonalThemes.forEach((config) => {
      this.generateCustomTheme(
        config.name,
        config.displayName,
        config.modification
      )
    })

    console.log(`✅ Сгенерированы сезонные темы`)
  }

  /**
   * Генерирует темы для доступности
   */
  generateAccessibilityThemes(): void {
    const accessibilityThemes = [
      {
        name: 'tokyo-night-high-contrast',
        displayName: 'Tokyo Night High Contrast',
        modification: {
          contrastBoost: 2.0,
          saturationMultiplier: 1.5,
          lightnessOffset: 10,
        },
      },
      {
        name: 'tokyo-night-low-contrast',
        displayName: 'Tokyo Night Low Contrast',
        modification: {
          contrastBoost: 0.5,
          saturationMultiplier: 0.6,
          lightnessOffset: -5,
        },
      },
      {
        name: 'tokyo-night-protanopia',
        displayName: 'Tokyo Night Protanopia Friendly',
        modification: {
          hueShift: 45,
          saturationMultiplier: 1.3,
        },
      },
      {
        name: 'tokyo-night-deuteranopia',
        displayName: 'Tokyo Night Deuteranopia Friendly',
        modification: {
          hueShift: -45,
          saturationMultiplier: 1.3,
        },
      },
    ]

    accessibilityThemes.forEach((config) => {
      this.generateCustomTheme(
        config.name,
        config.displayName,
        config.modification
      )
    })

    console.log(`✅ Сгенерированы темы для доступности`)
  }

  /**
   * Сохраняет тему в файл
   */
  private saveTheme(theme: ThemeData): void {
    const filename = `${theme.name
      .replace(/\s+/g, '-')
      .toLowerCase()}-color-theme.json`
    const filepath = join(this.outputDir, filename)

    writeFileSync(filepath, JSON.stringify(theme, null, 2))
  }

  /**
   * Экспортирует палитру в различные форматы
   */
  exportPalettes(): void {
    const palette = require('../palette/extended').extendedPalette
    const formats = ['css', 'scss', 'figma'] as const

    formats.forEach((format) => {
      const content = PaletteUtils.exportPalette(palette, format)
      const filename = `tokyo-night-palette.${
        format === 'figma' ? 'json' : format
      }`
      const filepath = join(this.outputDir, 'palettes', filename)

      mkdirSync(join(this.outputDir, 'palettes'), { recursive: true })
      writeFileSync(filepath, content)
    })

    console.log(`✅ Экспортированы палитры в форматы: ${formats.join(', ')}`)
  }

  /**
   * Генерирует демонстрационные темы
   */
  generateDemoThemes(): void {
    // Градиент от тёмной к светлой теме
    const gradientThemes = PaletteUtils.createGradient(
      'tokyo-night-gradient',
      'tokyo-night',
      'tokyo-light',
      3
    )

    gradientThemes.forEach((theme) => {
      this.saveTheme(theme)
    })

    // Экспериментальные цветовые схемы
    const experimentalThemes = [
      {
        name: 'tokyo-night-neon',
        displayName: 'Tokyo Night Neon',
        modification: {
          saturationMultiplier: 2.0,
          lightnessOffset: 15,
          hueShift: 10,
        },
      },
      {
        name: 'tokyo-night-pastel',
        displayName: 'Tokyo Night Pastel',
        modification: {
          saturationMultiplier: 0.3,
          lightnessOffset: 20,
          contrastBoost: 0.8,
        },
      },
      {
        name: 'tokyo-night-retro',
        displayName: 'Tokyo Night Retro',
        modification: {
          hueShift: -60,
          saturationMultiplier: 0.7,
          lightnessOffset: -10,
        },
      },
    ]

    experimentalThemes.forEach((config) => {
      this.generateCustomTheme(
        config.name,
        config.displayName,
        config.modification
      )
    })

    console.log(`✅ Сгенерированы демонстрационные темы`)
  }

  /**
   * Запускает полную генерацию всех тем
   */
  generateAll(): void {
    console.log('🚀 Начинаем генерацию всех тем...')

    this.generateAllVariants()
    this.generateSeasonalThemes()
    this.generateAccessibilityThemes()
    this.generateDemoThemes()
    this.exportPalettes()

    console.log('🎉 Генерация завершена!')
  }
}

/**
 * CLI интерфейс для генератора
 */
export function runThemeGenerator(): void {
  const args = process.argv.slice(2)
  const outputDir =
    args.find((arg) => arg.startsWith('--output='))?.split('=')[1] || './themes'

  const generator = new ThemeGenerator(outputDir)

  if (args.includes('--all')) {
    generator.generateAll()
  } else if (args.includes('--variants')) {
    generator.generateAllVariants()
  } else if (args.includes('--seasonal')) {
    generator.generateSeasonalThemes()
  } else if (args.includes('--accessibility')) {
    generator.generateAccessibilityThemes()
  } else if (args.includes('--demo')) {
    generator.generateDemoThemes()
  } else if (args.includes('--palettes')) {
    generator.exportPalettes()
  } else {
    console.log(`
Tokyo Night Theme Generator

Использование:
  npm run generate:themes [опции]

Опции:
  --all              Генерировать все темы и экспортировать палитры
  --variants         Генерировать основные варианты тем
  --seasonal         Генерировать сезонные темы
  --accessibility    Генерировать темы для доступности
  --demo             Генерировать демонстрационные темы
  --palettes         Экспортировать палитры в различные форматы
  --output=<dir>     Директория для сохранения (по умолчанию: ./themes)

Примеры:
  npm run generate:themes -- --all
  npm run generate:themes -- --variants --output=./dist/themes
  npm run generate:themes -- --seasonal --accessibility
    `)
  }
}

// Если модуль запущен напрямую
if (require.main === module) {
  runThemeGenerator()
}
