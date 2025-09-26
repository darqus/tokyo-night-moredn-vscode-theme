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
  // Background colors
  bg: {
    base: basePalette.bgPrimary,
    darkenBase: basePalette.bgSecondary,
    elevated: basePalette.bgTertiary,
    overlay: basePalette.bgOverlay,
    input: basePalette.bgTertiary,
    // OKLCH: легкая коррекция L для лучшей перцептуальной читаемости
    // amount 0.2 ~ +0.02 L, 0.3 ~ +0.03 L, 0.4 ~ +0.04 L
    // Make hover/active/selection a bit brighter and slightly more opaque
    hover: withAlpha(lightenPerceptual(basePalette.gray, 0.25), 0.12),
    active: withAlpha(lightenPerceptual(basePalette.blue, 0.35), 0.16),
    selection: withAlpha(lightenPerceptual(basePalette.blue, 0.45), 0.26),
    // Специализированные hover цвета
    // Сохраняем стабильный sRGB-mix для вспомогательных hover-градаций
    hoverSubtle: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.1),
    hoverMuted: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.15),
    hoverActive: withAlpha(mix(basePalette.white, basePalette.gray, 0.4), 0.18),
    // Специализированные цвета для поиска и выделения — вынесены в derived.findMatch
  },

  // Text colors
  text: {
    primary: basePalette.textDefault,
    inverse: basePalette.textInverse,
    muted: basePalette.textSecondary,
    subtle: basePalette.textMuted,
    inactive: mix(basePalette.white, basePalette.gray, 0.75),
    // Дополнительные приглушенные цвета для номеров строк
    // Чуть темнее и нейтральнее для обычных номеров
    lineNumber: mix(basePalette.bgPrimary, basePalette.gray, 0.35),
    // Активный номер — приглушенный холодный (серый с легким cyan)
    lineNumberActive: mix(basePalette.cyan, basePalette.gray, 0.8),
  },
  // Текст на разных поверхностях (пока проксирует базовые роли, чтобы не менять визуал)
  textOn: {
    base: {
      primary: basePalette.textDefault,
      muted: basePalette.textSecondary,
      subtle: basePalette.textMuted,
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
    elevated: {
      primary: basePalette.textDefault,
      muted: basePalette.textSecondary,
      subtle: basePalette.textMuted,
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
    overlay: {
      primary: basePalette.textDefault,
      muted: lightenPerceptual(basePalette.textSecondary, 0.15),
      subtle: basePalette.textMuted,
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
  },

  // Borders
  border: {
    default: basePalette.borderDefault,
    focus: withAlpha(basePalette.blue, 0.4),
    // Легкий OKLCH-тон для separator: чуть холоднее нейтрального серого
    separatorBackground: mixPerceptual(
      mix(basePalette.bgPrimary, basePalette.gray, 0.3),
      basePalette.blue,
      0.05
    ),
  },

  // Buttons
  // primary — насыщенный фон с хорошим контрастом
  // secondary — нейтральный фон (elevated), холодный hover, аккуратная граница
  button: {
    primary: {
      background: basePalette.buttonPrimary,
      foreground: basePalette.white,
      // чуть светлее при hover для выразительности
      hoverBackground: lightenPerceptual(basePalette.buttonPrimary, 0.15),
      // активная/hover рамка — сплошной link без прозрачности
      border: basePalette.linkDefault,
      // separator выравнен с border.default (нейтральный)
      separator: basePalette.borderDefault,
    },
    secondary: {
      // Нейтральный фон — совпадает с elevated для спокойного UI
      background: basePalette.bgTertiary,
      // Холодный текст, выровненный с textPrimary-цветом темы
      foreground: basePalette.textDefault,
      // Делает наведение ощутимым, но остаётся холодным и ненавязчивым
      hoverBackground: lightenPerceptual(basePalette.bgTertiary, 0.15),
      // Нейтральная граница — совпадает с border.default
      border: basePalette.borderDefault,
    },
  },

  // Badges (единая сущность для всех badge.* токенов)
  badge: {
    bg: basePalette.buttonPrimary,
    fg: basePalette.white,
  },

  // States (семантические цвета)
  state: {
    info: basePalette.stateInfo,
    success: basePalette.stateSuccess,
    warning: basePalette.stateWarning,
    error: basePalette.stateError,
    // Hover варианты для состояний
    infoHover: withAlpha(basePalette.stateInfo, 0.8),
    successHover: withAlpha(basePalette.stateSuccess, 0.8),
    warningHover: withAlpha(basePalette.stateWarning, 0.8),
    errorHover: withAlpha(basePalette.stateError, 0.8),
  },
  git: {
    renamedResourceForeground: withAlpha(basePalette.cyan, 0.8),
    stageModifiedResourceForeground: withAlpha(basePalette.cyan, 0.9),
    stageDeletedResourceForeground: withAlpha(basePalette.stateError, 0.9),
  },
  diff: {
    // Make diff backgrounds more subdued to avoid washing out comments
    insertedTextBackground: withAlpha(basePalette.stateSuccess, 0.12),
    removedTextBackground: withAlpha(basePalette.stateError, 0.12),
    insertedLineBackground: withAlpha(basePalette.stateSuccess, 0.08),
    removedLineBackground: withAlpha(basePalette.stateError, 0.08),
  },
  minimap: {
    // Используем новый цвет поиска для согласованности
    findMatchHighlight: withAlpha(basePalette.searchMatch, 0.5),
  },
  // Элементы управления
  dropdown: {
    background: basePalette.bgTertiary, // соответствует bg.elevated
    foreground: basePalette.white,
    border: basePalette.borderDefault, // соответствует border.default
    listBackground: basePalette.bgTertiary, // соответствует bg.elevated
  },
  // SCM Graph
  scmGraph: {
    label: {
      hoverForeground: basePalette.bgPrimary,
      hoverBackground: basePalette.blue,
    },
    foreground1: basePalette.blue,
    foreground2: basePalette.magenta,
    foreground3: basePalette.teal,
    foreground4: basePalette.cyan,
    foreground5: basePalette.purple,
    historyItemHoverAdditionsForeground: basePalette.stateSuccess,
    historyItemHoverDeletionsForeground: basePalette.stateError,
    historyItemRefColor: basePalette.blue,
    historyItemRemoteRefColor: basePalette.magenta,
    historyItemBaseRefColor: basePalette.teal,
  },
  derived: {
    link: {
      foreground: basePalette.linkDefault,
    },
    blockquote: {
      background: basePalette.bgOverlay,
      border: withAlpha(basePalette.cyan, 0.35),
    },
    terminal: {
      // Base ANSI (non-bright)
      ansiBlack: basePalette.bgPrimary,
      ansiRed: basePalette.stateError,
      ansiGreen: basePalette.stateSuccess,
      ansiYellow: basePalette.yellow,
      ansiMagenta: basePalette.magenta,
      // Make non-bright white a softer, cooler near‑white to reduce glare and warmth
      // Step 1: add a subtle cool tint; Step 2: bring slightly down from pure white
      ansiWhite: mixPerceptual(
        mixPerceptual(basePalette.white, basePalette.blue, 0.06),
        basePalette.bgPrimary,
        0.1
      ),
      // Cooler hover with cyan->blue mix for terminal command/hover highlight
      hoverHighlightBackground: withAlpha(
        mix(basePalette.cyan, basePalette.blue, 0.35),
        0.24
      ),
      ansiBlue: basePalette.linkDefault,
      ansiCyan: basePalette.linkDefault,
      ansiBrightBlack: lighten(basePalette.bgPrimary, 0.4),
      ansiBrightRed: lighten(basePalette.stateError, 0.15),
      ansiBrightGreen: lighten(basePalette.stateSuccess, 0.15),
      ansiBrightYellow: lighten(basePalette.yellow, 0.15),
      ansiBrightBlue: basePalette.linkDefault,
      ansiBrightMagenta: lighten(basePalette.magenta, 0.15),
      ansiBrightCyan: basePalette.linkDefault,
      // Keep bright white truly white for maximum emphasis
      ansiBrightWhite: basePalette.white,
    },
    overlays: {
      dropBackground: withAlpha(basePalette.bgOverlay, 0.2),
    },
    findMatch: {
      // Используем новые контрастные цвета для поиска
      // Основной фон для текущего совпадения - яркий и заметный
      background: withAlpha(basePalette.searchHighlight, 0.35),
      // Четкая граница для выделения активного совпадения
      border: withAlpha(basePalette.searchBorder, 0.8),
      // Фон для других совпадений - менее яркий, но видимый
      highlightBackground: withAlpha(basePalette.searchMatch, 0.25),
    },
    inlineChat: {
      background: darken(basePalette.blue, 0.8),
      foreground: lighten(basePalette.white, 0.12),
    },
    // Shadows: легкий OKLCH-сдвиг к более холодному оттенку для четкости
    shadows: {
      // widget: слегка более «холодная» тень + небольшая прозрачность
      widget: withAlpha(
        mixPerceptual(basePalette.bgOverlay, basePalette.blue, 0.06),
        0.9
      ),
      // scrollbar: на чуть-чуть мягче (меньше синего)
      scrollbar: mixPerceptual(basePalette.bgOverlay, basePalette.blue, 0.04),
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
    foreground: basePalette.textDefault,
    lines: basePalette.borderDefault,
    red: basePalette.stateError,
    blue: basePalette.blue,
    yellow: basePalette.yellow,
    orange: basePalette.orange,
    green: basePalette.stateSuccess,
    purple: basePalette.purple,
  },
}
