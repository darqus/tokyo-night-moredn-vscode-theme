import { palette, extendedPalette } from '../palette'
import { getAdaptiveMenuBackground } from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getMenuColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Получаем адаптивный фон меню
  const menuBackground = getAdaptiveMenuBackground(context)

  return {
    // Панель меню (menubar) - АДАПТИВНЫЙ фон в зависимости от типа темы
    'menubar.selectionForeground': extendedPalette.text.primary, // #a9b1d6
    'menubar.selectionBackground': extendedPalette.selection.menuSelection, // #1e202e
    'menubar.selectionBorder': extendedPalette.selection.menuBorder, // #1b1e2e

    // Выпадающие меню - АДАПТИВНЫЙ фон в зависимости от типа темы
    'menu.foreground': extendedPalette.text.muted, // #787c99
    'menu.background': menuBackground,
    'menu.selectionForeground': extendedPalette.text.primary, // #a9b1d6
    'menu.selectionBackground': extendedPalette.selection.menuSelection, // #1e202e
    'menu.separatorBackground': extendedPalette.bg.border, // #101014
    'menu.border': extendedPalette.bg.border, // #101014
  }
}
