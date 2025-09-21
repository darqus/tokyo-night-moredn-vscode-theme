/**
 * Палитра интерфейса VS Code
 * Генерация всех цветов интерфейса из базовой палитры
 */
import { basePalette } from './palette'
import { mix, withAlpha, lighten, darken } from './utils'
import { oklchLighten } from './oklch'
import type { InterfacePalette } from '../types/theme'

export const interfacePalette: InterfacePalette = {
  // Фоновые цвета
  bg: {
    base: basePalette.black,
    darkenBase: darken(basePalette.black, 0.075),
    elevated: mix(basePalette.black, basePalette.blue, 0.05),
    overlay: mix(basePalette.black, basePalette.blue, 0.09),
    input: mix(basePalette.black, basePalette.blue, 0.04),
    // OKLCH этап 1: используем оbёртку, не меняя цвет (amount = 0)
    hover: withAlpha(oklchLighten(basePalette.blue, 0), 0.08),
    active: withAlpha(oklchLighten(basePalette.blue, 0), 0.12),
    selection: withAlpha(oklchLighten(basePalette.blue, 0), 0.2),
    // Специализированные hover цвета
    hoverSubtle: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.08),
    hoverMuted: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.12),
    hoverActive: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.15),
    // Специализированные цвета для поиска и выделения — вынесены в derived.findMatch
  },

  // Текстовые цвета
  text: {
    primary: basePalette.white,
    inverse: basePalette.black,
    muted: mix(basePalette.white, basePalette.gray, 0.35),
    subtle: mix(basePalette.white, basePalette.gray, 0.55),
    inactive: mix(basePalette.white, basePalette.gray, 0.75),
    // Дополнительные приглушенные цвета для номеров строк
    lineNumber: mix(basePalette.black, basePalette.gray, 0.6),
    lineNumberActive: mix(basePalette.yellow, basePalette.gray, 0.7),
  },
  // Текст на разных поверхностях (пока проксирует базовые роли, чтобы не менять визуал)
  textOn: {
    base: {
      primary: basePalette.white,
      muted: mix(basePalette.white, basePalette.gray, 0.35),
      subtle: mix(basePalette.white, basePalette.gray, 0.55),
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
    elevated: {
      primary: basePalette.white,
      muted: mix(basePalette.white, basePalette.gray, 0.35),
      subtle: mix(basePalette.white, basePalette.gray, 0.55),
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
    overlay: {
      primary: basePalette.white,
      muted: mix(basePalette.white, basePalette.gray, 0.35),
      subtle: mix(basePalette.white, basePalette.gray, 0.55),
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
  },

  // Границы
  border: {
    default: mix(basePalette.black, basePalette.gray, 0.1),
    focus: withAlpha(basePalette.blue, 0.4),
    separatorBackground: mix(basePalette.black, basePalette.gray, 0.3),
  },

  // Кнопки
  // primary — насыщенный фон с хорошим контрастом
  // secondary — нейтральный фон (elevated), холодный hover, аккуратная граница
  button: {
    primary: {
      background: darken(basePalette.blue, 0.7),
      foreground: basePalette.white,
      hoverBackground: darken(basePalette.blue, 0.6),
      border: withAlpha(basePalette.blue, 0.6), // усиленная контрастность
      // separator выравнен с border.default (нейтральный)
      separator: mix(basePalette.black, basePalette.gray, 0.1),
    },
    secondary: {
      // Нейтральный фон — совпадает с elevated для спокойного UI
      background: mix(basePalette.black, basePalette.blue, 0.05),
      foreground: basePalette.white,
      // Делает наведение ощутимым, но остаётся холодным и ненавязчивым
      hoverBackground: withAlpha(basePalette.blue, 0.12),
      // Нейтральная граница — совпадает с border.default
      border: mix(basePalette.black, basePalette.gray, 0.1),
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
    // Balanced: slightly reduce prominence in minimap to lower noise
    findMatchHighlight: withAlpha(basePalette.yellow, 0.4),
  },
  // Элементы управления
  dropdown: {
    background: mix(basePalette.black, basePalette.blue, 0.06), // соответствует bg.elevated (#202333)
    foreground: basePalette.white,
    border: mix(basePalette.black, basePalette.gray, 0.1), // соответствует border.default (#202230)
    listBackground: mix(basePalette.black, basePalette.blue, 0.06), // соответствует bg.elevated (#202333)
  },
  // SCM Graph
  scmGraph: {
    label: {
      hoverForeground: basePalette.black,
      hoverBackground: basePalette.blue,
    },
    foreground1: basePalette.blue,
    foreground2: basePalette.magenta,
    foreground3: basePalette.teal,
    foreground4: basePalette.cyan,
    foreground5: basePalette.purple,
    historyItemHoverAdditionsForeground: basePalette.green,
    historyItemHoverDeletionsForeground: basePalette.red,
    historyItemRefColor: basePalette.blue,
    historyItemRemoteRefColor: basePalette.magenta,
    historyItemBaseRefColor: basePalette.teal,
  },
  derived: {
    link: {
      foreground: lighten(basePalette.cyan, 0.22),
    },
    blockquote: {
      background: mix(basePalette.black, basePalette.blue, 0.12),
      border: withAlpha(basePalette.cyan, 0.35),
    },
    terminal: {
      // Base ANSI (non-bright)
      ansiBlack: basePalette.black,
      ansiRed: basePalette.red,
      ansiGreen: basePalette.green,
      ansiYellow: basePalette.yellow,
      ansiMagenta: basePalette.magenta,
      ansiWhite: basePalette.white,
      // Cooler hover with cyan->blue mix for terminal command/hover highlight
      hoverHighlightBackground: withAlpha(
        mix(basePalette.cyan, basePalette.blue, 0.35),
        0.24
      ),
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
      // OKLCH этап 1: через OKLCH-утилиту с нулевым изменением (визуально без изменений)
      background: withAlpha(oklchLighten(basePalette.yellow, 0), 0.22),
      border: withAlpha(oklchLighten(basePalette.yellow, 0), 0.6),
      highlightBackground: withAlpha(oklchLighten(basePalette.yellow, 0), 0.16),
    },
    inlineChat: {
      background: darken(basePalette.blue, 0.8),
      foreground: lighten(basePalette.white, 0.12),
    },
  },

  // Charts palette used by charts.* tokens
  charts: {
    foreground: basePalette.white,
    lines: mix(basePalette.black, basePalette.gray, 0.1),
    red: basePalette.red,
    blue: basePalette.blue,
    yellow: basePalette.yellow,
    orange: basePalette.orange,
    green: basePalette.green,
    purple: basePalette.purple,
  },
}
