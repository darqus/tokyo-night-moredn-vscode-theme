/**
 * Палитра интерфейса VS Code
 * Автогенерация всех цветов интерфейса из базовой палитры
 */
import { basePalette } from './palette'
import { mix, withAlpha, lighten, darken } from './utils'
import type { InterfacePalette } from '../types/theme'

export const interfacePalette: InterfacePalette = {
  // Фоновые цвета (автогенерация)
  bg: {
    base: basePalette.black,
    elevated: mix(basePalette.black, basePalette.blue, 0.06),
    overlay: mix(basePalette.black, basePalette.blue, 0.1),
    input: mix(basePalette.black, basePalette.blue, 0.04),
    hover: withAlpha(basePalette.blue, 0.08),
    active: withAlpha(basePalette.blue, 0.12),
    selection: withAlpha(basePalette.blue, 0.2),
    // Специализированные hover цвета
    hoverSubtle: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.08),
    hoverMuted: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.12),
    hoverActive: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.15),
    // Специализированные цвета для поиска и выделения
    findMatch: withAlpha(basePalette.blue, 0.05),
    findMatchBorder: withAlpha(basePalette.red, 0.5),
  },

  // Текстовые цвета (автогенерация)
  text: {
    primary: basePalette.white,
    inverse: basePalette.black,
    muted: mix(basePalette.white, basePalette.gray, 0.4),
    subtle: mix(basePalette.white, basePalette.gray, 0.6),
    inactive: mix(basePalette.white, basePalette.gray, 0.8),
    // Дополнительные приглушенные цвета для номеров строк
    lineNumber: mix(basePalette.black, basePalette.gray, 0.6),
    lineNumberActive: mix(basePalette.yellow, basePalette.gray, 0.8),
  },

  // Границы (автогенерация)
  border: {
    default: mix(basePalette.black, basePalette.gray, 0.1),
    focus: withAlpha(basePalette.blue, 0.4),
  },

  // Кнопки (автогенерация)
  // primary — насыщенный фон с хорошим контрастом
  // secondary — нейтральный фон (elevated), холодный hover, аккуратная граница
  button: {
    primary: {
      background: mix(basePalette.black, basePalette.blue, 0.6),
      foreground: basePalette.white,
      hoverBackground: mix(basePalette.black, basePalette.blue, 0.65),
      border: withAlpha(basePalette.blue, 0.4), // соответствует border.focus
      separator: mix(basePalette.black, basePalette.gray, 0.1), // соответствует border.default
    },
    secondary: {
      background: mix(basePalette.black, basePalette.blue, 0.1),
      foreground: basePalette.white,
      hoverBackground: withAlpha(basePalette.blue, 0.08),
      border: withAlpha(basePalette.blue, 0.4),
    },
  },

  // Состояния (семантические цвета)
  state: {
    info: basePalette.cyan,
    success: basePalette.green,
    warning: basePalette.yellow,
    error: basePalette.red,
    // Hover варианты для состояний
    infoHover: withAlpha(basePalette.cyan, 0.8),
    successHover: withAlpha(basePalette.green, 0.8),
    warningHover: withAlpha(basePalette.yellow, 0.8),
    errorHover: withAlpha(basePalette.red, 0.8),
  },
  git: {
    renamedResourceForeground: withAlpha(basePalette.cyan, 0.8),
    stageModifiedResourceForeground: withAlpha(basePalette.cyan, 0.9),
    stageDeletedResourceForeground: withAlpha(basePalette.red, 0.9),
  },
  diff: {
    insertedTextBackground: withAlpha(basePalette.green, 0.15),
    removedTextBackground: withAlpha(basePalette.red, 0.15),
    insertedLineBackground: withAlpha(basePalette.green, 0.1),
    removedLineBackground: withAlpha(basePalette.red, 0.1),
  },
  minimap: {
    findMatchHighlight: withAlpha(basePalette.yellow, 0.5),
  },
  // Элементы управления
  dropdown: {
    background: mix(basePalette.black, basePalette.blue, 0.06), // соответствует bg.elevated (#202333)
    foreground: basePalette.white,
    border: mix(basePalette.black, basePalette.gray, 0.1), // соответствует border.default (#202230)
    listBackground: mix(basePalette.black, basePalette.blue, 0.06), // соответствует bg.elevated (#202333)
  },
  derived: {
    link: {
      foreground: lighten(basePalette.cyan, 0.22),
    },
    terminal: {
      hoverHighlightBackground: withAlpha(basePalette.cyan, 0.22),
      ansiBlue: lighten(basePalette.cyan, 0.22),
      ansiCyan: lighten(basePalette.cyan, 0.22),
      ansiBrightBlack: lighten(basePalette.black, 0.4),
      ansiBrightRed: lighten(basePalette.red, 0.15),
      ansiBrightGreen: lighten(basePalette.green, 0.15),
      ansiBrightYellow: lighten(basePalette.yellow, 0.15),
      ansiBrightBlue: lighten(basePalette.cyan, 0.22),
      ansiBrightMagenta: lighten(basePalette.magenta, 0.15),
      ansiBrightCyan: lighten(basePalette.cyan, 0.22),
      ansiBrightWhite: lighten(basePalette.white, 0.1),
    },
    overlays: {
      dropBackground: withAlpha(
        mix(basePalette.black, basePalette.blue, 0.1),
        0.2
      ),
    },
    findMatch: {
      background: withAlpha(basePalette.yellow, 0.22),
      border: withAlpha(basePalette.yellow, 0.7),
      highlightBackground: withAlpha(basePalette.yellow, 0.14),
    },
    inlineChat: {
      background: darken(basePalette.blue, 0.8),
      foreground: lighten(basePalette.white, 0.12),
    },
  },
}
