/**
 * ThemeEngine - единая фабрика тем с декларативным API
 * Объединяет PaletteManager, TokenRegistry, RichSyntax и другие компоненты
 */
import { PaletteManager } from './paletteManager'
import { TOKEN_REGISTRY } from './tokenRegistry'
import { richSyntaxPalette } from './richSyntax'
import { CacheManager } from './cacheManager'
import type {
  VSCodeTheme,
  InterfacePalette,
  SyntaxPalette,
  RichSyntaxPalette,
} from '../types/theme'
import type { ICacheManager } from './interfaces/ICacheManager'
import type { IPaletteManager } from './interfaces/IPaletteManager'
import type { IThemeGenerator } from './interfaces/IThemeGenerator'

export interface ThemeEngineConfig {
  name: string
  displayName: string
  description: string
  type: 'dark' | 'light'
  version?: string
  author?: string
  publisher?: string
  repository?: string
  bugs?: string
  categories?: string
  keywords?: string
  filename?: string
}

export interface ColorSchemeConfig {
  baseColors: Partial<InterfacePalette>
  syntaxColors?: Partial<SyntaxPalette>
  richSyntaxColors?: Partial<RichSyntaxPalette>
  customTokens?: Record<string, string>
  overrides?: Record<string, string>
}

export interface ValidationConfig {
  enableValidation: boolean
  strictMode: boolean
  minContrastRatio: number
  enforceAccessibility: boolean
}

export interface OptimizationConfig {
  enableCache: boolean
  optimizePerformance: boolean
  compressOutput: boolean
  generateDerivedColors: boolean
}

/**
 * Плагин для расширения функциональности ThemeEngine
 */
export interface ThemePlugin {
  name: string
  version: string
  description: string
  priority?: number

  // Хуки жизненного цикла
  beforeGenerate?: (config: ThemeEngineConfig) => Promise<void> | void
  afterPaletteUpdate?: (
    palette: InterfacePalette
  ) => Promise<InterfacePalette> | InterfacePalette
  beforeTokenGeneration?: (
    tokens: Record<string, string>
  ) => Promise<Record<string, string>> | Record<string, string>
  afterThemeGeneration?: (
    theme: VSCodeTheme
  ) => Promise<VSCodeTheme> | VSCodeTheme

  // Утилиты
  validate?: (theme: VSCodeTheme) => boolean
  optimize?: (theme: VSCodeTheme) => VSCodeTheme
}

/**
 * Основной класс ThemeEngine
 */
export class ThemeEngine implements IThemeGenerator {
  private paletteManager: IPaletteManager
  private cacheManager: ICacheManager
  private plugins: ThemePlugin[] = []
  private config: ThemeEngineConfig
  private validationConfig: ValidationConfig
  private optimizationConfig: OptimizationConfig
  private themeGeneratorConfig: any = {}

  constructor(
    config: ThemeEngineConfig,
    validationConfig?: Partial<ValidationConfig>,
    optimizationConfig?: Partial<OptimizationConfig>
  ) {
    this.config = config
    this.cacheManager = new CacheManager()
    this.paletteManager = new PaletteManager(this.cacheManager)

    // Настройка валидации
    this.validationConfig = {
      enableValidation: true,
      strictMode: false,
      minContrastRatio: 4.5,
      enforceAccessibility: true,
      ...validationConfig,
    }

    // Настройка оптимизации
    this.optimizationConfig = {
      enableCache: true,
      optimizePerformance: true,
      compressOutput: false,
      generateDerivedColors: true,
      ...optimizationConfig,
    }
  }

  /**
   * Регистрация плагина
   */
  registerPlugin(plugin: ThemePlugin): void {
    this.plugins.push(plugin)
    // Сортировка по приоритету
    this.plugins.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  }

  /**
   * Удаление плагина
   */
  unregisterPlugin(pluginName: string): void {
    this.plugins = this.plugins.filter((p) => p.name !== pluginName)
  }

  /**
   * Получение списка зарегистрированных плагинов
   */
  getPlugins(): ThemePlugin[] {
    return [...this.plugins]
  }

