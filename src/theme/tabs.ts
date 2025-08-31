import { palette, core, basePalette } from '../palette'

import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getTabColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Вкладки - соответствует оригинальной Tokyo Night
  'tab.activeBackground': basePalette.tabActiveBg, // #16161e как в оригинале
  'tab.inactiveBackground': palette.bg.hover, // Фон неактивной вкладки - теперь темнее
  'tab.activeForeground': '#a9b1d6' as Hex, // #a9b1d6 как в оригинале
  'tab.hoverForeground': palette.fg.activeTitle, // Текст при наведении - максимальная контрастность
  'tab.activeBorder': '#3d59a1' as Hex, // #3d59a1 как в оригинале
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
})
