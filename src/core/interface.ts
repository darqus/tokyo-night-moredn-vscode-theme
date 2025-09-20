/**
 * Палитра интерфейса VS Code
 * Автогенерация всех цветов интерфейса из базовой палитры
 */
import { basePalette } from './palette'
import { mix, withAlpha } from './utils'
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
    default: mix(basePalette.black, basePalette.gray, 0.2),
    focus: withAlpha(basePalette.blue, 0.4),
  },

  // Кнопки (автогенерация)
  button: {
    default: mix(basePalette.black, basePalette.blue, 0.2),
    hover: mix(basePalette.black, basePalette.blue, 0.25),
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
}
