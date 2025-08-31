import { palette, extendedPalette } from '../palette'
import {
  getAdaptiveWidgetBackground,
  getAdaptiveListActiveBackground,
  getAdaptiveListInactiveBackground,
  getAdaptiveListHoverBackground,
} from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getListColors = (
  context?: ThemeContext
): Partial<Record<VSCodeColorKey, Hex>> => {
  const widgetBackground = getAdaptiveWidgetBackground(context)
  const listActiveBackground = getAdaptiveListActiveBackground(context)
  const listInactiveBackground = getAdaptiveListInactiveBackground(context)
  const listHoverBackground = getAdaptiveListHoverBackground(context)

  return {
    // Списки - используем АДАПТИВНЫЕ цвета выделений
    'list.dropBackground': extendedPalette.selection.listDrop, // #1e202e
    'list.deemphasizedForeground': extendedPalette.text.muted, // #787c99
    'list.activeSelectionBackground': listActiveBackground, // АДАПТИВНЫЙ активный фон
    'list.activeSelectionForeground': extendedPalette.text.primary, // #a9b1d6
    'list.inactiveSelectionBackground': listInactiveBackground, // АДАПТИВНЫЙ неактивный фон
    'list.inactiveSelectionForeground': extendedPalette.text.primary, // #a9b1d6
    'list.focusBackground': listInactiveBackground, // АДАПТИВНЫЙ фокус как неактивный
    'list.focusForeground': extendedPalette.text.primary, // #a9b1d6
    'list.hoverBackground': listHoverBackground, // АДАПТИВНЫЙ фон при наведении
    'list.hoverForeground': extendedPalette.text.primary, // #a9b1d6
    'list.highlightForeground': extendedPalette.list.highlight, // #668ac4
    'list.invalidItemForeground': extendedPalette.list.invalid, // #c97018
    'list.errorForeground': extendedPalette.list.error, // #bb616b
    'list.warningForeground': extendedPalette.list.warning, // #c49a5a

    // Дополнительные свойства, которых нет в оригинале, оставляем совместимыми
    'list.activeSelectionIconForeground': extendedPalette.text.primary, // #a9b1d6
    'list.inactiveFocusBackground': extendedPalette.selection.listInactive, // #1c1d29

    'listFilterWidget.background': widgetBackground, // АДАПТИВНЫЙ фон виджета поиска в списках
    'listFilterWidget.outline': palette.brand.primary,
    'listFilterWidget.noMatchesOutline': palette.ui.noMatches,
  }
}
