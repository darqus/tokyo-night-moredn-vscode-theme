/**
 * OKLCH утилиты (без внешних зависимостей): простая конвертация sRGB <-> OKLab и LCh.
 * Примечание: это упрощённая реализация; для продакшн можно подключить culori.
 */

import type { Hex } from '../types/theme'

// --- sRGB <-> Linear ---
const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055

// --- RGB helpers ---
const hexToRgb = (hex: string) => {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i.exec(hex)
  if (!m) throw new Error(`Invalid hex: ${hex}`)
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  }
}

const rgbToHex = (r: number, g: number, b: number): Hex => {
  const ch = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, '0')
  return `#${ch(r)}${ch(g)}${ch(b)}` as Hex
}

// --- Linear RGB ---
const toLinearRgb = (r: number, g: number, b: number) => ({
  r: srgbToLinear(r / 255),
  g: srgbToLinear(g / 255),
  b: srgbToLinear(b / 255),
})
const fromLinearRgb = (r: number, g: number, b: number) => ({
  r: Math.round(linearToSrgb(r) * 255),
  g: Math.round(linearToSrgb(g) * 255),
  b: Math.round(linearToSrgb(b) * 255),
})

// --- Linear RGB -> OKLab ---
const lrgbToOklab = (r: number, g: number, b: number) => {
  // https://bottosson.github.io/posts/oklab/
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  return { L, a, b: b2 }
}

const oklabToLrgb = (L: number, a: number, b: number) => {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  return { r, g, b: b2 }
}

// --- OKLab <-> OKLCh ---
const oklabToOklch = (L: number, a: number, b: number) => {
  const C = Math.sqrt(a * a + b * b)
  const h = (Math.atan2(b, a) * 180) / Math.PI
  const hPos = (h + 360) % 360
  return { L, C, h: hPos }
}
const oklchToOklab = (L: number, C: number, h: number) => {
  const hr = (h * Math.PI) / 180
  const a = Math.cos(hr) * C
  const b = Math.sin(hr) * C
  return { L, a, b }
}

// --- Public API ---
export const hexToOklch = (hex: Hex) => {
  const { r, g, b } = hexToRgb(hex)
  const lr = toLinearRgb(r, g, b)
  const lab = lrgbToOklab(lr.r, lr.g, lr.b)
  return oklabToOklch(lab.L, lab.a, lab.b)
}

export const oklchToHex = (L: number, C: number, h: number): Hex => {
  const { a, b } = oklchToOklab(L, C, h)
  const lrgb = oklabToLrgb(L, a, b)
  const rgb = fromLinearRgb(lrgb.r, lrgb.g, lrgb.b)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

export const oklchMix = (hex1: Hex, hex2: Hex, t: number): Hex => {
  const c1 = hexToOklch(hex1)
  const c2 = hexToOklch(hex2)
  const L = c1.L * (1 - t) + c2.L * t
  const C = c1.C * (1 - t) + c2.C * t
  // Простая интерполяция угла с учётом wrap-around
  const dh = (((c2.h - c1.h + 540) % 360) - 180) * t
  const h = (c1.h + dh + 360) % 360
  return oklchToHex(L, C, h)
}

export const oklchLighten = (hex: Hex, amount: number): Hex => {
  const c = hexToOklch(hex)
  return oklchToHex(Math.min(1, c.L + amount * 0.1), c.C, c.h)
}

export const oklchDarken = (hex: Hex, amount: number): Hex => {
  const c = hexToOklch(hex)
  return oklchToHex(Math.max(0, c.L - amount * 0.1), c.C, c.h)
}
