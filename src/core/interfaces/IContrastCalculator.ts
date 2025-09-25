/**
 * Интерфейс для калькулятора контрастности
 */
import type { Hex } from '../../types/theme'

export interface IContrastCalculator {
  // Основные расчеты контрастности
  calculateContrast(foreground: Hex, background: Hex): number
  calculateAlphaAwareContrast(
    foreground: Hex,
    background: Hex,
    alpha?: number
  ): number

  // Проверка доступности
  isAccessible(
    foreground: Hex,
    background: Hex,
    level?: AccessibilityLevel
  ): boolean
  getMinimumContrast(level: AccessibilityLevel): number

  // Оптимизация контрастности
  optimizeForContrast(
    color: Hex,
    background: Hex,
    targetLevel: AccessibilityLevel
  ): Hex
  findBestContrastRatio(
    colors: Hex[],
    background: Hex,
    targetLevel: AccessibilityLevel
  ): Hex | null

  // Групповые операции
  batchContrastCheck(
    pairs: Array<{ foreground: Hex; background: Hex }>
  ): Array<{ contrast: number; accessible: boolean }>

  // Анализ и рекомендации
  analyzeColorPair(foreground: Hex, background: Hex): ContrastAnalysis
  getContrastRecommendations(
    currentRatio: number,
    targetLevel: AccessibilityLevel
  ): ContrastRecommendation[]

  // Продвинутые функции
  simulateColorBlindness(color: Hex, type: ColorBlindnessType): Hex
  calculatePerceptualDistance(color1: Hex, color2: Hex): number

  // Конфигурация
  setConfig(config: ContrastConfig): void
  getConfig(): ContrastConfig
}

export interface ContrastAnalysis {
  contrastRatio: number
  accessibilityLevel: AccessibilityLevel
  passesWCAG: boolean
  colorDifference: number
  brightnessDifference: number
  recommendations: string[]
  warnings: string[]
}

export interface ContrastRecommendation {
  type: 'increase' | 'decrease' | 'change_hue' | 'change_saturation'
  description: string
  estimatedImprovement: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface ContrastConfig {
  algorithm?: 'wcag2' | 'wcag21' | 'apca'
  defaultLevel?: AccessibilityLevel
  enableColorBlindnessSimulation?: boolean
  perceptualModel?: 'cie76' | 'cie94' | 'cie2000' | 'deltaE'
}

export type AccessibilityLevel = 'AA' | 'AAA' | 'AA-large' | 'AAA-large'

export type ColorBlindnessType =
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia'
  | 'protanomaly'
  | 'deuteranomaly'
  | 'tritanomaly'
  | 'achromatomaly'

export interface IAdvancedContrastCalculator extends IContrastCalculator {
  // Тематический анализ
  analyzeThemeContrast(themeColors: Record<string, Hex>): ThemeContrastReport
  generateContrastMatrix(colors: Hex[][]): number[][]

  // Адаптивная оптимизация
  adaptiveOptimize(color: Hex, background: Hex, context: ContrastContext): Hex

  // Пакетная обработка
  batchOptimize(
    colors: Hex[],
    background: Hex,
    targetLevel: AccessibilityLevel
  ): Hex[]

  // Визуализация
  generateContrastVisualization(
    foreground: Hex,
    background: Hex
  ): ContrastVisualization
}

export interface ThemeContrastReport {
  overallScore: number
  criticalPairs: Array<{
    key1: string
    key2: string
    contrast: number
    accessible: boolean
  }>
  recommendations: string[]
  compliance: {
    AA: number
    AAA: number
    'AA-large': number
    'AAA-large': number
  }
}

export interface ContrastContext {
  usage: 'text' | 'ui' | 'accent' | 'background'
  size: 'small' | 'normal' | 'large'
  importance: 'low' | 'medium' | 'high'
  environment: 'light' | 'dark' | 'mixed'
}

export interface ContrastVisualization {
  contrastRatio: number
  colorBlocks: {
    foreground: Hex
    background: Hex
    blended: Hex
  }
  accessibilityIndicator: 'pass' | 'fail' | 'warning'
  visualRepresentation: string
}