  /**
   * Создание цветовой схемы
   */
  async createColorScheme(
    config: ColorSchemeConfig
  ): Promise<InterfacePalette> {
    // Применение базовых цветов
    if (config.baseColors) {
      this.paletteManager.updateInterfacePalette(config.baseColors)
    }

    // Применение синтаксических цветов
    if (config.syntaxColors) {
      this.paletteManager.updateSyntaxPalette(config.syntaxColors)
    }

    // Применение расширенных синтаксических цветов
    if (config.richSyntaxColors) {
      this.paletteManager.updateRichSyntaxPalette(config.richSyntaxColors)
    }

    // Выполнение хуков плагинов после обновления палитры
    let palette = this.paletteManager.getInterfacePalette()
    for (const plugin of this.plugins) {
      if (plugin.afterPaletteUpdate) {
        const result = await plugin.afterPaletteUpdate(palette)
        if (result) {
          palette = result
        }
      }
    }

    return palette
  }

  /**
   * Применение кастомных токенов
   */
  async applyCustomTokens(tokens: Record<string, string>): Promise<void> {
    // Применение кастомных токенов через плагины
    for (const plugin of this.plugins) {
      if (plugin.beforeTokenGeneration) {
        const result = await plugin.beforeTokenGeneration(tokens)
        if (result) {
          tokens = result
        }
      }
    }

    // Здесь можно добавить логику для применения токенов
    // Например, через обновление палитры или напрямую в генераторе
  }

  /**
   * Генерация темы (реализация IThemeGenerator)
   */
  generateTheme(options?: any): VSCodeTheme {
    // Для совместимости с IThemeGenerator, преобразуем опции
    const colorScheme = options as ColorSchemeConfig
    return this.generateThemeSync(colorScheme)
  }

  /**
   * Генерация темы с поддержкой async
   */
  async generateThemeAsync(
    colorScheme?: ColorSchemeConfig
  ): Promise<VSCodeTheme> {
    // Выполнение хуков перед генерацией
    for (const plugin of this.plugins) {
      if (plugin.beforeGenerate) {
        await plugin.beforeGenerate(this.config)
      }
    }

    // Создание или обновление цветовой схемы
    if (colorScheme) {
      await this.createColorScheme(colorScheme)
    }

    // Получение палитр
    const interfacePalette = this.paletteManager.getInterfacePalette()
    const syntaxPalette = this.paletteManager.getSyntaxPalette()
    const richSyntaxPalette = this.paletteManager.getRichSyntaxPalette()

    // Генерация токенов (здесь будет интеграция с существующими генераторами)
    const colors = this.generateInterfaceColors(interfacePalette)
    const tokenColors = this.generateTokenColors(
      syntaxPalette,
      richSyntaxPalette
    )
    const semanticTokens = this.generateSemanticTokens(richSyntaxPalette)

    // Базовая тема
    const theme: VSCodeTheme = {
      name: this.config.displayName,
      type: this.config.type,
      colors,
      tokenColors,
      semanticTokenColors: semanticTokens,
    }

    // Применение оверрайдов
    if (colorScheme?.overrides) {
      this.applyOverrides(theme, colorScheme.overrides)
    }

    // Выполнение хуков после генерации
    for (const plugin of this.plugins) {
      if (plugin.afterThemeGeneration) {
        const result = await plugin.afterThemeGeneration(theme)
        if (result) {
          Object.assign(theme, result)
        }
      }
    }

    // Валидация темы
    if (this.validationConfig.enableValidation) {
      this.validateThemeInternal(theme)
    }

    // Оптимизация темы
    if (this.optimizationConfig.optimizePerformance) {
      this.optimizeThemeInternal(theme)
    }

    return theme
  }

  /**
   * Синхронная генерация темы
   */
  private generateThemeSync(colorScheme?: ColorSchemeConfig): VSCodeTheme {
    // Упрощенная синхронная версия
    const interfacePalette = this.paletteManager.getInterfacePalette()
    const syntaxPalette = this.paletteManager.getSyntaxPalette()
    const richSyntaxPalette = this.paletteManager.getRichSyntaxPalette()

    const colors = this.generateInterfaceColors(interfacePalette)
    const tokenColors = this.generateTokenColors(
      syntaxPalette,
      richSyntaxPalette
    )
    const semanticTokens = this.generateSemanticTokens(richSyntaxPalette)

    const theme: VSCodeTheme = {
      name: this.config.displayName,
      type: this.config.type,
      colors,
      tokenColors,
      semanticTokenColors: semanticTokens,
    }

    if (colorScheme?.overrides) {
      this.applyOverrides(theme, colorScheme.overrides)
    }

    return theme
  }

  /**
   * Генерация вариантов темы (реализация IThemeGenerator)
   */
  generateThemeVariants(variants: any[]): VSCodeTheme[] {
    return variants.map((variant) => {
      const options = { variant }
      return this.generateTheme(options)
    })
  }

  /**
   * Установка конфигурации (реализация IThemeGenerator)
   */
  setConfig(config: any): void {
    this.themeGeneratorConfig = config
  }

