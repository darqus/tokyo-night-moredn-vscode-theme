import { palette, core } from '../palette'
import { getAdaptiveWidgetBackground } from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export const getDebugColors = (context?: ThemeContext) => {
  const widgetBackground = getAdaptiveWidgetBackground(context)

  return {
    // Отладка
    'debugExceptionWidget.border': palette.ui.debug.exceptionBorder,
    'debugExceptionWidget.background': widgetBackground, // Осветлен для лучшей видимости
    'debugToolBar.background': palette.bg.base,
    'debugConsole.infoForeground': palette.fg.muted,
    'debugConsole.errorForeground': palette.ui.debug.consoleError,
    'debugConsole.sourceForeground': palette.fg.muted,
    'debugConsole.warningForeground': palette.ui.debug.consoleWarning,
    'debugConsoleInputIcon.foreground': palette.accent.teal,
    'editor.stackFrameHighlightBackground':
      core.tokens.editorStackFrameHighlightBackground,
    'editor.focusedStackFrameHighlightBackground':
      core.tokens.editorFocusedStackFrameHighlightBackground,
    'debugView.stateLabelForeground': palette.fg.muted,
    'debugView.stateLabelBackground': palette.ui.debug.stateLabelBg,
    'debugView.valueChangedHighlight':
      core.tokens.debugViewValueChangedHighlight,
    'debugTokenExpression.name': palette.accent.cyan,
    'debugTokenExpression.value': palette.ui.debug.tokenValue,
    'debugTokenExpression.string': palette.ui.debug.tokenString,
    'debugTokenExpression.boolean': palette.accent.orange,
    'debugTokenExpression.number': palette.accent.orange,
    'debugTokenExpression.error': palette.ui.debug.tokenError,
  }
}
