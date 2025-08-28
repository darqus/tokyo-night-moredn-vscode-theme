import type { Hex } from './palette'
import type { TokenColor } from '../tokenColors'
import type { SemanticTokenStyle } from '../semanticTokenColors'

/**
 * Основные типы для Tokyo Night Lod темы
 */

export interface ComponentStates {
  default: ComponentStyle
  hover?: ComponentStyle
  active?: ComponentStyle
  focus?: ComponentStyle
  disabled?: ComponentStyle
}

export interface ComponentStyle {
  background?: Hex | 'transparent'
  foreground?: Hex
  border?: Hex | 'transparent'
  shadow?: string
}

export interface UIComponent {
  name: string
  states: ComponentStates
}

export interface ColorScale {
  50: Hex // Самый светлый
  100: Hex
  200: Hex
  300: Hex
  400: Hex
  500: Hex // Базовый
  600: Hex
  700: Hex
  800: Hex
  900: Hex // Самый темный
}

export interface ValidationRule {
  name: string
  description: string
  validate: (theme: ThemeData) => ValidationResult
}

export interface ValidationResult {
  passed: boolean
  issues: ValidationIssue[]
}

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
}

export interface ThemeData {
  name: string
  type: 'dark' | 'light'
  colors: Record<string, string>
  tokenColors: TokenColor[]
  semanticTokenColors: Record<string, SemanticTokenStyle>
}

/**
 * Полный объект темы (включая метаданные), используемый в сборщике варианта темы
 */
export interface ThemeObject extends ThemeData {
  displayName: string
  author: string
  maintainers: string[]
  semanticClass?: string
  semanticHighlighting: boolean
}

export interface ThemeConfig {
  // Define theme configuration properties as needed
  // For now, this can be a flexible type until specific config needs are identified
  [key: string]: unknown
}

export interface ThemePlugin {
  name: string
  version: string
  description: string
  apply: (theme: ThemeData, config?: ThemeConfig) => ThemeData
  isCompatible: (themeVersion: string) => boolean
}

export interface ThemeSettings {
  contrast: 'low' | 'normal' | 'high'

  syntax: {
    enableSemanticHighlighting: boolean
    bracketPairColorization: boolean
    customLanguageSupport: string[]
  }

  ui: {
    activityBarPosition: 'left' | 'right'
    tabBarStyle: 'classic' | 'modern' | 'minimal'
    statusBarStyle: 'minimal' | 'full'
  }

  customColors?: Record<string, string>
}
