import { palette, core, basePalette, extendedPalette } from '../palette'
import { getAdaptiveTabBarBackground } from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getTabColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Получаем адаптивный фон панели вкладок
  const tabBarBackground = getAdaptiveTabBarBackground(context)

  return {
    // Вкладки - АДАПТИВНЫЙ фон в зависимости от типа темы
    'tab.activeBackground': tabBarBackground,
    'tab.inactiveBackground': palette.bg.hover, // Фон неактивной вкладки - теперь темнее
    'tab.activeForeground': extendedPalette.text.primary, // #a9b1d6
    'tab.hoverForeground': palette.fg.activeTitle, // Текст при наведении - максимальная контрастность
    'tab.activeBorder': extendedPalette.tabs.activeBorder, // #3d59a1
    'tab.inactiveForeground': palette.fg.muted, // Текст неактивной вкладки - более контрастный
    'tab.border': palette.line.border,
    'tab.unfocusedActiveForeground': palette.fg.primary, // Текст активной вкладки в неактивном окне
    'tab.unfocusedInactiveForeground': palette.fg.muted, // Текст неактивной вкладки в неактивном окне
    'tab.unfocusedHoverForeground': palette.fg.primary, // Текст при наведении в неактивном окне
    'tab.activeModifiedBorder': palette.ui.tab.activeModifiedBorder,
    'tab.inactiveModifiedBorder': palette.ui.tab.inactiveModifiedBorder,
    'tab.unfocusedActiveBorder': palette.ui.badge.base, // Синхронизация с бейджами
    'tab.lastPinnedBorder': core.tokens.tabLastPinnedBorder, // Более заметная граница
    'tab.selectedBackground': palette.bg.base, // Фон выбранной вкладки - соответствует активной
    'tab.selectedForeground': core.tokens.tabSelectedForeground, // Текст выбранной вкладки
  }
}
