/**
 * Интерфейс для менеджера поверхностей
 */
import type { Hex } from '../../types/theme'

export interface ISurfaceManager {
  // Основные поверхности
  getBaseSurface(): Hex
  getElevatedSurface(): Hex
  getOverlaySurface(): Hex
  getInputSurface(): Hex

  // Интерактивные состояния
  getHoverSurface(): Hex
  getActiveSurface(): Hex
  getSelectionSurface(): Hex

  // Специализированные поверхности
  getHoverSubtleSurface(): Hex
  getHoverMutedSurface(): Hex
  getHoverActiveSurface(): Hex

  // Динамическое создание поверхностей
  createSurface(baseColor: Hex, elevation: number): Hex
  createOverlay(baseColor: Hex, opacity: number): Hex
  createInputField(baseColor: Hex): Hex

  // Адаптивные поверхности
  adaptToEnvironment(baseColor: Hex, environment: Environment): Hex
  adaptForAccessibility(surface: Hex, text: Hex): Hex

  // Групповые операции
  generateSurfacePalette(baseColor: Hex): SurfacePalette
  batchCreateSurfaces(
    baseColors: Hex[],
    configurations: SurfaceConfiguration[]
  ): Hex[]

  // Анализ поверхностей
  analyzeSurface(surface: Hex): SurfaceAnalysis
  validateSurfaceContrast(surface: Hex, text: Hex): SurfaceValidation

  // Конфигурация
  setConfig(config: SurfaceConfig): void
  getConfig(): SurfaceConfig
}

export interface SurfacePalette {
  base: Hex
  elevated: Hex
  overlay: Hex
  input: Hex
  hover: Hex
  active: Hex
  selection: Hex
  hoverSubtle: Hex
  hoverMuted: Hex
  hoverActive: Hex
}

export interface SurfaceConfiguration {
  elevation: number
  opacity?: number
  blur?: number
  shadow?: boolean
  interactive?: boolean
}

export interface SurfaceAnalysis {
  lightness: number
  contrastRatio: number
  readability: 'excellent' | 'good' | 'fair' | 'poor'
  recommendedUsage: string[]
  warnings: string[]
  accessibilityScore: number
}

export interface SurfaceValidation {
  isValid: boolean
  contrastRatio: number
  meetsWCAG: boolean
  recommendations: string[]
  criticalIssues: string[]
}

export interface SurfaceConfig {
  defaultElevation?: number
  defaultOpacity?: number
  enableAdaptiveSurfaces?: boolean
  accessibilityMode?: boolean
  environment?: Environment
}

export type Environment = 'light' | 'dark' | 'mixed'

export interface IAdvancedSurfaceManager extends ISurfaceManager {
  // Продвинутые поверхности
  createGlassSurface(baseColor: Hex, blur: number): Hex
  createMorphingSurface(baseColor: Hex, targetColor: Hex): Hex
  createResponsiveSurface(baseColor: Hex, context: SurfaceContext): Hex

  // Тематические поверхности
  generateThemeSurfaces(baseColor: Hex, theme: SurfaceTheme): ThemeSurfaces
  createMaterialSurface(baseColor: Hex, material: MaterialType): Hex

  // Адаптивные поверхности
  createAdaptiveSurface(
    baseColor: Hex,
    conditions: AdaptiveConditions
  ): AdaptiveSurface
  morphSurface(surface: Hex, target: Hex, progress: number): Hex

  // Аналитика и оптимизация
  optimizeSurfaceForContext(surface: Hex, context: SurfaceContext): Hex
  analyzeSurfaceHierarchy(surfaces: SurfacePalette): SurfaceHierarchyAnalysis

  // Пакетная обработка
  batchOptimizeSurfaces(surfaces: Hex[], context: SurfaceContext): Hex[]
  generateSurfaceVariations(
    baseSurface: Hex,
    variations: SurfaceVariation[]
  ): Hex[]
}

export interface SurfaceContext {
  usage: 'background' | 'card' | 'modal' | 'sidebar' | 'header'
  contentDensity: 'low' | 'medium' | 'high'
  interactionLevel: 'low' | 'medium' | 'high'
  accessibility: 'standard' | 'enhanced'
}

export interface SurfaceTheme {
  primary: Hex
  secondary: Hex
  accent: Hex
  neutral: Hex
  error: Hex
  warning: Hex
  success: Hex
  info: Hex
}

export interface MaterialType {
  type: 'matte' | 'glossy' | 'metallic' | 'fabric' | 'glass'
  roughness: number
  reflectivity: number
  transparency: number
}

export interface AdaptiveConditions {
  ambientLight: number
  userPreferences: UserSurfacePreferences
  deviceCapabilities: DeviceCapabilities
}

export interface UserSurfacePreferences {
  contrast: 'low' | 'medium' | 'high'
  brightness: 'dark' | 'medium' | 'bright'
  saturation: 'muted' | 'normal' | 'vibrant'
}

export interface DeviceCapabilities {
  colorGamut: 'srgb' | 'p3' | 'rec2020'
  contrastRatio: number
  brightness: number
}

export interface AdaptiveSurface {
  base: Hex
  variants: Record<string, Hex>
  conditions: AdaptiveConditions
  adaptationRules: AdaptationRule[]
}

export interface AdaptationRule {
  condition: string
  action: 'adjust_lightness' | 'adjust_saturation' | 'adjust_hue'
  value: number
}

export interface SurfaceHierarchyAnalysis {
  depthConsistency: number
  contrastFlow: number
  visualHierarchy: 'excellent' | 'good' | 'fair' | 'poor'
  recommendations: string[]
  issues: SurfaceIssue[]
}

export interface SurfaceIssue {
  type: 'contrast' | 'hierarchy' | 'consistency' | 'accessibility'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  suggestedFix: string
}

export interface SurfaceVariation {
  type: 'elevation' | 'opacity' | 'hue' | 'saturation' | 'lightness'
  value: number
  name: string
}

export interface ThemeSurfaces {
  backgrounds: Record<string, Hex>
  cards: Record<string, Hex>
  modals: Record<string, Hex>
  interactive: Record<string, Hex>
  decorative: Record<string, Hex>
}
