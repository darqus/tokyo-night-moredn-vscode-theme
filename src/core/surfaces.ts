/**
 * Унифицированная система поверхностей для Tokyo Night Modern
 * Объединяет типы из pickReadable.ts и tokenRegistry.ts
 */

import type { Hex } from '../types/theme'

// Базовые поверхности (основа архитектуры)
export type BaseSurface = 'base' | 'elevated' | 'overlay'

// Семантические поверхности (контекстуальные области VS Code)
export type SemanticSurface =
  | 'editor'
  | 'terminal'
  | 'panel'
  | 'menu'
  | 'list'
  | 'statusBar'
  | 'tabs'
  | 'quickInput'
  | 'sidebar'
  | 'activityBar'
  | 'breadcrumb'
  | 'notification'

// Специализированные поверхности (временные состояния)
export type InteractiveSurface =
  | 'hover'
  | 'active'
  | 'selection'
  | 'focus'
  | 'disabled'
  | 'input'

// Объединенный тип поверхностей
export type SurfaceType = BaseSurface | SemanticSurface | InteractiveSurface

// Роли текста для каждой поверхности
export interface ForegroundRoles {
  primary: Hex // Основной текст (4.5+ контраст)
  muted: Hex // Приглушенный текст (3.0+ контраст)
  subtle: Hex // Едва заметный текст (2.5+ контраст)
  inactive: Hex // Неактивный текст (2.0+ контраст)
}

// Конфигурация поверхности
export interface Surface {
  background: Hex
  foreground: ForegroundRoles
  border: Hex
  elevation: number // z-index hint для визуальной иерархии
  opacity?: number // для overlay поверхностей
  semanticMapping?: SemanticSurface[] // какие семантические области используют эту поверхность
}

// Альфа-политики для валидации
export type AlphaPolicy = 'opaque' | 'transparent' | 'either'

// Пороги контрастности
export interface ContrastThresholds {
  primaryMin: number // минимум для primary текста
  mutedMin: number // минимум для muted текста
  subtleMin: number // минимум для subtle текста
  inactiveMin: number // минимум для inactive текста
}

// Расширенная конфигурация поверхности с метаданными
export interface SurfaceConfig extends Surface {
  name: string
  description?: string
  alphaPolicy: AlphaPolicy
  contrastThresholds: ContrastThresholds
  accessibility: {
    wcagLevel: 'AA' | 'AAA'
    minContrast: number
  }
}

// Система поверхностей Tokyo Night Modern
export interface SurfaceSystem {
  // Базовые поверхности
  base: SurfaceConfig
  elevated: SurfaceConfig
  overlay: SurfaceConfig

  // Специализированные интерактивные поверхности
  input: SurfaceConfig
  selection: SurfaceConfig
  hover: SurfaceConfig
  focus: SurfaceConfig

  // Дополнительные семантические поверхности
  terminal: SurfaceConfig
  error: SurfaceConfig
  warning: SurfaceConfig
  success: SurfaceConfig
  info: SurfaceConfig
}

// Дефолтные пороги контрастности
export const DEFAULT_CONTRAST_THRESHOLDS: ContrastThresholds = {
  primaryMin: 4.5, // WCAG AA
  mutedMin: 3.0, // Reduced contrast но читаемый
  subtleMin: 2.5, // Минимально заметный
  inactiveMin: 2.0, // Placeholder уровень
}

// Маппинг семантических поверхностей на базовые
export const SEMANTIC_TO_BASE_MAPPING: Record<SemanticSurface, BaseSurface> = {
  editor: 'base',
  terminal: 'base',
  panel: 'elevated',
  menu: 'elevated',
  list: 'elevated',
  statusBar: 'base',
  tabs: 'base',
  quickInput: 'overlay',
  sidebar: 'base',
  activityBar: 'base',
  breadcrumb: 'base',
  notification: 'overlay',
}

/**
 * Resolve поверхности: семантическую к базовой
 */
export function resolveSurface(surface: SurfaceType): BaseSurface {
  if (surface === 'base' || surface === 'elevated' || surface === 'overlay') {
    return surface as BaseSurface
  }

  if (surface in SEMANTIC_TO_BASE_MAPPING) {
    return SEMANTIC_TO_BASE_MAPPING[surface as SemanticSurface]
  }

  // Интерактивные поверхности по умолчанию используют base
  return 'base'
}

/**
 * Получить роли текста для указанной поверхности
 */
export function getSurfaceRoles(
  surfaceSystem: SurfaceSystem,
  surface: SurfaceType
): ForegroundRoles {
  const baseSurface = resolveSurface(surface)
  return surfaceSystem[baseSurface].foreground
}

/**
 * Проверить, поддерживает ли поверхность прозрачность
 */
export function supportsTransparency(
  surfaceSystem: SurfaceSystem,
  surface: SurfaceType
): boolean {
  const baseSurface = resolveSurface(surface)
  const policy = surfaceSystem[baseSurface].alphaPolicy
  return policy === 'transparent' || policy === 'either'
}

/**
 * Получить рекомендуемые пороги контрастности для поверхности
 */
export function getContrastThresholds(
  surfaceSystem: SurfaceSystem,
  surface: SurfaceType
): ContrastThresholds {
  const baseSurface = resolveSurface(surface)
  return surfaceSystem[baseSurface].contrastThresholds
}
