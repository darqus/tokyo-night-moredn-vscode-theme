import { palette, basePalette, extendedPalette } from '../palette'
import {
  getAdaptiveActivityBarBackground,
  getAdaptiveActivityBarActiveBackground,
} from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getActivityBarColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Получаем адаптивные фоны панели активности
  const activityBarBackground = getAdaptiveActivityBarBackground(context)
  const activityBarActiveBackground =
    getAdaptiveActivityBarActiveBackground(context)

  return {
    // Панель действий (Activity Bar) - АДАПТИВНЫЙ фон в зависимости от типа темы
    'activityBar.background': activityBarBackground,
    'activityBar.foreground': extendedPalette.text.muted, // #787c99
    'activityBar.activeBorder': palette.brand.primary, // Активная граница
    'activityBar.activeBackground': activityBarActiveBackground, // АДАПТИВНЫЙ активный фон
    'activityBar.inactiveForeground': extendedPalette.activityBar.inactive, // #3b3e52
    'activityBar.border': activityBarBackground,

    // Значки уведомлений на иконках - используем централизованную палитру
    'activityBarBadge.background': extendedPalette.badge.activityBar, // #3d59a1
    'activityBarBadge.foreground': extendedPalette.text.white, // #ffffff

    // Панель действий в верхней позиции (Activity Bar: Top) - используем централизованную палитру
    'activityBarTop.background': activityBarBackground,
    'activityBarTop.foreground': extendedPalette.text.muted, // #787c99
    'activityBarTop.inactiveForeground': extendedPalette.activityBar.inactive, // #3b3e52
  }
}
