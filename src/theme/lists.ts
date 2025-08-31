import { palette } from '../palette'
import type { VSCodeColorKey } from '../validation/allowedProperties'
import type { Hex } from '../types/palette'

export const getListColors = (): Partial<Record<VSCodeColorKey, Hex>> => ({
  // Списки - точная копия оригинальной Tokyo Night
  'list.dropBackground': '#1e202e' as Hex, // точно как в оригинале
  'list.deemphasizedForeground': '#787c99' as Hex, // точно как в оригинале
  'list.activeSelectionBackground': '#202330' as Hex, // точно как в оригинале
  'list.activeSelectionForeground': '#a9b1d6' as Hex, // точно как в оригинале
  'list.inactiveSelectionBackground': '#1c1d29' as Hex, // точно как в оригинале
  'list.inactiveSelectionForeground': '#a9b1d6' as Hex, // точно как в оригинале
  'list.focusBackground': '#1c1d29' as Hex, // точно как в оригинале
  'list.focusForeground': '#a9b1d6' as Hex, // точно как в оригинале
  'list.hoverBackground': '#13131a' as Hex, // точно как в оригинале - темнее
  'list.hoverForeground': '#a9b1d6' as Hex, // точно как в оригинале
  'list.highlightForeground': '#668ac4' as Hex, // точно как в оригинале
  'list.invalidItemForeground': '#c97018' as Hex, // точно как в оригинале
  'list.errorForeground': '#bb616b' as Hex, // точно как в оригинале
  'list.warningForeground': '#c49a5a' as Hex, // точно как в оригинале

  // Дополнительные свойства, которых нет в оригинале, оставляем совместимыми
  'list.activeSelectionIconForeground': '#a9b1d6' as Hex, // совместимо с activeSelectionForeground
  'list.inactiveFocusBackground': '#1c1d29' as Hex, // как inactiveSelectionBackground

  'listFilterWidget.background': palette.line.border,
  'listFilterWidget.outline': palette.brand.primary,
  'listFilterWidget.noMatchesOutline': palette.ui.noMatches,
})