  /**
   * Получение конфигурации (реализация IThemeGenerator)
   */
  getConfig(): any {
    return this.themeGeneratorConfig
  }

  /**
   * Оптимизация темы (реализация IThemeGenerator)
   */
  optimizeTheme(theme: VSCodeTheme): VSCodeTheme {
    this.optimizeThemeInternal(theme)
    return theme
  }

  /**
   * Валидация темы (реализация IThemeGenerator)
   */
  validateTheme(theme: VSCodeTheme): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!theme.name) {
      errors.push('Theme name is required')
    }

    if (!theme.type || !['dark', 'light'].includes(theme.type)) {
      errors.push('Theme type must be "dark" or "light"')
    }

    if (!theme.colors) {
      errors.push('Theme colors are required')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Экспорт темы (реализация IThemeGenerator)
   */
  exportTheme(theme: VSCodeTheme, format: any): string {
    return this.exportThemeInternal(theme, format as 'json' | 'package')
  }

  /**
   * Экспорт нескольких тем (реализация IThemeGenerator)
   */
  exportMultipleThemes(themes: VSCodeTheme[], format: any): string[] {
    return themes.map((theme) =>
      this.exportThemeInternal(theme, format as 'json' | 'package')
    )
  }

  /**
   * Получение метаданных темы (реализация IThemeGenerator)
   */
  getThemeMetadata(theme: VSCodeTheme): any {
    return {
      name: theme.name,
      type: theme.type,
      colorCount: theme.colors ? Object.keys(theme.colors).length : 0,
      tokenCount: theme.tokenColors ? theme.tokenColors.length : 0,
      hasSemanticTokens: !!theme.semanticTokenColors,
      generatedAt: new Date(),
      version: this.config.version || '1.0.0',
    }
  }

  /**
   * Сравнение тем (реализация IThemeGenerator)
   */
  compareThemes(theme1: VSCodeTheme, theme2: VSCodeTheme): any {
    const differences: string[] = []
    const improvements: string[] = []
    const breakingChanges: string[] = []

    // Сравнение цветов
    if (theme1.colors && theme2.colors) {
      const colors1 = Object.keys(theme1.colors)
      const colors2 = Object.keys(theme2.colors)

      const addedColors = colors2.filter((c) => !colors1.includes(c))
      const removedColors = colors1.filter((c) => !colors2.includes(c))

      if (addedColors.length > 0) {
        improvements.push(`Added ${addedColors.length} colors`)
      }

      if (removedColors.length > 0) {
        breakingChanges.push(`Removed ${removedColors.length} colors`)
      }
    }

    // Расчет схожести (упрощенный)
    const similarity = 85 - differences.length * 5

    return {
      differences,
      similarity: Math.max(0, similarity),
      breakingChanges,
      improvements,
    }
  }

  /**
   * Экспорт темы в файл
   */
  exportThemeInternal(
    theme: VSCodeTheme,
    format: 'json' | 'package' = 'json'
  ): string {
    if (format === 'json') {
      return JSON.stringify(theme, null, 2)
    }

    if (format === 'package') {
      const packageJson = {
        name: this.config.name,
        displayName: this.config.displayName,
        description: this.config.description,
        version: this.config.version || '1.0.0',
        publisher: this.config.publisher || 'unknown',
        author: this.config.author || 'unknown',
        repository: this.config.repository,
        bugs: this.config.bugs,
        categories: this.config.categories || ['Themes'],
        keywords: this.config.keywords || ['theme'],
        contributes: {
          themes: [
            {
              label: this.config.displayName,
              uiTheme: this.config.type === 'dark' ? 'vs-dark' : 'vs',
              path: this.config.filename || 'theme.json',
            },
          ],
        },
        engines: {
          vscode: '^1.60.0',
        },
      }
      return JSON.stringify(packageJson, null, 2)
    }

    throw new Error(`Unsupported export format: ${format}`)
  }

  /**
   * Импорт темы из конфигурации
   */
  async importTheme(config: any): Promise<void> {
    // Импорт палитры
    if (config.palette) {
      this.paletteManager.importPalette(JSON.stringify(config.palette))
    }

    // Обновление конфигурации
    if (config.theme) {
      this.config = { ...this.config, ...config.theme }
    }
  }

  /**
   * Получение статистики кэша
   */
  getCacheStats() {
    return this.cacheManager.getStats()
  }

  /**
   * Очистка кэша
   */
  clearCache(): void {
    this.cacheManager.clear()
  }

  /**
   * Получение ошибок валидации
   */
  getValidationErrors(): string[] {
    return this.paletteManager.getValidationErrors()
  }

  // Приватные методы

  private generateInterfaceColors(
    palette: InterfacePalette
  ): Record<string, string> {
    // Интеграция с существующим modernInterfaceMapping
    // Временная реализация - будет заменена на прямую интеграцию
    const { createTokens } = require('../generators/modernInterfaceMapping')
    return createTokens(palette)
  }

  private generateTokenColors(
    syntaxPalette: SyntaxPalette,
    richSyntaxPalette: RichSyntaxPalette
  ) {
    // Интеграция с существующим генератором токенов
    const { generateTokenColors } = require('../generators/tokens')
    return generateTokenColors()
  }

  private generateSemanticTokens(richSyntaxPalette: RichSyntaxPalette) {
    // Интеграция с существующим генератором семантических токенов
    const { generateSemanticTokens } = require('../generators/tokens')
    return generateSemanticTokens()
  }

  private applyOverrides(
    theme: VSCodeTheme,
    overrides: Record<string, string>
  ): void {
    // Применение оверрайдов к цветам
    if (theme.colors) {
      Object.assign(theme.colors, overrides)
    }
  }

  private validateThemeInternal(theme: VSCodeTheme): void {
    const errors: string[] = []

    // Базовая валидация структуры
    if (!theme.name) {
      errors.push('Theme name is required')
    }

    if (!theme.type || !['dark', 'light'].includes(theme.type)) {
      errors.push('Theme type must be "dark" or "light"')
    }

    if (!theme.colors) {
      errors.push('Theme colors are required')
    }

    // Валидация через плагины
    for (const plugin of this.plugins) {
      if (plugin.validate) {
        const isValid = plugin.validate(theme)
        if (!isValid) {
          errors.push(`Plugin ${plugin.name} validation failed`)
        }
      }
    }

    if (errors.length > 0) {
      if (this.validationConfig.strictMode) {
        throw new Error(`Theme validation failed: ${errors.join(', ')}`)
      } else {
        console.warn('Theme validation warnings:', errors)
      }
    }
  }

  private optimizeThemeInternal(theme: VSCodeTheme): void {
    // Оптимизация через плагины
    for (const plugin of this.plugins) {
      if (plugin.optimize) {
        plugin.optimize(theme)
      }
    }

    // Базовая оптимизация - удаление пустых значений
    if (theme.colors) {
      Object.keys(theme.colors).forEach((key) => {
        if (theme.colors![key] === undefined || theme.colors![key] === null) {
          delete theme.colors![key]
        }
      })
    }
  }
}

