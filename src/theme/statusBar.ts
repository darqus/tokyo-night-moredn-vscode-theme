import { palette, core, basePalette } from '../palette'
import {
  getAdaptiveStatusBarBackground,
  getAdaptiveButtonBackground,
  getAdaptiveWidgetBackground,
} from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'
import type { Hex } from '../types/palette'

export const getStatusBarColors = (context?: ThemeContext) => {
  // Получаем адаптивный фон строки состояния
  const statusBarBackground = getAdaptiveStatusBarBackground(context)

  return {
    // Строка состояния - АДАПТИВНЫЙ фон в зависимости от типа темы
    'statusBar.foreground': palette.fg.muted, // #787c99 как в оригинале
    'statusBar.background': statusBarBackground,
    'statusBar.border': basePalette.statusBarBorder, // #101014 как в оригинале
    // Состояния без папки/отладки/фокус
    'statusBar.noFolderBackground': statusBarBackground,
    'statusBar.noFolderForeground': palette.fg.muted,
    'statusBar.debuggingBackground': statusBarBackground,
    'statusBar.debuggingForeground': palette.fg.muted, // #787c99 как в оригинале
    'statusBar.debuggingBorder': palette.line.border,
    'statusBar.noFolderBorder': palette.line.border,
    'statusBar.focusBorder': palette.ui.sash.hover,
    'statusBarItem.activeBackground': palette.bg.active,
    'statusBarItem.hoverForeground': palette.fg.primary,
    'statusBarItem.hoverBackground': core.tokens.statusBarItemHoverBackground,
    'statusBarItem.prominentBackground': palette.bg.overlay,
    'statusBarItem.prominentForeground': palette.fg.primary,
    'statusBarItem.prominentHoverBackground':
      core.tokens.statusBarItemProminentHoverBackground,
    'statusBarItem.prominentHoverForeground': palette.fg.onSelection,
    // Remote индикатор - АДАПТИВНЫЕ фоны в зависимости от типа темы
    'statusBarItem.remoteBackground': getAdaptiveButtonBackground(context),
    'statusBarItem.remoteForeground': palette.fg.selectionText, // Белый текст для максимальной контрастности
    'statusBarItem.remoteHoverBackground': getAdaptiveWidgetBackground(context), // Более светлый при наведении
    'statusBarItem.remoteHoverForeground': palette.fg.selectionText, // Белый текст для максимальной контрастности
    // Ошибки/предупреждения
    'statusBarItem.errorBackground': palette.accent.red,
    'statusBarItem.errorForeground': palette.ui.semantic.white,
    'statusBarItem.errorHoverBackground':
      core.tokens.statusBarItemErrorHoverBackground,
    'statusBarItem.errorHoverForeground': palette.ui.semantic.white,
    'statusBarItem.warningBackground': palette.accent.yellow,
    'statusBarItem.warningForeground': palette.bg.base,
    'statusBarItem.warningHoverBackground':
      core.tokens.statusBarItemWarningHoverBackground,
    'statusBarItem.warningHoverForeground': palette.bg.base,
    // Прочее
    'statusBarItem.compactHoverBackground':
      core.tokens.statusBarItemCompactHoverBackground,
    'statusBarItem.focusBorder': palette.ui.sash.hover,
    'statusBarItem.offlineBackground': palette.ui.semantic.offline,
    'statusBarItem.offlineForeground': palette.ui.semantic.white,
    'statusBarItem.offlineHoverBackground':
      core.tokens.statusBarItemOfflineHoverBackground,
    'statusBarItem.offlineHoverForeground': palette.ui.semantic.white,
  }
}
