/**
 * Палитра интерфейса VS Code
 * Генерация всех цветов интерфейса из базовой палитры
 */
import { basePalette } from './palette'
import {
  mixSrgb as mix,
  withAlpha,
  lightenSrgb as lighten,
  darkenSrgb as darken,
  mixPerceptual,
  lightenPerceptual,
} from './colorEngine'
import type { InterfacePalette } from '../types/theme'

export const interfacePalette: InterfacePalette = {
  // Фоновые цвета
  bg: {
    base: basePalette.black,
    darkenBase: darken(basePalette.black, 0.075),
    elevated: mix(basePalette.black, basePalette.blue, 0.05),
    overlay: mix(basePalette.black, basePalette.blue, 0.09),
    input: mix(basePalette.black, basePalette.blue, 0.04),
    // OKLCH: лёгкая коррекция L для лучшей перцептуальной читаемости
    // amount 0.2 ~ +0.02 L, 0.3 ~ +0.03 L, 0.4 ~ +0.04 L
    hover: withAlpha(lightenPerceptual(basePalette.blue, 0.2), 0.08),
    active: withAlpha(lightenPerceptual(basePalette.blue, 0.3), 0.12),
    selection: withAlpha(lightenPerceptual(basePalette.blue, 0.4), 0.2),
    // Специализированные hover цвета
    // Сохраняем стабильный sRGB-mix для вспомогательных hover-градаций
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
      muted: lightenPerceptual(
        mix(basePalette.white, basePalette.gray, 0.35),
        0.15
      ),
      subtle: mix(basePalette.white, basePalette.gray, 0.55),
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
  },

  // Границы
  border: {
    default: mix(basePalette.black, basePalette.gray, 0.1),
    focus: withAlpha(basePalette.blue, 0.4),
    // Лёгкий OKLCH-тон для separator: чуть холоднее нейтрального серого
    separatorBackground: mixPerceptual(
      mix(basePalette.black, basePalette.gray, 0.3),
      basePalette.blue,
      0.05
    ),
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
      // Слегка уменьшаем хрому (C) и слегка повышаем L за счёт смешения с белым
      background: withAlpha(
        mixPerceptual(basePalette.yellow, basePalette.white, 0.08),
        0.22
      ),
      border: withAlpha(basePalette.yellow, 0.6),
      highlightBackground: withAlpha(
        mixPerceptual(basePalette.yellow, basePalette.white, 0.12),
        0.16
      ),
    },
    inlineChat: {
      background: darken(basePalette.blue, 0.8),
      foreground: lighten(basePalette.white, 0.12),
    },
    // Shadows: лёгкий OKLCH-сдвиг к более холодному оттенку для четкости
    shadows: {
      // widget: слегка более «холодная» тень + небольшая прозрачность
      widget: withAlpha(
        mixPerceptual(
          mix(basePalette.black, basePalette.blue, 0.09),
          basePalette.blue,
          0.06
        ),
        0.9
      ),
      // scrollbar: на чуть-чуть мягче (меньше синего)
      scrollbar: mixPerceptual(
        mix(basePalette.black, basePalette.blue, 0.09),
        basePalette.blue,
        0.04
      ),
    },
    // Peek View: использовать те же холодные OKLCH‑тоны, что и selection,
    // но с очень малым ΔL/ΔC для match highlight, чтобы он чуть отличался от selection
    // и оставался прозрачным (не перекрывал контент).
    peekView: {
      // немного ниже альфа и капля меньше осветления, чем у selection
      // selection: oklchLighten(blue, 0.4) @ α=0.20
      matchHighlightBackground: withAlpha(
        lightenPerceptual(basePalette.blue, 0.38),
        0.18
      ),
      // для selection внутри peek используем ровно общий selection‑тон,
      // чтобы визуально соответствовать остальным спискам/виджетам
      selectionBackground: withAlpha(
        lightenPerceptual(basePalette.blue, 0.4),
        0.2
      ),
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
