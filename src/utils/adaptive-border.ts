import { Hex } from '../types'
import { extendedPalette } from '../palette/extended'
import { generateTokensForContext } from '../palette/generator'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export type BorderType = 'button' | 'focus'
export type ThemeType =
  | 'dark'
  | 'light'
  | 'storm'
  | 'moon'
  | 'contrast'
  | 'pastel'
  | 'neon'

/**
 * Получает адаптивную границу кнопки на основе контекста темы.
 * Использует неоновые эффекты для темных тем и стандартные цвета для светлых.
 */
export function getAdaptiveButtonBorder(context?: ThemeContext): Hex {
  if (!context) {
    return extendedPalette.button.border // Возвращаем стандартную границу
  }

  // Для светлых тем используем стандартные границы
  if (context.type === 'light') {
    return '#e1e4e8' as Hex // Светлая граница для светлых тем
  }

  // Для темных тем используем неоновые границы
  const tokens = generateTokensForContext(context)
  return tokens.buttonBorder
}

/**
 * Получает адаптивную границу фокуса на основе контекста темы.
 * Использует неоновые эффекты для улучшенной видимости фокуса.
 */
export function getAdaptiveFocusBorder(context?: ThemeContext): Hex {
  if (!context) {
    return extendedPalette.border.focus // Возвращаем стандартную границу фокуса
  }

  // Для светлых тем используем яркую синюю границу фокуса
  if (context.type === 'light') {
    return '#0969da' as Hex // Яркий синий для светлых тем
  }

  // Для темных тем используем неоновую границу фокуса
  const tokens = generateTokensForContext(context)
  return tokens.focusBorder
}
