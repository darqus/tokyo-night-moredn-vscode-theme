import { palette } from '../palette'
import { tabLastPinnedBorder, tabSelectedForeground } from '../palette.core'

export const getTabColors = () => ({
  // Вкладки
  'tab.activeBackground': palette.bg.base, // Фон активной вкладки - теперь светлее
  'tab.inactiveBackground': palette.bg.hover, // Фон неактивной вкладки - теперь темнее
  'tab.activeForeground': palette.fg.primary, // Текст активной вкладки - более яркий
  'tab.hoverForeground': palette.fg.activeTitle, // Текст при наведении - максимальная контрастность
  'tab.activeBorder': palette.ui.badge.base, // Граница активной вкладки - синхронизация с бейджами
  'tab.inactiveForeground': palette.fg.muted, // Текст неактивной вкладки - более контрастный
  'tab.border': palette.line.border,
  'tab.unfocusedActiveForeground': palette.fg.primary, // Текст активной вкладки в неактивном окне
  'tab.unfocusedInactiveForeground': palette.fg.muted, // Текст неактивной вкладки в неактивном окне
  'tab.unfocusedHoverForeground': palette.fg.primary, // Текст при наведении в неактивном окне
  'tab.activeModifiedBorder': palette.ui.tab.activeModifiedBorder,
  'tab.inactiveModifiedBorder': palette.ui.tab.inactiveModifiedBorder,
  'tab.unfocusedActiveBorder': palette.ui.badge.base, // Синхронизация с бейджами
  'tab.lastPinnedBorder': tabLastPinnedBorder, // Более заметная граница
  'tab.selectedBackground': palette.bg.base, // Фон выбранной вкладки - соответствует активной
  'tab.selectedForeground': tabSelectedForeground, // Текст выбранной вкладки
})
