import { palette, basePalette, extendedPalette } from '../palette'
import { getAdaptiveSideBarBackground } from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getSideBarColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Получаем адаптивный фон боковой панели
  const sideBarBackground = getAdaptiveSideBarBackground(context)

  return {
    // Боковая панель - АДАПТИВНЫЙ фон в зависимости от типа темы
    'tree.indentGuidesStroke': extendedPalette.bg.tree, // #2b2b3b
    'sideBar.foreground': extendedPalette.text.muted, // #787c99
    'sideBar.background': sideBarBackground,
    'sideBar.border': extendedPalette.bg.border, // #101014
    'sideBarTitle.foreground': extendedPalette.text.muted, // #787c99
    'sideBarSectionHeader.background': sideBarBackground,
    'sideBarSectionHeader.foreground': extendedPalette.text.primary, // #a9b1d6
    'sideBarSectionHeader.border': extendedPalette.bg.border, // #101014
    'sideBar.dropBackground': extendedPalette.selection.listDrop, // #1e202e
  }
}
