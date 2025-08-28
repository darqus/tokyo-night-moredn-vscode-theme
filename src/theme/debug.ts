import { palette } from '../palette'
import {
  editorStackFrameHighlightBackground,
  editorFocusedStackFrameHighlightBackground,
  debugViewValueChangedHighlight,
} from '../palette'

export const getDebugColors = () => ({
  // Отладка
  'debugExceptionWidget.border': palette.ui.debug.exceptionBorder,
  'debugExceptionWidget.background': palette.bg.elevated, // Осветлен для лучшей видимости
  'debugToolBar.background': palette.bg.base,
  'debugConsole.infoForeground': palette.fg.muted,
  'debugConsole.errorForeground': palette.ui.debug.consoleError,
  'debugConsole.sourceForeground': palette.fg.muted,
  'debugConsole.warningForeground': palette.ui.debug.consoleWarning,
  'debugConsoleInputIcon.foreground': palette.accent.teal,
  'editor.stackFrameHighlightBackground': editorStackFrameHighlightBackground,
  'editor.focusedStackFrameHighlightBackground':
    editorFocusedStackFrameHighlightBackground,
  'debugView.stateLabelForeground': palette.fg.muted,
  'debugView.stateLabelBackground': palette.ui.debug.stateLabelBg,
  'debugView.valueChangedHighlight': debugViewValueChangedHighlight,
  'debugTokenExpression.name': palette.accent.cyan,
  'debugTokenExpression.value': palette.ui.debug.tokenValue,
  'debugTokenExpression.string': palette.ui.debug.tokenString,
  'debugTokenExpression.boolean': palette.accent.orange,
  'debugTokenExpression.number': palette.accent.orange,
  'debugTokenExpression.error': palette.ui.debug.tokenError,
})
