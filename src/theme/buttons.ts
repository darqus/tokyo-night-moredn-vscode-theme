import { basePalette, extendedPalette } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'
import {
  getAdaptiveButtonBackground,
  getAdaptiveWidgetBackground,
} from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export const getButtonColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Адаптивные фоны для кнопочных элементов
  const buttonBackground = getAdaptiveButtonBackground(context)
  const widgetBackground = getAdaptiveWidgetBackground(context)

  return {
    // Кнопки - АДАПТИВНЫЕ фоны в зависимости от типа темы
    'button.background': buttonBackground, // АДАПТИВНЫЙ фон основной кнопки
    'button.hoverBackground': extendedPalette.button.primaryHover, // #2d3b5a
    'button.foreground': extendedPalette.button.foreground, // #ffffff
    'button.border': extendedPalette.button.border, // #7aa2f780
    'button.separator': extendedPalette.button.separator, // #7aa2f766
    'button.secondaryBackground': widgetBackground, // АДАПТИВНЫЙ фон вторичной кнопки
    'button.secondaryHoverBackground': extendedPalette.button.secondaryHover, // #2d3b5a
    'button.secondaryForeground': extendedPalette.button.foreground, // #ffffff
    'progressBar.background': extendedPalette.special.progressBar, // #7dcfff
  }
}
