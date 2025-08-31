import { palette, core, basePalette, extendedPalette } from '../palette'
import {
  getAdaptiveTabBarBackground,
  getAdaptiveWidgetBackground,
  getAdaptiveTabActiveText,
  getAdaptiveTabInactiveText,
  getAdaptiveTabHoverText,
} from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getTabColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  // Получаем адаптивные фоны и тексты для вкладок
  const tabBarBackground = getAdaptiveTabBarBackground(context)
  const widgetBackground = getAdaptiveWidgetBackground(context)
  const activeText = getAdaptiveTabActiveText(context)
  const inactiveText = getAdaptiveTabInactiveText(context)
  const hoverText = getAdaptiveTabHoverText(context)

  return {
    // Вкладки - АДАПТИВНЫЕ фоны и тексты в зависимости от типа темы
    'tab.activeBackground': tabBarBackground, // АДАПТИВНЫЙ фон активной вкладки
    'tab.inactiveBackground': widgetBackground, // АДАПТИВНЫЙ фон неактивной вкладки
    'tab.activeForeground': activeText, // АДАПТИВНЫЙ текст активной вкладки
    'tab.hoverForeground': hoverText, // АДАПТИВНЫЙ текст при наведении
    'tab.activeBorder': extendedPalette.tabs.activeBorder, // #3d59a1
    'tab.inactiveForeground': inactiveText, // АДАПТИВНЫЙ текст неактивной вкладки
    'tab.border': palette.line.border,
    'tab.unfocusedActiveForeground': activeText, // АДАПТИВНЫЙ текст активной вкладки в неактивном окне
    'tab.unfocusedInactiveForeground': inactiveText, // АДАПТИВНЫЙ текст неактивной вкладки в неактивном окне
    'tab.unfocusedHoverForeground': hoverText, // АДАПТИВНЫЙ текст при наведении в неактивном окне
    'tab.activeModifiedBorder': palette.ui.tab.activeModifiedBorder,
    'tab.inactiveModifiedBorder': palette.ui.tab.inactiveModifiedBorder,
    'tab.unfocusedActiveBorder': palette.ui.badge.base, // Синхронизация с бейджами
    'tab.lastPinnedBorder': core.tokens.tabLastPinnedBorder, // Более заметная граница
    'tab.selectedBackground': tabBarBackground, // АДАПТИВНЫЙ фон выбранной вкладки
    'tab.selectedForeground': core.tokens.tabSelectedForeground, // Текст выбранной вкладки
  }
}