/**
 * Фабрика для создания ThemeEngine с предустановленными конфигурациями
 */
export class ThemeEngineFactory {
  /**
   * Создание ThemeEngine для Tokyo Night Modern
   */
  static createTokyoNightModern(
    config?: Partial<ThemeEngineConfig>
  ): ThemeEngine {
    const defaultConfig: ThemeEngineConfig = {
      name: 'tokyo-night-modern',
      displayName: 'Tokyo Night Modern',
      description:
        'Beautiful modern dark theme for VS Code with carefully crafted colors and contemporary design',
      type: 'dark',
      version: '1.18.19',
      author: 'lod',
      publisher: 'lod-inc',
      repository: 'https://github.com/darqus/tokyo-night-modern-vscode-theme',
      bugs: 'https://github.com/darqus/tokyo-night-modern-vscode-theme/issues',
      categories: 'Themes',
      keywords: 'theme,tokyo,night,dark',
      filename: 'tokyo-night-modern-color-theme',
    }

    return new ThemeEngine({ ...defaultConfig, ...config })
  }

  /**
   * Создание ThemeEngine для светлой темы
   */
  static createLightTheme(config?: Partial<ThemeEngineConfig>): ThemeEngine {
    const defaultConfig: ThemeEngineConfig = {
      name: 'tokyo-night-modern-light',
      displayName: 'Tokyo Night Modern Light',
      description:
        'Beautiful modern light theme for VS Code with carefully crafted colors and contemporary design',
      type: 'light',
      version: '1.0.0',
      author: 'lod',
      publisher: 'lod-inc',
      categories: 'Themes',
      keywords: 'theme,tokyo,night,light',
    }

    return new ThemeEngine({ ...defaultConfig, ...config })
  }

  /**
   * Создание ThemeEngine с кастомной конфигурацией
   */
  static createCustom(config: ThemeEngineConfig): ThemeEngine {
    return new ThemeEngine(config)
  }
}
