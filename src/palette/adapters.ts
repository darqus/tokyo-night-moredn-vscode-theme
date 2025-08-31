import { Hex } from '../types'
import { extendedPalette } from './extended'

/**
 * Система адаптации палитр для генерации вариантов тем
 */

export type PaletteModification = {
  hueShift?: number // Сдвиг оттенка (-180 до 180)
  saturationMultiplier?: number // Множитель насыщенности (0.0 - 2.0)
  lightnessOffset?: number // Смещение яркости (-50 до 50)
  contrastBoost?: number // Увеличение контраста (0.0 - 2.0)
  warmth?: number // Теплота цветов (-50 до 50, отрицательные = холоднее)
}

export type PaletteVariant =
  | 'tokyo-night'
  | 'tokyo-light'
  | 'tokyo-storm'
  | 'tokyo-moon'
  | 'custom'

/**
 * Конвертирует hex в HSL
 */
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

/**
 * Конвертирует HSL в hex
 */
function hslToHex(h: number, s: number, l: number): string {
  h = h / 360
  s = s / 100
  l = l / 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Применяет модификации к цвету
 */
function modifyColor(hex: string, modification: PaletteModification): string {
  if (hex.length < 7) return hex // Для прозрачных цветов

  const baseHex = hex.slice(0, 7)
  const alpha = hex.slice(7)

  let [h, s, l] = hexToHsl(baseHex)

  // Применяем модификации
  if (modification.hueShift) {
    h = (h + modification.hueShift + 360) % 360
  }

  if (modification.saturationMultiplier) {
    s = Math.min(100, Math.max(0, s * modification.saturationMultiplier))
  }

  if (modification.lightnessOffset) {
    l = Math.min(100, Math.max(0, l + modification.lightnessOffset))
  }

  if (modification.warmth) {
    // Сдвигаем к теплым (красный/желтый) или холодным (синий/зеленый) тонам
    const warmthShift = modification.warmth * 0.3
    if (h >= 180 && h <= 300) {
      // Холодные тона
      h = (h + warmthShift + 360) % 360
    } else {
      // Теплые тона
      h = (h - warmthShift + 360) % 360
    }
  }

  return hslToHex(h, s, l) + alpha
}

/**
 * Глубоко модифицирует объект палитры
 */
function modifyPaletteObject(obj: any, modification: PaletteModification): any {
  if (typeof obj === 'string' && obj.startsWith('#')) {
    return modifyColor(obj, modification) as Hex
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: any = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = modifyPaletteObject(value, modification)
    }
    return result
  }

  return obj
}

/**
 * Создает адаптированную палитру
 */
export function createAdaptedPalette(
  variant: PaletteVariant,
  customModification?: PaletteModification
): typeof extendedPalette {
  let modification: PaletteModification = {}

  // Предустановленные варианты
  switch (variant) {
    case 'tokyo-light':
      modification = {
        lightnessOffset: 35,
        saturationMultiplier: 0.8,
        contrastBoost: 1.2,
      }
      break

    case 'tokyo-storm':
      modification = {
        hueShift: 15,
        saturationMultiplier: 1.1,
        lightnessOffset: -5,
        warmth: -10,
      }
      break

    case 'tokyo-moon':
      modification = {
        hueShift: -20,
        saturationMultiplier: 0.9,
        lightnessOffset: 3,
        warmth: 15,
      }
      break

    case 'custom':
      modification = customModification || {}
      break

    case 'tokyo-night':
    default:
      modification = {}
      break
  }

  // Применяем модификации ко всей палитре
  return modifyPaletteObject(extendedPalette, modification)
}

/**
 * Преустановленные варианты палитр
 */
export const paletteVariants = {
  tokyoNight: () => createAdaptedPalette('tokyo-night'),
  tokyoLight: () => createAdaptedPalette('tokyo-light'),
  tokyoStorm: () => createAdaptedPalette('tokyo-storm'),
  tokyoMoon: () => createAdaptedPalette('tokyo-moon'),

  // Специальные варианты
  highContrast: () =>
    createAdaptedPalette('custom', {
      saturationMultiplier: 1.3,
      contrastBoost: 1.5,
      lightnessOffset: 8,
    }),

  lowContrast: () =>
    createAdaptedPalette('custom', {
      saturationMultiplier: 0.7,
      lightnessOffset: -3,
    }),

  warm: () =>
    createAdaptedPalette('custom', {
      warmth: 25,
      saturationMultiplier: 1.1,
    }),

  cool: () =>
    createAdaptedPalette('custom', {
      warmth: -25,
      saturationMultiplier: 1.1,
    }),

  monochrome: () =>
    createAdaptedPalette('custom', {
      saturationMultiplier: 0.1,
    }),
}

/**
 * Генератор кастомной палитры
 */
export function createCustomPalette(
  modification: PaletteModification
): typeof extendedPalette {
  return createAdaptedPalette('custom', modification)
}

/**
 * Микс двух палитр с весовыми коэффициентами
 */
export function mixPalettes(
  palette1: typeof extendedPalette,
  palette2: typeof extendedPalette,
  ratio: number = 0.5 // 0.0 = полностью palette1, 1.0 = полностью palette2
): typeof extendedPalette {
  function mixColors(color1: string, color2: string, ratio: number): string {
    if (!color1.startsWith('#') || !color2.startsWith('#')) return color1

    const baseHex1 = color1.slice(0, 7)
    const baseHex2 = color2.slice(0, 7)
    const alpha = color1.slice(7)

    const [h1, s1, l1] = hexToHsl(baseHex1)
    const [h2, s2, l2] = hexToHsl(baseHex2)

    // Интерполяция с учетом циклической природы оттенка
    let h = h1 + ratio * (((h2 - h1 + 180) % 360) - 180)
    h = (h + 360) % 360

    const s = s1 + ratio * (s2 - s1)
    const l = l1 + ratio * (l2 - l1)

    return hslToHex(h, s, l) + alpha
  }

  function mixObjects(obj1: any, obj2: any, ratio: number): any {
    if (
      typeof obj1 === 'string' &&
      typeof obj2 === 'string' &&
      obj1.startsWith('#') &&
      obj2.startsWith('#')
    ) {
      return mixColors(obj1, obj2, ratio) as Hex
    }

    if (
      typeof obj1 === 'object' &&
      typeof obj2 === 'object' &&
      obj1 !== null &&
      obj2 !== null
    ) {
      const result: any = {}
      for (const key of Object.keys(obj1)) {
        if (key in obj2) {
          result[key] = mixObjects(obj1[key], obj2[key], ratio)
        } else {
          result[key] = obj1[key]
        }
      }
      return result
    }

    return ratio < 0.5 ? obj1 : obj2
  }

  return mixObjects(palette1, palette2, ratio)
}
