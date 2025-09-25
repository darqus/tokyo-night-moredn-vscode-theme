/**
 * Типы для ThemeEngine и связанных компонентов
 */

import type {
  ThemePlugin,
  ThemeEngineConfig,
  ColorSchemeConfig,
} from '../core/themeEngine'

export { ThemePlugin, ThemeEngineConfig, ColorSchemeConfig }

/**
 * Конфигурация темы для импорта/экспорта
 */
export interface ThemeConfig {
  palette?: {
    interface?: any
    syntax?: any
    richSyntax?: any
  }
  theme?: Partial<ThemeEngineConfig>
  plugins?: PluginConfig[]
}

/**
 * Конфигурация плагина
 */
export interface PluginConfig {
  name: string
  version: string
  description: string
  priority?: number
  enabled?: boolean
  config?: Record<string, any>
}

/**
 * Результат валидации темы
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  suggestions: string[]
}

/**
 * Статистика генерации темы
 */
export interface GenerationStats {
  timeMs: number
  cacheHits: number
  cacheMisses: number
  pluginsExecuted: string[]
  validationErrors: number
  optimizationImprovements: number
}

/**
 * Опции экспорта темы
 */
export interface ExportOptions {
  format: 'json' | 'package' | 'minified'
  includeMetadata?: boolean
  compression?: boolean
}
