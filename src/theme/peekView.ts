import { palette } from '../palette'
import {
  peekViewEditorMatchHighlightBackground,
  peekViewResultSelectionBackground,
  peekViewResultMatchHighlightBackground,
} from '../palette'

export const getPeekViewColors = () => ({
  // Окно быстрого просмотра (Peek view)
  'peekView.border': palette.line.border,
  'peekViewEditor.background': palette.bg.base,
  'peekViewEditor.matchHighlightBackground':
    peekViewEditorMatchHighlightBackground,
  'peekViewTitle.background': palette.line.border,
  'peekViewTitleLabel.foreground': palette.fg.primary,
  'peekViewTitleDescription.foreground': palette.fg.muted,
  'peekViewResult.background': palette.bg.base,
  'peekViewResult.selectionForeground': palette.fg.primary,
  'peekViewResult.selectionBackground': peekViewResultSelectionBackground,
  'peekViewResult.lineForeground': palette.fg.primary,
  'peekViewResult.fileForeground': palette.fg.muted,
  'peekViewResult.matchHighlightBackground':
    peekViewResultMatchHighlightBackground,
})
