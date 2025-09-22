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
    darkenBase: basePalette.surfaceSidebar,
    elevated: basePalette.surfacePanel,
    overlay: basePalette.surfaceOverlay,
    input: basePalette.surfacePanel,
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
    primary: basePalette.textPrimary,
    inverse: basePalette.black,
    muted: basePalette.textMuted,
    subtle: basePalette.textSubtle,
    inactive: mix(basePalette.white, basePalette.gray, 0.75),
    // Дополнительные приглушенные цвета для номеров строк
    // Чуть темнее и нейтральнее для обычных номеров
    lineNumber: mix(basePalette.black, basePalette.gray, 0.35),
    // Активный номер — приглушённый холодный (серый с лёгким cyan)
    lineNumberActive: mix(basePalette.cyan, basePalette.gray, 0.8),
  },
  // Текст на разных поверхностях (пока проксирует базовые роли, чтобы не менять визуал)
  textOn: {
    base: {
      primary: basePalette.textPrimary,
      muted: basePalette.textMuted,
      subtle: basePalette.textSubtle,
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
    elevated: {
      primary: basePalette.textPrimary,
      muted: basePalette.textMuted,
      subtle: basePalette.textSubtle,
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
    overlay: {
      primary: basePalette.textPrimary,
      muted: lightenPerceptual(basePalette.textMuted, 0.15),
      subtle: basePalette.textSubtle,
      inactive: mix(basePalette.white, basePalette.gray, 0.75),
    },
  },

  // Границы
  border: {
    default: basePalette.borderThin,
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
      background: basePalette.primaryButtonBlue,
      foreground: basePalette.textWhite,
      // чуть светлее при hover для выразительности
      hoverBackground: lightenPerceptual(basePalette.primaryButtonBlue, 0.08),
      // нейтральная тонкая рамка для чёткости формы
      border: basePalette.borderThin,
      // separator выравнен с border.default (нейтральный)
      separator: basePalette.borderThin,
    },
    secondary: {
      // Нейтральный фон — совпадает с elevated для спокойного UI
      background: basePalette.surfacePanel,
      foreground: basePalette.textWhite,
      // Делает наведение ощутимым, но остаётся холодным и ненавязчивым
      hoverBackground: withAlpha(basePalette.cyan, 0.12),
      // Нейтральная граница — совпадает с border.default
      border: basePalette.borderThin,
    },
  },

  // Бейджи (единая сущность для всех badge.* токенов)
  badge: {
    bg: basePalette.badgeBlue,
    fg: basePalette.textWhite,
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
    // Make diff backgrounds more subdued to avoid washing out comments
    insertedTextBackground: withAlpha(basePalette.green, 0.12),
    removedTextBackground: withAlpha(basePalette.red, 0.12),
    insertedLineBackground: withAlpha(basePalette.green, 0.08),
    removedLineBackground: withAlpha(basePalette.red, 0.08),
  },
  minimap: {
    // Balanced: slightly reduce prominence in minimap to lower noise
    findMatchHighlight: withAlpha(basePalette.yellow, 0.4),
  },
  // Элементы управления
  dropdown: {
    background: basePalette.surfacePanel, // соответствует bg.elevated
    foreground: basePalette.textWhite,
    border: basePalette.borderThin, // соответствует border.default
    listBackground: basePalette.surfacePanel, // соответствует bg.elevated
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
      foreground: basePalette.link,
    },
    blockquote: {
      background: basePalette.surfaceOverlay,
      border: withAlpha(basePalette.cyan, 0.35),
    },
    terminal: {
      // Base ANSI (non-bright)
      ansiBlack: basePalette.black,
      ansiRed: basePalette.red,
      ansiGreen: basePalette.green,
      ansiYellow: basePalette.yellow,
      ansiMagenta: basePalette.magenta,
      // Make non-bright white a softer, cooler near‑white to reduce glare and warmth
      // Step 1: add a subtle cool tint; Step 2: bring slightly down from pure white
      ansiWhite: mixPerceptual(
        mixPerceptual(basePalette.white, basePalette.blue, 0.06),
        basePalette.black,
        0.1
      ),
      // Cooler hover with cyan->blue mix for terminal command/hover highlight
      hoverHighlightBackground: withAlpha(
        mix(basePalette.cyan, basePalette.blue, 0.35),
        0.24
      ),
      ansiBlue: basePalette.link,
      ansiCyan: basePalette.link,
      ansiBrightBlack: lighten(basePalette.black, 0.4),
      ansiBrightRed: lighten(basePalette.red, 0.15),
      ansiBrightGreen: lighten(basePalette.green, 0.15),
      ansiBrightYellow: lighten(basePalette.yellow, 0.15),
      ansiBrightBlue: basePalette.link,
      ansiBrightMagenta: lighten(basePalette.magenta, 0.15),
      ansiBrightCyan: basePalette.link,
      // Keep bright white truly white for maximum emphasis
      ansiBrightWhite: basePalette.white,
    },
    overlays: {
      dropBackground: withAlpha(basePalette.surfaceOverlay, 0.2),
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
      foreground: lighten(basePalette.textWhite, 0.12),
    },
    // Shadows: лёгкий OKLCH-сдвиг к более холодному оттенку для четкости
    shadows: {
      // widget: слегка более «холодная» тень + небольшая прозрачность
      widget: withAlpha(
        mixPerceptual(basePalette.surfaceOverlay, basePalette.blue, 0.06),
        0.9
      ),
      // scrollbar: на чуть-чуть мягче (меньше синего)
      scrollbar: mixPerceptual(
        basePalette.surfaceOverlay,
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
    foreground: basePalette.textPrimary,
    lines: basePalette.borderThin,
    red: basePalette.red,
    blue: basePalette.blue,
    yellow: basePalette.yellow,
    orange: basePalette.orange,
    green: basePalette.green,
    purple: basePalette.purple,
  },
}
