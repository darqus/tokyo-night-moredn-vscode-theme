import type { InterfacePalette } from '../types/theme'
import { getContrastRatioAware } from '../core/contrast'

export type SurfaceKey = 'base' | 'elevated' | 'overlay'

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
 * Выбор читаемой роли текста для заданной поверхности.
 * Предпочитаем muted/subtle, но при нехватке контраста возвращаем primary.
 */
export function pickReadable(
  ip: InterfacePalette,
  surface: SurfaceKey,
  preferred: 'muted' | 'subtle' = 'muted',
  thresholds: Thresholds = {}
): string {
  const t = { ...DEFAULTS, ...thresholds }
  const bg =
    surface === 'base'
      ? ip.bg.base
      : surface === 'elevated'
      ? ip.bg.elevated
      : ip.bg.overlay

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
