import type { InterfacePalette } from '../types/theme'
import { getContrastRatioAware } from '../core/contrast'
import {
  type SurfaceType,
  type BaseSurface,
  type ContrastThresholds,
  resolveSurface,
  DEFAULT_CONTRAST_THRESHOLDS,
} from '../core/surfaces'

// Совместимость: старый тип для существующего кода
export type SurfaceKey = BaseSurface

type Thresholds = {
  primaryMin?: number
  mutedMin?: number
  subtleMin?: number
}

const DEFAULTS: Required<Thresholds> = {
  primaryMin: 4.5,
  mutedMin: 3.0,
  subtleMin: 2.5,
}

/**
 * Улучшенная версия pickReadable с поддержкой новой системы поверхностей
 */
export function pickReadableAdvanced(
  ip: InterfacePalette,
  surface: SurfaceType,
  preferred: 'muted' | 'subtle' = 'muted',
  customThresholds?: Partial<ContrastThresholds>
): string {
  const baseSurface = resolveSurface(surface)
  const thresholds = { ...DEFAULT_CONTRAST_THRESHOLDS, ...customThresholds }

  const bg = getSurfaceBackground(ip, baseSurface)
  const roles = ip.textOn[baseSurface]

  if (preferred === 'subtle') {
    const rSubtle = getContrastRatioAware(roles.subtle, bg as any)
    if (rSubtle >= thresholds.subtleMin) return roles.subtle

    // Fallback to muted
    const rMuted = getContrastRatioAware(roles.muted, bg as any)
    if (rMuted >= thresholds.mutedMin) return roles.muted

    return roles.primary
  }

  // preferred === 'muted'
  const rMuted = getContrastRatioAware(roles.muted, bg as any)
  if (rMuted >= thresholds.mutedMin) return roles.muted

  return roles.primary
}

/**
 * Получить фон для базовой поверхности
 */
function getSurfaceBackground(
  ip: InterfacePalette,
  surface: BaseSurface
): string {
  switch (surface) {
    case 'base':
      return ip.bg.base
    case 'elevated':
      return ip.bg.elevated
    case 'overlay':
      return ip.bg.overlay
    default:
      return ip.bg.base
  }
}

/**
 * Выбор читаемой роли текста для заданной поверхности.
 * Предпочитаем muted/subtle, но при нехватке контраста возвращаем primary.
 *
 * @deprecated Используйте pickReadableAdvanced для новых возможностей
 */
export function pickReadable(
  ip: InterfacePalette,
  surface: SurfaceKey,
  preferred: 'muted' | 'subtle' = 'muted',
  thresholds: Thresholds = {}
): string {
  const t = { ...DEFAULTS, ...thresholds }
  const bg = getSurfaceBackground(ip, surface)
  const roles = ip.textOn[surface]

  if (preferred === 'subtle') {
    const rSubtle = getContrastRatioAware(roles.subtle, bg as any)
    if (rSubtle >= t.subtleMin) return roles.subtle
    // если subtle не проходит — пробуем muted
    const rMuted = getContrastRatioAware(roles.muted, bg as any)
    if (rMuted >= t.mutedMin) return roles.muted
    return roles.primary
  }

  // preferred === 'muted'
  const rMuted = getContrastRatioAware(roles.muted, bg as any)
  if (rMuted >= t.mutedMin) return roles.muted
  return roles.primary
}

/**
 * Выбор оптимального цвета текста с учетом accessibility требований
 */
export function pickAccessibleText(
  ip: InterfacePalette,
  surface: SurfaceType,
  wcagLevel: 'AA' | 'AAA' = 'AA'
): string {
  const baseSurface = resolveSurface(surface)
  const bg = getSurfaceBackground(ip, baseSurface)
  const roles = ip.textOn[baseSurface]

  const targetContrast = wcagLevel === 'AAA' ? 7.0 : 4.5

  // Проверяем в порядке приоритета
  const candidates = [
    { role: 'primary', color: roles.primary },
    { role: 'muted', color: roles.muted },
    { role: 'subtle', color: roles.subtle },
    { role: 'inactive', color: roles.inactive },
  ]

  for (const candidate of candidates) {
    const contrast = getContrastRatioAware(candidate.color, bg as any)
    if (contrast >= targetContrast) {
      return candidate.color
    }
  }

  // Fallback к primary если ничего не прошло
  return roles.primary
}

/**
 * Получить все доступные роли текста для поверхности с их контрастом
 */
export function getTextRolesWithContrast(
  ip: InterfacePalette,
  surface: SurfaceType
): Array<{ role: string; color: string; contrast: number }> {
  const baseSurface = resolveSurface(surface)
  const bg = getSurfaceBackground(ip, baseSurface)
  const roles = ip.textOn[baseSurface]

  return [
    {
      role: 'primary',
      color: roles.primary,
      contrast: getContrastRatioAware(roles.primary, bg as any),
    },
    {
      role: 'muted',
      color: roles.muted,
      contrast: getContrastRatioAware(roles.muted, bg as any),
    },
    {
      role: 'subtle',
      color: roles.subtle,
      contrast: getContrastRatioAware(roles.subtle, bg as any),
    },
    {
      role: 'inactive',
      color: roles.inactive,
      contrast: getContrastRatioAware(roles.inactive, bg as any),
    },
  ]
}
