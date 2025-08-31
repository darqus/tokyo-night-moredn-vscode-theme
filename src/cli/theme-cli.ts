#!/usr/bin/env node

import { ThemeGenerator } from '../generators/theme-generator'
import { AdaptiveThemeGenerator } from '../generators/adaptive-theme-generator'
import type { PaletteModification } from '../palette/adapters'

/**
 * CLI утилита для генерации Tokyo Night тем
 */
class ThemeCLI {
  private generator: ThemeGenerator

  constructor() {
    this.generator = new ThemeGenerator()
  }

  /**
   * Парсит аргументы командной строки
   */
  private parseArgs(): { [key: string]: string | boolean } {
    const args: { [key: string]: string | boolean } = {}

    process.argv.slice(2).forEach((arg) => {
      if (arg.startsWith('--')) {
        if (arg.includes('=')) {
          const [key, value] = arg.substring(2).split('=')
          args[key] = value
        } else {
          args[arg.substring(2)] = true
        }
      }
    })

    return args
  }

  /**
   * Выводит справку по использованию
   */
  private showHelp(): void {
    console.log(`
🌃 Tokyo Night Theme Generator CLI

ИСПОЛЬЗОВАНИЕ:
  npx theme-cli [команда] [опции]

КОМАНДЫ:
  generate         Генерировать темы
  custom           Создать кастомную тему
  analyze          Анализировать палитру
  export           Экспортировать палитры

ОПЦИИ ГЕНЕРАЦИИ:
  --all            Генерировать все темы
  --variants       Основные варианты (dark, light, storm, moon)
  --seasonal       Сезонные темы (spring, summer, autumn, winter)
  --accessibility  Темы для доступности
  --demo           Демонстрационные темы
  --output=<dir>   Директория для сохранения

ОПЦИИ КАСТОМНОЙ ТЕМЫ:
  --name=<name>           Название темы
  --display=<display>     Отображаемое название
  --type=<dark|light>     Тип темы
  --hue=<number>          Сдвиг оттенка (-180 до 180)
  --saturation=<number>   Множитель насыщенности (0.1 до 3.0)
  --lightness=<number>    Смещение яркости (-50 до 50)
  --contrast=<number>     Усиление контраста (0.1 до 3.0)

ОПЦИИ ЭКСПОРТА:
  --format=<format>       Формат (css, scss, figma, json)
  --prefix=<prefix>       Префикс для CSS переменных

ПРИМЕРЫ:
  # Генерировать все темы
  npx theme-cli generate --all

  # Создать кастомную тему
  npx theme-cli custom --name=my-theme --display="My Theme" --hue=30 --saturation=1.2

  # Экспортировать палитру в CSS
  npx theme-cli export --format=css --prefix=--my-theme

  # Генерировать только сезонные темы
  npx theme-cli generate --seasonal --output=./themes

  # Анализировать текущую палитру
  npx theme-cli analyze
    `)
  }

  /**
   * Генерирует темы
   */
  private generateThemes(args: { [key: string]: string | boolean }): void {
    console.log('🚀 Начинаем генерацию тем...')

    if (args.output) {
      this.generator = new ThemeGenerator(args.output as string)
    }

    if (args.all) {
      this.generator.generateAll()
    } else {
      if (args.variants) {
        this.generator.generateAllVariants()
      }
      if (args.seasonal) {
        this.generator.generateSeasonalThemes()
      }
      if (args.accessibility) {
        this.generator.generateAccessibilityThemes()
      }
      if (args.demo) {
        this.generator.generateDemoThemes()
      }
    }

    console.log('✅ Генерация завершена!')
  }

  /**
   * Создаёт кастомную тему
   */
  private createCustomTheme(args: { [key: string]: string | boolean }): void {
    const name = args.name as string
    const displayName = (args.display as string) || name
    const type = (args.type as 'dark' | 'light') || 'dark'

    if (!name) {
      console.error('❌ Ошибка: требуется параметр --name')
      return
    }

    const modification: PaletteModification = {}

    if (args.hue) {
      const hue = parseFloat(args.hue as string)
      if (hue >= -180 && hue <= 180) {
        modification.hueShift = hue
      }
    }

    if (args.saturation) {
      const saturation = parseFloat(args.saturation as string)
      if (saturation >= 0.1 && saturation <= 3.0) {
        modification.saturationMultiplier = saturation
      }
    }

    if (args.lightness) {
      const lightness = parseFloat(args.lightness as string)
      if (lightness >= -50 && lightness <= 50) {
        modification.lightnessOffset = lightness
      }
    }

    if (args.contrast) {
      const contrast = parseFloat(args.contrast as string)
      if (contrast >= 0.1 && contrast <= 3.0) {
        modification.contrastBoost = contrast
      }
    }

    console.log(`🎨 Создаём кастомную тему: ${displayName}`)
    console.log(`   Модификации:`, modification)

    this.generator.generateCustomTheme(name, displayName, modification, type)
  }

  /**
   * Анализирует палитру
   */
  private analyzePalette(): void {
    console.log('🔍 Анализируем палитру...')

    const { PaletteUtils } = require('../generators/adaptive-theme-generator')
    const { extendedPalette } = require('../palette/extended')

    const analysis = PaletteUtils.analyzePalette(extendedPalette)

    console.log(`
📊 АНАЛИЗ ПАЛИТРЫ:
   Доминирующий оттенок: ${analysis.dominantHue}
   Уровень насыщенности: ${analysis.saturationLevel}
   Коэффициент контраста: ${analysis.contrastRatio}
   Доступность: ${analysis.accessibility}
   Цветовая гармония: ${analysis.colorHarmony}
    `)
  }

  /**
   * Экспортирует палитры
   */
  private exportPalettes(args: { [key: string]: string | boolean }): void {
    const format = (args.format as string) || 'json'
    const prefix = (args.prefix as string) || '--tokyo'

    console.log(`📤 Экспортируем палитру в формат: ${format}`)

    if (format === 'all') {
      this.generator.exportPalettes()
    } else {
      const { PaletteUtils } = require('../generators/adaptive-theme-generator')
      const { extendedPalette } = require('../palette/extended')

      const exported = PaletteUtils.exportPalette(extendedPalette, format)

      if (format === 'css' && prefix !== '--tokyo') {
        // Заменяем префикс в CSS
        const customCSS = exported.replace(/--tokyo/g, prefix)
        console.log(customCSS)
      } else {
        console.log(exported)
      }
    }
  }

  /**
   * Запускает CLI
   */
  run(): void {
    const args = this.parseArgs()
    const command = process.argv[2]

    if (!command || args.help) {
      this.showHelp()
      return
    }

    try {
      switch (command) {
        case 'generate':
          this.generateThemes(args)
          break
        case 'custom':
          this.createCustomTheme(args)
          break
        case 'analyze':
          this.analyzePalette()
          break
        case 'export':
          this.exportPalettes(args)
          break
        default:
          console.error(`❌ Неизвестная команда: ${command}`)
          this.showHelp()
      }
    } catch (error) {
      console.error(
        `❌ Ошибка выполнения: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
      process.exit(1)
    }
  }
}

// Если модуль запущен напрямую
if (require.main === module) {
  const cli = new ThemeCLI()
  cli.run()
}

export { ThemeCLI }
