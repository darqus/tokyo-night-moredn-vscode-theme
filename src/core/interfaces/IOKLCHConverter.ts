/**
 * Интерфейс для конвертера OKLCH
 */
import type { Hex, RGB, OKLCH } from '../../types/theme'

export interface IOKLCHConverter {
  // Основные преобразования
  hexToOKLCH(hex: Hex): OKLCH
  oklchToHex(oklch: OKLCH): Hex
  rgbToOKLCH(rgb: RGB): OKLCH
  oklchToRGB(oklch: OKLCH): RGB

  // Кросс-форматы
  hexToRGB(hex: Hex): RGB
  rgbToHex(rgb: RGB): Hex

  // Пакетные операции
  batchHexToOKLCH(hexColors: Hex[]): OKLCH[]
  batchOKLCHToHex(oklchColors: OKLCH[]): Hex[]
  batchRGBToOKLCH(rgbColors: RGB[]): OKLCH[]
  batchOKLCHToRGB(oklchColors: OKLCH[]): RGB[]

  // Валидация
  isValidHex(hex: string): boolean
  isValidRGB(rgb: RGB): boolean
  isValidOKLCH(oklch: OKLCH): boolean
  normalizeHex(hex: string): Hex

  // Операции с цветами
  adjustLightness(oklch: OKLCH, delta: number): OKLCH
  adjustChroma(oklch: OKLCH, delta: number): OKLCH
  adjustHue(oklch: OKLCH, delta: number): OKLCH

  // Цветовые манипуляции
  mixColors(color1: OKLCH, color2: OKLCH, ratio: number): OKLCH
  findComplementary(color: OKLCH): OKLCH
  findAnalogous(color: OKLCH, count?: number): OKLCH[]
  findTriadic(color: OKLCH): OKLCH[]

  // Анализ цвета
  getColorInfo(color: OKLCH): ColorInfo
  isGrayscale(color: OKLCH): boolean
  getPerceptualBrightness(color: OKLCH): number

  // Оптимизация для отображения
  optimizeForDisplay(color: OKLCH, context: DisplayContext): OKLCH
  ensureGamut(color: OKLCH): OKLCH

  // Конфигурация
  setConfig(config: OKLCHConfig): void
  getConfig(): OKLCHConfig
}

export interface ColorInfo {
  lightness: number
  chroma: number
  hue: number
  perceivedBrightness: number
  colorTemperature: 'warm' | 'cool' | 'neutral'
  saturation: number
  vibrancy: number
  harmony: string
}

export interface DisplayContext {
  background: OKLCH
  ambientLight: 'dark' | 'normal' | 'bright'
  displayType: 'srgb' | 'p3' | 'rec2020'
  viewingConditions: 'standard' | 'dim' | 'bright'
}

export interface OKLCHConfig {
  precision?: number
  gamutMapping?: 'clip' | 'compress' | 'preserve'
  colorSpace?: 'srgb' | 'p3' | 'rec2020'
  epsilon?: number
  enableCaching?: boolean
}

export interface IAdvancedOKLCHConverter extends IOKLCHConverter {
  // Продвинутые цветовые операции
  createColorHarmony(baseColor: OKLCH, harmonyType: HarmonyType): OKLCH[]
  generateColorPalette(baseColor: OKLCH, options: PaletteOptions): OKLCH[]

  // Градиенты и интерполяция
  createGradient(colors: OKLCH[], steps: number): OKLCH[]
  interpolateColors(color1: OKLCH, color2: OKLCH, steps: number): OKLCH[]

  // Адаптация цвета
  adaptToBackground(color: OKLCH, background: OKLCH): OKLCH
  adaptForAccessibility(color: OKLCH, background: OKLCH): OKLCH

  // Анализ цветовых отношений
  analyzeColorRelationships(colors: OKLCH[]): ColorRelationshipAnalysis
  findOptimalContrastPair(foreground: OKLCH, background: OKLCH): OKLCH

  // Психофизические модели
  calculatePerceptualUniformity(colors: OKLCH[]): number
  simulateColorAppearance(color: OKLCH, conditions: ViewingConditions): OKLCH
}

export interface PaletteOptions {
  count: number
  harmonyType: HarmonyType
  includeMonochromatic?: boolean
  saturationRange?: [number, number]
  lightnessRange?: [number, number]
}

export interface ColorRelationshipAnalysis {
  harmonyScore: number
  contrastMatrix: number[][]
  complementaryPairs: Array<[number, number]>
  analogousGroups: number[][]
  overallHarmony: 'excellent' | 'good' | 'fair' | 'poor'
}

export interface ViewingConditions {
  illuminant: 'D50' | 'D65' | 'A'
  luminance: number
  adaptingField: number
  surround: 'average' | 'dim' | 'dark'
}

export type HarmonyType =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'tetradic'
  | 'split-complementary'
  | 'square'
  | 'monochromatic'
  | 'achromatic'
