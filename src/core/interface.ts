/**
 * Палитра интерфейса VS Code
 * Автогенерация всех цветов интерфейса из базовой палитры
 */
import { basePalette } from './palette'
import { mix, withAlpha, lighten } from './utils'
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
  },
  
  // Текстовые цвета (автогенерация)
  text: {
    primary: basePalette.white,
    muted: mix(basePalette.white, basePalette.gray, 0.4),
    subtle: mix(basePalette.white, basePalette.gray, 0.6),
    inactive: mix(basePalette.white, basePalette.gray, 0.8),
  },
  
  // Границы (автогенерация)
  border: {
    default: mix(basePalette.black, basePalette.gray, 0.4),
    focus: withAlpha(basePalette.blue, 0.6),
  },
  
  // Состояния (семантические цвета)
  state: {
    info: basePalette.cyan,
    success: basePalette.green,
    warning: basePalette.yellow,
    error: basePalette.red,
  }
}