/**
 * Интерфейс для генератора тем
 */
import type { VSCodeTheme } from '../../types/theme'

export interface IThemeGenerator {
  // Генерация темы
  generateTheme(options?: ThemeGenerationOptions): VSCodeTheme
  generateThemeVariants(variants: ThemeVariant[]): VSCodeTheme[]

  // Конфигурация
  setConfig(config: ThemeGeneratorConfig): void
  getConfig(): ThemeGeneratorConfig

  // Оптимизация
  optimizeTheme(theme: VSCodeTheme): VSCodeTheme
  validateTheme(theme: VSCodeTheme): { valid: boolean; errors: string[] }

  // Экспорт
  exportTheme(theme: VSCodeTheme, format: ExportFormat): string
  exportMultipleThemes(themes: VSCodeTheme[], format: ExportFormat): string[]

  // Метаданные
  getThemeMetadata(theme: VSCodeTheme): ThemeMetadata
  compareThemes(theme1: VSCodeTheme, theme2: VSCodeTheme): ThemeComparison
}

export interface ThemeGenerationOptions {
  variant?: ThemeVariant
  optimizeForPerformance?: boolean
  includeSemanticTokens?: boolean
  customOverrides?: Record<string, string>
}

export interface ThemeGeneratorConfig {
  defaultVariant?: ThemeVariant
  enableOptimization?: boolean
  enableValidation?: boolean
  semanticTokenSupport?: boolean
  compressionLevel?: 'none' | 'basic' | 'aggressive'
}

export interface ThemeMetadata {
  name: string
  type: 'dark' | 'light'
  colorCount: number
  tokenCount: number
  hasSemanticTokens: boolean
  generatedAt: Date
  version: string
}

export interface ThemeComparison {
  differences: string[]
  similarity: number
  breakingChanges: string[]
  improvements: string[]
}

export type ThemeVariant =
  | 'default'
  | 'minimal'
  | 'vibrant'
  | 'pastel'
  | 'high-contrast'
  | 'colorblind-friendly'

export type ExportFormat =
  | 'json'
  | 'minified-json'
  | 'vscode-package'
  | 'css-variables'
