import { palette, core, basePalette } from '../palette'
import { getAdaptiveTerminalBackground } from '../utils/adaptive-background'
import type { ThemeContext } from '../generators/adaptive-theme-generator'

export const getTerminalColors = (context?: ThemeContext) => {
  // Получаем адаптивный фон терминала
  const terminalBackground = getAdaptiveTerminalBackground(context)

  return {
    // Терминал - АДАПТИВНЫЙ фон в зависимости от типа темы
    'terminal.background': terminalBackground,
    'terminal.foreground': palette.fg.muted, // #787c99 как в оригинале
    'terminal.selectionBackground': core.tokens.terminalSelectionBackground, // Фон выделения текста
    'terminal.inactiveSelectionBackground':
      core.tokens.terminalSelectionBackground, // Фон неактивного выделения
    'terminalCursor.background': palette.bg.base, // Фон курсора
    'terminalCursor.foreground': palette.fg.primary, // Цвет курсора
    'terminal.findMatchBackground': core.tokens.terminalFindMatchBackground, // Фон найденного совпадения
    'terminal.findMatchBorder': palette.accent.yellow, // Граница найденного совпадения
    'terminal.findMatchHighlightBackground':
      core.tokens.terminalFindMatchHighlightBackground,
    // Фон других совпадений
    'terminal.findMatchHighlightBorder':
      core.tokens.terminalFindMatchHighlightBorder, // Граница других совпадений
    'terminal.hoverHighlightBackground':
      core.tokens.terminalHoverHighlightBackground, // Фон при наведении
    'terminal.dropBackground': core.tokens.terminalDropBackground, // Фон при перетаскивании
    'terminalOverviewRuler.findMatchForeground':
      core.tokens.terminalOverviewRulerFindMatchForeground, // Индикатор совпадений в обзорной линейке
    'terminalOverviewRuler.cursorForeground': palette.fg.primary, // Индикатор курсора в обзорной линейке
    // ANSI цвета терминала
    'terminal.ansiBlack': palette.ansi.black, // Черный
    'terminal.ansiRed': palette.ansi.red, // Красный
    'terminal.ansiGreen': palette.ansi.green, // Зеленый
    'terminal.ansiYellow': palette.ansi.yellow, // Желтый
    'terminal.ansiBlue': palette.ansi.blue, // Синий
    'terminal.ansiMagenta': palette.ansi.magenta, // Пурпурный
    'terminal.ansiCyan': palette.ansi.cyan, // Голубой
    'terminal.ansiWhite': palette.ansi.white, // Белый
    // Яркие ANSI цвета терминала
    'terminal.ansiBrightBlack': palette.ansi.brightBlack, // Яркий черный
    'terminal.ansiBrightRed': palette.ansi.brightRed, // Яркий красный
    'terminal.ansiBrightGreen': palette.ansi.brightGreen, // Яркий зеленый
    'terminal.ansiBrightYellow': palette.ansi.brightYellow, // Яркий желтый
    'terminal.ansiBrightBlue': palette.ansi.brightBlue, // Яркий синий
    'terminal.ansiBrightMagenta': palette.ansi.brightMagenta, // Яркий пурпурный
    'terminal.ansiBrightCyan': palette.ansi.brightCyan, // Яркий голубой
    'terminal.ansiBrightWhite': palette.ansi.brightWhite, // Яркий белый
  }
}
