import { basePalette, extendedPalette } from '../palette'
import { generateTokensForContext } from '../palette/generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'
import {
  getAdaptiveButtonBackground,
  getAdaptiveWidgetBackground,
} from '../utils/adaptive-background'
import { getAdaptiveButtonBorder } from '../utils/adaptive-border'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export const getButtonColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Генерируем токены с учетом варианта темы
  const tokens = generateTokensForContext(context)

  // Адаптивные фоны и границы для кнопочных элементов
  const buttonBackground = getAdaptiveButtonBackground(context)
  const widgetBackground = getAdaptiveWidgetBackground(context)
  const buttonBorder = getAdaptiveButtonBorder(context)

  // Адаптивный текст для кнопок
  const buttonForeground =
    context?.type === 'light'
      ? ('#24292f' as Hex) // Тёмный текст для светлых кнопок
      : extendedPalette.button.foreground

  // Определяем, нужно ли использовать неоновый стиль
  const useNeonStyle = context?.type !== 'light' // Неоновый стиль только для темных тем

  return {
    // Кнопки - НЕОНОВЫЙ стиль для темных тем, обычный для светлых
    'button.background': useNeonStyle
      ? tokens.buttonBackground
      : buttonBackground,
    'button.hoverBackground': useNeonStyle
      ? tokens.buttonHover
      : extendedPalette.button.primaryHover,
    'button.foreground': buttonForeground,
    'button.border': useNeonStyle ? tokens.buttonBorder : buttonBorder,
    'button.separator': useNeonStyle
      ? tokens.buttonSeparator
      : extendedPalette.button.separator,

    // Вторичные кнопки с неоновыми эффектами
    'button.secondaryBackground': useNeonStyle
      ? tokens.buttonSecondaryBackground
      : widgetBackground,
    'button.secondaryHoverBackground': useNeonStyle
      ? tokens.buttonSecondaryHover
      : extendedPalette.button.secondaryHover,
    'button.secondaryForeground': buttonForeground,

    // Прогресс-бар с неоновым акцентом
    'progressBar.background': useNeonStyle
      ? basePalette.cyan
      : extendedPalette.special.progressBar,
  }
}
